function inserisciSoluzione(){
    
    let controllo2 = document.getElementById("scegliModalità");
    if(controllo2.value <1 || controllo2.value > 3){
        return;
    }
    for(let a = 0; a<9; a++){
        for(let b = 0; b<9;b++){
            let target = document.getElementById(a + "_" + b);
            target.value = soluzione[9*a+b];
        }
    }
    document.getElementById("soluzione").disabled = true;
    document.getElementById("vittoria").innerHTML = "HAI PERSO";
    let punteggio = (totali - da_inserire)/totali*100;
    let req = new XMLHttpRequest();
    req.open("POST", "../php/finePartita.php");
    req.setRequestHeader('Content-Type','application/json');
    let data = {
        punteggio: punteggio,
        errori: errori
    };
    console.log("ciao");
    req.onload = function(){
        if(req.status == 200){
            let risposta = JSON.parse(req.responseText);
            console.log(risposta.messaggio);
        }
    }
    req.send(JSON.stringify(data));
}

document.getElementById("soluzione").addEventListener("click",inserisciSoluzione);