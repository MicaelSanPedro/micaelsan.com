/* ═══════════════════════════════════════════════════
   KARMACORE | Micael San - Scripts v3
   ═══════════════════════════════════════════════════ */

// ── Theme toggle ──
(function() {
    var saved;
    try { saved = localStorage.getItem('karmacore-theme'); } catch(e) {}
    if (saved === 'light') {
        document.documentElement.classList.add('light');
    }
    var isLight = document.documentElement.classList.contains('light');
    var moonIcon = document.querySelector('.icon-moon');
    var sunIcon = document.querySelector('.icon-sun');
    if (moonIcon) moonIcon.style.display = isLight ? 'none' : '';
    if (sunIcon) sunIcon.style.display = isLight ? '' : 'none';
})();

function toggleTheme() {
    var html = document.documentElement;
    var isLight = html.classList.toggle('light');
    try { localStorage.setItem('karmacore-theme', isLight ? 'light' : 'dark'); } catch(e) {}
    var moonIcon = document.querySelector('.icon-moon');
    var sunIcon = document.querySelector('.icon-sun');
    if (moonIcon) moonIcon.style.display = isLight ? 'none' : '';
    if (sunIcon) sunIcon.style.display = isLight ? '' : 'none';
}

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

// ── Orb parallax on mouse move ──
(function() {
    var orbs = document.querySelectorAll('.orb');
    if (!orbs.length) return;

    var ticking = false;
    document.addEventListener('mousemove', function(e) {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function() {
            var cx = (e.clientX / window.innerWidth - 0.5) * 2;
            var cy = (e.clientY / window.innerHeight - 0.5) * 2;

            orbs[0].style.transform = 'translate(' + (cx * 20) + 'px, ' + (cy * 15) + 'px)';
            orbs[1].style.transform = 'translate(' + (cx * -15) + 'px, ' + (cy * -20) + 'px)';
            orbs[2].style.transform = 'translate(' + (cx * 25) + 'px, ' + (cy * -10) + 'px)';
            if (orbs[3]) orbs[3].style.transform = 'translate(' + (cx * -18) + 'px, ' + (cy * 12) + 'px)';
            ticking = false;
        });
    });
})();

// ── 3D Tilt on glass cards ──
(function() {
    var cards = document.querySelectorAll('.about-card, .project-card, .contact-card, .dl-card');
    for (var i = 0; i < cards.length; i++) {
        (function(card) {
            card.addEventListener('mousemove', function(e) {
                var rect = card.getBoundingClientRect();
                var x = (e.clientX - rect.left) / rect.width;
                var y = (e.clientY - rect.top) / rect.height;
                var tiltX = (y - 0.5) * 6;
                var tiltY = (x - 0.5) * -6;
                card.style.transform = 'perspective(800px) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg) translateY(-5px)';
            });
            card.addEventListener('mouseleave', function() {
                card.style.transform = '';
            });
        })(cards[i]);
    }
})();

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
    if (icon) icon.textContent = content.classList.contains('open') ? '\u2212' : '+';
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
        btn.style.color = '#34d399';
        btn.style.borderColor = 'rgba(52, 211, 153, 0.3)';
        setTimeout(function() {
            if (copyIcon) copyIcon.style.display = 'block';
            if (checkIcon) checkIcon.style.display = 'none';
            btn.style.color = '';
            btn.style.borderColor = '';
        }, 2200);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(key).then(done).catch(function() {
            fallbackCopy(key, done);
        });
    } else {
        fallbackCopy(key, done);
    }
}
function fallbackCopy(text, done) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;left:-9999px;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    done();
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

// ── Scroll reveal with stagger ──
(function() {
    var els = document.querySelectorAll('.section, .hero');
    for (var i = 0; i < els.length; i++) {
        els[i].style.opacity = '0';
        els[i].style.transform = 'translateY(30px)';
        els[i].style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    var idx = 0;
    var obs = new IntersectionObserver(function(entries) {
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting) {
                var el = entries[i].target;
                var delay = idx * 80;
                setTimeout(function() {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, delay);
                idx++;
                obs.unobserve(el);
            }
        }
    }, { threshold: 0.05 });
    for (var i = 0; i < els.length; i++) {
        obs.observe(els[i]);
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
        if (icon) icon.textContent = '\u2212';
    }
});
