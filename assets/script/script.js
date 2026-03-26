const menuToggle = document.querySelector('.menu-toggle');
const menuOverlay = document.querySelector('.menu-mobile-overlay');
const body = document.body;
const navLinks = document.querySelectorAll('.nav-list-mobile a');

function toggleMenu() {
    const isActive = menuToggle.classList.toggle('active');
    menuOverlay.classList.toggle('active');


    body.style.overflow = isActive ? 'hidden' : 'auto';
    menuToggle.setAttribute('aria-expanded', isActive);
}

menuToggle.addEventListener('click', toggleMenu);

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menuOverlay.classList.contains('active')) {
            toggleMenu();
        }
    });
});

window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.style.padding = '5px 0';
        header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
    } else {
        header.style.padding = '0';
        header.style.boxShadow = 'none';
    }
});
// Animação Hero no Load
window.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');

    setTimeout(() => {
        heroContent.classList.add('reveal');
    }, 300);
});
const observerOptions = {
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // ALVO ATUALIZADO: Agora busca os novos cards do design Elite
            const cards = entry.target.querySelectorAll('.card-elite, .resultado-card');

            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('reveal');
                }, index * 200); // Mantém o efeito cascata de 200ms
            });

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const sectionEspecialidades = document.querySelector('.especialidades');
if (sectionEspecialidades) {
    observer.observe(sectionEspecialidades);
}
// --- ANIMAÇÃO DE CONTAGEM (SEÇÃO DIFERENCIAL) ---
const animateCounters = () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 2000; // Tempo total da animação (2 segundos)

    counters.forEach(counter => {
        const updateCount = (timestamp) => {
            if (!counter.startTime) counter.startTime = timestamp;
            const progress = timestamp - counter.startTime;

            const target = +counter.getAttribute('data-target');

            // Função de easing (Desaceleração suave no final)
            const easeOutQuart = 1 - Math.pow(1 - progress / speed, 4);
            const currentCount = Math.floor(target * easeOutQuart);

            if (progress < speed) {
                counter.innerText = currentCount;
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target;
            }
        };
        requestAnimationFrame(updateCount);
    });
};

// Observador para disparar a contagem apenas quando a seção aparecer
const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target); // Para a animação rodar apenas uma vez
        }
    });
}, { threshold: 0.4 }); // Dispara quando 40% da seção estiver visível

const diferencialSection = document.getElementById('diferencial');
if (diferencialSection) {
    statsObserver.observe(diferencialSection);
}
// --- INTERAÇÃO DA GALERIA ANTES E DEPOIS (OTIMIZADO MOBILE-FIRST) ---
const imageSliders = document.querySelectorAll('.before-after-container');

imageSliders.forEach(container => {
    const rangeInput = container.querySelector('.slider-range');

    // O evento 'input' dispara a cada milissegundo durante o arraste
    rangeInput.addEventListener('input', (e) => {
        requestAnimationFrame(() => {
            container.style.setProperty('--position', `${e.target.value}%`);
        });
    }, { passive: true }); // Informa ao navegador que não vamos bloquear o scroll nativo
});
const sectionResultados = document.querySelector('.resultados');
if (sectionResultados) {
    observer.observe(sectionResultados);
}
// --- MOTOR GENÉRICO DE ANIMAÇÃO AO SCROLL ---
const scrollElements = document.querySelectorAll('.anim-scroll');

// Observer focado em performance (só roda quando entra na tela)
const elementObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Remove a observação após animar para salvar processamento
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15, // Dispara quando 15% do bloco aparecer
    rootMargin: "0px 0px -50px 0px" // Dispara um pouco antes da borda inferior
});

scrollElements.forEach(el => elementObserver.observe(el));
// --- LÓGICA DO CARROSSEL DE DEPOIMENTOS (APENAS PARA OS BOTÕES) ---
const trackDepoimentos = document.getElementById('track-depoimentos');
const btnPrev = document.querySelector('.prev-btn');
const btnNext = document.querySelector('.next-btn');

if (trackDepoimentos && btnPrev && btnNext) {
    // Calcula o tamanho do pulo baseado na largura do card + o gap
    const getScrollAmount = () => {
        const cardWidth = trackDepoimentos.querySelector('.depoimento-card').offsetWidth;
        const gap = parseInt(window.getComputedStyle(trackDepoimentos).gap) || 0;
        return cardWidth + gap;
    };

    btnNext.addEventListener('click', () => {
        trackDepoimentos.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    btnPrev.addEventListener('click', () => {
        trackDepoimentos.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });
}
// --- SISTEMA DE COOKIES LGPD ---
document.addEventListener("DOMContentLoaded", () => {
    const cookieBanner = document.getElementById("cookie-banner");
    const acceptBtn = document.getElementById("accept-cookies");

    // Verifica no localStorage se o usuário já aceitou antes
    if (!localStorage.getItem("cookiesAccepted")) {
        // Coloquei um delay de 1.5 segundos para não poluir a tela logo de cara
        setTimeout(() => {
            cookieBanner.classList.add("show");
        }, 1500);
    }

    // Ação de clique para aceitar e ocultar
    acceptBtn.addEventListener("click", () => {
        localStorage.setItem("cookiesAccepted", "true");
        cookieBanner.classList.remove("show");
    });
});