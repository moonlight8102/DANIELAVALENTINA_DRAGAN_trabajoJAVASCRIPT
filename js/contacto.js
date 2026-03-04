document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Definimos las coordenadas de tu empresa (Centro de Madrid como ejemplo)
    const latEmpresa = 40.4168;
    const lngEmpresa = -3.7038;

    // 2. Encendemos el mapa y lo centramos en tu empresa con un zoom de 13
    const mapa = L.map('mapa').setView([latEmpresa, lngEmpresa], 13);

    // 3. Conectamos con el satélite de OpenStreetMap para cargar las calles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mapa);

    // 4. Clavamos una chincheta en tu oficina
    L.marker([latEmpresa, lngEmpresa]).addTo(mapa)
        .bindPopup('<b>DaviDenisa8102</b><br>Nuestras oficinas centrales.')
        .openPopup();

    // 5. Lógica de rastreo: El botón para calcular la ruta
    const btnRuta = document.getElementById('btn-ruta');
    let controlRuta = null; // Variable para guardar la ruta y no dibujar 20 a la vez

    btnRuta.addEventListener('click', () => {
        // Pedimos permiso al navegador para usar el GPS del usuario
        if (navigator.geolocation) {
            btnRuta.innerText = "Buscando satélites... 🛰️";
            btnRuta.style.backgroundColor = "#f39c12"; // Cambia a naranja
            
            navigator.geolocation.getCurrentPosition((posicion) => {
                const latCliente = posicion.coords.latitude;
                const lngCliente = posicion.coords.longitude;

                // Si ya había una ruta, la borramos para limpiar la pantalla
                if (controlRuta) {
                    mapa.removeControl(controlRuta);
                }

                // Trazamos la línea desde el cliente hasta la empresa
                controlRuta = L.Routing.control({
                    waypoints: [
                        L.latLng(latCliente, lngCliente), // Punto A: Cliente
                        L.latLng(latEmpresa, lngEmpresa)  // Punto B: Empresa
                    ],
                    language: 'es', // Instrucciones del GPS en español
                    routeWhileDragging: true,
                    showAlternatives: false,
                    fitSelectedRoutes: true
                }).addTo(mapa);

                // Misión cumplida
                btnRuta.innerText = "¡Ruta trazada con éxito! ✅";
                btnRuta.style.backgroundColor = "#27ae60"; // Cambia a verde

            }, (error) => {
                alert("Operación abortada: No hemos podido acceder a tu ubicación. Comprueba los permisos de tu navegador.");
                btnRuta.innerText = "📍 Calcular ruta desde mi ubicación";
                btnRuta.style.backgroundColor = "#2c3e50";
            });
        } else {
            alert("Tu navegador es demasiado antiguo para usar geolocalización.");
        }
    });
});