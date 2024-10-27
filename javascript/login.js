
    
        document.getElementById("form_login").addEventListener("submit",function(event) {
            event.preventDefault(); // Evita il comportamento predefinito del modulo di login
            

            if(document.getElementById("user").value == "" || document.getElementById("pass").value == ""){
                document.getElementById("user").value = "";
                document.getElementById("pass").value = "";
                return;
            }
            let username = document.getElementById("user").value;
            let password = document.getElementById("pass").value;
            console.log(password);
            let req = new XMLHttpRequest();
            req.open("POST","../php/login.php");
            req.setRequestHeader('Content-Type','application/json');
            let data = {
                email: username,
                password: password
            };
            req.onload = function(){
                if(req.status == 200){
                    let risposta = JSON.parse(req.responseText);
                    if(risposta.messaggio == "successo"){
                        console.log("successo");
                        window.location.href = "../html/scelta.html";
                    }
                    else{
                        console.log(risposta.messaggio);
                        confirm("errore");
                    }
                }
            }
            req.send(JSON.stringify(data));
        });
