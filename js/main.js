document.addEventListener("DOMContentLoaded", () => {
    const splashScreen = document.getElementById("splash-screen");
    const startButton = document.getElementById("start-button");
    const playerNameInput = document.getElementById("player-name-input");
    const errorMessage = document.getElementById("error-message");
    const aScene = document.querySelector("a-scene");
    const museumAudio = document.getElementById("museum-audio");

    errorMessage.classList.add('hidden-error');
    errorMessage.textContent = '';

    startButton.addEventListener("click", () => {
        const playerName = playerNameInput.value.trim();
        if (playerName) {
            errorMessage.classList.add('hidden-error'); 
            errorMessage.textContent = '';
            splashScreen.classList.add('hidden'); 
            aScene.style.display = "block"; 
            
            if (museumAudio) {
                museumAudio.play().catch(error => {
                    console.error("Erreur lors de la lecture de l'audio :", error);
                });
            }
            console.log(`Bienvenue, ${playerName} !`);
        } else {
            errorMessage.textContent = "Veuillez entrer votre prénom pour démarrer l'expérience.";
            errorMessage.classList.remove('hidden-error');
        }
    });
});
