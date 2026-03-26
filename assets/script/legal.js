// Lógica simples para destacar o menu lateral ao rolar a página
const sections = document.querySelectorAll('.legal-section');
const navLinks = document.querySelectorAll('.legal-nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}, { passive: true });