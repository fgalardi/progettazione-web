function effettuaLogout(){
    document.getElementById("logout").disabled = true;
    console.log("ciao");
    let req = new XMLHttpRequest();
    req.open("POST", "../php/logout.php");
    req.setRequestHeader('Content-Type','application/json');
    let data = {
        errori: errori,
        punteggio: (totali - da_inserire)/totali*100
    };
    req.onload = function(){
        if(req.status == 200){
            let risposta = JSON.parse(req.responseText);
            if(risposta.messaggio == 'successo'){
                window.location.href = "../html/login.html";
            }
            else{
                confirm("errore");
            }
        }
    }
    req.send(JSON.stringify(data));
}

document.getElementById("logout").addEventListener("click", effettuaLogout);