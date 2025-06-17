import { LARGEUR_CASE, HAUTEUR_GRILLE, LARGEUR_GRILLE } from "./config.js";
import { couleursFormes, formes } from "./data.js";
import { gameState } from "./state.js";
import { collision } from "./collision.js";

export function dessinerGrille(ctx, grille) {
    for (let y = 0; y < HAUTEUR_GRILLE; y++) {
        for (let x = 0; x < LARGEUR_GRILLE; x++) {
            const val = grille[y][x];
            if (val !== -1) {
                ctx.fillStyle = couleursFormes[val][0];
                ctx.fillRect(x * LARGEUR_CASE, y * LARGEUR_CASE, LARGEUR_CASE, LARGEUR_CASE);
                ctx.strokeRect(x * LARGEUR_CASE, y * LARGEUR_CASE, LARGEUR_CASE, LARGEUR_CASE);
            } else {
                // Optionnel : dessiner un fond ou grille vide
                ctx.clearRect(x * LARGEUR_CASE, y * LARGEUR_CASE, LARGEUR_CASE, LARGEUR_CASE);
            }
        }
    }
}

export function drawForme(ctx, numForme, rotation, formX, formY) {
    const forme = formes[numForme][rotation];
    for (let y = 0; y < forme.length; y++) {
        for (let x = 0; x < forme[y].length; x++) {
            if (forme[y][x] === 1) {
                ctx.fillStyle = couleursFormes[numForme][0];
                ctx.fillRect((formX + x) * LARGEUR_CASE, (formY + y) * LARGEUR_CASE, LARGEUR_CASE, LARGEUR_CASE);
                ctx.strokeRect((formX + x) * LARGEUR_CASE, (formY + y) * LARGEUR_CASE, LARGEUR_CASE, LARGEUR_CASE);
            }
        }
    }
}
