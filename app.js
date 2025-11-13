// Team Titans - Vanilla JS routing and interactions
(function(){
  const routes = {
    home: renderHome,
    about: renderAbout,
    gallery: renderGallery,
    challenges: renderChallenges,
    team: renderTeam,
    contact: renderContact
  };

  // DOM refs
  const app = document.getElementById('spa-root');
  const nav = document.getElementById('nav-links');
  const menuBtn = document.getElementById('menu-btn');

  // Starfield generation
  function initStars(){
    const wrap = document.querySelector('.starfield');
    if(!wrap) return;
    const count = 140;
    wrap.innerHTML = '';
    const w = window.innerWidth, h = window.innerHeight;
    for(let i=0;i<count;i++){
      const s = document.createElement('div');
      s.className = 'star';
      const x = Math.random()*w;
      const y = Math.random()*h;
      const size = Math.random()>0.85 ? 3 : 2;
      const dur = 4 + Math.random()*6;
      s.style.left = x+'px';
      s.style.top = y+'px';
      s.style.width = s.style.height = size+'px';
      s.style.opacity = .4 + Math.random()*0.6;
      s.animate([{opacity: .3},{opacity: .9},{opacity:.3}],{duration: dur*1000, iterations: Infinity});
      wrap.appendChild(s);
    }
  }
  window.addEventListener('resize', initStars);

  // Router
  function navigate(hash){
    const key = (hash || location.hash || '#home').replace('#','');
    const route = routes[key] ? key : 'home';
    if(nav){
      [...nav.querySelectorAll('a')].forEach(a=>{
        if(a.getAttribute('href') === '#'+route){ a.classList.add('active'); } else { a.classList.remove('active'); }
      });
    }
    app.innerHTML = routes[route]();
    bindForm();
    if(menuBtn && nav) nav.classList.remove('open');
    window.scrollTo({top:0, behavior:'smooth'});
  }
  window.addEventListener('hashchange', ()=>navigate());

  // Mobile menu
  if(menuBtn){
    menuBtn.addEventListener('click', ()=> nav.classList.toggle('open'));
  }

  // Page renderers
  function renderHome(){
    return `
      <section class="hero">
        <div class="container hero-grid">
          <div>
            <span class="kicker">ISRO Rover Challenge</span>
            <h1>Team Titans — Building Rovers for the Final Frontier</h1>
            <p>We are a student-driven technical team pioneering planetary rover design, simulation, and field testing to compete in the ISRO Rover Challenge every year.</p>
            <div class="hero-cta">
              <a class="btn" href="#challenges">View Current Challenges</a>
              <a class="btn ghost" href="#about">Learn About Us</a>
            </div>
          </div>
          <div class="card tile">
            <h3 class="mt-0" style="color:var(--gold)">
              <img src="/public/logo.svg" alt="Team Titans Logo" style="height:28px; vertical-align:middle; margin-right:8px"> This Season's Focus
            </h3>
            <p>Autonomous navigation, robust suspension, modular science payloads, and mission-ready software stack.</p>
            <div class="mt-16 banner">We are recruiting new members this year. Complete posted challenges to apply for domains like Mechanical, Electronics, Software, Science, and Operations.</div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <h2>Our Proud Partners</h2>
          <p class="sub">Grateful for the organizations fueling our journey.</p>
          <div class="partners">
            <div class="partner"><img src="/public/logo.svg" alt="Partner Logo" style="height:24px"></div>
            <div class="partner">Partner Logo</div>
            <div class="partner">Partner Logo</div>
            <div class="partner">Partner Logo</div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <h2>Past Achievements</h2>
          <p class="sub">Milestones from previous Rover Challenge seasons.</p>
          <div class="achievements">
            <div class="item card">
              <h3>Top 10 Finalists</h3>
              <p>Secured a place among top teams with our 6-wheel rocker-bogie rover.</p>
            </div>
            <div class="item card">
              <h3>Best Science Plan</h3>
              <p>Awarded for a comprehensive in-situ analysis methodology.</p>
            </div>
            <div class="item card">
              <h3>Innovation Spotlight</h3>
              <p>Recognized for novel wheel design improving traction on loose regolith.</p>
            </div>
            <div class="item card">
              <h3>Community Outreach</h3>
              <p>Conducted workshops inspiring 500+ students in space robotics.</p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderAbout(){
    return `
      <section class="section">
        <div class="container">
          <h2>About Team Titans</h2>
          <p class="sub">A multidisciplinary crew united by curiosity and grit.</p>
          <div class="grid">
            <div class="card tile">
              <h3>Mission</h3>
              <p>Design, build, and test planetary rovers that can autonomously navigate and conduct science in harsh extraterrestrial environments.</p>
            </div>
            <div class="card tile">
              <h3>Domains</h3>
              <p>Mechanical systems, power and electronics, autonomy and software, communications, and science operations.</p>
            </div>
            <div class="card tile">
              <h3>Culture</h3>
              <p>We value problem-solving, craftsmanship, and teamwork. We learn by doing and iterate fast.</p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderGallery(){
    return `
      <section class="section">
        <div class="container">
          <h2>Gallery</h2>
          <p class="sub">Glimpses of our builds, tests, and competitions.</p>
          <div class="gallery-grid">
            ${Array.from({length:9}).map((_,i)=>`<img alt="Gallery Image ${i+1}" src="https://images.unsplash.com/photo-1716114543498-092396aee71e?ixid=M3w3OTkxMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjMwMjk2MjJ8&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80">`).join('')}
          </div>
        </div>
      </section>
    `;
  }

  function renderChallenges(){
    const challenges = [
      {title:'Software: Autonomous Navigation', desc:'Implement A* path planning over a grid with obstacles. Bonus: integrate PID for speed control.', link:'https://gist.github.com/'},
      {title:'Mechanical: Suspension Redesign', desc:'Draft a rocker-bogie variant improving obstacle traversal at 20% higher clearance. Submit CAD + brief.', link:'#'},
      {title:'Electronics: Power Budget', desc:'Create a power distribution plan for 6 motors, sensors, and compute. Include schematics.', link:'#'},
      {title:'Science: Sample Collection', desc:'Propose a reliable regolith sampling mechanism and testing plan.', link:'#'},
      {title:'Ops: Field Test Plan', desc:'Design a test campaign with milestones, risk matrix, and logistics.', link:'#'}
    ];

    return `
      <section class="section">
        <div class="container">
          <h2>Challenges</h2>
          <p class="sub">We are recruiting through domain-specific challenges. Submit your solutions via the contact form below.</p>
          <div class="grid">
            ${challenges.map(c=>`
              <div class="card tile">
                <h3 style="color:var(--gold)">${c.title}</h3>
                <p>${c.desc}</p>
                <div class="mt-16"><a class="btn ghost" href="${c.link}" target="_blank">View Details</a></div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  function renderTeam(){
    const members = [
      {name:'Aarav Shah', role:'Captain — Mechanical'},
      {name:'Isha Rao', role:'Vice Captain — Software'},
      {name:'Kabir Mehta', role:'Electronics Lead'},
      {name:'Sara Khan', role:'Science Lead'},
      {name:'Rohan Gupta', role:'Operations Lead'},
      {name:'You?', role:'Join us by completing challenges!'}
    ];

    return `
      <section class="section">
        <div class="container">
          <h2>Our Team</h2>
          <p class="sub">A tight-knit crew building beyond boundaries.</p>
          <div class="grid">
            ${members.map(m=>`
              <div class="card tile">
                <h3>${m.name}</h3>
                <p>${m.role}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  function renderContact(){
    return `
      <section class="section">
        <div class="container">
          <h2>Contact Us</h2>
          <p class="sub">Reach out to partner with us or submit your challenge solutions.</p>
          <form id="contact-form" class="card tile" onsubmit="return false;">
            <div class="form-row">
              <input class="input" type="text" name="name" placeholder="Your Name" required>
              <input class="input" type="email" name="email" placeholder="Email" required>
            </div>
            <div class="form-row mt-12">
              <input class="input" type="text" name="subject" placeholder="Subject" required>
              <input class="input" type="text" name="domain" placeholder="Domain (Mechanical / Electronics / Software / Science / Ops)">
            </div>
            <textarea class="textarea mt-12" name="message" placeholder="Your message or solution link" required></textarea>
            <div class="mt-16">
              <button class="btn" type="submit">Send</button>
              <span id="form-status" class="mt-8" style="margin-left:10px; color:var(--muted)"></span>
            </div>
          </form>
        </div>
      </section>
    `;
  }

  // Simple form handling (stores to localStorage for demo)
  function bindForm(){
    const form = document.getElementById('contact-form');
    if(!form) return;
    const status = document.getElementById('form-status');
    form.addEventListener('submit', ()=>{
      const data = Object.fromEntries(new FormData(form).entries());
      const key = 'tt-contact-' + Date.now();
      localStorage.setItem(key, JSON.stringify(data));
      status.textContent = 'Submitted! We will get back soon.';
      form.reset();
    });
  }

  // Boot
  function boot(){
    initStars();
    navigate();
  }
  window.addEventListener('load', boot);
})();
