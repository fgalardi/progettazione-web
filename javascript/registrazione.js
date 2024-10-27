
    document.getElementById('form_registrazione').addEventListener("submit",function(event) {
            event.preventDefault(); 
            let utente = document.getElementById("user").value;
            let pass = document.getElementById("pass").value;
            let pass1 = document.getElementById("pass_rip").value;
            if(document.getElementById("user").value == "" || pass == "" || pass1 == ""){
                document.getElementById("user").value = "";
                document.getElementById("pass").value = "";
                document.getElementById("pass_rip").value = "";
                return;
            }
            if(pass != pass1){
                document.getElementById("casoErrore").innerHTML = "non hai ripetuto correttamente la password";
                document.getElementById("pass").value = "";
                document.getElementById("pass_rip").value = "";
                return;
            }
            let req = new XMLHttpRequest();
            req.open("POST","../php/registrazione.php");
            req.setRequestHeader('Content-Type','application/json');
            let data = {
                email: utente,
                password: pass1
            };
            req.onload = function(){
                if(req.status == 200){
                    let risposta = JSON.parse(req.responseText);
                    if(risposta.messaggio == "successo"){
                        console.log("successo");
                        window.location.href = "../html/login.html";
                    }
                    else{
                        confirm("errore");
                    }
                }
            }
            req.send(JSON.stringify(data));
    });
