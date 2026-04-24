/* ═══════════════════════════════════════════════════
   KARMACORE | Micael San - Scripts
   ═══════════════════════════════════════════════════ */

// ── Matrix Rain ──
(function initMatrix() {
    const canvas = document.getElementById('matrix');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height, drops;

    const chars = "01アイウエオカキクケコ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 14;

    function init() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        const columns = Math.floor(width / fontSize);
        drops = new Array(columns).fill(1);
    }

    function draw() {
        ctx.fillStyle = 'rgba(5,5,15,0.06)';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = 'rgba(0, 240, 255, 0.9)';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }

    init();
    window.addEventListener('resize', init);
    setInterval(draw, 50);
})();

// ── Search / Filter ──
(function initSearch() {
    const input = document.getElementById('search');
    if (!input) return;

    input.addEventListener('input', function() {
        const term = this.value.toLowerCase().trim();
        const subFolders = document.querySelectorAll('#main-content > .folder');
        let hasResults = false;

        subFolders.forEach(folder => {
            const text = folder.textContent.toLowerCase();
            const match = term === '' || text.includes(term);
            folder.style.display = match ? '' : 'none';
            if (match) hasResults = true;
        });

        const noResults = document.getElementById('no-results');
        const searchTermSpan = document.getElementById('search-term');
        if (noResults && searchTermSpan) {
            if (term !== '' && !hasResults) {
                noResults.style.display = 'block';
                searchTermSpan.textContent = term;
            } else {
                noResults.style.display = 'none';
            }
        }
    });
})();

// ── Folder toggle ──
function toggleFolder(header) {
    const content = header.nextElementSibling;
    if (!content) return;
    header.classList.toggle('active');
    content.classList.toggle('open');
    const icon = header.querySelector('.toggle-icon');
    if (icon) icon.textContent = content.classList.contains('open') ? '−' : '+';
}

// ── Title glitch effect ──
function triggerGlitch(el) {
    el.style.animation = 'none';
    el.offsetHeight; // force reflow
    el.style.animation = '';
}

// ── PIX copy ──
function copyPix() {
    const key = document.getElementById('pix-key')?.textContent || '';
    const btn = document.getElementById('copy-btn');
    if (!key || !btn) return;

    navigator.clipboard.writeText(key).then(() => {
        btn.textContent = '✅';
        btn.style.color = '#00ff88';
        setTimeout(() => { btn.textContent = '📋'; btn.style.color = ''; }, 2000);
    }).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = key;
        ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        btn.textContent = '✅';
        setTimeout(() => { btn.textContent = '📋'; }, 2000);
    });
}

// ── Modal ──
function openModal() {
    const modal = document.getElementById('modal');
    if (!modal) return;
    modal.style.display = 'flex';
    requestAnimationFrame(() => {
        modal.querySelector('.modal-content').classList.add('show');
    });
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (!modal) return;
    const content = modal.querySelector('.modal-content');
    content.classList.remove('show');
    setTimeout(() => { modal.style.display = 'none'; }, 400);
}

// ── Keyboard shortcuts ──
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('modal');
        if (modal?.style.display === 'flex') closeModal();
    }
});

// ── Active nav on scroll ──
(function initActiveNav() {
    const sections = document.querySelectorAll('.section[id]');
    const navDots = document.querySelectorAll('.nav-dot');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navDots.forEach(dot => dot.classList.remove('active'));
                const activeDot = document.querySelector(`.nav-dot[href="#${entry.target.id}"]`);
                if (activeDot) activeDot.classList.add('active');
            }
        });
    }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });

    sections.forEach(section => observer.observe(section));
})();

// ── On load ──
document.addEventListener('DOMContentLoaded', () => {
    // Open main folder by default
    const mainHeader = document.querySelector('#main-folder .folder-header');
    if (mainHeader) {
        mainHeader.classList.add('active');
        document.getElementById('main-content')?.classList.add('open');
        const icon = mainHeader.querySelector('.toggle-icon');
        if (icon) icon.textContent = '−';
    }

    // Scroll reveal
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });

    document.querySelectorAll('.section').forEach((section, i) => {
        section.style.transitionDelay = `${i * 0.05}s`;
        revealObserver.observe(section);
    });
});
