document.addEventListener('DOMContentLoaded', () => {
    // 1. Inisialisasi Elemen
    const menuBtn = document.getElementById('menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const contactForm = document.querySelector('form');

    // --- 2. FUNGSI UTAMA MENU ---
    
    // Fungsi Menutup Menu
    function closeMenu() {
        if (!navMenu.classList.contains('hidden')) {
            navMenu.classList.add('hidden');
            // Hapus styling tambahan mobile agar kembali ke default desktop
            navMenu.classList.remove('flex', 'flex-col', 'absolute', 'top-full', 'left-0', 'w-full', 'bg-white', 'px-6', 'py-6', 'shadow-lg', 'border-b', 'border-gray-100', 'space-y-4');
            // Balikkan icon ke garis 3
            menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        }
    }

    // Fungsi Toggle (Buka/Tutup)
    function toggleMenu() {
        const isHidden = navMenu.classList.contains('hidden');
        if (isHidden) {
            navMenu.classList.remove('hidden');
            navMenu.classList.add('flex', 'flex-col', 'absolute', 'top-full', 'left-0', 'w-full', 'bg-white', 'px-6', 'py-6', 'shadow-lg', 'border-b', 'border-gray-100', 'space-y-4');
            // Ubah icon ke X
            menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
        } else {
            closeMenu();
        }
    }

    // --- 3. EVENT LISTENERS ---

    // Klik tombol hamburger
    if (menuBtn) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Penting: Agar klik tombol tidak dianggap "klik luar"
            toggleMenu();
        });
    }

    // FITUR: KLIK DI MANA SAJA UNTUK CLOSE
    window.addEventListener('click', (e) => {
        // Jika menu terbuka dan yang diklik bukan bagian dari menu atau tombol hamburger
        if (navMenu && !navMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            closeMenu();
        }
    });

    // --- 4. SMOOTH SCROLL (BAGIAN YANG KAMU TANYAKAN) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Jalankan scroll halus
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Setelah klik link, otomatis tutup menu (penting untuk mobile)
                closeMenu();
            }
        });
    });

    // --- 5. SCROLL SPY (Garis Bawah Aktif Otomatis) ---
    window.addEventListener('scroll', () => {
        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Deteksi posisi scroll (dengan offset 150px)
            if (window.pageYOffset >= (sectionTop - 150)) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // --- 6. FORM VALIDATION ---
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = contactForm.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('border-red-500');
                    isValid = false;
                } else {
                    input.classList.remove('border-red-500');
                }
            });
            
            if (isValid) {
                alert('Pesan terkirim! Terima kasih.');
                contactForm.reset();
            }
        });
    }

    // Update Tahun di Footer
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});