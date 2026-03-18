const sections = document.querySelectorAll('.section');
const sectBtn  = document.querySelectorAll('.control');
const allSections = document.querySelector('.main-content');

function PageTransition() {

    // ── Control button click: switch active section ──
    sectBtn.forEach((btn) => {
        btn.addEventListener('click', function () {
            const id = this.dataset.id;
            if (!id) return; // skip the game link button (no data-id nav)

            // Update active button highlight
            sectBtn.forEach(b => b.classList.remove('active-btn'));
            this.classList.add('active-btn');

            // Show the matching section, hide all others
            sections.forEach(section => section.classList.remove('active'));
            const target = document.getElementById(id);
            if (target) target.classList.add('active');
        });
    });

    // ── "Get in Touch" / inline buttons with data-id ──
    // Allows any element with data-id inside the page to act as a nav link
    allSections.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        if (!id) return;

        // Update buttons
        sectBtn.forEach(b => {
            b.classList.toggle('active-btn', b.dataset.id === id);
        });

        // Show section
        sections.forEach(section => section.classList.remove('active'));
        const target = document.getElementById(id);
        if (target) target.classList.add('active');
    });

    // ── Theme toggle (uncomment .theme-btn in HTML to use) ──
    const themeBtn = document.querySelector('.theme-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
        });
    }
}

PageTransition();