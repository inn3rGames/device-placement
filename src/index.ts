import "./assets/styles/style.css";
import World from "./world/World";

const world = new World();
world.create();

window.addEventListener("resize", () => {
    world.handleResize();
})