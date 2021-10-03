// DECLARACIÓN DE VARIABLES A SER UTILIZADAS POSTERIORMENTE
let actualPlayer = 0;
let playerNumber;
let respuesta1;
let manoRepartida;
let movingPlayer;
let movingPlayerIndex;
let movingPlayerRow;
// creación objeto literal que contendrá la clave de cada jugador y el sub-array asignado
const manosArmadas = {};
let manoMezclada;
let minCartasRepartir;
let maxCartasRepartir;
let movimiento;
let isWinner;
let selectedSuspect, selectedWeapon, selectedRoom;
let solution;
let playerHand1,
    playerHand2,
    playerHand3,
    playerHand4,
    playerHand5,
    playerHand6;

let discoveredHand1,
    discoveredHand2,
    discoveredHand3,
    discoveredHand4,
    discoveredHand5,
    discoveredHand6;

let antesala;
let playerMovingPiece, positioningInBoard, targetedCell;
let accusePosition;
let newCoordenates;
let neighborCells = [];
let movementCount;
let accuseChecker;
let multipleCoordenates;
let actualAccusingRoom;
let accusedCoordenates;

let activePlayerPiece;

const totalPlayers = [];

const manosClasificadas = [];

let selectedTriade = [];
let selectedTarget;
let matchFind;
let possibleShowingCards = [];
let cardToShow, pickedCard;
const updatedManosArmadas = {};
const cartasDescubiertas = {};
let showingCounter = 0;
let cartaDetectada, holdingPlayer;
let thereIsMovement, blockedCell;
let playerWhoShowed;

/* MAPA DEL TABLERO: Como los jugadores van del 1 al 6 - y en el array de jugadores los index van del 0 al 5, me reservo los números del 1 al 6 para ubicar a los jugadores, quedando el número 0 indicando los casilleros disponibles y el número 7 aquellos que no lo están. Las habitaciones se identifican por los siguientes numeros:
Estudio: 8
Vestíbulo: 9
Sala: 10
Biblioteca: 11
Comedor: 12
Billar: 13
Invernadero: 14
Salón de Baile: 15
Cocina: 16

LAS FICHAS DE LOS JUGADORES VAN POR LOS SIGUIENTES NÚMEROS:
Escarlata: 1
Mostaza: 2
Blanco: 3
Verdi: 4
Azulino: 5
Moradillo: 6

*/
const movementBoard = [
    [7, 7, 7, 7, 7, 7, 7, 0, 7, 7, 7, 7, 7, 7, 7, 7, 1, 7, 7, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 7, 7, [8], 0, 0, 7, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7, 7],
    [7, 0, 0, 0, 0, 0, 0, 0, 0, [9], 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7, 7],
    [6, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7, 0, 0, [10], 7, 7, 7, 7, 7, 7],
    [
        7,
        7,
        7,
        7,
        7,
        7,
        0,
        0,
        0,
        7,
        7,
        [9],
        [9],
        7,
        7,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        7,
    ],
    [7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [7, 7, 7, 7, 7, 7, [11], 0, 0, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7],
    [7, 7, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 0, 0, 7, [12], 7, 7, 7, 7, 7, 7],
    [7, 7, 7, [11], 7, 7, 0, 0, 0, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7],
    [
        7,
        [13],
        7,
        7,
        7,
        7,
        0,
        0,
        0,
        7,
        7,
        7,
        7,
        7,
        0,
        0,
        [12],
        7,
        7,
        7,
        7,
        7,
        7,
        7,
    ],
    [7, 7, 7, 7, 7, 7, 0, 0, 0, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 7, 7, 0, 0, 0, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 7, [13], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7],
    [
        7,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        7,
        [15],
        7,
        7,
        7,
        7,
        [15],
        7,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
    ],
    [5, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 7, [16], 7, 7, 7, 7],
    [
        7,
        7,
        7,
        7,
        [14],
        0,
        0,
        0,
        [15],
        7,
        7,
        7,
        7,
        7,
        7,
        [15],
        0,
        0,
        7,
        7,
        7,
        7,
        7,
        7,
    ],
    [7, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 7, 7, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 7, 7, 7, 7, 7, 4, 7, 7, 7, 7, 3, 7, 7, 7, 7, 7, 7, 7, 7, 7],
];

// DECLARACIÓN DE MATRIX DEL TABLERO CON IDENTIFICADORES DE CELDA

const matrixBoard = [];
let gameData;

// -------- DOM: Captura de elementos ---------
const navbarIndex = document.querySelector(`.navbar-index`);
const navbarCollapse = navbarIndex.childNodes[5];
const navbarFix = document.querySelector(`.navbar-toggler`);
const startBtn = document.querySelector(`#start-btn`);
const otherStartBtn = document.querySelector(`#other-show-btn`);
const quitBtn = document.querySelector(`#quit-btn`);
const gameBtn = document.querySelector(`#game-btn`);
const inputBtn = document.querySelector(`#input-btn`);
const bannerContainer = document.querySelector(`#banner-container`);
const sectionGameDesc = document.querySelector(`#game-description-section`);
const gameBoard = document.querySelector(`#game-board`);
const gameMessages = document.querySelector(`#system-message-area-container`);
const dialogInterface = document.querySelector(`#dialog-interface-form`);
const dialogInterfaceInput = document.querySelector(`#dialog-interface-input`);
const diceBtn = document.querySelector(`#dice-btn`);
const cardHolder = document.querySelector(`#cardHolder`);
const suspectHolderRow =
    cardHolder.childNodes[1].childNodes[1].childNodes[1].childNodes[1]
        .childNodes[3];
const weaponsHolderRow =
    cardHolder.childNodes[1].childNodes[1].childNodes[1].childNodes[1]
        .childNodes[7];
const roomsHolderRow =
    cardHolder.childNodes[1].childNodes[1].childNodes[1].childNodes[1]
        .childNodes[11];
const accusationModal = document.querySelector(`#accusationModal`);
const accusationButton = document.querySelector(`#accusationButton`);
const suspectsAccContainer =
    accusationModal.childNodes[1].childNodes[1].childNodes[3].childNodes[1];
const weaponsAccContainer =
    accusationModal.childNodes[1].childNodes[1].childNodes[3].childNodes[3];
const roomsAccContainer =
    accusationModal.childNodes[1].childNodes[1].childNodes[3].childNodes[5];
const accusationCardSelector = document.querySelectorAll(
    `.accusation-card-item`
);
const guessedAccContainer =
    accusationModal.childNodes[1].childNodes[1].childNodes[3].childNodes[7];
const accusationResetBtn =
    accusationModal.childNodes[1].childNodes[1].childNodes[5].childNodes[3];
const accusationConfirmBtn =
    accusationModal.childNodes[1].childNodes[1].childNodes[5].childNodes[1];
const accusationCloseBtn =
    accusationModal.childNodes[1].childNodes[1].childNodes[1].childNodes[3];

const accusationTotalCards = document.querySelectorAll(`.accusation-card-item`);
const offCanvasBtn = document.querySelector(`.offcanvas-btn`);
const movementBoardTable =
    document.querySelectorAll(`.game-board-table`)[0].childNodes[1];
const movementAbleCells = document.querySelectorAll(`.able`);
const discoveredSuspects =
    cardHolder.children[1].children[0].children[0].children[0].children[0];
const discoveredWeapons =
    cardHolder.children[1].children[0].children[0].children[0].children[1];
const discoveredRooms =
    cardHolder.children[1].children[0].children[0].children[0].children[2];
const everyDiscovery = [suspectHolderRow, weaponsHolderRow, roomsHolderRow];
const offcanvasCloseBtn = document.querySelector(`.offcanvas-close-btn`);
const ownCardsBtn = document.querySelectorAll(`#ownCardsBtn`);
const shownCardsBtn = document.querySelectorAll(`#shownCardsBtn`);
const collapse1 = document.querySelector(`#multiCollapseExample1`);
const collapse2 = document.querySelector(`#multiCollapseExample2`);
const offcanvasTitle = document.querySelector(`#offcanvasExampleLabel`);
const offcanvasContainer = document.querySelector(`#offcanvasExample`);
const offcanvasPortrait = document.querySelector(`.offcanvas-img`);
const accusationModalTitle = document.querySelector(`.modal-title`);
let newGameBtnDOM, quitGameBtnDOM;

// CASILLEROS DE LAS ENTRADAS HABITACIONES
const salaDoor = document.querySelector(`#cell-6r`);
const vestibuloDoor1 = document.querySelector(`#cell-5j`);
const vestibuloDoor2 = document.querySelector(`#cell-7l`);
const vestibuloDoor3 = document.querySelector(`#cell-7m`);
const estudioDoor = document.querySelector(`#cell-4g`);
const bibliotecaDoor1 = document.querySelector(`#cell-9g`);
const bibliotecaDoor2 = document.querySelector(`#cell-11d`);
const comedorDoor1 = document.querySelector(`#cell-10r`);
const comedorDoor2 = document.querySelector(`#cell-13q`);
const billarDoor1 = document.querySelector(`#cell-13b`);
const billarDoor2 = document.querySelector(`#cell-16f`);
const baileDoor1 = document.querySelector(`#cell-20i`);
const baileDoor2 = document.querySelector(`#cell-18j`);
const baileDoor3 = document.querySelector(`#cell-18o`);
const baileDoor4 = document.querySelector(`#cell-20p`);
const invernaderoDoor = document.querySelector(`#cell-20e`);
const cocinaDoor = document.querySelector(`#cell-19t`);

// FICHAS DE JUGADORES
const fichaJugadorEscarlata = document.querySelector(`#escarlata-ficha`);
const fichaJugadorMostaza = document.querySelector(`#mostaza-ficha`);
const fichaJugadorBlanco = document.querySelector(`#blanco-ficha`);
const fichaJugadorVerdi = document.querySelector(`#verdi-ficha`);
const fichaJugadorAzulino = document.querySelector(`#azulino-ficha`);
const fichaJugadorMoradillo = document.querySelector(`#moradillo-ficha`);

const systemMsgsText = $(`#systemMsgText`);

// PETICIÓN AJAX: UTILIZACIÓN FETCH API PARA OBTENER MIS ESTRUCTURAS DE DATOS DE ARCHIVO JSON - Parseo de la response
const dataFetch = async () => {
    try {
        recoveredData = await fetch("js/data.json");
        recoveredParsedData = await recoveredData.json();
        console.log(recoveredParsedData);
        return recoveredParsedData;
    } catch (error) {
        console.error(error);
    }
};
// Guardamos las data structures en una variable
const retrieveGameData = async () => {
    gameData = await dataFetch();
};

let personajesData,
    armasData,
    lugaresData,
    cartasData,
    colorsData,
    offcanvasData;

// DECLARACIÓN DE FUNCIONES QUE ESTÁN RELACIONADAS A MOSTRAR ELEMENTOS DE LA INTERFAZ
const showGame = (e) => {
    /*  e.preventDefault(); */
    gameBoard.classList.remove("hidden-game-container");
    gameBoard.classList.add("game-area-container");
    bannerContainer.classList.add("hidden-game-container");
    bannerContainer.classList.remove("banner-container");
    sectionGameDesc.classList.add("hidden-game-container");
    sectionGameDesc.classList.remove("banner-container");
    // asignamos cada uno de los elementos de la variable en otras variables para su posterior utilización
    retrieveGameData().then(() => {
        console.log(gameData);
        personajesData = gameData.personajes;
        armasData = gameData.armas;
        lugaresData = gameData.lugares;
        cartasData = gameData.cartas;
        colorsData = gameData.colors;
        offcanvasData = gameData.offcanvas;
        // console.log(personajes);
        onceReady();
    });
    // Aplicación de animaciones con Jquery
    $(gameBoard).delay(0).fadeOut(10).delay(100).fadeIn(500);
    setTimeout(() => {
        gameBtn.focus();
    }, 600);
};

startBtn.addEventListener("click", showGame);

// AJUSTE DEL CÓDIGO DEL NAVBAR PARA QUE SE VEA EL HAMBURGUER MENU
const navBarToggler = (e) => {
    if (!navbarCollapse.classList.contains("show")) {
        navbarCollapse.classList.add("collapsing");
        navbarCollapse.style = `height: 0em; transition: height 300ms ease; position: initial`;
        $(`#navbarLinks`).css("display", "none");
        navbarCollapse.classList.remove("collapse");
        if (screen.width > 767) {
            $(navbarCollapse).animate(
                {
                    height: "10em",
                    opacity: "1",
                },
                50,
                () => {
                    $(`#navbarLinks`).fadeIn(700);
                }
            );
        } else if (screen.width < 767) {
            $(navbarCollapse).animate(
                {
                    height: "2.5em",
                    opacity: "1",
                },
                50,
                () => {
                    $(`#navbarLinks`).fadeIn(700);
                }
            );
        }
        setTimeout((e) => {
            navbarCollapse.classList.remove("collapsing");
            navbarCollapse.classList.add("show");
            navbarCollapse.classList.add("collapse");
        }, 20);
    } else {
        setTimeout((e) => {
            // navbarCollapse.classList.add("collapsing");

            setTimeout(() => {
                navbarCollapse.classList.remove("show");
                navbarCollapse.classList.add("collapse");
            }, 400);
            // navbarCollapse.style = `height: 100%;  transition: height 300ms ease-in;`;
            $(navbarCollapse).animate(
                {
                    height: "0em",
                    opacity: "0",
                },
                100,
                () => {
                    $(`#navbarLinks`).fadeOut(700);
                }
            );
        }, 20);
    }
};
// ANIMACIONES CON JQUERY AL MODIFICAR LA PANTALLA
window.addEventListener("resize", () => {
    if (screen.width >= 992) {
        console.log(`detectando el screen mayor `);

        $(`#navbarLinks`).fadeIn(700);
        $(`#navbarLinks`).css("display", "flex");
        $(`#navbarNav`).css("opacity", "1");
    }
});

navbarFix.addEventListener("click", navBarToggler);

// FUNCIÓN ASINCRÓNICA CON EL JUEGO - Sirve para la espera del fetch de las estructuras de datos, para que una vez resuelto se ejecute el juego, y no antes.
const onceReady = async () => {
    console.log(`Fetched Data Correctly - Ready for game`);

    const hideGame = (e) => {
        e.preventDefault();
        gameBoard.classList.add("hidden-game-container");
        gameBoard.classList.remove("game-area-container");
        bannerContainer.classList.remove("hidden-game-container");
        bannerContainer.classList.add("banner-container");
        sectionGameDesc.classList.remove("hidden-game-container");
        sectionGameDesc.classList.add("banner-container");
    };

    const startGame = (e) => {
        e.preventDefault();
        gameMessages.children[0].innerText = `Ingrese el número de jugadores:`;
        dialogInterface.classList.remove("dialog-interface-hidden");
        dialogInterface.classList.add("dialog-interface-container");
        gameBtn.setAttribute("style", "display: none");
        dialogInterfaceInput.focus();
    };

    const hideInterface = (e) => {
        gameMessages.children[0].innerText = ``;
        dialogInterface.classList.add("dialog-interface-hidden");
        dialogInterface.classList.remove("dialog-interface-container");
    };

    const showMessage = (message) => {
        gameMessages.children[0].innerText = message;
        $(`#systemMsgText`).fadeOut(1).delay(10).fadeIn(700);
    };

    const showInputReceiver = (e) => {
        dialogInterface.classList.remove("dialog-interface-hidden");
        dialogInterface.classList.add("dialog-interface-container");
    };

    const showDiceBtn = (e) => {
        diceBtn.classList.remove("dialog-interface-hidden");
        diceBtn.classList.add("dialog-interface-container");
        $(diceBtn).fadeOut(1).delay(10).fadeIn(1200);
    };

    const hideDiceBtn = (e) => {
        diceBtn.classList.add("dialog-interface-hidden");
        diceBtn.classList.remove("dialog-interface-container");
    };

    const showAccBtn = (e) => {
        accusationButton.classList.remove("hidden-accusation-button");
        accusationButton.classList.add("accusation-button");
        $(accusationButton).fadeOut(1).delay(2000).fadeIn(600);
    };

    const hideAccBtn = (e) => {
        accusationButton.classList.add("hidden-accusation-button");
        accusationButton.classList.remove("accusation-button");
    };

    otherStartBtn.addEventListener("click", showGame);
    quitBtn.addEventListener("click", () => {
        window.location.reload();
    });
    gameBtn.addEventListener("click", startGame);
    let reloading = localStorage.getItem("reloading");
    if (reloading) {
        gameBtn.click();
        localStorage.removeItem("reloading");
    }

    // FIN DECLARACIÓN DE FUNCIONES QUE ESTÁN RELACIONADAS A MOSTRAR ELEMENTOS DE LA INTERFAZ

    /* ====================  COMIENZA EL JUEGO  ==================== */

    // determinando cantidad de jugadores
    dialogInterface.addEventListener("submit", (evt) => {
        evt.preventDefault();
        if (!playerNumber) {
            console.log(evt.target[0].value);
            playerNumber = evt.target[0].value;
            if (+playerNumber && playerNumber > 1 && playerNumber <= 6) {
                offCanvasBtn.classList.remove(`hide-offcanvas-btn`);
                hideInterface();
                runGame();
                turnDynamic(playerNumber);
                evt.target[0].value = "";
            } else {
                gameMessages.children[0].innerText = `Error, el dato ingresado no es una cantidad válida. 
        Intenta nuevamente eligiendo un número del 2 al 6:`;
                evt.target[0].value = "";
                playerNumber = undefined;
            }
        }
        return playerNumber;
    });

    // Cartel de Bienvenida al juego
    if (gameMessages.children[0].innerText === "") {
        gameMessages.children[0].innerText = `¡Bienvenido a The Clue!
        En esta casa se ha cometido un crimen. Deberás recorrer la casa, investigando y hallando pistas que te ayuden a aclarar lo sucedido ¡Éxitos en tu búsqueda!`;
    }

    // Función de animación del dado
    const rollingAnimation = (counter) => {
        let rotation = 120;
        let processedcounter = counter;
        console.log(`Ejecutando animación del dado ${processedcounter}`);
        $(diceBtn)
            .css("transition", "all ease 300ms")
            .css("transform", `rotate(${rotation * processedcounter}deg)`);
        console.log(rotation * processedcounter);
        if (processedcounter <= 10) {
            processedcounter += 1;
            console.log(`Volviendo a ejecutar para que gire`);
            setTimeout(() => {
                rollingAnimation(processedcounter);
            }, 50);
        } else {
            setTimeout(() => {
                $(diceBtn).fadeOut(300);
                $(diceBtn)
                    .css("transition", "all ease 300ms")
                    .css("transform", `rotate(0deg)`);
            }, 10);
        }
    };

    // FUNCIÓN PARA DETERMINAR EL MOVIMIENTO DEL JUGADOR
    const rollDice = () => {
        let i = 0;
        rollingAnimation(i);
        movimiento = Math.ceil(Math.random() * 6);
        setTimeout(() => {
            showMessage(`Tiraste un ${movimiento}`);
        }, 100);
        return playerMovement(movimiento, actualPlayer);
        /* return enoughToAccuse(movimiento); */
    };

    // FUNCIÓN QUE EXPLICITA EL TURNO DE QUÉ JUGADOR ES, SIRVE DE CALLBACK, Y DISPONIBILIZA EL BOTÓN PARA ECHAR LOS DADOS
    const turn = (player) => {
        setTimeout(() => {
            showMessage(`Turno Jugador ${player}`);
        }, 1500);
        setTimeout(() => {
            activePlayerPiece.focus();
        }, 2600);
        setTimeout(() => {
            showMessage(`¡Tira los dados!`);
        }, 3000);
        setTimeout(() => {
            showDiceBtn();
        }, 3000);
        hideInterface();
    };

    // Personalización del apartado del jugador en donde se muestran las cartas del mismo
    const personalizePlayerOffcanvas = (player) => {
        offCanvasBtn.addEventListener("focus", () => {
            offCanvasBtn.style.left = "";
        });
        switch (player + 1) {
            case 1:
                for (let i = 1; i <= 6; i += 1) {
                    offCanvasBtn.classList.remove(`offcanvas-btn-player${i}`);
                }
                offCanvasBtn.classList.add(`offcanvas-btn-player1`);
                setTimeout(() => {
                    offCanvasBtn.focus();
                }, 1500);
                setTimeout(() => {
                    offCanvasBtn.blur();
                }, 2500);
                offCanvasBtn.innerText = "Srita. Escarlata";
                offcanvasTitle.innerHTML = "Srita. Escarlata";
                offcanvasContainer.classList.remove(
                    `offcanvas-player${totalPlayers.length}`
                );
                offcanvasContainer.classList.add("offcanvas-player1");
                offcanvasTitle.classList.remove(
                    `offcanvas-title-${totalPlayers.length}`
                );
                offcanvasTitle.classList.add("offcanvas-title-1");
                offcanvasCloseBtn.style.backgroundColor = `${
                    colors[actualPlayer + 1]
                }`;
                offcanvasCloseBtn.addEventListener("mouseover", () => {
                    offcanvasCloseBtn.style.filter = `brightness(180%) grayscale(50%)`;
                });
                offcanvasCloseBtn.addEventListener("mouseout", () => {
                    offcanvasCloseBtn.style.filter = `brightness(100%)`;
                });
                offcanvasPortrait.setAttribute(
                    "src",
                    `${offcanvasPlayerImages[actualPlayer + 1]}`
                );

                break;
            case 2:
                for (let i = 1; i <= 6; i += 1) {
                    offCanvasBtn.classList.remove(`offcanvas-btn-player${i}`);
                }
                offCanvasBtn.classList.add(`offcanvas-btn-player2`);
                setTimeout(() => {
                    offCanvasBtn.focus();
                }, 1500);
                setTimeout(() => {
                    offCanvasBtn.blur();
                }, 2500);
                offCanvasBtn.innerText = "Cnel. Mostaza";
                offcanvasTitle.innerHTML = "Cnel. Mostaza";
                offcanvasContainer.classList.remove("offcanvas-player1");
                offcanvasContainer.classList.add("offcanvas-player2");
                offcanvasTitle.classList.remove("offcanvas-title-1");
                offcanvasTitle.classList.add("offcanvas-title-2");
                offcanvasCloseBtn.style.backgroundColor = `${
                    colors[actualPlayer + 1]
                }`;
                offcanvasCloseBtn.addEventListener("mouseover", () => {
                    offcanvasCloseBtn.style.filter = `brightness(80%) grayscale(50%)`;
                });
                offcanvasCloseBtn.addEventListener("mouseout", () => {
                    offcanvasCloseBtn.style.filter = `brightness(100%)`;
                });
                offcanvasPortrait.setAttribute(
                    "src",
                    `${offcanvasPlayerImages[actualPlayer + 1]}`
                );

                break;
            case 3:
                for (let i = 1; i <= 6; i += 1) {
                    offCanvasBtn.classList.remove(`offcanvas-btn-player${i}`);
                }
                offCanvasBtn.classList.add(`offcanvas-btn-player3`);
                setTimeout(() => {
                    offCanvasBtn.focus();
                }, 1500);
                setTimeout(() => {
                    offCanvasBtn.blur();
                }, 2500);
                offCanvasBtn.innerText = "Sra. Blanco";
                offcanvasTitle.innerHTML = "Sra. Blanco";
                offcanvasContainer.classList.remove("offcanvas-player2");
                offcanvasContainer.classList.add("offcanvas-player3");
                offcanvasTitle.classList.remove("offcanvas-title-2");
                offcanvasTitle.classList.add("offcanvas-title-3");
                offcanvasCloseBtn.style.backgroundColor = `${
                    colors[actualPlayer + 1]
                }`;
                offcanvasCloseBtn.addEventListener("mouseover", () => {
                    offcanvasCloseBtn.style.filter = `brightness(180%) grayscale(50%)`;
                });
                offcanvasCloseBtn.addEventListener("mouseout", () => {
                    offcanvasCloseBtn.style.filter = `brightness(100%)`;
                });
                offcanvasPortrait.setAttribute(
                    "src",
                    `${offcanvasPlayerImages[actualPlayer + 1]}`
                );

                break;
            case 4:
                for (let i = 1; i <= 6; i += 1) {
                    offCanvasBtn.classList.remove(`offcanvas-btn-player${i}`);
                }
                offCanvasBtn.classList.add(`offcanvas-btn-player4`);
                setTimeout(() => {
                    offCanvasBtn.focus();
                }, 1500);
                setTimeout(() => {
                    offCanvasBtn.blur();
                }, 2500);
                offCanvasBtn.innerText = "Sr. Verdi";
                offcanvasTitle.innerHTML = "Sr. Verdi";
                offcanvasContainer.classList.remove("offcanvas-player3");
                offcanvasContainer.classList.add("offcanvas-player4");
                offcanvasTitle.classList.remove("offcanvas-title-3");
                offcanvasTitle.classList.add("offcanvas-title-4");
                offcanvasCloseBtn.style.backgroundColor = `${
                    colors[actualPlayer + 1]
                }`;
                offcanvasPortrait.setAttribute(
                    "src",
                    `${offcanvasPlayerImages[actualPlayer + 1]}`
                );

                break;
            case 5:
                for (let i = 1; i <= 6; i += 1) {
                    offCanvasBtn.classList.remove(`offcanvas-btn-player${i}`);
                }
                offCanvasBtn.classList.add(`offcanvas-btn-player5`);
                setTimeout(() => {
                    offCanvasBtn.focus();
                }, 1500);
                setTimeout(() => {
                    offCanvasBtn.blur();
                }, 2500);
                offCanvasBtn.innerText = "Sra. Azulino";
                offcanvasTitle.innerHTML = "Sra. Azulino";
                offcanvasContainer.classList.remove("offcanvas-player4");
                offcanvasContainer.classList.add("offcanvas-player5");
                offcanvasTitle.classList.remove("offcanvas-title-4");
                offcanvasTitle.classList.add("offcanvas-title-5");
                offcanvasCloseBtn.style.backgroundColor = `${
                    colors[actualPlayer + 1]
                }`;
                offcanvasPortrait.setAttribute(
                    "src",
                    `${offcanvasPlayerImages[actualPlayer + 1]}`
                );

                break;
            case 6:
                for (let i = 1; i <= 6; i += 1) {
                    offCanvasBtn.classList.remove(`offcanvas-btn-player${i}`);
                }
                offCanvasBtn.classList.add(`offcanvas-btn-player6`);
                setTimeout(() => {
                    offCanvasBtn.focus();
                }, 1500);
                setTimeout(() => {
                    offCanvasBtn.blur();
                }, 2500);
                offCanvasBtn.innerText = "Prof. Moradillo";
                offcanvasTitle.innerHTML = "Prof. Moradillo";
                offcanvasContainer.classList.remove("offcanvas-player5");
                offcanvasContainer.classList.add("offcanvas-player6");
                offcanvasTitle.classList.remove("offcanvas-title-5");
                offcanvasTitle.classList.add("offcanvas-title-6");
                offcanvasCloseBtn.style.backgroundColor = `${
                    colors[actualPlayer + 1]
                }`;
                offcanvasPortrait.setAttribute(
                    "src",
                    `${offcanvasPlayerImages[actualPlayer + 1]}`
                );

                break;
        }
        offCanvasBtn.style.minWidth = `${
            getTextWidth(offCanvasBtn.innerText, getCanvasFontSize()) + 40
        }px`;
        offCanvasBtn.addEventListener("mouseout", () => {
            offCanvasBtn.style.left = `-${getTextWidth(
                offCanvasBtn.innerText,
                getCanvasFontSize()
            )}px`;
        });
        offCanvasBtn.addEventListener("blur", () => {
            offCanvasBtn.style.left = `-${getTextWidth(
                offCanvasBtn.innerText,
                getCanvasFontSize()
            )}px`;
        });
        offCanvasBtn.addEventListener("mouseover", () => {
            offCanvasBtn.style.left = `-1em`;
        });
        // Analiza las cartas del jugador, tanto las propias como las descubiertas y determina a qué mano correspoden. Luego añade las clases CSS con el border del color del jugador a quien corresponde
        let cartaDetectada, holdingPlayer;
        for (let row in everyDiscovery) {
            console.dir(everyDiscovery[row]);
            for (let card in everyDiscovery[row].children) {
                console.log(card);
                console.dir(everyDiscovery[row].children[card]);
                for (let image in cartas) {
                    if (everyDiscovery[row].children[card].alt === image) {
                        cartaDetectada = image.toUpperCase();
                        console.log(cartaDetectada);
                        for (let hand in manosArmadas) {
                            for (let category of manosArmadas[hand]) {
                                for (let item of category) {
                                    if (item === cartaDetectada) {
                                        holdingPlayer = hand;
                                        if (
                                            everyDiscovery[row].children[card]
                                                .classList.length < 2
                                        ) {
                                            switch (+holdingPlayer) {
                                                case 1:
                                                    console.log(
                                                        `Es de ESCARLATA`
                                                    );
                                                    everyDiscovery[
                                                        row
                                                    ].children[
                                                        card
                                                    ].classList.add(
                                                        "carta-escarlata"
                                                    );
                                                    break;
                                                case 2:
                                                    console.log(
                                                        `Es de MOSTAZA`
                                                    );
                                                    everyDiscovery[
                                                        row
                                                    ].children[
                                                        card
                                                    ].classList.add(
                                                        "carta-mostaza"
                                                    );
                                                    break;
                                                case 3:
                                                    console.log(`Es de BLANCO`);
                                                    everyDiscovery[
                                                        row
                                                    ].children[
                                                        card
                                                    ].classList.add(
                                                        "carta-blanco"
                                                    );
                                                    break;
                                                case 4:
                                                    console.log(`Es de VERDI`);
                                                    everyDiscovery[
                                                        row
                                                    ].children[
                                                        card
                                                    ].classList.add(
                                                        "carta-verdi"
                                                    );
                                                    break;
                                                case 5:
                                                    console.log(
                                                        `Es de AZULINO`
                                                    );
                                                    everyDiscovery[
                                                        row
                                                    ].children[
                                                        card
                                                    ].classList.add(
                                                        "carta-azulino"
                                                    );
                                                    break;
                                                case 6:
                                                    console.log(
                                                        `Es de MORADILLO`
                                                    );
                                                    everyDiscovery[
                                                        row
                                                    ].children[
                                                        card
                                                    ].classList.add(
                                                        "carta-moradillo"
                                                    );
                                                    break;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    isEnoughtToAccuse = diceBtn.addEventListener("click", rollDice);

    // Checkmark para indicar que ya se anunció la cantidad de jugadores por interfaz
    let playerNumberConfirmation;

    // FUNCIÓN CLAVE, CONTIENE TODA LA DINÁMICA DE TURNOS DEL JUEGO Y ARTICULA EL CAMBIO DE JUGADOR EN JUGADOR
    const turnDynamic = (playerNumber) => {
        /* console.log("está llegando antes del switch"); */
        switch (+playerNumber) {
            case 2:
                if (!playerNumberConfirmation) {
                    setTimeout(() => {
                        showMessage(`Dos jugadores`);
                    }, 300);
                    playerNumberConfirmation = true;
                }
                // Turno Jugador 1
                if (actualPlayer === 0) {
                    suspectHolderRow.innerHTML = ``;
                    weaponsHolderRow.innerHTML = ``;
                    roomsHolderRow.innerHTML = ``;
                    discoveredSuspects.innerHTML = ``;
                    discoveredWeapons.innerHTML = ``;
                    discoveredRooms.innerHTML = ``;
                    turn(1);
                    if (!playerHand1) {
                        console.log(`Creando PlayerHand1`);
                        playerHand1 = readyForPrint(actualPlayer, manosArmadas);
                        console.table(`${playerHand1}`);
                        playerHand1 = JSON.stringify(playerHand1);
                        console.log(playerHand1);
                        sessionStorage.setItem("playerHand1", playerHand1);
                    } else {
                        console.log(`Playerhand 1 ya fue creada`);
                    }
                    console.log(`LOGUEANDO DISCOVERED HAND`);
                    discoveredHand1 = readyForPrint(
                        actualPlayer,
                        cartasDescubiertas
                    );
                    console.table(discoveredHand1);
                    discoveredHand1 = JSON.stringify(discoveredHand1);
                    console.log(discoveredHand1);
                    sessionStorage.setItem("discoveredHand1", discoveredHand1);
                    activePlayerPiece = fichaJugadorEscarlata;
                    printCards(actualPlayer);
                    greyscaleCards(actualPlayer);
                    personalizePlayerOffcanvas(actualPlayer);
                } else if (actualPlayer === 1) {
                    suspectHolderRow.innerHTML = ``;
                    weaponsHolderRow.innerHTML = ``;
                    roomsHolderRow.innerHTML = ``;
                    discoveredSuspects.innerHTML = ``;
                    discoveredWeapons.innerHTML = ``;
                    discoveredRooms.innerHTML = ``;
                    turn(2);
                    if (!playerHand2) {
                        console.log(`Creando PlayerHand2`);
                        playerHand2 = readyForPrint(actualPlayer, manosArmadas);
                        /* console.table(`${playerHand2}`); */
                        playerHand2 = JSON.stringify(playerHand2);
                        /*  console.log(playerHand2); */
                        sessionStorage.setItem("playerHand2", playerHand2);
                    } else {
                        console.log(`Playerhand 2 ya fue creada`);
                    }
                    console.log(`LOGUEANDO DISCOVERED HAND`);
                    discoveredHand2 = readyForPrint(
                        actualPlayer,
                        cartasDescubiertas
                    );
                    console.table(discoveredHand2);
                    discoveredHand2 = JSON.stringify(discoveredHand2);
                    console.log(discoveredHand2);
                    sessionStorage.setItem("discoveredHand2", discoveredHand2);
                    activePlayerPiece = fichaJugadorMostaza;
                    printCards(actualPlayer);
                    greyscaleCards(actualPlayer);
                    personalizePlayerOffcanvas(actualPlayer);
                }

                break;
            case 3:
                if (!playerNumberConfirmation) {
                    setTimeout(() => {
                        showMessage(`Tres jugadores`);
                    }, 300);
                    playerNumberConfirmation = true;
                }
                // Turno Jugador 1
                /* let someOneWon = false; */
                if (actualPlayer === 0) {
                    suspectHolderRow.innerHTML = ``;
                    weaponsHolderRow.innerHTML = ``;
                    roomsHolderRow.innerHTML = ``;
                    discoveredSuspects.innerHTML = ``;
                    discoveredWeapons.innerHTML = ``;
                    discoveredRooms.innerHTML = ``;
                    turn(1);
                    if (!playerHand1) {
                        console.log(`Creando PlayerHand1`);
                        playerHand1 = readyForPrint(actualPlayer, manosArmadas);
                        /* console.table(`${playerHand1}`); */
                        playerHand1 = JSON.stringify(playerHand1);
                        /*  console.log(playerHand1); */
                        sessionStorage.setItem("playerHand1", playerHand1);
                    } else {
                        console.log(`Playerhand 1 ya fue creada`);
                    }
                    console.log(`LOGUEANDO DISCOVERED HAND`);
                    discoveredHand1 = readyForPrint(
                        actualPlayer,
                        cartasDescubiertas
                    );
                    console.table(discoveredHand1);
                    discoveredHand1 = JSON.stringify(discoveredHand1);
                    console.log(discoveredHand1);
                    sessionStorage.setItem("discoveredHand1", discoveredHand1);
                    activePlayerPiece = fichaJugadorEscarlata;
                    printCards(actualPlayer);
                    greyscaleCards(actualPlayer);
                    personalizePlayerOffcanvas(actualPlayer);
                } else if (actualPlayer === 1) {
                    suspectHolderRow.innerHTML = ``;
                    weaponsHolderRow.innerHTML = ``;
                    roomsHolderRow.innerHTML = ``;
                    discoveredSuspects.innerHTML = ``;
                    discoveredWeapons.innerHTML = ``;
                    discoveredRooms.innerHTML = ``;
                    turn(2);
                    if (!playerHand2) {
                        console.log(`Creando PlayerHand2`);
                        playerHand2 = readyForPrint(actualPlayer, manosArmadas);
                        /* console.table(`${playerHand2}`); */
                        playerHand2 = JSON.stringify(playerHand2);
                        /* console.log(playerHand2); */
                        sessionStorage.setItem("playerHand2", playerHand2);
                    } else {
                        console.log(`Playerhand 2 ya fue creada`);
                    }
                    console.log(`LOGUEANDO DISCOVERED HAND`);
                    discoveredHand2 = readyForPrint(
                        actualPlayer,
                        cartasDescubiertas
                    );
                    console.table(discoveredHand2);
                    discoveredHand2 = JSON.stringify(discoveredHand2);
                    console.log(discoveredHand2);
                    sessionStorage.setItem("discoveredHand2", discoveredHand2);
                    activePlayerPiece = fichaJugadorMostaza;
                    printCards(actualPlayer);
                    greyscaleCards(actualPlayer);
                    personalizePlayerOffcanvas(actualPlayer);
                } else if (actualPlayer === 2) {
                    suspectHolderRow.innerHTML = ``;
                    weaponsHolderRow.innerHTML = ``;
                    roomsHolderRow.innerHTML = ``;
                    discoveredSuspects.innerHTML = ``;
                    discoveredWeapons.innerHTML = ``;
                    discoveredRooms.innerHTML = ``;
                    turn(3);
                    if (!playerHand3) {
                        console.log(`Creando PlayerHand3`);
                        playerHand3 = readyForPrint(actualPlayer, manosArmadas);
                        /*  console.table(`${playerHand3}`); */
                        playerHand3 = JSON.stringify(playerHand3);
                        /* console.log(playerHand3); */
                        sessionStorage.setItem("playerHand3", playerHand3);
                    } else {
                        console.log(`Playerhand 3 ya fue creada`);
                    }
                    console.log(`LOGUEANDO DISCOVERED HAND`);
                    discoveredHand3 = readyForPrint(
                        actualPlayer,
                        cartasDescubiertas
                    );
                    console.table(discoveredHand3);
                    discoveredHand3 = JSON.stringify(discoveredHand3);
                    console.log(discoveredHand3);
                    sessionStorage.setItem("discoveredHand3", discoveredHand3);
                    activePlayerPiece = fichaJugadorBlanco;
                    printCards(actualPlayer);
                    greyscaleCards(actualPlayer);
                    personalizePlayerOffcanvas(actualPlayer);
                }
                break;
            case 4:
                if (!playerNumberConfirmation) {
                    setTimeout(() => {
                        showMessage(`Cuatro jugadores`);
                    }, 300);
                    playerNumberConfirmation = true;
                }
                // Turno Jugador 1
                /* let someOneWon = false; */
                if (actualPlayer === 0) {
                    suspectHolderRow.innerHTML = ``;
                    weaponsHolderRow.innerHTML = ``;
                    roomsHolderRow.innerHTML = ``;
                    discoveredSuspects.innerHTML = ``;
                    discoveredWeapons.innerHTML = ``;
                    discoveredRooms.innerHTML = ``;
                    turn(1);
                    if (!playerHand1) {
                        console.log(`Creando PlayerHand1`);
                        playerHand1 = readyForPrint(actualPlayer, manosArmadas);
                        /* console.table(`${playerHand1}`); */
                        playerHand1 = JSON.stringify(playerHand1);
                        /* console.log(playerHand1); */
                        sessionStorage.setItem("playerHand1", playerHand1);
                    } else {
                        console.log(`Playerhand 1 ya fue creada`);
                    }
                    console.log(`LOGUEANDO DISCOVERED HAND`);
                    discoveredHand1 = readyForPrint(
                        actualPlayer,
                        cartasDescubiertas
                    );
                    console.table(discoveredHand1);
                    discoveredHand1 = JSON.stringify(discoveredHand1);
                    console.log(discoveredHand1);
                    sessionStorage.setItem("discoveredHand1", discoveredHand1);
                    activePlayerPiece = fichaJugadorEscarlata;
                    printCards(actualPlayer);
                    greyscaleCards(actualPlayer);
                    personalizePlayerOffcanvas(actualPlayer);
                } else if (actualPlayer === 1) {
                    suspectHolderRow.innerHTML = ``;
                    weaponsHolderRow.innerHTML = ``;
                    roomsHolderRow.innerHTML = ``;
                    discoveredSuspects.innerHTML = ``;
                    discoveredWeapons.innerHTML = ``;
                    discoveredRooms.innerHTML = ``;
                    turn(2);
                    if (!playerHand2) {
                        console.log(`Creando PlayerHand2`);
                        playerHand2 = readyForPrint(actualPlayer, manosArmadas);
                        /* console.table(`${playerHand2}`); */
                        playerHand2 = JSON.stringify(playerHand2);
                        /*   console.log(playerHand2); */
                        sessionStorage.setItem("playerHand2", playerHand2);
                    } else {
                        console.log(`Playerhand 2 ya fue creada`);
                    }
                    console.log(`LOGUEANDO DISCOVERED HAND`);
                    discoveredHand2 = readyForPrint(
                        actualPlayer,
                        cartasDescubiertas
                    );
                    console.table(discoveredHand2);
                    discoveredHand2 = JSON.stringify(discoveredHand2);
                    console.log(discoveredHand2);
                    sessionStorage.setItem("discoveredHand2", discoveredHand2);
                    activePlayerPiece = fichaJugadorMostaza;
                    printCards(actualPlayer);
                    greyscaleCards(actualPlayer);
                    personalizePlayerOffcanvas(actualPlayer);
                } else if (actualPlayer === 2) {
                    suspectHolderRow.innerHTML = ``;
                    weaponsHolderRow.innerHTML = ``;
                    roomsHolderRow.innerHTML = ``;
                    discoveredSuspects.innerHTML = ``;
                    discoveredWeapons.innerHTML = ``;
                    discoveredRooms.innerHTML = ``;
                    turn(3);
                    if (!playerHand3) {
                        console.log(`Creando PlayerHand3`);
                        playerHand3 = readyForPrint(actualPlayer, manosArmadas);
                        /* console.table(`${playerHand3}`); */
                        playerHand3 = JSON.stringify(playerHand3);
                        /* console.log(playerHand3); */
                        sessionStorage.setItem("playerHand3", playerHand3);
                    } else {
                        console.log(`Playerhand 3 ya fue creada`);
                    }
                    console.log(`LOGUEANDO DISCOVERED HAND`);
                    discoveredHand3 = readyForPrint(
                        actualPlayer,
                        cartasDescubiertas
                    );
                    console.table(discoveredHand3);
                    discoveredHand3 = JSON.stringify(discoveredHand3);
                    console.log(discoveredHand3);
                    sessionStorage.setItem("discoveredHand3", discoveredHand3);
                    activePlayerPiece = fichaJugadorBlanco;
                    printCards(actualPlayer);
                    greyscaleCards(actualPlayer);
                    personalizePlayerOffcanvas(actualPlayer);
                } else if (actualPlayer === 3) {
                    suspectHolderRow.innerHTML = ``;
                    weaponsHolderRow.innerHTML = ``;
                    roomsHolderRow.innerHTML = ``;
                    discoveredSuspects.innerHTML = ``;
                    discoveredWeapons.innerHTML = ``;
                    discoveredRooms.innerHTML = ``;
                    turn(4);
                    if (!playerHand4) {
                        console.log(`Creando PlayerHand4`);
                        playerHand4 = readyForPrint(actualPlayer, manosArmadas);
                        /* console.table(`${playerHand4}`); */
                        playerHand4 = JSON.stringify(playerHand4);
                        /* console.log(playerHand4); */
                        sessionStorage.setItem("playerHand4", playerHand4);
                    } else {
                        console.log(`Playerhand 4 ya fue creada`);
                    }
                    console.log(`LOGUEANDO DISCOVERED HAND`);
                    discoveredHand4 = readyForPrint(
                        actualPlayer,
                        cartasDescubiertas
                    );
                    console.table(discoveredHand4);
                    discoveredHand4 = JSON.stringify(discoveredHand4);
                    console.log(discoveredHand4);
                    sessionStorage.setItem("discoveredHand4", discoveredHand4);
                    activePlayerPiece = fichaJugadorVerdi;
                    printCards(actualPlayer);
                    greyscaleCards(actualPlayer);
                    personalizePlayerOffcanvas(actualPlayer);
                }
                break;
            case 5:
                if (!playerNumberConfirmation) {
                    setTimeout(() => {
                        showMessage(`Cinco jugadores`);
                    }, 300);
                    playerNumberConfirmation = true;
                }
                // Turno Jugador 1
                /* let someOneWon = false; */
                if (actualPlayer === 0) {
                    suspectHolderRow.innerHTML = ``;
                    weaponsHolderRow.innerHTML = ``;
                    roomsHolderRow.innerHTML = ``;
                    discoveredSuspects.innerHTML = ``;
                    discoveredWeapons.innerHTML = ``;
                    discoveredRooms.innerHTML = ``;
                    turn(1);
                    if (!playerHand1) {
                        console.log(`Creando PlayerHand1`);
                        playerHand1 = readyForPrint(actualPlayer, manosArmadas);
                        /* console.table(`${playerHand1}`); */
                        playerHand1 = JSON.stringify(playerHand1);
                        /* console.log(playerHand1); */
                        sessionStorage.setItem("playerHand1", playerHand1);
                    } else {
                        console.log(`Playerhand 1 ya fue creada`);
                    }
                    console.log(`LOGUEANDO DISCOVERED HAND`);
                    discoveredHand1 = readyForPrint(
                        actualPlayer,
                        cartasDescubiertas
                    );
                    console.table(discoveredHand1);
                    discoveredHand1 = JSON.stringify(discoveredHand1);
                    console.log(discoveredHand1);
                    sessionStorage.setItem("discoveredHand1", discoveredHand1);
                    activePlayerPiece = fichaJugadorEscarlata;
                    printCards(actualPlayer);
                    greyscaleCards(actualPlayer);
                    personalizePlayerOffcanvas(actualPlayer);
                } else if (actualPlayer === 1) {
                    suspectHolderRow.innerHTML = ``;
                    weaponsHolderRow.innerHTML = ``;
                    roomsHolderRow.innerHTML = ``;
                    discoveredSuspects.innerHTML = ``;
                    discoveredWeapons.innerHTML = ``;
                    discoveredRooms.innerHTML = ``;
                    turn(2);
                    if (!playerHand2) {
                        console.log(`Creando PlayerHand2`);
                        playerHand2 = readyForPrint(actualPlayer, manosArmadas);
                        /* console.table(`${playerHand2}`); */
                        playerHand2 = JSON.stringify(playerHand2);
                        /*  console.log(playerHand2); */
                        sessionStorage.setItem("playerHand2", playerHand2);
                    } else {
                        console.log(`Playerhand 2 ya fue creada`);
                    }
                    console.log(`LOGUEANDO DISCOVERED HAND`);
                    discoveredHand2 = readyForPrint(
                        actualPlayer,
                        cartasDescubiertas
                    );
                    console.table(discoveredHand2);
                    discoveredHand2 = JSON.stringify(discoveredHand2);
                    console.log(discoveredHand2);
                    sessionStorage.setItem("discoveredHand2", discoveredHand2);
                    activePlayerPiece = fichaJugadorMostaza;
                    printCards(actualPlayer);
                    greyscaleCards(actualPlayer);
                    personalizePlayerOffcanvas(actualPlayer);
                } else if (actualPlayer === 2) {
                    suspectHolderRow.innerHTML = ``;
                    weaponsHolderRow.innerHTML = ``;
                    roomsHolderRow.innerHTML = ``;
                    discoveredSuspects.innerHTML = ``;
                    discoveredWeapons.innerHTML = ``;
                    discoveredRooms.innerHTML = ``;
                    turn(3);
                    if (!playerHand3) {
                        console.log(`Creando PlayerHand3`);
                        playerHand3 = readyForPrint(actualPlayer, manosArmadas);
                        /* console.table(`${playerHand3}`); */
                        playerHand3 = JSON.stringify(playerHand3);
                        /* console.log(playerHand3); */
                        sessionStorage.setItem("playerHand3", playerHand3);
                    } else {
                        console.log(`Playerhand 3 ya fue creada`);
                    }
                    console.log(`LOGUEANDO DISCOVERED HAND`);
                    discoveredHand3 = readyForPrint(
                        actualPlayer,
                        cartasDescubiertas
                    );
                    console.table(discoveredHand3);
                    discoveredHand3 = JSON.stringify(discoveredHand3);
                    console.log(discoveredHand3);
                    sessionStorage.setItem("discoveredHand3", discoveredHand3);
                    activePlayerPiece = fichaJugadorBlanco;
                    printCards(actualPlayer);
                    greyscaleCards(actualPlayer);
                    personalizePlayerOffcanvas(actualPlayer);
                } else if (actualPlayer === 3) {
                    suspectHolderRow.innerHTML = ``;
                    weaponsHolderRow.innerHTML = ``;
                    roomsHolderRow.innerHTML = ``;
                    discoveredSuspects.innerHTML = ``;
                    discoveredWeapons.innerHTML = ``;
                    discoveredRooms.innerHTML = ``;
                    turn(4);
                    if (!playerHand4) {
                        console.log(`Creando PlayerHand4`);
                        playerHand4 = readyForPrint(actualPlayer, manosArmadas);
                        /* console.table(`${playerHand4}`); */
                        playerHand4 = JSON.stringify(playerHand4);
                        /* console.log(playerHand4); */
                        sessionStorage.setItem("playerHand4", playerHand4);
                    } else {
                        console.log(`Playerhand 4 ya fue creada`);
                    }
                    console.log(`LOGUEANDO DISCOVERED HAND`);
                    discoveredHand4 = readyForPrint(
                        actualPlayer,
                        cartasDescubiertas
                    );
                    console.table(discoveredHand4);
                    discoveredHand4 = JSON.stringify(discoveredHand4);
                    console.log(discoveredHand4);
                    sessionStorage.setItem("discoveredHand4", discoveredHand4);
                    activePlayerPiece = fichaJugadorVerdi;
                    printCards(actualPlayer);
                    greyscaleCards(actualPlayer);
                    personalizePlayerOffcanvas(actualPlayer);
                } else if (actualPlayer === 4) {
                    suspectHolderRow.innerHTML = ``;
                    weaponsHolderRow.innerHTML = ``;
                    roomsHolderRow.innerHTML = ``;
                    discoveredSuspects.innerHTML = ``;
                    discoveredWeapons.innerHTML = ``;
                    discoveredRooms.innerHTML = ``;
                    turn(5);
                    if (!playerHand5) {
                        console.log(`Creando PlayerHand5`);
                        playerHand5 = readyForPrint(actualPlayer, manosArmadas);
                        /* console.table(`${playerHand5}`); */
                        playerHand5 = JSON.stringify(playerHand5);
                        /* console.log(playerHand5); */
                        sessionStorage.setItem("playerHand5", playerHand5);
                    } else {
                        console.log(`Playerhand 5 ya fue creada`);
                    }
                    console.log(`LOGUEANDO DISCOVERED HAND`);
                    discoveredHand5 = readyForPrint(
                        actualPlayer,
                        cartasDescubiertas
                    );
                    console.table(discoveredHand5);
                    discoveredHand5 = JSON.stringify(discoveredHand5);
                    console.log(discoveredHand5);
                    sessionStorage.setItem("discoveredHand5", discoveredHand5);
                    activePlayerPiece = fichaJugadorAzulino;
                    printCards(actualPlayer);
                    greyscaleCards(actualPlayer);
                    personalizePlayerOffcanvas(actualPlayer);
                }
                break;
            case 6:
                if (!playerNumberConfirmation) {
                    setTimeout(() => {
                        showMessage(`Seis jugadores`);
                    }, 300);
                    playerNumberConfirmation = true;
                }
                // Turno Jugador 1
                /* let someOneWon = false; */
                if (actualPlayer === 0) {
                    suspectHolderRow.innerHTML = ``;
                    weaponsHolderRow.innerHTML = ``;
                    roomsHolderRow.innerHTML = ``;
                    discoveredSuspects.innerHTML = ``;
                    discoveredWeapons.innerHTML = ``;
                    discoveredRooms.innerHTML = ``;
                    turn(1);
                    if (!playerHand1) {
                        console.log(`Creando PlayerHand1`);
                        playerHand1 = readyForPrint(actualPlayer, manosArmadas);
                        /* console.table(`${playerHand1}`); */
                        playerHand1 = JSON.stringify(playerHand1);
                        /*  console.log(playerHand1); */
                        sessionStorage.setItem("playerHand1", playerHand1);
                    } else {
                        console.log(`Playerhand 1 ya fue creada`);
                    }
                    console.log(`LOGUEANDO DISCOVERED HAND`);
                    discoveredHand1 = readyForPrint(
                        actualPlayer,
                        cartasDescubiertas
                    );
                    console.table(discoveredHand1);
                    discoveredHand1 = JSON.stringify(discoveredHand1);
                    console.log(discoveredHand1);
                    sessionStorage.setItem("discoveredHand1", discoveredHand1);
                    activePlayerPiece = fichaJugadorEscarlata;
                    printCards(actualPlayer);
                    greyscaleCards(actualPlayer);
                    personalizePlayerOffcanvas(actualPlayer);
                } else if (actualPlayer === 1) {
                    suspectHolderRow.innerHTML = ``;
                    weaponsHolderRow.innerHTML = ``;
                    roomsHolderRow.innerHTML = ``;
                    discoveredSuspects.innerHTML = ``;
                    discoveredWeapons.innerHTML = ``;
                    discoveredRooms.innerHTML = ``;
                    turn(2);
                    if (!playerHand2) {
                        console.log(`Creando PlayerHand2`);
                        playerHand2 = readyForPrint(actualPlayer, manosArmadas);
                        /* console.table(`${playerHand2}`); */
                        playerHand2 = JSON.stringify(playerHand2);
                        /*  console.log(playerHand2); */
                        sessionStorage.setItem("playerHand2", playerHand2);
                    } else {
                        console.log(`Playerhand 2 ya fue creada`);
                    }
                    console.log(`LOGUEANDO DISCOVERED HAND`);
                    discoveredHand2 = readyForPrint(
                        actualPlayer,
                        cartasDescubiertas
                    );
                    console.table(discoveredHand2);
                    discoveredHand2 = JSON.stringify(discoveredHand2);
                    console.log(discoveredHand2);
                    sessionStorage.setItem("discoveredHand2", discoveredHand2);
                    activePlayerPiece = fichaJugadorMostaza;
                    printCards(actualPlayer);
                    greyscaleCards(actualPlayer);
                    personalizePlayerOffcanvas(actualPlayer);
                } else if (actualPlayer === 2) {
                    suspectHolderRow.innerHTML = ``;
                    weaponsHolderRow.innerHTML = ``;
                    roomsHolderRow.innerHTML = ``;
                    discoveredSuspects.innerHTML = ``;
                    discoveredWeapons.innerHTML = ``;
                    discoveredRooms.innerHTML = ``;
                    turn(3);
                    if (!playerHand3) {
                        console.log(`Creando PlayerHand3`);
                        playerHand3 = readyForPrint(actualPlayer, manosArmadas);
                        /* console.table(`${playerHand3}`); */
                        playerHand3 = JSON.stringify(playerHand3);
                        /* console.log(playerHand3); */
                        sessionStorage.setItem("playerHand3", playerHand3);
                    } else {
                        console.log(`Playerhand 3 ya fue creada`);
                    }
                    console.log(`LOGUEANDO DISCOVERED HAND`);
                    discoveredHand3 = readyForPrint(
                        actualPlayer,
                        cartasDescubiertas
                    );
                    console.table(discoveredHand3);
                    discoveredHand3 = JSON.stringify(discoveredHand3);
                    console.log(discoveredHand3);
                    sessionStorage.setItem("discoveredHand3", discoveredHand3);
                    activePlayerPiece = fichaJugadorBlanco;
                    printCards(actualPlayer);
                    greyscaleCards(actualPlayer);
                    personalizePlayerOffcanvas(actualPlayer);
                } else if (actualPlayer === 3) {
                    suspectHolderRow.innerHTML = ``;
                    weaponsHolderRow.innerHTML = ``;
                    roomsHolderRow.innerHTML = ``;
                    discoveredSuspects.innerHTML = ``;
                    discoveredWeapons.innerHTML = ``;
                    discoveredRooms.innerHTML = ``;
                    turn(4);
                    if (!playerHand4) {
                        console.log(`Creando PlayerHand4`);
                        playerHand4 = readyForPrint(actualPlayer, manosArmadas);
                        /* console.table(`${playerHand4}`); */
                        playerHand4 = JSON.stringify(playerHand4);
                        /* console.log(playerHand4); */
                        sessionStorage.setItem("playerHand4", playerHand4);
                    } else {
                        console.log(`Playerhand 4 ya fue creada`);
                    }
                    console.log(`LOGUEANDO DISCOVERED HAND`);
                    discoveredHand4 = readyForPrint(
                        actualPlayer,
                        cartasDescubiertas
                    );
                    console.table(discoveredHand4);
                    discoveredHand4 = JSON.stringify(discoveredHand4);
                    console.log(discoveredHand4);
                    sessionStorage.setItem("discoveredHand4", discoveredHand4);
                    activePlayerPiece = fichaJugadorVerdi;
                    printCards(actualPlayer);
                    greyscaleCards(actualPlayer);
                    personalizePlayerOffcanvas(actualPlayer);
                } else if (actualPlayer === 4) {
                    suspectHolderRow.innerHTML = ``;
                    weaponsHolderRow.innerHTML = ``;
                    roomsHolderRow.innerHTML = ``;
                    discoveredSuspects.innerHTML = ``;
                    discoveredWeapons.innerHTML = ``;
                    discoveredRooms.innerHTML = ``;
                    turn(5);
                    if (!playerHand5) {
                        console.log(`Creando PlayerHand5`);
                        playerHand5 = readyForPrint(actualPlayer, manosArmadas);
                        /* console.table(`${playerHand5}`); */
                        playerHand5 = JSON.stringify(playerHand5);
                        /*  console.log(playerHand5); */
                        sessionStorage.setItem("playerHand5", playerHand5);
                    } else {
                        console.log(`Playerhand 5 ya fue creada`);
                    }
                    console.log(`LOGUEANDO DISCOVERED HAND`);
                    discoveredHand5 = readyForPrint(
                        actualPlayer,
                        cartasDescubiertas
                    );
                    console.table(discoveredHand5);
                    discoveredHand5 = JSON.stringify(discoveredHand5);
                    console.log(discoveredHand5);
                    sessionStorage.setItem("discoveredHand5", discoveredHand5);
                    activePlayerPiece = fichaJugadorAzulino;
                    printCards(actualPlayer);
                    greyscaleCards(actualPlayer);
                    personalizePlayerOffcanvas(actualPlayer);
                } else if (actualPlayer === 5) {
                    suspectHolderRow.innerHTML = ``;
                    weaponsHolderRow.innerHTML = ``;
                    roomsHolderRow.innerHTML = ``;
                    discoveredSuspects.innerHTML = ``;
                    discoveredWeapons.innerHTML = ``;
                    discoveredRooms.innerHTML = ``;
                    turn(6);
                    if (!playerHand6) {
                        console.log(`Creando PlayerHand6`);
                        playerHand6 = readyForPrint(actualPlayer, manosArmadas);
                        /* console.table(`${playerHand6}`); */
                        playerHand6 = JSON.stringify(playerHand6);
                        /* console.log(playerHand6); */
                        sessionStorage.setItem("playerHand6", playerHand6);
                    } else {
                        console.log(`Playerhand 6 ya fue creada`);
                    }
                    console.log(`LOGUEANDO DISCOVERED HAND`);
                    discoveredHand6 = readyForPrint(
                        actualPlayer,
                        cartasDescubiertas
                    );
                    console.table(discoveredHand6);
                    discoveredHand6 = JSON.stringify(discoveredHand6);
                    console.log(discoveredHand6);
                    sessionStorage.setItem("discoveredHand6", discoveredHand6);
                    activePlayerPiece = fichaJugadorMoradillo;
                    printCards(actualPlayer);
                    greyscaleCards(actualPlayer);
                    personalizePlayerOffcanvas(actualPlayer);
                }
                break;
            default:
                break;
        }
    };

    // Función que determina si corresponde o no iniciar la dinámica de acusación en función de si detecta que la ficha se encuentra dentro de una habitación
    const enoughToAccuse = (newCell, position) => {
        console.log("ejecutando enoughToAccuse");
        actualAccusingRoom = position;
        if (
            newCell !== 1 &&
            newCell !== 2 &&
            newCell !== 3 &&
            newCell !== 4 &&
            newCell !== 5 &&
            newCell !== 6
        ) {
            dialogInterface.addEventListener("submit", (evt) => {
                evt.preventDefault();
                evt.target[0].value = "";
                console.log(evt.target[0].value);
            });
            console.log(`puedes acusar`);
            accusationButton.style.backgroundColor = `${
                colors[actualPlayer + 1]
            }`;
            setTimeout(() => {
                showMessage(`El Jugador ${actualPlayer + 1} puede acusar:`);
            }, 2000);
            activePlayerPiece.focus();
            showAccBtn();
            hideDiceBtn();
            accusationDynamic();
        } else {
            hideDiceBtn();
            setTimeout(() => {
                setTimeout(() => {
                    showMessage(
                        `No ingresaste a ninguna habitación, no puedes acusar.`
                    );
                }, 100);
                if (actualPlayer < playerNumber - 1) {
                    console.log("pasando al siguiente turno");
                    actualPlayer += 1;
                    console.log(`ActualPlayer es: ${actualPlayer}`);
                } else {
                    console.log("reiniciando la ronda");
                    actualPlayer = 0;
                    console.log(`ActualPlayer es: ${actualPlayer}`);
                }
                turnDynamic(playerNumber);
            }, 2000);
        }
        // Reseteo de variables necesarias para el siguiente jugador
        console.log(movingPlayer);
        movingPlayer = undefined;
        movement = undefined;
        movingPlayerIndex = undefined;
        movingPlayerRow = undefined;
        possibleMovementRow = undefined;
        possibleMovementCell = undefined;
        materializedCell = undefined;
        i = 0;
        rowCounter = 0;
        positioningInBoard = [undefined, undefined];
        newCoordenates = [undefined, undefined];
        activePlayerPiece = undefined;
    };
    // Función que determina dónde se encuentra la ficha del jugador, tanto en la matriz como en el DOM; remueve la ficha del lugar anterior en la matriz devolviendo el valor 0 si era una celda cualquiera, o filtrando el array si era en una puerta, y elimina el IMG del DOM. Y Determina la nueva posición, ubicándola tanto en la matriz como en la nueva celda del HTML.
    const movingPlayerToCell = (
        actualPlayer,
        movingPlayerRow,
        movingPlayerIndex,
        actualTargetedCell,
        accused,
        coordinates
    ) => {
        console.log(
            `El actualplayer que está llegando a movinPlayerToCell es ${actualPlayer}`
        );
        console.log(`Ejecutando moving player`);
        console.log(`Logueando el accuseChecker recibido ${accused}`);
        pointedCell = actualTargetedCell;
        let newRow, newIndex;
        let y = 0;
        let z = 0;
        let newCell;
        let playerCoordinates = coordinates;
        let inRoomChecker;
        switch (actualPlayer) {
            case 1:
                console.log(`El jugador a mover es ${actualPlayer}`);
                playerMovingPiece = document.querySelector(`#escarlata-ficha`);
                positioningInBoard = [movingPlayerRow, movingPlayerIndex];
                inRoomChecker = accused;
                console.log(inRoomChecker);
                for (let cell of movementAbleCells) {
                    console.dir(cell);
                    if (cell.childNodes[0] === playerMovingPiece) {
                        console.log(
                            `Se encontró la ficha del jugador, y se quitó de su lugar`
                        );
                        cell.removeChild(playerMovingPiece);
                    }
                    cell.classList.remove(`movement-in-cell`);
                }
                for (let row of movementBoardTable.children) {
                    for (let cell of row.children) {
                        if (cell === pointedCell) {
                            newIndex = z;
                            newRow = y;
                        }
                        if (z < 23) {
                            z += 1;
                        } else {
                            z = 0;
                        }
                    }
                    if (y < 24) {
                        y += 1;
                    } else {
                        y = 0;
                    }
                }
                if (!inRoomChecker) {
                    if (
                        movementBoard[positioningInBoard[0]][
                            positioningInBoard[1]
                        ] === actualPlayer
                    ) {
                        movementBoard[positioningInBoard[0]][
                            positioningInBoard[1]
                        ] = 0;
                    }
                } else {
                    for (let coordinate of playerCoordinates) {
                        let positionRow = coordinate[0];
                        let positionIndex = coordinate[1];
                        console.log(
                            `Logueando el valor del casillero de destino`
                        );
                        console.log(
                            typeof movementBoard[positionRow][positionIndex]
                        );
                        console.log(movementBoard[positionRow][positionIndex]);
                        movementBoard[positionRow][positionIndex] =
                            movementBoard[positionRow][positionIndex].filter(
                                (value) => {
                                    return value !== actualPlayer;
                                }
                            );
                    }
                }
                console.log(`La ficha del jugador se movió correctamente`);
                console.log(
                    `El nuevo index de la ficha es ${newIndex} y la nueva row es ${newRow}`
                );
                if (typeof movementBoard[newRow][newIndex] === "number") {
                    if (movementBoard[newRow][newIndex] === 0) {
                        movementBoard[newRow][newIndex] = actualPlayer;
                    }
                } else {
                    movementBoard[newRow][newIndex].push(actualPlayer);
                    switch (movementBoard[newRow][newIndex][0]) {
                        /*Vestíbulo: 9
                    Biblioteca: 11
                    Comedor: 12
                    Billar: 13
                    Salón de Baile: 15 */
                        case 9:
                            if (newRow === 4) {
                                movementBoard[6][11].push(actualPlayer);
                                movementBoard[6][12].push(actualPlayer);
                            } else if (newIndex === 11) {
                                movementBoard[4][9].push(actualPlayer);
                                movementBoard[6][12].push(actualPlayer);
                            } else if (newIndex === 12) {
                                movementBoard[4][9].push(actualPlayer);
                                movementBoard[6][11].push(actualPlayer);
                            }
                            break;
                        case 11:
                            if (newRow === 8) {
                                movementBoard[10][3].push(actualPlayer);
                            } else if (newRow === 10) {
                                movementBoard[8][6].push(actualPlayer);
                            }
                            break;
                        case 12:
                            if (newRow === 9) {
                                movementBoard[12][16].push(actualPlayer);
                            } else if (newRow === 12) {
                                movementBoard[9][17].push(actualPlayer);
                            }
                            break;
                        case 13:
                            if (newRow === 12) {
                                movementBoard[15][5].push(actualPlayer);
                            } else if (newRow === 15) {
                                movementBoard[12][1].push(actualPlayer);
                            }
                            break;
                        case 15:
                            if (newIndex === 8) {
                                movementBoard[17][9].push(actualPlayer);
                                movementBoard[17][14].push(actualPlayer);
                                movementBoard[19][15].push(actualPlayer);
                            } else if (newIndex === 9) {
                                movementBoard[19][8].push(actualPlayer);
                                movementBoard[17][14].push(actualPlayer);
                                movementBoard[19][15].push(actualPlayer);
                            } else if (newIndex === 14) {
                                movementBoard[19][8].push(actualPlayer);
                                movementBoard[17][9].push(actualPlayer);
                                movementBoard[19][15].push(actualPlayer);
                            } else if (newIndex === 15) {
                                movementBoard[19][8].push(actualPlayer);
                                movementBoard[17][9].push(actualPlayer);
                                movementBoard[17][14].push(actualPlayer);
                            }
                            break;
                    }
                }
                newCoordenates = [newRow, newIndex];
                newCell = movementBoard[newRow][newIndex];
                switch (pointedCell) {
                    case salaDoor:
                        document
                            .querySelector(`#cell-3v`)
                            .appendChild(playerMovingPiece);
                        break;
                    case vestibuloDoor1:
                        document
                            .querySelector(`#cell-3n`)
                            .appendChild(playerMovingPiece);
                        break;
                    case vestibuloDoor2:
                        document
                            .querySelector(`#cell-3n`)
                            .appendChild(playerMovingPiece);
                        break;
                    case vestibuloDoor3:
                        document
                            .querySelector(`#cell-3n`)
                            .appendChild(playerMovingPiece);
                        break;
                    case estudioDoor:
                        document
                            .querySelector(`#cell-2c`)
                            .appendChild(playerMovingPiece);
                        break;
                    case bibliotecaDoor1:
                        document
                            .querySelector(`#cell-8c`)
                            .appendChild(playerMovingPiece);
                        break;
                    case bibliotecaDoor2:
                        document
                            .querySelector(`#cell-8c`)
                            .appendChild(playerMovingPiece);
                        break;
                    case comedorDoor1:
                        document
                            .querySelector(`#cell-11v`)
                            .appendChild(playerMovingPiece);
                        break;
                    case comedorDoor2:
                        document
                            .querySelector(`#cell-11v`)
                            .appendChild(playerMovingPiece);
                        break;
                    case billarDoor1:
                        document
                            .querySelector(`#cell-14d`)
                            .appendChild(playerMovingPiece);
                        break;
                    case billarDoor2:
                        document
                            .querySelector(`#cell-14d`)
                            .appendChild(playerMovingPiece);
                        break;
                    case baileDoor1:
                        document
                            .querySelector(`#cell-19o`)
                            .appendChild(playerMovingPiece);
                        break;
                    case baileDoor2:
                        document
                            .querySelector(`#cell-19o`)
                            .appendChild(playerMovingPiece);
                        break;
                    case baileDoor3:
                        document
                            .querySelector(`#cell-19o`)
                            .appendChild(playerMovingPiece);
                        break;
                    case baileDoor4:
                        document
                            .querySelector(`#cell-19o`)
                            .appendChild(playerMovingPiece);
                        break;
                    case invernaderoDoor:
                        document
                            .querySelector(`#cell-23b`)
                            .appendChild(playerMovingPiece);
                        break;
                    case cocinaDoor:
                        document
                            .querySelector(`#cell-21w`)
                            .appendChild(playerMovingPiece);
                        break;

                    default:
                        pointedCell.appendChild(playerMovingPiece);
                        break;
                }
                newRow = undefined;
                newIndex = undefined;
                y = 0;
                z = 0;
                playerMovingPiece = undefined;
                enoughToAccuse(newCell, newCoordenates);
                break;
            case 2:
                console.log(`=========== entrando en el case 2 ===========`);
                console.log(`El jugador a mover es ${actualPlayer}`);
                playerMovingPiece = document.querySelector(`#mostaza-ficha`);
                positioningInBoard = [movingPlayerRow, movingPlayerIndex];
                inRoomChecker = accused;
                console.log(inRoomChecker);
                for (let cell of movementAbleCells) {
                    console.dir(cell);
                    if (cell.childNodes[0] === playerMovingPiece) {
                        console.log(
                            `Se encontró la ficha del jugador, y se quitó de su lugar`
                        );
                        cell.removeChild(playerMovingPiece);
                    }
                    cell.classList.remove(`movement-in-cell`);
                }
                for (let row of movementBoardTable.children) {
                    for (let cell of row.children) {
                        if (cell === pointedCell) {
                            newIndex = z;
                            newRow = y;
                        }
                        if (z < 23) {
                            z += 1;
                        } else {
                            z = 0;
                        }
                    }
                    if (y < 24) {
                        y += 1;
                    } else {
                        y = 0;
                    }
                }
                if (!inRoomChecker) {
                    if (
                        movementBoard[positioningInBoard[0]][
                            positioningInBoard[1]
                        ] === actualPlayer
                    ) {
                        movementBoard[positioningInBoard[0]][
                            positioningInBoard[1]
                        ] = 0;
                    }
                } else {
                    for (let coordinate of playerCoordinates) {
                        let positionRow = coordinate[0];
                        let positionIndex = coordinate[1];
                        console.log(
                            `Logueando el valor del casillero de destino`
                        );
                        console.log(
                            typeof movementBoard[positionRow][positionIndex]
                        );
                        console.log(movementBoard[positionRow][positionIndex]);
                        movementBoard[positionRow][positionIndex] =
                            movementBoard[positionRow][positionIndex].filter(
                                (value) => {
                                    return value !== actualPlayer;
                                }
                            );
                    }
                }
                console.log(`La ficha del jugador se movió correctamente`);
                console.log(
                    `El nuevo index de la ficha es ${newIndex} y la nueva row es ${newRow}`
                );
                if (typeof movementBoard[newRow][newIndex] === "number") {
                    if (movementBoard[newRow][newIndex] === 0) {
                        movementBoard[newRow][newIndex] = actualPlayer;
                    }
                } else {
                    movementBoard[newRow][newIndex].push(actualPlayer);
                    switch (movementBoard[newRow][newIndex][0]) {
                        /*Vestíbulo: 9
                    Biblioteca: 11
                    Comedor: 12
                    Billar: 13
                    Salón de Baile: 15 */
                        case 9:
                            if (newRow === 4) {
                                movementBoard[6][11].push(actualPlayer);
                                movementBoard[6][12].push(actualPlayer);
                            } else if (newIndex === 11) {
                                movementBoard[4][9].push(actualPlayer);
                                movementBoard[6][12].push(actualPlayer);
                            } else if (newIndex === 12) {
                                movementBoard[4][9].push(actualPlayer);
                                movementBoard[6][11].push(actualPlayer);
                            }
                            break;
                        case 11:
                            if (newRow === 8) {
                                movementBoard[10][3].push(actualPlayer);
                            } else if (newRow === 10) {
                                movementBoard[8][6].push(actualPlayer);
                            }
                            break;
                        case 12:
                            if (newRow === 9) {
                                movementBoard[12][16].push(actualPlayer);
                            } else if (newRow === 12) {
                                movementBoard[9][17].push(actualPlayer);
                            }
                            break;
                        case 13:
                            if (newRow === 12) {
                                movementBoard[15][5].push(actualPlayer);
                            } else if (newRow === 15) {
                                movementBoard[12][1].push(actualPlayer);
                            }
                            break;
                        case 15:
                            if (newIndex === 8) {
                                movementBoard[17][9].push(actualPlayer);
                                movementBoard[17][14].push(actualPlayer);
                                movementBoard[19][15].push(actualPlayer);
                            } else if (newIndex === 9) {
                                movementBoard[19][8].push(actualPlayer);
                                movementBoard[17][14].push(actualPlayer);
                                movementBoard[19][15].push(actualPlayer);
                            } else if (newIndex === 14) {
                                movementBoard[19][8].push(actualPlayer);
                                movementBoard[17][9].push(actualPlayer);
                                movementBoard[19][15].push(actualPlayer);
                            } else if (newIndex === 15) {
                                movementBoard[19][8].push(actualPlayer);
                                movementBoard[17][9].push(actualPlayer);
                                movementBoard[17][14].push(actualPlayer);
                            }
                            break;
                    }
                }
                newCoordenates = [newRow, newIndex];
                newCell = movementBoard[newRow][newIndex];
                switch (pointedCell) {
                    case salaDoor:
                        document
                            .querySelector(`#cell-4t`)
                            .appendChild(playerMovingPiece);
                        break;
                    case vestibuloDoor1:
                        document
                            .querySelector(`#cell-5k`)
                            .appendChild(playerMovingPiece);
                        break;
                    case vestibuloDoor2:
                        document
                            .querySelector(`#cell-5k`)
                            .appendChild(playerMovingPiece);
                        break;
                    case vestibuloDoor3:
                        document
                            .querySelector(`#cell-5k`)
                            .appendChild(playerMovingPiece);
                        break;
                    case estudioDoor:
                        document
                            .querySelector(`#cell-2e`)
                            .appendChild(playerMovingPiece);
                        break;
                    case bibliotecaDoor1:
                        document
                            .querySelector(`#cell-10c`)
                            .appendChild(playerMovingPiece);
                        break;
                    case bibliotecaDoor2:
                        document
                            .querySelector(`#cell-10c`)
                            .appendChild(playerMovingPiece);
                        break;
                    case comedorDoor1:
                        document
                            .querySelector(`#cell-14u`)
                            .appendChild(playerMovingPiece);
                        break;
                    case comedorDoor2:
                        document
                            .querySelector(`#cell-14u`)
                            .appendChild(playerMovingPiece);
                        break;
                    case billarDoor1:
                        document
                            .querySelector(`#cell-16d`)
                            .appendChild(playerMovingPiece);
                        break;
                    case billarDoor2:
                        document
                            .querySelector(`#cell-16d`)
                            .appendChild(playerMovingPiece);
                        break;
                    case baileDoor1:
                        document
                            .querySelector(`#cell-19l`)
                            .appendChild(playerMovingPiece);
                        break;
                    case baileDoor2:
                        document
                            .querySelector(`#cell-19l`)
                            .appendChild(playerMovingPiece);
                        break;
                    case baileDoor3:
                        document
                            .querySelector(`#cell-19l`)
                            .appendChild(playerMovingPiece);
                        break;
                    case baileDoor4:
                        document
                            .querySelector(`#cell-19l`)
                            .appendChild(playerMovingPiece);
                        break;
                    case invernaderoDoor:
                        document
                            .querySelector(`#cell-22d`)
                            .appendChild(playerMovingPiece);
                        break;
                    case cocinaDoor:
                        document
                            .querySelector(`#cell-23w`)
                            .appendChild(playerMovingPiece);
                        break;

                    default:
                        pointedCell.appendChild(playerMovingPiece);
                        break;
                }
                newRow = undefined;
                newIndex = undefined;
                y = 0;
                z = 0;
                playerMovingPiece = undefined;
                enoughToAccuse(newCell, newCoordenates);
                break;
            case 3:
                console.log(`=========== entrando en el case 3 ===========`);
                console.log(`El jugador a mover es ${actualPlayer}`);
                playerMovingPiece = document.querySelector(`#blanco-ficha`);
                positioningInBoard = [movingPlayerRow, movingPlayerIndex];
                inRoomChecker = accused;
                console.log(inRoomChecker);
                for (let cell of movementAbleCells) {
                    console.dir(cell);
                    if (cell.childNodes[0] === playerMovingPiece) {
                        console.log(
                            `Se encontró la ficha del jugador, y se quitó de su lugar`
                        );
                        cell.removeChild(playerMovingPiece);
                    }
                    cell.classList.remove(`movement-in-cell`);
                }
                for (let row of movementBoardTable.children) {
                    for (let cell of row.children) {
                        if (cell === pointedCell) {
                            newIndex = z;
                            newRow = y;
                        }
                        if (z < 23) {
                            z += 1;
                        } else {
                            z = 0;
                        }
                    }
                    if (y < 24) {
                        y += 1;
                    } else {
                        y = 0;
                    }
                }
                if (!inRoomChecker) {
                    if (
                        movementBoard[positioningInBoard[0]][
                            positioningInBoard[1]
                        ] === actualPlayer
                    ) {
                        movementBoard[positioningInBoard[0]][
                            positioningInBoard[1]
                        ] = 0;
                    }
                } else {
                    for (let coordinate of playerCoordinates) {
                        let positionRow = coordinate[0];
                        let positionIndex = coordinate[1];
                        console.log(
                            `Logueando el valor del casillero de destino`
                        );
                        console.log(
                            typeof movementBoard[positionRow][positionIndex]
                        );
                        console.log(movementBoard[positionRow][positionIndex]);
                        movementBoard[positionRow][positionIndex] =
                            movementBoard[positionRow][positionIndex].filter(
                                (value) => {
                                    return value !== actualPlayer;
                                }
                            );
                    }
                }
                console.log(`La ficha del jugador se movió correctamente`);
                console.log(
                    `El nuevo index de la ficha es ${newIndex} y la nueva row es ${newRow}`
                );
                if (typeof movementBoard[newRow][newIndex] === "number") {
                    if (movementBoard[newRow][newIndex] === 0) {
                        movementBoard[newRow][newIndex] = actualPlayer;
                    }
                } else {
                    movementBoard[newRow][newIndex].push(actualPlayer);
                    switch (movementBoard[newRow][newIndex][0]) {
                        /*Vestíbulo: 9
                    Biblioteca: 11
                    Comedor: 12
                    Billar: 13
                    Salón de Baile: 15 */
                        case 9:
                            if (newRow === 4) {
                                movementBoard[6][11].push(actualPlayer);
                                movementBoard[6][12].push(actualPlayer);
                            } else if (newIndex === 11) {
                                movementBoard[4][9].push(actualPlayer);
                                movementBoard[6][12].push(actualPlayer);
                            } else if (newIndex === 12) {
                                movementBoard[4][9].push(actualPlayer);
                                movementBoard[6][11].push(actualPlayer);
                            }
                            break;
                        case 11:
                            if (newRow === 8) {
                                movementBoard[10][3].push(actualPlayer);
                            } else if (newRow === 10) {
                                movementBoard[8][6].push(actualPlayer);
                            }
                            break;
                        case 12:
                            if (newRow === 9) {
                                movementBoard[12][16].push(actualPlayer);
                            } else if (newRow === 12) {
                                movementBoard[9][17].push(actualPlayer);
                            }
                            break;
                        case 13:
                            if (newRow === 12) {
                                movementBoard[15][5].push(actualPlayer);
                            } else if (newRow === 15) {
                                movementBoard[12][1].push(actualPlayer);
                            }
                            break;
                        case 15:
                            if (newIndex === 8) {
                                movementBoard[17][9].push(actualPlayer);
                                movementBoard[17][14].push(actualPlayer);
                                movementBoard[19][15].push(actualPlayer);
                            } else if (newIndex === 9) {
                                movementBoard[19][8].push(actualPlayer);
                                movementBoard[17][14].push(actualPlayer);
                                movementBoard[19][15].push(actualPlayer);
                            } else if (newIndex === 14) {
                                movementBoard[19][8].push(actualPlayer);
                                movementBoard[17][9].push(actualPlayer);
                                movementBoard[19][15].push(actualPlayer);
                            } else if (newIndex === 15) {
                                movementBoard[19][8].push(actualPlayer);
                                movementBoard[17][9].push(actualPlayer);
                                movementBoard[17][14].push(actualPlayer);
                            }
                            break;
                    }
                }
                newCoordenates = [newRow, newIndex];
                newCell = movementBoard[newRow][newIndex];
                switch (pointedCell) {
                    case salaDoor:
                        document
                            .querySelector(`#cell-3t`)
                            .appendChild(playerMovingPiece);
                        break;
                    case vestibuloDoor1:
                        document
                            .querySelector(`#cell-4n`)
                            .appendChild(playerMovingPiece);
                        break;
                    case vestibuloDoor2:
                        document
                            .querySelector(`#cell-4n`)
                            .appendChild(playerMovingPiece);
                        break;
                    case vestibuloDoor3:
                        document
                            .querySelector(`#cell-4n`)
                            .appendChild(playerMovingPiece);
                        break;
                    case estudioDoor:
                        document
                            .querySelector(`#cell-2d`)
                            .appendChild(playerMovingPiece);
                        break;
                    case bibliotecaDoor1:
                        document
                            .querySelector(`#cell-10e`)
                            .appendChild(playerMovingPiece);
                        break;
                    case bibliotecaDoor2:
                        document
                            .querySelector(`#cell-10e`)
                            .appendChild(playerMovingPiece);
                        break;
                    case comedorDoor1:
                        document
                            .querySelector(`#cell-14v`)
                            .appendChild(playerMovingPiece);
                        break;
                    case comedorDoor2:
                        document
                            .querySelector(`#cell-14v`)
                            .appendChild(playerMovingPiece);
                        break;
                    case billarDoor1:
                        document
                            .querySelector(`#cell-14e`)
                            .appendChild(playerMovingPiece);
                        break;
                    case billarDoor2:
                        document
                            .querySelector(`#cell-14e`)
                            .appendChild(playerMovingPiece);
                        break;
                    case baileDoor1:
                        document
                            .querySelector(`#cell-22m`)
                            .appendChild(playerMovingPiece);
                        break;
                    case baileDoor2:
                        document
                            .querySelector(`#cell-22m`)
                            .appendChild(playerMovingPiece);
                        break;
                    case baileDoor3:
                        document
                            .querySelector(`#cell-22m`)
                            .appendChild(playerMovingPiece);
                        break;
                    case baileDoor4:
                        document
                            .querySelector(`#cell-22m`)
                            .appendChild(playerMovingPiece);
                        break;
                    case invernaderoDoor:
                        document
                            .querySelector(`#cell-23c`)
                            .appendChild(playerMovingPiece);
                        break;
                    case cocinaDoor:
                        document
                            .querySelector(`#cell-23u`)
                            .appendChild(playerMovingPiece);
                        break;

                    default:
                        pointedCell.appendChild(playerMovingPiece);
                        break;
                }
                newRow = undefined;
                newIndex = undefined;
                y = 0;
                z = 0;
                playerMovingPiece = undefined;
                enoughToAccuse(newCell, newCoordenates);
                break;
            case 4:
                console.log(`=========== entrando en el case 4 ===========`);
                console.log(`El jugador a mover es ${actualPlayer}`);
                playerMovingPiece = document.querySelector(`#verdi-ficha`);
                positioningInBoard = [movingPlayerRow, movingPlayerIndex];
                inRoomChecker = accused;
                console.log(inRoomChecker);
                for (let cell of movementAbleCells) {
                    console.dir(cell);
                    if (cell.childNodes[0] === playerMovingPiece) {
                        console.log(
                            `Se encontró la ficha del jugador, y se quitó de su lugar`
                        );
                        cell.removeChild(playerMovingPiece);
                    }
                    cell.classList.remove(`movement-in-cell`);
                }
                for (let row of movementBoardTable.children) {
                    for (let cell of row.children) {
                        if (cell === pointedCell) {
                            newIndex = z;
                            newRow = y;
                        }
                        if (z < 23) {
                            z += 1;
                        } else {
                            z = 0;
                        }
                    }
                    if (y < 24) {
                        y += 1;
                    } else {
                        y = 0;
                    }
                }
                if (!inRoomChecker) {
                    if (
                        movementBoard[positioningInBoard[0]][
                            positioningInBoard[1]
                        ] === actualPlayer
                    ) {
                        movementBoard[positioningInBoard[0]][
                            positioningInBoard[1]
                        ] = 0;
                    }
                } else {
                    for (let coordinate of playerCoordinates) {
                        let positionRow = coordinate[0];
                        let positionIndex = coordinate[1];
                        console.log(
                            `Logueando el valor del casillero de destino`
                        );
                        console.log(
                            typeof movementBoard[positionRow][positionIndex]
                        );
                        console.log(movementBoard[positionRow][positionIndex]);
                        movementBoard[positionRow][positionIndex] =
                            movementBoard[positionRow][positionIndex].filter(
                                (value) => {
                                    return value !== actualPlayer;
                                }
                            );
                    }
                }
                console.log(`La ficha del jugador se movió correctamente`);
                console.log(
                    `El nuevo index de la ficha es ${newIndex} y la nueva row es ${newRow}`
                );
                if (typeof movementBoard[newRow][newIndex] === "number") {
                    if (movementBoard[newRow][newIndex] === 0) {
                        movementBoard[newRow][newIndex] = actualPlayer;
                    }
                } else {
                    movementBoard[newRow][newIndex].push(actualPlayer);
                    switch (movementBoard[newRow][newIndex][0]) {
                        /*Vestíbulo: 9
                    Biblioteca: 11
                    Comedor: 12
                    Billar: 13
                    Salón de Baile: 15 */
                        case 9:
                            if (newRow === 4) {
                                movementBoard[6][11].push(actualPlayer);
                                movementBoard[6][12].push(actualPlayer);
                            } else if (newIndex === 11) {
                                movementBoard[4][9].push(actualPlayer);
                                movementBoard[6][12].push(actualPlayer);
                            } else if (newIndex === 12) {
                                movementBoard[4][9].push(actualPlayer);
                                movementBoard[6][11].push(actualPlayer);
                            }
                            break;
                        case 11:
                            if (newRow === 8) {
                                movementBoard[10][3].push(actualPlayer);
                            } else if (newRow === 10) {
                                movementBoard[8][6].push(actualPlayer);
                            }
                            break;
                        case 12:
                            if (newRow === 9) {
                                movementBoard[12][16].push(actualPlayer);
                            } else if (newRow === 12) {
                                movementBoard[9][17].push(actualPlayer);
                            }
                            break;
                        case 13:
                            if (newRow === 12) {
                                movementBoard[15][5].push(actualPlayer);
                            } else if (newRow === 15) {
                                movementBoard[12][1].push(actualPlayer);
                            }
                            break;
                        case 15:
                            if (newIndex === 8) {
                                movementBoard[17][9].push(actualPlayer);
                                movementBoard[17][14].push(actualPlayer);
                                movementBoard[19][15].push(actualPlayer);
                            } else if (newIndex === 9) {
                                movementBoard[19][8].push(actualPlayer);
                                movementBoard[17][14].push(actualPlayer);
                                movementBoard[19][15].push(actualPlayer);
                            } else if (newIndex === 14) {
                                movementBoard[19][8].push(actualPlayer);
                                movementBoard[17][9].push(actualPlayer);
                                movementBoard[19][15].push(actualPlayer);
                            } else if (newIndex === 15) {
                                movementBoard[19][8].push(actualPlayer);
                                movementBoard[17][9].push(actualPlayer);
                                movementBoard[17][14].push(actualPlayer);
                            }
                            break;
                    }
                }
                newCoordenates = [newRow, newIndex];
                newCell = movementBoard[newRow][newIndex];
                switch (pointedCell) {
                    case salaDoor:
                        document
                            .querySelector(`#cell-4u`)
                            .appendChild(playerMovingPiece);
                        break;
                    case vestibuloDoor1:
                        document
                            .querySelector(`#cell-4k`)
                            .appendChild(playerMovingPiece);
                        break;
                    case vestibuloDoor2:
                        document
                            .querySelector(`#cell-4k`)
                            .appendChild(playerMovingPiece);
                        break;
                    case vestibuloDoor3:
                        document
                            .querySelector(`#cell-4k`)
                            .appendChild(playerMovingPiece);
                        break;
                    case estudioDoor:
                        document
                            .querySelector(`#cell-3e`)
                            .appendChild(playerMovingPiece);
                        break;
                    case bibliotecaDoor1:
                        document
                            .querySelector(`#cell-8d`)
                            .appendChild(playerMovingPiece);
                        break;
                    case bibliotecaDoor2:
                        document
                            .querySelector(`#cell-8d`)
                            .appendChild(playerMovingPiece);
                        break;
                    case comedorDoor1:
                        document
                            .querySelector(`#cell-11t`)
                            .appendChild(playerMovingPiece);
                        break;
                    case comedorDoor2:
                        document
                            .querySelector(`#cell-11t`)
                            .appendChild(playerMovingPiece);
                        break;
                    case billarDoor1:
                        document
                            .querySelector(`#cell-15d`)
                            .appendChild(playerMovingPiece);
                        break;
                    case billarDoor2:
                        document
                            .querySelector(`#cell-15d`)
                            .appendChild(playerMovingPiece);
                        break;
                    case baileDoor1:
                        document
                            .querySelector(`#cell-21k`)
                            .appendChild(playerMovingPiece);
                        break;
                    case baileDoor2:
                        document
                            .querySelector(`#cell-21k`)
                            .appendChild(playerMovingPiece);
                        break;
                    case baileDoor3:
                        document
                            .querySelector(`#cell-21k`)
                            .appendChild(playerMovingPiece);
                        break;
                    case baileDoor4:
                        document
                            .querySelector(`#cell-21k`)
                            .appendChild(playerMovingPiece);
                        break;
                    case invernaderoDoor:
                        document
                            .querySelector(`#cell-22c`)
                            .appendChild(playerMovingPiece);
                        break;
                    case cocinaDoor:
                        document
                            .querySelector(`#cell-23v`)
                            .appendChild(playerMovingPiece);
                        break;

                    default:
                        pointedCell.appendChild(playerMovingPiece);
                        break;
                }
                newRow = undefined;
                newIndex = undefined;
                y = 0;
                z = 0;
                playerMovingPiece = undefined;
                enoughToAccuse(newCell, newCoordenates);
                break;
            case 5:
                console.log(`=========== entrando en el case 5 ===========`);
                console.log(`El jugador a mover es ${actualPlayer}`);
                playerMovingPiece = document.querySelector(`#azulino-ficha`);
                positioningInBoard = [movingPlayerRow, movingPlayerIndex];
                inRoomChecker = accused;
                console.log(inRoomChecker);
                for (let cell of movementAbleCells) {
                    console.dir(cell);
                    if (cell.childNodes[0] === playerMovingPiece) {
                        console.log(
                            `Se encontró la ficha del jugador, y se quitó de su lugar`
                        );
                        cell.removeChild(playerMovingPiece);
                    }
                    cell.classList.remove(`movement-in-cell`);
                }
                for (let row of movementBoardTable.children) {
                    for (let cell of row.children) {
                        if (cell === pointedCell) {
                            newIndex = z;
                            newRow = y;
                        }
                        if (z < 23) {
                            z += 1;
                        } else {
                            z = 0;
                        }
                    }
                    if (y < 24) {
                        y += 1;
                    } else {
                        y = 0;
                    }
                }
                if (!inRoomChecker) {
                    if (
                        movementBoard[positioningInBoard[0]][
                            positioningInBoard[1]
                        ] === actualPlayer
                    ) {
                        movementBoard[positioningInBoard[0]][
                            positioningInBoard[1]
                        ] = 0;
                    }
                } else {
                    for (let coordinate of playerCoordinates) {
                        let positionRow = coordinate[0];
                        let positionIndex = coordinate[1];
                        console.log(
                            `Logueando el valor del casillero de destino`
                        );
                        console.log(
                            typeof movementBoard[positionRow][positionIndex]
                        );
                        console.log(movementBoard[positionRow][positionIndex]);
                        movementBoard[positionRow][positionIndex] =
                            movementBoard[positionRow][positionIndex].filter(
                                (value) => {
                                    return value !== actualPlayer;
                                }
                            );
                    }
                }
                console.log(`La ficha del jugador se movió correctamente`);
                console.log(
                    `El nuevo index de la ficha es ${newIndex} y la nueva row es ${newRow}`
                );
                if (typeof movementBoard[newRow][newIndex] === "number") {
                    if (movementBoard[newRow][newIndex] === 0) {
                        movementBoard[newRow][newIndex] = actualPlayer;
                    }
                } else {
                    movementBoard[newRow][newIndex].push(actualPlayer);
                    switch (movementBoard[newRow][newIndex][0]) {
                        /*Vestíbulo: 9
                    Biblioteca: 11
                    Comedor: 12
                    Billar: 13
                    Salón de Baile: 15 */
                        case 9:
                            if (newRow === 4) {
                                movementBoard[6][11].push(actualPlayer);
                                movementBoard[6][12].push(actualPlayer);
                            } else if (newIndex === 11) {
                                movementBoard[4][9].push(actualPlayer);
                                movementBoard[6][12].push(actualPlayer);
                            } else if (newIndex === 12) {
                                movementBoard[4][9].push(actualPlayer);
                                movementBoard[6][11].push(actualPlayer);
                            }
                            break;
                        case 11:
                            if (newRow === 8) {
                                movementBoard[10][3].push(actualPlayer);
                            } else if (newRow === 10) {
                                movementBoard[8][6].push(actualPlayer);
                            }
                            break;
                        case 12:
                            if (newRow === 9) {
                                movementBoard[12][16].push(actualPlayer);
                            } else if (newRow === 12) {
                                movementBoard[9][17].push(actualPlayer);
                            }
                            break;
                        case 13:
                            if (newRow === 12) {
                                movementBoard[15][5].push(actualPlayer);
                            } else if (newRow === 15) {
                                movementBoard[12][1].push(actualPlayer);
                            }
                            break;
                        case 15:
                            if (newIndex === 8) {
                                movementBoard[17][9].push(actualPlayer);
                                movementBoard[17][14].push(actualPlayer);
                                movementBoard[19][15].push(actualPlayer);
                            } else if (newIndex === 9) {
                                movementBoard[19][8].push(actualPlayer);
                                movementBoard[17][14].push(actualPlayer);
                                movementBoard[19][15].push(actualPlayer);
                            } else if (newIndex === 14) {
                                movementBoard[19][8].push(actualPlayer);
                                movementBoard[17][9].push(actualPlayer);
                                movementBoard[19][15].push(actualPlayer);
                            } else if (newIndex === 15) {
                                movementBoard[19][8].push(actualPlayer);
                                movementBoard[17][9].push(actualPlayer);
                                movementBoard[17][14].push(actualPlayer);
                            }
                            break;
                    }
                }
                newCoordenates = [newRow, newIndex];
                newCell = movementBoard[newRow][newIndex];
                switch (pointedCell) {
                    case salaDoor:
                        document
                            .querySelector(`#cell-3u`)
                            .appendChild(playerMovingPiece);
                        break;
                    case vestibuloDoor1:
                        document
                            .querySelector(`#cell-3k`)
                            .appendChild(playerMovingPiece);
                        break;
                    case vestibuloDoor2:
                        document
                            .querySelector(`#cell-3k`)
                            .appendChild(playerMovingPiece);
                        break;
                    case vestibuloDoor3:
                        document
                            .querySelector(`#cell-3k`)
                            .appendChild(playerMovingPiece);
                        break;
                    case estudioDoor:
                        document
                            .querySelector(`#cell-3c`)
                            .appendChild(playerMovingPiece);
                        break;
                    case bibliotecaDoor1:
                        document
                            .querySelector(`#cell-10d`)
                            .appendChild(playerMovingPiece);
                        break;
                    case bibliotecaDoor2:
                        document
                            .querySelector(`#cell-10d`)
                            .appendChild(playerMovingPiece);
                        break;
                    case comedorDoor1:
                        document
                            .querySelector(`#cell-11u`)
                            .appendChild(playerMovingPiece);
                        break;
                    case comedorDoor2:
                        document
                            .querySelector(`#cell-11u`)
                            .appendChild(playerMovingPiece);
                        break;
                    case billarDoor1:
                        document
                            .querySelector(`#cell-15e`)
                            .appendChild(playerMovingPiece);
                        break;
                    case billarDoor2:
                        document
                            .querySelector(`#cell-15e`)
                            .appendChild(playerMovingPiece);
                        break;
                    case baileDoor1:
                        document
                            .querySelector(`#cell-19j`)
                            .appendChild(playerMovingPiece);
                        break;
                    case baileDoor2:
                        document
                            .querySelector(`#cell-19j`)
                            .appendChild(playerMovingPiece);
                        break;
                    case baileDoor3:
                        document
                            .querySelector(`#cell-19j`)
                            .appendChild(playerMovingPiece);
                        break;
                    case baileDoor4:
                        document
                            .querySelector(`#cell-19j`)
                            .appendChild(playerMovingPiece);
                        break;
                    case invernaderoDoor:
                        document
                            .querySelector(`#cell-23d`)
                            .appendChild(playerMovingPiece);
                        break;
                    case cocinaDoor:
                        document
                            .querySelector(`#cell-21v`)
                            .appendChild(playerMovingPiece);
                        break;

                    default:
                        pointedCell.appendChild(playerMovingPiece);
                        break;
                }
                newRow = undefined;
                newIndex = undefined;
                y = 0;
                z = 0;
                playerMovingPiece = undefined;
                enoughToAccuse(newCell, newCoordenates);
                break;
            case 6:
                console.log(`=========== entrando en el case 6 ===========`);
                console.log(`El jugador a mover es ${actualPlayer}`);
                playerMovingPiece = document.querySelector(`#moradillo-ficha`);
                positioningInBoard = [movingPlayerRow, movingPlayerIndex];
                inRoomChecker = accused;
                console.log(inRoomChecker);
                for (let cell of movementAbleCells) {
                    console.dir(cell);
                    if (cell.childNodes[0] === playerMovingPiece) {
                        console.log(
                            `Se encontró la ficha del jugador, y se quitó de su lugar`
                        );
                        cell.removeChild(playerMovingPiece);
                    }
                    cell.classList.remove(`movement-in-cell`);
                }
                for (let row of movementBoardTable.children) {
                    for (let cell of row.children) {
                        if (cell === pointedCell) {
                            newIndex = z;
                            newRow = y;
                        }
                        if (z < 23) {
                            z += 1;
                        } else {
                            z = 0;
                        }
                    }
                    if (y < 24) {
                        y += 1;
                    } else {
                        y = 0;
                    }
                }
                if (!inRoomChecker) {
                    if (
                        movementBoard[positioningInBoard[0]][
                            positioningInBoard[1]
                        ] === actualPlayer
                    ) {
                        movementBoard[positioningInBoard[0]][
                            positioningInBoard[1]
                        ] = 0;
                    }
                } else {
                    for (let coordinate of playerCoordinates) {
                        let positionRow = coordinate[0];
                        let positionIndex = coordinate[1];
                        console.log(
                            `Logueando el valor del casillero de destino`
                        );
                        console.log(
                            typeof movementBoard[positionRow][positionIndex]
                        );
                        console.log(movementBoard[positionRow][positionIndex]);
                        movementBoard[positionRow][positionIndex] =
                            movementBoard[positionRow][positionIndex].filter(
                                (value) => {
                                    return value !== actualPlayer;
                                }
                            );
                    }
                }
                console.log(`La ficha del jugador se movió correctamente`);
                console.log(
                    `El nuevo index de la ficha es ${newIndex} y la nueva row es ${newRow}`
                );
                if (typeof movementBoard[newRow][newIndex] === "number") {
                    if (movementBoard[newRow][newIndex] === 0) {
                        movementBoard[newRow][newIndex] = actualPlayer;
                    }
                } else {
                    movementBoard[newRow][newIndex].push(actualPlayer);
                    switch (movementBoard[newRow][newIndex][0]) {
                        /*Vestíbulo: 9
                    Biblioteca: 11
                    Comedor: 12
                    Billar: 13
                    Salón de Baile: 15 */
                        case 9:
                            if (newRow === 4) {
                                movementBoard[6][11].push(actualPlayer);
                                movementBoard[6][12].push(actualPlayer);
                            } else if (newIndex === 11) {
                                movementBoard[4][9].push(actualPlayer);
                                movementBoard[6][12].push(actualPlayer);
                            } else if (newIndex === 12) {
                                movementBoard[4][9].push(actualPlayer);
                                movementBoard[6][11].push(actualPlayer);
                            }
                            break;
                        case 11:
                            if (newRow === 8) {
                                movementBoard[10][3].push(actualPlayer);
                            } else if (newRow === 10) {
                                movementBoard[8][6].push(actualPlayer);
                            }
                            break;
                        case 12:
                            if (newRow === 9) {
                                movementBoard[12][16].push(actualPlayer);
                            } else if (newRow === 12) {
                                movementBoard[9][17].push(actualPlayer);
                            }
                            break;
                        case 13:
                            if (newRow === 12) {
                                movementBoard[15][5].push(actualPlayer);
                            } else if (newRow === 15) {
                                movementBoard[12][1].push(actualPlayer);
                            }
                            break;
                        case 15:
                            if (newIndex === 8) {
                                movementBoard[17][9].push(actualPlayer);
                                movementBoard[17][14].push(actualPlayer);
                                movementBoard[19][15].push(actualPlayer);
                            } else if (newIndex === 9) {
                                movementBoard[19][8].push(actualPlayer);
                                movementBoard[17][14].push(actualPlayer);
                                movementBoard[19][15].push(actualPlayer);
                            } else if (newIndex === 14) {
                                movementBoard[19][8].push(actualPlayer);
                                movementBoard[17][9].push(actualPlayer);
                                movementBoard[19][15].push(actualPlayer);
                            } else if (newIndex === 15) {
                                movementBoard[19][8].push(actualPlayer);
                                movementBoard[17][9].push(actualPlayer);
                                movementBoard[17][14].push(actualPlayer);
                            }
                            break;
                    }
                }
                newCoordenates = [newRow, newIndex];
                newCell = movementBoard[newRow][newIndex];
                switch (pointedCell) {
                    case salaDoor:
                        document
                            .querySelector(`#cell-4v`)
                            .appendChild(playerMovingPiece);
                        break;
                    case vestibuloDoor1:
                        document
                            .querySelector(`#cell-5n`)
                            .appendChild(playerMovingPiece);
                        break;
                    case vestibuloDoor2:
                        document
                            .querySelector(`#cell-5n`)
                            .appendChild(playerMovingPiece);
                        break;
                    case vestibuloDoor3:
                        document
                            .querySelector(`#cell-5n`)
                            .appendChild(playerMovingPiece);
                        break;
                    case estudioDoor:
                        document
                            .querySelector(`#cell-3d`)
                            .appendChild(playerMovingPiece);
                        break;
                    case bibliotecaDoor1:
                        document
                            .querySelector(`#cell-8e`)
                            .appendChild(playerMovingPiece);
                        break;
                    case bibliotecaDoor2:
                        document
                            .querySelector(`#cell-8e`)
                            .appendChild(playerMovingPiece);
                        break;
                    case comedorDoor1:
                        document
                            .querySelector(`#cell-14t`)
                            .appendChild(playerMovingPiece);
                        break;
                    case comedorDoor2:
                        document
                            .querySelector(`#cell-14t`)
                            .appendChild(playerMovingPiece);
                        break;
                    case billarDoor1:
                        document
                            .querySelector(`#cell-16e`)
                            .appendChild(playerMovingPiece);
                        break;
                    case billarDoor2:
                        document
                            .querySelector(`#cell-16e`)
                            .appendChild(playerMovingPiece);
                        break;
                    case baileDoor1:
                        document
                            .querySelector(`#cell-19m`)
                            .appendChild(playerMovingPiece);
                        break;
                    case baileDoor2:
                        document
                            .querySelector(`#cell-19m`)
                            .appendChild(playerMovingPiece);
                        break;
                    case baileDoor3:
                        document
                            .querySelector(`#cell-19m`)
                            .appendChild(playerMovingPiece);
                        break;
                    case baileDoor4:
                        document
                            .querySelector(`#cell-19m`)
                            .appendChild(playerMovingPiece);
                        break;
                    case invernaderoDoor:
                        document
                            .querySelector(`#cell-22b`)
                            .appendChild(playerMovingPiece);
                        break;
                    case cocinaDoor:
                        document
                            .querySelector(`#cell-21u`)
                            .appendChild(playerMovingPiece);
                        break;

                    default:
                        pointedCell.appendChild(playerMovingPiece);
                        break;
                }
                newRow = undefined;
                newIndex = undefined;
                y = 0;
                z = 0;
                playerMovingPiece = undefined;
                enoughToAccuse(newCell, newCoordenates);
                break;
        }
    };
    // Función que sirve para determinar si se trata de la puerta de una habitación. Y analiza a su vez si la antesala se encuentra disponible para ingresar - Corrije errores de cálculo de movimiento en casos muy específicos.
    const isRoomDoor = () => {
        console.log(`========= Ejecutando isRoomDoor =========`);
        let antesala, sala;
        console.log(`El jugador que se está evaluando en isRoomDoor es:`);
        console.log(activePlayerPiece);
        for (let i = 0; i <= 17; i += 1) {
            switch (i) {
                case 0:
                    antesala = document.querySelector(`#cell-5g`);
                    sala = document.querySelector(`#cell-4g`);
                    if (
                        !antesala.classList.contains(`movement-in-cell`) &&
                        antesala.childNodes[0] !== activePlayerPiece
                    ) {
                        sala.classList.remove(`movement-in-cell`);
                    }
                    break;
                case 1:
                    antesala = document.querySelector(`#cell-5i`);
                    sala = document.querySelector(`#cell-5j`);
                    if (
                        !antesala.classList.contains(`movement-in-cell`) &&
                        antesala.childNodes[0] !== activePlayerPiece
                    ) {
                        sala.classList.remove(`movement-in-cell`);
                    }
                    break;
                case 2:
                    antesala = document.querySelector(`#cell-8l`);
                    sala = document.querySelector(`#cell-7l`);
                    if (
                        !antesala.classList.contains(`movement-in-cell`) &&
                        antesala.childNodes[0] !== activePlayerPiece
                    ) {
                        sala.classList.remove(`movement-in-cell`);
                    }
                    break;
                case 3:
                    antesala = document.querySelector(`#cell-8m`);
                    sala = document.querySelector(`#cell-7m`);
                    if (
                        !antesala.classList.contains(`movement-in-cell`) &&
                        antesala.childNodes[0] !== activePlayerPiece
                    ) {
                        sala.classList.remove(`movement-in-cell`);
                    }
                    break;
                case 4:
                    antesala = document.querySelector(`#cell-7r`);
                    sala = document.querySelector(`#cell-6r`);
                    if (
                        !antesala.classList.contains(`movement-in-cell`) &&
                        antesala.childNodes[0] !== activePlayerPiece
                    ) {
                        sala.classList.remove(`movement-in-cell`);
                    }
                    break;
                case 5:
                    antesala = document.querySelector(`#cell-9h`);
                    sala = document.querySelector(`#cell-9g`);
                    if (
                        !antesala.classList.contains(`movement-in-cell`) &&
                        antesala.childNodes[0] !== activePlayerPiece
                    ) {
                        sala.classList.remove(`movement-in-cell`);
                    }
                    break;
                case 6:
                    antesala = document.querySelector(`#cell-12d`);
                    sala = document.querySelector(`#cell-11d`);
                    if (
                        !antesala.classList.contains(`movement-in-cell`) &&
                        antesala.childNodes[0] !== activePlayerPiece
                    ) {
                        sala.classList.remove(`movement-in-cell`);
                    }
                    break;
                case 7:
                    antesala = document.querySelector(`#cell-9r`);
                    sala = document.querySelector(`#cell-10r`);
                    if (
                        !antesala.classList.contains(`movement-in-cell`) &&
                        antesala.childNodes[0] !== activePlayerPiece
                    ) {
                        sala.classList.remove(`movement-in-cell`);
                    }
                    break;
                case 8:
                    antesala = document.querySelector(`#cell-13p`);
                    sala = document.querySelector(`#cell-13q`);
                    if (
                        !antesala.classList.contains(`movement-in-cell`) &&
                        antesala.childNodes[0] !== activePlayerPiece
                    ) {
                        sala.classList.remove(`movement-in-cell`);
                    }
                    break;
                case 9:
                    antesala = document.querySelector(`#cell-12b`);
                    sala = document.querySelector(`#cell-13b`);
                    if (
                        !antesala.classList.contains(`movement-in-cell`) &&
                        antesala.childNodes[0] !== activePlayerPiece
                    ) {
                        sala.classList.remove(`movement-in-cell`);
                    }
                    break;
                case 10:
                    antesala = document.querySelector(`#cell-16g`);
                    sala = document.querySelector(`#cell-16f`);
                    if (
                        !antesala.classList.contains(`movement-in-cell`) &&
                        antesala.childNodes[0] !== activePlayerPiece
                    ) {
                        sala.classList.remove(`movement-in-cell`);
                    }
                    break;
                case 11:
                    antesala = document.querySelector(`#cell-20f`);
                    sala = document.querySelector(`#cell-20e`);
                    if (
                        !antesala.classList.contains(`movement-in-cell`) &&
                        antesala.childNodes[0] !== activePlayerPiece
                    ) {
                        sala.classList.remove(`movement-in-cell`);
                    }
                    break;
                case 12:
                    antesala = document.querySelector(`#cell-20h`);
                    sala = document.querySelector(`#cell-20i`);
                    if (
                        !antesala.classList.contains(`movement-in-cell`) &&
                        antesala.childNodes[0] !== activePlayerPiece
                    ) {
                        sala.classList.remove(`movement-in-cell`);
                    }
                    break;
                case 13:
                    antesala = document.querySelector(`#cell-17j`);
                    sala = document.querySelector(`#cell-18j`);
                    if (
                        !antesala.classList.contains(`movement-in-cell`) &&
                        antesala.childNodes[0] !== activePlayerPiece
                    ) {
                        sala.classList.remove(`movement-in-cell`);
                    }
                    break;
                case 14:
                    antesala = document.querySelector(`#cell-17o`);
                    sala = document.querySelector(`#cell-18o`);
                    if (
                        !antesala.classList.contains(`movement-in-cell`) &&
                        antesala.childNodes[0] !== activePlayerPiece
                    ) {
                        sala.classList.remove(`movement-in-cell`);
                    }
                    break;
                case 15:
                    antesala = document.querySelector(`#cell-20q`);
                    sala = document.querySelector(`#cell-20p`);
                    if (
                        !antesala.classList.contains(`movement-in-cell`) &&
                        antesala.childNodes[0] !== activePlayerPiece
                    ) {
                        sala.classList.remove(`movement-in-cell`);
                    }
                    break;
                case 16:
                    antesala = document.querySelector(`#cell-18t`);
                    sala = document.querySelector(`#cell-19t`);
                    if (
                        !antesala.classList.contains(`movement-in-cell`) &&
                        antesala.childNodes[0] !== activePlayerPiece
                    ) {
                        sala.classList.remove(`movement-in-cell`);
                    }
                    break;
            }
        }
        console.log(`Total de puertas corregidas`);
    };
    // Función que ayuda a determinar si se trata de un casillero susceptible de recibir a la ficha, o si es en realidad una pared o casillero inhabil.
    const isAbleCell = (cell) => {
        if (typeof cell === "number") {
            if (
                cell === 0 ||
                cell === 8 ||
                cell === 9 ||
                cell === 10 ||
                cell === 11 ||
                cell === 12 ||
                cell === 13 ||
                cell === 14 ||
                cell === 15 ||
                cell === 16
            ) {
                console.log(`La validación is ablecell dio positiva`);
                return true;
            }
        } else {
            if (
                +cell[0] === 0 ||
                +cell[0] === 8 ||
                +cell[0] === 9 ||
                +cell[0] === 10 ||
                +cell[0] === 11 ||
                +cell[0] === 12 ||
                +cell[0] === 13 ||
                +cell[0] === 14 ||
                +cell[0] === 15 ||
                +cell[0] === 16
            ) {
                console.log(`Se parseó ${+cell} a ${typeof +cell}`);
                console.log(`La validación is ablecell dio positiva`);
                return true;
            }
        }
    };

    /* const playerAccused = (player, cell) => {
        if (
            cell === +(String(8) + String(player)) ||
            cell === +(String(9) + String(player)) ||
            cell === +(String(10) + String(player)) ||
            cell === +(String(11) + String(player)) ||
            cell === +(String(12) + String(player)) ||
            cell === +(String(13) + String(player)) ||
            cell === +(String(14) + String(player)) ||
            cell === +(String(15) + String(player)) ||
            cell === +(String(16) + String(player))
        ) {
            return true;
        } else {
            return false;
        }
    }; */
    // FUNCIÓN PRINCIPAL PARA LA DETERMINACIÓN DEL MOVIMIENTO DEL PERSONAJE - Ubica la posición de la ficha, y en función de eso inicia el cálculo de las celdas vecinas determinando cuáles son hábiles para el movimiento y cuáles no. De ser hábiles, les añade la Clase movementAbleCell, permitiendo el movimiento de la ficha a la celda.
    const playerMovement = (diceNumber, actualPlayer) => {
        console.log(`ejecutando player movement`);
        activePlayerPiece.focus();
        /* console.log(actualPlayer);
    console.log(diceNumber); */
        movement = diceNumber;
        let sala;
        let possibleMovementRow;
        let possibleMovementCell;
        let materializedCell;
        let i = 0;
        let limitedMovement;
        let rowCounter = 0;
        let possibleCell;
        accuseChecker = false;
        multipleCoordenates = [];
        movingPlayer = actualPlayer + 1;
        /* console.log(movingPlayer); */
        for (let row of movementBoard) {
            /* console.log(row); */
            for (let cell of row) {
                /* console.log(`Chequeando ${cell}`);
            console.log(`${typeof cell}`); */
                if (typeof cell === "number") {
                    /* console.log(`Entró acá`); */
                    if (movingPlayer === cell) {
                        movingPlayerIndex = row.indexOf(cell);
                        movingPlayerRow = movementBoard.indexOf(row);
                        console.log(
                            `La ubicación del jugador es en fila ${movementBoard.indexOf(
                                row
                            )}, celda ${movingPlayerIndex}`
                        );
                        console.log(
                            `La ubicación del jugador es en fila ${movingPlayerRow}, celda ${movingPlayerIndex}`
                        );
                        possibleMovementCell = i;
                        possibleMovementRow = movementBoard.indexOf(row);
                        break;
                    }
                    if (i < 23) {
                        i += 1;
                    } else {
                        i = 0;
                    }
                } else {
                    if (cell.includes(movingPlayer)) {
                        multipleCoordenates.push([
                            movementBoard.indexOf(row),
                            row.indexOf(cell),
                        ]);
                        console.log(multipleCoordenates);
                        console.log(
                            `La Ubicación del jugador es en las siguientes coordenadas: ${multipleCoordenates}`
                        );
                        /* console.log(
                        `La ubicación del jugador es en fila ${movingPlayerRow}, celda ${movingPlayerIndex}`
                    ); */
                        possibleMovementCell = i;
                        possibleMovementRow = movementBoard.indexOf(row);
                        accuseChecker = true;
                    }
                    if (i < 23) {
                        i += 1;
                    } else {
                        i = 0;
                    }
                }
            }

            if (rowCounter < 24) {
                rowCounter += 1;
            } else {
                rowCounter = 0;
            }
        }
        rowCounter = 0;
        i = 0;
        movementCount = 0;
        // Calculando el movimiento
        console.log(`========= LOGUEANDO ACCUSE CHECKER ==========`);
        console.log(accuseChecker);
        console.log(`========= LOGUEANDO MULTIPLE COORDENATES ==========`);
        console.log(multipleCoordenates);
        if (!accuseChecker) {
            movementBoardTable.children[movingPlayerRow].children[
                movingPlayerIndex
            ].classList.add(`movement-in-cell`);

            neighborCells = [[movingPlayerRow, movingPlayerIndex]];
            for (let i = 0; i <= movement; i += 1) {
                console.log(`Ejecutando Calculating Movement`);
                console.table(neighborCells);
                neighborCells.forEach((element) => {
                    console.log(element);
                    console.log(element[0]);
                    console.log(element[1]);
                    console.log(movementBoard[element[0]][element[1]]);
                    if (
                        typeof movementBoard[element[0]][element[1]] ===
                        "number"
                    ) {
                        if (
                            isAbleCell(movementBoard[element[0]][element[1]]) &&
                            (movementBoardTable.children[
                                element[0] - 1 > 0 ? element[0] - 1 : 0
                            ].children[element[1]].classList.contains(
                                `movement-in-cell`
                            ) ||
                                movementBoardTable.children[
                                    element[0] + 1 < 24 ? element[0] + 1 : 24
                                ].children[element[1]].classList.contains(
                                    `movement-in-cell`
                                ) ||
                                movementBoardTable.children[
                                    element[0]
                                ].children[
                                    element[1] - 1 > 0 ? element[1] - 1 : 0
                                ].classList.contains(`movement-in-cell`) ||
                                movementBoardTable.children[
                                    element[0]
                                ].children[
                                    element[1] + 1 < 23 ? element[1] + 1 : 23
                                ].classList.contains(`movement-in-cell`))
                        ) {
                            possibleCell =
                                movementBoardTable.children[element[0]]
                                    .children[[element[1]]];
                            possibleCell.classList.add(`movement-in-cell`);
                        }
                    } else {
                        console.log(`Ingresa como puerta`);
                        let a = element[0];
                        let b = element[1];
                        console.log(String(a) + String(b));
                        switch (`${String(a) + String(b)}`) {
                            case "36":
                                console.log(`Ingresa switch estudio`);
                                if (
                                    movementBoardTable.children[4].children[6].classList.contains(
                                        `movement-in-cell`
                                    )
                                ) {
                                    possibleCell =
                                        movementBoardTable.children[element[0]]
                                            .children[[element[1]]];
                                    possibleCell.classList.add(
                                        `movement-in-cell`
                                    );
                                }
                                break;
                            case "49":
                                console.log(`Ingresa switch estudio`);
                                if (
                                    movementBoardTable.children[4].children[8].classList.contains(
                                        `movement-in-cell`
                                    )
                                ) {
                                    possibleCell =
                                        movementBoardTable.children[element[0]]
                                            .children[[element[1]]];
                                    possibleCell.classList.add(
                                        `movement-in-cell`
                                    );
                                }
                                break;
                            case "517":
                                console.log(`Ingresa switch estudio`);
                                if (
                                    movementBoardTable.children[6].children[17].classList.contains(
                                        `movement-in-cell`
                                    )
                                ) {
                                    possibleCell =
                                        movementBoardTable.children[element[0]]
                                            .children[[element[1]]];
                                    possibleCell.classList.add(
                                        `movement-in-cell`
                                    );
                                }
                                break;
                            case "611":
                                console.log(`Ingresa switch estudio`);
                                if (
                                    movementBoardTable.children[7].children[11].classList.contains(
                                        `movement-in-cell`
                                    )
                                ) {
                                    possibleCell =
                                        movementBoardTable.children[element[0]]
                                            .children[[element[1]]];
                                    possibleCell.classList.add(
                                        `movement-in-cell`
                                    );
                                }
                                break;
                            case "612":
                                console.log(`Ingresa switch estudio`);
                                if (
                                    movementBoardTable.children[7].children[12].classList.contains(
                                        `movement-in-cell`
                                    )
                                ) {
                                    possibleCell =
                                        movementBoardTable.children[element[0]]
                                            .children[[element[1]]];
                                    possibleCell.classList.add(
                                        `movement-in-cell`
                                    );
                                }
                                break;
                            case "86":
                                console.log(`Ingresa switch estudio`);
                                if (
                                    movementBoardTable.children[8].children[7].classList.contains(
                                        `movement-in-cell`
                                    )
                                ) {
                                    possibleCell =
                                        movementBoardTable.children[element[0]]
                                            .children[[element[1]]];
                                    possibleCell.classList.add(
                                        `movement-in-cell`
                                    );
                                }
                                break;
                            case "917":
                                console.log(`Ingresa switch estudio`);
                                if (
                                    movementBoardTable.children[8].children[17].classList.contains(
                                        `movement-in-cell`
                                    )
                                ) {
                                    possibleCell =
                                        movementBoardTable.children[element[0]]
                                            .children[[element[1]]];
                                    possibleCell.classList.add(
                                        `movement-in-cell`
                                    );
                                }
                                break;
                            case "103":
                                console.log(`Ingresa switch estudio`);
                                if (
                                    movementBoardTable.children[11].children[3].classList.contains(
                                        `movement-in-cell`
                                    )
                                ) {
                                    possibleCell =
                                        movementBoardTable.children[element[0]]
                                            .children[[element[1]]];
                                    possibleCell.classList.add(
                                        `movement-in-cell`
                                    );
                                }
                                break;
                            case "121":
                                console.log(`Ingresa switch estudio`);
                                if (
                                    movementBoardTable.children[11].children[1].classList.contains(
                                        `movement-in-cell`
                                    )
                                ) {
                                    possibleCell =
                                        movementBoardTable.children[element[0]]
                                            .children[[element[1]]];
                                    possibleCell.classList.add(
                                        `movement-in-cell`
                                    );
                                }
                                break;
                            case "1216":
                                console.log(`Ingresa switch estudio`);
                                if (
                                    movementBoardTable.children[12].children[15].classList.contains(
                                        `movement-in-cell`
                                    )
                                ) {
                                    possibleCell =
                                        movementBoardTable.children[element[0]]
                                            .children[[element[1]]];
                                    possibleCell.classList.add(
                                        `movement-in-cell`
                                    );
                                }
                                break;
                            case "155":
                                console.log(`Ingresa switch estudio`);
                                if (
                                    movementBoardTable.children[15].children[6].classList.contains(
                                        `movement-in-cell`
                                    )
                                ) {
                                    possibleCell =
                                        movementBoardTable.children[element[0]]
                                            .children[[element[1]]];
                                    possibleCell.classList.add(
                                        `movement-in-cell`
                                    );
                                }
                                break;
                            case "179":
                                console.log(`Ingresa switch estudio`);
                                if (
                                    movementBoardTable.children[16].children[9].classList.contains(
                                        `movement-in-cell`
                                    )
                                ) {
                                    possibleCell =
                                        movementBoardTable.children[element[0]]
                                            .children[[element[1]]];
                                    possibleCell.classList.add(
                                        `movement-in-cell`
                                    );
                                }
                                break;
                            case "1714":
                                console.log(`Ingresa switch estudio`);
                                if (
                                    movementBoardTable.children[16].children[14].classList.contains(
                                        `movement-in-cell`
                                    )
                                ) {
                                    possibleCell =
                                        movementBoardTable.children[element[0]]
                                            .children[[element[1]]];
                                    possibleCell.classList.add(
                                        `movement-in-cell`
                                    );
                                }
                                break;
                            case "1819":
                                if (
                                    movementBoardTable.children[17].children[19].classList.contains(
                                        `movement-in-cell`
                                    )
                                ) {
                                    possibleCell =
                                        movementBoardTable.children[element[0]]
                                            .children[[element[1]]];
                                    possibleCell.classList.add(
                                        `movement-in-cell`
                                    );
                                }
                                break;
                            case "194":
                                console.log(`Ingresa switch estudio`);
                                if (
                                    movementBoardTable.children[19].children[5].classList.contains(
                                        `movement-in-cell`
                                    )
                                ) {
                                    possibleCell =
                                        movementBoardTable.children[element[0]]
                                            .children[[element[1]]];
                                    possibleCell.classList.add(
                                        `movement-in-cell`
                                    );
                                }
                                break;
                            case "198":
                                console.log(`Ingresa switch estudio`);
                                if (
                                    movementBoardTable.children[19].children[7].classList.contains(
                                        `movement-in-cell`
                                    )
                                ) {
                                    possibleCell =
                                        movementBoardTable.children[element[0]]
                                            .children[[element[1]]];
                                    possibleCell.classList.add(
                                        `movement-in-cell`
                                    );
                                }
                                break;
                            case "1915":
                                console.log(`Ingresa switch estudio`);
                                if (
                                    movementBoardTable.children[19].children[16].classList.contains(
                                        `movement-in-cell`
                                    )
                                ) {
                                    possibleCell =
                                        movementBoardTable.children[element[0]]
                                            .children[[element[1]]];
                                    possibleCell.classList.add(
                                        `movement-in-cell`
                                    );
                                }
                                break;
                        }
                    }

                    if (
                        element[0] > 0 &&
                        movementBoard[element[0] - 1][element[1]] !== 7 &&
                        isAbleCell(movementBoard[element[0] - 1][element[1]])
                    ) {
                        let a = element[0];
                        let b = element[1];
                        console.log(String(a) + String(b));
                        switch (`${String(a) + String(b)}`) {
                            case "36":
                                if (element[0] - 1 !== 3 && element[1] !== 7) {
                                    neighborCells.push([
                                        element[0] - 1,
                                        element[1],
                                    ]);
                                }
                                break;
                            case "517":
                                if (element[0] - 1 !== 5 && element[1] !== 16) {
                                    neighborCells.push([
                                        element[0] - 1,
                                        element[1],
                                    ]);
                                }
                                break;
                            case "194":
                                if (element[0] - 1 !== 18 && element[1] !== 4) {
                                    neighborCells.push([
                                        element[0] - 1,
                                        element[1],
                                    ]);
                                }
                                break;
                            default:
                                neighborCells.push([
                                    element[0] - 1,
                                    element[1],
                                ]);
                                break;
                        }
                        /* console.log(`Analizando ${element[0]}`); */
                        // neighborCells.push([element[0] - 1, element[1]]);
                        /* console.log(`sumando ${[element[0] - 1, element[1]]}`); */
                    }
                    if (
                        element[0] < 24 &&
                        movementBoard[element[0] + 1][element[1]] !== 7 &&
                        isAbleCell(movementBoard[element[0] + 1][element[1]])
                    ) {
                        let a = element[0];
                        let b = element[1];
                        console.log(String(a) + String(b));
                        switch (`${String(a) + String(b)}`) {
                            case "36":
                                if (element[0] + 1 !== 3 && element[1] !== 7) {
                                    neighborCells.push([
                                        element[0] + 1,
                                        element[1],
                                    ]);
                                }
                                break;
                            case "517":
                                if (element[0] + 1 !== 5 && element[1] !== 16) {
                                    neighborCells.push([
                                        element[0] + 1,
                                        element[1],
                                    ]);
                                }
                                break;
                            case "194":
                                if (element[0] + 1 !== 18 && element[1] !== 4) {
                                    neighborCells.push([
                                        element[0] + 1,
                                        element[1],
                                    ]);
                                }
                                break;
                            default:
                                neighborCells.push([
                                    element[0] + 1,
                                    element[1],
                                ]);
                                break;
                        }
                        // neighborCells.push([element[0] + 1, element[1]]);
                    }
                    if (
                        element[1] > 0 &&
                        movementBoard[element[0]][element[1] - 1] !== 7 &&
                        isAbleCell(movementBoard[element[0]][element[1] - 1])
                    ) {
                        let a = element[0];
                        let b = element[1];
                        console.log(String(a) + String(b));
                        switch (`${String(a) + String(b)}`) {
                            case "36":
                                if (element[0] !== 3 && element[1] - 1 !== 7) {
                                    neighborCells.push([
                                        element[0],
                                        element[1] - 1,
                                    ]);
                                }
                                break;
                            case "517":
                                if (element[0] !== 5 && element[1] - 1 !== 16) {
                                    neighborCells.push([
                                        element[0],
                                        element[1] - 1,
                                    ]);
                                }
                                break;
                            case "194":
                                if (element[0] !== 18 && element[1] - 1 !== 4) {
                                    neighborCells.push([
                                        element[0],
                                        element[1] - 1,
                                    ]);
                                }
                                break;
                            default:
                                neighborCells.push([
                                    element[0],
                                    element[1] - 1,
                                ]);
                                break;
                        }
                        // neighborCells.push([element[0], element[1] - 1]);
                    }
                    if (
                        element[1] < 23 &&
                        movementBoard[element[0]][element[1] + 1] !== 7 &&
                        isAbleCell(movementBoard[element[0]][element[1] + 1])
                    ) {
                        let a = element[0];
                        let b = element[1];
                        console.log(String(a) + String(b));
                        switch (`${String(a) + String(b)}`) {
                            case "36":
                                if (element[0] !== 3 && element[1] + 1 !== 7) {
                                    neighborCells.push([
                                        element[0],
                                        element[1] + 1,
                                    ]);
                                }
                                break;
                            case "517":
                                if (element[0] !== 5 && element[1] + 1 !== 16) {
                                    neighborCells.push([
                                        element[0],
                                        element[1] + 1,
                                    ]);
                                }
                                break;
                            case "194":
                                if (element[0] !== 18 && element[1] + 1 !== 4) {
                                    neighborCells.push([
                                        element[0],
                                        element[1] + 1,
                                    ]);
                                }
                                break;
                            default:
                                neighborCells.push([
                                    element[0],
                                    element[1] + 1,
                                ]);
                                break;
                        }
                        // neighborCells.push([element[0], element[1] + 1]);
                    }
                    neighborCells = Array.from(
                        new Set(neighborCells.map(JSON.stringify)),
                        JSON.parse
                    );
                });
                blockedCell = false;
            }
        } else {
            console.log(
                `Entró a retirar el número de múltiples lugares por el accusechecker`
            );
            for (let location of multipleCoordenates) {
                movementBoardTable.children[location[0]].children[
                    location[1]
                ].classList.add(`movement-in-cell`);

                neighborCells = [[location[0], location[1]]];
                for (let i = 0; i <= movement; i += 1) {
                    console.log(`Ejecutando Calculating Movement`);
                    console.table(neighborCells);
                    neighborCells.forEach((element) => {
                        console.log(element);
                        console.log(element[0]);
                        console.log(element[1]);
                        console.log(movementBoard[element[0]][element[1]]);
                        if (
                            typeof movementBoard[element[0]][element[1]] ===
                            "number"
                        ) {
                            if (
                                isAbleCell(
                                    movementBoard[element[0]][element[1]]
                                ) &&
                                (movementBoardTable.children[
                                    element[0] - 1 > 0 ? element[0] - 1 : 0
                                ].children[element[1]].classList.contains(
                                    `movement-in-cell`
                                ) ||
                                    movementBoardTable.children[
                                        element[0] + 1 < 24
                                            ? element[0] + 1
                                            : 24
                                    ].children[element[1]].classList.contains(
                                        `movement-in-cell`
                                    ) ||
                                    movementBoardTable.children[
                                        element[0]
                                    ].children[
                                        element[1] - 1 > 0 ? element[1] - 1 : 0
                                    ].classList.contains(`movement-in-cell`) ||
                                    movementBoardTable.children[
                                        element[0]
                                    ].children[
                                        element[1] + 1 < 23
                                            ? element[1] + 1
                                            : 23
                                    ].classList.contains(`movement-in-cell`))
                            ) {
                                possibleCell =
                                    movementBoardTable.children[element[0]]
                                        .children[[element[1]]];
                                possibleCell.classList.add(`movement-in-cell`);
                            }
                        } else {
                            console.log(`Ingresa como puerta`);
                            let a = element[0];
                            let b = element[1];
                            console.log(String(a) + String(b));
                            switch (`${String(a) + String(b)}`) {
                                case "36":
                                    console.log(`Ingresa switch estudio`);
                                    if (
                                        movementBoardTable.children[4].children[6].classList.contains(
                                            `movement-in-cell`
                                        )
                                    ) {
                                        possibleCell =
                                            movementBoardTable.children[
                                                element[0]
                                            ].children[[element[1]]];
                                        possibleCell.classList.add(
                                            `movement-in-cell`
                                        );
                                    }
                                    break;
                                case "49":
                                    console.log(`Ingresa switch estudio`);
                                    if (
                                        movementBoardTable.children[4].children[8].classList.contains(
                                            `movement-in-cell`
                                        )
                                    ) {
                                        possibleCell =
                                            movementBoardTable.children[
                                                element[0]
                                            ].children[[element[1]]];
                                        possibleCell.classList.add(
                                            `movement-in-cell`
                                        );
                                    }
                                    break;
                                case "517":
                                    console.log(`Ingresa switch estudio`);
                                    if (
                                        movementBoardTable.children[6].children[17].classList.contains(
                                            `movement-in-cell`
                                        )
                                    ) {
                                        possibleCell =
                                            movementBoardTable.children[
                                                element[0]
                                            ].children[[element[1]]];
                                        possibleCell.classList.add(
                                            `movement-in-cell`
                                        );
                                    }
                                    break;
                                case "611":
                                    console.log(`Ingresa switch estudio`);
                                    if (
                                        movementBoardTable.children[7].children[11].classList.contains(
                                            `movement-in-cell`
                                        )
                                    ) {
                                        possibleCell =
                                            movementBoardTable.children[
                                                element[0]
                                            ].children[[element[1]]];
                                        possibleCell.classList.add(
                                            `movement-in-cell`
                                        );
                                    }
                                    break;
                                case "612":
                                    console.log(`Ingresa switch estudio`);
                                    if (
                                        movementBoardTable.children[7].children[12].classList.contains(
                                            `movement-in-cell`
                                        )
                                    ) {
                                        possibleCell =
                                            movementBoardTable.children[
                                                element[0]
                                            ].children[[element[1]]];
                                        possibleCell.classList.add(
                                            `movement-in-cell`
                                        );
                                    }
                                    break;
                                case "86":
                                    console.log(`Ingresa switch estudio`);
                                    if (
                                        movementBoardTable.children[8].children[7].classList.contains(
                                            `movement-in-cell`
                                        )
                                    ) {
                                        possibleCell =
                                            movementBoardTable.children[
                                                element[0]
                                            ].children[[element[1]]];
                                        possibleCell.classList.add(
                                            `movement-in-cell`
                                        );
                                    }
                                    break;
                                case "917":
                                    console.log(`Ingresa switch estudio`);
                                    if (
                                        movementBoardTable.children[8].children[17].classList.contains(
                                            `movement-in-cell`
                                        )
                                    ) {
                                        possibleCell =
                                            movementBoardTable.children[
                                                element[0]
                                            ].children[[element[1]]];
                                        possibleCell.classList.add(
                                            `movement-in-cell`
                                        );
                                    }
                                    break;
                                case "103":
                                    console.log(`Ingresa switch estudio`);
                                    if (
                                        movementBoardTable.children[11].children[3].classList.contains(
                                            `movement-in-cell`
                                        )
                                    ) {
                                        possibleCell =
                                            movementBoardTable.children[
                                                element[0]
                                            ].children[[element[1]]];
                                        possibleCell.classList.add(
                                            `movement-in-cell`
                                        );
                                    }
                                    break;
                                case "121":
                                    console.log(`Ingresa switch estudio`);
                                    if (
                                        movementBoardTable.children[11].children[1].classList.contains(
                                            `movement-in-cell`
                                        )
                                    ) {
                                        possibleCell =
                                            movementBoardTable.children[
                                                element[0]
                                            ].children[[element[1]]];
                                        possibleCell.classList.add(
                                            `movement-in-cell`
                                        );
                                    }
                                    break;
                                case "1216":
                                    console.log(`Ingresa switch estudio`);
                                    if (
                                        movementBoardTable.children[12].children[15].classList.contains(
                                            `movement-in-cell`
                                        )
                                    ) {
                                        possibleCell =
                                            movementBoardTable.children[
                                                element[0]
                                            ].children[[element[1]]];
                                        possibleCell.classList.add(
                                            `movement-in-cell`
                                        );
                                    }
                                    break;
                                case "155":
                                    console.log(`Ingresa switch estudio`);
                                    if (
                                        movementBoardTable.children[15].children[6].classList.contains(
                                            `movement-in-cell`
                                        )
                                    ) {
                                        possibleCell =
                                            movementBoardTable.children[
                                                element[0]
                                            ].children[[element[1]]];
                                        possibleCell.classList.add(
                                            `movement-in-cell`
                                        );
                                    }
                                    break;
                                case "179":
                                    console.log(`Ingresa switch estudio`);
                                    if (
                                        movementBoardTable.children[16].children[9].classList.contains(
                                            `movement-in-cell`
                                        )
                                    ) {
                                        possibleCell =
                                            movementBoardTable.children[
                                                element[0]
                                            ].children[[element[1]]];
                                        possibleCell.classList.add(
                                            `movement-in-cell`
                                        );
                                    }
                                    break;
                                case "1714":
                                    console.log(`Ingresa switch estudio`);
                                    if (
                                        movementBoardTable.children[16].children[14].classList.contains(
                                            `movement-in-cell`
                                        )
                                    ) {
                                        possibleCell =
                                            movementBoardTable.children[
                                                element[0]
                                            ].children[[element[1]]];
                                        possibleCell.classList.add(
                                            `movement-in-cell`
                                        );
                                    }
                                    break;
                                case "1819":
                                    if (
                                        movementBoardTable.children[17].children[19].classList.contains(
                                            `movement-in-cell`
                                        )
                                    ) {
                                        possibleCell =
                                            movementBoardTable.children[
                                                element[0]
                                            ].children[[element[1]]];
                                        possibleCell.classList.add(
                                            `movement-in-cell`
                                        );
                                    }
                                    break;
                                case "194":
                                    console.log(`Ingresa switch estudio`);
                                    if (
                                        movementBoardTable.children[19].children[5].classList.contains(
                                            `movement-in-cell`
                                        )
                                    ) {
                                        possibleCell =
                                            movementBoardTable.children[
                                                element[0]
                                            ].children[[element[1]]];
                                        possibleCell.classList.add(
                                            `movement-in-cell`
                                        );
                                    }
                                    break;
                                case "198":
                                    console.log(`Ingresa switch estudio`);
                                    if (
                                        movementBoardTable.children[19].children[7].classList.contains(
                                            `movement-in-cell`
                                        )
                                    ) {
                                        possibleCell =
                                            movementBoardTable.children[
                                                element[0]
                                            ].children[[element[1]]];
                                        possibleCell.classList.add(
                                            `movement-in-cell`
                                        );
                                    }
                                    break;
                                case "1915":
                                    console.log(`Ingresa switch estudio`);
                                    if (
                                        movementBoardTable.children[19].children[16].classList.contains(
                                            `movement-in-cell`
                                        )
                                    ) {
                                        possibleCell =
                                            movementBoardTable.children[
                                                element[0]
                                            ].children[[element[1]]];
                                        possibleCell.classList.add(
                                            `movement-in-cell`
                                        );
                                    }
                                    break;
                            }
                        }

                        if (
                            element[0] > 0 &&
                            movementBoard[element[0] - 1][element[1]] !== 7 &&
                            isAbleCell(
                                movementBoard[element[0] - 1][element[1]]
                            )
                        ) {
                            let a = element[0];
                            let b = element[1];
                            console.log(String(a) + String(b));
                            switch (`${String(a) + String(b)}`) {
                                case "36":
                                    if (
                                        element[0] - 1 !== 3 &&
                                        element[1] !== 7
                                    ) {
                                        neighborCells.push([
                                            element[0] - 1,
                                            element[1],
                                        ]);
                                    }
                                    break;
                                case "517":
                                    if (
                                        element[0] - 1 !== 5 &&
                                        element[1] !== 16
                                    ) {
                                        neighborCells.push([
                                            element[0] - 1,
                                            element[1],
                                        ]);
                                    }
                                    break;
                                case "194":
                                    if (
                                        element[0] - 1 !== 18 &&
                                        element[1] !== 4
                                    ) {
                                        neighborCells.push([
                                            element[0] - 1,
                                            element[1],
                                        ]);
                                    }
                                    break;
                                default:
                                    neighborCells.push([
                                        element[0] - 1,
                                        element[1],
                                    ]);
                                    break;
                            }
                            /* console.log(`Analizando ${element[0]}`); */
                            // neighborCells.push([element[0] - 1, element[1]]);
                            /* console.log(`sumando ${[element[0] - 1, element[1]]}`); */
                        }
                        if (
                            element[0] < 24 &&
                            movementBoard[element[0] + 1][element[1]] !== 7 &&
                            isAbleCell(
                                movementBoard[element[0] + 1][element[1]]
                            )
                        ) {
                            let a = element[0];
                            let b = element[1];
                            console.log(String(a) + String(b));
                            switch (`${String(a) + String(b)}`) {
                                case "36":
                                    if (
                                        element[0] + 1 !== 3 &&
                                        element[1] !== 7
                                    ) {
                                        neighborCells.push([
                                            element[0] + 1,
                                            element[1],
                                        ]);
                                    }
                                    break;
                                case "517":
                                    if (
                                        element[0] + 1 !== 5 &&
                                        element[1] !== 16
                                    ) {
                                        neighborCells.push([
                                            element[0] + 1,
                                            element[1],
                                        ]);
                                    }
                                    break;
                                case "194":
                                    if (
                                        element[0] + 1 !== 18 &&
                                        element[1] !== 4
                                    ) {
                                        neighborCells.push([
                                            element[0] + 1,
                                            element[1],
                                        ]);
                                    }
                                    break;
                                default:
                                    neighborCells.push([
                                        element[0] + 1,
                                        element[1],
                                    ]);
                                    break;
                            }
                            // neighborCells.push([element[0] + 1, element[1]]);
                        }
                        if (
                            element[1] > 0 &&
                            movementBoard[element[0]][element[1] - 1] !== 7 &&
                            isAbleCell(
                                movementBoard[element[0]][element[1] - 1]
                            )
                        ) {
                            let a = element[0];
                            let b = element[1];
                            console.log(String(a) + String(b));
                            switch (`${String(a) + String(b)}`) {
                                case "36":
                                    if (
                                        element[0] !== 3 &&
                                        element[1] - 1 !== 7
                                    ) {
                                        neighborCells.push([
                                            element[0],
                                            element[1] - 1,
                                        ]);
                                    }
                                    break;
                                case "517":
                                    if (
                                        element[0] !== 5 &&
                                        element[1] - 1 !== 16
                                    ) {
                                        neighborCells.push([
                                            element[0],
                                            element[1] - 1,
                                        ]);
                                    }
                                    break;
                                case "194":
                                    if (
                                        element[0] !== 18 &&
                                        element[1] - 1 !== 4
                                    ) {
                                        neighborCells.push([
                                            element[0],
                                            element[1] - 1,
                                        ]);
                                    }
                                    break;
                                default:
                                    neighborCells.push([
                                        element[0],
                                        element[1] - 1,
                                    ]);
                                    break;
                            }
                            // neighborCells.push([element[0], element[1] - 1]);
                        }
                        if (
                            element[1] < 23 &&
                            movementBoard[element[0]][element[1] + 1] !== 7 &&
                            isAbleCell(
                                movementBoard[element[0]][element[1] + 1]
                            )
                        ) {
                            let a = element[0];
                            let b = element[1];
                            console.log(String(a) + String(b));
                            switch (`${String(a) + String(b)}`) {
                                case "36":
                                    if (
                                        element[0] !== 3 &&
                                        element[1] + 1 !== 7
                                    ) {
                                        neighborCells.push([
                                            element[0],
                                            element[1] + 1,
                                        ]);
                                    }
                                    break;
                                case "517":
                                    if (
                                        element[0] !== 5 &&
                                        element[1] + 1 !== 16
                                    ) {
                                        neighborCells.push([
                                            element[0],
                                            element[1] + 1,
                                        ]);
                                    }
                                    break;
                                case "194":
                                    if (
                                        element[0] !== 18 &&
                                        element[1] + 1 !== 4
                                    ) {
                                        neighborCells.push([
                                            element[0],
                                            element[1] + 1,
                                        ]);
                                    }
                                    break;
                                default:
                                    neighborCells.push([
                                        element[0],
                                        element[1] + 1,
                                    ]);
                                    break;
                            }
                            // neighborCells.push([element[0], element[1] + 1]);
                        }
                        neighborCells = Array.from(
                            new Set(neighborCells.map(JSON.stringify)),
                            JSON.parse
                        );
                    });
                }
            }
        }
        neighborCells = [];
        isRoomDoor();
        console.log(`Le estoy mandando accuseChecker ${accuseChecker}`);
        for (let cell of movementAbleCells) {
            if (cell.classList.contains("movement-in-cell")) {
                thereIsMovement = true;
            }
            cell.addEventListener("click", (evt) => {
                console.log(evt);
                targetedCell = evt.path[0];
                if (targetedCell.classList.contains(`movement-in-cell`)) {
                    console.log(
                        `Le estoy pasando al a función para mover el index ${movingPlayerIndex} y el row ${movingPlayerRow}`
                    );
                    console.log(
                        `Nuevamente repito, estoy mandando accuseChecker ${accuseChecker}`
                    );
                    console.log(
                        `========= NUEVAMENTE LE ESTOY PASANDO LAS MULTIPLE COORDENATES MULTIPLE COORDENATES ==========`
                    );
                    console.log(multipleCoordenates);
                    movingPlayerToCell(
                        movingPlayer,
                        movingPlayerRow,
                        movingPlayerIndex,
                        targetedCell,
                        accuseChecker,
                        multipleCoordenates
                    );
                } else {
                    console.log(
                        `El casillero seleccionado está fuera de su alcance`
                    );
                    for (let cell of movementAbleCells) {
                        cell.addEventListener("click", (evt) => {
                            console.log(evt);
                            targetedCell = evt.path[0];
                        });
                    }
                }
            });
        }
        if (!thereIsMovement) {
            console.log(
                `La puerta está bloqueada - Pintando puertas del lugar`
            );
            for (let place of multipleCoordenates) {
                movementBoardTable.children[place[0]].children[
                    [place[1]]
                ].classList.add("movement-in-cell");
            }
        }
        thereIsMovement = false;
    };

    // Función auxiliar que permite que al seleccionar las cartas de sospechoso, arma y lugar, vaya haciendo un checkmark y no se repitan en la tríada
    /* const isInTriad = () => {
        for (item of selectedTriade) {
            console.log(item);
            if (
                item === selectedSuspect ||
                item === selectedWeapon ||
                item === selectedRoom
            ) {
                console.log(`se encontró en la tríada`);
                return true;
            } else {
                console.log(`no se encontró en la tríada`);
                return false;
            }
        }
    }; */

    const popUpAccAdvise = (card) => {
        switch (card) {
            case "LLAVEDETUERCAS":
                return "LLAVE DE TUERCAS";
                break;
            case "SALONDEBAILE":
                return "SALÓN DE BAILE";
                break;
            case "SALADEBILLAR":
                return "SALA DE BILLAR";
                break;
            default:
                return card;
                break;
        }
    };
    // Función AUXILIAR de checkingNextPlHand; permite analizar la mano del jugador que sigue al que realizó la acusación. Recorre la Clave del jugador siguiente, analizando los arrays de cartas para determinar si tiene alguna carta que se corresponda con la acusación. De ser así, determina en forma aleatoria cuál carta mostrar al jugador que realizó la acusación. En caso de no tener ninguna, sigue hacia el jugador que le sigue (Función recurrente)
    const searchingPlHand = (player) => {
        if (player > Object.keys(manosArmadas).length) {
            player = 1;
        }
        console.log(`El contador es ${player}`);
        console.log(`El player es ${player}`);
        let nextPlayer = player;

        console.log(`La playerHand evaluada es ${nextPlayer}`);
        // console.log(`El actual player evaluado es ${actualPlayer + 1}`);
        console.log(+nextPlayer !== actualPlayer + 1);
        if (+nextPlayer !== actualPlayer + 1) {
            for (let category of manosArmadas[`${nextPlayer}`]) {
                for (let card of category) {
                    if (selectedTriade.includes(card)) {
                        console.log(`El jugador ${nextPlayer} tiene: ${card}`);
                        possibleShowingCards.push(card);
                        playerWhoShowed = nextPlayer;
                    }
                }
            }
            if (
                possibleShowingCards.length !== 0 ||
                nextPlayer + 1 === actualPlayer + 1
            ) {
                console.log("Cortando el bucle");
                return possibleShowingCards;
            } else {
                console.log(`Pasando al siguiente jugador`);
                if (nextPlayer < Object.keys(manosArmadas).length) {
                    nextPlayer += 1;
                } else {
                    nextPlayer = 1;
                }
                searchingPlHand(nextPlayer);
            }
        }
    };
    // FUNCIÓN QUE BUSCA DETERMINAR SI EL JUGADOR SIGUIENTE TIENE CARTAS PARA MOSTRAR AL QUE SE ENCUENTRA HACIENDO LA ACUSACIÓN
    const checkingNextPlHand = (selectedTriade) => {
        matchFind = false;
        let triadeAccusationCheck = selectedTriade;
        console.log(selectedTriade);
        let category;
        searchingPlHand(actualPlayer + 2);
        console.log(possibleShowingCards);
        console.log(possibleShowingCards.length);
        if (possibleShowingCards.length > 1) {
            console.log(`Tiene varias cartas a mostrar, se seleccionó:`);
            do {
                console.log(`Se determinó PickedCard`);
                pickedCard = possibleShowingCards.filter(() => {
                    return !possibleShowingCards[
                        Math.ceil(Math.random() * possibleShowingCards.length)
                    ];
                });
                console.log(pickedCard);
            } while (pickedCard === [] || pickedCard.length !== 1);

            cardToShow = pickedCard[0];
            console.log(`Tiene varias cartas a mostrar, se seleccionó:`);
            console.log(cardToShow);
            let tempCard = popUpAccAdvise(cardToShow);
            Swal.fire({
                title: `¡No acertaste! El <span style="color: ${
                    colors[`${playerWhoShowed}`]
                }">Jugador ${playerWhoShowed}</span> te mostró: <br> <span style="color: ${
                    colors[`${playerWhoShowed}`]
                }">${tempCard}</span>`,
                /* text: `${tempCard}`, */
                imageUrl: `${cartas[`${cardToShow.toLowerCase()}`]}`,
                imageWidth: 180,
                imageHeight: 300,
                imageAlt: `${tempCard}`,
                timer: 4000,
                timerProgressBar: true,
                didOpen: () => {
                    const b = Swal.getHtmlContainer().querySelector("b");
                },
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log("I was closed by the timer");
                }
            });
        } else if (possibleShowingCards.length === 1) {
            cardToShow = possibleShowingCards[0];
            console.log(`Tiene una sola carta a mostrar, se seleccionó:`);
            console.log(cardToShow);
            let tempCard = popUpAccAdvise(cardToShow);
            Swal.fire({
                title: `¡No acertaste! El <span style="color: ${
                    colors[`${playerWhoShowed}`]
                }">Jugador ${playerWhoShowed}</span> te mostró: <br> <span style="color: ${
                    colors[`${playerWhoShowed}`]
                }">${tempCard}</span>`,
                /* text: `${tempCard}`, */
                imageUrl: `${cartas[`${cardToShow.toLowerCase()}`]}`,
                imageWidth: 180,
                imageHeight: 300,
                imageAlt: `${tempCard}`,
                timer: 4000,
                timerProgressBar: true,
                didOpen: () => {
                    const b = Swal.getHtmlContainer().querySelector("b");
                },
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log("I was closed by the timer");
                }
            });
        } else {
            Swal.fire({
                title: "¿Estarás cerca...?",
                text: `¡No te mostraron cartas! Puede que tengas alguna de las acusadas`,
                imageUrl: `${cartas.unknown}`,
                imageWidth: 180,
                imageHeight: 300,
                imageAlt: "Clue unknown card",
                timer: 4000,
                timerProgressBar: true,
                didOpen: () => {
                    const b = Swal.getHtmlContainer().querySelector("b");
                },
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log("I was closed by the timer");
                }
            });
        }
        if (esPersonaje(cardToShow) !== undefined) {
            category = 0;
        }
        if (esArma(cardToShow) !== undefined) {
            category = 1;
        }
        if (esHabitacion(cardToShow) !== undefined) {
            category = 2;
        }
        if (cardToShow !== undefined) {
            if (
                !cartasDescubiertas[`${actualPlayer + 1}`][category].includes(
                    cardToShow
                )
            ) {
                cartasDescubiertas[`${actualPlayer + 1}`][category].push(
                    cardToShow
                );
            } else {
                console.log(`Ya has visto esta carta`);
            }
        }
        console.log(cartasDescubiertas);
        possibleShowingCards = [];
        cardToShow = undefined;
        playerWhoShowed = undefined;
    };

    // FUNCIÓN QUE UNA VEZ CONFIRMADA LA ACUSACIÓN CHEQUEA SI CORRESPONDE DECLARAR UN GANADOR, O SI POR EL CONTRARIO, CORRESPONDE MOSTRAR UNA CARTA DEL JUGADOR SIGUIENTE, Y DAR CURSO AL SIGUIENTE TURNO
    const confirmAccusation = (evt) => {
        console.log(selectedTarget);
        movingAccusedPlayer();
        console.log(`la Solución es: ${solution}`);
        console.log(`la acusación es: ${selectedTriade}`);
        console.log(`Chequeando mano de los otros jugadores`);
        if (
            selectedTriade[0] !== solution[0] ||
            selectedTriade[1] !== solution[1] ||
            selectedTriade[2] !== solution[2]
        ) {
            checkingNextPlHand(selectedTriade);
        }
        if (
            selectedTriade[0] === solution[0] &&
            selectedTriade[1] === solution[1] &&
            selectedTriade[2] === solution[2]
        ) {
            accusationCloseBtn.click();
            // Al haber ganado se crea la pantalla de victoria con sus respectivos botones de navegación para comenzar una nueva partida, o para salir del juego.
            const winningScreen = document.createElement("div");
            winningScreen.classList.add("winning-screen");
            const winningCards = document.createElement("div");
            winningCards.classList.add("winning-cards");
            const winningTextContainer = document.createElement("div");
            winningTextContainer.classList.add("winning-text-container");
            winningScreen.appendChild(winningCards);
            winningScreen.prepend(winningTextContainer);
            const newGameBtnContainer = document.createElement("div");
            newGameBtnContainer.classList.add("new-game-btn-container");
            const newGameBtn = document.createElement("button");
            const quitGameBtn = document.createElement("button");
            newGameBtn.classList.add("new-game-btn");
            quitGameBtn.classList.add("quit-game-btn");
            newGameBtn.innerText = "Nueva Partida";
            quitGameBtn.innerText = "Salir";
            newGameBtn.setAttribute("id", "new-Game-Btn");
            quitGameBtn.setAttribute("id", "quit-Game-Btn");
            newGameBtnContainer.appendChild(newGameBtn);
            newGameBtnContainer.appendChild(quitGameBtn);
            winningScreen.appendChild(newGameBtnContainer);
            let cardCounter = 1;
            selectedTriade.forEach((card) => {
                console.log(card);
                let imgContainer = document.createElement("img");
                imgContainer.classList.add("winning-card");
                imgContainer.classList.add(`winning-card-${cardCounter}`);
                cardCounter += 1;
                imgContainer.setAttribute(
                    "src",
                    `${cartas[card.toLowerCase()]}`
                );
                winningCards.appendChild(imgContainer);
            });
            const winningText = document.createElement("h2");
            winningText.classList.add("winning-text");
            winningText.innerText = `¡Has ganado!  ${
                solution[0] === "VERDI" ||
                solution[0] === "MOSTAZA" ||
                solution[0] === "MORADILLO"
                    ? "El"
                    : "La"
            } ${
                solution[0] === "VERDI" ||
                solution[0] === "MOSTAZA" ||
                solution[0] === "MORADILLO"
                    ? "asesino"
                    : "asesina"
            } era ${solution[0]}, con ${
                solution[1] === "CUCHILLO" ||
                solution[1] === "TUBO" ||
                solution[1] === "CANDELABRO"
                    ? "el"
                    : "la"
            } ${
                solution[1] === "LLAVEDETUERCAS"
                    ? `LLAVE DE TUERCAS`
                    : solution[1]
            } en ${
                solution[2] === "INVERNADERO" ||
                solution[2] === "SALONDEBAILE" ||
                solution[2] === "COMEDOR" ||
                solution[2] === "ESTUDIO" ||
                solution[2] === "VESTIBULO"
                    ? "el"
                    : "la"
            } ${
                solution[2] === "SALONDEBAILE"
                    ? `SALÓN DE BAILE`
                    : solution[2] === "SALADEBILLAR"
                    ? `SALA DE BILLAR`
                    : solution[2]
            }`;
            winningTextContainer.prepend(winningText);
            let documentValues = Object.values(
                document.childNodes[1].childNodes
            );
            let universalDocument;
            for (let son of documentValues) {
                console.dir(son);
                if ((son.tagName = "body")) {
                    universalDocument = son;
                }
            }
            universalDocument.prepend(winningScreen);
            if (window.scrollY !== 0) {
                winningScreen.style.top = `${window.scrollY}px`;
            }
            window.addEventListener("scroll", (evt) => {
                winningScreen.style.top = `${window.scrollY}px`;
            });
            setTimeout(() => {
                showMessage(``);
            }, 200);
            for (let i = 1; i <= 6; i += 1) {
                sessionStorage.removeItem(`playerHand${i}`);
            }
            hideAccBtn();
            // Función que maneja el evento click en cualquiera de los botones de navegación de la pantalla de victoria
            newGameFunction();
        } else {
            setTimeout(() => {
                showMessage(
                    `¡No acertaste, prueba mejor suerte la próxima vez!`
                );
            }, 200);
            if (actualPlayer < playerNumber - 1) {
                console.log("pasando al siguiente turno");
                actualPlayer += 1;
                console.log(`ActualPlayer es: ${actualPlayer}`);
            } else {
                console.log("reiniciando la ronda");
                actualPlayer = 0;
                console.log(`ActualPlayer es: ${actualPlayer}`);
            }
            accusationCloseBtn.click();
            /* resetRoomMatrix(); */
            hideDiceBtn();
            hideAccBtn();
            resetAccusation();
            setTimeout(() => {
                turnDynamic(playerNumber);
            }, 4500);
        }
    };

    let suspectCheck, weaponCheck;
    // Función que restaura las cartas a su color natural para el siguiente turno
    const unGrayingCards = () => {
        console.log(`Despintando cartas jugador`);
        let counter = 0;
        for (let screenCard of accusationTotalCards) {
            /* console.log(counter); */
            accusationTotalCards[counter].childNodes[0].classList.remove(
                `greyed-card`
            );
            if (counter < 20) {
                counter += 1;
            } else {
                counter = 0;
            }
        }
        return;
    };

    // FUNCIÓN QUE PINTA EN GRIS LAS CARTAS QUE EL JUGADOR HA VISTO Y SABE QUE NO SON LAS DE LA SOLUCIÓN
    const greyscaleCards = (jugador) => {
        console.log(` ========= Runing grayscale =========`);
        let currentHand;
        let storagedHand;
        let discoveredStoragedHand;
        let totalCardsToGrey = [];
        let counter = 0;
        switch (jugador + 1) {
            case 1:
                unGrayingCards();
                storagedHand = "playerHand1";
                discoveredStoragedHand = "discoveredHand1";
                currentHand = sessionStorage.getItem(storagedHand);
                currentDiscoveredHand = sessionStorage.getItem(
                    discoveredStoragedHand
                );
                /* console.log(currentHand); */
                currentHand = JSON.parse(currentHand);
                currentDiscoveredHand = JSON.parse(currentDiscoveredHand);
                /* console.log(currentHand); */
                totalCardsToGrey = [currentHand, currentDiscoveredHand];
                for (let object of totalCardsToGrey) {
                    for (const key in object) {
                        for (let card of object[`${key}`]) {
                            /* console.log(card); */
                            /* console.log(`./${card}`); */
                            for (let screenCard of accusationTotalCards) {
                                /* console.log(counter); */
                                if (
                                    accusationTotalCards[counter].childNodes[0]
                                        .attributes[0].value === `./${card}`
                                ) {
                                    /* console.log(`Se encontró ${card} en ${screenCard}`); */
                                    accusationTotalCards[
                                        counter
                                    ].childNodes[0].classList.add(
                                        `greyed-card`
                                    );
                                }
                                if (counter < 20) {
                                    counter += 1;
                                } else {
                                    counter = 0;
                                }
                            }
                        }
                    }
                }
                break;
            case 2:
                storagedHand = "playerHand2";
                unGrayingCards();
                currentHand = sessionStorage.getItem(storagedHand);
                /* console.log(currentHand); */
                currentHand = JSON.parse(currentHand);
                /* console.log(currentHand); */
                discoveredStoragedHand = "discoveredHand2";
                currentDiscoveredHand = sessionStorage.getItem(
                    discoveredStoragedHand
                );
                currentDiscoveredHand = JSON.parse(currentDiscoveredHand);
                totalCardsToGrey = [currentHand, currentDiscoveredHand];
                for (let object of totalCardsToGrey) {
                    for (const key in object) {
                        for (let card of object[`${key}`]) {
                            /* console.log(card);
                        console.log(`./${card}`); */
                            for (let screenCard of accusationTotalCards) {
                                /* console.log(counter); */
                                if (
                                    accusationTotalCards[counter].childNodes[0]
                                        .attributes[0].value === `./${card}`
                                ) {
                                    /* console.log(`Se encontró ${card} en ${screenCard}`); */
                                    accusationTotalCards[
                                        counter
                                    ].childNodes[0].classList.add(
                                        `greyed-card`
                                    );
                                }
                                if (counter < 20) {
                                    counter += 1;
                                } else {
                                    counter = 0;
                                }
                            }
                        }
                    }
                }
                break;
            case 3:
                storagedHand = "playerHand3";
                unGrayingCards();
                currentHand = sessionStorage.getItem(storagedHand);
                /* console.log(currentHand); */
                currentHand = JSON.parse(currentHand);
                /* console.log(currentHand); */
                discoveredStoragedHand = "discoveredHand3";
                currentDiscoveredHand = sessionStorage.getItem(
                    discoveredStoragedHand
                );
                currentDiscoveredHand = JSON.parse(currentDiscoveredHand);
                totalCardsToGrey = [currentHand, currentDiscoveredHand];
                for (let object of totalCardsToGrey) {
                    for (const key in object) {
                        for (let card of object[`${key}`]) {
                            /* console.log(card);
                        console.log(`./${card}`); */
                            for (let screenCard of accusationTotalCards) {
                                /* console.log(counter); */
                                if (
                                    accusationTotalCards[counter].childNodes[0]
                                        .attributes[0].value === `./${card}`
                                ) {
                                    /* console.log(`Se encontró ${card} en ${screenCard}`); */
                                    accusationTotalCards[
                                        counter
                                    ].childNodes[0].classList.add(
                                        `greyed-card`
                                    );
                                }
                                if (counter < 20) {
                                    counter += 1;
                                } else {
                                    counter = 0;
                                }
                            }
                        }
                    }
                }
                break;
            case 4:
                storagedHand = "playerHand4";
                unGrayingCards();
                currentHand = sessionStorage.getItem(storagedHand);
                /* console.log(currentHand); */
                currentHand = JSON.parse(currentHand);
                /* console.log(currentHand); */
                discoveredStoragedHand = "discoveredHand4";
                currentDiscoveredHand = sessionStorage.getItem(
                    discoveredStoragedHand
                );
                currentDiscoveredHand = JSON.parse(currentDiscoveredHand);
                totalCardsToGrey = [currentHand, currentDiscoveredHand];
                for (let object of totalCardsToGrey) {
                    for (const key in object) {
                        for (let card of object[`${key}`]) {
                            /* console.log(card);
                        console.log(`./${card}`); */
                            for (let screenCard of accusationTotalCards) {
                                /* console.log(counter); */
                                if (
                                    accusationTotalCards[counter].childNodes[0]
                                        .attributes[0].value === `./${card}`
                                ) {
                                    /* console.log(`Se encontró ${card} en ${screenCard}`); */
                                    accusationTotalCards[
                                        counter
                                    ].childNodes[0].classList.add(
                                        `greyed-card`
                                    );
                                }
                                if (counter < 20) {
                                    counter += 1;
                                } else {
                                    counter = 0;
                                }
                            }
                        }
                    }
                }
                break;
            case 5:
                storagedHand = "playerHand5";
                unGrayingCards();
                currentHand = sessionStorage.getItem(storagedHand);
                /* console.log(currentHand); */
                currentHand = JSON.parse(currentHand);
                /* console.log(currentHand); */
                discoveredStoragedHand = "discoveredHand5";
                currentDiscoveredHand = sessionStorage.getItem(
                    discoveredStoragedHand
                );
                currentDiscoveredHand = JSON.parse(currentDiscoveredHand);
                totalCardsToGrey = [currentHand, currentDiscoveredHand];
                for (let object of totalCardsToGrey) {
                    for (const key in object) {
                        for (let card of object[`${key}`]) {
                            /* console.log(card);
                        console.log(`./${card}`); */
                            for (let screenCard of accusationTotalCards) {
                                /* console.log(counter); */
                                if (
                                    accusationTotalCards[counter].childNodes[0]
                                        .attributes[0].value === `./${card}`
                                ) {
                                    /* console.log(`Se encontró ${card} en ${screenCard}`); */
                                    accusationTotalCards[
                                        counter
                                    ].childNodes[0].classList.add(
                                        `greyed-card`
                                    );
                                }
                                if (counter < 20) {
                                    counter += 1;
                                } else {
                                    counter = 0;
                                }
                            }
                        }
                    }
                }
                break;
            case 6:
                storagedHand = "playerHand6";
                unGrayingCards();
                currentHand = sessionStorage.getItem(storagedHand);
                /* console.log(currentHand); */
                currentHand = JSON.parse(currentHand);
                /* console.log(currentHand); */
                discoveredStoragedHand = "discoveredHand6";
                currentDiscoveredHand = sessionStorage.getItem(
                    discoveredStoragedHand
                );
                currentDiscoveredHand = JSON.parse(currentDiscoveredHand);
                totalCardsToGrey = [currentHand, currentDiscoveredHand];
                for (let object of totalCardsToGrey) {
                    for (const key in object) {
                        for (let card of object[`${key}`]) {
                            /* console.log(card);
                        console.log(`./${card}`); */
                            for (let screenCard of accusationTotalCards) {
                                /* console.log(counter); */
                                if (
                                    accusationTotalCards[counter].childNodes[0]
                                        .attributes[0].value === `./${card}`
                                ) {
                                    /* console.log(`Se encontró ${card} en ${screenCard}`); */
                                    accusationTotalCards[
                                        counter
                                    ].childNodes[0].classList.add(
                                        `greyed-card`
                                    );
                                }
                                if (counter < 20) {
                                    counter += 1;
                                } else {
                                    counter = 0;
                                }
                            }
                        }
                    }
                }
                break;
        }
    };
    // Función que mueve la ficha del jugador acusado tanto en la matriz como en el DOM hacia la habitación en la cual se lo está acusando. Asimismo, se encarga de eliminar a la ficha de su posición anterior.
    const movingAccusedPlayer = () => {
        console.log(`Ejecutando moving accused player`);
        switch (selectedTarget) {
            case "azulino":
                console.log(`Llevando a azulino a habitación`);
                accusedPlayerPiece = 5;
                for (let row of movementBoard) {
                    for (let cell of row) {
                        if (typeof cell === "number") {
                            if (accusedPlayerPiece === cell) {
                                accusedCoordenates.push([
                                    movementBoard.indexOf(row),
                                    row.indexOf(cell),
                                ]);
                                break;
                            }
                            if (i < 23) {
                                i += 1;
                            } else {
                                i = 0;
                            }
                        } else {
                            if (cell.includes(accusedPlayerPiece)) {
                                accusedCoordenates.push([
                                    movementBoard.indexOf(row),
                                    row.indexOf(cell),
                                ]);
                                console.log(accusedCoordenates);
                                console.log(
                                    `La Ubicación del jugador es en las siguientes coordenadas: ${accusedCoordenates}`
                                );
                            }
                            if (i < 23) {
                                i += 1;
                            } else {
                                i = 0;
                            }
                        }
                    }
                }
                console.log(
                    `La Ubicación FINAL del jugador es en las siguientes coordenadas: ${accusedCoordenates}`
                );
                console.log(movementBoard);
                console.log(accusedCoordenates[0][0]);
                console.log(
                    movementBoard[accusedCoordenates[0][0]][
                        accusedCoordenates[0][1]
                    ]
                );
                if (
                    typeof movementBoard[accusedCoordenates[0][0]][
                        accusedCoordenates[0][1]
                    ] === "number"
                ) {
                    if (
                        movementBoard[accusedCoordenates[0][0]][
                            accusedCoordenates[0][1]
                        ] === accusedPlayerPiece
                    ) {
                        movementBoard[accusedCoordenates[0][0]][
                            accusedCoordenates[0][1]
                        ] = 0;
                    }
                } else {
                    for (let coordinate of accusedCoordenates) {
                        let positionRow = coordinate[0];
                        let positionIndex = coordinate[1];
                        console.log(
                            `Logueando el valor del casillero de destino`
                        );
                        console.log(
                            typeof movementBoard[positionRow][positionIndex]
                        );
                        console.log(movementBoard[positionRow][positionIndex]);
                        movementBoard[positionRow][positionIndex] =
                            movementBoard[positionRow][positionIndex].filter(
                                (value) => {
                                    return value !== accusedPlayerPiece;
                                }
                            );
                    }
                }
                movementBoard[actualAccusingRoom[0]][
                    actualAccusingRoom[1]
                ].push(accusedPlayerPiece);
                switch (
                    movementBoard[actualAccusingRoom[0]][
                        actualAccusingRoom[1]
                    ][0]
                ) {
                    /*Vestíbulo: 9
                Biblioteca: 11
                Comedor: 12
                Billar: 13
                Salón de Baile: 15 */
                    case 9:
                        if (actualAccusingRoom[0] === 4) {
                            movementBoard[6][11].push(accusedPlayerPiece);
                            movementBoard[6][12].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[1] === 11) {
                            movementBoard[4][9].push(accusedPlayerPiece);
                            movementBoard[6][12].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[1] === 12) {
                            movementBoard[4][9].push(accusedPlayerPiece);
                            movementBoard[6][11].push(accusedPlayerPiece);
                        }
                        break;
                    case 11:
                        if (actualAccusingRoom[0] === 8) {
                            movementBoard[10][3].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[0] === 10) {
                            movementBoard[8][6].push(accusedPlayerPiece);
                        }
                        break;
                    case 12:
                        if (actualAccusingRoom[0] === 9) {
                            movementBoard[12][16].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[0] === 12) {
                            movementBoard[9][17].push(accusedPlayerPiece);
                        }
                        break;
                    case 13:
                        if (actualAccusingRoom[0] === 12) {
                            movementBoard[15][5].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[0] === 15) {
                            movementBoard[12][1].push(accusedPlayerPiece);
                        }
                        break;
                    case 15:
                        if (actualAccusingRoom[1] === 8) {
                            movementBoard[17][9].push(accusedPlayerPiece);
                            movementBoard[17][14].push(accusedPlayerPiece);
                            movementBoard[19][15].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[1] === 9) {
                            movementBoard[19][8].push(accusedPlayerPiece);
                            movementBoard[17][14].push(accusedPlayerPiece);
                            movementBoard[19][15].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[1] === 14) {
                            movementBoard[19][8].push(accusedPlayerPiece);
                            movementBoard[17][9].push(accusedPlayerPiece);
                            movementBoard[19][15].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[1] === 15) {
                            movementBoard[19][8].push(accusedPlayerPiece);
                            movementBoard[17][9].push(accusedPlayerPiece);
                            movementBoard[17][14].push(accusedPlayerPiece);
                        }
                        break;
                }
                /*  Estudio: 8
            Vestíbulo: 9
            Sala: 10
            Biblioteca: 11
            Comedor: 12
            Billar: 13
            Invernadero: 14
            Salón de Baile: 15
            Cocina: 16 */

                for (let cell of movementAbleCells) {
                    console.dir(cell);
                    if (cell.childNodes[0] === fichaJugadorAzulino) {
                        console.log(
                            `Se encontró la ficha del jugador, y se quitó de su lugar`
                        );
                        cell.removeChild(fichaJugadorAzulino);
                    }
                }
                console.log(
                    movementBoard[actualAccusingRoom[0]][actualAccusingRoom[1]]
                );
                switch (
                    movementBoard[actualAccusingRoom[0]][
                        actualAccusingRoom[1]
                    ][0]
                ) {
                    case 10:
                        document
                            .querySelector(`#cell-3u`)
                            .appendChild(fichaJugadorAzulino);
                        break;
                    case 9:
                        document
                            .querySelector(`#cell-3k`)
                            .appendChild(fichaJugadorAzulino);
                        break;
                    case 8:
                        document
                            .querySelector(`#cell-3c`)
                            .appendChild(fichaJugadorAzulino);
                        break;
                    case 11:
                        document
                            .querySelector(`#cell-10d`)
                            .appendChild(fichaJugadorAzulino);
                        break;
                    case 12:
                        document
                            .querySelector(`#cell-11u`)
                            .appendChild(fichaJugadorAzulino);
                        break;
                    case 13:
                        document
                            .querySelector(`#cell-15e`)
                            .appendChild(fichaJugadorAzulino);
                        break;
                    case 15:
                        document
                            .querySelector(`#cell-19j`)
                            .appendChild(fichaJugadorAzulino);
                        break;
                    case 14:
                        document
                            .querySelector(`#cell-23d`)
                            .appendChild(fichaJugadorAzulino);
                        break;
                    case 16:
                        document
                            .querySelector(`#cell-21v`)
                            .appendChild(fichaJugadorAzulino);
                        break;
                }
                console.log(`La ficha del jugador se movió correctamente`);
                break;
            case "blanco":
                console.log(`Llevando a blanco a habitación`);
                accusedPlayerPiece = 3;
                for (let row of movementBoard) {
                    for (let cell of row) {
                        if (typeof cell === "number") {
                            if (accusedPlayerPiece === cell) {
                                accusedCoordenates.push([
                                    movementBoard.indexOf(row),
                                    row.indexOf(cell),
                                ]);
                                break;
                            }
                            if (i < 23) {
                                i += 1;
                            } else {
                                i = 0;
                            }
                        } else {
                            if (cell.includes(accusedPlayerPiece)) {
                                accusedCoordenates.push([
                                    movementBoard.indexOf(row),
                                    row.indexOf(cell),
                                ]);
                                console.log(accusedCoordenates);
                                console.log(
                                    `La Ubicación del jugador es en las siguientes coordenadas: ${accusedCoordenates}`
                                );
                            }
                            if (i < 23) {
                                i += 1;
                            } else {
                                i = 0;
                            }
                        }
                    }
                }
                console.log(
                    `La Ubicación FINAL del jugador es en las siguientes coordenadas: ${accusedCoordenates}`
                );
                console.log(movementBoard);
                console.log(accusedCoordenates[0][0]);
                console.log(
                    movementBoard[accusedCoordenates[0][0]][
                        accusedCoordenates[0][1]
                    ]
                );
                if (
                    typeof movementBoard[accusedCoordenates[0][0]][
                        accusedCoordenates[0][1]
                    ] === "number"
                ) {
                    if (
                        movementBoard[accusedCoordenates[0][0]][
                            accusedCoordenates[0][1]
                        ] === accusedPlayerPiece
                    ) {
                        movementBoard[accusedCoordenates[0][0]][
                            accusedCoordenates[0][1]
                        ] = 0;
                    }
                } else {
                    for (let coordinate of accusedCoordenates) {
                        let positionRow = coordinate[0];
                        let positionIndex = coordinate[1];
                        console.log(
                            `Logueando el valor del casillero de destino`
                        );
                        console.log(
                            typeof movementBoard[positionRow][positionIndex]
                        );
                        console.log(movementBoard[positionRow][positionIndex]);
                        movementBoard[positionRow][positionIndex] =
                            movementBoard[positionRow][positionIndex].filter(
                                (value) => {
                                    return value !== accusedPlayerPiece;
                                }
                            );
                    }
                }
                movementBoard[actualAccusingRoom[0]][
                    actualAccusingRoom[1]
                ].push(accusedPlayerPiece);
                switch (
                    movementBoard[actualAccusingRoom[0]][
                        actualAccusingRoom[1]
                    ][0]
                ) {
                    /*Vestíbulo: 9
                Biblioteca: 11
                Comedor: 12
                Billar: 13
                Salón de Baile: 15 */
                    case 9:
                        if (actualAccusingRoom[0] === 4) {
                            movementBoard[6][11].push(accusedPlayerPiece);
                            movementBoard[6][12].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[1] === 11) {
                            movementBoard[4][9].push(accusedPlayerPiece);
                            movementBoard[6][12].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[1] === 12) {
                            movementBoard[4][9].push(accusedPlayerPiece);
                            movementBoard[6][11].push(accusedPlayerPiece);
                        }
                        break;
                    case 11:
                        if (actualAccusingRoom[0] === 8) {
                            movementBoard[10][3].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[0] === 10) {
                            movementBoard[8][6].push(accusedPlayerPiece);
                        }
                        break;
                    case 12:
                        if (actualAccusingRoom[0] === 9) {
                            movementBoard[12][16].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[0] === 12) {
                            movementBoard[9][17].push(accusedPlayerPiece);
                        }
                        break;
                    case 13:
                        if (actualAccusingRoom[0] === 12) {
                            movementBoard[15][5].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[0] === 15) {
                            movementBoard[12][1].push(accusedPlayerPiece);
                        }
                        break;
                    case 15:
                        if (actualAccusingRoom[1] === 8) {
                            movementBoard[17][9].push(accusedPlayerPiece);
                            movementBoard[17][14].push(accusedPlayerPiece);
                            movementBoard[19][15].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[1] === 9) {
                            movementBoard[19][8].push(accusedPlayerPiece);
                            movementBoard[17][14].push(accusedPlayerPiece);
                            movementBoard[19][15].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[1] === 14) {
                            movementBoard[19][8].push(accusedPlayerPiece);
                            movementBoard[17][9].push(accusedPlayerPiece);
                            movementBoard[19][15].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[1] === 15) {
                            movementBoard[19][8].push(accusedPlayerPiece);
                            movementBoard[17][9].push(accusedPlayerPiece);
                            movementBoard[17][14].push(accusedPlayerPiece);
                        }
                        break;
                }
                /*  Estudio: 8
            Vestíbulo: 9
            Sala: 10
            Biblioteca: 11
            Comedor: 12
            Billar: 13
            Invernadero: 14
            Salón de Baile: 15
            Cocina: 16 */

                for (let cell of movementAbleCells) {
                    console.dir(cell);
                    if (cell.childNodes[0] === fichaJugadorBlanco) {
                        console.log(
                            `Se encontró la ficha del jugador, y se quitó de su lugar`
                        );
                        cell.removeChild(fichaJugadorBlanco);
                    }
                }
                console.log(
                    movementBoard[actualAccusingRoom[0]][actualAccusingRoom[1]]
                );
                switch (
                    movementBoard[actualAccusingRoom[0]][
                        actualAccusingRoom[1]
                    ][0]
                ) {
                    case 10:
                        document
                            .querySelector(`#cell-3t`)
                            .appendChild(fichaJugadorBlanco);
                        break;
                    case 9:
                        document
                            .querySelector(`#cell-4n`)
                            .appendChild(fichaJugadorBlanco);
                        break;
                    case 8:
                        document
                            .querySelector(`#cell-2d`)
                            .appendChild(fichaJugadorBlanco);
                        break;
                    case 11:
                        document
                            .querySelector(`#cell-10e`)
                            .appendChild(fichaJugadorBlanco);
                        break;
                    case 12:
                        document
                            .querySelector(`#cell-14v`)
                            .appendChild(fichaJugadorBlanco);
                        break;
                    case 13:
                        document
                            .querySelector(`#cell-14e`)
                            .appendChild(fichaJugadorBlanco);
                        break;
                    case 15:
                        document
                            .querySelector(`#cell-22m`)
                            .appendChild(fichaJugadorBlanco);
                        break;
                    case 14:
                        document
                            .querySelector(`#cell-23c`)
                            .appendChild(fichaJugadorBlanco);
                        break;
                    case 16:
                        document
                            .querySelector(`#cell-23u`)
                            .appendChild(fichaJugadorBlanco);
                        break;
                }
                break;
            case "escarlata":
                console.log(`Llevando a escarlata a habitación`);
                accusedPlayerPiece = 1;
                for (let row of movementBoard) {
                    for (let cell of row) {
                        if (typeof cell === "number") {
                            if (accusedPlayerPiece === cell) {
                                accusedCoordenates.push([
                                    movementBoard.indexOf(row),
                                    row.indexOf(cell),
                                ]);
                                break;
                            }
                            if (i < 23) {
                                i += 1;
                            } else {
                                i = 0;
                            }
                        } else {
                            if (cell.includes(accusedPlayerPiece)) {
                                accusedCoordenates.push([
                                    movementBoard.indexOf(row),
                                    row.indexOf(cell),
                                ]);
                                console.log(accusedCoordenates);
                                console.log(
                                    `La Ubicación del jugador es en las siguientes coordenadas: ${accusedCoordenates}`
                                );
                            }
                            if (i < 23) {
                                i += 1;
                            } else {
                                i = 0;
                            }
                        }
                    }
                }
                console.log(
                    `La Ubicación FINAL del jugador es en las siguientes coordenadas: ${accusedCoordenates}`
                );
                console.log(movementBoard);
                console.log(accusedCoordenates[0][0]);
                console.log(
                    movementBoard[accusedCoordenates[0][0]][
                        accusedCoordenates[0][1]
                    ]
                );
                if (
                    typeof movementBoard[accusedCoordenates[0][0]][
                        accusedCoordenates[0][1]
                    ] === "number"
                ) {
                    if (
                        movementBoard[accusedCoordenates[0][0]][
                            accusedCoordenates[0][1]
                        ] === accusedPlayerPiece
                    ) {
                        movementBoard[accusedCoordenates[0][0]][
                            accusedCoordenates[0][1]
                        ] = 0;
                    }
                } else {
                    for (let coordinate of accusedCoordenates) {
                        let positionRow = coordinate[0];
                        let positionIndex = coordinate[1];
                        console.log(
                            `Logueando el valor del casillero de destino`
                        );
                        console.log(
                            typeof movementBoard[positionRow][positionIndex]
                        );
                        console.log(movementBoard[positionRow][positionIndex]);
                        movementBoard[positionRow][positionIndex] =
                            movementBoard[positionRow][positionIndex].filter(
                                (value) => {
                                    return value !== accusedPlayerPiece;
                                }
                            );
                    }
                }
                movementBoard[actualAccusingRoom[0]][
                    actualAccusingRoom[1]
                ].push(accusedPlayerPiece);
                switch (
                    movementBoard[actualAccusingRoom[0]][
                        actualAccusingRoom[1]
                    ][0]
                ) {
                    /*Vestíbulo: 9
                Biblioteca: 11
                Comedor: 12
                Billar: 13
                Salón de Baile: 15 */
                    case 9:
                        if (actualAccusingRoom[0] === 4) {
                            movementBoard[6][11].push(accusedPlayerPiece);
                            movementBoard[6][12].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[1] === 11) {
                            movementBoard[4][9].push(accusedPlayerPiece);
                            movementBoard[6][12].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[1] === 12) {
                            movementBoard[4][9].push(accusedPlayerPiece);
                            movementBoard[6][11].push(accusedPlayerPiece);
                        }
                        break;
                    case 11:
                        if (actualAccusingRoom[0] === 8) {
                            movementBoard[10][3].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[0] === 10) {
                            movementBoard[8][6].push(accusedPlayerPiece);
                        }
                        break;
                    case 12:
                        if (actualAccusingRoom[0] === 9) {
                            movementBoard[12][16].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[0] === 12) {
                            movementBoard[9][17].push(accusedPlayerPiece);
                        }
                        break;
                    case 13:
                        if (actualAccusingRoom[0] === 12) {
                            movementBoard[15][5].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[0] === 15) {
                            movementBoard[12][1].push(accusedPlayerPiece);
                        }
                        break;
                    case 15:
                        if (actualAccusingRoom[1] === 8) {
                            movementBoard[17][9].push(accusedPlayerPiece);
                            movementBoard[17][14].push(accusedPlayerPiece);
                            movementBoard[19][15].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[1] === 9) {
                            movementBoard[19][8].push(accusedPlayerPiece);
                            movementBoard[17][14].push(accusedPlayerPiece);
                            movementBoard[19][15].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[1] === 14) {
                            movementBoard[19][8].push(accusedPlayerPiece);
                            movementBoard[17][9].push(accusedPlayerPiece);
                            movementBoard[19][15].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[1] === 15) {
                            movementBoard[19][8].push(accusedPlayerPiece);
                            movementBoard[17][9].push(accusedPlayerPiece);
                            movementBoard[17][14].push(accusedPlayerPiece);
                        }
                        break;
                }
                /*  Estudio: 8
            Vestíbulo: 9
            Sala: 10
            Biblioteca: 11
            Comedor: 12
            Billar: 13
            Invernadero: 14
            Salón de Baile: 15
            Cocina: 16 */

                for (let cell of movementAbleCells) {
                    console.dir(cell);
                    if (cell.childNodes[0] === fichaJugadorEscarlata) {
                        console.log(
                            `Se encontró la ficha del jugador, y se quitó de su lugar`
                        );
                        cell.removeChild(fichaJugadorEscarlata);
                    }
                }
                console.log(
                    movementBoard[actualAccusingRoom[0]][actualAccusingRoom[1]]
                );
                switch (
                    movementBoard[actualAccusingRoom[0]][
                        actualAccusingRoom[1]
                    ][0]
                ) {
                    case 10:
                        document
                            .querySelector(`#cell-3v`)
                            .appendChild(fichaJugadorEscarlata);
                        break;
                    case 9:
                        document
                            .querySelector(`#cell-3n`)
                            .appendChild(fichaJugadorEscarlata);
                        break;
                    case 8:
                        document
                            .querySelector(`#cell-2c`)
                            .appendChild(fichaJugadorEscarlata);
                        break;
                    case 11:
                        document
                            .querySelector(`#cell-8c`)
                            .appendChild(fichaJugadorEscarlata);
                        break;
                    case 12:
                        document
                            .querySelector(`#cell-11v`)
                            .appendChild(fichaJugadorEscarlata);
                        break;
                    case 13:
                        document
                            .querySelector(`#cell-14d`)
                            .appendChild(fichaJugadorEscarlata);
                        break;
                    case 15:
                        document
                            .querySelector(`#cell-19o`)
                            .appendChild(fichaJugadorEscarlata);
                        break;
                    case 14:
                        document
                            .querySelector(`#cell-23b`)
                            .appendChild(fichaJugadorEscarlata);
                        break;
                    case 16:
                        document
                            .querySelector(`#cell-21w`)
                            .appendChild(fichaJugadorEscarlata);
                        break;
                }
                break;
            case "moradillo":
                console.log(`Llevando a moradillo a habitación`);
                accusedPlayerPiece = 6;
                for (let row of movementBoard) {
                    for (let cell of row) {
                        if (typeof cell === "number") {
                            if (accusedPlayerPiece === cell) {
                                accusedCoordenates.push([
                                    movementBoard.indexOf(row),
                                    row.indexOf(cell),
                                ]);
                                break;
                            }
                            if (i < 23) {
                                i += 1;
                            } else {
                                i = 0;
                            }
                        } else {
                            if (cell.includes(accusedPlayerPiece)) {
                                accusedCoordenates.push([
                                    movementBoard.indexOf(row),
                                    row.indexOf(cell),
                                ]);
                                console.log(accusedCoordenates);
                                console.log(
                                    `La Ubicación del jugador es en las siguientes coordenadas: ${accusedCoordenates}`
                                );
                            }
                            if (i < 23) {
                                i += 1;
                            } else {
                                i = 0;
                            }
                        }
                    }
                }
                console.log(
                    `La Ubicación FINAL del jugador es en las siguientes coordenadas: ${accusedCoordenates}`
                );
                console.log(movementBoard);
                console.log(accusedCoordenates[0][0]);
                console.log(
                    movementBoard[accusedCoordenates[0][0]][
                        accusedCoordenates[0][1]
                    ]
                );
                if (
                    typeof movementBoard[accusedCoordenates[0][0]][
                        accusedCoordenates[0][1]
                    ] === "number"
                ) {
                    if (
                        movementBoard[accusedCoordenates[0][0]][
                            accusedCoordenates[0][1]
                        ] === accusedPlayerPiece
                    ) {
                        movementBoard[accusedCoordenates[0][0]][
                            accusedCoordenates[0][1]
                        ] = 0;
                    }
                } else {
                    for (let coordinate of accusedCoordenates) {
                        let positionRow = coordinate[0];
                        let positionIndex = coordinate[1];
                        console.log(
                            `Logueando el valor del casillero de destino`
                        );
                        console.log(
                            typeof movementBoard[positionRow][positionIndex]
                        );
                        console.log(movementBoard[positionRow][positionIndex]);
                        movementBoard[positionRow][positionIndex] =
                            movementBoard[positionRow][positionIndex].filter(
                                (value) => {
                                    return value !== accusedPlayerPiece;
                                }
                            );
                    }
                }
                movementBoard[actualAccusingRoom[0]][
                    actualAccusingRoom[1]
                ].push(accusedPlayerPiece);
                switch (
                    movementBoard[actualAccusingRoom[0]][
                        actualAccusingRoom[1]
                    ][0]
                ) {
                    /*Vestíbulo: 9
                Biblioteca: 11
                Comedor: 12
                Billar: 13
                Salón de Baile: 15 */
                    case 9:
                        if (actualAccusingRoom[0] === 4) {
                            movementBoard[6][11].push(accusedPlayerPiece);
                            movementBoard[6][12].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[1] === 11) {
                            movementBoard[4][9].push(accusedPlayerPiece);
                            movementBoard[6][12].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[1] === 12) {
                            movementBoard[4][9].push(accusedPlayerPiece);
                            movementBoard[6][11].push(accusedPlayerPiece);
                        }
                        break;
                    case 11:
                        if (actualAccusingRoom[0] === 8) {
                            movementBoard[10][3].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[0] === 10) {
                            movementBoard[8][6].push(accusedPlayerPiece);
                        }
                        break;
                    case 12:
                        if (actualAccusingRoom[0] === 9) {
                            movementBoard[12][16].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[0] === 12) {
                            movementBoard[9][17].push(accusedPlayerPiece);
                        }
                        break;
                    case 13:
                        if (actualAccusingRoom[0] === 12) {
                            movementBoard[15][5].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[0] === 15) {
                            movementBoard[12][1].push(accusedPlayerPiece);
                        }
                        break;
                    case 15:
                        if (actualAccusingRoom[1] === 8) {
                            movementBoard[17][9].push(accusedPlayerPiece);
                            movementBoard[17][14].push(accusedPlayerPiece);
                            movementBoard[19][15].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[1] === 9) {
                            movementBoard[19][8].push(accusedPlayerPiece);
                            movementBoard[17][14].push(accusedPlayerPiece);
                            movementBoard[19][15].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[1] === 14) {
                            movementBoard[19][8].push(accusedPlayerPiece);
                            movementBoard[17][9].push(accusedPlayerPiece);
                            movementBoard[19][15].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[1] === 15) {
                            movementBoard[19][8].push(accusedPlayerPiece);
                            movementBoard[17][9].push(accusedPlayerPiece);
                            movementBoard[17][14].push(accusedPlayerPiece);
                        }
                        break;
                }
                /*  Estudio: 8
            Vestíbulo: 9
            Sala: 10
            Biblioteca: 11
            Comedor: 12
            Billar: 13
            Invernadero: 14
            Salón de Baile: 15
            Cocina: 16 */

                for (let cell of movementAbleCells) {
                    console.dir(cell);
                    if (cell.childNodes[0] === fichaJugadorMoradillo) {
                        console.log(
                            `Se encontró la ficha del jugador, y se quitó de su lugar`
                        );
                        cell.removeChild(fichaJugadorMoradillo);
                    }
                }
                console.log(
                    movementBoard[actualAccusingRoom[0]][actualAccusingRoom[1]]
                );
                switch (
                    movementBoard[actualAccusingRoom[0]][
                        actualAccusingRoom[1]
                    ][0]
                ) {
                    case 10:
                        document
                            .querySelector(`#cell-4v`)
                            .appendChild(fichaJugadorMoradillo);
                        break;
                    case 9:
                        document
                            .querySelector(`#cell-5n`)
                            .appendChild(fichaJugadorMoradillo);
                        break;
                    case 8:
                        document
                            .querySelector(`#cell-3d`)
                            .appendChild(fichaJugadorMoradillo);
                        break;
                    case 11:
                        document
                            .querySelector(`#cell-8e`)
                            .appendChild(fichaJugadorMoradillo);
                        break;
                    case 12:
                        document
                            .querySelector(`#cell-14t`)
                            .appendChild(fichaJugadorMoradillo);
                        break;
                    case 13:
                        document
                            .querySelector(`#cell-16e`)
                            .appendChild(fichaJugadorMoradillo);
                        break;
                    case 15:
                        document
                            .querySelector(`#cell-19m`)
                            .appendChild(fichaJugadorMoradillo);
                        break;
                    case 14:
                        document
                            .querySelector(`#cell-22b`)
                            .appendChild(fichaJugadorMoradillo);
                        break;
                    case 16:
                        document
                            .querySelector(`#cell-21u`)
                            .appendChild(fichaJugadorMoradillo);
                        break;
                }
                break;
            case "mostaza":
                console.log(`Llevando a mostaza a habitación`);
                accusedPlayerPiece = 2;
                for (let row of movementBoard) {
                    for (let cell of row) {
                        if (typeof cell === "number") {
                            if (accusedPlayerPiece === cell) {
                                accusedCoordenates.push([
                                    movementBoard.indexOf(row),
                                    row.indexOf(cell),
                                ]);
                                break;
                            }
                            if (i < 23) {
                                i += 1;
                            } else {
                                i = 0;
                            }
                        } else {
                            if (cell.includes(accusedPlayerPiece)) {
                                accusedCoordenates.push([
                                    movementBoard.indexOf(row),
                                    row.indexOf(cell),
                                ]);
                                console.log(accusedCoordenates);
                                console.log(
                                    `La Ubicación del jugador es en las siguientes coordenadas: ${accusedCoordenates}`
                                );
                            }
                            if (i < 23) {
                                i += 1;
                            } else {
                                i = 0;
                            }
                        }
                    }
                }
                console.log(
                    `La Ubicación FINAL del jugador es en las siguientes coordenadas: ${accusedCoordenates}`
                );
                console.log(movementBoard);
                console.log(accusedCoordenates[0][0]);
                console.log(
                    movementBoard[accusedCoordenates[0][0]][
                        accusedCoordenates[0][1]
                    ]
                );
                if (
                    typeof movementBoard[accusedCoordenates[0][0]][
                        accusedCoordenates[0][1]
                    ] === "number"
                ) {
                    if (
                        movementBoard[accusedCoordenates[0][0]][
                            accusedCoordenates[0][1]
                        ] === accusedPlayerPiece
                    ) {
                        movementBoard[accusedCoordenates[0][0]][
                            accusedCoordenates[0][1]
                        ] = 0;
                    }
                } else {
                    for (let coordinate of accusedCoordenates) {
                        let positionRow = coordinate[0];
                        let positionIndex = coordinate[1];
                        console.log(
                            `Logueando el valor del casillero de destino`
                        );
                        console.log(
                            typeof movementBoard[positionRow][positionIndex]
                        );
                        console.log(movementBoard[positionRow][positionIndex]);
                        movementBoard[positionRow][positionIndex] =
                            movementBoard[positionRow][positionIndex].filter(
                                (value) => {
                                    return value !== accusedPlayerPiece;
                                }
                            );
                    }
                }
                movementBoard[actualAccusingRoom[0]][
                    actualAccusingRoom[1]
                ].push(accusedPlayerPiece);
                switch (
                    movementBoard[actualAccusingRoom[0]][
                        actualAccusingRoom[1]
                    ][0]
                ) {
                    /*Vestíbulo: 9
                Biblioteca: 11
                Comedor: 12
                Billar: 13
                Salón de Baile: 15 */
                    case 9:
                        if (actualAccusingRoom[0] === 4) {
                            movementBoard[6][11].push(accusedPlayerPiece);
                            movementBoard[6][12].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[1] === 11) {
                            movementBoard[4][9].push(accusedPlayerPiece);
                            movementBoard[6][12].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[1] === 12) {
                            movementBoard[4][9].push(accusedPlayerPiece);
                            movementBoard[6][11].push(accusedPlayerPiece);
                        }
                        break;
                    case 11:
                        if (actualAccusingRoom[0] === 8) {
                            movementBoard[10][3].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[0] === 10) {
                            movementBoard[8][6].push(accusedPlayerPiece);
                        }
                        break;
                    case 12:
                        if (actualAccusingRoom[0] === 9) {
                            movementBoard[12][16].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[0] === 12) {
                            movementBoard[9][17].push(accusedPlayerPiece);
                        }
                        break;
                    case 13:
                        if (actualAccusingRoom[0] === 12) {
                            movementBoard[15][5].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[0] === 15) {
                            movementBoard[12][1].push(accusedPlayerPiece);
                        }
                        break;
                    case 15:
                        if (actualAccusingRoom[1] === 8) {
                            movementBoard[17][9].push(accusedPlayerPiece);
                            movementBoard[17][14].push(accusedPlayerPiece);
                            movementBoard[19][15].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[1] === 9) {
                            movementBoard[19][8].push(accusedPlayerPiece);
                            movementBoard[17][14].push(accusedPlayerPiece);
                            movementBoard[19][15].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[1] === 14) {
                            movementBoard[19][8].push(accusedPlayerPiece);
                            movementBoard[17][9].push(accusedPlayerPiece);
                            movementBoard[19][15].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[1] === 15) {
                            movementBoard[19][8].push(accusedPlayerPiece);
                            movementBoard[17][9].push(accusedPlayerPiece);
                            movementBoard[17][14].push(accusedPlayerPiece);
                        }
                        break;
                }
                /*  Estudio: 8
            Vestíbulo: 9
            Sala: 10
            Biblioteca: 11
            Comedor: 12
            Billar: 13
            Invernadero: 14
            Salón de Baile: 15
            Cocina: 16 */

                for (let cell of movementAbleCells) {
                    console.dir(cell);
                    if (cell.childNodes[0] === fichaJugadorMostaza) {
                        console.log(
                            `Se encontró la ficha del jugador, y se quitó de su lugar`
                        );
                        cell.removeChild(fichaJugadorMostaza);
                    }
                }
                console.log(
                    movementBoard[actualAccusingRoom[0]][actualAccusingRoom[1]]
                );
                switch (
                    movementBoard[actualAccusingRoom[0]][
                        actualAccusingRoom[1]
                    ][0]
                ) {
                    case 10:
                        document
                            .querySelector(`#cell-4t`)
                            .appendChild(fichaJugadorMostaza);
                        break;
                    case 9:
                        document
                            .querySelector(`#cell-4n`)
                            .appendChild(fichaJugadorMostaza);
                        break;
                    case 8:
                        document
                            .querySelector(`#cell-2d`)
                            .appendChild(fichaJugadorMostaza);
                        break;
                    case 11:
                        document
                            .querySelector(`#cell-10e`)
                            .appendChild(fichaJugadorMostaza);
                        break;
                    case 12:
                        document
                            .querySelector(`#cell-14v`)
                            .appendChild(fichaJugadorMostaza);
                        break;
                    case 13:
                        document
                            .querySelector(`#cell-14e`)
                            .appendChild(fichaJugadorMostaza);
                        break;
                    case 15:
                        document
                            .querySelector(`#cell-22m`)
                            .appendChild(fichaJugadorMostaza);
                        break;
                    case 14:
                        document
                            .querySelector(`#cell-23c`)
                            .appendChild(fichaJugadorMostaza);
                        break;
                    case 16:
                        document
                            .querySelector(`#cell-23u`)
                            .appendChild(fichaJugadorMostaza);
                        break;
                }
                break;
            case "verdi":
                console.log(`Llevando a verdi a habitación`);
                accusedPlayerPiece = 4;
                for (let row of movementBoard) {
                    for (let cell of row) {
                        if (typeof cell === "number") {
                            if (accusedPlayerPiece === cell) {
                                accusedCoordenates.push([
                                    movementBoard.indexOf(row),
                                    row.indexOf(cell),
                                ]);
                                break;
                            }
                            if (i < 23) {
                                i += 1;
                            } else {
                                i = 0;
                            }
                        } else {
                            if (cell.includes(accusedPlayerPiece)) {
                                accusedCoordenates.push([
                                    movementBoard.indexOf(row),
                                    row.indexOf(cell),
                                ]);
                                console.log(accusedCoordenates);
                                console.log(
                                    `La Ubicación del jugador es en las siguientes coordenadas: ${accusedCoordenates}`
                                );
                            }
                            if (i < 23) {
                                i += 1;
                            } else {
                                i = 0;
                            }
                        }
                    }
                }
                console.log(
                    `La Ubicación FINAL del jugador es en las siguientes coordenadas: ${accusedCoordenates}`
                );
                console.log(movementBoard);
                console.log(accusedCoordenates[0][0]);
                console.log(
                    movementBoard[accusedCoordenates[0][0]][
                        accusedCoordenates[0][1]
                    ]
                );
                if (
                    typeof movementBoard[accusedCoordenates[0][0]][
                        accusedCoordenates[0][1]
                    ] === "number"
                ) {
                    if (
                        movementBoard[accusedCoordenates[0][0]][
                            accusedCoordenates[0][1]
                        ] === accusedPlayerPiece
                    ) {
                        movementBoard[accusedCoordenates[0][0]][
                            accusedCoordenates[0][1]
                        ] = 0;
                    }
                } else {
                    for (let coordinate of accusedCoordenates) {
                        let positionRow = coordinate[0];
                        let positionIndex = coordinate[1];
                        console.log(
                            `Logueando el valor del casillero de destino`
                        );
                        console.log(
                            typeof movementBoard[positionRow][positionIndex]
                        );
                        console.log(movementBoard[positionRow][positionIndex]);
                        movementBoard[positionRow][positionIndex] =
                            movementBoard[positionRow][positionIndex].filter(
                                (value) => {
                                    return value !== accusedPlayerPiece;
                                }
                            );
                    }
                }
                movementBoard[actualAccusingRoom[0]][
                    actualAccusingRoom[1]
                ].push(accusedPlayerPiece);
                switch (
                    movementBoard[actualAccusingRoom[0]][
                        actualAccusingRoom[1]
                    ][0]
                ) {
                    /*Vestíbulo: 9
                Biblioteca: 11
                Comedor: 12
                Billar: 13
                Salón de Baile: 15 */
                    case 9:
                        if (actualAccusingRoom[0] === 4) {
                            movementBoard[6][11].push(accusedPlayerPiece);
                            movementBoard[6][12].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[1] === 11) {
                            movementBoard[4][9].push(accusedPlayerPiece);
                            movementBoard[6][12].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[1] === 12) {
                            movementBoard[4][9].push(accusedPlayerPiece);
                            movementBoard[6][11].push(accusedPlayerPiece);
                        }
                        break;
                    case 11:
                        if (actualAccusingRoom[0] === 8) {
                            movementBoard[10][3].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[0] === 10) {
                            movementBoard[8][6].push(accusedPlayerPiece);
                        }
                        break;
                    case 12:
                        if (actualAccusingRoom[0] === 9) {
                            movementBoard[12][16].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[0] === 12) {
                            movementBoard[9][17].push(accusedPlayerPiece);
                        }
                        break;
                    case 13:
                        if (actualAccusingRoom[0] === 12) {
                            movementBoard[15][5].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[0] === 15) {
                            movementBoard[12][1].push(accusedPlayerPiece);
                        }
                        break;
                    case 15:
                        if (actualAccusingRoom[1] === 8) {
                            movementBoard[17][9].push(accusedPlayerPiece);
                            movementBoard[17][14].push(accusedPlayerPiece);
                            movementBoard[19][15].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[1] === 9) {
                            movementBoard[19][8].push(accusedPlayerPiece);
                            movementBoard[17][14].push(accusedPlayerPiece);
                            movementBoard[19][15].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[1] === 14) {
                            movementBoard[19][8].push(accusedPlayerPiece);
                            movementBoard[17][9].push(accusedPlayerPiece);
                            movementBoard[19][15].push(accusedPlayerPiece);
                        } else if (actualAccusingRoom[1] === 15) {
                            movementBoard[19][8].push(accusedPlayerPiece);
                            movementBoard[17][9].push(accusedPlayerPiece);
                            movementBoard[17][14].push(accusedPlayerPiece);
                        }
                        break;
                }
                /*  Estudio: 8
            Vestíbulo: 9
            Sala: 10
            Biblioteca: 11
            Comedor: 12
            Billar: 13
            Invernadero: 14
            Salón de Baile: 15
            Cocina: 16 */

                for (let cell of movementAbleCells) {
                    console.dir(cell);
                    if (cell.childNodes[0] === fichaJugadorVerdi) {
                        console.log(
                            `Se encontró la ficha del jugador, y se quitó de su lugar`
                        );
                        cell.removeChild(fichaJugadorVerdi);
                    }
                }
                console.log(
                    movementBoard[actualAccusingRoom[0]][actualAccusingRoom[1]]
                );
                switch (
                    movementBoard[actualAccusingRoom[0]][
                        actualAccusingRoom[1]
                    ][0]
                ) {
                    case 10:
                        document
                            .querySelector(`#cell-4u`)
                            .appendChild(fichaJugadorVerdi);
                        break;
                    case 9:
                        document
                            .querySelector(`#cell-4k`)
                            .appendChild(fichaJugadorVerdi);
                        break;
                    case 8:
                        document
                            .querySelector(`#cell-3e`)
                            .appendChild(fichaJugadorVerdi);
                        break;
                    case 11:
                        document
                            .querySelector(`#cell-8d`)
                            .appendChild(fichaJugadorVerdi);
                        break;
                    case 12:
                        document
                            .querySelector(`#cell-11t`)
                            .appendChild(fichaJugadorVerdi);
                        break;
                    case 13:
                        document
                            .querySelector(`#cell-15d`)
                            .appendChild(fichaJugadorVerdi);
                        break;
                    case 15:
                        document
                            .querySelector(`#cell-21k`)
                            .appendChild(fichaJugadorVerdi);
                        break;
                    case 14:
                        document
                            .querySelector(`#cell-22c`)
                            .appendChild(fichaJugadorVerdi);
                        break;
                    case 16:
                        document
                            .querySelector(`#cell-23v`)
                            .appendChild(fichaJugadorVerdi);
                        break;
                }
                break;
        }
    };

    // FUNCIÓN CALLBACK QUE CONTIENE LA LÓGICA DE LA SELECCIÓN DE SOSPECHOSO, ARMA Y LUGAR, MANIPULA LAS INTERFACES Y MUESTRA UNA INTERFAZ FINAL DE LA ACUSACIÓN REALIZADA
    const suspectSelection = (evt) => {
        console.log(evt.target.id);
        if (accusationModalTitle.innerText !== `¿Que arma utilizó?`) {
            accusationModalTitle.innerText = `¿Que arma utilizó?`;
        } else {
            accusationModalTitle.innerText = `¿Sostienes tu acusación?`;
        }
        let accusedPlayerPiece;
        let accusedPlayerIndex, accusedPlayerRow;
        accusedCoordenates = [];
        console.log(actualAccusingRoom);
        switch (selectedTriade.length) {
            /*  Escarlata: 1
            Mostaza: 2
            Blanco: 3
            Verdi: 4
            Azulino: 5
            Moradillo: 6 */
            case 0:
                suspectsAccContainer.classList.remove(
                    "hidden-accusation-category-container"
                );
                suspectsAccContainer.classList.add(
                    "accusation-category-container"
                );
                selectedTriade.push(evt.target.id.toUpperCase());
                selectedTarget = evt.target.id;
                suspectsAccContainer.classList.add(
                    "hidden-accusation-category-container"
                );
                suspectsAccContainer.classList.remove(
                    "accusation-category-container"
                );
                weaponsAccContainer.classList.add(
                    "accusation-category-container"
                );
                weaponsAccContainer.classList.remove(
                    "hidden-accusation-category-container"
                );

                break;
            case 1:
                selectedTriade.push(evt.target.id.toUpperCase());
                weaponsAccContainer.classList.remove(
                    "accusation-category-container"
                );
                weaponsAccContainer.classList.add(
                    "hidden-accusation-category-container"
                );
                switch (
                    movementBoard[actualAccusingRoom[0]][
                        actualAccusingRoom[1]
                    ][0]
                ) {
                    /*  Estudio: 8
                    Vestíbulo: 9
                    Sala: 10
                    Biblioteca: 11
                    Comedor: 12
                    Billar: 13
                    Invernadero: 14
                    Salón de Baile: 15
                    Cocina: 16 */

                    case 8:
                        selectedTriade.push("estudio".toUpperCase());
                        break;
                    case 9:
                        selectedTriade.push("vestibulo".toUpperCase());
                        break;
                    case 10:
                        selectedTriade.push("sala".toUpperCase());
                        break;
                    case 11:
                        selectedTriade.push("biblioteca".toUpperCase());
                        break;
                    case 12:
                        selectedTriade.push("comedor".toUpperCase());
                        break;
                    case 13:
                        selectedTriade.push("saladebillar".toUpperCase());
                        break;
                    case 14:
                        selectedTriade.push("invernadero".toUpperCase());
                        break;
                    case 15:
                        selectedTriade.push("salondebaile".toUpperCase());
                        break;
                    case 16:
                        selectedTriade.push("cocina".toUpperCase());
                        break;
                }
                console.log(actualAccusingRoom);
                // actualAccusingRoom = undefined;
                console.log(selectedTriade);
                guessedAccContainer.classList.remove(
                    "hidden-accusation-category-container"
                );
                guessedAccContainer.classList.add(
                    "accusation-category-container"
                );
                for (let guess of selectedTriade) {
                    guessedAccContainer.innerHTML += `<img src="${
                        cartas[`${guess.toLowerCase()}`]
                    }" alt="${guess.toLowerCase()}" class="card-suspect">`;
                }
                accusationConfirmBtn.style.backgroundColor = `${
                    colors[actualPlayer + 1]
                }`;
                accusationConfirmBtn.classList.toggle("btn-primary-hidden");
                break;
        }
        accusationConfirmBtn.addEventListener("click", confirmAccusation);
    };

    // FUNCIÓN AUXILIAR QUE PERMITE RESTAURAR LA TRÍADA DE ACUSACIÓN A "" - SE PUEDE EJECUTAR SI EL USUARIO SE ARREPIENTE Y DESEA VARIAR LA ACUSACIÓN; ASÍ COMO CUANDO LA ACUSACIÓN FUE CONFIRMADA Y NO SE CORRESPONDE CON LA SOLUCIÓN
    const resetAccusation = (evt) => {
        console.log("Haciendo el toggle de esconder el botón");
        accusationModalTitle.innerText = `¿De quién sospechas?`;
        if (!accusationConfirmBtn.classList.contains("btn-primary-hidden")) {
            accusationConfirmBtn.classList.toggle("btn-primary-hidden");
        }
        guessedAccContainer.innerHTML = "";
        selectedTriade = [];
        guessedAccContainer.classList.add(
            "hidden-accusation-category-container"
        );
        guessedAccContainer.classList.remove("accusation-category-container");
        suspectsAccContainer.classList.remove(
            "hidden-accusation-category-container"
        );
        suspectsAccContainer.classList.add("accusation-category-container");
        weaponsAccContainer.classList.remove("accusation-category-container");
        weaponsAccContainer.classList.add(
            "hidden-accusation-category-container"
        );
        roomsAccContainer.classList.remove("accusation-category-container");
        roomsAccContainer.classList.add("hidden-accusation-category-container");
        for (let card of accusationCardSelector) {
            card.addEventListener("click", suspectSelection);
        }
    };
    // Botón para desencadenar el reset de la acusación
    accusationResetBtn.addEventListener("click", resetAccusation);

    // FUNCIÓN CALLBACK QUE PERMITE DAR INICIO A LA ACUSACIÓN
    console.log(selectedTriade);
    selectedTriade = [];
    const accusationDynamic = () => {
        let accusationStage = 0;
        if (accusationStage === 0) {
            suspectsAccContainer.classList.remove(
                "hidden-accusation-category-container"
            );
            suspectsAccContainer.classList.add("accusation-category-container");
            for (let card of accusationCardSelector) {
                card.addEventListener("click", suspectSelection);
            }
        }
    };

    // función para emparejar la cantidad de cartas repartidas cuando hay desequilibrio
    const fairShuffle = () => {
        console.log(`Ejecutando Fair-Shuffle`);
        while (
            (+playerNumber === 2 &&
                manoRepartida[manoRepartida.length - 1].length < 9) ||
            (+playerNumber === 2 && manoRepartida.length === 3)
        ) {
            manoRepartida = respuesta1.repartirCartas(
                manoMezclada,
                minCartasRepartir,
                maxCartasRepartir
            );
            console.log("volviendo a repartir");
        }
        while (
            +playerNumber === 3 &&
            manoRepartida.length >
                playerNumber /* [manoRepartida.length - 1].length < 6) */ /* ||
        (playerNumber === 3 && manoRepartida.length < 3) */
        ) {
            manoRepartida = respuesta1.repartirCartas(
                manoMezclada,
                minCartasRepartir,
                maxCartasRepartir
            );
            console.log("volviendo a repartir");
        }
        while (
            (+playerNumber === 4 &&
                manoRepartida[manoRepartida.length - 1].length < 4) ||
            (+playerNumber === 4 && manoRepartida.length === 5)
        ) {
            manoRepartida = respuesta1.repartirCartas(
                manoMezclada,
                minCartasRepartir,
                maxCartasRepartir
            );
            console.log("volviendo a repartir");
        }
        while (
            (+playerNumber === 5 &&
                manoRepartida[manoRepartida.length - 1].length < 3) ||
            (+playerNumber === 5 && manoRepartida.length === 6)
        ) {
            manoRepartida = respuesta1.repartirCartas(
                manoMezclada,
                minCartasRepartir,
                maxCartasRepartir
            );
            console.log("volviendo a repartir");
        }
        while (
            (+playerNumber === 6 &&
                manoRepartida[manoRepartida.length - 1].length < 3) ||
            (+playerNumber === 6 && manoRepartida.length === 7)
        ) {
            manoRepartida = respuesta1.repartirCartas(
                manoMezclada,
                minCartasRepartir,
                maxCartasRepartir
            );
            console.log("volviendo a repartir");
        }
        console.log(`No se detectaron desequilibrios a corregir`);
    };

    // función para ejecutar el juego
    function runGame() {
        // conformamos nuestro array de players
        for (let i = 1; i <= playerNumber; i += 1) {
            totalPlayers.push(i);
        }
        console.table(totalPlayers);
        // creación del objeto con la solución a partir de la clase declarada
        respuesta1 = new DatosDelCrimen(
            personajes["personaje" + Math.ceil(Math.random() * 6)],
            armas["arma" + Math.ceil(Math.random() * 6)],
            lugares["lugar" + Math.ceil(Math.random() * 9)]
        );
        // control del resultado/solución
        console.log(respuesta1);
        solution = Object.values(respuesta1);
        // creación del mazo (array filtrado sin las cartas de la solución)
        const mano = respuesta1.armarMazo();
        // control de la mano
        console.log(mano);
        // creación de la mano mezclada - Array reordenado aleatoriamente
        manoMezclada = respuesta1.mezclarCartas(mano);
        // control de la mezcla
        console.log(manoMezclada);
        // creación de los sub-arrays para ser repartidos entre los jugadores - Se estipuló como max y min valores relacionados al total de cartas a repartir y la corrección necesaria para casos en donde hay resto
        minCartasRepartir = 18 / playerNumber - 0.5;
        maxCartasRepartir = 18 / playerNumber + 0.5;
        manoRepartida = respuesta1.repartirCartas(
            manoMezclada,
            minCartasRepartir,
            maxCartasRepartir
        );
        // chequeo de cartas repartidas
        console.log(manoRepartida[manoRepartida.length - 1].length);
        console.log(manoRepartida);
        // Ejecutando control de justicia en la repartida
        fairShuffle();

        // controles de los sub-arrays creados - listos para ser repartidos
        console.table(manoRepartida);
        console.log(manoRepartida);
        // ejecución de la función que produce como resultado la asignación de los sub-arrays y los guarda en clave/valor dentro del objeto
        clasificarCartas();
        const manosArmadas = armarTodasLasManos();
        for (let player in manosArmadas) {
            cartasDescubiertas[`${player}`] = [[], [], []];
        }
        // control del objeto contenedor de la repartición
        console.log(manosArmadas);
        console.log(cartasDescubiertas);
        /* printCards(1); */
        /* playGame(); */
    }

    let exit;
    let arma;
    let lugar;
    let sospechoso;
    const acusacionActual = [arma, lugar, sospechoso];
    let winCheck;

    // OBJETO CON PERSONAJES TRAIDO DEL JSON
    const personajes = personajesData;
    console.log(personajes);

    // OBJETO CON ARMAS TRAIDO DEL JSON
    const armas = armasData;
    console.log(armas);

    // OBJETO CON LUGARES TRAIDO DEL JSON
    const lugares = lugaresData;
    console.log(lugares);

    // OBJETO CON CARTAS TRAIDO DEL JSON
    const cartas = cartasData;
    console.log(cartas);

    // OBJETO CON COLORES TRAIDO DEL JSON
    const colors = colorsData;
    console.log(cartas);

    // OBJETO CON IMÁGENES OFFCANVAS TRAIDO DEL JSON
    const offcanvasPlayerImages = offcanvasData;
    console.log(offcanvasPlayerImages);

    // FUNCIÓN QUE PERMITE DETERMINAR QUÉ CARTAS TIENE EL JUGADOR, LAS CLASIFICA EN CATEGORÍAS, Y DEVUELVE UN OBJETO QUE SERÁ ALMACENADO EN LA SESSION STORAGE A LOS FINES DE PODER IMPRIMIR LAS CARTAS DEL JUGADOR EN PANTALLA, EVITANDO TENER QUE REALIZAR DICHO CÁLCULO CADA VEZ QUE SEA SU TURNO
    const readyForPrint = (jugador, tipoDeImpresion) => {
        console.log(`Ejecutando readyForPrint`);
        let forPrint = {};
        let suspects = [];
        let weapons = [];
        let rooms = [];
        let listaCartas = Object.keys(cartas);
        let manosJugador = Object.values(tipoDeImpresion)[jugador];
        /* console.log(manosJugador); */
        let actualArray = 0;
        for (carta of listaCartas) {
            /* console.log(`Buscando para imprimir la carta ${carta}`); */
            for (let category of manosJugador) {
                /* console.table(category); */
                if (category.includes(carta.toUpperCase())) {
                    console.log(`se encontró`);
                    if (actualArray === 0) {
                        suspects.push(cartas[`${carta}`]);
                        actualArray += 1;
                        if (actualArray > 2) {
                            actualArray = 0;
                        }
                        continue;
                    } else if (actualArray === 1) {
                        weapons.push(cartas[`${carta}`]);
                        actualArray += 1;
                        if (actualArray > 2) {
                            actualArray = 0;
                        }
                        continue;
                    } else if (actualArray === 2) {
                        rooms.push(cartas[`${carta}`]);
                        actualArray += 1;
                        if (actualArray > 2) {
                            actualArray = 0;
                        }
                        continue;
                    }
                } else {
                    /* console.log(`no tiene esta carta`); */
                }

                /* console.log(`El actual array es ${actualArray}`); */
                actualArray += 1;
                if (actualArray > 2) {
                    actualArray = 0;
                }
            }
        }
        console.log(`El jugador tiene los siguientes sospechosos: ${suspects}`);
        console.log(`El jugador tiene los siguientes sospechosos: ${weapons}`);
        console.log(`El jugador tiene los siguientes sospechosos: ${rooms}`);
        forPrint.suspects = suspects;
        forPrint.weapons = weapons;
        forPrint.rooms = rooms;
        console.log(forPrint);
        return forPrint;
    };

    // FUNCIÓN QUE TOMA EL OBJETO GENERADO EN LA ANTERIOR FUNCIÓN, Y SEGÚN EL TURNO QUE SE TRATE, IMPRIME LA MANO DE CARTAS CORRESPONDIENTES AL JUGADOR
    const printMechanism = (hand) => {
        let handToPrint;
        let alt;
        handToPrint = sessionStorage.getItem(hand);
        /* console.log(handToPrint); */
        handToPrint = JSON.parse(handToPrint);
        /* console.log(handToPrint); */
        let suspects = handToPrint.suspects;
        let weapons = handToPrint.weapons;
        let rooms = handToPrint.rooms;
        /* console.log(suspects);
    console.log(weapons);
    console.log(rooms); */
        for (let card of suspects) {
            for (const key in cartas) {
                /* console.log(key);
            console.log(cartas[`${key}`]); */
                if (cartas[`${key}`] === card) {
                    alt = key;
                    break;
                }
            }
            if (hand === `playerHand${actualPlayer + 1}`) {
                if (!suspectHolderRow.innerHTML) {
                    console.log(
                        `Imprimiendo la carta "${alt} en columna Sospechosos"`
                    );
                    suspectHolderRow.innerHTML = `<img src="${card}" alt="${alt}" class="card-suspect">`;
                } else {
                    console.log(
                        `Imprimiendo la carta "${alt} en columna Sospechosos"`
                    );
                    suspectHolderRow.innerHTML += `<img src="${card}" alt="${alt}" class="card-suspect">`;
                }
            } else {
                if (!suspectHolderRow.innerHTML) {
                    console.log(
                        `Imprimiendo la carta "${alt} en columna Sospechosos"`
                    );
                    suspectHolderRow.innerHTML = `<img src="${card}" alt="${alt}" class="card-suspect">`;
                } else {
                    console.log(
                        `Imprimiendo la carta "${alt} en columna Sospechosos"`
                    );
                    suspectHolderRow.innerHTML += `<img src="${card}" alt="${alt}" class="card-suspect">`;
                }
            }
        }
        for (let card of weapons) {
            for (const key in cartas) {
                /* console.log(key); */
                if (cartas[`${key}`] === card) {
                    alt = key;
                    break;
                }
            }
            if (hand === `playerHand${actualPlayer + 1}`) {
                if (!weaponsHolderRow.innerHTML) {
                    console.log(
                        `Imprimiendo la carta "${alt} en columna Armas"`
                    );
                    weaponsHolderRow.innerHTML = `<img src="${card}" alt="${alt}" class="card-suspect">`;
                } else {
                    console.log(
                        `Imprimiendo la carta "${alt} en columna Armas"`
                    );
                    weaponsHolderRow.innerHTML += `<img src="${card}" alt="${alt}" class="card-suspect">`;
                }
            } else {
                if (!weaponsHolderRow.innerHTML) {
                    console.log(
                        `Imprimiendo la carta "${alt} en columna Armas"`
                    );
                    weaponsHolderRow.innerHTML = `<img src="${card}" alt="${alt}" class="card-suspect">`;
                } else {
                    console.log(
                        `Imprimiendo la carta "${alt} en columna Armas"`
                    );
                    weaponsHolderRow.innerHTML += `<img src="${card}" alt="${alt}" class="card-suspect">`;
                }
            }
        }
        for (let card of rooms) {
            for (const key in cartas) {
                /* console.log(key); */
                if (cartas[`${key}`] === card) {
                    alt = key;
                    break;
                }
            }
            if (hand === `playerHand${actualPlayer + 1}`) {
                if (!roomsHolderRow.innerHTML) {
                    console.log(
                        `Imprimiendo la carta "${alt} en columna Habitaciones"`
                    );
                    roomsHolderRow.innerHTML = `<img src="${card}" alt="${alt}" class="card-suspect">`;
                } else {
                    console.log(
                        `Imprimiendo la carta "${alt} en columna Habitaciones"`
                    );
                    roomsHolderRow.innerHTML += `<img src="${card}" alt="${alt}" class="card-suspect">`;
                }
            } else {
                if (!roomsHolderRow.innerHTML) {
                    console.log(
                        `Imprimiendo la carta "${alt} en columna Habitaciones"`
                    );
                    roomsHolderRow.innerHTML = `<img src="${card}" alt="${alt}" class="card-suspect">`;
                } else {
                    console.log(
                        `Imprimiendo la carta "${alt} en columna Habitaciones"`
                    );
                    roomsHolderRow.innerHTML += `<img src="${card}" alt="${alt}" class="card-suspect">`;
                }
            }
        }
    };

    // FUNCIÓN CALLBACK QUE INICIA EL MECANISMO DE IMPRESIÓN A MEDIDA QUE VAN AVANZANDO LOS TURNOS
    const printCards = (jugador) => {
        switch (jugador + 1) {
            case 1:
                console.log(`Imprimiendo cartas jugador ${jugador + 1}`);
                printMechanism("playerHand1");
                printMechanism("discoveredHand1");
                break;
            case 2:
                console.log(`Imprimiendo cartas jugador ${jugador + 1}`);
                printMechanism("playerHand2");
                printMechanism("discoveredHand2");
                break;
            case 3:
                console.log(`Imprimiendo cartas jugador ${jugador + 1}`);
                printMechanism("playerHand3");
                printMechanism("discoveredHand3");
                break;
            case 4:
                console.log(`Imprimiendo cartas jugador ${jugador + 1}`);
                printMechanism("playerHand4");
                printMechanism("discoveredHand4");
                break;
            case 5:
                console.log(`Imprimiendo cartas jugador ${jugador + 1}`);
                printMechanism("playerHand5");
                printMechanism("discoveredHand5");
                break;
            case 6:
                console.log(`Imprimiendo cartas jugador ${jugador + 1}`);
                printMechanism("playerHand6");
                printMechanism("discoveredHand6");
                break;
        }
    };

    // clase constructora del objeto que va a contener los datos del crimen a develar/solución
    class DatosDelCrimen {
        constructor(culpable, arma, lugar) {
            this.culpable = culpable;
            this.arma = arma;
            this.lugar = lugar;
        }
        // método que combina los distintos objetos en uno solo, convierte ese objeto en un array tomando los valores de cada clave, y filtra el mazo eliminando las cartas del sospechoso, arma y lugar del homicidio
        armarMazo() {
            const mazoCartas = {
                ...personajes,
                ...armas,
                ...lugares,
            };
            const arrayCartas = Object.values(mazoCartas);
            const mazoFiltrado = arrayCartas.filter(
                (carta) =>
                    carta !== respuesta1.culpable &&
                    carta !== respuesta1.lugar &&
                    carta !== respuesta1.arma
            );
            return mazoFiltrado;
        }
        // método que permite mezclar las cartas una vez que el objeto fue convertido en array
        mezclarCartas(array) {
            let mixedArray = array;
            let firstSixth,
                secondSixth,
                thirdSixth,
                fourthSixth,
                fifthSixth,
                sixthSixth;
            let readyToMixArray = [];
            for (let i = 0; i <= 4; i += 1) {
                firstSixth = mixedArray.slice(0, 3);
                secondSixth = mixedArray.slice(3, 6);
                thirdSixth = mixedArray.slice(6, 9);
                fourthSixth = mixedArray.slice(9, 12);
                fifthSixth = mixedArray.slice(12, 15);
                sixthSixth = mixedArray.slice(15, 18);
                /* console.log(firstSixth);
            console.log(secondSixth);
            console.log(thirdSixth);
            console.log(fourthSixth);
            console.log(fifthSixth);
            console.log(sixthSixth); */
                readyToMixArray = thirdSixth.concat(firstSixth);
                readyToMixArray = readyToMixArray.concat(sixthSixth);
                readyToMixArray = readyToMixArray.concat(fourthSixth);
                readyToMixArray = readyToMixArray.concat(fifthSixth);
                readyToMixArray = readyToMixArray.concat(secondSixth);
                /* console.log(readyToMixArray); */
                console.log(`Mezclando el array`);
                mixedArray = readyToMixArray.sort((a, b) => {
                    let coeficient = Math.ceil(Math.random() * 3);
                    /* console.log(coeficient); */
                    if (coeficient === 1) {
                        return -1;
                    } else if (coeficient === 2) {
                        return 0;
                    } else if (coeficient === 3) {
                        return 1;
                    }
                });
                /* console.log(mixedArray); */
            }

            return mixedArray;
        }
        // método que permite dividir el total de cartas en el array en tantos sub-arrays como jugadores haya
        repartirCartas(array, min1, max1) {
            let arr = array.slice();
            let arrs = [],
                size = 1;
            let min = min1 || 1;
            let max = max1 || min1 || 1;
            while (arr.length > 0) {
                size = Math.min(max, Math.floor(Math.random() * max + min));
                arrs.push(arr.splice(0, size));
            }
            return arrs;
        }
        startGame() {
            runGame();
        }
    }
    // función que me permite distribuir los sub-arrays en cada jugador - Devuelve un objeto con la clave que identifica a cada jugador asignando como valor uno de los sub-arrays
    const armarTodasLasManos = () => {
        let i = 0;
        totalPlayers.forEach((player) => {
            manosArmadas[player] = manosClasificadas[i];
            console.log(
                `Asignando a ${player} las siguientes cartas: ${manosArmadas[player]}`
            );
            i += 1;
        });
        return manosArmadas;
    };

    // Función auxiliar para la clasificación de personajes
    const esPersonaje = (carta) => {
        let valoresPersonajes = Object.values(personajes);
        /* console.log(`La carta a buscar es ${carta}`); */
        for (let personaje of valoresPersonajes) {
            /* console.log(`El personaje en análisis es: ${personaje}`); */
            if (carta === personaje) {
                return carta;
            }
        }
    };
    // Función auxiliar para la clasificación de armas
    const esArma = (carta) => {
        let valoresArmas = Object.values(armas);
        /* console.log(`La carta a buscar es ${carta}`); */
        for (let arma of valoresArmas) {
            /* console.log(`El arma en análisis es: ${arma}`); */
            if (carta === arma) {
                return carta;
            }
        }
    };
    // Función auxiliar para la clasificación de habitaciones
    const esHabitacion = (carta) => {
        let valoresHabitaciones = Object.values(lugares);
        /* console.log(`La carta a buscar es ${carta}`); */
        for (let habitacion of valoresHabitaciones) {
            /* console.log(`La habitación en análisis es: ${habitacion}`); */
            if (carta === habitacion) {
                return carta;
            }
        }
    };
    // FUNCIÓN PRINCIPAL CLASIFICADORA DE CARTAS, QUE SERVIRÁ PARA PODER IMPRIMIR LUEGO POR CATEGORÍAS LAS CARTAS
    const clasificarCartas = () => {
        let i = 0;
        for (let mano of manoRepartida) {
            manosClasificadas.push([[], [], []]);
            console.log("clasificando primer array");
            /* console.log(manosClasificadas);
        console.log(`La mano que se está analizando es ${mano}`); */
            for (let carta of mano) {
                let matchPersonaje = esPersonaje(carta);
                let matchArma;
                let matchHabitacion;
                if (matchPersonaje !== carta) {
                    matchArma = esArma(carta);
                    if (matchArma !== carta) {
                        matchHabitacion = esHabitacion(carta);
                    }
                }
                if (matchPersonaje == carta) {
                    console.log(
                        `Se encontró el personaje ${matchPersonaje} en el array del jugador ${i}`
                    );
                    manosClasificadas[i][0].push(matchPersonaje);
                } else if (matchArma == carta) {
                    console.log(
                        `Se encontró el arma ${matchArma} en el array del jugador ${i}`
                    );
                    manosClasificadas[i][1].push(matchArma);
                } else if (matchHabitacion == carta) {
                    console.log(
                        `Se encontró la habitación ${matchHabitacion} en el array del jugador ${i}`
                    );
                    manosClasificadas[i][2].push(matchHabitacion);
                }
            }
            i += 1;
            /* console.log(manosClasificadas); */
        }
        console.log(`Clasificación finalizada:`);
        console.dir(manosClasificadas);
        return manosClasificadas;
    };
    // Reset de los session storage al recargar la página
    window.onunload = function () {
        for (let i = 1; i <= 6; i += 1) {
            sessionStorage.removeItem(`playerHand${i}`);
            sessionStorage.removeItem(`discoveredHand${i}`);
        }
    };

    // EVENTOS QUE AYUDAN A ORGANIZAR MEJOR EL OFFCANVAS PARA QUE SE CIERREN AUTOMÁTICAMENTE SECCIONES
    offcanvasCloseBtn.addEventListener("click", (evt) => {
        console.log(evt);
        console.log(collapse1);
        console.log(collapse2);
        offCanvasBtn.blur();
        if (collapse1.classList.contains("show")) {
            console.log(`Cerrando el collapse own`);
            ownCardsBtn[0].click();
            $(`#card-container-body`).fadeOut(1);
        } else if (collapse2.classList.contains("show")) {
            shownCardsBtn[0].click();
            console.log(`Cerrando el collapse shown`);
        }
    });

    ownCardsBtn[0].addEventListener("click", (evt) => {
        if (collapse2.classList.contains("show")) {
            shownCardsBtn[0].click();
        }
    });
    shownCardsBtn[0].addEventListener("click", (evt) => {
        if (collapse1.classList.contains("show")) {
            ownCardsBtn[0].click();
        }
    });

    offCanvasBtn.addEventListener("click", (evt) => {
        if (!collapse1.classList.contains("show")) {
            ownCardsBtn[0].click();
            $(`#card-container-body`)
                .delay(0)
                .fadeOut(1)
                .delay(300)
                .fadeIn(600);
        }
    });
    accusationButton.addEventListener("click", () => {
        accusationModal.style.display = "flex";
        accusationModalTitle.innerText = `¿De quién sospechas?`;
    });
    /* Detección de eventos keydown: 
    
     - Tecla "Enter": Cuando el dado se encuentra visible, como atajo de accesibilidad para poder tirar el dado con presionar el botón.

     - Teclas "SHIFT" + "E": Truco para pintar todas las celdas como hábiles para el movimiento a los fines del testing .
    */
    document.addEventListener("keydown", (e) => {
        let pressedKey = e;
        console.log(pressedKey);
        if (pressedKey.key === "E" && pressedKey.shiftKey) {
            movementAbleCells.forEach((element) =>
                element.classList.add("movement-in-cell")
            );
        }
        if (diceBtn.classList.contains("dialog-interface-container")) {
            if (pressedKey.key === "Enter") {
                diceBtn.click();
            }
        }
    });
    // Detección del evento scroll para mover dinámicamente el botón offcanvas simulando el efecto sticky de CSS, pero conservando la capacidad de mantener parte del elemento fuera de pantalla (lo que el sticky no permite, forzando a todo el elemento a permanecer visible), para lograr el efecto hover del mismo.
    window.addEventListener("scroll", (evt) => {
        if (screen.width < 1299) {
            if (window.scrollY > 112) {
                offCanvasBtn.style.position = "absolute";
                offCanvasBtn.style.maxWidth = `${offCanvasBtn.innerText.length}px`;
                offCanvasBtn.style.minWidth = `${
                    getTextWidth(offCanvasBtn.innerText, getCanvasFontSize()) +
                    40
                }px`;
                offCanvasBtn.style.top = `${window.scrollY + 110}px`;
                offCanvasBtn.style.transition = "top 1000ms ease";
                offCanvasBtn.addEventListener("mouseover", () => {
                    offCanvasBtn.style.transition = "left 150ms ease";
                });
                offCanvasBtn.addEventListener("focus", () => {
                    offCanvasBtn.style.transition = "left 150ms ease";
                });
            } else {
                offCanvasBtn.style.position = "absolute";
                offCanvasBtn.style.maxWidth = "none";
                offCanvasBtn.style.minWidth = `${
                    getTextWidth(offCanvasBtn.innerText, getCanvasFontSize()) +
                    40
                }px`;
                offCanvasBtn.style.top = "";
                offCanvasBtn.style.transition = "all 150ms ease";
            }
        } else {
            if (window.scrollY > 110) {
                offCanvasBtn.style.position = "absolute";
                offCanvasBtn.style.maxWidth = `${offCanvasBtn.innerText.length}px`;
                offCanvasBtn.style.minWidth = `${
                    getTextWidth(offCanvasBtn.innerText, getCanvasFontSize()) +
                    40
                }px`;
                offCanvasBtn.style.top = `${window.scrollY + 40}px`;
                offCanvasBtn.style.transition = "top 1000ms ease";
                offCanvasBtn.addEventListener("mouseover", () => {
                    offCanvasBtn.style.transition = "left 150ms ease";
                });
                offCanvasBtn.addEventListener("focus", () => {
                    offCanvasBtn.style.transition = "left 150ms ease";
                });
            } else {
                offCanvasBtn.style.position = "absolute";
                offCanvasBtn.style.maxWidth = "none";
                offCanvasBtn.style.minWidth = `${
                    getTextWidth(offCanvasBtn.innerText, getCanvasFontSize()) +
                    40
                }px`;
                offCanvasBtn.style.top = "";
                offCanvasBtn.style.transition = "all 150ms ease";
            }
        }
    });
};
// Funciones que ayudan a determinar el width del texto contenido en el Offcanvas BTN a los fines de darle un ancho dinámico al botón.
function getTextWidth(text, font) {
    const canvas =
        getTextWidth.canvas ||
        (getTextWidth.canvas = document.createElement("canvas"));
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
}

function getCssStyle(element, prop) {
    return window.getComputedStyle(element, null).getPropertyValue(prop);
}

function getCanvasFontSize(el = offCanvasBtn) {
    const fontWeight = getCssStyle(el, "font-weight") || "normal";
    const fontSize = getCssStyle(el, "font-size") || "16px";
    const fontFamily = getCssStyle(el, "font-family") || "Times New Roman";

    return `${fontWeight} ${fontSize} ${fontFamily}`;
}
// Función que ejecuta las acciones relativas a iniciar una nueva partida recargando la página y devolviendo al usuario al estado de elegir cantidad de jugadores, o en caso de optar por "salir", devuelve a la pantalla principal de la página recargando la misma.
const newGameFunction = () => {
    newGameBtnDOM = document.querySelector(`#new-Game-Btn`);
    newGameBtnDOM.addEventListener("click", () => {
        localStorage.setItem("reloading", "true");
        window.location.reload();
    });
    quitGameBtnDOM = document.querySelector(`#quit-Game-Btn`);
    quitGameBtnDOM.addEventListener("click", () => {
        window.location.reload();
    });
};
// Función accesoria que ayuda a iniciar nuevamente la partida detectando el elemento guardado en el localstorage como validación para avanzar las pantallas hasta elegir cantidad de jugadores
window.onload = function () {
    let reloading = localStorage.getItem("reloading");
    if (reloading) {
        showGame();
    }
};
