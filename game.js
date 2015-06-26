(function() {
    var scene, camera, renderer, sprite, prevFrame = 0;

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
        delta = Math.min(0.1, delta);
        render();
    }

    function render() {
        renderer.render(scene, camera);
    }

    window.addEventListener('load', startWebGL);
})();