
const target = new Date('2027-07-03T20:30:00');

function updateCountdown() {
    const now = new Date();
    const diff = target - now;

    if (diff <= 0) {
        document.querySelector('.countdown-values').innerHTML =
            '<h2>¡Ha llegado el gran día!</h2>';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours.toString().padStart(2,'0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2,'0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2,'0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

const observer=new IntersectionObserver(entries=>{
 entries.forEach(e=>{
  if(e.isIntersecting)e.target.classList.add('visible');
 });
});
document.querySelectorAll('.fade-in').forEach(el=>observer.observe(el));

const track = document.querySelector('.slider-track');
const cards = document.querySelectorAll('.cards');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

function moveSlider() {
  const cardWidth = cards[0].getBoundingClientRect().width;
  const gap = parseInt(window.getComputedStyle(track).gap) || 0;
  const amountToMove = (cardWidth + gap) * currentIndex;
  
  track.style.transform = `translateX(-${amountToMove}px)`;
}

nextBtn.addEventListener('click', () => {
  const cardsVisible = Math.round(track.parentElement.clientWidth / cards[0].clientWidth);
  const maxIndex = cards.length - cardsVisible;

  if (currentIndex < maxIndex) {
    currentIndex++;
  } else {
    currentIndex = 0; 
  }
  moveSlider();
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    const cardsVisible = Math.round(track.parentElement.clientWidth / cards[0].clientWidth);
    currentIndex = cards.length - cardsVisible; 
  }
  moveSlider();
});

window.addEventListener('resize', moveSlider);
   
	  
   // Seleccionamos el cuadradito de color
const colorBox = document.querySelector('.color-box');

if (colorBox) {
  colorBox.addEventListener('click', function(e) {
    // Evita que el click interactúe con otros elementos del fondo
    e.stopPropagation(); 
    // Añade la clase si no la tiene, o la quita si ya la tiene
    this.classList.toggle('active');
  });

  // OPCIONAL: Si el usuario hace clic en cualquier otra parte de la pantalla,
  // el cuadradito vuelve a su tamaño normal.
  document.addEventListener('click', function() {
    colorBox.classList.remove('active');
  });

}
// LÓGICA DEL REPRODUCTOR INDEPENDIENTE (POP-UP CENTRADO)
const openVideoBtn = document.getElementById('openVideoBtn');

if (openVideoBtn) {
  openVideoBtn.addEventListener('click', function () {
    // 1. Crear la pantalla completa
    const modal = document.createElement('div');
    modal.id = 'weddingVideoModal';
    
    Object.assign(modal.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      zIndex: '999999',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '0',
      padding: '0'
    });

    // 2. Insertar contenedor e interfaz del reproductor
    modal.innerHTML = `
      <div style="position: relative; width: 85%; max-width: 340px; display: flex; flex-direction: column; align-items: center; justify-content: center; margin: auto;">
        <button id="closeVideoBtn" style="position: absolute; top: -45px; right: 0; background: rgba(255, 255, 255, 0.3); border: none; color: white; font-size: 24px; width: 38px; height: 38px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 1000000;">&times;</button>
        <div style="width: 100%; max-height: 75vh; box-shadow: 0 10px 30px rgba(0,0,0,0.8); border-radius: 16px; overflow: hidden; background: #000; display: flex; justify-content: center; align-items: center;">
          <video id="weddingVideoPlayer" controls autoplay playsinline style="width: 100%; max-height: 75vh; object-fit: contain; display: block; margin: 0 auto;">
            <source src="images/video.mp4" type="video/mp4">
            Tu navegador no soporta vídeos HTML5.
          </video>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // 3. Eliminar por completo el modal al cerrar
    function destroyModal() {
      const video = document.getElementById('weddingVideoPlayer');
      if (video) video.pause();
      modal.remove();
    }

    document.getElementById('closeVideoBtn').addEventListener('click', destroyModal);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        destroyModal();
      }
    });
  });
}


