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

const totalPlayers = [];

const manosClasificadas = [];

let selectedTriade = [];
// -------- DOM ---------
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

startBtn.addEventListener("click", showGame);
otherStartBtn.addEventListener("click", showGame);
quitBtn.addEventListener("click", hideGame);
gameBtn.addEventListener("click", startGame);

/* ====================  COMIENZA EL JUEGO  ==================== */

// determinando cantidad de jugadores
dialogInterface.addEventListener("submit", (evt) => {
    evt.preventDefault();
    if (!playerNumber) {
        console.log(evt.target[0].value);
        playerNumber = evt.target[0].value;
        if (+playerNumber && playerNumber > 1 && playerNumber <= 6) {
            hideInterface();
            runGame();
            turnDynamic(playerNumber);
            evt.target[0].value = "";
        } else {
            gameMessages.children[0].innerText = `Error, el dato ingresado no es una cantidad válida. 
        Intenta nuevamente eligiendo un número del 2 al 6:`;
            evt.target[0].value = "";
        }
    }
    return playerNumber;
});

gameMessages.children[0].innerText = `¡Bienvenido a The Clue!
    En cualquier momento del juego puedes insertar la letra "q" en los prompt para cortar la ejecución y salir del juego ¡Que lo disfurtes!`;

const rollDice = () => {
    movimiento = Math.ceil(Math.random() * 6);
    alert(`Tiraste un ${movimiento}`);
    return enoughToAccuse(movimiento);
};
// const movement = diceBtn.addEventListener("click", rollDice);

const turn = (player) => {
    setTimeout(() => {
        showMessage(`Turno Jugador ${player}`);
    }, 2000);
    setTimeout(() => {
        showMessage(`¡Tira los dados!`);
    }, 5000);
    setTimeout(() => {
        showDiceBtn();
    }, 5000);
    hideInterface();
};

isEnoughtToAccuse = diceBtn.addEventListener("click", rollDice);

const turnDynamic = (playerNumber) => {
    console.log("está llegando antes del switch");
    switch (+playerNumber) {
        case 2:
            console.log(`Dos jugadores`);
            // Turno Jugador 1
            let someOneWon = false;
            if (actualPlayer === 0) {
                suspectHolderRow.innerHTML = ``;
                weaponsHolderRow.innerHTML = ``;
                roomsHolderRow.innerHTML = ``;
                turn(1);
                printCards(actualPlayer);
            } else if (actualPlayer === 1) {
                suspectHolderRow.innerHTML = ``;
                weaponsHolderRow.innerHTML = ``;
                roomsHolderRow.innerHTML = ``;
                turn(2);
                printCards(actualPlayer);
            }

            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            break;
        case 6:
            break;
        default:
            break;
    }
};

const accusation = () => {};

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
        console.log(`No puedes acusar`);
        if (actualPlayer < playerNumber - 1) {
            console.log("pasando al siguiente turno");
            actualPlayer += 1;
            console.log(`ActualPlayer es: ${actualPlayer}`);
        } else {
            console.log("reiniciando la ronda");
            actualPlayer = 0;
            console.log(`ActualPlayer es: ${actualPlayer}`);
        }
        hideDiceBtn();
        turnDynamic(playerNumber);
    }
};

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

const confirmAccusation = (evt) => {
    console.log(`la Solución es: ${solution}`);
    console.log(`la acusación es: ${selectedTriade}`);
    if (
        selectedTriade[0] === solution[0] &&
        selectedTriade[1] === solution[1] &&
        selectedTriade[2] === solution[2]
    ) {
        console.log(`has ganado!`);
    }
};

let suspectCheck, weaponCheck;

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

const resetAccusation = (evt) => {
    guessedAccContainer.innerHTML = "";
    selectedTriade = [];
    guessedAccContainer.classList.add("hidden-accusation-category-container");
    guessedAccContainer.classList.remove("accusation-category-container");
    suspectsAccContainer.classList.remove(
        "hidden-accusation-category-container"
    );
    suspectsAccContainer.classList.add("accusation-category-container");
    for (let card of accusationCardSelector) {
        card.addEventListener("click", suspectSelection);
    }
};

accusationResetBtn.addEventListener("click", resetAccusation);

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

/* suspectHolderRow.innerHTML = `<img src="${cartas.mostaza}" alt="coronel mostaza" class="card-suspect">`; */
const printCards = (jugador) => {
    let listaCartas = Object.keys(cartas);
    let manosJugador = Object.values(manosArmadas)[jugador];
    console.log(manosJugador);
    let actualArray = 0;
    for (carta of listaCartas) {
        console.log(`Buscando para imprimir la carta ${carta}`);
        for (let category of manosJugador) {
            console.table(category);
            if (category.includes(carta.toUpperCase())) {
                console.log(`se encontró`);
                if (actualArray === 0) {
                    if (!suspectHolderRow.innerHTML) {
                        console.log(
                            `Imprimiendo la carta "${carta} en columna Sospechosos"`
                        );
                        suspectHolderRow.innerHTML = `<img src="${
                            cartas[`${carta}`]
                        }" alt="${carta}" class="card-suspect">`;
                        actualArray += 1;
                        if (actualArray > 2) {
                            actualArray = 0;
                        }
                        continue;
                    } else {
                        console.log(
                            `Imprimiendo la carta "${carta} en columna Sospechosos"`
                        );
                        suspectHolderRow.innerHTML += `<img src="${
                            cartas[`${carta}`]
                        }" alt="${carta}" class="card-suspect">`;
                        actualArray += 1;
                        if (actualArray > 2) {
                            actualArray = 0;
                        }
                        continue;
                    }
                } else if (actualArray === 1) {
                    if (!weaponsHolderRow.innerHTML) {
                        console.log(
                            `Imprimiendo la carta "${carta} en columna Armas"`
                        );
                        weaponsHolderRow.innerHTML = `<img src="${
                            cartas[`${carta}`]
                        }" alt="${carta}" class="card-suspect">`;
                        actualArray += 1;
                        if (actualArray > 2) {
                            actualArray = 0;
                        }
                        continue;
                    } else {
                        console.log(
                            `Imprimiendo la carta "${carta} en columna Armas"`
                        );
                        weaponsHolderRow.innerHTML += `<img src="${
                            cartas[`${carta}`]
                        }" alt="${carta}" class="card-suspect">`;
                        actualArray += 1;
                        if (actualArray > 2) {
                            actualArray = 0;
                        }
                        continue;
                    }
                } else if (actualArray === 2) {
                    if (!roomsHolderRow.innerHTML) {
                        console.log(
                            `Imprimiendo la carta "${carta} en columna Habitaciones"`
                        );
                        roomsHolderRow.innerHTML = `<img src="${
                            cartas[`${carta}`]
                        }" alt="${carta}" class="card-suspect">`;
                        actualArray += 1;
                        if (actualArray > 2) {
                            actualArray = 0;
                        }
                        continue;
                    } else {
                        console.log(
                            `Imprimiendo la carta "${carta} en columna Habitaciones"`
                        );
                        roomsHolderRow.innerHTML += `<img src="${
                            cartas[`${carta}`]
                        }" alt="${carta}" class="card-suspect">`;
                        actualArray += 1;
                        if (actualArray > 2) {
                            actualArray = 0;
                        }
                        continue;
                    }
                }
            } else {
                console.log(`no tiene esta carta`);
            }
            /*  for (let item of category) {
                console.log("=========TABLE DE ELEMENT ==============");
                console.table(item);
                console.log(`Es ${carta} igual a ${item}?`);
                if (item === carta.toUpperCase()) {
                    console.log(
                        `Se encontró la carta "${carta}" dentro del array "${category}"`
                    ); */ /*
             */
            /*    actualArray += 1;
                    console.log(`El actual array es ${actualArray}`);
                } */
            /* for (let item of category) {
                } */
            console.log(`El actual array es ${actualArray}`);
            actualArray += 1;
            if (actualArray > 2) {
                actualArray = 0;
            }
        }
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
            console.log(firstSixth);
            console.log(secondSixth);
            console.log(thirdSixth);
            console.log(fourthSixth);
            console.log(fifthSixth);
            console.log(sixthSixth);
            readyToMixArray = thirdSixth.concat(firstSixth);
            readyToMixArray = readyToMixArray.concat(sixthSixth);
            readyToMixArray = readyToMixArray.concat(fourthSixth);
            readyToMixArray = readyToMixArray.concat(fifthSixth);
            readyToMixArray = readyToMixArray.concat(secondSixth);
            console.log(readyToMixArray);
            console.log(`Mezclando el array`);
            mixedArray = readyToMixArray.sort((a, b) => {
                let coeficient = Math.ceil(Math.random() * 3);
                console.log(coeficient);
                if (coeficient === 1) {
                    return -1;
                } else if (coeficient === 2) {
                    return 0;
                } else if (coeficient === 3) {
                    return 1;
                }
            });
            console.log(mixedArray);
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

const esPersonaje = (carta) => {
    let valoresPersonajes = Object.values(personajes);
    console.log(`La carta a buscar es ${carta}`);
    for (let personaje of valoresPersonajes) {
        console.log(`El personaje en análisis es: ${personaje}`);
        if (carta === personaje) {
            return carta;
        }
    }
};
const esArma = (carta) => {
    let valoresArmas = Object.values(armas);
    console.log(`La carta a buscar es ${carta}`);
    for (let arma of valoresArmas) {
        console.log(`El arma en análisis es: ${arma}`);
        if (carta === arma) {
            return carta;
        }
    }
};
const esHabitacion = (carta) => {
    let valoresHabitaciones = Object.values(lugares);
    console.log(`La carta a buscar es ${carta}`);
    for (let habitacion of valoresHabitaciones) {
        console.log(`La habitación en análisis es: ${habitacion}`);
        if (carta === habitacion) {
            return carta;
        }
    }
};

const clasificarCartas = () => {
    let i = 0;
    for (let mano of manoRepartida) {
        manosClasificadas.push([[], [], []]);
        console.log("clasificando primer array");
        console.log(manosClasificadas);
        console.log(`La mano que se está analizando es ${mano}`);
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
        console.log(manosClasificadas);
    }
    console.log(`Clasificación finalizada:`);
    console.dir(manosClasificadas);
    return manosClasificadas;
};
