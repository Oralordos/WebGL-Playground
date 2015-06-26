(function() {
    var scene, camera, renderer, sprite, prevFrame = 0, keyboard = new Keyboard();

    function createSprite(width, height, color) {
        //var image = new THREE.ImageUtils.loadTexture(image);
        var material = new THREE.MeshBasicMaterial({color: color});
        var geometry = new THREE.BoxGeometry(width, height, 0.1);
        return new THREE.Mesh(geometry, material);
    }

    function startWebGL() {
        scene = new THREE.Scene();
        camera = new THREE.OrthographicCamera(0, 800, 0, 600, -1, 1);
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(800, 600);
        document.querySelector('main').appendChild(renderer.domElement);

        sprite = createSprite(100, 100, 0xff0000);
        sprite.position.set(400, 300, 0);
        scene.add(sprite);

        console.log('Starting');
        requestAnimationFrame(update);
    }

    function update(now) {
        requestAnimationFrame(update);
        var delta = now - prevFrame;
        prevFrame = now;
        delta = Math.min(100, delta);
        if (keyboard.pressed('left')) {
            sprite.position.x -= 100 * delta / 1000;
        }
        if (keyboard.pressed('right')) {
            sprite.position.x += 100 * delta / 1000;
        }
        if (keyboard.pressed('up')) {
            sprite.position.y -= 100 * delta / 1000;
        }
        if (keyboard.pressed('down')) {
            sprite.position.y += 100 * delta / 1000;
        }
        render();
    }

    function render() {
        renderer.render(scene, camera);
    }

    window.addEventListener('load', startWebGL);

    function Keyboard() {
        this.keys = {};
        this.modifiers = {};

        this.MODIFIERS = ['shift', 'ctrl', 'alt', 'meta'];
        this.ALIAS = {
            left: 'ArrowLeft',
            up: 'ArrowUp',
            right: 'ArrowRight',
            down: 'ArrowDown',
            space: ' '
        };

        this.onKeyChange = function(event, pressed) {
            event.preventDefault();
            this.keys[event.key] = pressed;
            this.modifiers['shift'] = event.shiftKey;
            this.modifiers['ctrl'] = event.ctrlKey;
            this.modifiers['alt'] = event.altKey;
            this.modifiers['meta'] = event.metaKey;
        };

        this.pressed = function() {
            for (var i = 0; i < arguments.length; i++) {
                var key = arguments[i];
                if (this.MODIFIERS.indexOf(key) !== -1) {
                    if (!this.modifiers[key]) {
                        console.log('first');
                        return false;
                    }
                }
                else if (Object.keys(this.ALIAS).indexOf(key) !== -1) {
                    if (!this.keys[this.ALIAS[key]]) {
                        return false;
                    }
                }
                else if (!this.keys[key.toLowerCase()]) {
                    return false;
                }
            }
            return true;
        };

        var self = this;
        this.onKeyDown = function(event) {self.onKeyChange(event, true);};
        this.onKeyUp = function(event) {self.onKeyChange(event, false);};

        document.addEventListener('keydown', this.onKeyDown);
        document.addEventListener('keyup', this.onKeyUp);
    }
})();