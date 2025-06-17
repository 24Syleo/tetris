import { LARGEUR_GRILLE } from "./config.js";
import { collision } from "./collision.js";
import { gameState } from "./state.js";
import { copierFormeDansLaGrille } from "./copierForme.js";
import { nouvelleForme, dessinerFormeSuivante, afficherCompteurLignes } from "./generateForme.js";
import { dessinerGrille, drawForme } from "./tetros.js";
import { verifierLignes } from "./ligne.js";
import { afficherPerdu } from "./endGame.js";

export function refreshCanvas() {
    function loop() {
        const delay = gameState.vitesseRapide ? 30 : gameState.delayActuel;

        gameState.ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!collision(gameState.formChoose, gameState.rotation, gameState.formX, gameState.formY + 1)) {
            gameState.formY++;
        } else {
            // Si la pièce est trop haute => défaite
            if (gameState.formY <= 1) {
                gameState.jeuTermine = true;
                afficherPerdu(gameState.ctx, gameState.score);
                return; // On arrête la boucle
            }
            copierFormeDansLaGrille(gameState.grille, gameState.formChoose, gameState.rotation, gameState.formX, gameState.formY);
            verifierLignes(); // <- si tu as déjà cette fonction

            gameState.formChoose = gameState.formeSuivante;
            gameState.formeSuivante = nouvelleForme();

            gameState.formX = Math.floor(LARGEUR_GRILLE / 2) - 1;
            gameState.formY = 0;
            gameState.rotation = 0;
            gameState.vitesseRapide = false; // reset la vitesse rapide
        }

        dessinerGrille(gameState.ctx, gameState.grille);
        drawForme(gameState.ctx, gameState.formChoose, gameState.rotation, gameState.formX, gameState.formY);
        dessinerFormeSuivante(gameState.ctx, gameState.formeSuivante);
        afficherCompteurLignes(gameState.ctx, gameState.ctrLignes, gameState.score);

        setTimeout(loop, delay);
    }

    loop(); // démarre la boucle
}