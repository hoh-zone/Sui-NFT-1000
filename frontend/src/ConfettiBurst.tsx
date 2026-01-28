import { useEffect, useRef } from "react";

type ConfettiBurstProps = {
  active: boolean;
  durationMs?: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
};

const COLORS = [
  "#38bdf8",
  "#60a5fa",
  "#a78bfa",
  "#22c55e",
  "#f59e0b",
  "#fb7185",
  "#ffffff",
];

export function ConfettiBurst({ active, durationMs = 2200 }: ConfettiBurstProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // Create particles
    const cx = window.innerWidth / 2;
    const cy = Math.min(window.innerHeight * 0.35, 280);
    const count = 140;
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 6;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed - (2 + Math.random() * 2);
      particles.push({
        x: cx,
        y: cy,
        vx,
        vy,
        life: 1,
        size: 4 + Math.random() * 5,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.35,
      });
    }
    particlesRef.current = particles;
    startTimeRef.current = performance.now();

    const gravity = 0.18;
    const drag = 0.985;

    const tick = (t: number) => {
      const elapsed = t - startTimeRef.current;
      const done = elapsed >= durationMs;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.save();

      for (const p of particlesRef.current) {
        // Fade out by time.
        p.life = Math.max(0, 1 - elapsed / durationMs);

        p.vx *= drag;
        p.vy = p.vy * drag + gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        const alpha = p.life;
        if (alpha <= 0) continue;

        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;

        // Draw a rotated rectangle "confetti" piece.
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
        ctx.restore();
      }

      ctx.restore();

      if (!done) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      particlesRef.current = [];
    };
  }, [active, durationMs]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
      aria-hidden="true"
    />
  );
}

