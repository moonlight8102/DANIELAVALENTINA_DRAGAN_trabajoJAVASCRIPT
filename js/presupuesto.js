
     

       document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ELEMENTOS DE LA CALCULADORA ---
    const selectProducto = document.getElementById('producto');
    const inputPlazo = document.getElementById('plazo');
    const checkboxesExtras = document.querySelectorAll('.extra');
    const displayTotal = document.getElementById('precioFinal');

    // --- 2. FUNCIÓN QUE CALCULA EL PRECIO EN TIEMPO REAL ---
    function calcularPresupuesto() {
        // Obtenemos el precio del producto base
        let total = parseFloat(selectProducto.value) || 0;
        
        // Sumamos los extras que estén marcados
        checkboxesExtras.forEach(box => {
            if (box.checked) {
                total += parseFloat(box.value);
            }
        });

        // Aplicamos descuento si el plazo es de 6 meses o más
        const meses = parseInt(inputPlazo.value) || 0;
        if (meses >= 6 && total > 0) {
            total = total * 0.90; // 10% de descuento
        }

        // Mostramos el resultado en pantalla con dos decimales
        displayTotal.textContent = total.toFixed(2) + '€';
    }

    // Escuchamos cualquier cambio en el formulario para recalcular
    selectProducto.addEventListener('change', calcularPresupuesto);
    inputPlazo.addEventListener('input', calcularPresupuesto);
    checkboxesExtras.forEach(box => box.addEventListener('change', calcularPresupuesto));

    // --- 3. VALIDACIÓN AL PULSAR "ENVIAR" ---
    const formulario = document.getElementById('formPresupuesto');
    const divErrores = document.getElementById('errores');

    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault(); // Freno de mano: Evita que el formulario se envíe solo
        
        // Capturamos lo que el usuario ha escrito
        const nombre = document.getElementById('nombre').value.trim();
        const apellidos = document.getElementById('apellidos').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const email = document.getElementById('email').value.trim();
        const privacidad = document.getElementById('privacidad').checked;
        
        let errores = "";

        // Reglas estrictas del PDF mediante Expresiones Regulares
        const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        const soloNumeros = /^[0-9]{9}$/;
        const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!soloLetras.test(nombre) || nombre.length > 15) {
            errores += "❌ El Nombre solo puede contener letras (máximo 15 caracteres).<br>";
        }
        
        if (!soloLetras.test(apellidos) || apellidos.length > 40) {
            errores += "❌ Los Apellidos solo pueden contener letras (máximo 40 caracteres).<br>";
        }
        
        if (!soloNumeros.test(telefono)) {
            errores += "❌ El Teléfono debe contener exactamente 9 números.<br>";
        }

        if (!formatoEmail.test(email)) {
            errores += "❌ El formato del Correo Electrónico no es válido.<br>";
        }

        if (selectProducto.value === "0") {
            errores += "❌ Debes seleccionar un Tipo de Página Web.<br>";
        }

        if (!privacidad) {
            errores += "❌ Debes aceptar la Política de Privacidad.<br>";
        }

        // Si hay errores, los mostramos. Si está todo perfecto, enviamos.
        if (errores !== "") {
            divErrores.style.display = "block";
            divErrores.innerHTML = errores;
        } else {
            divErrores.style.display = "none";
            alert("✅ ¡Misión Cumplida! Solicitud enviada correctamente con un presupuesto de " + displayTotal.textContent);
            formulario.reset();
            displayTotal.textContent = "0.00€"; // Reseteamos el contador visual
        }
    });

    // Lógica para que el botón reset también ponga el precio a 0
    document.getElementById('btn-resetear').addEventListener('click', () => {
        setTimeout(calcularPresupuesto, 10); // Un pequeño retraso para que el form se limpie primero
    });
});