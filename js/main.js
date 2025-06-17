import { LARGEUR_CASE, LARGEUR_GRILLE, HAUTEUR_GRILLE } from "./config.js";
import { refreshCanvas } from "./canvas.js";
import { initGrille } from "./data.js";
import { nouvelleForme } from "./generateForme.js";
import { gameState } from "./state.js";
import { formes } from "./data.js";
import { collision } from "./collision.js";
export function init() {
    const canvas = document.getElementById("canvas");
    canvas.width = LARGEUR_GRILLE * LARGEUR_CASE + 150; // Espace pour la forme suivante
    canvas.height = HAUTEUR_GRILLE * LARGEUR_CASE;
    const ctx = canvas.getContext("2d");

    gameState.canvas = canvas;
    gameState.ctx = ctx;

    // Initialisation du reste
    gameState.formX = 5;
    gameState.formY = 0;
    gameState.formChoose = nouvelleForme();
    gameState.formeSuivante = nouvelleForme();
    gameState.rotation = 0;
    gameState.grille = initGrille();
    gameState.ctrLignes = 0
    gameState.jeuTermine = false
    gameState.score = 0
    gameState.delayActuel = 500

    // Ensuite appeler ton loop ou refreshCanvas
    refreshCanvas();
}

init();

window.addEventListener("keydown", function (event) {
    if (gameState.jeuTermine && event.key === "r") {
        init(); // Redémarre le jeu
        return;
    }

    if (gameState.jeuTermine) return; // Ne pas gérer les touches si le jeu est terminé

    const { formChoose } = gameState;

    switch (event.key) {
        case 'ArrowLeft':
            if (!collision(gameState.formChoose, gameState.rotation, gameState.formX - 1, gameState.formY)) {
                gameState.formX--;
            }
            break;

        case 'ArrowRight':
            if (!collision(gameState.formChoose, gameState.rotation, gameState.formX + 1, gameState.formY)) {
                gameState.formX++;
            }
            break;
        case 'ArrowUp':
            let tempRotation = gameState.rotation;
            gameState.rotation++;
            if (gameState.rotation >= formes[formChoose].length) gameState.rotation = 0;
            if (collision(formChoose, gameState.rotation, gameState.formX, gameState.formY)) {
                gameState.rotation = tempRotation;
            }
            break;

        // Descente rapide
        case ' ':
            gameState.vitesseRapide = true;
            break;


        case 'ArrowDown':
            gameState.rotation--;
            if (gameState.rotation < 0) gameState.rotation = formes[formChoose].length - 1;
            break;

        case 't':
            gameState.formChoose++;
            if (gameState.formChoose >= formes.length) gameState.formChoose = 0;
            gameState.rotation = 0;
            break;
    }
}, true);


