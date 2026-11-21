import {
  ArrowUpRight,
  Bell,
  BookOpen,
  Check,
  ChevronRight,
  CircleHelp,
  FileText,
  Flag,
  Home,
  Lightbulb,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import "./App.css";

const navItems = [
  { label: "Apžvalga", icon: Home },
  { label: "Problemos", icon: Flag, count: 12 },
  { label: "Idėjos", icon: Lightbulb },
  { label: "Dalyvauk", icon: Users },
  { label: "Mokyklos naujienos", icon: BookOpen },
];

const actions = [
  { label: "Pranešti apie problemą", description: "Pasakyk, kas trukdo mokyklos gyvenimui.", icon: Flag, tone: "coral" },
  { label: "Pasiūlyti idėją", description: "Paversk gerą mintį pokyčiu.", icon: Lightbulb, tone: "lavender" },
  { label: "Dalyvauti", description: "Balsuok, atsakyk ir prisidėk.", icon: Users, tone: "mint" },
  { label: "Gauti pagalbą", description: "Saugus kelias jautriems rūpesčiams.", icon: ShieldCheck, tone: "sand" },
];

const initialItems = [
  { id: 1, type: "Problema", tone: "coral", title: "Šaltos klasės antrame aukšte", detail: "3 aukštas · 18 palaiko", status: "Nagrinėjama", statusTone: "amber", author: "Anoniminis", time: "prieš 2 val.", votes: 18 },
  { id: 2, type: "Idėja", tone: "lavender", title: "Daugiau ramių vietų pertraukų metu", detail: "Bendruomenė · 42 palaiko", status: "Balsuojama", statusTone: "purple", author: "Emilija K.", time: "prieš 5 val.", votes: 42 },
  { id: 3, type: "Problema", tone: "coral", title: "Neveikia vandens fontanėlis prie sporto salės", detail: "Sporto salė · 27 palaiko", status: "Priskirta", statusTone: "blue", author: "Matas J.", time: "vakar", votes: 27 },
];

const updates = [
  { date: "12", month: "BAL", title: "Mokinių tarybos susitikimas", note: "Atvira visiems norintiems" },
  { date: "16", month: "BAL", title: "Bibliotekos erdvės apklausa", note: "Tavo nuomonė iki penktadienio" },
];

function App() {
  const [active, setActive] = useState("Apžvalga");
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Visi");
  const [items, setItems] = useState(initialItems);
  const [toast, setToast] = useState("");

  const visibleItems = useMemo(() => items.filter((item) => {
    const matchesFilter = filter === "Visi" || item.type === filter;
    const query = search.toLowerCase();
    return matchesFilter && (!query || `${item.title} ${item.detail}`.toLowerCase().includes(query));
  }), [filter, items, search]);

  const chooseAction = (label) => {
    setToast(label === "Gauti pagalbą" ? "Privatus pagalbos kelias ruošiamas saugiai." : `${label} forma bus atidaryta kitame žingsnyje.`);
    window.setTimeout(() => setToast(""), 2800);
  };

  const vote = (id) => setItems((current) => current.map((item) => item.id === id ? { ...item, votes: item.votes + 1 } : item));

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <div className="brand-row">
          <div className="brand-mark">Ž</div>
          <div><strong>žibėkim</strong><span>Mokyklos balsas</span></div>
          <button className="close-button" onClick={() => setMenuOpen(false)} aria-label="Uždaryti meniu"><X size={20} /></button>
        </div>
        <div className="school-switcher"><div className="school-symbol">S</div><div><strong>Sun mokykla</strong><span>2025–2026 m.</span></div><ChevronRight size={16} /></div>
        <nav className="side-nav" aria-label="Pagrindinis meniu">
          <span className="eyebrow">Tavo erdvė</span>
          {navItems.map(({ label, icon: Icon, count }) => <button key={label} className={`nav-link ${active === label ? "active" : ""}`} onClick={() => { setActive(label); setMenuOpen(false); }}><Icon size={18} /><span>{label}</span>{count && <b>{count}</b>}</button>)}
          <span className="eyebrow lower">Saugumas</span>
          <button className="nav-link help-link" onClick={() => chooseAction("Gauti pagalbą")}><CircleHelp size={18} /><span>Privati pagalba</span></button>
        </nav>
        <div className="sidebar-footer"><div className="avatar">SK</div><div><strong>Sun K.</strong><span>III B klasė</span></div><button aria-label="Pranešimai"><Bell size={17} /></button></div>
      </aside>

      {menuOpen && <button className="backdrop" onClick={() => setMenuOpen(false)} aria-label="Uždaryti meniu" />}
      <main className="main-content">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Atidaryti meniu"><Menu size={22} /></button>
          <div><span className="breadcrumb">Žibėkim /</span><h1>{active}</h1></div>
          <div className="topbar-tools"><label className="search"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Ieškoti idėjų..." /></label><button className="notification" aria-label="Pranešimai"><Bell size={19} /><i /></button><div className="avatar">SK</div></div>
        </header>

        <div className="page-content">
          <section className="hero-card">
            <div className="hero-copy"><span className="eyebrow">PIRMADIENIS, BALANDŽIO 8</span><h2>Maži balsai.<br /><em>Matomi pokyčiai.</em></h2><p>Čia gali saugiai pasakyti, kas svarbu, ir matyti, kas vyksta toliau.</p><div className="hero-trust"><ShieldCheck size={17} /><span>Aiškus atsakymas. Matomas progresas. Tavo mokykla.</span></div></div>
            <div className="hero-orbit"><Sparkles size={34} /><span>Šiandien<br /><strong>24</strong> mokiniai dalyvauja</span></div>
          </section>

          <section className="action-grid" aria-label="Ką nori padaryti?"><div className="section-intro"><span className="eyebrow">NUO KO PRADĖSIME?</span><h2>Ką nori padaryti?</h2><p>Pasirink vieną kelią. Mes padėsime žengti kitą žingsnį.</p></div>{actions.map(({ label, description, icon: Icon, tone }) => <button key={label} className={`action-card ${tone}`} onClick={() => chooseAction(label)}><span className="action-icon"><Icon size={22} /></span><span><strong>{label}</strong><small>{description}</small></span><ArrowUpRight size={18} /></button>)}</section>

          <section className="dashboard-grid">
            <div className="feed-column"><div className="section-heading"><div><span className="eyebrow">BENDRUOMENĖS PULSAS</span><h2>Naujausia veikla</h2></div><div className="filter-tabs">{["Visi", "Problema", "Idėja"].map((option) => <button key={option} className={filter === option ? "selected" : ""} onClick={() => setFilter(option)}>{option}</button>)}</div></div><div className="issue-list">{visibleItems.map((item) => <article className="issue-card" key={item.id}><div className={`issue-symbol ${item.tone}`}>{item.type === "Idėja" ? <Lightbulb size={19} /> : <Flag size={19} />}</div><div className="issue-body"><div className="issue-meta"><span className={`type-label ${item.tone}`}>{item.type}</span><span>{item.time}</span></div><h3>{item.title}</h3><p>{item.detail} <span>·</span> {item.author}</p><div className="issue-progress"><span style={{ width: `${Math.min(86, item.votes + 24)}%` }} /></div></div><div className="issue-side"><span className={`status ${item.statusTone}`}><span />{item.status}</span><button className="vote-button" onClick={() => vote(item.id)}><ArrowUpRight size={14} />{item.votes}</button></div></article>)}{visibleItems.length === 0 && <div className="empty-state">Nerasta atitinkančių įrašų. Pabandyk kitą paiešką.</div>}</div><button className="outline-button" onClick={() => setActive("Problemos")}>Peržiūrėti visą veiklą <ChevronRight size={16} /></button></div>
            <aside className="right-column"><div className="section-heading compact"><div><span className="eyebrow">MOKYKLOS ATSAKAS</span><h2>Kas vyksta toliau?</h2></div><FileText size={20} /></div><div className="timeline-card"><div className="timeline-step done"><span><Check size={14} /></span><div><strong>Tu pasakei</strong><small>Problema ar idėja pateikta</small></div></div><div className="timeline-step active"><span>2</span><div><strong>Mokykla išgirdo</strong><small>Peržiūrima ir priskiriama komandai</small></div></div><div className="timeline-step"><span>3</span><div><strong>Matomas veiksmas</strong><small>Gausi atnaujinimą apie rezultatą</small></div></div></div><div className="updates-card"><div className="section-heading compact"><div><span className="eyebrow">ARTĖJA</span><h2>Mokyklos gyvenimas</h2></div><CalendarIcon /></div>{updates.map((update) => <div className="update-row" key={update.title}><div className="date-box"><strong>{update.date}</strong><span>{update.month}</span></div><div><strong>{update.title}</strong><small>{update.note}</small></div></div>)}</div></aside>
          </section>
        </div>
      </main>
      {toast && <div className="toast"><Check size={17} />{toast}</div>}
    </div>
  );
}

function CalendarIcon() { return <div className="mini-calendar"><span>APR</span><strong>08</strong></div>; }

export default App;
