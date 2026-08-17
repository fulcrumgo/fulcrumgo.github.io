import { useEffect, useRef } from "react";

/**
 * A drifting field of crystal shards behind the hero.
 *
 * The shards are triangles (the same form as the Fulcrum pivot), at a range
 * of depths. They drift on their own, and ease away from the cursor in
 * proportion to depth, so the near ones move further than the far ones and the
 * field reads as having space in it.
 *
 * Deliberately restrained: on a white page anything stronger fights the
 * headline, so these sit just barely above the paper colour. Tune COUNT,
 * the size range, the alpha range or the fill below to change how present
 * they are.
 *
 * Everything is drawn to one canvas, so this is a single composited layer
 * rather than 40 animated DOM nodes.
 */

const COUNT = 26;
const PUSH_RADIUS = 190; // px around the cursor that shards react within
const PUSH_STRENGTH = 46; // px of displacement at the very centre
const EASE = 0.06; // how quickly a shard reaches its target offset

function makeShards(count) {
  const shards = [];
  for (let i = 0; i < count; i++) {
    // Depth drives size, opacity and how strongly the cursor moves it.
    const depth = 0.25 + Math.random() * 0.75;
    shards.push({
      bx: Math.random(),
      by: Math.random(),
      // 30% smaller than the original 3 to 14px range
      size: 2.1 + depth * 7.7,
      depth,
      alpha: 0.05 + depth * 0.11,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.0004,
      // Each shard drifts on its own slow sine, so the field never pulses
      // in unison.
      driftPhase: Math.random() * Math.PI * 2,
      driftSpeed: 0.00008 + Math.random() * 0.00014,
      driftAmp: 6 + Math.random() * 16,
      ox: 0,
      oy: 0,
    });
  }
  return shards;
}

function drawShard(ctx, x, y, size, rot, alpha) {
  const h = size * 0.9;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.beginPath();
  ctx.moveTo(0, -h);
  ctx.lineTo(size, h * 0.8);
  ctx.lineTo(-size, h * 0.8);
  ctx.closePath();

  /* Very close to the paper colour. Composited over white this lands
     between #FBFBFB and #F3F3F3, so the shards read as a texture in the
     page rather than as objects sitting on top of it. */
  ctx.fillStyle = `rgba(182, 178, 170, ${alpha})`;
  ctx.fill();
  ctx.restore();
}

export default function CursorCrystals({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;

    const shards = makeShards(COUNT);
    // Off-canvas until the pointer arrives, so nothing is pushed on load.
    const pointer = { x: -9999, y: -9999, active: false };
    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = (time) => {
      ctx.clearRect(0, 0, width, height);

      for (const s of shards) {
        const baseX = s.bx * width;
        const baseY = s.by * height;

        // Autonomous drift.
        let targetX = Math.sin(time * s.driftSpeed + s.driftPhase) * s.driftAmp;
        let targetY =
          Math.cos(time * s.driftSpeed * 0.8 + s.driftPhase) * s.driftAmp * 0.6;

        // Cursor repulsion, falling off smoothly to zero at PUSH_RADIUS.
        if (pointer.active) {
          const dx = baseX + s.ox - pointer.x;
          const dy = baseY + s.oy - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < PUSH_RADIUS && dist > 0.001) {
            const falloff = (1 - dist / PUSH_RADIUS) ** 2;
            const force = falloff * PUSH_STRENGTH * s.depth;
            targetX += (dx / dist) * force;
            targetY += (dy / dist) * force;
          }
        }

        s.ox += (targetX - s.ox) * EASE;
        s.oy += (targetY - s.oy) * EASE;
        s.rot += s.rotSpeed * 16;

        drawShard(ctx, baseX + s.ox, baseY + s.oy, s.size, s.rot, s.alpha);
      }
    };

    const loop = (time) => {
      if (!running) return;
      render(time);
      raf = requestAnimationFrame(loop);
    };

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    resize();

    if (reduced) {
      // Honour the preference: one static frame, no loop, no cursor tracking.
      render(0);
      return () => {};
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("resize", resize);

    // Stop burning frames once the hero has scrolled away.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(loop);
        } else if (!entry.isIntersecting) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
