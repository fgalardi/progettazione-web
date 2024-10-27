/* lo scheletro ricorsivo della funzione solveSudoku è stato preso da chatgpt, le funzioni richiamate
dalla funzione solveSudoku sono state fatte autonomamente*/
function solveSudoku(vettore) {
    if (!isValidSudoku(vettore)) {
        return false; // Se la griglia iniziale non è valida, non può essere risolta
    }

    let emptyCell = findEmptyCell(vettore);

    if (emptyCell == -1) {
        return true; // Se non ci sono più celle vuote, la griglia è già risolta
    }

    let indice = emptyCell;

    for (let num = 1; num <= 9; num++) {
        if (isValidMove(vettore, indice, num)) {
            vettore[indice] = num;

            if (solveSudoku(vettore)) {
                return true; // Se la ricorsione trova una soluzione, restituisci true
            }

            vettore[indice] = ""; // Annulla l'assegnazione e riprova con un altro numero
        }
    }

    return false; // Nessun numero valido per questa cella, torna indietro nella ricorsione
}

function isValidSudoku(vettore) {
    
    for (let indice = 0; indice < 81; indice++) {
        let x = Math.floor(indice / 9);
        let y = indice % 9;
        let valore = vettore[indice];
        if (valore >= 1 && valore <= 9) {
            // Controllo riga
            for (let w = 9 * x; w < 9 * (x + 1); w++) {
                if (w !== indice && vettore[w] === valore) {
                    return false;
                }
            }
            // Controllo colonna
            for (let b = y; b < 81; b += 9) {
                if (b !== indice && vettore[b] === valore) {
                    return false;
                }
            }
            // Controllo riquadro 3x3
            let startX = 3 * Math.floor(x / 3);
            let startY = 3 * Math.floor(y / 3);
            for (let i = startX; i < startX + 3; i++) {
                for (let j = startY; j < startY + 3; j++) {
                    let cellIndex = 9 * i + j;
                    if (cellIndex !== indice && vettore[cellIndex] === valore) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}

function findEmptyCell(vettore) {
    // Trova la prossima cella vuota nella griglia e restituisci il suo indice
    for (let a = 0; a < 81; a++) {
        if (vettore[a] != 1 && vettore[a] != 2 && vettore[a] != 3 && vettore[a] != 4 && vettore[a] != 5 && vettore[a] != 6 && vettore[a] != 7 && vettore[a] != 8 && vettore[a] != 9) {
            return a;
        }
    }
    return -1;
}

function isValidMove(vettore, indice, num) {
    // Verifico se l'assegnazione di 'num' alla cella in 'indice' rispetta le regole del Sudoku
    vettore[indice] = num;
    if (isValidSudoku(vettore)) {
        return true;
    } else {
        vettore[indice] = ""; // Reimposta la cella vuota solo se la mossa è invalida
        return false;
    }
}