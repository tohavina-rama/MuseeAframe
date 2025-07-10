document.addEventListener("DOMContentLoaded", () => {
  const splashScreen = document.getElementById("splash-screen");
  const startButton = document.getElementById("start-button");
  const aScene = document.querySelector("a-scene");

  startButton.addEventListener("click", () => {
    splashScreen.style.display = "none";
    aScene.style.display = "block";

    setTimeout(() => {
      aScene.querySelectorAll("[sound]").forEach((soundEl) => {
        if (soundEl.components.sound) {
          soundEl.components.sound.playSound();
        }
      });
    }, 200);
  });
});
