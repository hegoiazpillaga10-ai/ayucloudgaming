const script = document.createElement('script');
script.src = 'https://socket.io';
document.head.appendChild(script);

script.onload = () => {
    // Conectar a tu servidor de StackBlitz
    const socket = io('https://stackblitzstarters6zu5uvsm-yoik--3000--bd880c29.local-credentialless.webcontainer.io/');

    const statusDiv = document.getElementById('status');
    const container = document.getElementById('stream-container');

    // Crear un lienzo (Canvas) de dibujo dentro de tu cuadro verde para ver el juego
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 450;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    // Cuando el servidor nos mande información en tiempo real
    socket.on('renderFotograma', (data) => {
        statusDiv.innerText = "Estado: ¡STREAMING EN DIRECTO (30 FPS)!";
        statusDiv.style.color = "#00ff00";

        const juego = JSON.parse(data);

        // Limpiar la pantalla antes de dbiujar el nuevo fotograma
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Dibujar a TU PERSONAJE (un cuadrado azul que controlas tú)
        ctx.fillStyle = '#00a8ff';
        ctx.fillRect(juego.jugadorX, juego.jugadorY, 20, 20);

        // Dibujar los OBSTÁCULOS/ENEMIGOS de la nube (círculos rojos)
        ctx.fillStyle = '#ff3838';
        juego.enemigos.forEach(enemigo => {
            ctx.beginPath();
            ctx.arc(enemigo.x, enemigo.y, 15, 0, Math.PI * 2);
            ctx.fill();
        });
    });

    // Capturar tus flechas del teclado y mandarlas al servidor
    window.addEventListener('keydown', (event) => {
        if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(event.key)) {
            event.preventDefault(); // Evita que la página web se mueva hacia abajo
            const command = { key: event.key };
            socket.emit('gameInput', JSON.stringify(command));
        }
    });
};