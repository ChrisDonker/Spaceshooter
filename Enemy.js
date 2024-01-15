export default class Enemy {
  //In de constructor maken we nieuwe variabelen aan, die we in andere scripts kunnen gebruiken.
    //sommige variabelen kunnen we als parameters gebruiken.
    constructor(x, y, color, health, speed, value) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.health = health;
      this.width = 20;
      this.height = 20;
      this.speed = speed;
      this.heightDif = 4;
      this.value = value;
    }
    //de draw functie is er om te zorgen dat wat we we op het scherm willen 'tekenen' ook daadwerkelijk gebeurd
    draw(ctx) {
      ctx.fillStyle = this.color;

      if (this.health > 1) {
        ctx.strokeStyle = "white";
      } else {
        ctx.strokeStyle = this.color;
      }
  
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.strokeRect(this.x, this.y, this.width, this.height);

      this.shoot();
    }
    //Een functie die aangeroepen kan worden, en de health van de enemy eraf kan gaan.
    takeDamage(damage) {
      this.health -= damage;
    }
    //Deze functie zorgt ervoor dat er geschoten kan worden.
    shoot(){
      const speed = 5;
      const delay = 70;
      const damage = 1;
      const bulletX = this.x + this.width / 2;
      const bulletY = this.y;
    }
    //Deze functie zorgt voor het verplaatsen van de enemys op het scherm
    moveX(ctx) {
      this.x = this.x - this.speed;
    }
    //Deze functie zorgt dat wanneer de enemy van richting moet veranderen dit soepel gebeurd.
    AlternateMoveX(ctx)
    {
      if(this.x <= 0)
      {
        this.speed = -this.speed;
        this.y += this.heightDif;
      }
      else if(this.x >= (ctx.width - this.width))
      {
        this.speed = Math.abs(this.speed);
        this.y += this.heightDif;
      }
    }
  }
  