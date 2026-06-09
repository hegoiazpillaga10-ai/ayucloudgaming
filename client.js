// --- ELEMENTOS DE LA INTERFAZ ---
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

// --- SISTEMA DE DIAPOSITIVAS (BOTONES DE LA IZQUIERDA) ---
let paginaActual = 0;
const totalPaginas = 3;

function actualizarPagina() {
    if (presentationContainer) {
        presentationContainer.style.transform = `translateY(-${paginaActual * 100}%)`;
    }
    if (pageIndicator) {
        pageIndicator.innerText = `${paginaActual + 1} / ${totalPaginas}`;
    }
}

if (btnUp) {
    btnUp.addEventListener('click', () => {
        if (paginaActual > 0) { paginaActual--; actualizarPagina(); }
    });
}

if (btnDown) {
    btnDown.addEventListener('click', () => {
        if (paginaActual < totalPaginas - 1) { paginaActual++; actualizarPagina(); }
    });
}


// --- BASE DE DATOS DE JUEGOS CON IMÁGENES SEGURAS ---
const listaJuegos = [
    {
        titulo: "Pokémon Rojo Fuego",
        url: "https://retrogames.cc",
        portada: "https://wikimedia.org",
        jugados: 9500, fecha: 202401
    },
    {
        titulo: "Pokémon Zafiro",
        url: "https://retrogames.cc",
        portada: "https://wikimedia.org",
        jugados: 8700, fecha: 202601
    },
    {
        titulo: "Pokémon Negro",
        url: "https://retrogames.cc",
        portada: "https://wikimedia.org",
        jugados: 9100, fecha: 202602
    },
    {
        titulo: "Pokémon X",
        url: "https://retrogames.cc", 
        portada: "https://wikimedia.org",
        jugados: 7500, fecha: 202603
    },
    {
        titulo: "Pokémon Randomlocke",
        url: "https://retrogames.cc",
        portada: "https://wikimedia.org", 
        jugados: 15000, fecha: 202604
    },
    {
        titulo: "PokeRogue",
        url: "https://pokerogue.net",
        portada: "https://wikimedia.org",
        jugados: 19000, fecha: 202605
    },
    {
        titulo: "Minecraft Classic",
        url: "https://minecraft.net",
        portada: "https://wikimedia.org",
        jugados: 25000, fecha: 202606
    },
    {
        titulo: "Fortnite Pixels",
        url: "https://gameforge.com",
        portada: "https://wikimedia.org",
        jugados: 12000, fecha: 202506
    },
    {
        titulo: "Rocket League 2D",
        url: "https://poki.com",
        portada: "https://wikimedia.org",
        jugados: 8000, fecha: 202512
    },
    {
        titulo: "Fall Guys Web",
        url: "https://poki.com",
        portada: "https://wikimedia.org",
        jugados: 14000, fecha: 202607
    },
    {
        titulo: "Brawl Stars Arena",
        url: "https://poki.com",
        portada: "https://wikimedia.org",
        jugados: 18000, fecha: 202608
    },
    {
        titulo: "Geometry Dash",
        url: "https://poki.com",
        portada: "https://wikimedia.org",
        jugados: 22000, fecha: 202611
    },
    {
        titulo: "Subway Surfers",
        url: "https://poki.com",
        portada: "https://wikimedia.org",
        jugados: 30000, fecha: 202412
    },
    {
        titulo: "Rodeo Stampede",
        url: "https://poki.com",
        portada: "https://wikimedia.org",
        jugados: 13000, fecha: 202502
    },
    {
        titulo: "Inazuma Eleven GBA",
        url: "https://retrogames.cc",
        portada: "https://wikimedia.org", 
        jugados: 10500, fecha: 202612
    }
];

function renderizarCatalogo(juegos) {
    if (!gamesGrid) return;
    gamesGrid.innerHTML = "";
    
    juegos.forEach(juego => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <img src="${juego.portada}" alt="${juego.titulo}" onerror="this.src='https://wikimedia.org'">
            <div class="game-card-title">${juego.titulo}</div>
        `;
        
        card.addEventListener('click', () => {
            if (gameFrame) gameFrame.src = juego.url;
            paginaActual = 1; 
            actualizarPagina();
        });
        
        gamesGrid.appendChild(card);
    });
}

function filtrarYOrdenar() {
    let textoBusqueda = searchInput ? searchInput.value.toLowerCase() : "";
    let juegosFiltrados = listaJuegos.filter(juego => 
        juego.titulo.toLowerCase().includes(textoBusqueda)
    );
    
    let criterio = sortInput ? sortInput.value : "mas-jugados";
    if (criterio === 'alfabetico') {
        juegosFiltrados.sort((a, b) => a.titulo.localeCompare(b.titulo));
    } else if (criterio === 'mas-jugados') {
        juegosFiltrados.sort((a, b) => b.jugados - a.jugados);
    } else if (criterio === 'novedades') {
        juegosFiltrados.sort((a, b) => b.fecha - a.fecha);
    }
    
    renderizarCatalogo(juegosFiltrados);
}

if (searchInput) searchInput.addEventListener('input', filtrarYOrdenar);
if (sortInput) sortInput.addEventListener('change', filtrarYOrdenar);

if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement && videoPlayer) {
            videoPlayer.requestFullscreen().catch(err => {
                alert(`Error: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    });
}

// Carga inicial directa y forzada
filtrarYOrdenar();
