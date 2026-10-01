import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import {
  ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, ChevronDown,
  CircleArrowUpRight, Disc3, Instagram, MapPin, Menu, MessageCircle,
  Music2, Plus, ShoppingBag, Ticket, UsersRound, X,
} from 'lucide-react';
import { SITE, type View } from './content';

const pageNames: Record<View, string> = {
  inicio: 'INICIO', ediciones: 'EDICIONES', colaboraciones: 'COLABORACIONES',
  sumate: 'TRABAJÁ CON NOSOTROS', tienda: 'TIENDA', entradas: 'ENTRADAS', galeria: 'GALERÍA',
};

function initialView(): View {
  const hash = window.location.hash.replace('#/', '').split('?')[0] as View;
  return hash in pageNames ? hash : 'inicio';
}

function App() {
  const [view, setView] = useState<View>(initialView);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navOpen, setNavOpen] = useState<'ediciones' | 'sumate' | null>(null);
  const [toast, setToast] = useState('');
  const [formKind, setFormKind] = useState<'rrpp' | 'dj'>('rrpp');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const friendsRef = useRef<HTMLDivElement>(null);

  const navigate = (next: View, kind?: 'rrpp' | 'dj') => {
    if (kind) setFormKind(kind);
    setMobileOpen(false);
    setNavOpen(null);
    window.location.hash = `/${next}`;
    setView(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  useEffect(() => {
    const onHash = () => { setView(initialView()); setMobileOpen(false); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(''), 5500);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const openWhatsapp = (link: string) => {
    if (!link) { setToast('Estamos preparando el enlace de este grupo.'); return; }
    window.open(link, '_blank', 'noopener,noreferrer');
  };
  const showPlaceholder = () => setToast('Esta sección estará disponible próximamente.');
  const openTickets = () => {
    if (SITE.edition.salesEnabled && SITE.edition.salesUrl) {
      window.open(SITE.edition.salesUrl, '_blank', 'noopener,noreferrer');
    } else navigate('entradas');
  };

  const brand = <button className="brand" onClick={() => navigate('inicio')} aria-label="Ir al inicio">
    <span>OTRA<span className="brand-dot">.</span>NOCHE<sup>®</sup></span>
    <small>BUENOS AIRES, ARGENTINA</small>
  </button>;

  return <>
    <div className="announcement">
      <span className="announce-issue">// ON — PRÓXIMAS FECHAS</span>
      <button onClick={openTickets} className="announce-center"><span className="pulse"/> ENTRADAS <b>·</b> CONOCÉ LA PRÓXIMA EDICIÓN <ArrowUpRight size={15}/></button>
      <span className="announce-side">BUENOS AIRES — AR</span>
    </div>
    <header className="header">
      <div className="page-container header-inner">
        {brand}
        <nav aria-label="Navegación principal" className="desktop-nav">
          <div className="nav-dropdown-wrap" onMouseLeave={() => setNavOpen(null)}>
            <button className={`nav-link ${view === 'ediciones' || view === 'galeria' ? 'selected' : ''}`} onClick={() => setNavOpen(navOpen === 'ediciones' ? null : 'ediciones')} aria-expanded={navOpen === 'ediciones'}>EDICIONES <ChevronDown size={13}/></button>
            {navOpen === 'ediciones' && <div className="dropdown">
              <button onClick={() => navigate('ediciones')}>TODAS LAS EDICIONES <ArrowUpRight size={15}/></button>
              <button onClick={() => navigate('galeria')}>FOTOS Y RECUERDOS <ArrowUpRight size={15}/></button>
            </div>}
          </div>
          <button className={`nav-link ${view === 'colaboraciones' ? 'selected' : ''}`} onClick={() => navigate('colaboraciones')}>COLABORACIONES</button>
          <div className="nav-dropdown-wrap" onMouseLeave={() => setNavOpen(null)}>
            <button className={`nav-link ${view === 'sumate' ? 'selected' : ''}`} onClick={() => setNavOpen(navOpen === 'sumate' ? null : 'sumate')} aria-expanded={navOpen === 'sumate'}>SUMATE <ChevronDown size={13}/></button>
            {navOpen === 'sumate' && <div className="dropdown">
              <button onClick={() => navigate('sumate', 'rrpp')}>TRABAJÁ COMO RRPP <ArrowUpRight size={15}/></button>
              <button onClick={() => navigate('sumate', 'dj')}>POSTULATE COMO DJ <ArrowUpRight size={15}/></button>
            </div>}
          </div>
          <button className={`nav-link ${view === 'tienda' ? 'selected' : ''}`} onClick={() => navigate('tienda')}>TIENDA <ShoppingBag size={15}/></button>
        </nav>
        <div className="header-right">
          <button className="ticket-outline" onClick={openTickets}>ENTRADAS <ArrowUpRight size={15}/></button>
          <button className="mobile-menu-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={mobileOpen}>{mobileOpen ? <X/> : <Menu/>}</button>
        </div>
      </div>
      {mobileOpen && <nav className="mobile-nav" aria-label="Navegación móvil">
        {([['inicio', 'INICIO'], ['ediciones', 'EDICIONES'], ['galeria', 'GALERÍA'], ['colaboraciones', 'COLABORACIONES'], ['sumate', 'TRABAJÁ CON NOSOTROS'], ['tienda', 'TIENDA'], ['entradas', 'ENTRADAS']] as const).map(([key, label]) => <button key={key} onClick={() => navigate(key)}>{label}<ArrowUpRight size={18}/></button>)}
      </nav>}
    </header>

    <main>
      {view === 'inicio' && <>
        <section className="hero page-container" aria-labelledby="hero-title">
          <div className="hero-story" style={{ backgroundImage: `linear-gradient(180deg,rgba(0,0,0,.12) 0%,rgba(0,0,0,.13) 34%,rgba(0,0,0,.8) 100%),url('${SITE.media.main}')` }}>
            <div className="hero-upper"><span className="eyebrow white-line">// CULTURA NOCTURNA</span><span className="small-frame">B.A. / ARG</span></div>
            <div className="hero-copy">
              <p className="hero-intro">NO ES SOLO UNA FIESTA.</p>
              <h1 id="hero-title">ES OTRA<br/><span>NOCHE<span className="period">.</span></span></h1>
              <p className="hero-description">Nos une la música. Nos encuentra la noche.<br/>Una experiencia que construimos entre todos.</p>
              <button className="button white-button" onClick={() => navigate('ediciones')}>CONOCÉ OTRA NOCHE <ArrowUpRight size={18}/></button>
            </div>
            <span className="hero-side-caption">SOUND / PEOPLE / CULTURE © 2026</span>
          </div>
          <div className="hero-edition">
            <div className="edition-head"><span>// EDICIÓN {SITE.edition.editionNumber}</span><CircleArrowUpRight size={29} strokeWidth={1.4}/></div>
            <div className="edition-center">
              <span className="eyebrow">LA PRÓXIMA EXPERIENCIA</span>
              <div className="date-big"><span>{SITE.edition.day}</span><strong>{SITE.edition.month}</strong></div>
              <div className="date-year">{SITE.edition.year}</div>
              <div className="edition-rule"/>
              <h2>LO QUE VIENE<br/>SE VIVE.</h2>
              <p>Pronto compartimos todos los detalles de nuestra próxima edición.</p>
            </div>
            <button className="edition-bottom" onClick={openTickets}><span>INFORMACIÓN Y ENTRADAS</span><span className="circle-icon"><ArrowUpRight size={21}/></span></button>
          </div>
        </section>

        <section className="collab-strip" aria-label="Espacio de colaboraciones">
          <div className="page-container strip-container"><span className="strip-label">// FORMAMOS PARTE<br/>DE ALGO MÁS GRANDE</span><div className="brand-track">{SITE.collaborations.map((item, i) => <div className="brand-placeholder" key={i}><strong>{item.name}</strong><small>{item.category}</small></div>)}</div></div>
        </section>

        <section className="identity-section page-container" id="nosotros">
          <div className="section-tag">01 / QUIÉNES SOMOS</div>
          <div className="identity-grid"><div><h2 className="display-title">OTRA<br/><span className="accent">FORMA</span><br/>DE VIVIR<br/>LA NOCHE<span className="accent">.</span></h2></div><div className="identity-right"><p>CREAMOS ENCUENTROS QUE <em>SE SIENTEN</em>, NO SOLO SE RECUERDAN.</p><div className="identity-rule"/><p className="body-muted">Otra Noche nace en Buenos Aires para conectar personas, artistas y escenas. Cada edición es una oportunidad para compartir música, experiencias e ideas nuevas.</p><button onClick={() => navigate('ediciones')} className="text-arrow">NUESTRA HISTORIA <ArrowUpRight size={19}/></button><div className="identity-outline">O/N<span>®</span></div></div></div>
        </section>

        <section className="upcoming-section">
          <div className="page-container">
            <SectionHeader index="02" kicker="ANOTÁ LA FECHA" title={<>LA PRÓXIMA <span className="accent">NOCHE.</span></>} action={<button className="text-arrow dark" onClick={openTickets}>VER ENTRADAS <ArrowUpRight size={18}/></button>}/>
            <div className="feature-event"><div className="event-photo" style={{backgroundImage:`linear-gradient(0deg,rgba(0,0,0,.67),transparent 50%),url('${SITE.media.crowd}')`}}><span className="image-watermark">02</span><span className="event-photo-label">OTRA NOCHE — EDICIÓN 02</span></div><div className="event-info"><span className="red-tag">PRÓXIMAMENTE</span><div className="event-display">{SITE.edition.day}<span>{SITE.edition.month}<br/>{SITE.edition.year}</span></div><h3>{SITE.edition.name}</h3><p>{SITE.edition.subtitle}</p><div className="event-meta"><span><MapPin size={16}/>{SITE.edition.venue}</span><span><CalendarDays size={16}/>{SITE.edition.dateNeedsConfirmation ? 'FECHA SUJETA A CONFIRMACIÓN' : SITE.edition.time}</span></div><button className="button black-button" onClick={openTickets}>MÁS INFORMACIÓN <ArrowUpRight size={18}/></button></div></div>
          </div>
        </section>

        <section className="join-section page-container">
          <SectionHeader index="03" kicker="CONVOCATORIA ABIERTA" title={<>LA NOCHE LA <span className="accent">HACEMOS TODOS.</span></>}/>
          <div className="join-grid">
            <button className="join-card rrpp-card" onClick={() => navigate('sumate','rrpp')}><div className="join-card-top"><span>01 / REPRESENTÁ LA FIESTA</span><UsersRound size={29} strokeWidth={1.4}/></div><div className="join-card-bottom"><p>¿TENÉS GANAS DE SER PARTE?</p><h3>SUMATE<br/>COMO <i>RRPP.</i></h3><span>UN EQUIPO, TU CÓDIGO Y COMISIONES POR VENTA.</span></div><span className="join-arrow"><ArrowUpRight size={24}/></span></button>
            <button className="join-card dj-card" onClick={() => navigate('sumate','dj')}><div className="join-card-top"><span>02 / COMPARTÍ TU SONIDO</span><Disc3 size={29} strokeWidth={1.4}/></div><div className="join-card-bottom"><p>QUEREMOS CONOCERTE.</p><h3>¿SOS DJ?<br/><i>POSTULATE.</i></h3><span>MANDANOS TU PROPUESTA PARA PRÓXIMAS FECHAS.</span></div><span className="join-arrow"><ArrowUpRight size={24}/></span></button>
          </div>
        </section>

        <section className="friends-section">
          <div className="page-container">
            <SectionHeader index="04" kicker="LA ESCENA NOS CONECTA" title={<>FIESTAS <span className="accent">AMIGAS.</span></>} action={<div className="slider-buttons"><button aria-label="Anterior" onClick={() => friendsRef.current?.scrollBy({left:-360,behavior:'smooth'})}><ArrowLeft size={20}/></button><button aria-label="Siguiente" onClick={() => friendsRef.current?.scrollBy({left:360,behavior:'smooth'})}><ArrowRight size={20}/></button></div>}/>
            <p className="friends-lead">Compartimos la pasión por la música con otras productoras. Acá vas a encontrar sus próximas fiestas cuando estén confirmadas.</p>
            <div className="friends-slider" ref={friendsRef}>{SITE.friendlyParties.map((party, i) => <article className={`friend-card friend-${i % 4}`} key={party.name}>
              {party.image && <img src={party.image} alt="" loading="lazy"/>}
              <div className="friend-card-top"><span>ON / 0{i+1}</span><ArrowUpRight size={23}/></div>
              <div className="friend-card-bottom"><small>{party.category}</small><h3>{party.name}</h3><p>{party.text}</p><span className="friend-status">PRÓXIMAMENTE <span>↗</span></span></div>
            </article>)}</div>
          </div>
        </section>

        <section className="gallery-section page-container">
          <SectionHeader index="05" kicker="LOS MOMENTOS QUEDAN" title={<>YA LO <span className="accent">VIVIMOS.</span></>} action={<button className="text-arrow" onClick={() => navigate('galeria')}>VER GALERÍA <ArrowUpRight size={18}/></button>}/>
          <div className="gallery-grid"><div className="gallery-large"><span className="gallery-mark">ON / ARCHIVO</span><div><small>ARCHIVO FOTOGRÁFICO</small><h3>PRIMERA<br/>EDICIÓN.</h3><p>ESPACIO RESERVADO PARA TUS FOTOS REALES.</p></div><span className="gallery-number">01</span></div><div className="gallery-smalls"><div className="gallery-small red-gallery"><span>02 /</span><strong>DETRÁS DE<br/>LA NOCHE.</strong><small>PRÓXIMAMENTE</small></div><div className="gallery-small"><span>03 /</span><strong>NUESTROS<br/>RECUERDOS.</strong><small>GALERÍA EN PREPARACIÓN</small></div></div></div>
        </section>

        <section className="whatsapp-section page-container"><div className="whatsapp-intro"><span className="section-tag">06 / SEGUIMOS CONECTADOS</span><h2>QUE NO TE<br/>LO <span className="accent">CUENTEN.</span></h2><p>Enterate antes que nadie de lo que viene y encontrate con la comunidad de Otra Noche.</p></div><div className="whatsapp-links"><button onClick={() => openWhatsapp(SITE.whatsapp.announcements)}><div><MessageCircle size={25}/><span><strong>CANAL DE NOVEDADES</strong><small>ANUNCIOS, ENTRADAS Y PRÓXIMAS FECHAS</small></span></div><ArrowUpRight/></button><button onClick={() => openWhatsapp(SITE.whatsapp.community)}><div><UsersRound size={25}/><span><strong>COMUNIDAD OFICIAL</strong><small>SEGUIMOS LA FIESTA POR WHATSAPP</small></span></div><ArrowUpRight/></button></div></section>
      </>}
      {view === 'entradas' && <InteriorLayout number="01" kicker="PRÓXIMA FECHA" heading={<>TU PRÓXIMA <span className="accent">NOCHE.</span></>} description="La información de cada edición y sus entradas va a estar disponible acá.">
        <div className="ticket-panel"><div><span className="eyebrow">EDICIÓN {SITE.edition.editionNumber} / BUENOS AIRES</span><h2>{SITE.edition.day} {SITE.edition.month} <span>{SITE.edition.year}</span></h2><p>{SITE.edition.venue}</p><span className="neutral-tag">FECHA Y ENTRADAS PENDIENTES DE CONFIRMACIÓN</span></div><div className="ticket-graphic"><Ticket size={76} strokeWidth={1}/><span>OTRA NOCHE / {SITE.edition.editionNumber}</span></div></div><p className="page-note">La compra todavía no está habilitada. No se aceptan pagos ni se generan entradas desde esta versión.</p>
      </InteriorLayout>}
      {view === 'ediciones' && <InteriorLayout number="02" kicker="NUESTRO RECORRIDO" heading={<>CADA NOCHE,<br/><span className="accent">UNA HISTORIA.</span></>} description="Las ediciones pasadas, la próxima fecha y todo lo que está por venir.">
        <div className="edition-list"><article className="edition-row"><span>02 / PRÓXIMA</span><div><h3>SEGUNDA EDICIÓN</h3><p>Información y lugar por confirmar.</p></div><button onClick={openTickets}>CONOCER FECHA <ArrowUpRight/></button></article><article className="edition-row"><span>01 / ARCHIVO</span><div><h3>PRIMERA EDICIÓN</h3><p>Próximamente: fotografías, artistas y momentos de nuestra primera fecha.</p></div><button onClick={() => navigate('galeria')}>VER GALERÍA <ArrowUpRight/></button></article></div>
      </InteriorLayout>}
      {view === 'galeria' && <InteriorLayout number="03" kicker="ARCHIVO DE OTRA NOCHE" heading={<>FOTOS QUE <span className="accent">HABLAN.</span></>} description="Estamos preparando un archivo con material de las ediciones y colaboraciones.">
        <div className="archive-grid"><div className="archive-card"><span>ARCHIVO / 01</span><h3>PRIMERA<br/>EDICIÓN.</h3><p>FOTOS PENDIENTES</p></div><div className="archive-card archive-accent"><span>ARCHIVO / 02</span><h3>JUNTO A<br/>LA ESCENA.</h3><p>MATERIAL POR INCORPORAR</p></div></div>
      </InteriorLayout>}
      {view === 'colaboraciones' && <InteriorLayout number="04" kicker="PERSONAS QUE HACEN POSIBLE" heading={<>CRECEMOS <span className="accent">JUNTOS.</span></>} description="Compartimos ideas y escenarios con artistas, productoras y marcas que forman parte de la escena.">
        <div className="collab-list">{SITE.collaborations.slice(0,4).map((item,i) => <div key={i}><small>0{i+1} / {item.category}</small><strong>{item.name}</strong><span>ESPACIO PARA LOGOTIPO</span></div>)}</div><div className="contact-callout"><h3>¿TENÉS UNA PROPUESTA<br/>DE COLABORACIÓN?</h3><p>Estamos preparando nuestro canal de contacto institucional.</p><button className="button light-outline" onClick={showPlaceholder}>PRÓXIMAMENTE <ArrowUpRight/></button></div>
      </InteriorLayout>}
      {view === 'sumate' && <InteriorLayout number="05" kicker="CONVOCATORIA ABIERTA" heading={<>TU LUGAR EN <span className="accent">LA NOCHE.</span></>} description="Sumate al equipo de RRPP o presentanos tu propuesta musical. Queremos conocerte.">
        <div className="form-selector"><button className={formKind==='rrpp'?'active':''} onClick={()=>setFormKind('rrpp')}><UsersRound size={22}/> QUIERO SER RRPP <ArrowUpRight size={18}/></button><button className={formKind==='dj'?'active':''} onClick={()=>setFormKind('dj')}><Music2 size={22}/> QUIERO TOCAR COMO DJ <ArrowUpRight size={18}/></button></div><div className="form-layout"><div><span className="eyebrow">// {formKind === 'rrpp' ? 'PARA QUIENES HACEN CRECER LA NOCHE' : 'PARA QUIENES LA HACEN SONAR'}</span><h2>{formKind === 'rrpp' ? <>TRABAJÁ<br/>CON <span className="accent">NOSOTROS.</span></> : <>MOSTRANOS<br/>TU <span className="accent">SONIDO.</span></>}</h2><p>{formKind === 'rrpp' ? 'Una vez aprobado, cada RRPP podrá contar con un código individual. El seguimiento de ventas y las comisiones se activarán cuando esté disponible la venta oficial.' : 'Contanos quién sos, de dónde venís y compartí un enlace a tus sets o música. Revisaremos las postulaciones para futuras fechas.'}</p></div><ApplicationForm kind={formKind}/></div>
        <div className="faq"><h2>ALGUNAS PREGUNTAS.</h2>{[
          ['¿Cómo funcionan los códigos de RRPP?', 'Cada RRPP aprobado tendrá un código propio. El registro automático de compras y comisiones se habilitará junto con el sistema de venta de entradas.'],
          ['¿Necesito experiencia como RRPP?', 'No es indispensable. Queremos conocer tu propuesta y tus ganas de formar parte del equipo.'],
          ['¿Qué tengo que enviar si soy DJ?', 'Tus datos de contacto, ciudad, estilo y un enlace público a SoundCloud, YouTube u otra plataforma con tu música.'],
        ].map(([q,a],i) => <div className="faq-item" key={q}><button onClick={()=>setActiveFaq(activeFaq===i?null:i)} aria-expanded={activeFaq===i}>{q}<Plus className={activeFaq===i?'rotated':''}/></button>{activeFaq===i && <p>{a}</p>}</div>)}</div>
      </InteriorLayout>}
      {view === 'tienda' && <InteriorLayout number="06" kicker="OTRA NOCHE / WEAR" heading={<>LLEVÁ LA NOCHE <span className="accent">PUESTA.</span></>} description="Un espacio para la ropa y los objetos de Otra Noche. Primera colección en preparación.">
        <div className="shop-heading"><span>COLECCIÓN 001</span><span>PRÓXIMAMENTE / 00 PRODUCTOS DISPONIBLES</span></div><div className="shop-grid">{[['REMERA OVERSIZE','01','tee'],['BUZO OTRA NOCHE','02','hoodie'],['ACCESORIOS','03','accessory']].map(([name,number,kind])=><div className="shop-card" key={name}><div className={`shop-art ${kind}`}><span>O/N<span className="accent">.</span></span><small>DESIGN PREVIEW</small></div><div className="shop-caption"><div><small>COLLECTION / {number}</small><h3>{name}</h3></div><span>PRÓXIMAMENTE</span></div></div>)}</div>
      </InteriorLayout>}
    </main>
    <footer className="footer"><div className="page-container"><div className="footer-main"><div><p className="footer-kicker">OTRA NOCHE / BUENOS AIRES, ARGENTINA</p><h2>LA NOCHE<br/>NO <span>TERMINA.</span></h2><button onClick={() => navigate('entradas')} className="button white-button">PRÓXIMAS FECHAS <ArrowUpRight/></button></div><div className="footer-links"><div><strong>EXPLORÁ</strong><button onClick={() => navigate('inicio')}>INICIO</button><button onClick={() => navigate('ediciones')}>EDICIONES</button><button onClick={() => navigate('galeria')}>GALERÍA</button><button onClick={() => navigate('colaboraciones')}>COLABORACIONES</button></div><div><strong>SUMATE</strong><button onClick={() => navigate('sumate','rrpp')}>TRABAJÁ COMO RRPP</button><button onClick={() => navigate('sumate','dj')}>POSTULATE COMO DJ</button><button onClick={() => navigate('tienda')}>TIENDA / MERCH</button><button onClick={() => openWhatsapp(SITE.whatsapp.community)}>COMUNIDAD</button></div></div></div><div className="footer-wordmark">OTRA NOCHE<span>®</span></div><div className="footer-bottom"><span>© {new Date().getFullYear()} OTRA NOCHE. TODOS LOS DERECHOS RESERVADOS.</span><span>SITIO EN CONSTRUCCIÓN — VERSIÓN 0.1</span><button onClick={() => {if (SITE.instagramUrl) window.open(SITE.instagramUrl, '_blank', 'noopener,noreferrer');else showPlaceholder();}} aria-label="Instagram"><Instagram size={18}/></button></div></div></footer>
    {toast && <div className="toast" role="status">{toast}<button aria-label="Cerrar" onClick={()=>setToast('')}><X size={18}/></button></div>}
  </>;
}

function SectionHeader({ index, kicker, title, action }: {index:string;kicker:string;title:ReactNode;action?:ReactNode}) {
  return <div className="section-header"><div><div className="section-tag">{index} / {kicker}</div><h2>{title}</h2></div>{action && <div className="section-action">{action}</div>}</div>;
}

function InteriorLayout({ number, kicker, heading, description, children }: {number:string;kicker:string;heading:ReactNode;description:string;children:ReactNode}) {
  return <div className="interior page-container"><div className="interior-intro"><div className="section-tag">{number} / {kicker}</div><h1>{heading}</h1><p>{description}</p><span className="interior-mark">O/N — {number}</span></div><div className="interior-content">{children}</div></div>;
}

function ApplicationForm({ kind }: { kind:'rrpp' | 'dj' }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState('');
  useEffect(() => { setStatus('idle'); setMessage(''); }, [kind]);
  async function submit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus('sending');setMessage('');
    try {
      const response = await fetch('/api/applications', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(Object.fromEntries(data.entries())) });
      if (!(response.headers.get('content-type') || '').includes('application/json')) throw new Error('La recepción de postulaciones no está conectada todavía.');
      const json: {message?:string} = await response.json().catch(()=>({}));
      if(!response.ok) throw new Error(json.message || 'La recepción de formularios no está habilitada todavía.');
      setStatus('sent');setMessage('Recibimos tu postulación. Gracias por sumarte.');form.reset();
    } catch(error) {
      setStatus('error');setMessage(error instanceof Error ? error.message : 'No pudimos enviar tu postulación. Intentá nuevamente más tarde.');
    }
  }
  return <form className="application-form" onSubmit={submit}>
    <input type="hidden" name="kind" value={kind}/>
    <label className="honeypot" aria-hidden="true">Dejar vacío<input name="website" tabIndex={-1} autoComplete="off"/></label>
    <div className="input-row"><label>NOMBRE Y APELLIDO *<input name="name" maxLength={100} required placeholder="Tu nombre completo"/></label><label>CIUDAD *<input name="city" maxLength={100} required placeholder="¿De dónde sos?"/></label></div>
    <div className="input-row"><label>EMAIL *<input name="email" type="email" maxLength={180} required placeholder="tunombre@email.com"/></label><label>WHATSAPP *<input name="whatsapp" type="tel" maxLength={30} required placeholder="+54 11 ..."/></label></div>
    <label>INSTAGRAM *<input name="instagram" maxLength={160} required placeholder="@tuusuario o enlace"/></label>
    {kind==='dj' ? <><label>ESTILO MUSICAL *<input name="style" maxLength={120} required placeholder="Dubstep, psytrance, techno..."/></label><label>LINK A TU SET / MÚSICA *<input name="musicUrl" type="url" maxLength={500} required placeholder="https://soundcloud.com/..."/></label></> : <label>¿TENÉS EXPERIENCIA COMO RRPP?<select name="experience" defaultValue=""><option value="">Seleccioná una opción</option><option value="si">Sí, ya trabajé como RRPP</option><option value="no">Todavía no, quiero empezar</option></select></label>}
    <label>CONTANOS ALGO SOBRE VOS<textarea name="message" maxLength={1500} rows={4} placeholder={kind==='rrpp'?'¿Por qué querés sumarte al equipo?':'Presentate brevemente y contanos tu propuesta.'}/></label>
    <button className="button form-submit" disabled={status==='sending'||status==='sent'} type="submit">{status==='sending'?'ENVIANDO...':status==='sent'?'POSTULACIÓN RECIBIDA':'ENVIAR POSTULACIÓN'}<ArrowUpRight size={19}/></button>
    {message && <p className={`form-message ${status}`} role="status">{message}</p>}
    <p className="form-notice">Tus datos se utilizarán únicamente para responder esta postulación. Si el formulario todavía no está conectado, verás un aviso y no se guardarán tus datos.</p>
  </form>;
}

export default App;
