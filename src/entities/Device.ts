export default class Device {
    private _x: number;
    private _y: number;
    private _width: number;
    private _height: number;

    private _context: CanvasRenderingContext2D;

    private _color: string;

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        context: CanvasRenderingContext2D,
        color: string
    ) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._context = context;
        this._color = color;

        this._render();
    }

    private _render(): void {
        this._context.beginPath();
        this._context.fillStyle = this._color;
        this._context.fillRect(this._x, this._y, this._width, this._height);
        this._context.closePath();
    }
}
