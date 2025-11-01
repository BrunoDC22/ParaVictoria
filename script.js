let player; 

const START_TIME_SECONDS = 90; 
const startDate = new Date(2025, 7, 30); 

function onYouTubeIframeAPIReady() {
    const videoId = document.getElementById('player').getAttribute('data-video-id');
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: videoId,
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'loop': 1,
            'playlist': videoId
        },
        events: { 'onReady': onPlayerReady }
    });
}

function onPlayerReady(event) {
    console.log("YouTube Player pronto.");
}

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const landingPage = document.getElementById('landing-page');
    const mainContent = document.getElementById('main-content');
    const items = document.querySelectorAll('.carousel-item');
    const timeCounterDiv = document.querySelector('.time-counter');
    let currentIndex = 0;

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

    function startCarousel() {
        setInterval(() => {
            items[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % items.length;
            items[currentIndex].classList.add('active');
        }, 5000);
    }

    setInterval(updateCounter, 1000);
    updateCounter();

    startButton.addEventListener('click', () => {
        if (player) {
             player.setVolume(100); 
             player.seekTo(START_TIME_SECONDS, true);
             player.playVideo();
        }

        landingPage.classList.add('hidden');
        mainContent.classList.remove('hidden');
        startCarousel();

        if (items.length > 0) {
            items[0].classList.add('active');
        }
    });

    // --- NOVO: Mostrar a nova caixa de texto ---
    const arrowButton = document.querySelector('.arrow-button');
    const extraMessage = document.querySelector('.extra-message');

    arrowButton.addEventListener('click', () => {
        extraMessage.classList.toggle('hidden');
        if (!extraMessage.classList.contains('hidden')) {
            extraMessage.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
