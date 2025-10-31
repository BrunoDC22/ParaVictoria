// * AJUSTE O TEMPO DE INÍCIO DA MÚSICA AQUI (em segundos) *
const START_TIME_SECONDS = 0; // Para começar do início

// * DADOS DO NAMORO *
const startDate = new Date(2025, 7, 30); 
// *********

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const landingPage = document.getElementById('landing-page');
    const mainContent = document.getElementById('main-content');
    const items = document.querySelectorAll('.carousel-item');
    const timeCounterDiv = document.querySelector('.time-counter');
    const audio = document.querySelector('audio'); // referência ao áudio
    let currentIndex = 0;

    // Função para calcular e exibir o tempo em tempo real
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

    // Função do carrossel
    function startCarousel() {
        setInterval(() => {
            items[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % items.length;
            items[currentIndex].classList.add('active');
        }, 5000);
    }

    // Inicia o contador
    setInterval(updateCounter, 1000);
    updateCounter(); // exibe imediatamente

    // Ao clicar no botão
    startButton.addEventListener('click', () => {
        // 1. Inicia a música no ponto definido
        if (audio) {
            audio.currentTime = START_TIME_SECONDS;
            audio.play().catch(err => console.log("Erro ao tocar áudio:", err));
        }

        // 2. Esconde a Landing Page
        landingPage.classList.add('hidden');

        // 3. Mostra o Conteúdo Principal
        mainContent.classList.remove('hidden');

        // 4. Inicia o carrossel
        startCarousel();

        // 5. Exibe a primeira foto
        if (items.length > 0) items[0].classList.add('active');
    });
});
