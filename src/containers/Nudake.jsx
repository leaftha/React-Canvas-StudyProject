import { useEffect, useRef } from "react";
import throttle from "lodash/throttle";
import { gsap } from "gsap";

import classses from "../style/containers/Nudake.module.css";
import imge1 from "../assets/nudake-1.jpg";
import imge2 from "../assets/nudake-2.jpg";
import imge3 from "../assets/nudake-3.jpg";
import {
  drawImageCenter,
  getAngle,
  getDistance,
  getScrupedPercent,
} from "../utils/utils";

const Nudake = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasParent = canvas.parentNode;
    const ctx = canvas.getContext("2d");

    const imageSrcs = [imge1, imge2, imge3];
    const loadedImages = [];
    let currIndex = 0;
    let prePos = { x: 0, y: 0 };
    let isChangeing = false;

    let canvsWidth, canvsHeight;

    function resize() {
      canvsWidth = canvasParent.clientWidth;
      canvsHeight = canvasParent.clientHeight;
      canvas.style.width = `${canvsWidth}px`;
      canvas.style.height = `${canvsHeight}px`;
      canvas.width = canvsWidth;
      canvas.height = canvsHeight;

      preloadImages().then(() => drawImg());
    }

    function preloadImages() {
      return new Promise((resolve, reject) => {
        let loaded = 0;
        imageSrcs.forEach((src) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            loaded += 1;
            loadedImages.push(img);
            if (loaded === imageSrcs.length) return resolve();
          };
        });
      });
    }

    function drawImg() {
      isChangeing = true;
      const image = loadedImages[currIndex];
      const firstDrawing = ctx.globalCompositeOperation === "source-over";

      gsap.to(canvas, {
        opacity: 0,
        duration: firstDrawing ? 0 : 1,
        onComplete: () => {
          canvas.style.opacity = 1;
          ctx.globalCompositeOperation = "source-over";
          drawImageCenter(canvas, ctx, image);

          const nextImage = imageSrcs[(currIndex + 1) % imageSrcs.length];
          canvasParent.style.backgroundImage = `url(${nextImage})`;
          prePos = null;

          isChangeing = false;
        },
      });
    }

    function onMousedown(e) {
      if (isChangeing) return;
      canvas.addEventListener("mouseup", onMouseUp);
      canvas.addEventListener("mouseleave", onMouseUp);
      canvas.addEventListener("mousemove", onMouseMove);
      prePos = { x: e.offsetX, y: e.offsetY };
    }

    function onMouseUp() {
      canvas.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("mouseleave", onMouseUp);
      canvas.removeEventListener("mousemove", onMouseMove);
    }

    function onMouseMove(e) {
      if (isChangeing) return;
      drawCircles(e);
      checkPercent();
    }

    function drawCircles(e) {
      const nextPos = { x: e.offsetX, y: e.offsetY };
      if (!prePos) prePos = nextPos;
      const dist = getDistance(prePos, nextPos);
      const angle = getAngle(prePos, nextPos);

      for (let i = 0; i < dist; i++) {
        const x = prePos.x + Math.cos(angle) * i;
        const y = prePos.y + Math.sin(angle) * i;

        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, 50, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      }

      prePos = nextPos;
    }

    const checkPercent = throttle(() => {
      const percent = getScrupedPercent(ctx, canvsWidth, canvsHeight);
      if (percent > 50) {
        currIndex = (currIndex + 1) % imageSrcs.length;
        drawImg();
      }
    }, 500);

    canvas.addEventListener("mousedown", onMousedown);
    window.addEventListener("resize", resize);
    resize();

    return () => {
      canvas.removeEventListener("mousedown", onMousedown);
      canvas.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className={classses.nudake}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Nudake;
