const presentationContainer = document.getElementById('presentationContainer');
const btnUp = document.getElementById('btnUp');
const btnDown = document.getElementById('btnDown');
const pageIndicator = document.getElementById('pageIndicator');

const gameFrame = document.getElementById('gameFrame');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const videoPlayer = document.getElementById('videoPlayer');
const gamesGrid = document.getElementById('gamesGrid');
const searchInput = document.getElementById('searchInput');
const sortInput = document.getElementById('sortInput');

// --- MOTOR DE DIAPOSITIVAS / PRESENTACIÓN ---
let paginaActual = 0;
const totalPaginas = 3;

function actualizarPagina() {
    presentationContainer.style.transform = `translateY(-${paginaActual * 100}%)`;
    pageIndicator.innerText = `${paginaActual + 1} / ${totalPaginas}`;
}

btnUp.addEventListener('click', () => {
    if (paginaActual > 0) { paginaActual--; actualizarPagina(); }
});

btnDown.addEventListener('click', () => {
    if (paginaActual < totalPaginas - 1) { paginaActual++; actualizarPagina(); }
});

window.addEventListener('wheel', (event) => {
    if (event.deltaY > 50 && paginaActual < totalPaginas - 1) {
        paginaActual++;
        actualizarPagina();
    } else if (event.deltaY < -50 && paginaActual > 0) {
        paginaActual--;
        actualizarPagina();
    }
}, { passive: true });


// --- NUEVA BASE DE DATOS DE JUEGOS, PORTADAS Y ENLACES ---
let listaJuegos = [
    {
        titulo: "Pokémon Rojo Fuego",
        url: "https://retrogames.cc",
        portada: "https://uncyc.org",
        jugados: 9500, fecha: 202401
    },
    {
        titulo: "Pokémon Zafiro",
        url: "https://retrogames.cc",
        portada: "https://pokemon.com",
        jugados: 8700, fecha: 202601
    },
    {
        titulo: "Pokémon Negro",
        url: "https://retrogames.cc",
        portada: "https://pokemon.com",
        jugados: 9100, fecha: 202602
    },
    {
        titulo: "Pokémon X",
        url: "https://retrogames.cc", 
        portada: "https://pokemon.com",
        jugados: 7500, fecha: 202603
    },
    {
        titulo: "Pokémon Randomlocke (Random)",
        url: "https://retrogames.cc",
        portada: "https://imgur.com",
        jugados: 15000, fecha: 202604
    },
    {
        titulo: "PokeRogue",
        url: "https://pokerogue.net",
        portada: "https://pokerogue.net",
        jugados: 19000, fecha: 202605
    },
    {
        titulo: "Minecraft Web Full",
        url: "https://minecraft.net",
        portada: "https://wikimedia.org",
        jugados: 25000, fecha: 202606
    },
    {
        titulo: "Fortnite (Web Pixel)",
        url: "https://gameforge.com",
        portada: "https://unrealengine.com",
        jugados: 12000, fecha: 202506
    },
    {
        titulo: "Rocket League (2D)",
        url: "https://poki.com",
        portada: "https://epicgames.com",
        jugados: 8000, fecha: 202512
    },
    {
        titulo: "Fall Guys (Web Clone)",
        url: "https://poki.com",
        portada: "https://unrealengine.com",
        jugados: 14000, fecha: 202607
    },
    {
        titulo: "Brawl Stars (Web Mini)",
        url: "https://poki.com",
        portada: "https://poki.com",
        jugados: 18000, fecha: 202608
    },
    {
        titulo: "Clash Royale (Mini)",
        url: "https://poki.com",
        portada: "https://imgur.com",
        jugados: 11000, fecha: 202609
    },
    {
        titulo: "Clash of Clans (Mini)",
        url: "https://poki.com",
        portada: "https://imgur.com",
        jugados: 9800, fecha: 202610
    },
    {
        titulo: "Geometry Dash Online",
        url: "https://poki.com",
        portada: "https://wikimedia.org",
        jugados: 22000, fecha: 202611
    },
    {
        titulo: "Subway Surfers",
        url: "https://poki.com",
        portada: "https://poki.com",
        jugados: 30000, fecha: 202412
    },
    {
        titulo: "Power Pamplona",
        url: "https://poki.com",
        portada: "https://imgur.com",
        jugados: 6000, fecha: 202301
    },
    {
        titulo: "Rodeo Stampede",
        url: "https://poki.com",
        portada: "https://poki.com",
        jugados: 13000, fecha: 202502
    },
    {
        titulo: "Inazuma Eleven (GBA)",
        url: "https://retrogames.cc",
        portada: "https://imgur.com",
        jugados: 10500, fecha: 202612
    },
    {
        titulo: "eFootball PES (Retro)",
        url: "https://retrogames.cc",
        portada: "https://imgur.com",
        jugados: 7800, fecha: 202508
    }
];

function renderizarCatalogo(juegos) {
    gamesGrid.innerHTML = "";
    juegos.forEach(juego => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <img src="${juego.portada}" alt="${juego.titulo}" onerror="this.src='https://imgur.com'">
            <div class="game-card-title">${juego.titulo}</div>
        `;
        
        card.addEventListener('click', () => {
            gameFrame.src = juego.url;
            paginaActual = 1; 
            actualizarPagina();
        });
        
        gamesGrid.appendChild(card);
    });
}

function filtrarYOrdenar() {
    let textoBusqueda = searchInput.value.toLowerCase();
    let juegosFiltrados = listaJuegos.filter(juego => 
        juego.titulo.toLowerCase().includes(textoBusqueda)
    );
    
    let criterio = sortInput.value;
    if (criterio === 'alfabetico') {
        juegosFiltrados.sort((a, b) => a.titulo.localeCompare(b.titulo));
    } else if (criterio === 'mas-jugados') {
        juegosFiltrados.sort((a, b) => b.jugados - a.jugados);
    } else if (criterio === 'novedades') {
        juegosFiltrados.sort((a, b) => b.fecha - a.fecha);
    }
    
    renderizarCatalogo(juegosFiltrados);
}

searchInput.addEventListener('input', filtrarYOrdenar);
sortInput.addEventListener('change', filtrarYOrdenar);

fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        videoPlayer.requestFullscreen().catch(err => {
            alert(`Error al activar pantalla completa: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
});

filtrarYOrdenar();
