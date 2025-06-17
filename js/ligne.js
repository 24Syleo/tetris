import { gameState } from "./state.js";
import { HAUTEUR_GRILLE } from "./config.js";

function effaceLigne(grille, ligneASupprimer) {
    for (let y = ligneASupprimer; y > 0; y--) {
        // On copie la ligne du dessus vers celle du dessous
        for (let x = 0; x < grille[y].length; x++) {
            grille[y][x] = grille[y - 1][x];
        }
    }

    // Créer une nouvelle ligne vide en haut
    for (let x = 0; x < grille[0].length; x++) {
        grille[0][x] = -1;
    }
}

export function verifierLignes() {
    let lignesSupprimees = 0;

    for (let y = 0; y < HAUTEUR_GRILLE; y++) {
        if (gameState.grille[y].every(cell => cell !== -1)) {
            effaceLigne(gameState.grille, y);
            lignesSupprimees++;
            y--; // ligne descendue, on la revérifie
        }
    }

    if (lignesSupprimees > 0) {
        gameState.ctrLignes += lignesSupprimees;
        gameState.score += calculerPoints(lignesSupprimees);

        // Réduction du delay tous les 50 points, minimum 100 ms
        const newDelay = 500 - Math.floor(gameState.score / 50) * 10;
        gameState.delayActuel = Math.max(100, newDelay);
    }
}

function calculerPoints(nbLignes) {
    let points = nbLignes * 10;
    if (nbLignes === 2) points += 5;
    else if (nbLignes === 3) points += 7;
    else if (nbLignes === 4) points += 8;
    else if (nbLignes >= 5) points += 10;
    return points;
}