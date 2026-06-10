// --- ELEMENTOS DE LA INTERFAZ ---
const gameFrame = document.getElementById('gameFrame');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const videoPlayer = document.getElementById('videoPlayer');
const gamesGrid = document.getElementById('gamesGrid');
const searchInput = document.getElementById('searchInput');
const sortInput = document.getElementById('sortInput');
const streamSection = document.getElementById('streamSection');

// Imagen base segura por si internet va lento
const portadaSegura = "https://unsplash.com";

// --- BASE DE DATOS DE JUEGOS CON NOMBRES EXACTOS ---
const listaJuegos = [
    {
        titulo: "Pokémon Rojo Fuego",
        url: "https://retrogames.cc",
        portada: "https://unsplash.com",
        jugados: 9500, fecha: 202401
    },
    {
        titulo: "Pokémon Zafiro",
        url: "https://retrogames.cc",
        portada: "https://unsplash.com",
        jugados: 8700, fecha: 202601
    },
    {
        titulo: "Pokémon Negro",
        url: "https://retrogames.cc",
        portada: "https://unsplash.com",
        jugados: 9100, fecha: 202602
    },
    {
        titulo: "Pokémon X",
        url: "https://retrogames.cc", 
        portada: "https://unsplash.com",
        jugados: 7500, fecha: 202603
    },
    {
        titulo: "Pokémon Randomlocke",
        url: "https://retrogames.cc",
        portada: "https://unsplash.com", 
        jugados: 15000, fecha: 202604
    },
    {
        titulo: "PokeRogue",
        url: "https://pokerogue.net",
        portada: "https://unsplash.com",
        jugados: 19000, fecha: 202605
    },
    {
        titulo: "Minecraft",
        url: "https://minecraft.net",
        portada: "https://unsplash.com",
        jugados: 25000, fecha: 202606
    },
    {
        titulo: "Fortnite",
        url: "https://gameforge.com",
        portada: "https://unsplash.com",
        jugados: 12000, fecha: 202506
    },
    {
        titulo: "Rocket League",
        url: "https://poki.com",
        portada: "https://unsplash.com",
        jugados: 8000, fecha: 202512
    },
    {
        titulo: "Fall Guys",
        url: "https://poki.com",
        portada: "https://unsplash.com",
        jugados: 14000, fecha: 202607
    },
    {
        titulo: "Brawl Stars",
        url: "https://poki.com",
        portada: "https://unsplash.com",
        jugados: 18000, fecha: 202608
    },
    {
        titulo: "Geometry Dash",
        url: "https://poki.com",
        portada: "https://unsplash.com",
        jugados: 22000, fecha: 202611
    },
    {
        titulo: "Subway Surfers",
        url: "https://poki.com",
        portada: "https://unsplash.com",
        jugados: 30000, fecha: 202412
    },
    {
        titulo: "Rodeo Stampede",
        url: "https://poki.com",
        portada: "https://unsplash.com",
        jugados: 13000, fecha: 202502
    },
    {
        titulo: "Inazuma Eleven GBA",
        url: "https://retrogames.cc",
        portada: "https://unsplash.com", 
        jugados: 10500, fecha: 202612
    },
    {
        titulo: "Subnautica",
        url: "https://poki.com",
        portada: "https://unsplash.com",
        jugados: 16500, fecha: 202613
    }
];

// --- RENDERIZADO DEL CATÁLOGO ---
function renderizarCatalogo(juegos) {
    if (!gamesGrid) return;
    gamesGrid.innerHTML = "";
    
    juegos.forEach(juego => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <img src="${juego.portada}" alt="${juego.titulo}" onerror="this.src='${portadaSegura}'">
            <div class="game-card-title">${juego.titulo}</div>
        `;
        
        card.addEventListener('click', () => {
            if (gameFrame) gameFrame.src = juego.url;
            if (streamSection) {
                streamSection.scrollIntoView({ behavior: 'smooth' });
            }
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

// Pintar catálogo inicial
filtrarYOrdenar();
