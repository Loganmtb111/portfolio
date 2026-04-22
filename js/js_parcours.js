const scrollContainer = document.querySelector('#Interface_parcours');

let scrollAmount = 0;
let isScrolling = false;

scrollContainer.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0) {
        e.preventDefault();
        scrollAmount += e.deltaY;
        if (!isScrolling) smoothScroll();
    }
});

function smoothScroll() {
    isScrolling = true;
    scrollContainer.scrollLeft += scrollAmount * 0.1;
    scrollAmount *= 0.9;

    if (Math.abs(scrollAmount) > 0.5) {
        requestAnimationFrame(smoothScroll);
    } else {
        isScrolling = false;
    }
}

// Navigation par flèches et points
const groups = document.querySelectorAll('.Village_Group');
const dots = document.querySelectorAll('.Nav_Dot');
let current = 0;

function scrollToGroup(index) {
    current = Math.max(0, Math.min(index, groups.length - 1));
    const panneau = groups[current].querySelector('.Panneau_Wrapper');
    const panneauLeft = panneau.getBoundingClientRect().left
        - scrollContainer.getBoundingClientRect().left
        + scrollContainer.scrollLeft
        - 280;
    scrollContainer.scrollTo({ left: panneauLeft, behavior: 'smooth' });
    dots.forEach(d => d.classList.remove('active'));
    dots[current].classList.add('active');
}

document.getElementById('Nav_Prev').addEventListener('click', () => scrollToGroup(current - 1));
document.getElementById('Nav_Next').addEventListener('click', () => scrollToGroup(current + 1));

dots.forEach(dot => {
    dot.addEventListener('click', () => scrollToGroup(parseInt(dot.dataset.index)));
});
