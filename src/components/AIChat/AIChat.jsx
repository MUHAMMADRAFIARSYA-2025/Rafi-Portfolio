import { useState, useRef, useEffect } from "react";

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "Hey! 👋 I'm Rafi's intelligent AI Assistant. Ask me anything about his projects (80+ completed!), technical skills, experience, certifications, or how to get in touch. I understand context and can have natural conversations! 🚀",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage) => {
    const lowerInput = userMessage.toLowerCase();

    // Intelligence scoring system - multiple keyword matching with context awareness
    const scoreResponse = (keywords) => {
      return keywords.filter(keyword => lowerInput.includes(keyword)).length;
    };

    const responseTopics = {
      projects: {
        keywords: ["project", "portfolio", "work", "built", "build", "develop", "application", "app", "website", "site", "create", "made"],
        variations: [
          "Rafi has completed 80+ diverse projects! 🚀 These include e-commerce platforms, real-time collaboration tools, data dashboards, and interactive web experiences. Each project leverages modern tech stacks - React frontends, Node.js backends, and database design. What type of project interests you most?",
          "With 80+ projects under his belt, Rafi's portfolio spans multiple domains: web apps, progressive web apps, full-stack applications, and creative interactive experiences. Most showcase clean architecture and performance optimization. Curious about a specific project category?",
          "Rafi's project experience covers: Frontend-heavy (React, animations), Backend-heavy (APIs, databases), Full-stack (complete systems), and 3D Web (Three.js). Average project complexity ranges from startup MVPs to enterprise-scale applications. Want to explore specific projects?",
        ],
      },
      skills: {
        keywords: ["skill", "technology", "tech", "stack", "language", "framework", "library", "tool", "expertise", "know", "use", "proficient"],
        variations: [
          "Rafi's Technical Stack 💻:\n\n📱 Frontend: React 19, JavaScript/TypeScript, Tailwind CSS, animations (Framer Motion), Three.js for 3D\n⚙️ Backend: Node.js, Express, RESTful APIs\n💾 Database: MongoDB, Firebase\n🛠️ DevTools: Git, Vite, ESLint, npm/yarn\n\nHe's constantly learning and experimenting with new technologies!",
          "Frontend Specialization: React components, state management, responsive design, performance optimization, CSS-in-JS, animations. Backend Skills: API design, database optimization, authentication, real-time features. Tools: Git, Docker basics, CI/CD concepts. What interests you most?",
          "Rafi excels in: Modern JavaScript ecosystems, component-based architecture, full-stack development, performance profiling, and creative frontend solutions. He follows best practices like clean code, proper testing approaches, and documentation. Any specific tech you'd like to know more about?",
        ],
      },
      experience: {
        keywords: ["experience", "year", "years", "work", "company", "job", "professional", "background", "career", "where", "worked"],
        variations: [
          "Rafi brings 1.5+ years of professional development experience! 🎓 Currently pursuing studies at Universiti Malaya (Asia's top-ranked university). He maintains a 'Performance First' mindset: optimizing code, databases, and user experiences. His career focuses on building scalable, maintainable web solutions.",
          "With 1.5+ years in the field, Rafi has grown from learning fundamentals to handling complex full-stack projects. He combines academic knowledge from Universiti Malaya with real-world problem-solving skills. His development philosophy: clean code, great performance, excellent UX.",
          "Professional Timeline: Started with web fundamentals → Progressive complexity in projects → Full-stack expertise → Currently: Advanced system design and optimization. Education: Top-tier university (Universiti Malaya). Focus: Writing production-ready code and mentoring junior developers.",
        ],
      },
      contact: {
        keywords: ["contact", "reach", "email", "message", "connect", "get in touch", "talk", "communicate", "hire", "collaboration"],
        variations: [
          "Let's Connect! 🤝\n\n📧 Email: arsyarafi51@gmail.com\n📋 Use the Contact Form above (instant delivery)\n🔗 Find him on: GitHub, LinkedIn (links in navbar)\n💬 Questions about projects or opportunities? Reach out anytime!\n\nRafi typically responds quickly to meaningful messages!",
          "Want to collaborate or discuss opportunities? You can:\n1. Fill the contact form here (fastest ⚡)\n2. Email: arsyarafi51@gmail.com\n3. Explore his GitHub for code samples\n4. Connect on LinkedIn for professional inquiries\n\nWhat would you like to discuss?",
          "Multiple ways to reach Rafi:\n• Contact Form (recommended) - Direct communication\n• Email - arsyarafi51@gmail.com\n• Social profiles - GitHub, LinkedIn\n• Project discussions or hiring? Let's talk! 🚀",
        ],
      },
      certificates: {
        keywords: ["certificate", "cert", "qualification", "qualification", "achievement", "credential", "award", "recognize"],
        variations: [
          "Rafi's Certifications showcase his commitment to excellence! 🏆 He has:\n\n🎓 Professional certifications in web development, databases, and modern frameworks\n📚 Academic achievements and competitive awards\n🏅 High School (PPSD) certifications\n\nEach credential represents dedicated learning and skill validation. Check the 'Certificates' section to see all achievements!",
          "Professional Development: Rafi continuously pursues certifications to validate his skills and stay current with tech trends. From foundational web development certs to advanced specializations. His certificates span both formal education and professional training programs.",
          "Achievement Highlights: Multiple professional certifications, academic excellence at Universiti Malaya, competitive awards, and recognized training completions. His 'Certificates' page has detailed info on each credential with issuer details and dates.",
        ],
      },
      about: {
        keywords: ["about", "who", "introduce", "bio", "tell me", "know", "yourself", "background", "person"],
        variations: [
          "About Muhammad Rafi Arsya 👤:\n\nA passionate **Full-Stack Web Developer** dedicated to building lightning-fast, reliable web applications. Currently studying at **Universiti Malaya** (Malaysia's top university).\n\n**Philosophy**: Performance First, Great UX Always ⚡\n**Approach**: Clean code, meaningful problem-solving, continuous learning\n**Passion**: Creating elegant solutions to complex problems\n\nWant to know more about his work?",
          "Rafi's Story: Started coding with curiosity → Developed into full-stack expertise → Now focuses on performance optimization and system design. He believes great software combines technical excellence with exceptional user experience. Based in Malaysia, studying at a premier university, building the web one project at a time.",
          "Meet Rafi: A developer who believes code should be fast, readable, and maintainable. With 1.5+ years of experience and 80+ projects completed, he combines academic rigor with practical problem-solving. Specializes in web technologies and loves creating impactful digital experiences.",
        ],
      },
      feedback: {
        keywords: ["good job", "nice", "cool", "awesome", "great", "love", "excellent", "impressive", "amazing"],
        variations: [
          "Thank you! 😊 Rafi takes pride in his work and greatly appreciates feedback! If you have any suggestions or want to discuss his projects further, feel free to reach out. Happy to connect!",
          "Thanks for the kind words! 🙌 Rafi is always excited when people appreciate his work. Constructive feedback also helps him improve. What aspect did you enjoy most?",
          "That's awesome to hear! 💫 Rafi's constantly pushing himself to create better experiences. If you'd like to work together or discuss anything related to web development, let's connect!",
        ],
      },
      greeting: {
        keywords: ["hello", "hi", "hey", "greetings", "what's up", "how are you"],
        variations: [
          "Hey there! 👋 Welcome to Rafi's portfolio! I'm here to answer questions about his work, skills, projects, or how you can get in touch. What would you like to know?",
          "Hi! 😊 Great to see you here! I can help with questions about Rafi's projects, experience, tech stack, or anything else. Fire away!",
          "Hey! 🚀 Welcome aboard! You can ask me about anything related to Rafi's portfolio, his projects, skills, or how to collaborate. What's on your mind?",
        ],
      },
    };

    // Score each topic and find the best match
    let bestTopic = null;
    let bestScore = 0;

    for (const [topic, data] of Object.entries(responseTopics)) {
      const score = scoreResponse(data.keywords);
      if (score > bestScore) {
        bestScore = score;
        bestTopic = topic;
      }
    }

    // If we found a matching topic, return a random variation
    if (bestTopic && responseTopics[bestTopic].variations.length > 0) {
      const variations = responseTopics[bestTopic].variations;
      return variations[Math.floor(Math.random() * variations.length)];
    }

    // Fallback intelligent responses
    const fallbacks = [
      "That's an interesting question! 🤔 While I don't have specific information about that, I'd recommend:\n1. Check the different portfolio sections (About, Projects, Skills, Certificates)\n2. Use the contact form to ask Rafi directly\n3. Explore the GitHub links for code examples\n\nWhat would help you most?",
      "Hmm, that's something I wasn't explicitly programmed to know! 😅 But Rafi's portfolio has lots of information. Is there anything specific about his work, experience, or projects I can help with?",
      "Great question! For topics I'm not sure about, the best approach is to:\n📧 Email Rafi directly\n📋 Use the contact form\n🔗 Check his social profiles\n\nHe's always happy to discuss opportunities or answer detailed questions!",
    ];

    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: "bot",
        text: generateAIResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans">
      {/* Chat Widget */}
      {isOpen && (
        <div className="mb-4 w-96 max-w-[calc(100vw-48px)] bg-gradient-to-b from-zinc-900 to-black border border-violet-500/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Rafi's Smart AI</h3>
              <p className="text-sm text-violet-100">Context-aware & conversational 🧠</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Container */}
          <div className="h-96 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-2xl whitespace-pre-wrap ${
                    msg.type === "user"
                      ? "bg-violet-600 text-white rounded-br-none"
                      : "bg-zinc-800 text-zinc-100 border border-violet-500/30 rounded-bl-none"
                  } text-sm leading-relaxed`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-zinc-800 border border-violet-500/30 px-4 py-3 rounded-2xl rounded-bl-none">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="border-t border-violet-500/20 p-4 flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-all font-medium"
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
    </div>
  );
};

export default AIChat;
