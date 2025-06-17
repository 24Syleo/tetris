import { LARGEUR_GRILLE, HAUTEUR_GRILLE } from "./config.js";
import { formes } from "./data.js";

export function copierFormeDansLaGrille(grille, formChoose, rotation, formX, formY) {
    const forme = formes[formChoose][rotation];

    for (let y = 0; y < forme.length; y++) {
        for (let x = 0; x < forme[y].length; x++) {
            if (forme[y][x] === 1) {
                const grilleX = formX + x;
                const grilleY = formY + y;

                if (
                    grilleX >= 0 && grilleX < LARGEUR_GRILLE &&
                    grilleY >= 0 && grilleY < HAUTEUR_GRILLE
                ) {
                    grille[grilleY][grilleX] = formChoose; // ✅ inversé ici
                }
            }
        }
    }
}
