type PaneBoundaryOptions = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};

class PaneBoundary {
  private _x1: number;
  private _x2: number;
  private _y1: number;
  private _y2: number;
  constructor(options: PaneBoundaryOptions) {
    this._x1 = options.x1;
    this._x2 = options.x2;
    this._y1 = options.y1;
    this._y2 = options.y2;
  }

  get x1() {
    return this._x1;
  }
  get x2() {
    return this._x2;
  }
  get y1() {
    return this._y1;
  }
  get y2() {
    return this._y2;
  }

  get xs(): [number, number] {
    return [this._x1, this._x2];
  }
  get ys(): [number, number] {
    return [this._y1, this._y2];
  }

  get values() {
    return {
      x1: this.x1,
      x2: this.x2,
      y1: this.y1,
      y2: this.y2,
    };
  }
}

export default PaneBoundary;
