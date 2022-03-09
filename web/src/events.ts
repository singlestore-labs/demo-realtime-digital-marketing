import * as PIXI from "pixi.js";

export const onClick = (
  emitter: PIXI.utils.EventEmitter,
  handler: (evt: PIXI.InteractionEvent) => void
) => {
  let isDown = false;
  let startPosition = new PIXI.Point(0, 0);
  let startTime = 0;

  emitter.on("pointerdown", (evt: PIXI.InteractionEvent) => {
    isDown = true;
    startPosition = evt.data.global;
    startTime = performance.now();
  });

  emitter.on("pointerup", (evt: PIXI.InteractionEvent) => {
    if (!isDown) {
      return;
    }
    isDown = false;

    const delta = performance.now() - startTime;
    if (delta > 200) {
      return;
    }

    const endPosition = evt.data.global;
    const distance = Math.sqrt(
      Math.pow(endPosition.x - startPosition.x, 2) +
        Math.pow(endPosition.y - startPosition.y, 2)
    );

    if (distance > 10) {
      return;
    }

    handler(evt);
  });

  emitter.on("pointercancel", () => {
    isDown = false;
  });
};
