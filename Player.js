export default class Player {
    //In de constructor maken we nieuwe variabelen aan, die we in andere scripts kunnen gebruiken.
    //sommige variabelen kunnen we als parameters gebruiken.
    constructor(x, y, bulletController) {
        this.x = x;
        this.y = y;
        this.bulletController = bulletController;
        this.width = 50;
        this.height = 50;
        this.speed = 4;
        this.delay = 20;
    }

    //de draw functie is er om te zorgen dat wat we we op het scherm willen 'tekenen' ook daadwerkelijk gebeurd
    draw(ctx) {
        this.drawTriangle(ctx, this.x, this.y);
    }
    //een functie om een driehoek te tekenen, met als parameters de context zodat we hiervandaan functies 
    //kunnen gebruiken. De x & y parameters zijn er om als start positie te geven om vanaf te beginnen.
    drawTriangle(ctx, x, y)
    {
        let height = 40 * Math.cos(Math.PI / 6);
        ctx.beginPath();
        ctx.moveTo(x + 20, y + 60);
        ctx.lineTo(x + 60, y + 60);
        ctx.lineTo(x + 40, y + 60 - height);
        ctx.closePath();
      
        // the outline
        ctx.lineWidth = 10;
        ctx.strokeStyle = '#666666';
        ctx.stroke();
      
        // the fill color
        ctx.fillStyle = "#FFCC00";
        ctx.fill();
    }
    //deze functie zorgt ervoor dat er geschoten kan worden.
    //De code wordt pas uitgevoerd als de boolean this.shootpressed gelijk is aan true
    shoot() {
        if (this.shootPressed) {
            const speed = 5;
            const damage = 1;
            const bulletX = this.x + this.width / 2 + 15;
            const bulletY = this.y;
            this.bulletController.shoot(bulletX, bulletY, speed, damage, this.delay, "red");
        }
    }

    //deze functie zorgt voor het verplaatsen van de speler op het scherm
    //De string parameter wordt meegevraagd, en daarmee wordt in een switch statement meegewerkt.
    move(dir) {

        switch(dir)
        {
            case "up":
                this.y -= this.speed * 3;
                break;
            case "down":
                this.y += this.speed* 3;
                break;
            case "right":
                this.x += this.speed* 3;
                break;
            case "left":
                this.x -= this.speed* 3;
                break;
        }
    }
}