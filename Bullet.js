export default class Bullet {
   //In de constructor maken we nieuwe variabelen aan, die we in andere scripts kunnen gebruiken.
    //sommige variabelen kunnen we als parameters gebruiken.
    constructor(x, y, speed, damage, color) {
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.damage = damage;
      this.width = 5;
      this.height = 15;
      this.color = color;
    }
  //de draw functie is er om te zorgen dat wat we we op het scherm willen 'tekenen' ook daadwerkelijk gebeurd
    draw(ctx) {
      ctx.fillStyle = this.color;
      this.y -= this.speed;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    //functie die nauwkeurig kijkt naar welk element er een aanraking is.
    collideWith(sprite) {
      if (
        this.x < sprite.x + sprite.width &&
        this.x + this.width > sprite.x &&
        this.y < sprite.y + sprite.height &&
        this.y + this.height > sprite.y
      ) {
        sprite.takeDamage(this.damage);
        return true;
      }
      return false;
    }
  }
  