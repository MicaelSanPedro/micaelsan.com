/* ═══════════════════════════════════════════════════
   KARMACORE — Scripts v4 (NOVA)
   ═══════════════════════════════════════════════════ */

// ── Theme ──
(function() {
    try {
        if (localStorage.getItem('kc-theme') === 'light') document.documentElement.classList.add('light');
    } catch(e) {}
    updateIcons();
})();

function updateIcons() {
    var light = document.documentElement.classList.contains('light');
    var m = document.querySelector('.icon-moon');
    var s = document.querySelector('.icon-sun');
    if (m) m.style.display = light ? 'none' : '';
    if (s) s.style.display = light ? '' : 'none';
}

function toggleTheme() {
    document.documentElement.classList.toggle('light');
    try { localStorage.setItem('kc-theme', document.documentElement.classList.contains('light') ? 'light' : 'dark'); } catch(e) {}
    updateIcons();
}

// ── Burger ──
function toggleBurger() {
    var b = document.getElementById('burger');
    var n = document.getElementById('mobile-nav');
    if (!b || !n) return;
    b.classList.toggle('active');
    n.classList.toggle('open');
}
function closeBurger() {
    var b = document.getElementById('burger');
    var n = document.getElementById('mobile-nav');
    if (b) b.classList.remove('active');
    if (n) n.classList.remove('open');
}

// ── Scroll progress bar ──
(function() {
    var bar = document.getElementById('scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', function() {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        var pct = h > 0 ? (window.scrollY / h) * 100 : 0;
        bar.style.width = pct + '%';
    }, { passive: true });
})();

// ── Reveal on scroll ──
(function() {
    var els = document.querySelectorAll('.reveal, .reveal-card');
    for (var i = 0; i < els.length; i++) {
        els[i].style.opacity = '0';
        els[i].style.transform = 'translateY(32px)';
        els[i].style.transition = 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)';
    }
    var delay = 0;
    var obs = new IntersectionObserver(function(entries) {
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting) {
                var el = entries[i].target;
                var d = delay;
                delay += 60;
                setTimeout(function() {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, d);
                obs.unobserve(el);
            }
        }
    }, { threshold: 0.06 });
    for (var i = 0; i < els.length; i++) obs.observe(els[i]);
})();

// ── Animated counters ──
(function() {
    var counters = document.querySelectorAll('[data-count]');
    var animated = false;
    var obs = new IntersectionObserver(function(entries) {
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting && !animated) {
                animated = true;
                for (var j = 0; j < counters.length; j++) {
                    animateCount(counters[j]);
                }
            }
        }
    }, { threshold: 0.5 });
    for (var i = 0; i < counters.length; i++) obs.observe(counters[i]);

    function animateCount(el) {
        var target = parseInt(el.getAttribute('data-count'));
        var current = 0;
        var step = Math.max(1, Math.ceil(target / 30));
        var interval = setInterval(function() {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(interval);
            }
            el.textContent = current + '+';
        }, 50);
    }
})();

// ── Active nav on scroll ──
(function() {
    var sections = document.querySelectorAll('.section[id]');
    var links = document.querySelectorAll('.nav-links a[data-section]');
    if ('IntersectionObserver' in window) {
        var obs = new IntersectionObserver(function(entries) {
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting) {
                    var id = entries[i].target.id;
                    for (var j = 0; j < links.length; j++) {
                        links[j].classList.toggle('active', links[j].getAttribute('data-section') === id);
                    }
                }
            }
        }, { threshold: 0.3 });
        for (var i = 0; i < sections.length; i++) obs.observe(sections[i]);
    }
})();

// ── PIX copy ──
function copyPix() {
    var el = document.getElementById('pix-key');
    var btn = document.getElementById('copy-btn');
    if (!el || !btn) return;
    var key = el.getAttribute('data-pix') || el.textContent.trim();
    var copyIco = document.getElementById('copy-icon');
    var checkIco = document.getElementById('check-icon');
    function done() {
        if (copyIco) copyIco.style.display = 'none';
        if (checkIco) checkIco.style.display = '';
        btn.style.color = '#a3e635';
        btn.style.borderColor = 'rgba(163,230,53,0.3)';
        setTimeout(function() {
            if (copyIco) copyIco.style.display = '';
            if (checkIco) checkIco.style.display = 'none';
            btn.style.color = '';
            btn.style.borderColor = '';
        }, 2000);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(key).then(done).catch(function() { fbCopy(key, done); });
    } else { fbCopy(key, done); }
}
function fbCopy(text, cb) {
    var t = document.createElement('textarea');
    t.value = text; t.style.cssText = 'position:fixed;left:-9999px;opacity:0';
    document.body.appendChild(t); t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
    cb();
}

// ── Modal ──
function openModal() {
    var m = document.getElementById('modal');
    if (!m) return;
    m.style.display = 'flex';
    requestAnimationFrame(function() {
        document.getElementById('modal-box').classList.add('open');
    });
}
function closeModal() {
    var box = document.getElementById('modal-box');
    var m = document.getElementById('modal');
    if (box) box.classList.remove('open');
    setTimeout(function() { if (m) m.style.display = 'none'; }, 350);
}

// ── ESC ──
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        var m = document.getElementById('modal');
        if (m && m.style.display === 'flex') { closeModal(); return; }
        closeBurger();
    }
});

// ── Downloads page: Search ──
(function() {
    var input = document.getElementById('search');
    if (!input) return;
    input.addEventListener('input', function() {
        var term = this.value.toLowerCase().trim();
        var folders = document.querySelectorAll('#main-content > .folder');
        var found = false;
        for (var i = 0; i < folders.length; i++) {
            var match = !term || folders[i].textContent.toLowerCase().indexOf(term) !== -1;
            folders[i].style.display = match ? '' : 'none';
            if (match) found = true;
        }
        var nr = document.getElementById('no-results');
        var st = document.getElementById('search-term');
        if (nr && st) {
            nr.style.display = (!term || found) ? 'none' : 'block';
            st.textContent = term;
        }
    });
})();

// ── Downloads page: Folder toggle ──
function toggleFolder(header) {
    var content = header.nextElementSibling;
    if (!content) return;
    header.classList.toggle('active');
    content.classList.toggle('open');
    var icon = header.querySelector('.toggle-icon');
    if (icon) icon.textContent = content.classList.contains('open') ? '\u2212' : '+';
}

// ── Downloads page: Auto-open main folder ──
document.addEventListener('DOMContentLoaded', function() {
    var h = document.querySelector('#main-folder .folder-header');
    if (h) {
        h.classList.add('active');
        var c = document.getElementById('main-content');
        if (c) c.classList.add('open');
        var ico = h.querySelector('.toggle-icon');
        if (ico) ico.textContent = '\u2212';
    }
});
