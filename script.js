// Ajuste do tempo de início da música (em segundos)
const START_TIME_SECONDS = 0;

// Dados do namoro
const startDate = new Date(2025, 7, 30);

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const landingPage = document.getElementById('landing-page');
    const mainContent = document.getElementById('main-content');
    const items = document.querySelectorAll('.carousel-item');
    const timeCounterDiv = document.querySelector('.time-counter');
    const audio = document.querySelector('audio');
    let currentIndex = 0;

    // Contador de tempo
    function updateCounter() {
        const now = new Date();
        const diff = now.getTime() - startDate.getTime();

        const totalSeconds = Math.floor(diff / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24);

        const seconds = totalSeconds % 60;
        const minutes = totalMinutes % 60;
        const hours = totalHours % 24;
        const months = Math.floor(totalDays / 30.436875);
        const days = Math.floor(totalDays - (months * 30.436875));

        timeCounterDiv.innerHTML = `
            ${months} meses, 
            ${days} dias, 
            ${hours} horas, 
            ${minutes} minutos e 
            ${seconds} segundos
        `;
    }

    // Carrossel
    function startCarousel() {
        setInterval(() => {
            items[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % items.length;
            items[currentIndex].classList.add('active');
        }, 5000);
    }

    // Inicia contador
    setInterval(updateCounter, 1000);
    updateCounter();

    // Ao clicar no botão
    startButton.addEventListener('click', () => {
        // Música
        if (audio) {
            audio.currentTime = START_TIME_SECONDS;
            audio.play().catch(err => console.log("Erro ao tocar áudio:", err));
        }

        // Esconde Landing e mostra Main
        landingPage.classList.add('hidden');
        mainContent.classList.remove('hidden');
        mainContent.classList.add('visible');

        // Inicia carrossel
        startCarousel();

        // Exibe primeira foto
        if (items.length > 0) items[0].classList.add('active');
    });
});
