/* ═══════════════════════════════════════════════════
   KARMACORE | Micael San - Scripts
   ═══════════════════════════════════════════════════ */

// ── Matrix Rain ──
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
let width, height;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const chars = "01アイウエオカキクケコ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 14;
const columns = width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(5,5,15,0.08)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#00f0ff';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}
setInterval(drawMatrix, 45);

// ── Search / Filter ──
function filterSearch() {
    const term = document.getElementById('search').value.toLowerCase().trim();
    const subFolders = document.querySelectorAll('#main-content > .folder');
    let hasResults = false;

    subFolders.forEach(folder => {
        const folderText = folder.textContent.toLowerCase();
        if (term === '' || folderText.includes(term)) {
            folder.style.display = '';
            hasResults = true;
        } else {
            folder.style.display = 'none';
        }
    });

    const noResults = document.getElementById('no-results');
    const searchTermSpan = document.getElementById('search-term');

    if (term !== '' && !hasResults) {
        noResults.style.display = 'block';
        searchTermSpan.textContent = term;
    } else {
        noResults.style.display = 'none';
    }
}

document.getElementById('search').addEventListener('input', filterSearch);

// ── Folder toggle ──
function toggleFolder(header) {
    const content = header.nextElementSibling;
    header.classList.toggle('active');
    content.classList.toggle('open');
    header.querySelector('span').textContent = content.classList.contains('open') ? '−' : '+';
}

// ── Title glitch effect ──
function triggerGlitch(el) {
    el.style.animation = 'none';
    el.offsetHeight; // reflow
    el.style.animation = 'glitch 0.8s infinite linear alternate, rainbow 8s linear infinite';
}

// ── PIX copy ──
function copyPix() {
    const key = "1ad6a146-8d7e-4521-a96a-fde7ccd602ac";
    const btn = document.getElementById('copy-btn');

    navigator.clipboard.writeText(key).then(() => {
        const original = btn.innerHTML;
        btn.innerHTML = '✅';
        btn.style.color = '#00ff88';
        setTimeout(() => { btn.innerHTML = original; btn.style.color = ''; }, 1800);
    }).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = key;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
    });
}

// ── Modal ──
function openModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'flex';
    setTimeout(() => modal.querySelector('.modal-content').classList.add('show'), 10);
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.querySelector('.modal-content').classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 350);
}

// ── ESC closes modal ──
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('modal');
        if (modal.style.display === 'flex') closeModal();
    }
});

// ── On load ──
window.addEventListener('DOMContentLoaded', () => {
    // Open main folder by default
    const mainHeader = document.querySelector('#main-folder .folder-header');
    if (mainHeader) {
        mainHeader.classList.add('active');
        document.getElementById('main-content').classList.add('open');
        mainHeader.querySelector('span').textContent = '−';
    }

    // Scroll reveal animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});
