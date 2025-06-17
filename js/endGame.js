export function afficherPerdu(ctx, score) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "bold 36px Arial";
    ctx.fillText("Perdu !", 50, 200);
    ctx.fillStyle = "white";
    ctx.font = "bold 36px Arial";
    ctx.fillText("Score : " + score, 50, 150);

    ctx.font = "20px Arial";
    ctx.fillText("Appuie sur 'r' pour recommencer", 50, 250);
}