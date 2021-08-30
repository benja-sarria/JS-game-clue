/*
    /* if (diceBtn.addEventListener("click", rollDice) !== null) {
        console.log("entra acá");
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
                );
                if (acusacionActual[0] !== null) {
                    acusacionActual[0] = acusacionActual[0].toUpperCase();
                } else {
                    acusacionActual[0] = true;
                    break;
                }
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
                    );
                    if (acusacionActual[1] !== null) {
                        acusacionActual[1] = acusacionActual[1].toUpperCase();
                    } else {
                        acusacionActual[1] = true;
                        break;
                    }
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
                        );
                        if (acusacionActual[2] !== null) {
                            acusacionActual[2] =
                                acusacionActual[2].toUpperCase();
                        } else {
                            acusacionActual[2] = true;
                            break;
                        }
                        if (
                            acusacionActual[2] == personajes.personaje1 ||
                            acusacionActual[2] == personajes.personaje2 ||
                            acusacionActual[2] == personajes.personaje3 ||
                            acusacionActual[2] == personajes.personaje4 ||
                            acusacionActual[2] == personajes.personaje5 ||
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
                            alert(`¡Felicitaciones! Has desvelado el crimen`);
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
                            /* continue; */ /*
    /*   }
                    } else if (acusacionActual[2] == true) {
                        exit = acusacionActual[2];
                        /* break; */ /*
    /*};*/ /*
    /*    continue; */
/*  } else if (acusacionActual[1] == true) {
                    exit = acusacionActual[1];*/
/*   break; */
/*   }
                /*  continue; */
/*    } else if (acusacionActual[0] == true) {
                exit = acusacionActual[0];
                /* break; */
/*   }
        } else {
            alert(`¡Tiraste menos de 5! Su turno ha finalizado`);
        }
    } else {
        exit = true;
    }
    if (exit === true) {
        /*  break; */
/*  } else {
        /* continue; */
/*  } */

// función con la dinámica del juego
function playGame() {
    movimiento = null;
    while (winCheck === false);
    {
        for (let player of totalPlayers) {
            console.log(`turno del jugador ${player}`);
            turn();
            console.log(winCheck);
        }
    }
    /* console.log("entra acá");
    do {
        diceBtn.addEventListener("click", rollDice);
        console.log("entra al do");
        for (const player of totalPlayers) {
            console.log("entra al for");
            showInterface(`Turno Jugador ${player}`);
            setTimeout(() => {
                showInterface(`¡Tira los dados!`);
            }, 2000);
            diceBtn.classList.remove("dialog-interface-hidden");
            diceBtn.classList.add("dialog-interface-container");
            if (diceBtn.addEventListener("click", rollDice) !== null) {
                console.log("entra acá");
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
                        );
                        if (acusacionActual[0] !== null) {
                            acusacionActual[0] =
                                acusacionActual[0].toUpperCase();
                        } else {
                            acusacionActual[0] = true;
                            break;
                        }
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
                            );
                            if (acusacionActual[1] !== null) {
                                acusacionActual[1] =
                                    acusacionActual[1].toUpperCase();
                            } else {
                                acusacionActual[1] = true;
                                break;
                            }
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
                                );
                                if (acusacionActual[2] !== null) {
                                    acusacionActual[2] =
                                        acusacionActual[2].toUpperCase();
                                } else {
                                    acusacionActual[2] = true;
                                    break;
                                }
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
                console.log("no está entrando");
                continue;
            }
        }
    } while (winCheck == false || exit == false); */
}
