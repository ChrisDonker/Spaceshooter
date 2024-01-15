import Bullet from "./Bullet.js";

export default class BulletController {
  bullets = [];
  timerTillNextBullet = 0;

  constructor(canvas) {
    this.canvas = canvas;
  }
  //functie die kogels afschiet
  shoot(x, y, speed, damage, delay, color) {
    if (this.timerTillNextBullet <= 0) {
      this.bullets.push(new Bullet(x, y, speed, damage, color));

      this.timerTillNextBullet = delay;
    }

    this.timerTillNextBullet--;
  }
  //functie die deze kogels ook tekend met het gebruik van een foreach
  draw(ctx) {
    this.bullets.forEach((bullet) => {
      if (this.isBulletOffScreen(bullet)) {
        const index = this.bullets.indexOf(bullet);
        this.bullets.splice(index, 1);
      }
      bullet.draw(ctx);
    });
  }
  //functie die bijhoud of de kogel ergens tegen aan komt, en zo ja waarmee.
  collideWith(sprite, object) {
    return this.bullets.some((bullet) => {
      if (bullet.collideWith(sprite)) {
        this.bullets.splice(this.bullets.indexOf(bullet), 1);
        return true;
      }
      return false;
    });
  }
  //functie die een melding geeft als de kogel van het scherm af is.
  isBulletOffScreen(bullet) {
    return bullet.y <= -bullet.height;
  }
}