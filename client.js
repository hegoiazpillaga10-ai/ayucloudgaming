const gamesGrid = document.getElementById('gamesGrid');
const searchInput = document.getElementById('searchInput');
const sortInput = document.getElementById('sortInput');

// --- BASE DE DATOS REVISADA LÍNEA POR LÍNEA ---
const listaJuegos = [
    {
        titulo: "Minecraft",
        url: "https://eaglercraft.com", // Servidor Java real multijugador 100% gratuito sin cuentas
        icono: "📦", color: "linear-gradient(135deg, #56ab2f, #a8ff78)",
        jugados: 25000, fecha: 202601
    },
    {
        titulo: "PokeRogue",
        url: "https://github.io", 
        icono: "⚔️", color: "linear-gradient(135deg, #f857a6, #ff5858)",
        jugados: 19000, fecha: 202602
    },
    {
        titulo: "Pokémon Rojo Fuego",
        url: "https://github.io",
        icono: "🔥", color: "linear-gradient(135deg, #ff4e50, #f9d423)",
        jugados: 9500, fecha: 202603
    },
    {
        titulo: "Pokémon Zafiro",
        url: "https://github.io",
        icono: "💧", color: "linear-gradient(135deg, #2193b0, #6dd5ed)",
        jugados: 8700, fecha: 202604
    },
    {
        titulo: "Pokémon Negro",
        url: "https://github.io",
        icono: "☯️", color: "linear-gradient(135deg, #333333, #dddddd)",
        jugados: 9100, fecha: 202605
    },
    {
        titulo: "Pokémon X",
        url: "https://github.io", 
        icono: "🔵", color: "linear-gradient(135deg, #00c6ff, #0072ff)",
        jugados: 7500, fecha: 202606
    },
    {
        titulo: "Pokémon Randomlocke",
        url: "https://github.io",
        icono: "🎲", color: "linear-gradient(135deg, #8e2de2, #4a00e0)",
        jugados: 15000, fecha: 202607
    },
    {
        titulo: "Pokelike",
        url: "https://github.io",
        icono: "🐉", color: "linear-gradient(135deg, #11998e, #38ef7d)",
        jugados: 14500, fecha: 202608
    },
    {
        titulo: "Fortnite",
        url: "https://github.io", // Servidor clon espejo mecánico original
        icono: "🪂", color: "linear-gradient(135deg, #833ab4, #fd1d1d)",
        jugados: 12000, fecha: 202506
    },
    {
        titulo: "Rocket League",
        url: "https://github.io", 
        icono: "🏎️", color: "linear-gradient(135deg, #00c6ff, #0072ff)",
        jugados: 8000, fecha: 202512
    },
    {
        titulo: "Fall Guys",
        url: "https://github.io", 
        icono: "👑", color: "linear-gradient(135deg, #ff007f, #ffaa00)",
        jugados: 14000, fecha: 202609
    },
    {
        titulo: "Brawl Stars",
        url: "https://github.io", 
        icono: "⭐", color: "linear-gradient(135deg, #fbc531, #4cd137)",
        jugados: 18000, fecha: 202610
    },
    {
        titulo: "Geometry Dash",
        url: "https://github.io",
        icono: "🟩", color: "linear-gradient(135deg, #0099f7, #f11712)",
        jugados: 22000, fecha: 202611
    },
    {
        titulo: "Subway Surfers",
        url: "https://github.io",
        icono: "🏃", color: "linear-gradient(135deg, #ff9900, #ff5500)",
        jugados: 30000, fecha: 202412
    },
    {
        titulo: "Rodeo Stampede",
        url: "https://github.io",
        icono: "🤠", color: "linear-gradient(135deg, #ffe259, #ffa751)",
        jugados: 13000, fecha: 202502
    },
    {
        titulo: "Inazuma Eleven GBA",
        url: "https://github.io",
        icono: "⚡", color: "linear-gradient(135deg, #f39c12, #d35400)",
        jugados: 10500, fecha: 202612
    },
    {
        titulo: "Subnautica",
        url: "https://github.io",
        icono: "🦈", color: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        jugados: 16500, fecha: 202613
    }
];

// --- RENDERIZADO ---
function renderizarCatalogo(juegos) {
    if (!gamesGrid) return;
    gamesGrid.innerHTML = "";
    
    juegos.forEach(juego => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <div class="game-card-art" style="background: ${juego.color};">${juego.icono}</div>
            <div class="game-card-title">${juego.titulo}</div>
        `;
        
        card.addEventListener('click', () => {
            window.open(juego.url, '_blank');
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

filtrarYOrdenar();
