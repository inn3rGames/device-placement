// Describe our Device class
export default class Device {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;

    private _context: CanvasRenderingContext2D;

    color: string;

    resolved: boolean = false;

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

    // Graphical representation for our device
    render(): void {
        this._context.beginPath();

        this._context.fillStyle = this.color;
        this._context.fillRect(
            this.x - this.width * 0.5 + 2.5 - 0.5,
            this.y - this.height * 0.5 + 2.5 - 0.5,
            this.width - 5,
            this.height - 5
        );

        this._context.strokeStyle = this.color;
        this._context.strokeRect(
            this.x - this.width * 0.5,
            this.y - this.height * 0.5,
            this.width,
            this.height
        );

        this._context.closePath();
    }
}
