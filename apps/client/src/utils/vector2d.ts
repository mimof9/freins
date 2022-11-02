export class Vector2D extends Array {
  constructor(x = 1, y = 0) {
    // @ts-ignore
    super(x, y);
  }

  set x(v: number) {
    this[0] = v;
  }

  get x() {
    return this[0];
  }

  set y(v: number) {
    this[1] = v;
  }

  get y() {
    return this[1];
  }

  get length() {
    return Math.hypot(this.x, this.y);
  }

  get direction() {
    return Math.atan2(this.y, this.x);
  }

  copy() {
    return new Vector2D(this.x, this.y);
  }

  add(v: Vector2D) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  sub(v: Vector2D) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  scale(n: number) {
    this.x *= n;
    this.y *= n;
    return this;
  }

  dotProduct(v: Vector2D) {
    return this.x * v.x + this.y * v.y;
  }

  crossProduct(v: Vector2D) {
    return this.x * v.y - this.y * v.x;
  }

  normalize() {
    return this.scale(1 / this.length);
  }

  rotate(radian: number) {
    const c = Math.cos(radian);
    const s = Math.sin(radian);
    const [x, y] = this;

    this.x = x * c + y * -s;
    this.y = x * s + y * c;

    return this;
  }
}
