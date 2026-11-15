// ============================================================================
// AJ ODONTOLOGIA — Site completo em um único arquivo .js
// Abra este arquivo no navegador ou carregue-o em qualquer página HTML.
// ============================================================================

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // SUPABASE CONFIG (embutido no site.js)
  // --------------------------------------------------------------------------
  const SUPABASE_CONFIG = {
    url: 'https://qfwalhfftbesjobruiyu.supabase.co',
    anonKey: 'sb_publishable_HIAhuKD4KSEkglM19vgSMw_2Q5wNpWr'
  };

  // Injetar CDN do Supabase no head
  (function injectSupabase() {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    s.async = true;
    document.head.appendChild(s);
  })();

  // --------------------------------------------------------------------------
  // 1) CSS completo (estética sofisticada, glassmorphism, animações)
  // --------------------------------------------------------------------------
  const css = `
:root{
  --amber:#b8860b;
  --amber-glow:#d4a373;
  --deep:#4a3728;
  --paper:#fdfbf7;
  --paper-2:#f5ede2;
  --sand:#e8dccf;
  --ink:#2e241c;
  --muted:#8a7a6b;
  --white:#ffffff;
  --glass:rgba(255,255,255,0.55);
  --glass-border:rgba(184,134,11,0.18);
  --radius:28px;
  --shadow:0 24px 60px -20px rgba(110,68,41,.22);
  --shadow-strong:0 40px 90px -24px rgba(74,55,40,.35);
  --transition:all 0.6s cubic-bezier(0.23,1,0.32,1);
}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{
  font-family:'Inter',sans-serif;
  background:var(--paper);
  color:var(--ink);
  line-height:1.6;
  overflow-x:hidden;
  -webkit-font-smoothing:antialiased;
}
h1,h2,h3,.serif{font-family:'Playfair Display',serif}
img{max-width:100%;display:block}
a{text-decoration:none;color:inherit}
ul{list-style:none}
.container{width:min(1200px,92%);margin-inline:auto}

/* cursor personalizado */
.cursor{
  position:fixed;width:20px;height:20px;border:2px solid var(--amber);
  border-radius:50%;pointer-events:none;z-index:9999;
  mix-blend-mode:difference;transition:transform .15s,width .3s,height .3s,background .3s;
  transform:translate(-50%,-50%);
}
.cursor.hovered{width:60px;height:60px;background:rgba(184,134,11,.15);border-color:transparent}

/* fundo sofisticado */
.bg-blobs{
  position:fixed;inset:0;z-index:-1;overflow:hidden;
  background:
    radial-gradient(circle at 10% 20%, rgba(184,134,11,.12), transparent 45%),
    radial-gradient(circle at 90% 80%, rgba(184,134,11,.08), transparent 45%),
    linear-gradient(180deg, var(--paper) 0%, var(--paper-2) 100%);
}
.blob{
  position:absolute;border-radius:50%;filter:blur(60px);opacity:.45;
  animation:blobMove 18s ease-in-out infinite alternate;
}
.b1{top:-10%;left:-10%;width:560px;height:560px;background:var(--amber-glow);animation-delay:0s}
.b2{right:-10%;bottom:-10%;width:640px;height:640px;background:#d4a373;animation-delay:4s}
.b3{top:30%;left:45%;width:420px;height:420px;background:#b8860b;opacity:.35;animation-delay:8s}
@keyframes blobMove{
  0%{transform:translate(0,0) scale(1)}
  100%{transform:translate(40px,60px) scale(1.15)}
}

/* topbar */
.topbar{
  background:linear-gradient(90deg,var(--deep),#3a2c1f);
  color:#e8dccf;font-size:.72rem;text-align:center;padding:.5rem 1rem;letter-spacing:.12em;
}

/* header */
header{position:sticky;top:0;z-index:100;background:rgba(253,251,247,.85);backdrop-filter:blur(16px);border-bottom:1px solid rgba(184,134,11,.1);transition:var(--transition)}
header.scrolled{box-shadow:var(--shadow);background:rgba(253,251,247,.95)}
.nav{display:flex;align-items:center;justify-content:space-between;padding:1rem 0}
.logo{display:flex;align-items:center;gap:.85rem}
.logo-img{
  width:48px;height:48px;display:block;object-fit:cover;border-radius:14px
}
.logo-text{line-height:1.05}
.logo-text strong{font-family:'Playfair Display',serif;font-size:1.45rem;color:var(--deep);display:block}
.logo-text span{font-size:.68rem;letter-spacing:.3em;text-transform:uppercase;color:var(--muted)}
.nav-links{display:flex;gap:2.2rem;font-size:.82rem;font-weight:500;letter-spacing:.04em}
.nav-links a{color:var(--ink);position:relative;transition:color .4s}
.nav-links a::after{content:"";position:absolute;bottom:-6px;left:0;width:0;height:2px;background:linear-gradient(90deg,var(--amber),var(--amber-glow));border-radius:2px;transition:width .5s}
.nav-links a:hover{color:var(--amber)}
.nav-links a:hover::after{width:100%}
.btn{
  display:inline-flex;align-items:center;gap:.6rem;padding:.9rem 1.9rem;border-radius:50px;font-weight:600;font-size:.82rem;letter-spacing:.03em;cursor:pointer;border:none;transition:var(--transition);overflow:hidden;position:relative
}
.btn-primary{
  background:linear-gradient(135deg,var(--amber),#8a5a3a);color:#fff;box-shadow:0 10px 24px -8px rgba(138,90,58,.45)
}
.btn-primary::before{
  content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent);transform:translateX(-100%);transition:.7s
}
.btn-primary:hover::before{transform:translateX(100%)}
.btn-primary:hover{transform:translateY(-3px);box-shadow:0 18px 32px -12px rgba(138,90,58,.55)}
.btn-outline{
  background:transparent;color:var(--deep);border:1.5px solid var(--glass-border)
}
.btn-outline:hover{background:var(--amber);color:#fff;transform:translateY(-3px)}
.burger{display:none;background:none;border:none;cursor:pointer;padding:.5rem}
.burger span{display:block;width:24px;height:2px;background:var(--deep);margin:5.5px 0;border-radius:2px;transition:.4s}
.burger.open span:nth-child(1){transform:translateY(7.5px) rotate(45deg)}
.burger.open span:nth-child(2){opacity:0}
.burger.open span:nth-child(3){transform:translateY(-7.5px) rotate(-45deg)}
.mobile-menu{display:none;flex-direction:column;background:var(--paper);border-top:1px solid rgba(184,134,11,.1)}
.mobile-menu a{padding:1rem 6%;border-bottom:1px solid rgba(184,134,11,.06);font-weight:500}

/* HERO */
.hero{
  position:relative;min-height:92vh;display:flex;align-items:center;
  background:var(--paper);overflow:hidden;
}
.hero::before{
  content:"";position:absolute;inset:0;
  background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-opacity='.03'%3E%3Cpath d='M30 0c0 .5-.1 1-.1 1.5L30 60c0 .5.1 1 .1 1.5M0 30c.5 0 1 .1 1.5 .1L60 30c.5 0 1-.1 1.5-.1L60 30c0-.5-.1-1-.1-1.5L60 0c0-.5-.1-1-.1-1.5L30 0c-.1-.5-.1-1-.1-1.5L0 30c-.1-.5-.1-1-.1-1.5z'/%3E%3C/g%3E%3C/svg%3E");
  opacity:.5;
}
.hero-inner{
  position:relative;display:grid;grid-template-columns:1.15fr .9fr;gap:3rem;align-items:center;padding:5rem 0;
}
.hero-badge{
  display:inline-flex;align-items:center;gap:.6rem;background:var(--white);
  border:1px solid var(--glass-border);padding:.5rem 1.2rem;border-radius:50px;
  font-size:.78rem;font-weight:600;color:var(--deep);box-shadow:var(--shadow);backdrop-filter:blur(8px)
}
.stars{color:var(--amber);letter-spacing:.1em}
.hero h1{font-size:clamp(2.8rem,5.5vw,5rem);font-weight:700;line-height:1.05;color:var(--deep);margin-bottom:1.3rem;letter-spacing:-0.02em}
.hero h1 em{font-style:italic;color:var(--amber)}
.hero .lead{font-size:1.1rem;color:var(--muted);max-width:36rem;margin-bottom:2.4rem;font-weight:400}
.hero-actions{display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:2.6rem}
.hero-info{display:flex;gap:2.5rem;flex-wrap:wrap;font-size:.82rem;color:var(--muted)}
.hero-info div{display:flex;align-items:center;gap:.6rem}
.hero-info svg{width:16px;height:16px;fill:none;stroke:var(--amber);stroke-width:2}
.status{font-weight:600}
.status.open{color:#2e7d4f}
.status.closed{color:#b04a3a}

/* hero card visual */
.hero-visual{justify-self:center;width:100%;max-width:470px}
.hero-card{
  position:relative;border-radius:44px;overflow:visible;background:var(--white);
  box-shadow:var(--shadow-strong);border:1px solid rgba(184,134,11,.12)
}
.hero-card .aj{font-family:'Playfair Display',serif;font-weight:900;font-size:9rem;line-height:.85;color:var(--amber);opacity:.18;position:absolute;right:-1.2rem;top:-1rem;mix-blend-mode:multiply}
.hero-card .sub{font-size:.72rem;letter-spacing:.5em;text-transform:uppercase;color:var(--muted);margin-bottom:.4rem}
.hero-card .tag{font-family:'Playfair Display',serif;font-style:italic;font-size:1.5rem;color:var(--deep);margin-bottom:1rem}
.hero-card .divider{width:56px;height:3px;background:linear-gradient(90deg,var(--amber),var(--amber-glow));border-radius:2px;margin:1.2rem 0}
.hero-card .loc{font-size:.8rem;color:var(--muted)}
.float-chip{
  position:absolute;background:rgba(255,255,255,.92);backdrop-filter:blur(14px);
  border:1px solid var(--glass-border);border-radius:16px;box-shadow:var(--shadow);
  padding:.85rem 1.15rem;display:flex;align-items:center;gap:.75rem;font-size:.78rem;font-weight:600;
  color:var(--deep);animation:floaty 6s ease-in-out infinite;white-space:nowrap;z-index:10
}
.float-chip small{display:block;font-weight:400;color:var(--muted);font-size:.68rem;margin-top:2px;line-height:1.1}
.chip-ico{width:38px;height:38px;border-radius:12px;display:grid;place-items:center;background:var(--amber);color:#fff}
.chip-1{top:-24px;left:-24px;animation-delay:0s}
.chip-2{bottom:-24px;right:-20px;animation-delay:3s}
@keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}

/* sections */
section{padding:7rem 0}
.section-head{text-align:center;max-width:48rem;margin:0 auto 4rem}
.eyebrow{display:inline-block;font-size:.7rem;letter-spacing:.4em;text-transform:uppercase;color:var(--amber);font-weight:600;margin-bottom:1rem}
.section-head h2{font-size:clamp(2.2rem,5vw,3.4rem);font-weight:700;line-height:1.12;color:var(--deep);margin-bottom:1rem}
.section-head p{color:var(--muted);font-size:1.05rem}

/* cards grid */
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:1.6rem;align-items:stretch}
.card{
  position:relative;background:var(--glass);backdrop-filter:blur(20px);
  border:1px solid var(--glass-border);border-radius:var(--radius);
  padding:2.6rem 2rem;transition:var(--transition);overflow:hidden;display:flex;flex-direction:column;min-height:340px;group:hover .card-bg{transform:scale(1.15)}
}
.card-bg{
  position:absolute;inset:0;z-index:0;opacity:.12;background:linear-gradient(135deg,var(--amber),transparent);
  transform:scale(.8);transition:var(--transition)
}
.card > *{position:relative;z-index:1}
.card:hover{transform:translateY(-10px);border-color:rgba(184,134,11,.35);box-shadow:var(--shadow)}
.card-ico{width:56px;height:56px;border-radius:18px;display:grid;place-items:center;margin-bottom:1.4rem;
  background:linear-gradient(135deg,rgba(184,134,11,.12),rgba(138,90,58,.12));
  border:1px solid rgba(184,134,11,.2);color:var(--amber);box-shadow:0 0 40px rgba(184,134,11,.15)}
.card-ico svg{width:28px;height:28px}
.card h3{font-size:1.5rem;font-weight:700;margin-bottom:.7rem;color:var(--deep);line-height:1.2}
.card p{font-size:.9rem;color:var(--muted);line-height:1.6;margin-top:auto}

/* sobre */
.sobre{background:linear-gradient(180deg,var(--paper) 0%, var(--paper-2) 100%)}
.sobre-grid{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}
.sobre-img{position:relative;border-radius:40px;overflow:hidden;box-shadow:var(--shadow-strong);aspect-ratio:4/5}
.sobre-img img{width:100%;height:100%;object-fit:cover;transform:scale(1);transition:transform 1.2s}
.sobre-img:hover img{transform:scale(1.05)}
.sobre-img::after{
  content:"AJ";position:absolute;inset:0;display:grid;place-items:center;
  font-family:'Playfair Display',serif;font-size:14rem;font-weight:900;color:rgba(184,134,11,.08);z-index:1
}
.figcap{
  position:absolute;bottom:1.8rem;left:1.8rem;right:1.8rem;z-index:2;
  background:rgba(255,255,255,.75);backdrop-filter:blur(10px);border-radius:20px;
  padding:1rem 1.4rem;font-size:.8rem;color:var(--muted);border:1px solid rgba(184,134,11,.15);box-shadow:var(--shadow)
}
.sobre-content h2{font-size:clamp(2rem,4.5vw,3rem);font-weight:700;margin-bottom:1.2rem;color:var(--deep)}
.sobre-content p{color:var(--muted);margin-bottom:1.1rem;font-size:1.02rem}
.pillars{margin:1.4rem 0 2rem;display:grid;gap:.85rem}
.pillars li{display:flex;gap:.9rem;align-items:center;font-size:.92rem;color:var(--ink)}
.pillars .check{
  width:26px;height:26px;border-radius:50%;display:grid;place-items:center;
  background:linear-gradient(135deg,var(--amber),#8a5a3a);color:#fff;font-size:.78rem;font-weight:700
}

/* depoimentos */
.depo-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.6rem}
.depo{
  background:var(--white);border-radius:var(--radius);padding:2.6rem 2.2rem;
  border:1px solid var(--glass-border);position:relative;overflow:hidden;transition:var(--transition)
}
.depo:hover{transform:translateY(-6px);border-color:rgba(184,134,11,.3);box-shadow:var(--shadow)}
.stars-quote{color:var(--amber);font-size:1.1rem;margin-bottom:1rem;letter-spacing:.1em}
.depo p{font-size:.98rem;color:var(--muted);font-style:italic;margin-bottom:1.6rem;position:relative;z-index:1}
.depo .who{display:flex;align-items:center;gap:1rem}
.avatar{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,var(--amber),#8a5a3a);color:#fff;font-weight:700;font-size:1rem}
.depo .who b{display:block;font-size:.9rem;color:var(--deep)}
.depo .who span{font-size:.76rem;color:var(--muted)}
.deco-quote{
  position:absolute;top:-1.5rem;right:-1.5rem;width:120px;height:120px;background:var(--amber);opacity:.12;
  border-radius:50%;filter:blur(20px);z-index:0
}

/* contato */
.contato{background:linear-gradient(160deg,var(--deep) 0%, #5c4633 60%, var(--amber) 100%);color:#f7efe5}
.contato .section-head h2,.contato .section-head p{color:#fff}
.contato .section-head p{opacity:.85}
.contato .eyebrow{color:#e0b97d}
.contato-grid{display:grid;grid-template-columns:1fr 1.1fr;gap:3rem;align-items:start}
.info-card{background:rgba(255,255,255,.07);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.12);border-radius:var(--radius);padding:2.6rem}
.info-item{display:flex;gap:1rem;padding:1rem 0;border-bottom:1px solid rgba(255,255,255,.08)}
.info-item:last-child{border-bottom:none}
.info-item .ic{
  width:46px;height:46px;border-radius:14px;flex-shrink:0;display:grid;place-items:center;
  background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.08)
}
.info-item svg{width:22px;height:22px;fill:none;stroke:#fff;stroke-width:2}
.info-item b{display:block;font-size:.9rem;color:#fff;margin-bottom:.1rem}
.info-item p,.info-item a{font-size:.86rem;opacity:.8}
.info-item a:hover{color:#ffe3a8;text-decoration:underline}
.hours-table{width:100%;font-size:.86rem}
.hours-table td{padding:.4rem 0;color:#e8dccf}
.hours-table td:last-child{text-align:right;font-weight:600;color:#ffe3a8}
.hours-table tr.today{color:#ffd992;font-weight:700}

.form-card{background:var(--white);color:var(--ink);border-radius:var(--radius);padding:2.8rem;box-shadow:var(--shadow-strong)}
.form-card h3{font-size:1.9rem;font-weight:700;color:var(--deep);margin-bottom:.4rem}
.form-card>p{font-size:.9rem;color:var(--muted);margin-bottom:1.8rem}
.field{margin-bottom:1.2rem}
.field label{display:block;font-size:.78rem;font-weight:600;margin-bottom:.4rem;letter-spacing:.04em;color:var(--deep)}
.field input,.field select,.field textarea{
  width:100%;padding:.9rem 1rem;border:1.5px solid rgba(184,134,11,.2);border-radius:14px;
  font-family:inherit;font-size:.9rem;background:var(--paper);transition:var(--transition);color:var(--ink)
}
.field input:focus,.field select:focus,.field textarea:focus{
  outline:none;border-color:var(--amber);box-shadow:0 0 0 5px rgba(184,134,11,.1);background:#fff
}
.field-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.form-note{font-size:.72rem;color:var(--muted);margin-top:.7rem}
.form-card .btn{margin-top:.4rem}

/* footer */
footer{background:#261c14;color:#cbbbaa;padding:4rem 0 0}
.foot-grid{display:grid;grid-template-columns:1.5fr 1fr 1fr;gap:3rem;padding-bottom:3rem}
.foot-grid h4{color:#fff;font-family:'Playfair Display',serif;font-size:1.3rem;margin-bottom:1rem}
.foot-links li{margin-bottom:.6rem;font-size:.88rem}
.foot-links a:hover{color:#ffe3a8}
.foot-bottom{border-top:1px solid rgba(255,255,255,.08);padding:1.4rem 0;text-align:center;font-size:.72rem;opacity:.6}

/* whatsapp float */
.wa-float{
  position:fixed;bottom:1.8rem;right:1.8rem;z-index:1000;width:64px;height:64px;border-radius:50%;
  background:#25d366;display:grid;place-items:center;box-shadow:0 16px 32px -10px rgba(37,211,102,.6);
  transition:var(--transition);animation:waPulse 3s infinite
}
.wa-float:hover{transform:scale(1.12);box-shadow:0 20px 40px -12px rgba(37,211,102,.7)}
.wa-float svg{width:34px;height:34px;fill:#fff}
@keyframes waPulse{0%,100%{box-shadow:0 16px 32px -10px rgba(37,211,102,.6),0 0 0 0 rgba(37,211,102,.5)}70%{box-shadow:0 16px 32px -10px rgba(37,211,102,.6),0 0 0 18px rgba(37,211,102,0)}}

/* Conheça-nos - Carrossel Infinito */
.conheca-nos{padding:6rem 0;background:var(--paper-2)}
.conheca-nos .section-head{margin-bottom:3rem}
.carousel-wrapper{
  position:relative;overflow:hidden;mask-image:linear-gradient(90deg,#000 15%,#000 85%,transparent 100%);
  -webkit-mask-image:linear-gradient(90deg,#000 15%,#000 85%,transparent 100%);
}
.carousel-track{
  display:flex;animation:scroll 24s linear infinite;animation-play-state:running;
}
.carousel-wrapper:hover .carousel-track{animation-play-state:paused}
.carousel-track img{
  aspect-ratio:4/5;width:260px;object-fit:cover;object-position:center;border-radius:20px;flex-shrink:0;
  margin-right:1.6rem;border:1px solid var(--glass-border);box-shadow:var(--shadow-sm);
  transition:transform .4s,filter .4s
}
.carousel-track img:hover{transform:scale(1.05);filter:brightness(1.05)}
.carousel-track::after{content:"";flex-shrink:0;width:1px}
@keyframes scroll{
  0%{transform:translateX(0)}
  100%{transform:translateX(-50%)}
}
@media(max-width:820px){
  .carousel-track img{aspect-ratio:4/5;width:200px;object-fit:cover;object-position:center;margin-right:1.2rem}
  .conheca-nos{padding:4rem 0}
}

/* reveal */
.reveal{opacity:0;transform:translateY(34px);transition:opacity 1s ease,transform 1s ease}
.reveal.visible{opacity:1;transform:none}
.stagger{opacity:1;transform:none;transition:opacity .8s ease,transform .8s ease}
.stagger.visible{opacity:1;transform:none}

@media(max-width:1000px){
  .hero-inner{grid-template-columns:1fr;text-align:center;gap:2.5rem}
  .hero p.lead,.hero-actions,.hero-info{margin-inline:auto;justify-content:center}
  .hero-visual{max-width:400px;order:-1}
  .sobre-grid,.contato-grid{grid-template-columns:1fr}
  .sobre-img{max-width:460px;margin-inline:auto;aspect-ratio:1/1.2}
  .foot-grid{grid-template-columns:1fr 1fr}
  .cards{grid-template-columns:1fr}
}
@media(max-width:820px){
  .nav-links,.nav-cta{display:none}
  .burger{display:block}
  .hero h1{font-size:2.8rem}
  .field-row{grid-template-columns:1fr}
}
@media(max-width:600px){
  section{padding:5rem 0}
  .hero-card .aj{font-size:5rem}
  .info-card,.form-card{padding:1.8rem}
  .foot-grid{grid-template-columns:1fr;text-align:center}
  .foot-grid ul{display:flex;flex-direction:column;align-items:center;gap:.4rem}
}
`;

  // Injeta o CSS na cabeça do documento
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // --------------------------------------------------------------------------
  // 2) HTML completo
  // --------------------------------------------------------------------------
  const html = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">

<div class="cursor"></div>
<div class="bg-blobs">
  <div class="blob b1"></div>
  <div class="blob b2"></div>
  <div class="blob b3"></div>
</div>

<div class="topbar">✨ Sorriso, saúde e beleza · Clínica odontológica em Sobral · CE</div>

<header id="header">
  <div class="container nav">
    <a href="#inicio" class="logo">
      <img class="logo-img" src="image/Design sem nome (10).png" alt="Logo AJ Odontologia" onerror="this.style.display='none';">
      <div class="logo-text">
        <strong>AJ Odontologia</strong>
        <span>Sobral · CE</span>
      </div>
    </a>
    <nav class="nav-links">
      <a href="#inicio">Início</a>
      <a href="#especialidades">Especialidades</a>
      <a href="#sobre">A Clínica</a>
      <a href="#depoimentos">Avaliações</a>
      <a href="#contato">Contato</a>
    </nav>
    <a class="btn btn-primary nav-cta" href="https://wa.me/5588992199494?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20na%20AJ%20Odontologia%20%F0%9F%98%8A" target="_blank" rel="noopener">
      Agendar Avaliação
    </a>
    <button class="burger" id="burger" aria-label="Abrir menu"><span></span><span></span><span></span></button>
  </div>
  <nav class="mobile-menu" id="mobileMenu">
    <a href="#inicio">Início</a>
    <a href="#especialidades">Especialidades</a>
    <a href="#sobre">A Clínica</a>
    <a href="#depoimentos">Avaliações</a>
    <a href="#contato">Contato</a>
    <a href="https://wa.me/5588992199494" target="_blank" rel="noopener" style="color:var(--amber);font-weight:600">WhatsApp: (88) 99219-9494</a>
  </nav>
</header>

<section class="hero" id="inicio">
  <div class="container hero-inner">
    <div class="hero-visual stagger">
      <div class="hero-card">
        <img class="logo-img" src="image/Design sem nome (10).png" alt="Logo AJ Odontologia" style="width:110px;height:110px;margin:0 auto 1.2rem;display:block;object-fit:cover;border-radius:16px;filter:none" onerror="this.style.display='none';">
        <div class="sub">Odontologia</div>
        <div class="tag">"Aliando saúde e beleza ao seu sorriso."</div>
        <div class="divider"></div>
        <div class="loc">Clínica odontológica · Centro, Sobral — CE</div>
        <div class="float-chip chip-1">
          <div class="chip-ico">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <div>
            <span>Centro de Sobral</span>
            <small>Fácil acesso</small>
          </div>
        </div>
        <div class="float-chip chip-2">
          <div class="chip-ico">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9z"/></svg>
          </div>
          <div>
            <span>Acolhimento</span>
            <small>Você no centro de tudo</small>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="hero-badge stagger">
        <span class="stars">★★★★★</span> 5,0 · 18 avaliações no Google
      </div>
      <h1 class="stagger">Onde o seu <em>melhor sorriso</em><br>é a nossa prioridade.</h1>
      <p class="lead stagger">
        Na <strong>AJ Odontologia</strong>, transformamos a ida ao dentista em uma experiência leve,
        acolhedora e humana. Cuidado completo para toda a família, no coração de Sobral.
      </p>
      <div class="hero-actions stagger">
        <a class="btn btn-primary" href="https://wa.me/5588992199494?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20na%20AJ%20Odontologia%20%F0%9F%98%8A" target="_blank" rel="noopener">
          Agendar pelo WhatsApp
        </a>
        <a class="btn btn-outline" href="#especialidades">Conhecer especialidades</a>
      </div>
      <div class="hero-info stagger">
        <div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          <span id="statusBadge" class="status">Carregando…</span>
        </div>
        <div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>
          R. Padre Fialho, 334 — Centro, Sobral/CE
        </div>
      </div>
    </div>
  </div>
</section>

<section class="especialidades" id="especialidades">
  <div class="container">
    <div class="section-head stagger">
      <span class="eyebrow">Nossas especialidades</span>
      <h2>Cuidado completo<br>para todo sorriso.</h2>
      <p>Todas as especialidades em um só lugar, com tecnologia e carinho em cada etapa do seu tratamento.</p>
    </div>
    <div class="cards">
      <div class="card stagger">
        <div class="card-bg"></div>
        <div class="card-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a7 7 0 0 0-7 7c0 3 1.5 4.5 2 7 .3 1.6.5 5 2 5s1.2-4 3-4 1.5 4 3 4 1.7-3.4 2-5c.5-2.5 2-4 2-7a7 7 0 0 0-7-7z"/></svg></div>
        <h3>Prevenção</h3>
        <p>Limpezas, profilaxia e acompanhamento regular para manter sua saúde bucal sempre em dia.</p>
      </div>
      <div class="card stagger">
        <div class="card-bg"></div>
        <div class="card-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/></svg></div>
        <h3>Restauração</h3>
        <p>Restaurações estéticas e duradouras que devolvem a função e a naturalidade dos seus dentes.</p>
      </div>
      <div class="card stagger">
        <div class="card-bg"></div>
        <div class="card-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2 4.5 13.5H11L9.5 22 19 9.5h-6.5L13 2z"/></svg></div>
        <h3>Laserterapia</h3>
        <p>Tratamentos modernos com laser: menos desconforto, cicatrização mais rápida e precisão.</p>
      </div>
      <div class="card stagger">
        <div class="card-bg"></div>
        <div class="card-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v18M5 8l7-5 7 5M5 16l7 5 7-5"/></svg></div>
        <h3>Cirurgia</h3>
        <p>Extrações e cirurgias realizadas com segurança, técnica apurada e máximo conforto.</p>
      </div>
      <div class="card stagger">
        <div class="card-bg"></div>
        <div class="card-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="9" width="18" height="6" rx="3"/><circle cx="8" cy="12" r="1.6"/><circle cx="16" cy="12" r="1.6"/></svg></div>
        <h3>Aparelho</h3>
        <p>Ortodontia para alinhar seu sorriso, com plano de tratamento individualizado.</p>
      </div>
      <div class="card stagger">
        <div class="card-bg"></div>
        <div class="card-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 3h6M10 3v5c0 4-3 5-3 9a4 4 0 0 0 4 4h2a4 4 0 0 0 4-4c0-4-3-5-3-9V3"/></svg></div>
        <h3>Estomatologia</h3>
        <p>Diagnóstico e cuidado completo com a saúde da mucosa bucal e tecidos da boca.</p>
      </div>
    </div>
  </div>
</section>

<!-- CONHEÇA-NOS -->
<section class="conheca-nos" id="conheca-nos">
  <div class="container">
    <div class="section-head stagger">
      <span class="eyebrow">Conheça-nos</span>
      <h2>Saiba um pouco sobre quem somos</h2>
      <p>Veja um pouco sobre quem faz de tudo por sua saúde e seu sorriso!</p>
    </div>
    <div class="carousel-wrapper stagger">
      <div class="carousel-track">
        <img src="image/SaveClip.App_763756537_17937966765331154_8414444695235830421_n.jpg" alt="Clínica AJ Odontologia">
        <img src="image/SaveClip.App_763449941_17937966738331154_5648389458013580248_n.jpg" alt="Clínica AJ Odontologia">
        <img src="image/SaveClip.App_763309076_17937966747331154_7462369708818189673_n.jpg" alt="Clínica AJ Odontologia">
        <img src="image/SaveClip.App_763263304_17937966756331154_3457204639430442722_n.jpg" alt="Clínica AJ Odontologia">
        <img src="image/SaveClip.App_762769281_17937966774331154_5089662643182822006_n.jpg" alt="Clínica AJ Odontologia">
        <!-- Duplicado para loop infinito -->
        <img src="image/SaveClip.App_763756537_17937966765331154_8414444695235830421_n.jpg" alt="Clínica AJ Odontologia">
        <img src="image/SaveClip.App_763449941_17937966738331154_5648389458013580248_n.jpg" alt="Clínica AJ Odontologia">
        <img src="image/SaveClip.App_763309076_17937966747331154_7462369708818189673_n.jpg" alt="Clínica AJ Odontologia">
        <img src="image/SaveClip.App_763263304_17937966756331154_3457204639430442722_n.jpg" alt="Clínica AJ Odontologia">
        <img src="image/SaveClip.App_762769281_17937966774331154_5089662643182822006_n.jpg" alt="Clínica AJ Odontologia">
      </div>
    </div>
  </div>
</section>

<section class="sobre" id="sobre">
  <div class="container sobre-grid">
    <figure class="sobre-img stagger">
      <img src="image/FOTO HERO.png" alt="Clínica odontológica aconchegante">
    </figure>
    <div class="sobre-content">
      <span class="eyebrow stagger">A clínica</span>
      <h2 class="stagger">Um lugar para se sentir <em style="color:var(--amber)">em casa</em>.</h2>
      <p class="stagger">
        A AJ Odontologia nasceu com um propósito simples: transformar a ida ao dentista em uma
        experiência leve e acolhedora. Cada detalhe do nosso espaço foi pensado para que você
        se sinta confortável, desde a recepção até o final do tratamento.
      </p>
      <p class="stagger">
        Aqui, você é ouvido antes de tudo. Explicamos cada etapa, respeitamos o seu tempo e
        construímos juntos o plano de tratamento ideal para o seu sorriso.
      </p>
      <ul class="pillars stagger">
        <li><span class="check">✓</span> Atendimento humanizado e individualizado</li>
        <li><span class="check">✓</span> Estrutura moderna e ambiente acolhedor</li>
        <li><span class="check">✓</span> Equipe qualificada em todas as especialidades</li>
        <li><span class="check">✓</span> Localização privilegiada no Centro de Sobral</li>
      </ul>
      <a class="btn btn-primary stagger" href="https://wa.me/5588992199494?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20%F0%9F%98%8A" target="_blank" rel="noopener">Vamos conversar</a>
    </div>
  </div>
</section>

<section class="depoimentos" id="depoimentos">
  <div class="container">
    <div class="section-head stagger">
      <span class="eyebrow">Avaliações</span>
      <h2>O que dizem sobre nós</h2>
      <p>Nota 5,0 no Google — fruto de um cuidado que vai além do sorriso.</p>
    </div>
    <div class="depo-grid">
      <div class="depo stagger">
        <div class="stars-quote">★★★★★</div>
        <p>"Ótimos profissionais e um ambiente muito agradável e acolhedor"</p>
        <div class="who"><div class="avatar">A</div><div><b>Cliente AJ</b><span>Avaliação no Google</span></div></div>
        <div class="deco-quote"></div>
      </div>
      <div class="depo stagger">
        <div class="stars-quote">★★★★★</div>
        <p>"Atendimento impecável e o resultado do tratamento foi maravilhoso!"</p>
        <div class="who"><div class="avatar">C</div><div><b>Cliente AJ</b><span>Avaliação no Google</span></div></div>
        <div class="deco-quote"></div>
      </div>
      <div class="depo stagger">
        <div class="stars-quote">★★★★★</div>
        <p>"Dra Anne e Dra Juliana são muito responsáveis e o ambiente bastante acolhedor!"</p>
        <div class="who"><div class="avatar">D</div><div><b>Cliente AJ</b><span>Avaliação no Google</span></div></div>
        <div class="deco-quote"></div>
      </div>
    </div>
  </div>
</section>

<section class="contato" id="contato">
  <div class="container">
    <div class="section-head stagger">
      <span class="eyebrow">Fale conosco</span>
      <h2>Agende sua avaliação</h2>
      <p>Envie sua mensagem e nossa equipe responde o mais breve possível.</p>
    </div>
    <div class="contato-grid">
      <div class="info-card stagger">
        <div class="info-item">
          <div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
          <div><b>Endereço</b><p>R. Padre Fialho, 334 — Centro<br>Sobral — CE, CEP 62010-330</p></div>
        </div>
        <div class="info-item">
          <div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg></div>
          <div><b>WhatsApp</b><p><a href="tel:+5588992199494" style="color:#ffe3a8">(88) 99219-9494</a></p></div>
        </div>
        <div class="info-item">
          <div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="4"/><path d="m2 7 10 6 10-6"/></svg></div>
          <div><b>Instagram</b><p><a href="https://instagram.com/aj.odontologiasobral" target="_blank" rel="noopener" style="color:#ffe3a8">@aj.odontologiasobral</a></p></div>
        </div>
        <div class="info-item">
          <div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></div>
          <div style="flex:1"><b>Horário de funcionamento</b>
            <table class="hours-table" id="hoursTable">
              <tr data-day="1"><td>Segunda-feira</td><td>08:00 – 18:00</td></tr>
              <tr data-day="2"><td>Terça-feira</td><td>08:00 – 18:00</td></tr>
              <tr data-day="3"><td>Quarta-feira</td><td>08:00 – 18:00</td></tr>
              <tr data-day="4"><td>Quinta-feira</td><td>08:00 – 18:00</td></tr>
              <tr data-day="5"><td>Sexta-feira</td><td>08:00 – 18:00</td></tr>
              <tr data-day="6"><td>Sábado</td><td>Fechado</td></tr>
              <tr data-day="0"><td>Domingo</td><td>Fechado</td></tr>
            </table>
          </div>
        </div>
      </div>

      <form class="form-card stagger" id="contactForm">
        <h3>Envie sua mensagem</h3>
        <p>Preencha os campos e envie direto pelo WhatsApp da clínica.</p>
        <div class="field-row">
          <div class="field">
            <label for="nome">Seu nome *</label>
            <input type="text" id="nome" name="nome" placeholder="Como podemos te chamar?" required>
          </div>
          <div class="field">
            <label for="tel">Seu telefone *</label>
            <input type="tel" id="tel" name="tel" placeholder="(88) 9 9999-9999" required>
          </div>
        </div>
        <div class="field">
          <label for="esp">Especialidade de interesse</label>
          <select id="esp" name="esp">
            <option>Avaliação geral</option>
            <option>Prevenção / Limpeza</option>
            <option>Restauração</option>
            <option>Laserterapia</option>
            <option>Cirurgia</option>
            <option>Aparelho (Ortodontia)</option>
            <option>Estomatologia</option>
          </select>
        </div>
        <div class="field">
          <label for="msg">Mensagem</label>
          <textarea id="msg" name="msg" rows="3" placeholder="Conte pra gente como podemos ajudar :)" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center">
          Enviar pelo WhatsApp
        </button>
        <p class="form-note">Ao enviar, você será direcionado ao WhatsApp com sua mensagem pronta.</p>
      </form>
    </div>
  </div>
</section>

<footer>
  <div class="container foot-grid">
    <div>
      <a href="#inicio" class="logo" style="margin-bottom:1rem;gap:.6rem">
        <img class="logo-img" src="image/Design sem nome (10).png" alt="Logo AJ Odontologia" style="width:40px;height:40px;filter:none;object-fit:cover;border-radius:10px" onerror="this.style.display='none';">
        <div class="logo-text">
          <strong style="color:#fff">AJ Odontologia</strong>
          <span style="color:#cbbbaa">Sobral · CE</span>
        </div>
      </a>
      <p style="font-size:.87rem;max-width:24rem;margin-top:.8rem;color:#cbbbaa">
        Aliando saúde e beleza ao seu sorriso. Clínica odontológica e estética no Centro de Sobral, com atendimento acolhedor e todas as especialidades.
      </p>
    </div>
    <div>
      <h4>Navegação</h4>
      <ul class="foot-links">
        <li><a href="#inicio">Início</a></li>
        <li><a href="#especialidades">Especialidades</a></li>
        <li><a href="#sobre">A Clínica</a></li>
        <li><a href="#contato">Contato</a></li>
      </ul>
    </div>
    <div>
      <h4>Contato</h4>
      <ul class="foot-links">
        <li>R. Padre Fialho, 334 — Centro</li>
        <li>Sobral — CE, 62010-330</li>
        <li><a href="tel:+5588992199494" style="color:#ffe3a8">(88) 99219-9494</a></li>
        <li><a href="https://instagram.com/aj.odontologiasobral" target="_blank" rel="noopener" style="color:#ffe3a8">@aj.odontologiasobral</a></li>
      </ul>
    </div>
  </div>
  <div class="foot-bottom">
    © <span id="year"></span> AJ Odontologia — Todos os direitos reservados · Sobral, Ceará
  </div>
</footer>

<a class="wa-float" href="https://wa.me/5588992199494?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20na%20AJ%20Odontologia%20%F0%9F%98%8A" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">
  <svg viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.8 14.03c-.25.7-1.45 1.33-2.02 1.42-.52.08-1.17.11-1.89-.12-.44-.14-1-.32-1.72-.63-3.02-1.3-4.99-4.35-5.14-4.55-.15-.2-1.23-1.64-1.23-3.12 0-1.49.78-2.22 1.06-2.52.28-.3.6-.38.8-.38.2 0 .4 0 .58.01.19.01.44-.07.68.52.25.6.85 2.07.92 2.22.08.15.13.33.02.53-.1.2-.15.32-.3.5-.15.17-.31.39-.45.52-.15.15-.3.31-.13.61.17.3.75 1.24 1.61 2.01 1.11.99 2.04 1.3 2.34 1.45.3.15.47.13.65-.08.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.28.1 1.75.83 2.05.98.3.15.5.22.57.35.08.13.08.73-.17 1.42z"/></svg>
</a>
`;

  // Injeta o HTML no body
  document.body.innerHTML = html;

  // --------------------------------------------------------------------------
  // 3) JavaScript de funcionamento
  // --------------------------------------------------------------------------

  document.getElementById('year').textContent = new Date().getFullYear();

  const header = document.getElementById('header');
  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 10));

  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileMenu.classList.toggle('show');
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('show');
  }));

  // cursor personalizado
  const cursor = document.querySelector('.cursor');
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  document.addEventListener('mousedown', () => cursor.style.transform = 'translate(-50%,-50%) scale(.85)');
  document.addEventListener('mouseup', () => cursor.style.transform = 'translate(-50%,-50%) scale(1)');
  document.querySelectorAll('a,button,.btn,input,select,textarea,.card,.depo').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
  });

  // reveal no scroll (stagger simples)
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal,.stagger').forEach(el => io.observe(el));

  // status aberto/fechado
  const OPEN_H = 8, CLOSE_H = 18;
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;
  const isWorkday = day >= 1 && day <= 5;
  const isOpen = isWorkday && hour >= OPEN_H && hour < CLOSE_H;
  const badge = document.getElementById('statusBadge');
  const names = ['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado'];
  if (isOpen) {
    badge.textContent = 'Aberto agora · até às 18:00';
    badge.classList.add('open');
  } else {
    let label;
    if (isWorkday && hour < OPEN_H) label = 'Abre hoje às 08:00';
    else {
      let nextDay = (day + 1) % 7;
      while (!(nextDay >= 1 && nextDay <= 5)) nextDay = (nextDay + 1) % 7;
      label = 'Abre ' + (nextDay === (day + 1) % 7 ? 'amanhã' : names[nextDay]) + ' às 08:00';
    }
    badge.textContent = 'Fechado agora · ' + label;
    badge.classList.add('closed');
  }
  const todayRow = document.querySelector('#hoursTable tr[data-day="' + day + '"]');
  if (todayRow) todayRow.classList.add('today');

  // formulário -> WhatsApp
  // formulário -> Supabase + WhatsApp
  document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const btnOriginalText = btn.textContent;
    btn.textContent = 'Enviando…';
    btn.disabled = true;

    const nome = document.getElementById('nome').value.trim();
    const tel  = document.getElementById('tel').value.trim();
    const esp  = document.getElementById('esp').value;
    const msg  = document.getElementById('msg').value.trim();

    try {
      // Aguardar o Supabase client estar disponível
      await new Promise(resolve => {
        const check = () => {
          if (window.supabaseClient) resolve();
          else setTimeout(check, 50);
        };
        check();
      });

      const supabase = window.supabaseClient.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);

      // Salvar no Supabase
      const { error } = await supabase
        .from('contatos')
        .insert([{ nome, telefone: tel, especialidade: esp, mensagem: msg }]);

      if (error) throw error;

      // Enviar pelo WhatsApp
      let text = 'Olá! Me chamo *' + nome + '* 😊\n'
               + '📞 Telefone: ' + tel + '\n'
               + '🦷 Interesse: ' + esp;
      if (msg) text += '\n💬 ' + msg;
      text += '\n\n(Vim pelo site da AJ Odontologia)';
      window.open('https://wa.me/5588992199494?text=' + encodeURIComponent(text), '_blank');

      // Sucesso
      document.getElementById('contactForm').reset();
      btn.textContent = 'Enviado com sucesso!';
      setTimeout(() => { btn.textContent = btnOriginalText; btn.disabled = false; }, 2000);

    } catch (err) {
      console.error('Erro Supabase:', err);
      btn.textContent = 'Erro ao salvar';
      setTimeout(() => { btn.textContent = btnOriginalText; btn.disabled = false; }, 2000);

      // Mesmo com erro, ainda tenta WhatsApp
      let text = 'Olá! Me chamo *' + nome + '* 😊\n'
               + '📞 Telefone: ' + tel + '\n'
               + '🦷 Interesse: ' + esp;
      if (msg) text += '\n💬 ' + msg;
      text += '\n\n(Vim pelo site da AJ Odontologia)';
      window.open('https://wa.me/5588992199494?text=' + encodeURIComponent(text), '_blank');
    }
  });

})();
