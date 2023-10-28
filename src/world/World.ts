import Device from "../entities/Device";

export default class World {
    private _canvas: HTMLCanvasElement = document.getElementById(
        "desktop"
    ) as HTMLCanvasElement;
    private _context: CanvasRenderingContext2D = this._canvas.getContext(
        "2d"
    ) as CanvasRenderingContext2D;

    create(): void {
        this._context.canvas.width = window.innerWidth;
        this._context.canvas.height = window.innerHeight;

        const device1 = new Device(
            50,
            50,
            500,
            500,
            this._context,
            "blue"
        );

        const device2 = new Device(
            100,
            150,
            50,
            50,
            this._context,
            "green"
        );
    }

    handleResize(): void {
        this._context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.create();
    }
}
