import Device from "../entities/Device";

export default class World {
    private _canvas: HTMLCanvasElement = document.getElementById(
        "desktop"
    ) as HTMLCanvasElement;
    private _context: CanvasRenderingContext2D = this._canvas.getContext(
        "2d"
    ) as CanvasRenderingContext2D;

    private _devices: Array<Device> = [];

    init(): void {
        this._context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this._context.canvas.width = window.innerWidth;
        this._context.canvas.height = window.innerHeight;
    }

    private _renderDevices(): void {
        for (let i = 0; i < this._devices.length; i++) {
            this._devices[i].render();
        }
    }

    private _handleResize(): void {
        this.init();
        this._renderDevices();
    }

    private _pushDevice(
        x: number,
        y: number,
        width: number,
        height: number
    ): void {
        this._devices.push(
            new Device(x, y, width, height, this._context, "green")
        );
    }

    handleInput(): void {
        window.addEventListener("pointerdown", (event) => {
            this._pushDevice(event.clientX - 50, event.clientY - 50, 100, 100);
        });

        window.addEventListener("resize", () => {
            this._handleResize();
        });
    }
}
