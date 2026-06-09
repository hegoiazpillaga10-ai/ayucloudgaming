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
    // Mueve la vista verticalmente simulando cambio de diapositiva
    presentationContainer.style.transform = `translateY(-${paginaActual * 100}%)`;
    pageIndicator.innerText = `${paginaActual + 1} / ${totalPaginas}`;
}

// Pasar páginas con los botones laterales
btnUp.addEventListener('click', () => {
    if (paginaActual > 0) {
        paginaActual--;
        actualizarPagina();
    }
});

btnDown.addEventListener('click', () => {
    if (paginaActual < totalPaginas - 1) {
        paginaActual++;
        actualizarPagina();
    }
});

// Cambiar de página de forma controlada al usar la rueda del ratón (Scroll limitado)
window.addEventListener('wheel', (event) => {
    if (event.deltaY > 50 && paginaActual < totalPaginas - 1) {
        paginaActual++;
        actualizarPagina();
    } else if (event.deltaY < -50 && paginaActual > 0) {
        paginaActual--;
        actualizarPagina();
    }
}, { passive: true });


// --- BASE DE DATOS DE JUEGOS Y PORTADAS ---
let listaJuegos = [
    {
        titulo: "Pokémon Rojo Fuego",
        url: "https://retrogames.cc",
        portada: "https://uncyc.org",
        jugados: 9500,
        fecha: 202401
    },
    {
        titulo: "Fortnite (Web Pixel)",
        url: "https://gameforge.com",
        portada: "https://unrealengine.com",
        jugados: 12000,
        fecha: 202506
    },
    {
        titulo: "Rocket League (2D)",
        url: "https://poki.com",
        portada: "https://epicgames.com",
        jugados: 8000,
        fecha: 202512
    },
    {
        titulo: "Asteroids Clásico",
        url: "https://playasteroids.com",
        portada: "https://wikimedia.org",
        jugados: 3000,
        fecha: 202305
    }
];

function renderizarCatalogo(juegos) {
    gamesGrid.innerHTML = "";
    juegos.forEach(juego => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <img src="${juego.portada}" alt="${juego.titulo}">
            <div class="game-card-title">${juego.titulo}</div>
        `;
        
        // Al clicar una portada, se inyecta el juego y pasa automáticamente a la Diapositiva 2 (Consola)
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

// --- PANTALLA COMPLETA ---
fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        videoPlayer.requestFullscreen().catch(err => {
            alert(`Error al activar pantalla completa: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
});

// Carga inicial
filtrarYOrdenar();
