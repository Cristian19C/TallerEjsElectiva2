
document.addEventListener('DOMContentLoaded', function() {
    const filtroInput = document.getElementById('filtro-input');
    const filtrarBtn = document.getElementById('filtrar-text');
    
    filtrarBtn.addEventListener('click', function() {
      const filtroValor = filtroInput.value.toLowerCase();
      const filas = document.querySelectorAll('.table tbody tr');
      
      filas.forEach(function(fila) {
        const nombre = fila.querySelector('td:nth-child(2)').textContent.toLowerCase();
        
        if (nombre.includes(filtroValor)) {
          fila.style.display = '';
        } else {
          fila.style.display = 'none';
        }
      });
    });
  });