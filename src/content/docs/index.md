---
title: Inicio
description: Area Tecnico Profesional - Liceo Bicentenario Rector Abdón Andrade Coloma
---

<div class="home">
  <!-- Hero Section -->
  <section class="hero">
    <div class="hero-content">
      <div class="hero-badge">
        <span class="badge-icon">🎓</span>
        <span>Liceo Bicentenario</span>
      </div>
      <h1>Área Técnico Profesional</h1>
      <p class="hero-description">
        Formamos técnicos competentes para el mundo laboral. 
        Tres especialidades con enfoque práctico y orientado al futuro.
      </p>
      <div class="hero-stats">
        <div class="stat">
          <span class="stat-number">3</span>
          <span class="stat-label">Especialidades</span>
        </div>
        <div class="stat">
          <span class="stat-number">12+</span>
          <span class="stat-label">Módulos</span>
        </div>
        <div class="stat">
          <span class="stat-number">2</span>
          <span class="stat-label">Años</span>
        </div>
        <div class="stat">
          <span class="stat-number">100%</span>
          <span class="stat-label">Práctica</span>
        </div>
      </div>
    </div>
    <div class="hero-visual">
      <div class="visual-card">
        <svg viewBox="0 0 200 200" class="visual-svg">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#15803d;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#22c55e;stop-opacity:1" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="80" fill="url(#grad1)" opacity="0.1"/>
          <path d="M100 30 L100 170 M30 100 L170 100" stroke="#15803d" stroke-width="1" opacity="0.2"/>
          <circle cx="100" cy="100" r="50" fill="none" stroke="#15803d" stroke-width="2" opacity="0.3"/>
          <circle cx="100" cy="100" r="20" fill="#15803d"/>
          <text x="100" y="105" text-anchor="middle" fill="white" font-size="12" font-weight="bold">TP</text>
        </svg>
      </div>
    </div>
  </section>

  <!-- Specialties Section -->
  <section class="section">
    <h2 class="section-title">Nuestras Especialidades</h2>
    <div class="specialty-grid">
      <a href="/conectividad-y-redes/" class="specialty-card green">
        <div class="card-bar"></div>
        <div class="card-content">
          <div class="card-icon">🔧</div>
          <div class="card-badge">Activa</div>
          <h3>Conectividad y Redes</h3>
          <p>Instalación, configuración y mantención de redes, servidores y sistemas de conectividad.</p>
          <span class="card-cta">Explorar →</span>
        </div>
      </a>
      <a href="/administracion/" class="specialty-card blue">
        <div class="card-bar"></div>
        <div class="card-content">
          <div class="card-icon">📊</div>
          <div class="card-badge">Activa</div>
          <h3>Administración</h3>
          <p>Gestión, organización y soporte operativo en empresas e instituciones públicas o privadas.</p>
          <span class="card-cta">Explorar →</span>
        </div>
      </a>
      <div class="specialty-card orange disabled">
        <div class="card-bar"></div>
        <div class="card-content">
          <div class="card-icon">🧾</div>
          <div class="card-badge">En desarrollo</div>
          <h3>Contabilidad</h3>
          <p>Registro, análisis e interpretación de información financiera para la toma de decisiones.</p>
          <span class="card-cta disabled">Próximamente</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Quick Links Section -->
  <section class="section quick-links">
    <h2 class="section-title">Acceso Rápido</h2>
    <div class="links-grid">
      <a href="/conectividad-y-redes/planificacion/" class="quick-link">
        <span class="link-icon">📋</span>
        <span class="link-text">Planificaciones</span>
      </a>
      <a href="/conectividad-y-redes/niveles/tercero-medio/" class="quick-link">
        <span class="link-icon">🎓</span>
        <span class="link-text">3° Medio</span>
      </a>
      <a href="/conectividad-y-redes/niveles/cuarto-medio/" class="quick-link">
        <span class="link-icon">🎯</span>
        <span class="link-text">4° Medio</span>
      </a>
      <a href="/conectividad-y-redes/apuntes_generales/" class="quick-link">
        <span class="link-icon">📚</span>
        <span class="link-text">Apuntes</span>
      </a>
    </div>
  </section>

  <!-- News Section -->
  <section class="section news-section">
    <div class="news-header">
      <h2 class="section-title">Últimas Noticias</h2>
      <a href="/noticias/" class="view-all">Ver todas →</a>
    </div>
    <div class="news-grid">
      <a href="/noticias/chile-supera-las-10-millones-de-conexiones-5g-y-cuenta-con-el-internet/" class="news-card">
        <span class="news-date">14 abr 2026</span>
        <h4>Chile supera 10 millones de conexiones 5G</h4>
        <p>El país alcanza nuevo hito en conectividad móvil...</p>
      </a>
      <a href="/noticias/gobierno-retira-de-contraloria-dos-decretos-ingresados-para-regular-le/" class="news-card">
        <span class="news-date">10 abr 2026</span>
        <h4>Nuevo regulación de telecomunicaciones</h4>
        <p>Gobierno retira decreto para regular...</p>
      </a>
      <a href="/noticias/chile-lider-conectividad-latam-2026/" class="news-card">
        <span class="news-date">9 abr 2026</span>
        <h4>Chile lidera conectividad en LATAM</h4>
        <p>JP Morgan posiciona a Chile con el internet más...</p>
      </a>
    </div>
  </section>
</div>

<style>
  .home {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
  }

  /* Hero Section */
  .hero {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 3rem;
    align-items: center;
    padding: 3rem 0;
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    .hero {
      grid-template-columns: 1fr;
      text-align: center;
    }
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.375rem 0.875rem;
    background: rgba(22, 163, 74, 0.1);
    border: 1px solid rgba(22, 163, 74, 0.2);
    border-radius: 20px;
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--tp-green-700);
    margin-bottom: 1rem;
    animation: fadeInDown 0.5s ease-out;
  }

  :root[data-theme='dark'] .hero-badge {
    background: rgba(74, 222, 128, 0.15);
    border-color: rgba(74, 222, 128, 0.3);
    color: var(--tp-green-400);
  }

  .hero h1 {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    background: linear-gradient(135deg, #15803d, #22c55e);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0 0 1rem;
    animation: fadeInUp 0.5s ease-out 0.1s backwards;
  }

  .hero-description {
    font-size: 1.125rem;
    color: var(--tp-text-soft);
    line-height: 1.7;
    margin: 0 0 2rem;
    max-width: 540px;
    animation: fadeInUp 0.5s ease-out 0.2s backwards;
  }

  @media (max-width: 768px) {
    .hero-description {
      margin: 0 auto 2rem;
    }
  }

  .hero-stats {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    animation: fadeInUp 0.5s ease-out 0.3s backwards;
  }

  @media (max-width: 768px) {
    .hero-stats {
      justify-content: center;
    }
  }

  .stat {
    text-align: center;
  }

  .stat-number {
    display: block;
    font-size: 2rem;
    font-weight: 700;
    color: var(--tp-green-600);
    line-height: 1;
  }

  .stat-label {
    display: block;
    font-size: 0.8125rem;
    color: var(--tp-text-soft);
    margin-top: 0.375rem;
  }

  .hero-visual {
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.8s ease-out 0.4s backwards;
  }

  .visual-card {
    width: 180px;
    height: 180px;
    background: linear-gradient(135deg, rgba(22, 163, 74, 0.1), rgba(34, 197, 94, 0.05));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid rgba(22, 163, 74, 0.2);
  }

  .visual-svg {
    width: 120px;
    height: 120px;
    animation: pulse 3s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* Section */
  .section {
    padding: 2rem 0;
  }

  .section-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--tp-text);
    text-align: center;
    margin: 0 0 1.5rem;
    letter-spacing: -0.02em;
  }

  /* Specialty Cards */
  .specialty-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .specialty-card {
    background: var(--tp-surface);
    border: 1px solid var(--tp-border);
    border-radius: 16px;
    overflow: hidden;
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;
  }

  :root[data-theme='dark'] .specialty-card {
    background: linear-gradient(135deg, #1e293b, #0f172a);
  }

  .specialty-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(21, 128, 61, 0.15);
    border-color: var(--tp-green-500);
  }

  .specialty-card.disabled {
    opacity: 0.7;
  }

  .specialty-card.disabled:hover {
    transform: none;
    box-shadow: none;
    border-color: var(--tp-border);
  }

  .card-bar {
    height: 4px;
    width: 100%;
  }

  .specialty-card.green .card-bar { background: linear-gradient(90deg, #15803d, #22c55e); }
  .specialty-card.blue .card-bar { background: linear-gradient(90deg, #2563eb, #60a5fa); }
  .specialty-card.orange .card-bar { background: linear-gradient(90deg, #ea7835, #fb923c); }

  .card-content {
    padding: 1.5rem;
  }

  .card-icon {
    font-size: 2rem;
    margin-bottom: 0.75rem;
  }

  .card-badge {
    display: inline-block;
    padding: 0.25rem 0.625rem;
    font-size: 0.6875rem;
    font-weight: 600;
    border-radius: 6px;
    margin-bottom: 0.75rem;
  }

  .specialty-card.green .card-badge {
    background: rgba(22, 163, 74, 0.1);
    color: #15803d;
  }

  .specialty-card.blue .card-badge {
    background: rgba(37, 99, 235, 0.1);
    color: #2563eb;
  }

  .specialty-card.orange .card-badge {
    background: rgba(234, 120, 53, 0.1);
    color: #b45309;
  }

  :root[data-theme='dark'] .specialty-card.green .card-badge {
    background: rgba(74, 222, 128, 0.2);
    color: #4ade80;
  }

  :root[data-theme='dark'] .specialty-card.blue .card-badge {
    background: rgba(96, 165, 250, 0.2);
    color: #60a5fa;
  }

  :root[data-theme='dark'] .specialty-card.orange .card-badge {
    background: rgba(251, 146, 60, 0.2);
    color: #fb923c;
  }

  .card-content h3 {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--tp-text);
    margin: 0 0 0.5rem;
  }

  .card-content p {
    font-size: 0.875rem;
    color: var(--tp-text-soft);
    line-height: 1.6;
    margin: 0 0 1rem;
  }

  .card-cta {
    font-size: 0.875rem;
    font-weight: 600;
    color: #15803d;
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    transition: gap 0.2s;
  }

  .specialty-card:hover .card-cta {
    gap: 0.625rem;
  }

  .card-cta.disabled {
    color: var(--tp-text-soft);
    cursor: default;
  }

  /* Quick Links */
  .quick-links {
    background: var(--tp-surface-raised, #f8fafc);
    border-radius: 16px;
    padding: 2rem;
    margin: 2rem 0;
  }

  :root[data-theme='dark'] .quick-links {
    background: #1e293b;
  }

  .links-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }

  .quick-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.625rem;
    padding: 1.25rem;
    background: var(--tp-surface);
    border: 1px solid var(--tp-border);
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.2s;
  }

  .quick-link:hover {
    border-color: var(--tp-green-500);
    background: rgba(22, 163, 74, 0.05);
    transform: translateY(-2px);
  }

  .quick-link .link-icon {
    font-size: 1.5rem;
  }

  .quick-link .link-text {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--tp-text);
  }

  /* News Section */
  .news-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }

  .news-header .section-title {
    margin: 0;
    text-align: left;
  }

  .view-all {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--tp-green-600);
    text-decoration: none;
  }

  .view-all:hover {
    text-decoration: underline;
  }

  .news-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.25rem;
  }

  .news-card {
    display: block;
    padding: 1.25rem;
    background: var(--tp-surface);
    border: 1px solid var(--tp-border);
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.2s;
  }

  .news-card:hover {
    border-color: var(--tp-green-500);
    transform: translateY(-2px);
  }

  .news-date {
    font-size: 0.75rem;
    color: var(--tp-text-soft);
    display: block;
    margin-bottom: 0.5rem;
  }

  .news-card h4 {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--tp-text);
    margin: 0 0 0.5rem;
    line-height: 1.4;
  }

  .news-card p {
    font-size: 0.8125rem;
    color: var(--tp-text-soft);
    margin: 0;
    line-height: 1.5;
  }
</style>