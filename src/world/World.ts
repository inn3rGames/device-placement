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

    private _checkDeviceOverlaps(): void {
        for (let i = 0; i < this._devices.length; i++) {
            for (let j = 0; j < this._devices.length; j++) {
                const deviceA = this._devices[i];
                const deviceB = this._devices[j];

                if (deviceA.id !== deviceB.id) {
                    if (this._detectDeviceOverlap(deviceA, deviceB) === true) {
                        deviceA.color = "red";
                        deviceB.color = "red";
                    }
                }
            }
        }
    }

    //Sample code usefull for mouse/touch detection.
    /* private _clamp(min: number, currentValue: number, max: number): number {
        return Math.min(Math.max(currentValue, min), max);
    }

    private _detectPointerOverlap(event: PointerEvent, device: Device): boolean {
        const closestPointX = this._clamp(
            device.x - device.width * 0.5,
            event.clientX,
            device.x + device.width * 0.5
        );
        const closestPointY = this._clamp(
            device.y - device.height * 0.5,
            event.clientY,
            device.y + device.height * 0.5
        );

        const distanceX = closestPointX - event.clientX;
        const distanceY = closestPointY - event.clientY;

        const distance = Math.sqrt(
            distanceX * distanceX + distanceY * distanceY
        );

        if (distance <= 25) {
            return true;
        } else {
            return false;
        }
    }

    private _checkMouseOverlaps(event: PointerEvent): void {
        for (let i = 0; i < this._devices.length; i++){
            const device = this._devices[i];

            if (this._detectPointerOverlap(event, device)) {
                console.log("Pointer collision");
            }
        }
    } */

    private _update(): void {
        this._checkDeviceOverlaps();
        this._clear();
        this._renderDevices();

        window.requestAnimationFrame(() => {
            this._update();
        });
    }

    init(): void {
        window.addEventListener("pointerdown", (event) => {
            this._pushDevice(event.clientX - 50, event.clientY - 50, 100, 100);
            /* this._checkMouseOverlaps(event); */
        });

        window.addEventListener("resize", () => {
            this._handleResize();
        });

        window.requestAnimationFrame(() => {
            this._update();
        });
    }
}
