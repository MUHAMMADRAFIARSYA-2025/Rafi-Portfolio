import { useRef, useState, useEffect } from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom"; 
import ProfileCard from "./components/ProfileCard/ProfileCard";
import ShinyText from "./components/ShinyText/ShinyText";
import BlurText from "./components/BlurText/BlurText";
import Lanyard from "./components/Lanyard/Lanyard";
import { listTools, listProyek, listSertifikat, listSertifikatSMA } from "./data"; 
import ChromaGrid from "./components/ChromaGrid/ChromaGrid";
import ProjectModal from "./components/ProjectModal/ProjectModal"; 
import Aurora from "./components/Aurora/Aurora";
import PreLoader from "./components/PreLoader";
import AIChat from "./components/AIChat/AIChat";
import AOS from 'aos';
import ChatRoom from "./components/ChatRoom";
import 'aos/dist/aos.css'; 

// --- KOMPONEN SPOTLIGHT CARD ---
const SpotlightCard = ({ children, className = "" }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => setOpacity(1);
  const handleBlur = () => setOpacity(0);
  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-2xl ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(168,85,247,0.15), transparent 40%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// --- HALAMAN HIGH SCHOOL (UPDATED: Background Transparan) ---
const HighSchoolPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 relative z-10 px-4">
      <div className="text-center mb-16" data-aos="fade-down">
        <div className="inline-block px-4 py-1.5 mb-4 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-medium">Academic Journey</div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6"><ShinyText text="High School Certs" speed={3} /></h1>
        <BlurText text="Where it all started. A collection of competitions and milestones from my high school years." delay={50} animateBy="words" direction="top" className="max-w-2xl mx-auto text-gray-400 text-lg" />
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 max-w-6xl mx-auto">
        {listSertifikatSMA && listSertifikatSMA.map((item, index) => (
          <div key={item.id} data-aos="fade-up" data-aos-delay={index * 100}>
            <SpotlightCard className="h-full group hover:border-violet-500/50 transition-colors duration-500">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                
                {/* --- PERUBAHAN DI SINI: bg-black DIHAPUS --- */}
                <div className="w-full md:w-1/2 aspect-video rounded-2xl overflow-hidden border border-zinc-700 flex-shrink-0 relative">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                  />
                </div>
                {/* ------------------------------------------- */}

                <div className="flex-1 text-center md:text-left py-2">
                  <span className="text-xs font-bold tracking-wider text-violet-400 uppercase mb-2 block">{item.date}</span>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">{item.title}</h3>
                  <p className="text-zinc-400 mb-4">{item.issuer}</p>
                  <div className="h-1 w-12 bg-zinc-700 rounded-full group-hover:w-full group-hover:bg-violet-600 transition-all duration-500 md:mx-0 mx-auto md:mx-0"></div>
                </div>
              </div>
            </SpotlightCard>
          </div>
        ))}
      </div>
      <div className="text-center mt-20">
        <Link to="/" className="text-violet-400 hover:text-violet-300 font-semibold transition-colors flex items-center justify-center gap-2"><span>←</span> Back to Portfolio</Link>
      </div>
    </div>
  );
};

// --- HALAMAN CERTIFICATES PROFESSIONAL ---
const CertificatesLandingPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 relative z-10">
      <div className="text-center mb-16" data-aos="fade-up">
        <h1 className="text-5xl font-bold mb-4"><ShinyText text="Professional Certs" speed={3} /></h1>
        <p className="opacity-50 text-lg text-gray-300">Detailed collection of my technical achievements.</p>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 px-4 sm:px-0 max-w-7xl mx-auto">
        {listSertifikat && listSertifikat.map((sertif) => (
          <div key={sertif.id} data-aos="zoom-in" className="bg-zinc-900/80 border border-zinc-700 p-6 rounded-3xl hover:border-violet-500 transition-all shadow-2xl group">
            <div className="overflow-hidden rounded-2xl mb-4 aspect-video bg-zinc-800 flex items-center justify-center p-2 relative">
               <div className="absolute inset-0 bg-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay"></div>
              <img src={sertif.image} alt={sertif.title} loading="lazy" decoding="async" className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500 relative z-0" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">{sertif.title}</h3>
            <p className="text-violet-400 font-medium">{sertif.issuer}</p>
            <p className="text-zinc-500 text-sm mt-1">{sertif.date}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-20">
        <Link to="/" className="text-violet-400 hover:text-violet-300 font-semibold transition-colors flex items-center justify-center gap-2"><span>←</span> Back to Portfolio</Link>
      </div>
    </div>
  );
};

// --- MAIN PORTFOLIO (HOME) ---
const MainPortfolio = ({ aboutRef, handleInputFocus, handleProjectClick, handleContactSubmit, contactSubmitStatus }) => (
  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
    <div className="hero grid md:grid-cols-2 items-center pt-10 xl:gap-0 gap-6 grid-cols-1 scroll-mt-32" id="home">
      <div className="animate__animated animate__fadeInUp animate__delay-3s">
        <div className="flex items-center gap-3 mb-6 bg bg-zinc-800 w-fit p-4 rounded-2xl">
          <img src="./assets/rafi1.png" className="w-10 rounded-md" alt="profile small" loading="lazy" decoding="async" />
          <q className="text-gray-300">Avoid or just undertake it</q>
        </div>
        <h1 className="text-5xl font-bold mb-6"><ShinyText text="Hi I'm Muhammad Rafi Arsya" disabled={false} speed={3} /></h1>
        <BlurText text="A passionate Web Developer crafting high-performance, responsive experiences. I specialize exclusively in the web ecosystem, building seamless interfaces and clean, maintainable code that thrives in any browser." delay={150} animateBy="words" direction="top" className="mb-6 text-gray-400" />
        <div className="flex items-center sm:gap-4 gap-2">
          <a href="./assets/CV.pdf" download="Rafi-Arsya-CV.pdf" className="group font-semibold bg-black/40 backdrop-blur px-6 py-3 rounded-full border border-violet-500/30 hover:border-violet-400 hover:bg-violet-500/10 transition-all duration-300 hover:-translate-y-1"><ShinyText text="Download CV" speed={3} /></a>
          <a href="#project" className="group font-semibold bg-black/40 backdrop-blur px-6 py-3 rounded-full border border-violet-500/30 hover:border-violet-400 hover:bg-violet-500/10 transition-all duration-300 hover:-translate-y-1"><ShinyText text="Explore Projects" speed={3} /></a>
        </div>
      </div>
      <div className="md:ml-auto animate__animated animate__fadeInUp animate__delay-4s">
        <ProfileCard name="Rafi Arsya" title="Web Developer" handle="rarsya.03" status="Online" contactText="Contact Me" avatarUrl="./assets/rafi.png" showUserInfo={true} enableTilt={true} enableMobileTilt={false} onContactClick={() => console.log('Contact clicked')} />
      </div>
    </div>

    <div className="mt-32 mx-auto w-full max-w-[1600px] rounded-3xl border-[5px] border-violet-500/40 shadow-[0_0_30px_rgba(168,85,247,0.4)] bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] p-6 scroll-mt-32" id="about" ref={aboutRef}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 pt-0 px-8" data-aos="fade-up">
        <div className="basis-full md:basis-7/12 pr-0 md:pr-8 border-b md:border-b-0 md:border-r border-violet-500/30">
          <div className="flex-1 text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">About Me</h2>
            <BlurText text="I am Muhammad Rafi Arsya, a Full-Stack Developer and currently a student at Universiti Malaya, the top-ranked university in Malaysia. I am dedicated to building fast and reliable web applications, focusing on the entire development process—from designing databases to creating smooth, responsive user interfaces. By adopting a 'Performance First' mindset, I always strive to write clean code, optimize API speeds, and ensure a great user experience. I am passionate about applying my academic foundation to real-world projects, turning complex ideas into functional software that drives digital innovation." delay={150} animateBy="words" direction="top" className="text-base md:text-lg leading-relaxed mb-10 text-gray-300" />
            <div className="flex flex-col sm:flex-row items-center sm:justify-between text-center sm:text-left gap-y-8 sm:gap-y-0 mb-4 w-full text-white">
              <div><h1 className="text-3xl md:text-4xl mb-1">80<span className="text-violet-500">+</span></h1><p>Project Finished</p></div>
              <div><h1 className="text-3xl md:text-4xl mb-1">1.5<span className="text-violet-500">+</span></h1><p>Years of Experience</p></div>
              <div><h1 className="text-3xl md:text-4xl mb-1">-<span className="text-violet-500"></span></h1><p>GPA</p></div>
            </div>
          </div>
        </div>
        <div className="basis-full md:basis-5/12 pl-0 md:pl-8 overflow-hidden max-w-full flex justify-center h-[700px]"><Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} /></div>
      </div>
    </div>

    <div className="tools mt-32 scroll-mt-32" id="tools">
      <h1 className="text-4xl font-bold mb-4 text-white" data-aos="fade-up">Tools & Technologies</h1>
      <div className="tools-box grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {listTools.map((tool) => (
          <div key={tool.id} data-aos="fade-up" data-aos-delay={tool.dad} className="flex items-center gap-4 p-4 border border-zinc-700 rounded-xl bg-zinc-900/60 backdrop-blur-md hover:bg-zinc-800/80 transition-all duration-300 group shadow-lg">
            <img src={tool.gambar} alt={tool.nama} loading="lazy" decoding="async" className="w-12 h-12 object-contain bg-zinc-800 p-2 rounded-lg group-hover:bg-zinc-900" />
            <div className="flex flex-col overflow-hidden"><ShinyText text={tool.nama} speed={3} className="text-lg font-semibold block" /><p className="text-sm text-zinc-400 truncate">{tool.ket}</p></div>
          </div>
        ))}
      </div>
    </div>

    <div className="proyek mt-32 py-10 scroll-mt-32" id="project">
      <h1 className="text-center text-4xl font-bold mb-2 text-white">Projects</h1>
      <div className="proyek-box">
        <ChromaGrid items={listProyek} onItemClick={handleProjectClick} radius={500} damping={0.45} fadeOut={0.6} ease="power3.out" />
      </div>
    </div>

    <section className="sertifikat mt-32 scroll-mt-32 relative z-10" id="certificates">
      <h1 className="text-center text-4xl font-bold mb-2 text-white">Certificates</h1>
      <p className="text-center text-zinc-400 mb-10">Highlighting milestones from my academic and professional journey.</p>
      
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mb-12">
        {listSertifikat && listSertifikat.slice(0, 3).map((sertif) => (
          <div key={sertif.id} data-aos="zoom-in" className="bg-zinc-900/60 border border-zinc-700 p-4 rounded-2xl relative z-20 hover:border-violet-500/50 transition-colors flex flex-col">
            <div className="relative overflow-hidden rounded-xl mb-4 bg-[#000000] flex items-center justify-center p-4 h-[220px]">
              <img src={sertif.image} alt={sertif.title} loading="lazy" decoding="async" className="max-w-full max-h-full object-contain block transition-transform duration-500 hover:scale-105" />
            </div>
            <ShinyText text={sertif.title} speed={3} className="text-lg font-bold block" /><p className="text-zinc-400 text-sm mt-1">{sertif.issuer}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-30">
        <Link to="/certificates" className="group font-semibold px-10 py-4 rounded-full border border-violet-500/30 hover:border-violet-400 hover:bg-violet-900/40 transition-all duration-300 hover:-translate-y-1 text-center shadow-lg hover:shadow-violet-500/20">
          <ShinyText text="Professional Certs →" speed={3} />
        </Link>
        {/* <Link to="/highschool" className="group font-semibold px-10 py-4 rounded-full border border-violet-500/30 hover:border-violet-400 hover:bg-violet-900/40 transition-all duration-300 hover:-translate-y-1 text-center shadow-lg hover:shadow-violet-500/20">
          <ShinyText text="High School Certs →" speed={3} />
        </Link> */}
      </div>
    </section>

    <div className="kontak mt-32 sm:p-10 p-0 pb-40 scroll-mt-32" id="contact">
      <h1 className="text-4xl mb-2 font-bold text-center text-white">Contact & Chat</h1>
      <div className="flex flex-col md:flex-row gap-8 mt-10">
        <div className="flex-1 bg-zinc-800/50 backdrop-blur-sm p-6 rounded-2xl border border-zinc-700"><ChatRoom /></div>
        <div className="flex-1">
          <form onSubmit={handleContactSubmit} className="bg-zinc-800/50 backdrop-blur-sm p-4 sm:p-6 md:p-8 lg:p-10 w-full rounded-2xl border border-zinc-700">
            <div className="flex flex-col gap-4 sm:gap-6">
              <input type="text" name="Name" placeholder="Full Name" className="bg-zinc-900/50 text-white border border-zinc-700 p-3 rounded-xl outline-none" required onFocus={handleInputFocus} />
              <input type="email" name="Email" placeholder="Email" className="bg-zinc-900/50 text-white border border-zinc-700 p-3 rounded-xl outline-none" required onFocus={handleInputFocus} />
              <textarea name="message" rows="5" placeholder="Message..." className="bg-zinc-900/50 text-white border border-zinc-700 p-3 rounded-xl outline-none" required onFocus={handleInputFocus}></textarea>
              <button type="submit" disabled={contactSubmitStatus === "sending"} className="font-semibold bg-gradient-to-r from-violet-600 to-purple-600 p-3 sm:p-4 rounded-xl w-full hover:from-violet-500 hover:to-purple-500 transition-all duration-300 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-violet-500/50 hover:-translate-y-0.5 text-sm sm:text-base">
                {contactSubmitStatus === "sending" ? "Sending..." : "Send Message"}
              </button>
              {contactSubmitStatus === "success" && <p className="text-green-400 text-sm">✓ Message sent successfully!</p>}
              {contactSubmitStatus === "error" && <p className="text-red-400 text-sm">✗ Error sending message. Try again.</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
);

function App() {
  const aboutRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null); 
  const [contactSubmitStatus, setContactSubmitStatus] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Prevent browser restoring scroll position after refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // If this is a refresh (reload) and we're not on home, redirect to home
    const navEntries = performance.getEntriesByType?.('navigation') || [];
    const navType = navEntries[0]?.type || (performance.navigation?.type === 1 ? 'reload' : undefined);
    if (navType === 'reload' && location.pathname !== '/') {
      navigate('/', { replace: true });
      return;
    }

    if (location.hash) {
      const elementId = location.hash.replace('#', '');
      const element = document.getElementById(elementId);
      if (element) {
        // Delay scroll untuk hash links sampai PreLoader selesai
        setTimeout(() => { element.scrollIntoView({ behavior: 'smooth' }); }, 700);
      }
    } else if (location.pathname === '/') {
      // Delay scroll ke atas sampai PreLoader selesai (680ms + buffer)
      setTimeout(() => { window.scrollTo(0, 0); }, 700);
    }
  }, [location, navigate]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: 'ease-out-cubic' });
  }, []);

  useEffect(() => {
    // Ensure the initial view is at the top on first render
    window.scrollTo(0, 0);
  }, []);

  const handleProjectClick = (project) => setSelectedProject(project);
  const handleCloseModal = () => setSelectedProject(null);
  const handleInputFocus = (e) => {
    if (window.innerWidth < 768) {
      setTimeout(() => { e.target.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 300);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactSubmitStatus("sending");
    
    const formData = new FormData(e.target);
    formData.append('_captcha', 'false');
    formData.append('_next', window.location.href);
    
    try {
      const response = await fetch("https://formsubmit.co/arsyarafi51@gmail.com", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        setContactSubmitStatus("success");
        e.target.reset();
        setTimeout(() => setContactSubmitStatus(""), 3000);
      } else {
        setContactSubmitStatus("error");
        setTimeout(() => setContactSubmitStatus(""), 3000);
      }
    } catch (err) {
      setContactSubmitStatus("error");
      setTimeout(() => setContactSubmitStatus(""), 3000);
    }
  };

  return (
    <>
      <PreLoader />
      <AIChat />
      <div className="fixed top-0 left-0 w-full h-full -z-10 ">
        <Aurora colorStops={["#577870", "#1F97A6", "#127B99"]} blend={0.3} amplitude={0.7} speed={0.3} />
      </div>
      
      <Routes>
        <Route path="/" element={<MainPortfolio aboutRef={aboutRef} handleInputFocus={handleInputFocus} handleProjectClick={handleProjectClick} handleContactSubmit={handleContactSubmit} contactSubmitStatus={contactSubmitStatus} />} />
        <Route path="/certificates" element={<CertificatesLandingPage />} />
        <Route path="/highschool" element={<HighSchoolPage />} />
      </Routes>
      <ProjectModal isOpen={!!selectedProject} onClose={handleCloseModal} project={selectedProject} />
    </>
  );
}

export default App;