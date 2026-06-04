// Añadir la librería para que el navegador pueda hablar con el servidor
const script = document.createElement('script');
script.src = 'https://socket.io';
document.head.appendChild(script);

script.onload = () => {
    // === PASO IMPORTANTE ===
    // Borra el enlace de abajo que está entre comillas e introduce TU ENLACE COPIADO
    const socket = io('https://stackblitzstarters6zu5uvsm-yoik--3000--bd880c29.local-credentialless.webcontainer.io/');

    const remoteVideo = document.getElementById('remoteVideo');
    const statusDiv = document.getElementById('status');

    let peerConnection;
    const config = {
        iceServers: [{ urls: 'stun:://google.com' }]
    };

    async function startMirroring() {
        peerConnection = new RTCPeerConnection(config);
        
        peerConnection.ontrack = (event) => {
            statusDiv.innerText = "Estado: ¡Juego conectado en vivo!";
            statusDiv.style.color = "#00ff00";
            if (remoteVideo.srcObject !== event.streams) {
                remoteVideo.srcObject = event.streams;
            }
        };

        const inputChannel = peerConnection.createDataChannel("inputControls");
        
        window.addEventListener('keydown', (event) => {
            // Mandar la tecla presionada al servidor de StackBlitz
            const command = { key: event.key, action: "keydown" };
            socket.emit('gameInput', JSON.stringify(command));
            console.log("Comando enviado a la nube: ", command);
        });
    }

    window.onload = startMirroring;
};
