document.addEventListener('DOMContentLoaded', () => {
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

    // --- SISTEMA DE DIAPOSITIVAS ---
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

    // Filtro inteligente para silenciar por completo el parpadeo de la rueda
    let bloqueoScroll = false;
    window.addEventListener('wheel', (event) => {
        if (bloqueoScroll) return;
        
        if (event.deltaY > 50 && paginaActual < totalPaginas - 1) {
            bloqueoScroll = true;
            paginaActual++;
            actualizarPagina();
            setTimeout(() => { bloqueoScroll = false; }, 700); 
        } else if (event.deltaY < -50 && paginaActual > 0) {
            bloqueoScroll = true;
            paginaActual--;
            actualizarPagina();
            setTimeout(() => { bloqueoScroll = false; }, 700);
        }
    }, { passive: true });


    // --- BASE DE DATOS DE JUEGOS CON IMÁGENES ESTABLES Y SEGURAS ---
    const listaJuegos = [
        {
            titulo: "Pokémon Rojo Fuego",
            url: "https://www.retrogames.cc/embed/40237-pokemon-edicion-rojo-fuego-spain.html",
            portada: "https://images.uncyc.org/es/d/d4/Portada_Pokemon_Rojo_Fuego.jpg",
            jugados: 9500, fecha: 202401
        },
        {
            titulo: "Pokémon Zafiro",
            url: "https://www.retrogames.cc/embed/40238-pokemon-edicion-zafiro-spain.html",
            portada: "https://assets.pokemon.com/assets/cms2/img/video-games/video-games/pokemon_sapphire/pokemon_sapphire_boxart_225.jpg",
            jugados: 8700, fecha: 202601
        },
        {
            titulo: "Pokémon Negro",
            url: "https://www.retrogames.cc/embed/42602-pokemon-version-negra-spain.html",
            portada: "https://assets.pokemon.com/assets/cms2/img/video-games/video-games/pokemon_black/pokemon_black_boxart_225.jpg",
            jugados: 9100, fecha: 202602
        },
        {
            titulo: "Pokémon X",
            url: "https://www.retrogames.cc/embed/42700-pokemon-x-europe.html", 
            portada: "https://assets.pokemon.com/assets/cms2/img/video-games/video-games/pokemon_x/pokemon_x_boxart_225.jpg",
            jugados: 7500, fecha: 202603
        },
        {
            titulo: "Pokémon Randomlocke",
            url: "https://www.retrogames.cc/embed/41724-pokemon-rojo-fuego-randomized.html",
            portada: "https://images.uncyc.org/es/d/d4/Portada_Pokemon_Rojo_Fuego.jpg", 
            jugados: 15000, fecha: 202604
        },
        {
            titulo: "PokeRogue",
            url: "https://pokerogue.net",
            portada: "https://pokerogue.net/images/logo.png",
            jugados: 19000, fecha: 202605
        },
        {
            titulo: "Minecraft Classic",
            url: "https://classic.minecraft.net",
            portada: "https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover_art.png",
            jugados: 25000, fecha: 202606
        },
        {
            titulo: "Fortnite Pixels",
            url: "https://gameforge.com/en-US/littlegames/fortnite-clone/",
            portada: "https://cdn2.unrealengine.com/26br-vertical-art-keyart-epicgames-pack-3840x5120-d4cfd82137be.jpg",
            jugados: 12000, fecha: 202506
        },
        {
            titulo: "Rocket League 2D",
            url: "https://poki.com",
            portada: "https://cdn1.epicgames.com/offer/9773aaeb317646ba9f6f69bcaf7fdb85/EGS_RocketLeague_Psyonix_S1_VerticalRec_1200x1600_1200x1600-b6da16439add4876a8b1a80d463d1a84",
            jugados: 8000, fecha: 202512
        },
        {
            titulo: "Fall Guys Web",
            url: "https://poki.com",
            portada: "https://cdn2.unrealengine.com/fg-keyart-1920x1080-1920x1080-d021c33c3938.jpg",
            jugados: 14000, fecha: 202607
        },
        {
            titulo: "Brawl Stars Arena",
            url: "https://poki.com",
            portada: "https://images.poki.com/img/brawl_stars.png",
            jugados: 18000, fecha: 202608
        },
        {
            titulo: "Clash Royale Web",
            url: "https://poki.com",
            portada: "https://images.poki.com/img/brawl_stars.png", 
            jugados: 11000, fecha: 202609
        },
        {
            titulo: "Clash of Clans Web",
            url: "https://poki.com",
            portada: "https://images.poki.com/img/brawl_stars.png", 
            jugados: 9800, fecha: 202610
        },
        {
            titulo: "Geometry Dash",
            url: "https://poki.com",
            portada: "https://upload.wikimedia.org/wikipedia/en/3/3e/Geometry_Dash_Logo.png",
            jugados: 22000, fecha: 202611
        },
        {
            titulo: "Subway Surfers",
            url: "https://poki.com",
            portada: "https://images.poki.com/img/subway_surfers.png",
            jugados: 30000, fecha: 202412
        },
        {
            titulo: "Power Pamplona",
            url: "https://poki.com",
            portada: "https://images.poki.com/img/subway_surfers.png", 
            jugados: 6000, fecha: 202301
        },
        {
            titulo: "Rodeo Stampede",
            url: "https://poki.com",
            portada: "https://images.poki.com/img/rodeo_stampede.png",
            jugados: 13000, fecha: 202502
        },
        {
            titulo: "Inazuma Eleven GBA",
            url: "https://www.retrogames.cc/embed/41555-inazuma-eleven-spain.html",
            portada: "https://upload.wikimedia.org/wikipedia/en/3/3e/Geometry_Dash_Logo.png", 
            jugados: 10500, fecha: 202612
        },
        {
            titulo: "eFootball PES Retro",
            url: "https://retrogames.cc",
            portada: "https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover_art.png", 
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
                <img src="${juego.portada}" alt="${juego.titulo}" onerror="this.src='https://images.poki.com/img/subway_surfers.png'">
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

    // Dibujar el catálogo inmediatamente de forma ultra segura
    filtrarYOrdenar();
});
