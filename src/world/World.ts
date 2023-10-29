import Device from "../entities/Device";

export default class World {
    private _canvas: HTMLCanvasElement = document.getElementById(
        "desktop"
    ) as HTMLCanvasElement;
    private _context: CanvasRenderingContext2D = this._canvas.getContext(
        "2d"
    ) as CanvasRenderingContext2D;

    private _devices: Array<Device> = [];

    private _clear(): void {
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
        this._clear();
        this._renderDevices();
    }

    private _pushDevice(
        x: number,
        y: number,
        width: number,
        height: number
    ): void {
        this._devices.push(
            new Device(
                "Device" + (this._devices.length - 1),
                x,
                y,
                width,
                height,
                this._context,
                "green"
            )
        );
    }

    private _detectDeviceOverlap(deviceA: Device, deviceB: Device): boolean {
        if (
            deviceA.x - deviceA.width * 0.5 <=
                deviceB.x + deviceB.width * 0.5 &&
            deviceA.x + deviceA.width * 0.5 >=
                deviceB.x - deviceB.width * 0.5 &&
            deviceA.y - deviceA.height * 0.5 <=
                deviceB.y + deviceB.height * 0.5 &&
            deviceA.y + deviceA.height * 0.5 >= deviceB.y - deviceB.height * 0.5
        ) {
            return true;
        } else {
            return false;
        }
    }

    private _checkOverlaps(): void {
        for (let i = 0; i < this._devices.length; i++) {
            for (let j = 0; j < this._devices.length; j++) {
                const deviceA = this._devices[i];
                const deviceB = this._devices[j];

                if (deviceA.id !== deviceB.id) {
                    if (
                        this._detectDeviceOverlap(deviceA, deviceB) === true
                    ) {
                        deviceA.color = "red";
                        deviceB.color = "red";
                    }
                }
            }
        }
    }

    private _update(): void {
        this._checkOverlaps();
        this._clear();
        this._renderDevices();

        window.requestAnimationFrame(() => {
            this._update();
        });
    }

    init(): void {
        window.addEventListener("pointerdown", (event) => {
            this._pushDevice(event.clientX - 50, event.clientY - 50, 100, 100);
        });

        window.addEventListener("resize", () => {
            this._handleResize();
        });

        window.requestAnimationFrame(() => {
            this._update();
        });
    }
}
