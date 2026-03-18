import { useEffect, useRef, useState } from 'react';
import './InteractiveCards.css';

const InteractiveCards = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleTouchMove = (e) => {
      if (e.touches[0]) {
        setMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      const dx = mousePos.x - cardCenterX;
      const dy = mousePos.y - cardCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 200;

      if (distance < maxDistance) {
        const angle = Math.atan2(dy, dx);
        const rotation = (angle * 180) / Math.PI;
        const scale = 1 + (1 - distance / maxDistance) * 0.1;

        card.style.transform = `perspective(1000px) rotateY(${Math.cos(angle) * 15}deg) rotateX(${-Math.sin(angle) * 15}deg) scale(${scale})`;
        card.style.boxShadow = `0 ${50 - distance / 4}px ${80 - distance / 3}px rgba(139, 92, 246, ${0.4 - distance / maxDistance * 0.2})`;
      } else {
        card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
        card.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.2)';
      }
    });
  }, [mousePos]);

  const skills = [
    { icon: '⚛️', title: 'React', desc: 'Modern UI' },
    { icon: '🎨', title: 'Tailwind CSS', desc: 'Styling' },
    { icon: '📡', title: 'Node.js', desc: 'Backend' },
    { icon: '🗄️', title: 'MongoDB', desc: 'Database' },
    { icon: '🔧', title: 'DevTools', desc: 'Development' },
    { icon: '✨', title: 'WebGL', desc: '3D Graphics' },
  ];

  return (
    <div ref={containerRef} className="py-20">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6 max-w-6xl mx-auto px-4">
        {skills.map((skill, idx) => (
          <div
            key={idx}
            ref={(el) => (cardsRef.current[idx] = el)}
            className="interactive-physics-card bg-gradient-to-br from-zinc-800/50 to-zinc-900/30 border border-violet-500/30 rounded-2xl p-8 text-center transition-all duration-200 ease-out cursor-pointer group hover:border-violet-400/50"
          >
            <div className="text-6xl mb-4 transform group-hover:scale-125 transition-transform duration-300">
              {skill.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">
              {skill.title}
            </h3>
            <p className="text-zinc-400 text-sm group-hover:text-zinc-300 transition-colors">
              {skill.desc}
            </p>
            
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/0 via-violet-600/0 to-violet-600/0 opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveCards;
