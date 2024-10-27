
document.getElementById("form_errori").addEventListener("submit", function(event) {
    event.preventDefault();
    let modalita = document.getElementById("scegliModalità").value;
    
    if(scelta == 0){
        return;
    }
    if(modalita < 1 || modalita > 3){
        return;
    }
    if(modalita == 1){
        tentativi = 10;
    }
    else if(modalita == 2){
        tentativi = 5;
    }
    else{
        tentativi = 3;
    }
    document.getElementById("logout").disabled = false;
    let req = new XMLHttpRequest();
    req.open("POST", "../php/sceltaModalita.php");
    req.setRequestHeader('Content-Type','application/json');
    let data = {
        modalitaScelta: tentativi
    };
    req.onload = function(){
        if(req.status == 200){
            let risposta = JSON.parse(req.responseText);
            console.log(risposta.messaggio);
        }
    }
    req.send(JSON.stringify(data));
    document.getElementById("scegliModalità").disabled = true;
    document.getElementById("scegliMod").disabled = true;
});