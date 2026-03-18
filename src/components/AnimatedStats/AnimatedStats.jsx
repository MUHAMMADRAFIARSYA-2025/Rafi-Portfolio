import { useEffect, useRef, useState } from 'react';

const AnimatedStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState([
    { value: 0, target: 80, label: 'Projects', suffix: '+' },
    { value: 0, target: 1.5, label: 'Years Experience', suffix: '+' },
    { value: 0, target: null, label: 'GPA', suffix: '', display: '-' },
  ]);
  const containerRef = useRef(null);

  // Spring physics animation untuk counter
  const animateValue = (target, duration = 1000) => {
    return new Promise((resolve) => {
      let current = 0;
      const step = target / (duration / 16);
      
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(interval);
          resolve();
        }
      }, 16);
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isVisible) {
        setIsVisible(true);
        
        // Animate each stat dengan spring effect
        stats.forEach((stat, idx) => {
          setTimeout(() => {
            // Skip animation untuk null targets (GPA)
            if (stat.target === null) {
              return;
            }
            animateValue(stat.target).then(() => {
              setStats((prev) => {
                const newStats = [...prev];
                newStats[idx].value = stat.target;
                return newStats;
              });
            });
          }, idx * 100);
        });
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible, stats]);

  return (
    <div
      ref={containerRef}
      className="grid md:grid-cols-3 grid-cols-1 gap-8 my-16 px-4"
    >
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="group text-center p-8 rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/30 hover:border-violet-400/50 transition-all duration-300 transform hover:-translate-y-2"
        >
          <div className="relative mb-4">
            <div className="text-5xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
              {stat.display !== undefined ? stat.display : stat.value.toFixed(stat.target === 1.5 ? 1 : 0)}
              {stat.suffix}
            </div>
            {/* Animated background pulse */}
            <div className="absolute inset-0 bg-violet-500/10 blur-xl rounded-full scale-0 group-hover:scale-150 transition-all duration-500"></div>
          </div>
          <p className="text-zinc-400 text-lg font-medium group-hover:text-violet-300 transition-colors">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AnimatedStats;
