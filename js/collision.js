import { LARGEUR_GRILLE, HAUTEUR_GRILLE } from "./config.js";
import { formes } from "./data.js";
import { gameState } from "./state.js";

export function collision(formChoose, rotation, formX, formY) {
    const forme = formes[formChoose][rotation];

    for (let y = 0; y < forme.length; y++) {
        for (let x = 0; x < forme[y].length; x++) {
            if (forme[y][x] === 1) {
                const grilleX = formX + x;
                const grilleY = formY + y;

                // ✅ Test collision avec les bords
                if (
                    grilleX < 0 ||
                    grilleX >= LARGEUR_GRILLE ||
                    grilleY >= HAUTEUR_GRILLE
                ) {
                    return true;
                }

                // 🚫 Test collision avec une pièce existante
                if (
                    grilleY >= 0 && // utile pour éviter erreur en haut de la grille
                    gameState.grille[grilleY][grilleX] !== -1
                ) {
                    return true;
                }
            }
        }
    }

    return false;
}
