import {
  Bell,
  CalendarDays,
  ChevronDown,
  ClipboardList,
  Home,
  LayoutDashboard,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Newspaper,
  Plus,
  Search,
  Settings,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import "./App.css";

const navigationItems = [
  { name: "Pagrindinis", icon: LayoutDashboard },
  { name: "Žinutės", icon: MessageCircle },
  { name: "Grupės", icon: Users },
  { name: "Forumas", icon: Home },
  { name: "Apklausos", icon: ClipboardList },
  { name: "Skelbimai", icon: Newspaper },
  { name: "Kalendorius", icon: CalendarDays },
];

const announcements = [
  {
    title: "Artėja mokyklos talentų vakaras",
    description:
      "Kviečiame visus mokinius dalyvauti talentų vakare. Registracija vyksta iki penktadienio.",
    category: "Renginiai",
    date: "Šiandien",
    color: "purple",
  },
  {
    title: "Pasikeitė bibliotekos darbo laikas",
    description:
      "Nuo šios savaitės biblioteka darbo dienomis bus atidaryta iki 17:00.",
    category: "Svarbu",
    date: "Vakar",
    color: "red",
  },
  {
    title: "Mokinių tarybos susitikimas",
    description:
      "Kitas mokinių tarybos susitikimas vyks trečiadienį aktų salėje.",
    category: "Mokinių taryba",
    date: "Prieš 2 d.",
    color: "blue",
  },
];

const discussions = [
  {
    title: "Kokį festivalių formatą norėtumėte šių metų mokyklos renginyje?",
    category: "Idėjos mokyklai",
    replies: 24,
    views: 142,
    author: "Emilija K.",
    avatar: "EK",
    lastReply: "Agnė: Vis dėlto geriau būtų įtraukti daugiau studentų projektuose.",
    tags: ["Renginiai", "Balsavimas"],
  },
  {
    title: "Kaip pagerinti mokyklos erdves po pamokų?",
    category: "Bendruomenė",
    replies: 18,
    views: 96,
    author: "Matas J.",
    avatar: "MJ",
    lastReply: "Rokas: Muzikos zona ir daugiau oazės kampelių būtų puikiai.",
    tags: ["Erdvės", "Idėjos"],
  },
  {
    title: "Ar reikėtų daugiau popamokinių veiklų su dėstytojais?",
    category: "Diskusijos",
    replies: 31,
    views: 218,
    author: "Gabija P.",
    avatar: "GP",
    lastReply: "Kornelija: Manau, reikia daugiau praktinių ir kūrybinių užsiėmimų.",
    tags: ["Veikla", "Klasė"],
  },
  {
    title: "Ką daryti su neformalaus bendravimo erdvėmis tarp klasių?",
    category: "Bendruomenė",
    replies: 12,
    views: 74,
    author: "Tadas R.",
    avatar: "TR",
    lastReply: "Ieva: Būtų puiku turėti bendrus projektus ir bendras darbo zonas.",
    tags: ["Praktika", "Kita"],
  },
  {
    title: "Kurios pamokų temos būtų labiausiai įdomios žmogui be ai?",
    category: "Mokymas",
    replies: 46,
    views: 301,
    author: "Darius L.",
    avatar: "DL",
    lastReply: "Lina: Vaizdiniai projektai ir diskusijos visada sužadina daugiau.",
    tags: ["Mokytojai", "Pamokos"],
  },
  {
    title: "Ar verta įvesti klasės iškilmes ir tradicijas?",
    category: "Tradicijos",
    replies: 9,
    views: 58,
    author: "Urtė N.",
    avatar: "UN",
    lastReply: "Jonas: Teigtų, kad tai padėtų stiprinti bendruomeniškumą.",
    tags: ["Renginiai", "Bendruomė"],
  },
];

const visualPages = {
  "Žinutės": {
    summary: "Vidinis bendravimas, svarbios žinutės ir laukiami atsakymai.",
    cards: [
      { title: "Šiandienos pranešimai", value: "14", note: "nauji" },
      { title: "Laukia atsakymo", value: "7", note: "klausimai" },
      { title: "Peržiūrėti", value: "31", note: "įrašai" },
    ],
  },
  Grupės: {
    summary: "Mokinių grupės, projektai ir bendradarbiavimo kanalai.",
    cards: [
      { title: "Aktyvios grupės", value: "8", note: "aktyvios" },
      { title: "Projektai", value: "5", note: "veiklių" },
      { title: "Nariai", value: "184", note: "mokiniai" },
    ],
  },
  Forumas: {
    summary: "Diskusijų lenta su idėjomis, patarimais ir mokyklos aktualijomis.",
    cards: [
      { title: "Temos", value: "26", note: "atvirų" },
      { title: "Atsakymai", value: "142", note: "šią savaitę" },
      { title: "Populiariausia", value: "9", note: "įrašai" },
    ],
  },
  Apklausos: {
    summary: "Nuomonės, balsavimai ir išankstinės atrankos bei renginių planai.",
    cards: [
      { title: "Aktyvios apklausos", value: "3", note: "vyksta" },
      { title: "Balsai", value: "482", note: "iš viso" },
      { title: "Laukia atsakymo", value: "2", note: "dar" },
    ],
  },
  Skelbimai: {
    summary: "Svarbiausia informacija, organizaciniai pranešimai ir taisyklės.",
    cards: [
      { title: "Nauji skelbimai", value: "11", note: "šiandien" },
      { title: "Archyvas", value: "42", note: "pranešimai" },
      { title: "Svarbūs", value: "6", note: "įrašai" },
    ],
  },
  Kalendorius: {
    summary: "Renginių ir susitikimų laikas, datos ir organizaciniai žymenys.",
    cards: [
      { title: "Artimiausi", value: "5", note: "renginiai" },
      { title: "Susitikimai", value: "9", note: "darbai" },
      { title: "Užrašai", value: "13", note: "įrašų" },
    ],
  },
};

function App() {
  const [activePage, setActivePage] = useState("Pagrindinis");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const detail = visualPages[activePage] ?? visualPages["Žinutės"];

  return (
    <div className="app">
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="logo-wrapper">
          <div className="logo-mark">Ž</div>
          <div>
            <h1>Žibėkim</h1>
            <span>Mokyklos bendruomenė</span>
          </div>

          <button
            className="close-menu"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="school-selector">
          <div className="school-icon">S</div>
          <div>
            <strong>Sun mokykla</strong>
            <span>2025–2026 m.</span>
          </div>
          <ChevronDown size={17} />
        </div>

        <nav className="navigation">
          <span className="nav-label">MENIU</span>

          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.name;

            return (
              <button
                key={item.name}
                className={`nav-item ${isActive ? "active" : ""}`}
                onClick={() => {
                  setActivePage(item.name);
                  setSidebarOpen(false);
                }}
              >
                <Icon size={19} />
                <span>{item.name}</span>

                {item.name === "Žinutės" && (
                  <span className="notification-count">4</span>
                )}
              </button>
            );
          })}

          <span className="nav-label bottom-label">SISTEMA</span>

          <button className="nav-item">
            <Settings size={19} />
            <span>Nustatymai</span>
          </button>
        </nav>

        <div className="sidebar-profile">
          <div className="avatar avatar-pink">SU</div>
          <div className="profile-info">
            <strong>Sun K.</strong>
            <span>III B klasė</span>
          </div>
          <MoreHorizontal size={19} />
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="main-content">
        <header className="topbar">
          <button
            className="mobile-menu-button"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>

          <div className="page-heading">
            <span className="breadcrumb">Žibėkim /</span>
            <h2>{activePage}</h2>
          </div>

          <div className="topbar-actions">
            <div className="search-box">
              <Search size={18} />
              <input placeholder="Ieškoti..." />
              <span>⌘ K</span>
            </div>

            <button className="icon-button notification-button">
              <Bell size={20} />
              <i />
            </button>

            <div className="topbar-avatar avatar avatar-pink">SU</div>
          </div>
        </header>

        <div className="content">
          {activePage === "Pagrindinis" ? (
            <>
              <section className="welcome-section forum-header">
                <div>
                  <p className="small-date">FORUMAS / BENDRUOMENĖ</p>
                  <h1>
                    Sun forum <span>💬</span>
                  </h1>
                  <p className="welcome-text">
                    Diskusijos, idėjos ir mokyklos pokalbiai – viskas vienoje lentelėje.
                  </p>
                </div>

                <div className="forum-header-actions">
                  <button className="primary-button">
                    <Plus size={18} />
                    Nauja tema
                  </button>
                </div>
              </section>

              <section className="forum-overview">
                <div className="forum-category-card hot">
                  <span>Karštos temos</span>
                  <strong>12</strong>
                  <small>aktyvios šiandien</small>
                </div>
                <div className="forum-category-card">
                  <span>Debatai</span>
                  <strong>38</strong>
                  <small>laukia jūsų</small>
                </div>
                <div className="forum-category-card">
                  <span>Renginiai</span>
                  <strong>9</strong>
                  <small>naujų įrašų</small>
                </div>
                <div className="forum-category-card">
                  <span>Mentoriai</span>
                  <strong>6</strong>
                  <small>aktyvūs</small>
                </div>
              </section>

              <section className="dashboard-grid forum-grid">
                <div className="dashboard-main-column">
                  <div className="section-header forum-toolbar">
                    <div>
                      <h3>Visos temos</h3>
                      <p>Šiuo metu aktyvios diskusijos</p>
                    </div>
                    <div className="forum-toolbar-actions">
                      <button className="chip active">Populiariausios</button>
                      <button className="chip">Naujausios</button>
                    </div>
                  </div>

                  <div className="discussion-list forum-list">
                    {discussions.map((discussion) => (
                      <article className="discussion-card forum-thread" key={discussion.title}>
                        <div className="avatar avatar-blue">{discussion.avatar}</div>

                        <div className="discussion-content">
                          <div className="discussion-top">
                            <span className="discussion-category">
                              {discussion.category}
                            </span>
                            <span className="discussion-time">Prieš 2 val.</span>
                          </div>

                          <h4>{discussion.title}</h4>

                          <div className="forum-tags">
                            {discussion.tags.map((tag) => (
                              <span key={`${discussion.title}-${tag}`} className="tag">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="discussion-meta">
                            <span>{discussion.author}</span>
                            <span>·</span>
                            <span>{discussion.replies} atsakymai</span>
                            <span>·</span>
                            <span>{discussion.views} peržiūros</span>
                          </div>

                          <div className="thread-reply">
                            {discussion.lastReply}
                          </div>
                        </div>

                        <div className="forum-side-stats">
                          <strong>{discussion.replies}</strong>
                          <span>ats.</span>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                <aside className="dashboard-side-column">
                  <div className="section-header">
                    <div>
                      <h3>Forumų temos</h3>
                      <p>Tematinės kategorijos</p>
                    </div>
                  </div>

                  <div className="forum-sidebar-box">
                    <div className="sidebar-topic">
                      <span className="topic-dot red" />
                      Mokyklos gyvenimas
                    </div>
                    <div className="sidebar-topic">
                      <span className="topic-dot orange" />
                      Renginiai
                    </div>
                    <div className="sidebar-topic">
                      <span className="topic-dot purple" />
                      Idėjos ir projektai
                    </div>
                    <div className="sidebar-topic">
                      <span className="topic-dot blue" />
                      Organizacija
                    </div>
                    <div className="sidebar-topic">
                      <span className="topic-dot gold" />
                      Mentoriai
                    </div>
                  </div>

                  <div className="poll-card">
                    <div className="poll-card-heading">
                      <div className="poll-icon">
                        <ClipboardList size={20} />
                      </div>
                      <span>AKTYVI APKLAUSA</span>
                    </div>

                    <h3>Kokio renginio norėtum šiais metais?</h3>
                    <p>Tavo nuomonė padės mums planuoti kitus mokyklos renginius.</p>

                    <div className="poll-option">
                      <span>🎵 Muzikos festivalis</span>
                      <strong>42%</strong>
                    </div>

                    <div className="poll-option">
                      <span>🎨 Kūrybinės dirbtuvės</span>
                      <strong>28%</strong>
                    </div>

                    <div className="poll-option">
                      <span>🏆 Sporto turnyras</span>
                      <strong>30%</strong>
                    </div>

                    <button className="poll-button">Atsakyti į apklausą</button>
                  </div>
                </aside>
              </section>
            </>
          ) : (
            <section className="mock-page-shell">
              <div className="mock-page-header">
                <p className="small-date">{activePage.toUpperCase()}</p>
                <h1>{activePage}</h1>
                <p className="welcome-text">{detail.summary}</p>
              </div>

              <div className="mock-page-grid">
                {detail.cards.map((card) => (
                  <article className="mock-page-card" key={card.title}>
                    <span>{card.title}</span>
                    <strong>{card.value}</strong>
                    <small>{card.note}</small>
                  </article>
                ))}
              </div>

              <div className="mock-page-list">
                <div className="section-header">
                  <div>
                    <h3>Šiuo metu matoma</h3>
                    <p>Visualinis puslapio vaizdas</p>
                  </div>
                </div>

                <div className="discussion-list">
                  {discussions.slice(0, 2).map((discussion) => (
                    <article className="discussion-card" key={`${activePage}-${discussion.title}`}>
                      <div className="avatar avatar-blue">{discussion.avatar}</div>

                      <div className="discussion-content">
                        <div className="discussion-top">
                          <span className="discussion-category">
                            {discussion.category}
                          </span>
                          <span className="discussion-time">Prieš 2 val.</span>
                        </div>

                        <h4>{discussion.title}</h4>

                        <div className="discussion-meta">
                          <span>{discussion.author}</span>
                          <span>·</span>
                          <span>{discussion.replies} atsakymai</span>
                          <span>·</span>
                          <span>{discussion.views} peržiūros</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
