// Simple smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Tambahkan script ini
        const mobileMenuButton = document.querySelector('button.md\\:hidden');
        const navLinks = document.querySelector('.hidden.md\\:flex');

        mobileMenuButton.addEventListener('click', () => {
            navLinks.classList.toggle('hidden');
            navLinks.classList.toggle('flex');
            navLinks.classList.toggle('flex-col');
            navLinks.classList.toggle('absolute');
            navLinks.classList.toggle('top-16');
            navLinks.classList.toggle('left-0');
            navLinks.classList.toggle('w-full');
            navLinks.classList.toggle('bg-white');
            navLinks.classList.toggle('p-4');
        });

        // Tambahkan event listener untuk form
            const contactForm = document.querySelector('form');
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                // Basic validation
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
                    // Simulate form submission
                    alert('Pesan terkirim! Terima kasih telah menghubungi saya.');
                    contactForm.reset();
                }
            });

        // =========================================================
        // FUNGSI MARQUEE DENGAN JAVASCRIPT LOOPING (Seamless Looping + Logo)
        // =========================================================

        function populateMarquee() {
            const container = document.getElementById('js-marquee-content');
            if (!container) return; 

            // Array konten (Skill) yang akan diulang, DENGAN URL LOGO
            const skills = [
                { name: 'HTML5', logo: 'html5' },
                { name: 'CSS3', logo: 'css' },
                { name: 'JavaScript', logo: 'javascript' },
                { name: 'React', logo: 'react' }, 
                { name: 'Tailwind CSS', logo: 'tailwindcss' },
                { name: 'Git', logo: 'git' },
                { name: 'PHP', logo: 'php' },
                { name: 'MySQL', logo: 'mysql' },
            ];
            
            let baseContentHTML = '';
            
            // 1. Generate SATU SET konten asli
            skills.forEach(skill => {
                // Membuat struktur HTML untuk setiap skill + Logo
                // URL logo mengambil dari Simple Icons CDN: https://cdn.simpleicons.org/{slug}/white
                // Logo warna putih agar kontras di background hitam
                const logoUrl = `https://cdn.simpleicons.org/${skill.logo}/white`; 

                baseContentHTML += `
                    <span class="text-xl md:text-2xl font-heading font-bold px-8 flex items-center whitespace-nowrap">
                        ${skill.name} 
                        <img src="${logoUrl}" alt="${skill.name} Logo" class="w-6 h-6 ml-4 mr-8 opacity-90" />
                    </span>
                `;
            });

            // 2. Masukkan konten asli DUA KALI ke dalam elemen HTML
            // Ini adalah kunci untuk looping yang mulus (Content A + Clone A')
            container.innerHTML = baseContentHTML + baseContentHTML;
        }

        // Jalankan fungsi saat DOM sudah siap
        document.addEventListener('DOMContentLoaded', populateMarquee);