script.onload = () => {
    const statusDiv = document.getElementById('status');
    const container = document.getElementById('stream-container');

    // 1. Cambiar el estado visual de la pantalla
    statusDiv.innerText = "Estado: ¡STREAMING EN DIRECTO (30 FPS)!";
    statusDiv.style.color = "#00ff00";

    // 2. Crear la pantalla del juego
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 450;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    // 3. Posiciones internas del juego (Sin depender de StackBlitz)
    let juego = {
        jugadorX: 390,
        jugadorY: 215,
        enemigos: [
            { x: 150, y: 120, velocidadX: 2, velocidadY: 1 },
            { x: 600, y: 150, velocidadX: -1, velocidadY: 2 },
            { x: 300, y: 350, velocidadX: 1.5, velocidadY: -1.5 }
        ]
    };

    // 4. Capturar tus flechas del teclado y mover el personaje azul
    window.addEventListener('keydown', (event) => {
        if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(event.key)) {
            event.preventDefault(); // Evita que la página se mueva hacia abajo
            
            if (event.key === 'ArrowUp') juego.jugadorY -= 15;
            if (event.key === 'ArrowDown') juego.jugadorY += 15;
            if (event.key === 'ArrowLeft') juego.jugadorX -= 15;
            if (event.key === 'ArrowRight') juego.jugadorX += 15;
        }
    });

    // 5. El bucle que dibuja el juego en tu pantalla en tiempo real
    function actualizarJuego() {
        // Limpiar pantalla en negro
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Mover y rebotar los obstáculos automáticos (los círculos rojos)
        juego.enemigos.forEach(enemigo => {
            enemigo.x += enemigo.velocidadX;
            enemigo.y += enemigo.velocidadY;

            // Rebotar en los bordes de la pantalla
            if (enemigo.x < 15 || enemigo.x > canvas.width - 15) enemigo.velocidadX *= -1;
            if (enemigo.y < 15 || enemigo.y > canvas.height - 15) enemigo.velocidadY *= -1;

            // Dibujar círculo rojo
            ctx.fillStyle = '#ff3838';
            ctx.beginPath();
            ctx.arc(enemigo.x, enemigo.y, 15, 0, Math.PI * 2);
            ctx.fill();
        });

        // Dibujar a tu personaje (el cuadrado azul)
        ctx.fillStyle = '#00a8ff';
        ctx.fillRect(juego.jugadorX, juego.jugadorY, 20, 20);

        // Volver a dibujar en el siguiente fotograma
        requestAnimationFrame(actualizarJuego);
    }

    // Arrancar el juego
    actualizarJuego();
};
