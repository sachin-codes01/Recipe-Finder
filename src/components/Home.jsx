import { useState, useRef, useEffect, useCallback } from "react";

const Cell = ({ bg, img, label, rowSpan, small, onClick }) => (
  <div onClick={onClick}
    className="relative cursor-pointer overflow-hidden hover:opacity-90 transition-opacity"
    style={{ gridRow: rowSpan ? "1 / 3" : undefined, backgroundColor: bg }}
  >
    {img && <img src={img} alt={label} className="w-full h-full object-cover block" />}
    <div className={`absolute bg-black/45 text-white rounded-full font-medium
        hidden min-[460px]:flex
        ${small ? "bottom-2 left-2 text-[10px] px-2 py-0.5" : "bottom-3 left-3 text-xs px-2 py-1"}`}
    >
      {label}
    </div>
  </div>
);

const StarRating = ({ n = 5, darkMode }) => (
  <div className="flex gap-0.5 mb-2.5">
    {Array.from({ length: n }).map((_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={darkMode ? "#facc15" : "#111"} stroke="none">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ))}
  </div>
);

const SocialIcon = ({ name, size = 16, color = "currentColor" }) => {
  const icons = {
    instagram: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="17.5" cy="6.5" r="1" fill={color} stroke="none" />
      </svg>
    ),
    x: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    ),
    facebook: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    linkedin: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    github: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
    youtube: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
      </svg>
    ),
  };
  return icons[name] || null;
};

export const Navbar = ({ darkMode, setDarkMode, search, onSearch, onNavigate }) => {
  const [inputVal, setInputVal] = useState(search || "");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const debounceRef = useRef(null);
  const lastEmitted = useRef(search || "");
  const dm = darkMode;

  useEffect(() => {
    if (search !== lastEmitted.current) {
      setInputVal(search || "");
      lastEmitted.current = search || "";
    }
  }, [search]);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = useCallback((val) => {
    setInputVal(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      lastEmitted.current = val;
      onSearch(val);
    }, 350);
  }, [onSearch]);

  const handleClear = useCallback(() => {
    setInputVal("");
    clearTimeout(debounceRef.current);
    lastEmitted.current = "";
    onSearch("");
  }, [onSearch]);

  const menuItems = [
    { icon: "👤", label: "Log in" },
    { icon: "✨", label: "Sign up" },
    { icon: "📜", label: "History" },
    { icon: "⚙️", label: "Settings" },
  ];

  return (
    <nav className={`flex items-center justify-between px-7 h-14 border-b sticky top-0 z-10 gap-4 transition-colors duration-300
      ${dm ? "bg-[#111] border-[#222]" : "bg-white border-[#ebebeb]"}`}>

      <div className="flex items-center gap-5 shrink-0">
        <span
          onClick={() => onNavigate?.("home")}
          className={`font-serif italic font-bold text-xl tracking-tight cursor-pointer whitespace-nowrap
            ${dm ? "text-white" : "text-[#111]"}`}
        >
          Recipes
        </span>
        <div className="hidden [@media(min-width:730px)]:flex items-center gap-5">
          {["Browse", "Cuisines", "Quick", "Healthy"].map((item, i) => (
            <span
              key={item}
              onClick={() => handleSearch(i === 0 ? "" : item.toLowerCase())}
              className={`text-[13px] cursor-pointer whitespace-nowrap transition-colors
                ${i === 0
                  ? dm ? "text-white font-medium" : "text-[#111] font-medium"
                  : dm ? "text-[#aaa] hover:text-white" : "text-[#666] hover:text-[#111]"}`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className={`flex items-center gap-2.5 border rounded-lg px-3 py-1.5 flex-1 min-w-0
        ${dm ? "border-[#333] bg-[#1a1a1a]" : "border-[#e0e0e0] bg-[#fafafa]"}`}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={dm ? "#888" : "#999"} strokeWidth="2" className="shrink-0">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          value={inputVal}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search recipes…"
          className={`border-none outline-none text-[13px] bg-transparent w-full min-w-0
            ${dm ? "text-[#e0e0e0] placeholder:text-[#555]" : "text-[#333] placeholder:text-[#aaa]"}`}
        />
        {inputVal && (
          <svg onClick={handleClear} width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke={dm ? "#888" : "#aaa"} strokeWidth="2" className="cursor-pointer shrink-0">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        )}
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <button className={`hidden min-[460px]:inline-flex text-[13px] font-semibold rounded-lg px-4 py-1.5
          whitespace-nowrap cursor-pointer border-none ${dm ? "bg-white text-[#111]" : "bg-[#111] text-white"}`}>
          Get Pro
        </button>

        <div ref={menuRef} className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex flex-col gap-1 items-center justify-center p-2 rounded-lg border cursor-pointer bg-transparent
              ${dm ? "border-[#333]" : "border-[#e0e0e0]"}`}
          >
            {[0, 1, 2].map((i) => (
              <span key={i} className="block w-[18px] rounded-sm transition-all duration-200"
                style={{
                  height: "1.5px",
                  backgroundColor: dm ? "#ddd" : "#333",
                  transform: menuOpen
                    ? i === 0 ? "translateY(5.5px) rotate(45deg)"
                      : i === 2 ? "translateY(-5.5px) rotate(-45deg)"
                        : "scaleX(0)"
                    : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>

          {menuOpen && (
            <div className={`absolute right-0 top-[calc(100%+8px)] rounded-2xl shadow-xl min-w-[200px] overflow-hidden z-50 border
              ${dm ? "bg-[#1a1a1a] border-[#333]" : "bg-white border-[#ebebeb]"}`}>
              {menuItems.map((item, i) => (
                <div key={item.label}
                  className={`flex items-center gap-3 px-[18px] py-3 text-sm cursor-pointer transition-colors
                    ${dm ? "text-[#e0e0e0] hover:bg-[#222]" : "text-[#222] hover:bg-[#f8f8f8]"}
                    ${i < menuItems.length - 1 ? `border-b ${dm ? "border-[#222]" : "border-[#f0f0f0]"}` : ""}`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </div>
              ))}
              <div className={`flex items-center justify-between px-[18px] py-3 border-t ${dm ? "border-[#222]" : "border-[#f0f0f0]"}`}>
                <div className={`flex items-center gap-2.5 text-sm font-medium ${dm ? "text-[#e0e0e0]" : "text-[#222]"}`}>
                  <span className="text-base">{dm ? "🌙" : "☀️"}</span>
                  {dm ? "Dark mode" : "Light mode"}
                </div>
                <div
                  onClick={() => setDarkMode(!dm)}
                  className={`w-[42px] h-6 rounded-full relative cursor-pointer transition-colors duration-200
                    ${dm ? "bg-[#444]" : "bg-[#e0e0e0]"}`}
                >
                  <div className={`absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow transition-all duration-200
                    ${dm ? "left-[21px]" : "left-[3px]"}`} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const Home = ({ setSearch, darkMode }) => {
  const dm = darkMode;

  const featureCards = [
    { icon: "🔍", title: "Smart Search", desc: "Find any recipe in seconds with intelligent search across thousands of dishes.", bg: "#f0ede8" },
    { icon: "🥗", title: "Nutrition Info", desc: "Every recipe comes with full health scores, macros, and dietary tags.", bg: "#eaf0ea" },
    { icon: "⏱", title: "Quick Meals", desc: "Filter by cook time. From 10-minute lunches to slow-cooked weekend dinners.", bg: "#eaeaf0" },
    { icon: "💸", title: "Budget Friendly", desc: "See price-per-serving in INR. Cook well without breaking the bank.", bg: "#f0eaea" },
  ];

  const quickFilters = [
    { icon: "⏱", label: "Under 30 min", q: "quick" },
    { icon: "🥗", label: "Healthy", q: "healthy" },
    { icon: "🌱", label: "Vegan", q: "vegan" },
    { icon: "💸", label: "Budget", q: "budget" },
    { icon: "🍗", label: "High Protein", q: "protein" },
    { icon: "🍰", label: "Desserts", q: "dessert" },
  ];

  const cuisines = [
    { label: "Italian", emoji: "🍝", q: "italian" },
    { label: "Indian", emoji: "🍛", q: "indian" },
    { label: "Mexican", emoji: "🌮", q: "mexican" },
    { label: "Japanese", emoji: "🍱", q: "japanese" },
    { label: "Mediterranean", emoji: "🥙", q: "mediterranean" },
    { label: "Thai", emoji: "🍜", q: "thai" },
    { label: "American", emoji: "🍔", q: "american" },
    { label: "Chinese", emoji: "🥡", q: "chinese" },
  ];

  const reviews = [
    { name: "Priya S.", role: "Home cook", text: "I use this every single day. The health scores help me make smarter choices for my family.", avatar: "PS", stars: 5 },
    { name: "Arjun M.", role: "Fitness enthusiast", text: "Finally an app that shows nutrition alongside the recipe. The vegan filter is a lifesaver.", avatar: "AM", stars: 5 },
    { name: "Neha R.", role: "Working professional", text: "Quick meal filters are brilliant. I can plan my whole week in under 5 minutes.", avatar: "NR", stars: 5 },
    { name: "Rahul T.", role: "Food blogger", text: "The cuisine categories are so well organised. Love the clean interface — nothing cluttered.", avatar: "RT", stars: 4 },
    { name: "Sunita K.", role: "Nutritionist", text: "I recommend this to all my clients. The health scores are accurate and easy to understand.", avatar: "SK", stars: 5 },
    { name: "Dev P.", role: "Student", text: "Budget filter + quick meals = my entire college life sorted. Seriously underrated app.", avatar: "DP", stars: 5 },
  ];

  const footerLinks = {
    Discover: ["Browse Recipes", "Cuisines", "Quick Meals", "Healthy Picks", "Budget Meals"],
    Features: ["Nutrition Info", "Health Scores", "Dietary Tags", "Price Tracker", "Search Tips"],
    Company: ["About Us", "Blog", "Careers", "Press", "Contact"],
    Legal: ["Privacy Policy", "Terms of Use", "Cookie Policy", "Accessibility"],
  };

  const socialLinks = [
    { name: "instagram", href: "https://instagram.com", label: "Instagram", color: "#E1306C", bg: "#fce4ef" },
    { name: "x", href: "https://x.com", label: "X", color: "#000000", bg: "#e8e8e8" },
    { name: "facebook", href: "https://facebook.com", label: "Facebook", color: "#1877F2", bg: "#e3effe" },
    { name: "linkedin", href: "https://linkedin.com", label: "LinkedIn", color: "#0A66C2", bg: "#deeaf8" },
    { name: "github", href: "https://github.com", label: "GitHub", color: "#333333", bg: "#ebebeb" },
    { name: "youtube", href: "https://youtube.com", label: "YouTube", color: "#FF0000", bg: "#ffe0e0" },
  ];

  return (
    <div className={`transition-colors duration-300 ${dm ? "bg-[#0e0e0e]" : "bg-white"}`}
      style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>

      <div className="px-7 pt-10">
        <h1
          className={`font-extrabold leading-none tracking-[-2px] mb-4
            text-[clamp(26px,8vw,100px)] whitespace-normal
            [@media(min-width:400px)]:text-[clamp(32px,6.5vw,100px)] [@media(min-width:400px)]:whitespace-nowrap [@media(min-width:400px)]:overflow-hidden
            ${dm ? "text-[#f0f0f0]" : "text-[#111]"}`}
        >
          no more boring meals
        </h1>
        <p className={`text-sm mb-7 ${dm ? "text-[#888]" : "text-[#555]"}`}>
          The best free recipes and royalty free cooking ideas. Powered by flavor everywhere.
        </p>

        <style>{`
          .hero-grid { grid-template-rows: 130px 130px; }
          @media (min-width: 510px) {
            .hero-grid { grid-template-rows: 210px 210px; }
          }
        `}</style>
        <div className="hero-grid grid grid-cols-4 rounded-xl overflow-hidden gap-[5px]">
          <Cell bg="#C9B59B" img="/chicken.jpg" label="Chicken" rowSpan onClick={() => setSearch("chicken")} />
          <Cell bg="#2E2E2E" img="/pasta.jpg" label="Pasta" rowSpan onClick={() => setSearch("pasta")} />
          <Cell bg="#7B9E83" img="/salad.jpg" label="Salad" onClick={() => setSearch("salad")} />
          <Cell bg="#E2CEBA" img="/desert.JPG" label="Dessert" onClick={() => setSearch("dessert")} />
          <div className="grid grid-cols-2 gap-[5px]">
            <Cell bg="#D4A574" img="/soup.jpg" label="Soup" small onClick={() => setSearch("soup")} />
            <Cell bg="#B8C4A0" img="/vegan.jpg" label="Vegan" small onClick={() => setSearch("vegan")} />
          </div>
          <Cell bg="#C4937A" img="/pizza.jpg" label="Pizza" onClick={() => setSearch("pizza")} />
        </div>
      </div>

      <div className="px-7 py-16">
        <p className="text-xs font-semibold text-[#888] tracking-[2px] uppercase mb-2">Why RecipeFinder</p>
        <h2 className={`font-extrabold tracking-[-1.5px] leading-tight mb-9 text-[clamp(28px,4vw,44px)]
          ${dm ? "text-[#f0f0f0]" : "text-[#111]"}`}>
          everything you need, nothing you don't
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featureCards.map((card) => (
            <div key={card.title}
              className={`rounded-2xl p-7 ${dm ? "bg-[#1a1a1a] border border-[#222]" : ""}`}
              style={{ backgroundColor: dm ? undefined : card.bg }}>
              <div className="text-[28px] mb-3.5">{card.icon}</div>
              <h3 className={`text-base font-bold tracking-[-0.3px] mb-2 ${dm ? "text-[#e0e0e0]" : "text-[#111]"}`}>
                {card.title}
              </h3>
              <p className={`text-[13px] leading-relaxed m-0 ${dm ? "text-[#888]" : "text-[#555]"}`}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className={`px-7 py-16 ${dm ? "bg-[#0a0a0a]" : "bg-[#f0eeeb]"}`}>
        <p className="text-xs font-semibold text-[#888] tracking-[2px] uppercase mb-2">Quick Pick</p>
        <h2 className={`font-extrabold tracking-[-1px] mb-7 text-[clamp(24px,3vw,36px)]
          ${dm ? "text-[#f0f0f0]" : "text-[#111]"}`}>
          what are you in the mood for?
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickFilters.map((f) => (
            <button
              key={f.label}
              onClick={() => setSearch(f.q)}
              className={`flex flex-col items-center gap-2 rounded-2xl py-5 px-3 text-center cursor-pointer border
                transition-all duration-150 hover:bg-[#111] hover:text-white hover:border-[#111]
                ${dm ? "border-[#222] bg-[#141414] text-[#ddd]" : "border-[#e0e0e0] bg-white text-[#222]"}`}
            >
              <span className="text-2xl">{f.icon}</span>
              <span className="text-[13px] font-medium">{f.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={`px-7 py-16 ${dm ? "bg-[#141414]" : "bg-[#f8f8f8]"}`}>
        <p className="text-xs font-semibold text-[#888] tracking-[2px] uppercase mb-2">Popular Right Now</p>
        <h2 className={`font-extrabold tracking-[-1px] mb-7 text-[clamp(24px,3vw,36px)]
          ${dm ? "text-[#f0f0f0]" : "text-[#111]"}`}>
          trending cuisines
        </h2>
        <div className="flex gap-2.5 flex-wrap">
          {cuisines.map((c) => (
            <button
              key={c.label}
              onClick={() => setSearch(c.q)}
              className={`flex items-center gap-2 border rounded-full px-4 py-2 text-[13px] font-medium
                cursor-pointer transition-all duration-150 hover:bg-[#111] hover:text-white hover:border-[#111]
                ${dm ? "border-[#333] bg-[#1a1a1a] text-[#ddd]" : "border-[#e0e0e0] bg-white text-[#222]"}`}
            >
              <span>{c.emoji}</span>{c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-7 py-16">
        <p className="text-xs font-semibold text-[#888] tracking-[2px] uppercase mb-2">Testimonials</p>
        <h2 className={`font-extrabold tracking-[-1.5px] leading-tight mb-9 text-[clamp(28px,4vw,44px)]
          ${dm ? "text-[#f0f0f0]" : "text-[#111]"}`}>
          loved by home cooks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((r) => (
            <div key={r.name}
              className={`border rounded-2xl p-6 ${dm ? "border-[#222] bg-[#111]" : "border-[#ebebeb] bg-white"}`}>
              <StarRating n={r.stars} darkMode={dm} />
              <p className={`text-sm leading-7 italic mb-5 ${dm ? "text-[#bbb]" : "text-[#333]"}`}>
                "{r.text}"
              </p>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#111] flex items-center justify-center text-[11px] font-bold text-white shrink-0">
                  {r.avatar}
                </div>
                <div>
                  <p className={`text-[13px] font-semibold m-0 ${dm ? "text-[#e0e0e0]" : "text-[#111]"}`}>{r.name}</p>
                  <p className="text-xs text-[#888] m-0">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`mx-7 mb-16 rounded-2xl px-10 py-14 flex flex-col sm:flex-row items-start
        sm:items-center justify-between gap-6
        ${dm ? "bg-[#1a1a1a] border border-[#333]" : "bg-[#111]"}`}>
        <div>
          <h2 className="text-[clamp(22px,3.5vw,40px)] font-extrabold text-white tracking-[-1px] leading-tight mb-2">
            ready to cook something<br />extraordinary?
          </h2>
          <p className="text-sm text-[#aaa] m-0">Start searching — it's completely free.</p>
        </div>
        <button
          onClick={() => document.querySelector("input[placeholder='Search recipes…']")?.focus()}
          className="bg-white text-[#111] border-none rounded-xl px-7 py-3.5 text-sm font-bold
            cursor-pointer whitespace-nowrap tracking-[-0.2px] hover:opacity-90 transition-opacity shrink-0"
        >
          Browse recipes →
        </button>
      </div>

      <footer className={`border-t px-7 pt-12 pb-8 ${dm ? "border-[#222] bg-[#0e0e0e]" : "border-[#ebebeb] bg-white"}`}>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-x-6 gap-y-10 mb-12">

          <div className="col-span-2 sm:col-span-4 lg:col-span-1">
            <span className={`font-serif italic font-bold text-[22px] tracking-tight block mb-3
              ${dm ? "text-white" : "text-[#111]"}`}>
              Recipes
            </span>
            <p className="text-[13px] text-[#666] leading-7 mb-5 max-w-[280px]">
              Discover thousands of recipes with nutrition info, pricing, and dietary tags — all in one place.
            </p>
            <div className="flex gap-2 flex-wrap">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className={`w-[34px] h-[34px] rounded-full border flex items-center justify-center
                    no-underline transition-all duration-200
                    ${dm ? "border-[#333] text-[#aaa] bg-[#1a1a1a]" : "border-[#ddd] text-[#666] bg-white"}`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = s.bg;
                    e.currentTarget.style.borderColor = s.color;
                    e.currentTarget.style.color = s.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = dm ? "#1a1a1a" : "#fff";
                    e.currentTarget.style.borderColor = dm ? "#333" : "#ddd";
                    e.currentTarget.style.color = dm ? "#aaa" : "#666";
                  }}
                >
                  <SocialIcon name={s.name} size={15} color="currentColor" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <p className={`text-xs font-bold tracking-[0.5px] uppercase mb-3.5
                ${dm ? "text-[#888]" : "text-[#111]"}`}>{heading}</p>
              <div className="flex flex-col gap-2.5">
                {links.map((l) => (
                  <span key={l}
                    className="text-[13px] text-[#666] cursor-pointer transition-colors duration-150 hover:text-[#111]">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={`border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-3
          ${dm ? "border-[#222]" : "border-[#ebebeb]"}`}>
          <p className="text-xs text-[#aaa] m-0 text-center sm:text-left">
            © {new Date().getFullYear()} RecipeFinder. All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Privacy", "Terms", "Cookies"].map((l) => (
              <span key={l}
                className="text-xs text-[#aaa] cursor-pointer hover:text-[#111] transition-colors duration-150">
                {l}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;