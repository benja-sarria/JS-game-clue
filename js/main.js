alert(
    `Bienvenido a The Clue - En cualquier momento del juego puedes insertar la letra "q" en los prompt para cortar la ejecución y salir del juego ¡Que lo disfurtes!`
);
// primero consultamos la cantidad de jugadores
let playerNumber;

const totalPlayers = [];
// función para determinar cantidad de jugadores
const determiningPlayers = () => {
    do {
        playerNumberPrompt = prompt("Ingrese el número de jugadores");
        playerNumber = parseInt(playerNumberPrompt);
        console.log(playerNumber);
        if (playerNumber > 6 || playerNumber < 2) {
            alert(
                `El límite es 6 jugadores y el mínimo es 2 jugadores. Intenta seleccionar la cantidad de jugadores nuevamente `
            );
        } else if (isNaN(playerNumber) && playerNumberPrompt != "q") {
            alert(
                `El carácter ingresado: "${playerNumberPrompt}",  no es un número válido ¡Intenta nuevamente!`
            );
        } else if (playerNumberPrompt == "q") {
            playerNumber = true;
            break;
        }
    } while (
        playerNumber > 6 ||
        playerNumber < 2 ||
        (isNaN(playerNumber) && playerNumberPrompt != "q")
    );
    return playerNumber;
};

playerNumber = determiningPlayers();
// conformamos nuestro array de players
for (let i = 1; i <= playerNumber; i += 1) {
    totalPlayers.push(i);
}

console.table(totalPlayers);

const quiting = () => {
    if (playerNumber == true) {
        exit = true;
    }
    return exit;
};
// función con la dinámica del juego
function playGame() {
    do {
        for (const player of totalPlayers) {
            alert(`Turno Jugador ${player}`);
            let dice = confirm("¡Tira los dados!");
            if (dice == true) {
                let movimiento = Math.ceil(Math.random() * 6);
                alert(`Tiraste un ${movimiento}`);
                if (movimiento >= 5) {
                    alert(
                        `Tiraste un 5 o más (${movimiento}). Puedes formular tu acusación!`
                    );
                    alert(
                        `Turno de Acusar del Jugador ${player}: Debes elegir una opción para lugar, arma, sospechoso.`
                    );
                    do {
                        acusacionActual[0] = prompt(
                            `Con qué arma crees que lo mató | Opciones: ${armas.arma1} - ${armas.arma2} - ${armas.arma3} - ${armas.arma4} - ${armas.arma5} - ${armas.arma6}`
                        ).toUpperCase();
                        if (
                            acusacionActual[0] == armas.arma1 ||
                            acusacionActual[0] == armas.arma2 ||
                            acusacionActual[0] == armas.arma3 ||
                            acusacionActual[0] == armas.arma4 ||
                            acusacionActual[0] == armas.arma5 ||
                            acusacionActual[0] == armas.arma6
                        ) {
                            break;
                        } else if (acusacionActual[0] == "Q") {
                            acusacionActual[0] = true;
                            break;
                        } else {
                            alert(
                                `El arma ingresada no está disponible. Prueba de vuelta.`
                            );
                        }
                    } while (
                        acusacionActual[arma] != armas.arma1 ||
                        acusacionActual[arma] != armas.arma2 ||
                        acusacionActual[arma] != armas.arma3 ||
                        acusacionActual[arma] != armas.arma4 ||
                        acusacionActual[arma] != armas.arma5 ||
                        acusacionActual[arma] != armas.arma6 ||
                        acusacionActual[arma] != "Q"
                    );
                    if (
                        acusacionActual[0] == armas.arma1 ||
                        acusacionActual[0] == armas.arma2 ||
                        acusacionActual[0] == armas.arma3 ||
                        acusacionActual[0] == armas.arma4 ||
                        acusacionActual[0] == armas.arma5 ||
                        acusacionActual[0] == armas.arma6
                    ) {
                        do {
                            acusacionActual[1] = prompt(
                                `En qué lugar crees que lo mató | Opciones: ${lugares.lugar1} - ${lugares.lugar2} - ${lugares.lugar3} - ${lugares.lugar4} - ${lugares.lugar5} - ${lugares.lugar6} - ${lugares.lugar7} - ${lugares.lugar8} - ${lugares.lugar9}`
                            ).toUpperCase();
                            if (
                                acusacionActual[1] == lugares.lugar1 ||
                                acusacionActual[1] == lugares.lugar2 ||
                                acusacionActual[1] == lugares.lugar3 ||
                                acusacionActual[1] == lugares.lugar4 ||
                                acusacionActual[1] == lugares.lugar5 ||
                                acusacionActual[1] == lugares.lugar6 ||
                                acusacionActual[1] == lugares.lugar7 ||
                                acusacionActual[1] == lugares.lugar8 ||
                                acusacionActual[1] == lugares.lugar9
                            ) {
                                break;
                            } else if (acusacionActual[1] == "Q") {
                                acusacionActual[1] = true;
                                break;
                            } else {
                                alert(
                                    `El lugar ingresado no está disponible. Prueba de vuelta.`
                                );
                            }
                        } while (
                            acusacionActual[1] != lugares.lugar1 ||
                            acusacionActual[1] != lugares.lugar2 ||
                            acusacionActual[1] != lugares.lugar3 ||
                            acusacionActual[1] != lugares.lugar4 ||
                            acusacionActual[1] != lugares.lugar5 ||
                            acusacionActual[1] != lugares.lugar6 ||
                            acusacionActual[1] != lugares.lugar7 ||
                            acusacionActual[1] != lugares.lugar8 ||
                            acusacionActual[1] != lugares.lugar9 ||
                            acusacionActual[1] != "Q"
                        );
                        if (
                            acusacionActual[1] == lugares.lugar1 ||
                            acusacionActual[1] == lugares.lugar2 ||
                            acusacionActual[1] == lugares.lugar3 ||
                            acusacionActual[1] == lugares.lugar4 ||
                            acusacionActual[1] == lugares.lugar5 ||
                            acusacionActual[1] == lugares.lugar6 ||
                            acusacionActual[1] == lugares.lugar7 ||
                            acusacionActual[1] == lugares.lugar8 ||
                            acusacionActual[1] == lugares.lugar9
                        ) {
                            do {
                                acusacionActual[2] = prompt(
                                    `Quién crees que lo mató | Opciones: ${personajes.personaje1} - ${personajes.personaje2} - ${personajes.personaje3} - ${personajes.personaje4} - ${personajes.personaje5} - ${personajes.personaje6}`
                                ).toUpperCase();
                                if (
                                    acusacionActual[2] ==
                                        personajes.personaje1 ||
                                    acusacionActual[2] ==
                                        personajes.personaje2 ||
                                    acusacionActual[2] ==
                                        personajes.personaje3 ||
                                    acusacionActual[2] ==
                                        personajes.personaje4 ||
                                    acusacionActual[2] ==
                                        personajes.personaje5 ||
                                    acusacionActual[2] == personajes.personaje6
                                ) {
                                    break;
                                } else if (acusacionActual[2] == "Q") {
                                    acusacionActual[2] = true;
                                    break;
                                } else {
                                    alert(
                                        `El/la sospechoso/a ingresado/a no está disponible. Prueba de vuelta.`
                                    );
                                }
                            } while (
                                acusacionActual[2] != personajes.personaje1 ||
                                acusacionActual[2] != personajes.personaje2 ||
                                acusacionActual[2] != personajes.personaje3 ||
                                acusacionActual[2] != personajes.personaje4 ||
                                acusacionActual[2] != personajes.personaje5 ||
                                acusacionActual[2] != personajes.personaje6 ||
                                acusacionActual[2] != "Q"
                            );
                            if (
                                acusacionActual[2] == personajes.personaje1 ||
                                acusacionActual[2] == personajes.personaje2 ||
                                acusacionActual[2] == personajes.personaje3 ||
                                acusacionActual[2] == personajes.personaje4 ||
                                acusacionActual[2] == personajes.personaje5 ||
                                acusacionActual[2] == personajes.personaje6
                            ) {
                                if (
                                    respuesta1.arma == acusacionActual[0] &&
                                    respuesta1.lugar == acusacionActual[1] &&
                                    respuesta1.culpable == acusacionActual[2]
                                ) {
                                    alert(
                                        `¡Felicitaciones! Has desvelado el crimen`
                                    );
                                    alert(
                                        `El/la asesino/a era ${respuesta1.culpable} con el/la ${respuesta1.arma}, en el/la ${respuesta1.lugar}`
                                    );
                                    winCheck = true;
                                    exit = true;
                                    return winCheck;
                                } else {
                                    alert(
                                        `¡No acertaste! Mejor suerte en el próximo turno `
                                    );
                                    continue;
                                }
                            } else if (acusacionActual[2] == true) {
                                exit = acusacionActual[2];
                                break;
                            }
                            continue;
                        } else if (acusacionActual[1] == true) {
                            exit = acusacionActual[1];
                            break;
                        }
                        continue;
                    } else if (acusacionActual[0] == true) {
                        exit = acusacionActual[0];
                        break;
                    }
                } else {
                    alert(`¡Tiraste menos de 5! Su turno ha finalizado`);
                }
            } else {
                exit = true;
            }
            if (exit === true) {
                break;
            } else {
                continue;
            }
        }
    } while (winCheck == false || exit == false);
}
// función para ejecutar el juego
function runGame() {
    while (
        totalPlayers.length <= 6 &&
        totalPlayers.length > 1 &&
        exit != true
    ) {
        playGame();
    }
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
    arma5: "LLAVE DE TUERCAS",
    arma6: "CANDELABRO",
};

// objeto literal con los lugares
const lugares = {
    lugar1: "COCINA",
    lugar2: "SALA DE MÚSICA",
    lugar3: "INVERNADERO",
    lugar4: "COMEDOR",
    lugar5: "SALA DE BILLAR",
    lugar6: "BIBLIOTECA",
    lugar7: "ESTUDIO",
    lugar8: "VESTÍBULO",
    lugar9: "SALA",
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
        let currentIndex = array.length,
            randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }
        return array;
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
        manosArmadas[player] = manoRepartida[i];
        console.log(
            `Asignando a ${player} las siguientes cartas: ${manosArmadas[player]}`
        );
        i += 1;
    });
};

// creación del objeto con la solución a partir de la clase declarada
const respuesta1 = new DatosDelCrimen(
    personajes["personaje" + Math.ceil(Math.random() * 6)],
    armas["arma" + Math.ceil(Math.random() * 6)],
    lugares["lugar" + Math.ceil(Math.random() * 9)]
);
// control del resultado/solución
console.log(respuesta1);

exit = quiting();
// creación del mazo (array filtrado sin las cartas de la solución)
const mano = respuesta1.armarMazo();
// control de la mano
console.log(mano);
// creación de la mano mezclada - Array reordenado aleatoriamente
const manoMezclada = respuesta1.mezclarCartas(mano);
// control de la mezcla
console.log(manoMezclada);
// creación de los sub-arrays para ser repartidos entre los jugadores - Se estipuló como max y min valores relacionados al total de cartas a repartir y la corrección necesaria para casos en donde hay resto
const minCartasRepartir = 18 / playerNumber - 0.2;
const maxCartasRepartir = 18 / playerNumber + 0.5;
const manoRepartida = respuesta1.repartirCartas(
    manoMezclada,
    minCartasRepartir,
    maxCartasRepartir
);
// controles de los sub-arrays creados - listos para ser repartidos
console.table(manoRepartida);
console.log(manoRepartida);
// creación objeto literal que contendrá la clave de cada jugador y el sub-array asignado
const manosArmadas = {};
// ejecución de la función que produce como resultado la asignación de los sub-arrays y los guarda en clave/valor dentro del objeto
armarTodasLasManos();
// control del objeto contenedor de la repartición
console.log(manosArmadas);
// Todo listo - ejecución del juego
respuesta1.startGame();
