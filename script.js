/* ═══════════════════════════════════════════════════
   KARMACORE | Micael San - Scripts
   ═══════════════════════════════════════════════════ */

// ── Theme toggle ──
(function() {
    var saved = localStorage.getItem('karmacore-theme');
    if (saved === 'light') {
        document.body.classList.add('light');
    }
})();

function toggleTheme() {
    var body = document.body;
    var isLight = body.classList.toggle('light');
    localStorage.setItem('karmacore-theme', isLight ? 'light' : 'dark');

    var moonIcon = document.querySelector('.icon-moon');
    var sunIcon = document.querySelector('.icon-sun');
    if (moonIcon && sunIcon) {
        moonIcon.style.display = isLight ? 'none' : 'block';
        sunIcon.style.display = isLight ? 'block' : 'none';
    }
}

// Fix icon visibility on load
document.addEventListener('DOMContentLoaded', function() {
    var isLight = document.body.classList.contains('light');
    var moonIcon = document.querySelector('.icon-moon');
    var sunIcon = document.querySelector('.icon-sun');
    if (moonIcon && sunIcon) {
        moonIcon.style.display = isLight ? 'none' : 'block';
        sunIcon.style.display = isLight ? 'block' : 'none';
    }
});

// ── Matrix Rain ──
(function() {
    var canvas = document.getElementById('matrix');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var width, height, drops;
    var chars = "01アイウエオカキクケコ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var fontSize = 14;

    function init() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        var columns = Math.floor(width / fontSize);
        drops = new Array(columns).fill(1);
    }

    function draw() {
        ctx.fillStyle = 'rgba(5,5,15,0.06)';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = 'rgba(0, 240, 255, 0.9)';
        ctx.font = fontSize + 'px monospace';
        for (var i = 0; i < drops.length; i++) {
            var text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }

    init();
    window.addEventListener('resize', init);
    setInterval(draw, 50);
})();

// ── Mobile burger ──
function toggleBurger() {
    var burger = document.getElementById('burger');
    var menu = document.getElementById('mobile-menu');
    if (!burger || !menu) return;

    var isOpen = menu.classList.contains('open');
    if (isOpen) {
        menu.classList.remove('open');
        burger.classList.remove('open');
    } else {
        menu.classList.add('open');
        burger.classList.add('open');
    }
}

function closeBurger() {
    var burger = document.getElementById('burger');
    var menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.remove('open');
    if (burger) burger.classList.remove('open');
}

// ── Search / Filter ──
(function() {
    var input = document.getElementById('search');
    if (!input) return;

    input.addEventListener('input', function() {
        var term = this.value.toLowerCase().trim();
        var folders = document.querySelectorAll('#main-content > .folder');
        var hasResults = false;

        for (var i = 0; i < folders.length; i++) {
            var text = folders[i].textContent.toLowerCase();
            var match = term === '' || text.indexOf(term) !== -1;
            folders[i].style.display = match ? '' : 'none';
            if (match) hasResults = true;
        }

        var noResults = document.getElementById('no-results');
        var searchTermSpan = document.getElementById('search-term');
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
    var content = header.nextElementSibling;
    if (!content) return;
    header.classList.toggle('active');
    content.classList.toggle('open');
    var icon = header.querySelector('.toggle-icon');
    if (icon) icon.textContent = content.classList.contains('open') ? '−' : '+';
}

// ── Title glitch effect ──
function triggerGlitch(el) {
    el.style.animation = 'none';
    el.offsetHeight;
    el.style.animation = '';
}

// ── PIX copy ──
function copyPix() {
    var pixEl = document.getElementById('pix-key');
    var btn = document.getElementById('copy-btn');
    var copyIcon = document.getElementById('copy-icon');
    var checkIcon = document.getElementById('check-icon');
    if (!pixEl || !btn) return;

    var key = pixEl.getAttribute('data-pix') || pixEl.textContent.trim();
    if (!key) return;

    var done = function() {
        if (copyIcon) copyIcon.style.display = 'none';
        if (checkIcon) checkIcon.style.display = 'block';
        btn.style.color = '#00ff88';
        btn.style.borderColor = 'rgba(0, 255, 136, 0.5)';
        setTimeout(function() {
            if (copyIcon) copyIcon.style.display = 'block';
            if (checkIcon) checkIcon.style.display = 'none';
            btn.style.color = '';
            btn.style.borderColor = '';
        }, 2200);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(key).then(done).catch(function() {
            var ta = document.createElement('textarea');
            ta.value = key;
            ta.style.position = 'fixed';
            ta.style.left = '-9999px';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            done();
        });
    } else {
        var ta = document.createElement('textarea');
        ta.value = key;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        done();
    }
}

// ── Modal ──
function openModal() {
    var modal = document.getElementById('modal');
    if (!modal) return;
    modal.style.display = 'flex';
    setTimeout(function() {
        modal.querySelector('.modal-content').classList.add('show');
    }, 10);
}

function closeModal() {
    var modal = document.getElementById('modal');
    if (!modal) return;
    var content = modal.querySelector('.modal-content');
    content.classList.remove('show');
    setTimeout(function() { modal.style.display = 'none'; }, 400);
}

// ── ESC to close ──
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        var modal = document.getElementById('modal');
        if (modal && modal.style.display === 'flex') {
            closeModal();
            return;
        }
        closeBurger();
    }
});

// ── Active nav on scroll ──
(function() {
    var sections = document.querySelectorAll('.section[id]');
    var navLinks = document.querySelectorAll('.nav-link[data-section]');

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting) {
                    var id = entries[i].target.id;
                    for (var j = 0; j < navLinks.length; j++) {
                        if (navLinks[j].getAttribute('data-section') === id) {
                            navLinks[j].classList.add('active');
                        } else {
                            navLinks[j].classList.remove('active');
                        }
                    }
                }
            }
        }, { threshold: 0.3 });

        for (var i = 0; i < sections.length; i++) {
            observer.observe(sections[i]);
        }
    }
})();

// ── On load ──
document.addEventListener('DOMContentLoaded', function() {
    var mainHeader = document.querySelector('#main-folder .folder-header');
    if (mainHeader) {
        mainHeader.classList.add('active');
        var mainContent = document.getElementById('main-content');
        if (mainContent) mainContent.classList.add('open');
        var icon = mainHeader.querySelector('.toggle-icon');
        if (icon) icon.textContent = '−';
    }
});
