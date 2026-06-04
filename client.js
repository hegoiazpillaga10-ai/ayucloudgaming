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
        if (inputChannel.readyState === "open") {
            const command = { key: event.key, action: "keydown" };
            inputChannel.send(JSON.stringify(command));
            console.log("Comando enviado a la nube: ", command);
        }
    });
}

window.onload = startMirroring;