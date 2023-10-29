export default class Device {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;

    private _context: CanvasRenderingContext2D;

    color: string;

    constructor(
        id: string,
        x: number,
        y: number,
        width: number,
        height: number,
        context: CanvasRenderingContext2D,
        color: string
    ) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this._context = context;
        this.color = color;

        this.render();
    }

    render(): void {
        this._context.beginPath();

        this._context.fillStyle = this.color;
        this._context.fillRect(
            this.x + 5,
            this.y + 5,
            this.width - 10,
            this.height - 10
        );

        this._context.strokeStyle = this.color;
        this._context.strokeRect(this.x, this.y, this.width, this.height);

        this._context.closePath();
    }
}
