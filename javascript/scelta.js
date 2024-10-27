
document.getElementById("classico").addEventListener("click",function() {
   
   let scelta = 1;
   
   
   document.getElementById("libero").disabled = true;
   
   let req = new XMLHttpRequest();
    req.open("POST", "../php/sceltaSudoku.php");
    req.setRequestHeader('Content-Type','application/json');
    let data = {
        sudokuScelto: scelta
    };
    req.onload = function(){
        if(req.status == 200){
            let risposta = JSON.parse(req.responseText);
            console.log(risposta.messaggio);
            if(risposta.messaggio == "successo"){
                
                let url = "../html/prova1.html";
                url += (url.indexOf('?') !== -1 ? '&' : '?') + 'parametro=1';
                window.location.href = url;
            }
        }
    }
    req.send(JSON.stringify(data));
});
document.getElementById("libero").addEventListener("click",function() {
    document.getElementById("valoreScelto").value = 0;
    
    let scelta = 0;
    
    document.getElementById("classico").disabled = true;
    
    let req = new XMLHttpRequest();
     req.open("POST", "../php/sceltaSudoku.php");
     req.setRequestHeader('Content-Type','application/json');
     let data = {
         sudokuScelto: scelta
     };
     req.onload = function(){
         if(req.status == 200){
             let risposta = JSON.parse(req.responseText);
             console.log(risposta.messaggio);
             if(risposta.messaggio == "successo"){
                 
                 let url = "../html/prova1.html";
                url += (url.indexOf('?') !== -1 ? '&' : '?') + 'parametro=0';
                window.location.href = url;
             }
         }
     }
     req.send(JSON.stringify(data));
 });
