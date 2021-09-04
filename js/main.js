// DECLARACIÓN DE VARIABLES A SER UTILIZADAS POSTERIORMENTE
// primero consultamos la cantidad de jugadores
let actualPlayer = 0;
let playerNumber;
let respuesta1;
let manoRepartida;
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

const totalPlayers = [];

const manosClasificadas = [];

let selectedTriade = [];

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
    [7, 7, 7, 7, 7, 7, 8, 0, 0, 7, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7, 7],
    [7, 0, 0, 0, 0, 0, 0, 0, 0, 9, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7, 7],
    [6, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7, 0, 0, 10, 7, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 7, 7, 0, 0, 0, 7, 7, 9, 9, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 7],
    [7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [7, 7, 7, 7, 7, 7, 11, 0, 0, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7],
    [7, 7, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 0, 0, 7, 12, 7, 7, 7, 7, 7, 7],
    [7, 7, 7, 11, 7, 7, 0, 0, 0, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 13, 7, 7, 7, 7, 0, 0, 0, 7, 7, 7, 7, 7, 0, 0, 12, 7, 7, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 7, 7, 0, 0, 0, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 7, 7, 0, 0, 0, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 7, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7],
    [7, 0, 0, 0, 0, 0, 0, 0, 7, 15, 7, 7, 7, 7, 15, 7, 0, 0, 0, 0, 0, 0, 0, 0],
    [5, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 7, 16, 7, 7, 7, 7],
    [7, 7, 7, 7, 14, 0, 0, 0, 15, 7, 7, 7, 7, 7, 7, 15, 0, 0, 7, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 7, 7, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 7, 7, 7, 7, 7, 4, 7, 7, 7, 7, 3, 7, 7, 7, 7, 7, 7, 7, 7, 7],
];

// DECLARACIÓN DE MATRIX DEL TABLERO CON IDENTIFICADORES DE CELDA

const matrixBoard = [];

//
/* const */

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
        .childNodes[1];
const weaponsHolderRow =
    cardHolder.childNodes[1].childNodes[1].childNodes[1].childNodes[1]
        .childNodes[3];
const roomsHolderRow =
    cardHolder.childNodes[1].childNodes[1].childNodes[1].childNodes[1]
        .childNodes[5];
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

// AJUSTE DEL CÓDIGO DEL NAVBAR PARA QUE SE VEA EL HAMBURGUER MENU
const navBarToggler = (e) => {
    if (!navbarCollapse.classList.contains("show")) {
        navbarCollapse.classList.add("collapsing");
        navbarCollapse.style = `height: 100%; transition: height 300ms ease-in; position: initial`;
        navbarCollapse.classList.remove("collapse");
        setTimeout((e) => {
            navbarCollapse.classList.remove("collapsing");
            navbarCollapse.classList.add("show");
            navbarCollapse.classList.add("collapse");
        }, 20);
    } else {
        setTimeout((e) => {
            navbarCollapse.classList.add("collapsing");
            navbarCollapse.classList.remove("show");
            navbarCollapse.classList.add("collapse");
            navbarCollapse.style = `height: 1%;  transition: height 300ms ease-in;`;
        }, 20);
    }
};

navbarFix.addEventListener("click", navBarToggler);

// DECLARACIÓN DE FUNCIONES QUE ESTÁN RELACIONADAS A MOSTRAR ELEMENTOS DE LA INTERFAZ
const showGame = (e) => {
    e.preventDefault();
    gameBoard.classList.remove("hidden-game-container");
    gameBoard.classList.add("game-area-container");
    bannerContainer.classList.add("hidden-game-container");
    bannerContainer.classList.remove("banner-container");
    sectionGameDesc.classList.add("hidden-game-container");
    sectionGameDesc.classList.remove("banner-container");
};

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
};

const hideInterface = (e) => {
    gameMessages.children[0].innerText = ``;
    dialogInterface.classList.add("dialog-interface-hidden");
    dialogInterface.classList.remove("dialog-interface-container");
};

const showMessage = (message) => {
    gameMessages.children[0].innerText = message;
};

const showInputReceiver = (e) => {
    dialogInterface.classList.remove("dialog-interface-hidden");
    dialogInterface.classList.add("dialog-interface-container");
};

const showDiceBtn = (e) => {
    diceBtn.classList.remove("dialog-interface-hidden");
    diceBtn.classList.add("dialog-interface-container");
};

const hideDiceBtn = (e) => {
    diceBtn.classList.add("dialog-interface-hidden");
    diceBtn.classList.remove("dialog-interface-container");
};

const showAccBtn = (e) => {
    accusationButton.classList.remove("hidden-accusation-button");
    accusationButton.classList.add("accusation-button");
};

const hideAccBtn = (e) => {
    accusationButton.classList.add("hidden-accusation-button");
    accusationButton.classList.remove("accusation-button");
};

startBtn.addEventListener("click", showGame);
otherStartBtn.addEventListener("click", showGame);
quitBtn.addEventListener("click", hideGame);
gameBtn.addEventListener("click", startGame);

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
gameMessages.children[0].innerText = `¡Bienvenido a The Clue!

    En esta casa se ha cometido un crimen. Deberás recorrer la casa, investigando y hallando pistas que te ayuden a aclarar lo sucedido ¡Éxitos en tu búsqueda!`;

// FUNCIÓN PARA DETERMINAR EL MOVIMIENTO DEL JUGADOR
const rollDice = () => {
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
        showMessage(`¡Tira los dados!`);
    }, 3000);
    setTimeout(() => {
        showDiceBtn();
    }, 3000);
    hideInterface();
};

const personalizePlayerOffcanvas = (player) => {
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
            break;
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
            /* let someOneWon = false; */
            if (actualPlayer === 0) {
                suspectHolderRow.innerHTML = ``;
                weaponsHolderRow.innerHTML = ``;
                roomsHolderRow.innerHTML = ``;
                turn(1);
                if (!playerHand1) {
                    console.log(`Creando PlayerHand1`);
                    playerHand1 = readyForPrint(actualPlayer);
                    /* console.table(`${playerHand1}`); */
                    playerHand1 = JSON.stringify(playerHand1);
                    /* console.log(playerHand1); */
                    sessionStorage.setItem("playerHand1", playerHand1);
                } else {
                    console.log(`Playerhand 1 ya fue creada`);
                }
                personalizePlayerOffcanvas(actualPlayer);
                printCards(actualPlayer);
                greyscaleCards(actualPlayer);
            } else if (actualPlayer === 1) {
                suspectHolderRow.innerHTML = ``;
                weaponsHolderRow.innerHTML = ``;
                roomsHolderRow.innerHTML = ``;
                turn(2);
                if (!playerHand2) {
                    console.log(`Creando PlayerHand2`);
                    playerHand2 = readyForPrint(actualPlayer);
                    /* console.table(`${playerHand2}`); */
                    playerHand2 = JSON.stringify(playerHand2);
                    /*  console.log(playerHand2); */
                    sessionStorage.setItem("playerHand2", playerHand2);
                } else {
                    console.log(`Playerhand 1 ya fue creada`);
                }
                personalizePlayerOffcanvas(actualPlayer);
                printCards(actualPlayer);
                greyscaleCards(actualPlayer);
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
                turn(1);
                if (!playerHand1) {
                    console.log(`Creando PlayerHand1`);
                    playerHand1 = readyForPrint(actualPlayer);
                    /* console.table(`${playerHand1}`); */
                    playerHand1 = JSON.stringify(playerHand1);
                    /*  console.log(playerHand1); */
                    sessionStorage.setItem("playerHand1", playerHand1);
                } else {
                    console.log(`Playerhand 1 ya fue creada`);
                }
                personalizePlayerOffcanvas(actualPlayer);
                printCards(actualPlayer);
                greyscaleCards(actualPlayer);
            } else if (actualPlayer === 1) {
                suspectHolderRow.innerHTML = ``;
                weaponsHolderRow.innerHTML = ``;
                roomsHolderRow.innerHTML = ``;
                turn(2);
                if (!playerHand2) {
                    console.log(`Creando PlayerHand2`);
                    playerHand2 = readyForPrint(actualPlayer);
                    /* console.table(`${playerHand2}`); */
                    playerHand2 = JSON.stringify(playerHand2);
                    /* console.log(playerHand2); */
                    sessionStorage.setItem("playerHand2", playerHand2);
                } else {
                    console.log(`Playerhand 2 ya fue creada`);
                }
                personalizePlayerOffcanvas(actualPlayer);
                printCards(actualPlayer);
                greyscaleCards(actualPlayer);
            } else if (actualPlayer === 2) {
                suspectHolderRow.innerHTML = ``;
                weaponsHolderRow.innerHTML = ``;
                roomsHolderRow.innerHTML = ``;
                turn(3);
                if (!playerHand3) {
                    console.log(`Creando PlayerHand3`);
                    playerHand3 = readyForPrint(actualPlayer);
                    /*  console.table(`${playerHand3}`); */
                    playerHand3 = JSON.stringify(playerHand3);
                    /* console.log(playerHand3); */
                    sessionStorage.setItem("playerHand3", playerHand3);
                } else {
                    console.log(`Playerhand 3 ya fue creada`);
                }
                personalizePlayerOffcanvas(actualPlayer);
                printCards(actualPlayer);
                greyscaleCards(actualPlayer);
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
                turn(1);
                if (!playerHand1) {
                    console.log(`Creando PlayerHand1`);
                    playerHand1 = readyForPrint(actualPlayer);
                    /* console.table(`${playerHand1}`); */
                    playerHand1 = JSON.stringify(playerHand1);
                    /* console.log(playerHand1); */
                    sessionStorage.setItem("playerHand1", playerHand1);
                } else {
                    console.log(`Playerhand 1 ya fue creada`);
                }
                personalizePlayerOffcanvas(actualPlayer);
                printCards(actualPlayer);
                greyscaleCards(actualPlayer);
            } else if (actualPlayer === 1) {
                suspectHolderRow.innerHTML = ``;
                weaponsHolderRow.innerHTML = ``;
                roomsHolderRow.innerHTML = ``;
                turn(2);
                if (!playerHand2) {
                    console.log(`Creando PlayerHand2`);
                    playerHand2 = readyForPrint(actualPlayer);
                    /* console.table(`${playerHand2}`); */
                    playerHand2 = JSON.stringify(playerHand2);
                    /*   console.log(playerHand2); */
                    sessionStorage.setItem("playerHand2", playerHand2);
                } else {
                    console.log(`Playerhand 2 ya fue creada`);
                }
                personalizePlayerOffcanvas(actualPlayer);
                printCards(actualPlayer);
                greyscaleCards(actualPlayer);
            } else if (actualPlayer === 2) {
                suspectHolderRow.innerHTML = ``;
                weaponsHolderRow.innerHTML = ``;
                roomsHolderRow.innerHTML = ``;
                turn(3);
                if (!playerHand3) {
                    console.log(`Creando PlayerHand3`);
                    playerHand3 = readyForPrint(actualPlayer);
                    /* console.table(`${playerHand3}`); */
                    playerHand3 = JSON.stringify(playerHand3);
                    /* console.log(playerHand3); */
                    sessionStorage.setItem("playerHand3", playerHand3);
                } else {
                    console.log(`Playerhand 3 ya fue creada`);
                }
                personalizePlayerOffcanvas(actualPlayer);
                printCards(actualPlayer);
                greyscaleCards(actualPlayer);
            } else if (actualPlayer === 3) {
                suspectHolderRow.innerHTML = ``;
                weaponsHolderRow.innerHTML = ``;
                roomsHolderRow.innerHTML = ``;
                turn(4);
                if (!playerHand4) {
                    console.log(`Creando PlayerHand4`);
                    playerHand4 = readyForPrint(actualPlayer);
                    /* console.table(`${playerHand4}`); */
                    playerHand4 = JSON.stringify(playerHand4);
                    /* console.log(playerHand4); */
                    sessionStorage.setItem("playerHand4", playerHand4);
                } else {
                    console.log(`Playerhand 4 ya fue creada`);
                }
                personalizePlayerOffcanvas(actualPlayer);
                printCards(actualPlayer);
                greyscaleCards(actualPlayer);
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
                turn(1);
                if (!playerHand1) {
                    console.log(`Creando PlayerHand1`);
                    playerHand1 = readyForPrint(actualPlayer);
                    /* console.table(`${playerHand1}`); */
                    playerHand1 = JSON.stringify(playerHand1);
                    /* console.log(playerHand1); */
                    sessionStorage.setItem("playerHand1", playerHand1);
                } else {
                    console.log(`Playerhand 1 ya fue creada`);
                }
                personalizePlayerOffcanvas(actualPlayer);
                printCards(actualPlayer);
                greyscaleCards(actualPlayer);
            } else if (actualPlayer === 1) {
                suspectHolderRow.innerHTML = ``;
                weaponsHolderRow.innerHTML = ``;
                roomsHolderRow.innerHTML = ``;
                turn(2);
                if (!playerHand2) {
                    console.log(`Creando PlayerHand2`);
                    playerHand2 = readyForPrint(actualPlayer);
                    /* console.table(`${playerHand2}`); */
                    playerHand2 = JSON.stringify(playerHand2);
                    /*  console.log(playerHand2); */
                    sessionStorage.setItem("playerHand2", playerHand2);
                } else {
                    console.log(`Playerhand 2 ya fue creada`);
                }
                personalizePlayerOffcanvas(actualPlayer);
                printCards(actualPlayer);
                greyscaleCards(actualPlayer);
            } else if (actualPlayer === 2) {
                suspectHolderRow.innerHTML = ``;
                weaponsHolderRow.innerHTML = ``;
                roomsHolderRow.innerHTML = ``;
                turn(3);
                if (!playerHand3) {
                    console.log(`Creando PlayerHand3`);
                    playerHand3 = readyForPrint(actualPlayer);
                    /* console.table(`${playerHand3}`); */
                    playerHand3 = JSON.stringify(playerHand3);
                    /* console.log(playerHand3); */
                    sessionStorage.setItem("playerHand3", playerHand3);
                } else {
                    console.log(`Playerhand 3 ya fue creada`);
                }
                personalizePlayerOffcanvas(actualPlayer);
                printCards(actualPlayer);
                greyscaleCards(actualPlayer);
            } else if (actualPlayer === 3) {
                suspectHolderRow.innerHTML = ``;
                weaponsHolderRow.innerHTML = ``;
                roomsHolderRow.innerHTML = ``;
                turn(4);
                if (!playerHand4) {
                    console.log(`Creando PlayerHand4`);
                    playerHand4 = readyForPrint(actualPlayer);
                    /* console.table(`${playerHand4}`); */
                    playerHand4 = JSON.stringify(playerHand4);
                    /* console.log(playerHand4); */
                    sessionStorage.setItem("playerHand4", playerHand4);
                } else {
                    console.log(`Playerhand 4 ya fue creada`);
                }
                personalizePlayerOffcanvas(actualPlayer);
                printCards(actualPlayer);
                greyscaleCards(actualPlayer);
            } else if (actualPlayer === 4) {
                suspectHolderRow.innerHTML = ``;
                weaponsHolderRow.innerHTML = ``;
                roomsHolderRow.innerHTML = ``;
                turn(5);
                if (!playerHand5) {
                    console.log(`Creando PlayerHand5`);
                    playerHand5 = readyForPrint(actualPlayer);
                    /* console.table(`${playerHand5}`); */
                    playerHand5 = JSON.stringify(playerHand5);
                    /* console.log(playerHand5); */
                    sessionStorage.setItem("playerHand5", playerHand5);
                } else {
                    console.log(`Playerhand 5 ya fue creada`);
                }
                personalizePlayerOffcanvas(actualPlayer);
                printCards(actualPlayer);
                greyscaleCards(actualPlayer);
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
                turn(1);
                if (!playerHand1) {
                    console.log(`Creando PlayerHand1`);
                    playerHand1 = readyForPrint(actualPlayer);
                    /* console.table(`${playerHand1}`); */
                    playerHand1 = JSON.stringify(playerHand1);
                    /*  console.log(playerHand1); */
                    sessionStorage.setItem("playerHand1", playerHand1);
                } else {
                    console.log(`Playerhand 1 ya fue creada`);
                }
                personalizePlayerOffcanvas(actualPlayer);
                printCards(actualPlayer);
                greyscaleCards(actualPlayer);
            } else if (actualPlayer === 1) {
                suspectHolderRow.innerHTML = ``;
                weaponsHolderRow.innerHTML = ``;
                roomsHolderRow.innerHTML = ``;
                turn(2);
                if (!playerHand2) {
                    console.log(`Creando PlayerHand2`);
                    playerHand2 = readyForPrint(actualPlayer);
                    /* console.table(`${playerHand2}`); */
                    playerHand2 = JSON.stringify(playerHand2);
                    /*  console.log(playerHand2); */
                    sessionStorage.setItem("playerHand2", playerHand2);
                } else {
                    console.log(`Playerhand 2 ya fue creada`);
                }
                personalizePlayerOffcanvas(actualPlayer);
                printCards(actualPlayer);
                greyscaleCards(actualPlayer);
            } else if (actualPlayer === 2) {
                suspectHolderRow.innerHTML = ``;
                weaponsHolderRow.innerHTML = ``;
                roomsHolderRow.innerHTML = ``;
                turn(3);
                if (!playerHand3) {
                    console.log(`Creando PlayerHand3`);
                    playerHand3 = readyForPrint(actualPlayer);
                    /* console.table(`${playerHand3}`); */
                    playerHand3 = JSON.stringify(playerHand3);
                    /* console.log(playerHand3); */
                    sessionStorage.setItem("playerHand3", playerHand3);
                } else {
                    console.log(`Playerhand 3 ya fue creada`);
                }
                personalizePlayerOffcanvas(actualPlayer);
                printCards(actualPlayer);
                greyscaleCards(actualPlayer);
            } else if (actualPlayer === 3) {
                suspectHolderRow.innerHTML = ``;
                weaponsHolderRow.innerHTML = ``;
                roomsHolderRow.innerHTML = ``;
                turn(4);
                if (!playerHand4) {
                    console.log(`Creando PlayerHand4`);
                    playerHand4 = readyForPrint(actualPlayer);
                    /* console.table(`${playerHand4}`); */
                    playerHand4 = JSON.stringify(playerHand4);
                    /* console.log(playerHand4); */
                    sessionStorage.setItem("playerHand4", playerHand4);
                } else {
                    console.log(`Playerhand 4 ya fue creada`);
                }
                personalizePlayerOffcanvas(actualPlayer);
                printCards(actualPlayer);
                greyscaleCards(actualPlayer);
            } else if (actualPlayer === 4) {
                suspectHolderRow.innerHTML = ``;
                weaponsHolderRow.innerHTML = ``;
                roomsHolderRow.innerHTML = ``;
                turn(5);
                if (!playerHand5) {
                    console.log(`Creando PlayerHand5`);
                    playerHand5 = readyForPrint(actualPlayer);
                    /* console.table(`${playerHand5}`); */
                    playerHand5 = JSON.stringify(playerHand5);
                    /*  console.log(playerHand5); */
                    sessionStorage.setItem("playerHand5", playerHand5);
                } else {
                    console.log(`Playerhand 5 ya fue creada`);
                }
                personalizePlayerOffcanvas(actualPlayer);
                printCards(actualPlayer);
                greyscaleCards(actualPlayer);
            } else if (actualPlayer === 5) {
                suspectHolderRow.innerHTML = ``;
                weaponsHolderRow.innerHTML = ``;
                roomsHolderRow.innerHTML = ``;
                turn(6);
                if (!playerHand6) {
                    console.log(`Creando PlayerHand6`);
                    playerHand6 = readyForPrint(actualPlayer);
                    /* console.table(`${playerHand6}`); */
                    playerHand6 = JSON.stringify(playerHand6);
                    /* console.log(playerHand6); */
                    sessionStorage.setItem("playerHand6", playerHand6);
                } else {
                    console.log(`Playerhand 6 ya fue creada`);
                }
                personalizePlayerOffcanvas(actualPlayer);
                printCards(actualPlayer);
                greyscaleCards(actualPlayer);
            }
            break;
        default:
            break;
    }
};

const accusation = () => {};

const playerMovement = (diceNumber, actualPlayer) => {
    console.log(`ejecutando player movement`);
    /* console.log(actualPlayer);
    console.log(diceNumber); */
    movement = diceNumber;
    let movingPlayerIndex;
    let movingPlayerRow;
    let possibleMovementRow;
    let possibleMovementCell;
    let materializedCell;
    let i = 0;
    let rowCounter = 0;
    let movingPlayer = actualPlayer + 1;
    /* console.log(movingPlayer); */
    for (let row of movementBoard) {
        /* console.log(row); */
        for (let cell of row) {
            /* console.log(cell);
            console.log(`Analizando el index ${i} del array ${row}`);
            console.log(movementBoard[movementBoard.indexOf(row)][i]); */
            if (movingPlayer === cell) {
                movingPlayerIndex = row.indexOf(cell);
                movingPlayerRow = movementBoard.indexOf(row);
                console.log(
                    `La ubicación del jugador es en fila ${movementBoard.indexOf(
                        row
                    )}, celda ${movingPlayerIndex}`
                );
                possibleMovementCell = i;
                possibleMovementRow = movementBoard.indexOf(row);
            }
            /* console.log(`El valor del rowcounter es ${rowCounter}`);
            console.log(`El valor del i es ${i}`);
            console.log(
                `El valor de la celda es ${movementBoard[rowCounter][i]}`
            ); */
            if (movementBoard[rowCounter][i] !== 7) {
                /* console.log(rowCounter);
                console.log(possibleMovementRow + movement); */
                let cellDifference = Math.abs(i - movingPlayerIndex);
                let rowDifference = Math.abs(rowCounter - movingPlayerRow);
                if (
                    rowCounter <= possibleMovementRow + movement &&
                    (i <= possibleMovementCell + movement ||
                        i <= possibleMovementCell - movement) &&
                    cellDifference <= movement &&
                    rowDifference <= movement
                ) {
                    if (
                        rowCounter === movingPlayerRow ||
                        i === movingPlayerIndex
                    ) {
                        console.log(
                            `se encontraron los siguientes movimientos posibles`
                        );
                        materializedCell =
                            movementBoardTable.children[rowCounter].children[i];
                        console.log(materializedCell);
                        if (materializedCell) {
                            if (
                                !materializedCell.classList.contains(`unable`)
                            ) {
                                materializedCell.classList.add(
                                    `movement-in-cell`
                                );
                            }
                        }
                    } else {
                        console.log(
                            `se encontraron los siguientes movimientos posibles`
                        );
                        materializedCell =
                            movementBoardTable.children[rowCounter - 1]
                                .children[i];
                        console.log(materializedCell);
                        if (materializedCell) {
                            if (
                                !materializedCell.classList.contains(`unable`)
                            ) {
                                materializedCell.classList.add(
                                    `movement-in-cell`
                                );
                            }
                        }
                    }
                }
            }
            if (i < 23) {
                i += 1;
            } else {
                i = 0;
            }
        }
        if (rowCounter < 24) {
            rowCounter += 1;
        } else {
            rowCounter = 0;
        }
    }
};

// FUNCIÓN QUE DETERMINA SI EL MOVIMIENTO OBTENIDO ES SUFICIENTE PARA ACUSAR (En un futuro va a ser modificada, dado que lo que permite la oportunidad de acusar va a ser un evento desencadenado por la pieza ingresando a una habitación en el tablero)
const enoughToAccuse = (diceNumber) => {
    console.log("ejecutando enoughToAccuse");
    if (diceNumber >= 5) {
        dialogInterface.addEventListener("submit", (evt) => {
            evt.preventDefault();
            evt.target[0].value = "";
            console.log(evt.target[0].value);
        });
        console.log(`puedes acusar`);
        setTimeout(() => {
            showMessage(`El Jugador ${actualPlayer + 1} puede acusar:`);
        }, 2000);
        showAccBtn();
        hideDiceBtn();
        accusationDynamic();
    } else {
        hideDiceBtn();
        setTimeout(() => {
            setTimeout(() => {
                showMessage(`Sacaste menos de 5, no puedes acusar`);
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
};

// Función auxiliar que permite que al seleccionar las cartas de sospechoso, arma y lugar, vaya haciendo un checkmark y no se repitan en la tríada
const isInTriad = () => {
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
};

// FUNCIÓN QUE UNA VEZ CONFIRMADA LA ACUSACIÓN CHEQUEA SI CORRESPONDE DECLARAR UN GANADOR, O SI POR EL CONTRARIO, CORRESPONDE DAR CURSO AL SIGUIENTE TURNO
const confirmAccusation = (evt) => {
    console.log(`la Solución es: ${solution}`);
    console.log(`la acusación es: ${selectedTriade}`);
    if (
        selectedTriade[0] === solution[0] &&
        selectedTriade[1] === solution[1] &&
        selectedTriade[2] === solution[2]
    ) {
        accusationCloseBtn.click();
        setTimeout(() => {
            showMessage(
                `¡Has ganado! El/la asesino/a era ${solution[0]}, con el/la ${solution[1]} en el/la ${solution[2]}`
            );
        }, 200);
        for (let i = 1; i <= 6; i += 1) {
            sessionStorage.removeItem(`playerHand${i}`);
        }
        hideAccBtn();
    } else {
        setTimeout(() => {
            showMessage(`¡No acertaste, prueba mejor suerte la próxima vez!`);
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
        hideDiceBtn();
        hideAccBtn();
        resetAccusation();
        turnDynamic(playerNumber);
    }
};

let suspectCheck, weaponCheck;

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
    let counter = 0;
    switch (jugador + 1) {
        case 1:
            unGrayingCards();
            storagedHand = "playerHand1";
            currentHand = sessionStorage.getItem(storagedHand);
            /* console.log(currentHand); */
            currentHand = JSON.parse(currentHand);
            /* console.log(currentHand); */
            for (const key in currentHand) {
                for (let card of currentHand[`${key}`]) {
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
                            ].childNodes[0].classList.add(`greyed-card`);
                        }
                        if (counter < 20) {
                            counter += 1;
                        } else {
                            counter = 0;
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
            for (const key in currentHand) {
                for (let card of currentHand[`${key}`]) {
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
                            ].childNodes[0].classList.add(`greyed-card`);
                        }
                        if (counter < 20) {
                            counter += 1;
                        } else {
                            counter = 0;
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
            for (const key in currentHand) {
                for (let card of currentHand[`${key}`]) {
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
                            ].childNodes[0].classList.add(`greyed-card`);
                        }
                        if (counter < 20) {
                            counter += 1;
                        } else {
                            counter = 0;
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
            for (const key in currentHand) {
                for (let card of currentHand[`${key}`]) {
                    /* console.log(card);
                    console.log(`./${card}`); */
                    for (let screenCard of accusationTotalCards) {
                        console.log(counter);
                        if (
                            accusationTotalCards[counter].childNodes[0]
                                .attributes[0].value === `./${card}`
                        ) {
                            /* console.log(`Se encontró ${card} en ${screenCard}`); */
                            accusationTotalCards[
                                counter
                            ].childNodes[0].classList.add(`greyed-card`);
                        }
                        if (counter < 20) {
                            counter += 1;
                        } else {
                            counter = 0;
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
            for (const key in currentHand) {
                for (let card of currentHand[`${key}`]) {
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
                            ].childNodes[0].classList.add(`greyed-card`);
                        }
                        if (counter < 20) {
                            counter += 1;
                        } else {
                            counter = 0;
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
            for (const key in currentHand) {
                for (let card of currentHand[`${key}`]) {
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
                            ].childNodes[0].classList.add(`greyed-card`);
                        }
                        if (counter < 20) {
                            counter += 1;
                        } else {
                            counter = 0;
                        }
                    }
                }
            }
            break;
    }
};

// FUNCIÓN CALLBACK QUE CONTIENE LA LÓGICA DE LA SELECCIÓN DE SOSPECHOSO, ARMA Y LUGAR, MANIPULA LAS INTERFACES Y MUESTRA UNA INTERFAZ FINAL DE LA ACUSACIÓN REALIZADA
const suspectSelection = (evt) => {
    console.log(evt.target.id);
    switch (selectedTriade.length) {
        case 0:
            suspectsAccContainer.classList.remove(
                "hidden-accusation-category-container"
            );
            suspectsAccContainer.classList.add("accusation-category-container");
            selectedTriade.push(evt.target.id.toUpperCase());
            suspectsAccContainer.classList.add(
                "hidden-accusation-category-container"
            );
            suspectsAccContainer.classList.remove(
                "accusation-category-container"
            );
            weaponsAccContainer.classList.add("accusation-category-container");
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
            roomsAccContainer.classList.add("accusation-category-container");
            roomsAccContainer.classList.remove(
                "hidden-accusation-category-container"
            );
            break;
        case 2:
            selectedTriade.push(evt.target.id.toUpperCase());
            console.log(selectedTriade);
            roomsAccContainer.classList.remove("accusation-category-container");
            roomsAccContainer.classList.add(
                "hidden-accusation-category-container"
            );
            guessedAccContainer.classList.remove(
                "hidden-accusation-category-container"
            );
            guessedAccContainer.classList.add("accusation-category-container");
            for (let guess of selectedTriade) {
                guessedAccContainer.innerHTML += `<img src="${
                    cartas[`${guess.toLowerCase()}`]
                }" alt="${guess.toLowerCase()}" class="card-suspect">`;
            }
            break;
    }
    accusationConfirmBtn.addEventListener("click", confirmAccusation);
};

// FUNCIÓN AUXILIAR QUE PERMITE RESTAURAR LA TRÍADA DE ACUSACIÓN A "" - SE PUEDE EJECUTAR SI EL USUARIO SE ARREPIENTE Y DESEA VARIAR LA ACUSACIÓN; ASÍ COMO CUANDO LA ACUSACIÓN FUE CONFIRMADA Y NO SE CORRESPONDE CON LA SOLUCIÓN
const resetAccusation = (evt) => {
    guessedAccContainer.innerHTML = "";
    selectedTriade = [];
    guessedAccContainer.classList.add("hidden-accusation-category-container");
    guessedAccContainer.classList.remove("accusation-category-container");
    suspectsAccContainer.classList.remove(
        "hidden-accusation-category-container"
    );
    suspectsAccContainer.classList.add("accusation-category-container");
    weaponsAccContainer.classList.remove("accusation-category-container");
    weaponsAccContainer.classList.add("hidden-accusation-category-container");
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
    // control del objeto contenedor de la repartición
    console.log(manosArmadas);
    /* printCards(1); */
    /* playGame(); */
}

let exit;
let arma;
let lugar;
let sospechoso;
const acusacionActual = [arma, lugar, sospechoso];
let winCheck;

// objeto literal con los personajes
const personajes = {
    personaje1: "MOSTAZA",
    personaje2: "VERDI",
    personaje3: "MORADILLO",
    personaje4: "BLANCO",
    personaje5: "ESCARLATA",
    personaje6: "AZULINO",
};

//objeto literal con las armas
const armas = {
    arma1: "CUCHILLO",
    arma2: "PISTOLA",
    arma3: "TUBO",
    arma4: "CUERDA",
    arma5: "LLAVEDETUERCAS",
    arma6: "CANDELABRO",
};

// objeto literal con los lugares
const lugares = {
    lugar1: "COCINA",
    lugar2: "SALONDEBAILE",
    lugar3: "INVERNADERO",
    lugar4: "COMEDOR",
    lugar5: "SALADEBILLAR",
    lugar6: "BIBLIOTECA",
    lugar7: "ESTUDIO",
    lugar8: "VESTIBULO",
    lugar9: "SALA",
};
// Objeto literal contenedor de las imágenes correspondientes a las cartas
const cartas = {
    mostaza: "assets/cartas/mostaza.png",
    verdi: "assets/cartas/verdi.png",
    moradillo: "assets/cartas/moradillo.png",
    blanco: "assets/cartas/blanco.png",
    escarlata: "assets/cartas/escarlata.png",
    azulino: "assets/cartas/azulino.png",
    cuchillo: "assets/cartas/cuchillo.png",
    pistola: "assets/cartas/pistola.png",
    tubo: "assets/cartas/tubo.png",
    cuerda: "assets/cartas/cuerda.png",
    llavedetuercas: "assets/cartas/llavedetuercas.png",
    candelabro: "assets/cartas/candelabro.png",
    cocina: "assets/cartas/cocina.png",
    salondebaile: "assets/cartas/salondebaile.png",
    invernadero: "assets/cartas/invernadero.png",
    comedor: "assets/cartas/COMEDOR.png",
    saladebillar: "assets/cartas/billar.png",
    biblioteca: "assets/cartas/biblioteca.png",
    estudio: "assets/cartas/estudio.png",
    vestibulo: "assets/cartas/hall.png",
    sala: "assets/cartas/sala.png",
};
// FUNCIÓN QUE PERMITE DETERMINAR QUÉ CARTAS TIENE EL JUGADOR, LAS CLASIFICA EN CATEGORÍAS, Y DEVUELVE UN OBJETO QUE SERÁ ALMACENADO EN LA SESSION STORAGE A LOS FINES DE PODER IMPRIMIR LAS CARTAS DEL JUGADOR EN PANTALLA, EVITANDO TENER QUE REALIZAR DICHO CÁLCULO CADA VEZ QUE SEA SU TURNO
const readyForPrint = (jugador) => {
    console.log(`Ejecutando readyForPrint`);
    let forPrint = {};
    let suspects = [];
    let weapons = [];
    let rooms = [];
    let listaCartas = Object.keys(cartas);
    let manosJugador = Object.values(manosArmadas)[jugador];
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
        if (!suspectHolderRow.innerHTML) {
            console.log(`Imprimiendo la carta "${alt} en columna Sospechosos"`);
            suspectHolderRow.innerHTML = `<img src="${card}" alt="${alt}" class="card-suspect">`;
        } else {
            console.log(`Imprimiendo la carta "${alt} en columna Sospechosos"`);
            suspectHolderRow.innerHTML += `<img src="${card}" alt="${alt}" class="card-suspect">`;
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
        if (!weaponsHolderRow.innerHTML) {
            console.log(`Imprimiendo la carta "${alt} en columna Armas"`);
            weaponsHolderRow.innerHTML = `<img src="${card}" alt="${alt}" class="card-suspect">`;
        } else {
            console.log(`Imprimiendo la carta "${alt} en columna Armas"`);
            weaponsHolderRow.innerHTML += `<img src="${card}" alt="${alt}" class="card-suspect">`;
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
};

// FUNCIÓN CALLBACK QUE INICIA EL MECANISMO DE IMPRESIÓN A MEDIDA QUE VAN AVANZANDO LOS TURNOS
const printCards = (jugador) => {
    switch (jugador + 1) {
        case 1:
            console.log(`Imprimiendo cartas jugador ${jugador + 1}`);
            printMechanism("playerHand1");
            break;
        case 2:
            console.log(`Imprimiendo cartas jugador ${jugador + 1}`);
            printMechanism("playerHand2");
            break;
        case 3:
            console.log(`Imprimiendo cartas jugador ${jugador + 1}`);
            printMechanism("playerHand3");
            break;
        case 4:
            console.log(`Imprimiendo cartas jugador ${jugador + 1}`);
            printMechanism("playerHand4");
            break;
        case 5:
            console.log(`Imprimiendo cartas jugador ${jugador + 1}`);
            printMechanism("playerHand5");
            break;
        case 6:
            console.log(`Imprimiendo cartas jugador ${jugador + 1}`);
            printMechanism("playerHand6");
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
        // MÉTODO DE MEZCLADO ANTERIOR
        /* let currentIndex = array.length,
            randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }
        return array; */
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

window.onunload = function () {
    for (let i = 1; i <= 6; i += 1) {
        sessionStorage.removeItem(`playerHand${i}`);
    }
};
