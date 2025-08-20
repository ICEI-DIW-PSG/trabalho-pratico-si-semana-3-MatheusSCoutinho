document.addEventListener('DOMContentLoaded', () => {
  // Carrossel
  document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    let idx = 0;
    const prev = carousel.querySelector('.prev');
    const next = carousel.querySelector('.next');

    function update() {
      track.style.transform = `translateX(-${idx * 100}%)`;
    }

    prev.addEventListener('click', () => {
      idx = (idx - 1 + slides.length) % slides.length;
      update();
    });

    next.addEventListener('click', () => {
      idx = (idx + 1) % slides.length;
      update();
    });
  });

  // Filtros
  const destinoFilter = document.getElementById('destino-filter');
  const priceFilter = document.getElementById('price-filter');
  const priceValue = document.getElementById('price-value');
  const pacotes = document.querySelectorAll('.pacote');

  function applyFilters() {
    const selDestino = destinoFilter.value;
    const maxPrice = parseInt(priceFilter.value, 10);

    pacotes.forEach(p => {
      const dest = p.dataset.destination;
      const price = parseInt(p.dataset.price, 10);
      const okDestino = selDestino === 'all' || dest === selDestino;
      const okPrice = price <= maxPrice;
      p.style.display = (okDestino && okPrice) ? 'flex' : 'none';
    });
  }

  destinoFilter.addEventListener('change', applyFilters);
  priceFilter.addEventListener('input', () => {
    priceValue.textContent = `R$ ${priceFilter.value}`;
    applyFilters();
  });
});