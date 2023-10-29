# Device Placement

Audiotool challenge solution

## Live demo

https://device-placement.netlify.app/

## Local usage

Clone repository

```bash
git clone https://github.com/inn3rGames/device-placement.git
```

Install dependencies

```bash
cd device-placement
```

```bash
npm install
```

Start application

```bash
npm run start
```

Visit http://localhost:8080/

Click on your browser window

Random devices will spawn at your mouse/touch location

## Production

```bash
npm run build
```

## Suggestions and possible alternative solutions

There is a lot of room to improve this solution such as:

-   Replace basic for loops with spatial hashes: https://www.researchgate.net/publication/228958917_Optimization_of_large-scale_real-time_simulations_by_spatial_hashing

-   Rendering culling (render only the devices that are contained within the browser's viewport)

-   Snap to grid system

-   Replace the collision system based on an axis-aligned bounding box with one based on the Separating Axis Thereom that would collisions between complex polygons (such as a guitar for example): https://en.wikipedia.org/wiki/Hyperplane_separation_theorem

-   Add a 2D physics system such as Box2D/Planck.js/Matter.js to give a "real" weight and feel to desktop devices
