import Device from "../entities/Device";

// Describe our World class where all the action happens
export default class World {
    // Expect our canvas and context to never return null in the TypeScript context
    private _canvas: HTMLCanvasElement = document.getElementById(
        "desktop"
    ) as HTMLCanvasElement;
    private _context: CanvasRenderingContext2D = this._canvas.getContext(
        "2d"
    ) as CanvasRenderingContext2D;

    // Store devices
    private _devices: Array<Device> = [];

    // Values for random device generation
    private _colors: Array<string> = [
        "red",
        "green",
        "blue",
        "yellow",
        "purple",
    ];
    private _sizes: Array<number> = [50, 100, 150, 200];

    // Clear our screen before each update
    private _clear(): void {
        this._context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this._context.canvas.width = window.innerWidth;
        this._context.canvas.height = window.innerHeight;
    }

    // Draw devices on screen
    private _renderDevices(): void {
        for (let i = 0; i < this._devices.length; i++) {
            this._devices[i].render();
        }
    }

    // Take care of resizing events
    private _handleResize(): void {
        this._clear();
        this._renderDevices();
    }

    // Add new devices
    private _pushDevice(
        x: number,
        y: number,
        width: number,
        height: number,
        color: string
    ): void {
        this._devices.push(
            new Device(
                "Device" + (this._devices.length - 1),
                x,
                y,
                width,
                height,
                this._context,
                color
            )
        );
    }

    // Here we check if two devices overlap
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

    // Resolve the overlap by translating the first device (deviceA)
    private _resolveOverlap(deviceA: Device, deviceB: Device): void {
        // Check on which side devices overlap
        const left =
            deviceB.x + deviceB.width * 0.5 - (deviceA.x - deviceA.width * 0.5);
        const top =
            deviceA.y +
            deviceA.height * 0.5 -
            (deviceB.y - deviceB.height * 0.5);
        const right =
            deviceA.x + deviceA.width * 0.5 - (deviceB.x - deviceB.width * 0.5);
        const down =
            deviceB.y +
            deviceB.height * 0.5 -
            (deviceA.y - deviceA.height * 0.5);

        const side = Math.min(left, top, right, down);

        deviceA.resolved = true;

        // Translate (move) the first device (deviceA) so it no longer overlaps the second device (deviceB)
        if (side === left) {
            deviceA.x = deviceA.x + left + 10;
            return;
        }

        if (side === top) {
            deviceA.y = deviceA.y - top - 10;
            return;
        }

        if (side === right) {
            deviceA.x = deviceA.x - right - 10;
            return;
        }

        if (side === down) {
            deviceA.y = deviceA.y + down + 10;
            return;
        }
    }

    // Check overlaps for all existing devices
    private _checkDeviceOverlaps(): void {
        for (let i = 0; i < this._devices.length; i++) {
            const deviceA = this._devices[i];
            deviceA.resolved = false;
            for (let j = 0; j < this._devices.length; j++) {
                const deviceB = this._devices[j];

                // Skip checking if the device is itself
                if (deviceA.id !== deviceB.id) {
                    if (this._detectDeviceOverlap(deviceA, deviceB) === true) {
                        if (deviceA.resolved === false) {
                            this._resolveOverlap(deviceA, deviceB);
                        }
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

    // Update world
    private _update(): void {
        this._checkDeviceOverlaps();
        this._clear();
        this._renderDevices();

        window.requestAnimationFrame(() => {
            this._update();
        });
    }

    // Initialize world
    init(): void {
        window.addEventListener("pointerdown", (event) => {
            const width =
                this._sizes[Math.floor(Math.random() * this._sizes.length)];
            const height =
                this._sizes[Math.floor(Math.random() * this._sizes.length)];
            const color =
                this._colors[Math.floor(Math.random() * this._colors.length)];

            this._pushDevice(
                event.clientX,
                event.clientY,
                width,
                height,
                color
            );
        });

        window.addEventListener("resize", () => {
            this._handleResize();
        });

        window.requestAnimationFrame(() => {
            this._update();
        });
    }
}
