document.addEventListener('DOMContentLoaded', () => {
    emailjs.init("TU_PUBLIC_KEY_AQUI"); // ¡No olvides poner tu llave!
    loadData();
    document.getElementById('year').textContent = new Date().getFullYear();
    
    document.getElementById('contact-form').addEventListener('submit', sendEmail);
    
    // Menú Hamburguesa
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

async function loadData() {
    try {
        const response = await fetch('wp_mg/data.json');
        const data = await response.json();

        // --- Hero ---
        document.getElementById('hero-greeting').textContent = data.hero.greeting;
        document.getElementById('hero-name').textContent = data.hero.name;
        document.getElementById('hero-specialty').textContent = data.hero.specialty;
        document.getElementById('hero-tagline').textContent = data.hero.tagline;

        // --- Perfil y Objetivos ---
        document.getElementById('desc-title').textContent = data.about.description_title;
        document.getElementById('desc-text').textContent = data.about.description_text;
        document.getElementById('mission-title').textContent = data.about.mission_title;
        document.getElementById('mission-text').textContent = data.about.mission_text;
        
        // --- Valores (Lista dinámica) ---
        document.getElementById('values-title').textContent = data.about.values_title;
        const valuesList = document.getElementById('values-list');
        valuesList.innerHTML = ''; // Limpiar
        data.about.values_list.forEach(val => {
            let li = document.createElement('li');
            li.textContent = val;
            valuesList.appendChild(li);
        });

        // --- Servicios (Generación Dinámica con Iconos) ---
        document.getElementById('services-title').textContent = data.services.title;
        const servicesContainer = document.getElementById('services-container');
        servicesContainer.innerHTML = ''; // Limpiar

        data.services.items.forEach(service => {
            const card = document.createElement('div');
            card.className = 'service-card';
            // Aquí inyectamos el icono específico definido en el JSON
            card.innerHTML = `
                <div class="icon-box">
                    <i class="fa-solid ${service.icon}"></i>
                </div>
                <h3>${service.name}</h3>
                <p>${service.desc}</p>
            `;
            servicesContainer.appendChild(card);
        });

        // --- Contacto ---
        document.getElementById('contact-phone').textContent = data.contact.phone;
        document.getElementById('contact-email').textContent = data.contact.email;
        document.getElementById('contact-address').textContent = data.contact.address;

    } catch (error) {
        console.error('Error:', error);
    }
}

function sendEmail(e) {
    e.preventDefault();
    const btn = document.getElementById('btn-submit');
    const status = document.getElementById('form-status');
    
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    // REEMPLAZA ESTOS CON TUS DATOS DE EMAILJS
    emailjs.sendForm('TU_SERVICE_ID', 'TU_TEMPLATE_ID', this)
        .then(() => {
            btn.textContent = 'Enviado';
            status.textContent = 'Mensaje enviado correctamente.';
            status.style.color = 'green';
            this.reset();
            setTimeout(() => { btn.disabled = false; btn.textContent = 'Enviar'; }, 3000);
        }, (err) => {
            btn.disabled = false;
            btn.textContent = 'Enviar';
            status.textContent = 'Error al enviar.';
            status.style.color = 'red';
            console.log(err);
        });
}