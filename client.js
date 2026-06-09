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

// --- SISTEMA DE DIAPOSITIVAS / PRESENTACIÓN ---
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

// Control de scroll con la rueda del ratón corregido para evitar parpadeos
let listoParaScroll = true;
window.addEventListener('wheel', (event) => {
    if (!listoParaScroll) return;
    
    if (event.deltaY > 50 && paginaActual < totalPaginas - 1) {
        paginaActual++;
        actualizarPagina();
        desactivarScrollTemporal();
    } else if (event.deltaY < -50 && paginaActual > 0) {
        paginaActual--;
        actualizarPagina();
        desactivarScrollTemporal();
    }
}, { passive: true });

function desactivarScrollTemporal() {
    listoParaScroll = false;
    setTimeout(() => { listoParaScroll = true; }, 600);
}


// --- BASE DE DATOS DE JUEGOS REVISADA Y OPTIMIZADA ---
const listaJuegos = [
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
        titulo: "Pokémon Randomlocke",
        url: "https://retrogames.cc",
        portada: "https://uncyc.org", // Portada espejo estable
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
        titulo: "Fall Guys Clone",
        url: "https://poki.com",
        portada: "https://unrealengine.com",
        jugados: 14000, fecha: 202607
    },
    {
        titulo: "Brawl Stars Mini",
        url: "https://poki.com",
        portada: "https://poki.com",
        jugados: 18000, fecha: 202608
    },
    {
        titulo: "Clash Royale Mini",
        url: "https://poki.com",
        portada: "https://poki.com", // Imagen de respaldo segura
        jugados: 11000, fecha: 202609
    },
    {
        titulo: "Clash of Clans Mini",
        url: "https://poki.com",
        portada: "https://poki.com", // Imagen de respaldo segura
        jugados: 9800, fecha: 202610
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
        portada: "https://poki.com",
        jugados: 30000, fecha: 202412
    },
    {
        titulo: "Power Pamplona",
        url: "https://poki.com",
        portada: "https://poki.com", // Imagen de respaldo segura
        jugados: 6000, fecha: 202301
    },
    {
        titulo: "Rodeo Stampede",
        url: "https://poki.com",
        portada: "https://poki.com",
        jugados: 13000, fecha: 202502
    },
    {
        titulo: "Inazuma Eleven GBA",
        url: "https://retrogames.cc",
        portada: "https://wikimedia.org", // Imagen de respaldo segura
        jugados: 10500, fecha: 202612
    },
    {
        titulo: "eFootball PES Retro",
        url: "https://retrogames.cc",
        portada: "https://wikimedia.org", // Imagen de respaldo segura
        jugados: 7800, fecha: 202508
    }
];

function renderizarCatalogo(juegos) {
    if (!gamesGrid) return;
    gamesGrid.innerHTML = "";
    
    juegos.forEach(juego => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <img src="${juego.portada}" alt="${juego.titulo}" onerror="this.src='https://poki.com'">
            <div class="game-card-title" style="padding: 10px; text-align: center; font-size: 0.9rem; font-weight: bold; background: #222;">${juego.titulo}</div>
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

// Forzar carga inicial sin trabas
filtrarYOrdenar();
