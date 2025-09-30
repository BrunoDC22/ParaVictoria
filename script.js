let player; // Variável global para o player do YouTube

// *** AJUSTE O TEMPO DE INÍCIO DA MÚSICA AQUI (em segundos) ***
// Exemplo: 1 minuto e 30 segundos = 90
const START_TIME_SECONDS = 90; 
// ************************************************************

// *** DADOS DO NAMORO ***
// Formato: Ano, Mês-1 (Agosto = 7), Dia
const startDate = new Date(2025, 7, 30); 
// ***********************

// Função chamada automaticamente pelo YouTube IFrame API
function onYouTubeIframeAPIReady() {
    const videoId = document.getElementById('player').getAttribute('data-video-id');
    
    // Cria o player
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
        events: {
            'onReady': onPlayerReady 
        }
    });
}

function onPlayerReady(event) {
    console.log("YouTube Player pronto.");
}

// Lógica do Carrossel e Contador
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const landingPage = document.getElementById('landing-page');
    const mainContent = document.getElementById('main-content');
    const items = document.querySelectorAll('.carousel-item');
    const timeCounterDiv = document.querySelector('.time-counter');
    let currentIndex = 0;

    // Função para calcular e exibir o tempo em tempo real
    function updateCounter() {
        const now = new Date();
        const diff = now.getTime() - startDate.getTime();

        // Conversões para unidades de tempo
        const totalSeconds = Math.floor(diff / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24);

        // Tempo restante (para exibição)
        const seconds = totalSeconds % 60;
        const minutes = totalMinutes % 60;
        const hours = totalHours % 24;
        
        // Cáculo aproximado de meses
        const months = Math.floor(totalDays / 30.436875); // Média de dias por mês
        const days = Math.floor(totalDays - (months * 30.436875));


        // Formatação do texto
        timeCounterDiv.innerHTML = `
            ${months} meses, 
            ${days} dias, 
            ${hours} horas, 
            ${minutes} minutos e 
            ${seconds} segundos
        `;
    }

    // Inicia o carrossel
    function startCarousel() {
        setInterval(() => {
            items[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % items.length;
            items[currentIndex].classList.add('active');
        }, 5000);
    }
    
    // Inicia o contador de tempo em tempo real
    setInterval(updateCounter, 1000);
    updateCounter(); // Chama uma vez para exibir imediatamente

    // Lógica para a transição (Landing Page para Main Content)
    startButton.addEventListener('click', () => {
        // 1. Inicia a música no ponto definido
        if (player) {
             player.setVolume(100); 
             player.seekTo(START_TIME_SECONDS, true);
             player.playVideo();
        }

        // 2. Esconde a Landing Page
        landingPage.classList.add('hidden');

        // 3. Mostra o Conteúdo Principal
        mainContent.classList.remove('hidden');

        // 4. Inicia o carrossel de fotos
        startCarousel();
        
        // 5. Garante que a primeira foto do carrossel seja exibida
        if (items.length > 0) {
            items[0].classList.add('active');
        }
    });
});