import { formes, couleursFormes } from "./data.js";
import { LARGEUR_CASE, LARGEUR_GRILLE } from "./config.js";

export function dessinerFormeSuivante(ctx, numForme) {
    const forme = formes[numForme][0]; // rotation 0 pour l'aperçu
    const startX = LARGEUR_GRILLE * LARGEUR_CASE + 10;
    const startY = 40;

    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Prochaine forme", startX, 20);

    for (let y = 0; y < forme.length; y++) {
        for (let x = 0; x < forme[y].length; x++) {
            if (forme[y][x] === 1) {
                ctx.fillStyle = couleursFormes[numForme][0];
                ctx.fillRect(startX + x * LARGEUR_CASE, startY + y * LARGEUR_CASE, LARGEUR_CASE, LARGEUR_CASE);
                ctx.strokeRect(startX + x * LARGEUR_CASE, startY + y * LARGEUR_CASE, LARGEUR_CASE, LARGEUR_CASE);
            }
        }
    }

    // Ligne verticale pour séparer la zone
    ctx.beginPath();
    ctx.moveTo(LARGEUR_GRILLE * LARGEUR_CASE, 0);
    ctx.lineTo(LARGEUR_GRILLE * LARGEUR_CASE, ctx.canvas.height);
    ctx.strokeStyle = "black";
    ctx.stroke();
}



export function nouvelleForme() {
    return Math.floor(Math.random() * formes.length);
}

export function afficherCompteurLignes(ctx, compteur, score) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText(`Lignes complétées`, LARGEUR_GRILLE * LARGEUR_CASE + 10, 160);
    ctx.fillText(`${compteur}`, LARGEUR_GRILLE * LARGEUR_CASE + 60, 180);
    ctx.fillText("Score : " + score, LARGEUR_GRILLE * LARGEUR_CASE + 10, 130);
}