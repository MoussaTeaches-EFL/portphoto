import { useState, useEffect, useRef, useCallback } from "react";
import { X, ChevronDown, Instagram, Twitter, Mail, Menu, ArrowUpRight, ChevronLeft, ChevronRight, MapPin, Clock, Camera } from "lucide-react";

// ============================================================
// 🖼️ IMAGE CONFIGURATION
// Replace these URLs with your local file paths when ready.
// Example: "/images/photo-001.jpg" or import myPhoto from "./photo.jpg"
// ============================================================
const GALLERY_IMAGES = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=75",
    title: "Alpine Solitude",
    category: "Landscape",
    location: "Swiss Alps",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=75",
    title: "Starfall Ridge",
    category: "Astro",
    location: "Colorado, USA",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=600&q=75",
    title: "Golden Meadow",
    category: "Nature",
    location: "Iceland",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=75",
    title: "Pacific Dusk",
    category: "Seascape",
    location: "Oregon Coast",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=75",
    title: "Emerald Forest",
    category: "Forest",
    location: "Pacific Northwest",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=600&q=75",
    title: "Mirror Lake",
    category: "Landscape",
    location: "Yosemite, USA",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=75",
    title: "Aerial Valleys",
    category: "Aerial",
    location: "New Zealand",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=600&q=75",
    title: "Desert Bloom",
    category: "Desert",
    location: "Atacama, Chile",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&q=75",
    title: "Summer Haze",
    category: "Nature",
    location: "Tuscany, Italy",
  },
];

// ============================================================
// Profile image — replace with your own photo
// ============================================================
const PROFILE_IMAGE = "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=600&q=80";

// ============================================================
// Booking time slots
// ============================================================
const TIME_SLOTS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];

// ============================================================
// Utility: Intersection Observer hook for scroll animations
// ============================================================
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ============================================================
// COMPONENT: Navigation
// ============================================================
function Nav({ activePage, setActivePage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = ["Gallery", "Booking", "About", "Contact"];
  return (
    <header
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        transition: "all 0.4s ease",
        background: scrolled
          ? "rgba(4, 10, 24, 0.82)"
          : "transparent",
        backdropFilter: scrolled ? "blur(18px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(99,179,237,0.12)" : "1px solid transparent",
        padding: "0 2rem",
      }}
    >
      <nav style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        {/* Logo */}
        <button
          onClick={() => { setActivePage("home"); setMenuOpen(false); }}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}
        >
          <Camera size={20} color="#63B3ED" />
          <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.25rem", letterSpacing: "0.12em", color: "#e8f4fd", fontWeight: 600 }}>
            LUMIÈRE
          </span>
        </button>
        {/* Desktop links */}
        <ul style={{ display: "flex", gap: 36, listStyle: "none", margin: 0, padding: 0 }}
          className="desktop-nav">
          {links.map(l => (
            <li key={l}>
              <button
                onClick={() => setActivePage(l.toLowerCase())}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.78rem", letterSpacing: "0.18em", textTransform: "uppercase",
                  color: activePage === l.toLowerCase() ? "#63B3ED" : "rgba(200,220,240,0.75)",
                  padding: "4px 0",
                  borderBottom: activePage === l.toLowerCase() ? "1px solid #63B3ED" : "1px solid transparent",
                  transition: "all 0.25s",
                }}
              >{l}</button>
            </li>
          ))}
        </ul>
        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(m => !m)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#63B3ED", display: "none" }}
          className="mobile-burger"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{ background: "rgba(4,10,24,0.97)", padding: "1.5rem 2rem 2rem", borderTop: "1px solid rgba(99,179,237,0.15)" }}>
          {links.map(l => (
            <button key={l} onClick={() => { setActivePage(l.toLowerCase()); setMenuOpen(false); }}
              style={{
                display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", letterSpacing: "0.1em", textTransform: "uppercase",
                color: activePage === l.toLowerCase() ? "#63B3ED" : "rgba(200,220,240,0.8)",
                padding: "0.85rem 0", borderBottom: "1px solid rgba(99,179,237,0.08)",
              }}>{l}</button>
          ))}
        </div>
      )}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-burger { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

// ============================================================
// COMPONENT: Hero Page
// ============================================================
function Hero({ setActivePage }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "relative", overflow: "hidden", background: "#040a18" }}>
      {/* Background gradient orbs */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "15%", left: "20%", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(30,64,120,0.45) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "15%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, rgba(15,40,90,0.5) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", top: "55%", left: "55%", width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,179,237,0.08) 0%, transparent 70%)", filter: "blur(30px)" }} />
        {/* Star field */}
        {Array.from({ length: 55 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: Math.random() > 0.8 ? 2 : 1,
            height: Math.random() > 0.8 ? 2 : 1,
            borderRadius: "50%",
            background: "rgba(200,220,255,0.6)",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.7 + 0.3,
          }} />
        ))}
      </div>
      {/* Content */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 2, padding: "0 1.5rem", maxWidth: 720 }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#63B3ED", marginBottom: 24, opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(12px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)" }}>
          Fine Art Photography
        </p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(3.2rem, 9vw, 7rem)", lineHeight: 1.04, fontWeight: 600, color: "#e8f4fd", margin: "0 0 8px", opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all 1.1s cubic-bezier(0.16,1,0.3,1) 0.15s" }}>
          Where Light
        </h1>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(3.2rem, 9vw, 7rem)", lineHeight: 1.04, fontWeight: 400, fontStyle: "italic", color: "#63B3ED", margin: "0 0 32px", opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all 1.1s cubic-bezier(0.16,1,0.3,1) 0.28s" }}>
          Meets Silence
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "clamp(0.9rem, 2vw, 1.05rem)", color: "rgba(180,210,235,0.72)", lineHeight: 1.75, marginBottom: 48, opacity: loaded ? 1 : 0, transition: "all 1s ease 0.45s" }}>
          A curated collection of landscape and nature photography,<br />captured at the threshold between day and night.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", opacity: loaded ? 1 : 0, transition: "all 1s ease 0.6s" }}>
          <button onClick={() => setActivePage("gallery")} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", letterSpacing: "0.16em", textTransform: "uppercase", background: "#1a3a6e", color: "#e8f4fd", border: "1px solid rgba(99,179,237,0.4)", padding: "14px 34px", cursor: "pointer", transition: "all 0.3s" }}
            onMouseEnter={e => { e.target.style.background = "#244d94"; e.target.style.borderColor = "rgba(99,179,237,0.8)"; }}
            onMouseLeave={e => { e.target.style.background = "#1a3a6e"; e.target.style.borderColor = "rgba(99,179,237,0.4)"; }}>
            View Gallery
          </button>
          <button onClick={() => setActivePage("booking")} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", letterSpacing: "0.16em", textTransform: "uppercase", background: "transparent", color: "rgba(180,210,235,0.8)", border: "1px solid rgba(99,179,237,0.2)", padding: "14px 34px", cursor: "pointer", transition: "all 0.3s" }}
            onMouseEnter={e => { e.target.style.borderColor = "rgba(99,179,237,0.5)"; e.target.style.color = "#e8f4fd"; }}
            onMouseLeave={e => { e.target.style.borderColor = "rgba(99,179,237,0.2)"; e.target.style.color = "rgba(180,210,235,0.8)"; }}>
            Book a Session
          </button>
        </div>
      </div>
      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: loaded ? 0.55 : 0, transition: "opacity 1s ease 1.2s", cursor: "pointer" }} onClick={() => setActivePage("gallery")}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#63B3ED" }}>Scroll</span>
        <div style={{ animation: "bounce 2s ease-in-out infinite" }}>
          <ChevronDown size={16} color="#63B3ED" />
        </div>
      </div>
      {/* Thin horizontal line accents */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(99,179,237,0.25), transparent)" }} />
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>
    </div>
  );
}

// ============================================================
// COMPONENT: Lightbox
// ============================================================
function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const img = images[index];
  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose, onPrev, onNext]);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(2,6,18,0.97)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", animation: "fadeIn 0.25s ease" }}
      onClick={onClose}>
      {/* Top bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 2rem", borderBottom: "1px solid rgba(99,179,237,0.1)", background: "rgba(4,10,24,0.7)", backdropFilter: "blur(12px)" }}>
        <div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#e8f4fd", margin: 0 }}>{img.title}</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "#63B3ED", margin: "3px 0 0", letterSpacing: "0.12em" }}>{img.category} · {img.location}</p>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "1px solid rgba(99,179,237,0.25)", cursor: "pointer", color: "#63B3ED", padding: 8, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(99,179,237,0.1)"}
          onMouseLeave={e => e.currentTarget.style.background = "none"}>
          <X size={18} />
        </button>
      </div>
      {/* Image */}
      <img src={img.src} alt={img.title} style={{ maxWidth: "88vw", maxHeight: "76vh", objectFit: "contain", boxShadow: "0 30px 80px rgba(0,0,10,0.7)" }}
        onClick={e => e.stopPropagation()} />
      {/* Prev / Next */}
      <button onClick={e => { e.stopPropagation(); onPrev(); }} style={{ position: "absolute", left: "1.5rem", top: "50%", transform: "translateY(-50%)", background: "rgba(4,10,24,0.6)", border: "1px solid rgba(99,179,237,0.2)", color: "#e8f4fd", cursor: "pointer", padding: 12, display: "flex", backdropFilter: "blur(8px)", transition: "all 0.25s" }}
        onMouseEnter={e => { e.currentTarget.style.background = "rgba(26,58,110,0.8)"; e.currentTarget.style.borderColor = "rgba(99,179,237,0.5)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "rgba(4,10,24,0.6)"; e.currentTarget.style.borderColor = "rgba(99,179,237,0.2)"; }}>
        <ChevronLeft size={20} />
      </button>
      <button onClick={e => { e.stopPropagation(); onNext(); }} style={{ position: "absolute", right: "1.5rem", top: "50%", transform: "translateY(-50%)", background: "rgba(4,10,24,0.6)", border: "1px solid rgba(99,179,237,0.2)", color: "#e8f4fd", cursor: "pointer", padding: 12, display: "flex", backdropFilter: "blur(8px)", transition: "all 0.25s" }}
        onMouseEnter={e => { e.currentTarget.style.background = "rgba(26,58,110,0.8)"; e.currentTarget.style.borderColor = "rgba(99,179,237,0.5)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "rgba(4,10,24,0.6)"; e.currentTarget.style.borderColor = "rgba(99,179,237,0.2)"; }}>
        <ChevronRight size={20} />
      </button>
      {/* Counter */}
      <p style={{ position: "absolute", bottom: 24, fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "rgba(140,180,210,0.6)", letterSpacing: "0.18em" }}>
        {index + 1} / {images.length}
      </p>
      <style>{`@keyframes fadeIn { from { opacity:0 } to { opacity:1 } }`}</style>
    </div>
  );
}

// ============================================================
// COMPONENT: Gallery Page
// ============================================================
function Gallery() {
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [filter, setFilter] = useState("All");
  const [headerRef, headerIn] = useInView(0.1);
  const categories = ["All", ...Array.from(new Set(GALLERY_IMAGES.map(i => i.category)))];
  const filtered = filter === "All" ? GALLERY_IMAGES : GALLERY_IMAGES.filter(i => i.category === filter);
  return (
    <div style={{ minHeight: "100vh", background: "#040a18", paddingTop: 90, paddingBottom: 80 }}>
      {/* Header */}
      <div ref={headerRef} style={{ textAlign: "center", padding: "3rem 2rem 2.5rem", opacity: headerIn ? 1 : 0, transform: headerIn ? "none" : "translateY(24px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", letterSpacing: "0.42em", textTransform: "uppercase", color: "#63B3ED", marginBottom: 12 }}>Portfolio</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.4rem, 5vw, 3.8rem)", color: "#e8f4fd", fontWeight: 600, margin: "0 0 12px" }}>The Gallery</h2>
        <div style={{ width: 48, height: 1, background: "linear-gradient(90deg, transparent, #63B3ED, transparent)", margin: "0 auto 2rem" }} />
        {/* Filter tabs */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase", background: filter === c ? "rgba(99,179,237,0.15)" : "transparent", color: filter === c ? "#63B3ED" : "rgba(160,200,230,0.55)", border: filter === c ? "1px solid rgba(99,179,237,0.4)" : "1px solid rgba(99,179,237,0.12)", padding: "7px 18px", cursor: "pointer", transition: "all 0.25s" }}>
              {c}
            </button>
          ))}
        </div>
      </div>
      {/* Grid */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 4 }}>
        {filtered.map((img, i) => (
          <GalleryTile key={img.id} img={img} index={i} onClick={() => setLightboxIdx(GALLERY_IMAGES.indexOf(img))} />
        ))}
      </div>
      {/* Lightbox */}
      {lightboxIdx !== null && (
        <Lightbox
          images={GALLERY_IMAGES}
          index={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx(i => (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)}
          onNext={() => setLightboxIdx(i => (i + 1) % GALLERY_IMAGES.length)}
        />
      )}
    </div>
  );
}

function GalleryTile({ img, index, onClick }) {
  const [ref, inView] = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref} onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", overflow: "hidden", cursor: "pointer",
        aspectRatio: index % 5 === 0 ? "4/3" : index % 3 === 0 ? "3/4" : "1/1",
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(30px)",
        transition: `opacity 0.7s ease ${index * 0.07}s, transform 0.7s ease ${index * 0.07}s`,
      }}>
      <img src={img.thumb} alt={img.title}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)", transform: hovered ? "scale(1.07)" : "scale(1)" }} />
      {/* Hover overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,6,22,0.85) 0%, rgba(2,6,22,0.2) 50%, transparent 100%)", opacity: hovered ? 1 : 0, transition: "opacity 0.4s ease", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "1.25rem" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#e8f4fd", margin: "0 0 4px", fontStyle: "italic" }}>{img.title}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <MapPin size={10} color="#63B3ED" />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", color: "#63B3ED", letterSpacing: "0.1em" }}>{img.location}</span>
        </div>
      </div>
      <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(99,179,237,0.18)", opacity: hovered ? 1 : 0, transition: "opacity 0.3s", pointerEvents: "none" }} />
    </div>
  );
}

// ============================================================
// COMPONENT: Booking Page
// ============================================================
function Booking() {
  const [headerRef, headerIn] = useInView(0.1);
  const [formRef, formIn] = useInView(0.1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [sessionType, setSessionType] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const sessionTypes = [
    { id: "portrait", label: "Portrait", price: "$350", desc: "2 hr session, 30 edited images" },
    { id: "landscape", label: "Landscape Tour", price: "$480", desc: "Half-day, guided locations" },
    { id: "workshop", label: "Workshop", price: "$220", desc: "3 hr creative photography class" },
    { id: "editorial", label: "Editorial", price: "$680", desc: "Full-day, publication-ready" },
  ];
  const handleSubmit = () => {
    if (selectedDate && selectedTime && sessionType) setSubmitted(true);
  };
  return (
    <div style={{ minHeight: "100vh", background: "#040a18", paddingTop: 90, paddingBottom: 80 }}>
      <div ref={headerRef} style={{ textAlign: "center", padding: "3rem 2rem 2.5rem", opacity: headerIn ? 1 : 0, transform: headerIn ? "none" : "translateY(24px)", transition: "all 0.9s ease" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", letterSpacing: "0.42em", textTransform: "uppercase", color: "#63B3ED", marginBottom: 12 }}>Schedule</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.4rem, 5vw, 3.8rem)", color: "#e8f4fd", fontWeight: 600, margin: "0 0 12px" }}>Book a Session</h2>
        <div style={{ width: 48, height: 1, background: "linear-gradient(90deg, transparent, #63B3ED, transparent)", margin: "0 auto" }} />
      </div>
      <div ref={formRef} style={{ maxWidth: 860, margin: "0 auto", padding: "0 1.5rem", opacity: formIn ? 1 : 0, transform: formIn ? "none" : "translateY(30px)", transition: "all 0.9s ease 0.15s" }}>
        {submitted ? (
          <div style={{ textAlign: "center", padding: "4rem 2rem", border: "1px solid rgba(99,179,237,0.2)", background: "rgba(26,58,110,0.12)" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(99,179,237,0.12)", border: "1px solid rgba(99,179,237,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
              <Camera size={24} color="#63B3ED" />
            </div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#e8f4fd", margin: "0 0 12px" }}>Request Received</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(160,200,230,0.7)", lineHeight: 1.7 }}>
              Thank you for your booking request.<br />I'll confirm your {selectedDate} at {selectedTime} session within 24 hours.
            </p>
            <button onClick={() => setSubmitted(false)} style={{ marginTop: 28, fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", background: "transparent", color: "#63B3ED", border: "1px solid rgba(99,179,237,0.3)", padding: "11px 28px", cursor: "pointer" }}>
              Book Another
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 32 }}>
            {/* Session type */}
            <section>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#63B3ED", marginBottom: 16 }}>01 — Select Session Type</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(188px, 1fr))", gap: 10 }}>
                {sessionTypes.map(s => (
                  <button key={s.id} onClick={() => setSessionType(s.id)} style={{ textAlign: "left", background: sessionType === s.id ? "rgba(26,58,110,0.5)" : "rgba(10,18,38,0.6)", border: sessionType === s.id ? "1px solid rgba(99,179,237,0.55)" : "1px solid rgba(99,179,237,0.13)", padding: "1rem 1.1rem", cursor: "pointer", transition: "all 0.25s" }}>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", color: "#e8f4fd", margin: "0 0 4px" }}>{s.label}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", color: "#63B3ED", margin: "0 0 6px", letterSpacing: "0.08em" }}>{s.price}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "rgba(140,180,210,0.6)", margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
                  </button>
                ))}
              </div>
            </section>
            {/* Date */}
            <section>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#63B3ED", marginBottom: 16 }}>02 — Choose a Date</h3>
              <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} min={new Date().toISOString().split("T")[0]}
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "#e8f4fd", background: "rgba(10,18,38,0.6)", border: "1px solid rgba(99,179,237,0.2)", padding: "12px 16px", width: "100%", maxWidth: 300, outline: "none", colorScheme: "dark", boxSizing: "border-box" }} />
            </section>
            {/* Time */}
            <section>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#63B3ED", marginBottom: 16 }}>03 — Pick a Time</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {TIME_SLOTS.map(t => (
                  <button key={t} onClick={() => setSelectedTime(t)} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", background: selectedTime === t ? "rgba(26,58,110,0.6)" : "transparent", color: selectedTime === t ? "#63B3ED" : "rgba(160,200,230,0.6)", border: selectedTime === t ? "1px solid rgba(99,179,237,0.5)" : "1px solid rgba(99,179,237,0.15)", padding: "8px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s" }}>
                    <Clock size={12} />{t}
                  </button>
                ))}
              </div>
            </section>
            {/* Summary & submit */}
            <section style={{ borderTop: "1px solid rgba(99,179,237,0.1)", paddingTop: 24, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
              <div>
                {sessionType && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "rgba(160,200,230,0.7)", margin: "0 0 4px" }}>
                  {sessionTypes.find(s => s.id === sessionType)?.label} · {selectedDate || "—"} at {selectedTime || "—"}
                </p>}
                {sessionType && <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: "#e8f4fd", margin: 0 }}>
                  {sessionTypes.find(s => s.id === sessionType)?.price}
                </p>}
              </div>
              <button onClick={handleSubmit} disabled={!selectedDate || !selectedTime || !sessionType}
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", letterSpacing: "0.18em", textTransform: "uppercase", background: selectedDate && selectedTime && sessionType ? "#1a3a6e" : "rgba(10,18,38,0.6)", color: selectedDate && selectedTime && sessionType ? "#e8f4fd" : "rgba(100,130,160,0.5)", border: "1px solid", borderColor: selectedDate && selectedTime && sessionType ? "rgba(99,179,237,0.45)" : "rgba(99,179,237,0.1)", padding: "14px 36px", cursor: selectedDate && selectedTime && sessionType ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: 8, transition: "all 0.3s" }}>
                Confirm Request <ArrowUpRight size={14} />
              </button>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// COMPONENT: About Page
// ============================================================
function About({ setActivePage }) {
  const [leftRef, leftIn] = useInView(0.1);
  const [rightRef, rightIn] = useInView(0.1);
  const [statsRef, statsIn] = useInView(0.15);
  return (
    <div style={{ minHeight: "100vh", background: "#040a18", paddingTop: 90, paddingBottom: 80 }}>
      <div style={{ textAlign: "center", padding: "3rem 2rem 3.5rem" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", letterSpacing: "0.42em", textTransform: "uppercase", color: "#63B3ED", marginBottom: 12 }}>The Artist</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.4rem, 5vw, 3.8rem)", color: "#e8f4fd", fontWeight: 600, margin: "0 0 12px" }}>About</h2>
        <div style={{ width: 48, height: 1, background: "linear-gradient(90deg, transparent, #63B3ED, transparent)", margin: "0 auto" }} />
      </div>
      {/* Two-column layout */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}
        className="about-grid">
        {/* Bio column */}
        <div ref={leftRef} style={{ opacity: leftIn ? 1 : 0, transform: leftIn ? "none" : "translateX(-30px)", transition: "all 1s cubic-bezier(0.16,1,0.3,1)" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1.35rem", color: "rgba(180,215,240,0.85)", lineHeight: 1.65, marginBottom: 24 }}>
            "Photography is the art of freezing the world at its most luminous — the moment blue hour dissolves into night."
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.92rem", color: "rgba(150,190,220,0.72)", lineHeight: 1.9, marginBottom: 20 }}>
            Based between the Swiss Alps and Coastal California, I've spent fifteen years chasing light across six continents. My work explores the quiet drama of natural landscapes — the tension between human scale and geological time.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.92rem", color: "rgba(150,190,220,0.72)", lineHeight: 1.9, marginBottom: 36 }}>
            I work with editorial clients, conservation organizations, and private collectors. My prints are produced on archival Hahnemühle paper and are limited to editions of 12, signed and numbered.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 36 }}>
            {["National Geographic", "Vogue Italia", "BBC Earth", "500px Awards"].map(tag => (
              <span key={tag} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", letterSpacing: "0.12em", color: "#63B3ED", border: "1px solid rgba(99,179,237,0.25)", padding: "5px 14px" }}>{tag}</span>
            ))}
          </div>
          <button onClick={() => setActivePage("contact")} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", letterSpacing: "0.16em", textTransform: "uppercase", background: "#1a3a6e", color: "#e8f4fd", border: "1px solid rgba(99,179,237,0.35)", padding: "13px 30px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all 0.3s" }}>
            Get in Touch <ArrowUpRight size={14} />
          </button>
        </div>
        {/* Photo column */}
        <div ref={rightRef} style={{ opacity: rightIn ? 1 : 0, transform: rightIn ? "none" : "translateX(30px)", transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.15s" }}>
          <div style={{ position: "relative" }}>
            <img src={PROFILE_IMAGE} alt="Photographer portrait"
              style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block", filter: "brightness(0.88) saturate(0.85)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 60%, rgba(4,10,24,0.7) 100%)" }} />
            <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(99,179,237,0.18)", pointerEvents: "none" }} />
            {/* Decorative offset frame */}
            <div style={{ position: "absolute", top: 16, right: -16, bottom: -16, left: 16, border: "1px solid rgba(99,179,237,0.1)", pointerEvents: "none", zIndex: -1 }} />
          </div>
        </div>
      </div>
      {/* Stats row */}
      <div ref={statsRef} style={{ maxWidth: 1100, margin: "4rem auto 0", padding: "2.5rem 1.5rem", borderTop: "1px solid rgba(99,179,237,0.1)", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, opacity: statsIn ? 1 : 0, transition: "all 0.9s ease 0.2s" }}
        className="stats-grid">
        {[["15", "Years"], ["6", "Continents"], ["48", "Exhibitions"], ["12", "Awards"]].map(([num, label]) => (
          <div key={label} style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.8rem", color: "#e8f4fd", margin: "0 0 4px", lineHeight: 1 }}>{num}</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#63B3ED", margin: 0 }}>{label}</p>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}

// ============================================================
// COMPONENT: Contact Page
// ============================================================
function Contact() {
  const [ref, inView] = useInView(0.1);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const update = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const inputStyle = { fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "#e8f4fd", background: "rgba(10,18,38,0.6)", border: "1px solid rgba(99,179,237,0.18)", padding: "13px 16px", width: "100%", outline: "none", boxSizing: "border-box", marginBottom: 14, transition: "border-color 0.25s" };
  return (
    <div style={{ minHeight: "100vh", background: "#040a18", paddingTop: 90, paddingBottom: 80 }}>
      <div style={{ textAlign: "center", padding: "3rem 2rem 3.5rem" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", letterSpacing: "0.42em", textTransform: "uppercase", color: "#63B3ED", marginBottom: 12 }}>Reach Out</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.4rem, 5vw, 3.8rem)", color: "#e8f4fd", fontWeight: 600, margin: "0 0 12px" }}>Contact</h2>
        <div style={{ width: 48, height: 1, background: "linear-gradient(90deg, transparent, #63B3ED, transparent)", margin: "0 auto" }} />
      </div>
      <div ref={ref} style={{ maxWidth: 680, margin: "0 auto", padding: "0 1.5rem", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(28px)", transition: "all 0.9s ease" }}>
        {sent ? (
          <div style={{ textAlign: "center", padding: "4rem 2rem", border: "1px solid rgba(99,179,237,0.18)", background: "rgba(26,58,110,0.1)" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#e8f4fd", marginBottom: 12 }}>Message Sent</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(160,200,230,0.7)" }}>Thank you, {form.name}. I'll be in touch soon.</p>
            <button onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
              style={{ marginTop: 24, fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", background: "transparent", color: "#63B3ED", border: "1px solid rgba(99,179,237,0.3)", padding: "10px 26px", cursor: "pointer" }}>
              Send Another
            </button>
          </div>
        ) : (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 0 }}>
              <input placeholder="Your Name" value={form.name} onChange={update("name")} style={inputStyle}
                onFocus={e => e.target.style.borderColor = "rgba(99,179,237,0.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(99,179,237,0.18)"} />
              <input placeholder="Email Address" value={form.email} onChange={update("email")} style={inputStyle}
                onFocus={e => e.target.style.borderColor = "rgba(99,179,237,0.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(99,179,237,0.18)"} />
            </div>
            <textarea placeholder="Your message..." value={form.message} onChange={update("message")} rows={7}
              style={{ ...inputStyle, resize: "vertical", fontFamily: "'DM Sans', sans-serif" }}
              onFocus={e => e.target.style.borderColor = "rgba(99,179,237,0.5)"}
              onBlur={e => e.target.style.borderColor = "rgba(99,179,237,0.18)"} />
            <button onClick={() => { if (form.name && form.email && form.message) setSent(true); }}
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", letterSpacing: "0.18em", textTransform: "uppercase", background: "#1a3a6e", color: "#e8f4fd", border: "1px solid rgba(99,179,237,0.4)", padding: "14px 36px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#244d94"}
              onMouseLeave={e => e.currentTarget.style.background = "#1a3a6e"}>
              Send Message <ArrowUpRight size={14} />
            </button>
            {/* Contact details */}
            <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid rgba(99,179,237,0.1)", display: "flex", flexWrap: "wrap", gap: 24 }}>
              {[["Email", "hello@lumiere.photo"], ["Studio", "Geneva & Los Angeles"], ["Response", "Within 24 hours"]].map(([k, v]) => (
                <div key={k}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#63B3ED", margin: "0 0 4px" }}>{k}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "rgba(160,200,230,0.8)", margin: 0 }}>{v}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// COMPONENT: Footer
// ============================================================
function Footer({ setActivePage }) {
  return (
    <footer style={{ background: "#020610", borderTop: "1px solid rgba(99,179,237,0.1)", padding: "3rem 2rem" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Camera size={16} color="#63B3ED" />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", letterSpacing: "0.12em", color: "#e8f4fd" }}>LUMIÈRE</span>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {["Gallery", "Booking", "About", "Contact"].map(l => (
            <button key={l} onClick={() => setActivePage(l.toLowerCase())} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(140,180,210,0.55)", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#63B3ED"}
              onMouseLeave={e => e.target.style.color = "rgba(140,180,210,0.55)"}>{l}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {[Instagram, Twitter, Mail].map((Icon, i) => (
            <button key={i} style={{ background: "none", border: "1px solid rgba(99,179,237,0.15)", cursor: "pointer", color: "rgba(140,180,210,0.55)", padding: 8, display: "flex", transition: "all 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#63B3ED"; e.currentTarget.style.borderColor = "rgba(99,179,237,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(140,180,210,0.55)"; e.currentTarget.style.borderColor = "rgba(99,179,237,0.15)"; }}>
              <Icon size={15} />
            </button>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: 1280, margin: "2rem auto 0", paddingTop: "1.5rem", borderTop: "1px solid rgba(99,179,237,0.06)", textAlign: "center" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", color: "rgba(90,120,150,0.5)", letterSpacing: "0.12em", margin: 0 }}>
          © {new Date().getFullYear()} Lumière Photography · All rights reserved · Prints limited to 12 editions
        </p>
      </div>
    </footer>
  );
}

// ============================================================
// ROOT APP
// ============================================================
export default function App() {
  const [activePage, setActivePage] = useState("home");
  const pageChange = useCallback((page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const renderPage = () => {
    switch (activePage) {
      case "home": return <Hero setActivePage={pageChange} />;
      case "gallery": return <Gallery />;
      case "booking": return <Booking />;
      case "about": return <About setActivePage={pageChange} />;
      case "contact": return <Contact />;
      default: return <Hero setActivePage={pageChange} />;
    }
  };
  return (
    <div style={{ background: "#040a18", minHeight: "100vh" }}>
      <Nav activePage={activePage} setActivePage={pageChange} />
      <main>{renderPage()}</main>
      {activePage !== "home" && <Footer setActivePage={pageChange} />}
    </div>
  );
}
