// Acessibilidade
const a11yToggle = document.getElementById('a11y-toggle');
const body = document.body;

a11yToggle.addEventListener('click', () => {
    body.classList.toggle('a11y-mode');
    localStorage.setItem('a11yMode', body.classList.contains('a11y-mode'));
});

if (localStorage.getItem('a11yMode') === 'true') {
    body.classList.add('a11y-mode');
}

// Menu Mobile
const menuMobile = document.querySelector('.menu-mobile');
const navLinks = document.querySelector('.nav-links');

menuMobile.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Player de Música
const player = document.getElementById('main-player');
const playBtn = document.querySelector('.play');
const progressBar = document.querySelector('.progress-bar');
const currentTime = document.querySelector('.current-time');
const duration = document.querySelector('.duration');

let isPlaying = false;

// Controles do Player
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        player.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        player.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
});

// Atualizar barra de progresso
player.addEventListener('timeupdate', () => {
    const progressPercent = (player.currentTime / player.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    
    // Atualizar tempo atual
    const currentMinutes = Math.floor(player.currentTime / 60);
    const currentSeconds = Math.floor(player.currentTime % 60);
    currentTime.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
});

// Definir duração total
player.addEventListener('loadedmetadata', () => {
    const durationMinutes = Math.floor(player.duration / 60);
    const durationSeconds = Math.floor(player.duration % 60);
    duration.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
});

// Clicar na barra de progresso
document.querySelector('.progress-container').addEventListener('click', (e) => {
    const clickPosition = e.offsetX;
    const progressWidth = e.target.clientWidth;
    const seekTime = (clickPosition / progressWidth) * player.duration;
    player.currentTime = seekTime;
});

// Controle de volume
const volumeSlider = document.querySelector('.volume-slider');
volumeSlider.addEventListener('input', () => {
    player.volume = volumeSlider.value;
});

// Formulário de Contato
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    
    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        formMessage.textContent = result.message;
        formMessage.className = result.success ? 'form-message success' : 'form-message error';
        formMessage.style.display = 'block';
        
        if (result.success) contactForm.reset();
        
    } catch (error) {
        formMessage.textContent = 'Erro ao enviar mensagem. Tente novamente.';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
    }
});

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
