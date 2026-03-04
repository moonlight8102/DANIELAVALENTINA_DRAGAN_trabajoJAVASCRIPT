document.addEventListener('DOMContentLoaded', () => {
    // 1. Creamos la estructura HTML del Lightbox y la inyectamos en la página
    const lightboxHTML = `
        <div id="lightbox" class="lightbox">
            <span class="lightbox-cerrar" id="cerrar-lightbox">&times;</span>
            <img id="lightbox-img" src="" alt="Imagen ampliada">
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    // 2. Localizamos los elementos clave
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const botonCerrar = document.getElementById('cerrar-lightbox');
    
    // Seleccionamos TODAS las imágenes que están dentro de las tarjetas de la galería
    const imagenesGaleria = document.querySelectorAll('.tarjeta img');

    // 3. Le decimos a cada imagen: "Si te hacen clic, abre el lightbox con tu foto"
    imagenesGaleria.forEach(imagen => {
        imagen.addEventListener('click', () => {
            lightboxImg.src = imagen.src; // Copia la ruta de la foto clickeada
            lightbox.style.display = 'flex'; // Enciende la luz del cuarto oscuro
        });
    });

    // 4. Lógica para cerrar el lightbox al hacer clic en la "X"
    botonCerrar.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // 5. Lógica extra profesional: Cerrar también si hacen clic en la zona negra
    lightbox.addEventListener('click', (evento) => {
        if (evento.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
});