$(function () {
  var camera,
    scene,
    renderer,
    controls,
    aniFlag,
    container = document.getElementById("INT_BOX_THREE"),
    $stage = $("#interiorStage");

  function animate() {
    aniFlag
      ? requestAnimationFrame(animate)
      : requestAnimationFrame(function () {
          setTimeout(animate, 200);
        }),
      controls.update(),
      renderer.render(scene, camera);
  }

  window.loadThreejs = function (imgs) {
    (aniFlag = !1),
      (function (imgs) {
        scene = scene || new THREE.Scene();
        camera =
          camera ||
          new THREE.PerspectiveCamera(
            55.3,
            $stage.width() / $stage.height(),
            1,
            5e3
          );
        camera.position.z = 99;
        camera.position.y = 17.3;
        var refractionCube = (function (urls, onLoad, onProgress, onError) {
          var texture = new THREE.CubeTexture(),
            loader = new THREE.ImageLoader(),
            loaded = 0;
          function loadTexture(i) {
            loader.load(
              urls[i],
              function (image) {
                var tileWidth = image.height;
                (canvas = document.createElement("canvas")),
                  (context = canvas.getContext("2d")),
                  (canvas.height = 1024),
                  (canvas.width = 1024),
                  3 == i
                    ? (context.save(),
                      context.translate(512, 512),
                      context.rotate(Math.PI),
                      context.drawImage(
                        image,
                        0,
                        0,
                        tileWidth,
                        tileWidth,
                        -512,
                        -512,
                        1024,
                        1024
                      ),
                      context.restore())
                    : context.drawImage(
                        image,
                        0,
                        0,
                        tileWidth,
                        tileWidth,
                        0,
                        0,
                        1024,
                        1024
                      ),
                  (texture.images[i] = canvas),
                  6 === ++loaded &&
                    ((texture.needsUpdate = !0), onLoad && onLoad(texture));
              },
              void 0,
              onError
            );
          }
          for (var i = 0; i < urls.length; ++i) {
            loadTexture(i);
          }

          return texture;
        })(imgs);

        (scene.background = refractionCube),
          renderer ||
            ((renderer = new THREE.WebGLRenderer()).setPixelRatio(
              window.devicePixelRatio
            ),
            renderer.setSize($stage.width(), $stage.height()),
            container.appendChild(renderer.domElement));
        controls ||
          (((controls = new THREE.OrbitControls(
            camera,
            renderer.domElement
          )).enableZoom = !1),
          (controls.enablePan = !1),
          (controls.enableDamping = !0),
          (controls.minPolarAngle = (27 * Math.PI) / 180),
          (controls.maxPolarAngle = (153 * Math.PI) / 180),
          (controls.rotateSpeed = -0.05));
        (aniFlag = !0), animate();
      })(imgs);
  };

  $(container).on("mouseenter", function () {
    aniFlag = !0;
  });
  $(container).on("mouseleave", function () {
    aniFlag = !1;
  });
});
