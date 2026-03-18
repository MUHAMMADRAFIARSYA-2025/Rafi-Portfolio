import { useEffect, useRef } from 'react';

const FloatingParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    let animationId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class dengan physics
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.ax = 0;
        this.ay = 0;
        this.radius = Math.random() * 1.5 + 0.5;
        this.life = Math.random() * 100 + 50;
        this.maxLife = this.life;
        this.color = `hsl(${Math.random() * 60 + 240}, 70%, 60%)`;
      }

      update(mouseX, mouseY) {
        // Attraction ke mouse dengan physics
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;

        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 0.5;
          this.ax = (dx / dist) * force;
          this.ay = (dy / dist) * force;
        } else {
          this.ax *= 0.9;
          this.ay *= 0.9;
        }

        // Velocity
        this.vx += this.ax;
        this.vy += this.ay;
        this.vx *= 0.95; // Damping
        this.vy *= 0.95;

        // Position
        this.x += this.vx;
        this.y += this.vy;

        // Bounce walls
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));

        // Gravity effect
        this.vy += 0.05;

        this.life--;
      }

      draw() {
        const opacity = (this.life / this.maxLife) * 0.6;
        ctx.fillStyle = this.color.replace(')', `, ${opacity})`).replace('hsl', 'hsla');
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // Glow effect
        ctx.strokeStyle = this.color.replace(')', `, ${opacity * 0.5})`).replace('hsl', 'hsla');
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle());
    }

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleTouchMove = (e) => {
      if (e.touches[0]) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connecting lines
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)';
      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update(mouseX, mouseY);
        if (particles[i].life <= 0) {
          particles.splice(i, 1);
        } else {
          particles[i].draw();
        }
      }

      // Add new particles
      if (particles.length < 60) {
        particles.push(new Particle());
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default FloatingParticles;
