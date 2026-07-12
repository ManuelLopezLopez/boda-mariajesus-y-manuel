
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


