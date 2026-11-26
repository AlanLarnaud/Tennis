const LOGO='https://cdn.helloasso.com/img/logos/croppedimage-933d0d8c54f546e0b662b43e590a60e6.png?height=140&img_format=webp&quality=80&resize=fill&width=140';
const defaultData={club:{name:'Tennis Meilleraie Tillay',short:'TMT',town:'La Meilleraie-Tillay (85700)',email:'tennismeilleraietillay85@gmail.com',helloasso:'https://www.helloasso.com/associations/tennis-meilleraie-tillay/evenements/licences-2026-2027',description:'Un club convivial pour découvrir, pratiquer et partager le tennis, en loisir comme en compétition.'},news:[{date:'2026-11-26',title:'Bienvenue sur le nouveau site du TMT',text:'Retrouvez ici les actualités, les équipes, les événements et les photos du club.',image:'',category:'Vie du club'}],teams:[{name:'Seniors 1',division:'Pré-régionale',group:'Poule A',gender:'Masculine'},{name:'Seniors 2',division:'2e division',group:'Poule A',gender:'Masculine'},{name:'Seniors 3',division:'4e division',group:'Poule B',gender:'Masculine'},{name:'Féminines 1',division:'2e division',group:'Poule A',gender:'Féminine'},{name:'Féminines 2',division:'2e division',group:'Poule B',gender:'Féminine'}],matches:[],photos:[]};
async function getData(){try{const r=await fetch('data.json?'+Date.now());if(r.ok)return {...defaultData,...await r.json()}}catch(e){}return defaultData}
function nav(){const current=location.pathname.split('/').pop()||'index.html';const items=[['index.html','Accueil'],['club.html','Le club'],['equipes.html','Équipes'],['galerie.html','Galerie'],['actualites.html','Actualités'],['inscriptions.html','Inscriptions'],['contact.html','Contact']];document.getElementById('site-header').innerHTML=`<div class="topbar"><div class="wrap"><span>🎾 Tennis · Convivialité · Compétition</span><span>La Meilleraie-Tillay · Vendée</span></div></div><header class="header"><div class="wrap nav"><a class="brand" href="index.html"><img src="${LOGO}" alt="Logo TMT"><span>TENNIS MEILLERAIE TILLAY<small>LE CLUB · TMT</small></span></a><button class="menu-btn" aria-label="Ouvrir le menu" onclick="document.querySelector('.links').classList.toggle('open')">☰</button><nav class="links">${items.map(([url,label])=>`<a class="${current===url?'active':''}" href="${url}">${label}</a>`).join('')}<a href="admin/">Admin ↗</a></nav></div></header>`;document.getElementById('site-footer').innerHTML=`<footer class="footer"><div class="wrap"><div class="footer-grid"><div><img class="footer-logo" src="${LOGO}" alt="Logo TMT"><h3 style="margin-top:15px">Tennis Meilleraie Tillay</h3><p>Le plaisir du tennis, ensemble.</p></div><div><h3>Navigation</h3><p><a href="club.html">Le club</a><br><a href="equipes.html">Équipes et compétitions</a><br><a href="galerie.html">Galerie photos</a><br><a href="actualites.html">Actualités</a></p></div><div><h3>Nous contacter</h3><p>${(window.TMT_DATA?.club?.town||defaultData.club.town)}<br><a href="mailto:${window.TMT_DATA?.club?.email||defaultData.club.email}">${window.TMT_DATA?.club?.email||defaultData.club.email}</a></p><a href="inscriptions.html">Inscriptions et tarifs →</a></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Tennis Meilleraie Tillay</span><a href="admin/">Administration du site</a></div></div></footer>`}

function setupPWA(){
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    const swPath = location.pathname.includes('/Tennis/') ? '/Tennis/sw.js' : 'sw.js';
    navigator.serviceWorker.register(swPath).catch(err => console.warn('PWA service worker:', err));
  }
  if (!document.getElementById('tmt-install-bar')) {
    const bar=document.createElement('div'); bar.id='tmt-install-bar'; bar.className='tmt-install-bar';
    bar.innerHTML='<span>📲 Installer l’application TMT</span><button type="button" id="tmt-install-button">Installer</button><button type="button" class="tmt-install-close" aria-label="Fermer">×</button>';
    document.body.appendChild(bar);
    let promptEvent=null;
    const btn=bar.querySelector('#tmt-install-button');
    window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();promptEvent=e;bar.classList.add('visible')});
    btn.addEventListener('click',async()=>{
      if(promptEvent){promptEvent.prompt();await promptEvent.userChoice;promptEvent=null;bar.classList.remove('visible')}
      else {alert('Sur iPhone : ouvrez le menu Partager de Safari puis choisissez « Sur l’écran d’accueil ». Sur Android : utilisez le menu du navigateur puis « Installer l’application ».')}
    });
    bar.querySelector('.tmt-install-close').addEventListener('click',()=>bar.classList.remove('visible'));
    if(/iphone|ipad|ipod/i.test(navigator.userAgent) && !window.navigator.standalone){bar.classList.add('visible');btn.textContent='Comment faire ?'}
  }
  if(!document.querySelector('.tmt-mobile-nav')){
    const nav=document.createElement('nav');nav.className='tmt-mobile-nav';nav.setAttribute('aria-label','Navigation rapide');
    nav.innerHTML='<a href="index.html">⌂<span>Accueil</span></a><a href="equipes.html">🎾<span>Équipes</span></a><a href="actualites.html">📰<span>Actus</span></a><a href="contact.html">✉<span>Contact</span></a>';
    document.body.appendChild(nav);
  }
}

function fmt(d){if(!d)return '';return new Date(d+'T12:00:00').toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'})}
function newsCards(data,limit=20){return (data.news||[]).slice(0,limit).map(n=>`<article class="news-card">${n.image?`<img src="${n.image}" alt="">`:''}<div class="body"><span class="date">${fmt(n.date)} · ${n.category||'Actualité'}</span><h3 style="margin-top:10px">${esc(n.title)}</h3><p>${esc(n.text)}</p></div></article>`).join('')||'<p class="small">Aucune actualité publiée pour le moment.</p>'}
function esc(s=''){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function initPage(){const page=document.body.dataset.page;getData().then(data=>{window.TMT_DATA=data;nav();setupPWA();if(page==='home'){document.getElementById('latest-news').innerHTML=newsCards(data,2);document.getElementById('home-teams').innerHTML=(data.teams||[]).slice(0,3).map(t=>`<div class="card"><span class="pill">${esc(t.gender)}</span><h3 style="margin-top:14px">${esc(t.name)}</h3><p>${esc(t.division)} · ${esc(t.group)}</p></div>`).join('')}
if(page==='news')document.getElementById('news-list').innerHTML=newsCards(data);
if(page==='teams'){document.getElementById('team-list').innerHTML=(data.teams||[]).map(t=>`<div class="card"><span class="pill">${esc(t.gender)}</span><h3 style="margin-top:12px">${esc(t.name)}</h3><p>${esc(t.division)} · ${esc(t.group)}</p></div>`).join('');document.getElementById('match-list').innerHTML=(data.matches||[]).length?[...(data.matches||[])].sort((a,b)=>(a.date||'').localeCompare(b.date||'')).map(m=>`<tr><td>${fmt(m.date)}</td><td>${esc(m.team)}</td><td>${esc(m.opponent)}</td><td>${esc(m.location||'À préciser')}</td><td>${esc(m.result||'À venir')}</td></tr>`).join(''):'<tr><td colspan="5">Le calendrier sera complété au fil de la saison.</td></tr>'}
if(page==='gallery')document.getElementById('photo-list').innerHTML=(data.photos||[]).map(p=>`<div class="photo"><img src="${p.src}" alt="${esc(p.caption||'Photo du club')}"></div>`).join('')||'<p class="small">Les photos du club seront bientôt disponibles.</p>';
if(page==='club'){document.getElementById('club-description').textContent=data.club.description;document.getElementById('club-town').textContent=data.club.town}
if(page==='contact'){document.getElementById('contact-email').textContent=data.club.email;document.getElementById('contact-email').href='mailto:'+data.club.email}
if(page==='registration')document.getElementById('helloasso').href=data.club.helloasso||defaultData.club.helloasso;
});}
