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

// ── Navbar scroll effect ──
(function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    }, { passive: true });
})();

// ── Mobile menu toggle ──
let menuOpen = false;
function toggleMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobile = document.getElementById('nav-mobile');
    if (!hamburger || !mobile) return;

    menuOpen = !menuOpen;
    hamburger.classList.toggle('active', menuOpen);
    mobile.classList.toggle('open', menuOpen);

    // Prevent body scroll when menu is open
    document.body.style.overflow = menuOpen ? 'hidden' : '';
}
function closeMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobile = document.getElementById('nav-mobile');
    if (!hamburger || !mobile) return;

    menuOpen = false;
    hamburger.classList.remove('active');
    mobile.classList.remove('open');
    document.body.style.overflow = '';
}

// ── Search toggle ──
let searchOpen = false;
function toggleSearch() {
    const searchContainer = document.getElementById('nav-search');
    const searchBox = document.getElementById('nav-search-box');
    const input = document.getElementById('search');
    if (!searchContainer) return;

    searchOpen = !searchOpen;
    searchContainer.classList.toggle('active', searchOpen);

    const openIcon = searchContainer.querySelector('.search-open-icon');
    const closeIcon = searchContainer.querySelector('.search-close-icon');
    if (openIcon && closeIcon) {
        openIcon.style.display = searchOpen ? 'none' : '';
        closeIcon.style.display = searchOpen ? '' : 'none';
    }

    if (searchOpen && input) {
        setTimeout(() => input.focus(), 150);
    }
}

// ── Search / Filter ──
(function initSearch() {
    const input = document.getElementById('search');
    if (!input) return;

    input.addEventListener('input', function() {
        const term = this.value.toLowerCase().trim();

        // Filter download folders
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

// ── Scroll to top ──
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

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
    const pixEl = document.getElementById('pix-key');
    const btn = document.getElementById('copy-btn');
    const copyIcon = document.getElementById('copy-icon');
    const checkIcon = document.getElementById('check-icon');
    if (!pixEl || !btn) return;

    const key = pixEl.getAttribute('data-pix') || pixEl.textContent.trim();
    if (!key) return;

    const showCopied = () => {
        if (copyIcon) copyIcon.style.display = 'none';
        if (checkIcon) checkIcon.style.display = 'block';
        btn.style.color = '#00ff88';
        btn.style.borderColor = 'rgba(0, 255, 136, 0.5)';
        btn.style.boxShadow = '0 0 16px rgba(0, 255, 136, 0.3)';
        setTimeout(() => {
            if (copyIcon) copyIcon.style.display = 'block';
            if (checkIcon) checkIcon.style.display = 'none';
            btn.style.color = '';
            btn.style.borderColor = '';
            btn.style.boxShadow = '';
        }, 2200);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(key).then(showCopied).catch(() => {
            const ta = document.createElement('textarea');
            ta.value = key;
            ta.style.cssText = 'position:fixed;left:-9999px;opacity:0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            showCopied();
        });
    } else {
        const ta = document.createElement('textarea');
        ta.value = key;
        ta.style.cssText = 'position:fixed;left:-9999px;opacity:0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showCopied();
    }
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
    // ESC to close modal, search, or mobile menu
    if (e.key === 'Escape') {
        const modal = document.getElementById('modal');
        if (modal?.style.display === 'flex') {
            closeModal();
            return;
        }
        if (searchOpen) {
            toggleSearch();
            return;
        }
        if (menuOpen) {
            closeMenu();
            return;
        }
    }

    // Ctrl/Cmd + K to open search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearch();
    }
});

// ── Active nav on scroll ──
(function initActiveNav() {
    const sections = document.querySelectorAll('.section[id]');
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    const mobileLinks = document.querySelectorAll('.nav-mobile-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;

                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('data-section') === id);
                });
                mobileLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    link.classList.toggle('active', href === `#${id}`);
                });
            }
        });
    }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });

    sections.forEach(section => observer.observe(section));
})();

// ── Close menu on resize to desktop ──
(function initResizeWatcher() {
    let prevWidth = window.innerWidth;
    window.addEventListener('resize', () => {
        const currentWidth = window.innerWidth;
        // Went from mobile to desktop
        if (prevWidth <= 768 && currentWidth > 768) {
            closeMenu();
            if (searchOpen) toggleSearch();
        }
        prevWidth = currentWidth;
    }, { passive: true });
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
