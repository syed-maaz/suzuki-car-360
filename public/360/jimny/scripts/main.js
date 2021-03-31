!(function () {
  function loadImages(materials) {
    setTimeout(() => {
      var mode = $(".modeBtn.selected").attr("id");

      (function (materials) {
        var materialDirPath = "materials/";
        var path,
          material = materials[0].material,
          imgs = [
            (path = materialDirPath + material + "/" + material) + "_03.jpg",
            path + "_02.jpg",
            path + "_05.jpg",
            path + "_06.jpg",
            path + "_04.jpg",
            path + "_01.jpg",
          ];
        window.loadThreejs(imgs);

        // $("#loadingIndicator").stop(!0).show(10).delay(2e3).hide(10);
      })(materials);
    }, 200);
  }
  loadImages([{ layer: 0, material: "INT-INTBASE_001-BG_A" }]);
})();
