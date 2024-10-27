/* se la casella vale "", allora non è stato inserito niente,
   se la casella vale /, allora è stato fatto un inserimento sbagliato in precedenza
   e tutti i nuovi inserimenti in quella casella non avranno effetto sui contatori
   qualora il numero faccia parte di quelli che inducono in errore,
   se la casella contiene un numero da 1 a 9, allora l'iserimento fatto è lecito*/ 
function creaClassifica(stringa){
  let xhr = new XMLHttpRequest();
  xhr.open('GET', '../php/'+stringa+'.php', true);
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {

          let resultSet = JSON.parse(xhr.responseText);
          
          let resultDiv = document.getElementById(stringa);
          resultSet.forEach(function (item) {
              let listItem = document.createElement('div');
              listItem.textContent = 'UTENTE: ' + item.persona_utente + ', PUNTEGGIO: ' + item.punteggio;
              resultDiv.appendChild(listItem);
          });
      }
  };
  xhr.send();
}
//questa funzione mi dice se posso mettere o no il valore a nella casella (x,y)
function posso_mettere(a,x,y){
          
              // nella riga è presente un altro numero uguale

              for(let w = 9*x; w<(9*x+9);w++){
                if(w != 9*x+y){
                  if(vettore[w] == a){
                    
                  return false;
                  }
                }
                
              }
              
              //nella colonna è presente un altro numero uguale
           
              for(let b = y; b<81 ; b+=9){
                 if(b != 9*x+y){
                   if(vettore[b] == a){
                     
                     return false;
                   }
                 }
                 
              }
              
             
             //nel riquadro corrispondente c'è un altro numero uguale
           
             let c = x%3;
             switch(c){
               case 0:
              let d = y%3;
               if(d==0){
                 
                 for(let r = x;r<=x+2;r++){
                   for(let c = y;c<=y+2;c++){
                     if(9*r+c != (9*x+y)){
                       if(vettore[9*r+c] == a){
                         
                        return false;
                       }
                     }
                     
                   }
                 }
                 
               }
               else if(d==1){
                 
                 for(let r = x;r<=x+2;r++){
                   for(let c=y-1; c<=y+1;c++){
                     if(9*r+c != (9*x+y)){
                       if(vettore[9*r+c] == a){
                         
                         return false;
                       }
                       
                     }
                   }
                 }
                 
               }
               else{
                 
                 for(let r = x;r<=x+2;r++){
                   for(let c = y-2;c<=y;c++){
                     if(9*r+c != (9*x+y)){
                       if(vettore[9*r+c] == a){
                         
                         return false;
                       }
                     }
                     
                   }
                 }
                 
               }
               break;
               case 1:
               let e = y%3;
               if(e==0){
                 for(let r = x-1;r<=x+1;r++){
                   for(let c = y;c<=y+2;c++){
                     if(9*r+c != (9*x+y)){
                       if(vettore[9*r+c] == a){
                         
                         return false;
                       }
                     }
                     
                   }
                 }
                 
               }
               else if(e==1){
                 
                 for(let r = x-1;r<=x+1;r++){
                   for(let c=y-1; c<=y+1;c++){
                     if(9*r+c != (9*x+y)){
                       if(vettore[9*r+c] == a){
                        
                         return false;
                       }
                     }
                     
                   }
                 }
                 
               }
               else{
                 
                 for(let r = x-1;r<=x+1;r++){
                   for(let c = y-2;c<=y;c++){
                     if(9*r+c != (9*x+y)){
                       if(vettore[9*r+c] == a){
                         
                         return false;
                       }
                     }
                     
                   }
                 }
                 
               }
               break;
               case 2:
               let f = y%3;
               if(f==0){
                 for(let r = x-2;r<=x;r++){
                   for(let c = y;c<=y+2;c++){
                     if(9*r+c != (9*x+y)){
                       if(vettore[9*r+c] == a){
                         
                         return false;
                       }
                     }
                     
                   }
                 }
                 
               }
               else if(f==1){
                 for(let r = x-2;r<=x;r++){
                   for(let c=y-1; c<=y+1;c++){
                     if(9*r+c != (9*x+y)){
                       if(vettore[9*r+c] == a){
                         
                         return false;
                       }
                     }
                     
                   }
                 }
                 
               }
               else{
                 for(let r = x-2;r<=x;r++){
                   for(let c = y-2;c<=y;c++){
                     if(9*r+c != (9*x+y)){
                       if(vettore[9*r+c] == a){
                         
                         return false;
                       }
                     }
                     
                   }
                 }
                
               }
               break;
               default:
                  ;
             }
             return true;
}
//questa funzione mi dice se posso ancora vincere, utilizzata solamente nel caso del sudoku libero
function posso_vincere(){
  let quanti = 0;
  for(let aux = 0; aux<81; aux++){
    if(vettore[aux] == "" || vettore[aux] == "/"){
      quanti+=1;
    }
  }
  if(quanti == 0){
    return true;
  }
  
      for(let x=0;x<9;x++){
        for(let y=0;y<9;y++){
          if(vettore[9*x+y]== "" || vettore[9*x+y] == "/"){
            let counter = 0;
            for(let a = 1; a<=9;a++){
                   if(!posso_mettere(a,x,y)){
                     counter+=1;
                   }
            }
            if(counter==9){
              return false;
            }
          }
        }
      }
      return true;
}
function handleInput(event) {
  
  if(!sudoku_libero && (document.getElementById("scegliModalità").value < 1) || (document.getElementById("scegliModalità").value > 3)){
    event.preventDefault();
    return;
  }
  //caso sudoku libero
  if(sudoku_libero){
  // se ho già vinto oppure già perso, niente avrà più effetto sul tabellone di gioco
  
  let oracolo = document.getElementById("vittoria");
  if(oracolo.innerHTML == "VITTORIA" || oracolo.innerHTML == "HAI PERSO"){
    event.preventDefault();
    return;
  }

  // se non inserisco un numero da 1 a 9, l'input non ha effetto
  if((event.keyCode < 49 || event.keyCode > 57) || event.keyCode === 8){
    event.preventDefault();
    return;
  }

  let stringa = event.target.id;
  let x = parseInt(stringa[0]);
  let y = parseInt(stringa[2]);

  // se una cella ha già il suo numero

  if(vettore[9*x+y] != "" && vettore[9*x+y] != "/"){
    if(vettore[9*x+y] == event.keycode-48){
      return;
    }
    
    vettore[9*x+y] = event.keyCode-48;
  
    // nella riga è presente una altro numero uguale
  
     for(let a = 9*x; a<(9*x+9);a++){
       if(a != 9*x+y){
         if(vettore[a] == event.keyCode-48){
           errore[9*x+y].push(event.keyCode - 48);
           errori+=1;
           event.preventDefault();
           let elementoP = document.getElementById("demo2");
           let nuovoNumero = errori;
           elementoP.innerHTML = "errori: " + nuovoNumero;
           console.log(vettore);
           return;
         }
       }
     }
     
     //nella colonna è presente un altro numero uguale
  
     for(let b = y; b<81 ; b+=9){
        if(b != 9*x+y){
          if(vettore[b] == event.keyCode-48){
            errore[9*x+y].push(event.keyCode - 48);
            errori+=1;
            event.preventDefault();
            let elementoP = document.getElementById("demo2");
            let nuovoNumero = errori;
            elementoP.innerHTML = "errori: " + nuovoNumero;
            console.log(vettore);
            return;
          }
        }
     }
     
    
    //nel riquadro corrispondente c'è un altro numero uguale
  
    let c = x%3;
    switch(c){
      case 0:
     let d = y%3;
      if(d==0){
        for(let r = x;r<=x+2;r++){
          for(let c = y;c<=y+2;c++){
            if(9*r+c != (9*x+y)){
              if(vettore[9*r+c] == event.keyCode-48){
                errore[9*x+y].push(event.keyCode - 48);
                errori+=1;
                event.preventDefault();
                let elementoP = document.getElementById("demo2");
                let nuovoNumero = errori;
                elementoP.innerHTML = "errori: " + nuovoNumero;
                console.log(vettore);
                return;
              }
            }
          }
        }
      }
      else if(d==1){
        for(let r = x;r<=x+2;r++){
          for(let c=y-1; c<=y+1;c++){
            if(9*r+c != (9*x+y)){
              if(vettore[9*r+c] == event.keyCode-48){
                errore[9*x+y].push(event.keyCode - 48);
                errori+=1;
                event.preventDefault();
                let elementoP = document.getElementById("demo2");
                let nuovoNumero = errori;
                elementoP.innerHTML = "errori: " + nuovoNumero;
                console.log(vettore);
                return;
              }
            }
          }
        }
      }
      else{
        for(let r = x;r<=x+2;r++){
          for(let c = y-2;c<=y;c++){
            if(9*r+c != (9*x+y)){
              if(vettore[9*r+c] == event.keyCode-48){
                errore[9*x+y].push(event.keyCode - 48);
                errori+=1;
                event.preventDefault();
                let elementoP = document.getElementById("demo2");
                let nuovoNumero = errori;
                elementoP.innerHTML = "errori: " + nuovoNumero;
                console.log(vettore);
                return;
              }
            }
          }
        }
      }
      break;
      case 1:
      let e = y%3;
      if(e==0){
        for(let r = x-1;r<=x+1;r++){
          for(let c = y;c<=y+2;c++){
            if(9*r+c != (9*x+y)){
              if(vettore[9*r+c] == event.keyCode-48){
                errore[9*x+y].push(event.keyCode - 48);
                errori+=1;
                event.preventDefault();
                let elementoP = document.getElementById("demo2");
                let nuovoNumero = errori;
                elementoP.innerHTML = "errori: " + nuovoNumero;
                console.log(vettore);
                return;
              }
            }
          }
        }
      }
      else if(e==1){
        for(let r = x-1;r<=x+1;r++){
          for(let c=y-1; c<=y+1;c++){
            if(9*r+c != (9*x+y)){
              if(vettore[9*r+c] == event.keyCode-48){
                errore[9*x+y].push(event.keyCode - 48);
                errori+=1;
                event.preventDefault();
                let elementoP = document.getElementById("demo2");
                let nuovoNumero = errori;
                elementoP.innerHTML = "errori: " + nuovoNumero;
                console.log(vettore);
                return;
              }
            }
          }
        }
      }
      else{
        for(let r = x-1;r<=x+1;r++){
          for(let c = y-2;c<=y;c++){
            if(9*r+c != (9*x+y)){
              if(vettore[9*r+c] == event.keyCode-48){
                errore[9*x+y].push(event.keyCode - 48);
                errori+=1;
                event.preventDefault();
                let elementoP = document.getElementById("demo2");
                let nuovoNumero = errori;
                elementoP.innerHTML = "errori: " + nuovoNumero;
                console.log(vettore);
                return;
              }
            }
          }
        }
      }
      break;
      case 2:
      let f = y%3;
      if(f==0){
        for(let r = x-2;r<=x;r++){
          for(let c = y;c<=y+2;c++){
            if(9*r+c != (9*x+y)){
              if(vettore[9*r+c] == event.keyCode-48){
                errore[9*x+y].push(event.keyCode - 48);
                errori+=1;
                event.preventDefault();
                let elementoP = document.getElementById("demo2");
                let nuovoNumero = errori;
                elementoP.innerHTML = "errori: " + nuovoNumero;
                console.log(vettore);
                return;
              }
            }
          }
        }
      }
      else if(f==1){
        for(let r = x-2;r<=x;r++){
          for(let c=y-1; c<=y+1;c++){
            if(9*r+c != (9*x+y)){
              if(vettore[9*r+c] == event.keyCode-48){
                errore[9*x+y].push(event.keyCode - 48);
                errori+=1;
                event.preventDefault();
                let elementoP = document.getElementById("demo2");
                let nuovoNumero = errori;
                elementoP.innerHTML = "errori: " + nuovoNumero;
                console.log(vettore);
                return;
              }
            }
          }
        }
      }
      else{
        for(let r = x-2;r<=x;r++){
          for(let c = y-2;c<=y;c++){
            if(9*r+c != (9*x+y)){
              if(vettore[9*r+c] == event.keyCode-48){
                errore[9*x+y].push(event.keyCode - 48);
                errori+=1;
                event.preventDefault();
                let elementoP = document.getElementById("demo2");
                let nuovoNumero = errori;
                elementoP.innerHTML = "errori: " + nuovoNumero;
                console.log(vettore);
                return;
              }
            }
          }
        }
      }
      break;
      default:
         ;
    }
    let debug = posso_vincere();
    // se sono qui la casella inserita è lecita
    document.getElementById(x+"_"+y).value = event.keyCode-48;
    console.log(debug);
    if(posso_vincere()){
    if(da_inserire != 0){
    let target = document.getElementById("rimanenti");
    let mancanti = da_inserire;
    target.innerHTML = "esito: ancora " + mancanti + " caselle da inserire";
    }
    else{
      document.getElementById("rimanenti").innerHTML = "esito: ancora " + da_inserire + " caselle da inserire";
      let target = document.getElementById("vittoria");
      target.innerHTML = "VITTORIA";
      punteggio = (totali - da_inserire)/totali*100;
      let req = new XMLHttpRequest();
    req.open("POST", "../php/finePartita.php");
    req.setRequestHeader('Content-Type','application/json');
    let data = {
        punteggio: punteggio,
        errori: errori
    };
    req.onload = function(){
        if(req.status == 200){
            
        }
    }
    req.send(JSON.stringify(data));
    }
  }
  else{
    
    document.getElementById("rimanenti").innerHTML = "esito: ancora " + da_inserire + " caselle da inserire";
    let target = document.getElementById("vittoria");
    target.innerHTML = "HAI PERSO";
    punteggio = (totali - da_inserire)/totali*100;
    let req = new XMLHttpRequest();
    req.open("POST", "../php/finePartita.php");
    req.setRequestHeader('Content-Type','application/json');
    let data = {
        punteggio: punteggio,
        errori: errori
    };
    req.onload = function(){
        if(req.status == 200){
            
        }
    }
    req.send(JSON.stringify(data));
  }
    console.log(vettore);
    return;
  }
 // se nella cella era stato in precedenza effettuato un errore
  if(vettore[9*x+y] == "/"){
      

    
    vettore[9*x+y] = event.keyCode-48;
  
    // nella riga è presente una altro numero uguale
  
     for(let a = 9*x; a<(9*x+9);a++){
       if(a != 9*x+y){
         if(vettore[a] == event.keyCode-48){
           vettore[9*x+y] = "/";
           errore[9*x+y].push(event.keyCode - 48);
           errori+=1;
           event.preventDefault();
           let elementoP = document.getElementById("demo2");
           let nuovoNumero = errori;
           elementoP.innerHTML = "errori: " + nuovoNumero;
           console.log(vettore);
           return;
         }
       }
     }
     
     //nella colonna è presente un altro numero uguale
  
     for(let b = y; b<81 ; b+=9){
        if(b != 9*x+y){
          if(vettore[b] == event.keyCode-48){
            vettore[9*x+y] = "/";
            errore[9*x+y].push(event.keyCode - 48);
            errori+=1;
            event.preventDefault();
            let elementoP = document.getElementById("demo2");
            let nuovoNumero = errori;
            elementoP.innerHTML = "errori: " + nuovoNumero;
            console.log(vettore);
            return;
          }
        }
     }
     
    
    //nel riquadro corrispondente c'è un altro numero uguale
  
    let c = x%3;
    switch(c){
      case 0:
     let d = y%3;
      if(d==0){
        for(let r = x;r<=x+2;r++){
          for(let c = y;c<=y+2;c++){
            if(9*r+c != (9*x+y)){
              if(vettore[9*r+c] == event.keyCode-48){
                vettore[9*x+y] = "/";
                errore[9*x+y].push(event.keyCode - 48);
                errori+=1;
                event.preventDefault();
                let elementoP = document.getElementById("demo2");
                let nuovoNumero = errori;
                elementoP.innerHTML = "errori: " + nuovoNumero;
                console.log(vettore);
                return;
              }
            }
          }
        }
      }
      else if(d==1){
        for(let r = x;r<=x+2;r++){
          for(let c=y-1; c<=y+1;c++){
            if(9*r+c != (9*x+y)){
              if(vettore[9*r+c] == event.keyCode-48){
                vettore[9*x+y] = "/";
                errore[9*x+y].push(event.keyCode - 48);
                errori+=1;
                event.preventDefault();
                let elementoP = document.getElementById("demo2");
                let nuovoNumero = errori;
                elementoP.innerHTML = "errori: " + nuovoNumero;
                console.log(vettore);
                return;
              }
            }
          }
        }
      }
      else{
        for(let r = x;r<=x+2;r++){
          for(let c = y-2;c<=y;c++){
            if(9*r+c != (9*x+y)){
              if(vettore[9*r+c] == event.keyCode-48){
                vettore[9*x+y] = "/";
                errore[9*x+y].push(event.keyCode - 48);
                errori+=1;
                event.preventDefault();
                let elementoP = document.getElementById("demo2");
                let nuovoNumero = errori;
                elementoP.innerHTML = "errori: " + nuovoNumero;
                console.log(vettore);
                return;
              }
            }
          }
        }
      }
      break;
      case 1:
      let e = y%3;
      if(e==0){
        for(let r = x-1;r<=x+1;r++){
          for(let c = y;c<=y+2;c++){
            if(9*r+c != (9*x+y)){
              if(vettore[9*r+c] == event.keyCode-48){
                vettore[9*x+y] = "/";
                errore[9*x+y].push(event.keyCode - 48);
                errori+=1;
                event.preventDefault();
                let elementoP = document.getElementById("demo2");
                let nuovoNumero = errori;
                elementoP.innerHTML = "errori: " + nuovoNumero;
                console.log(vettore);
                return;
              }
            }
          }
        }
      }
      else if(e==1){
        for(let r = x-1;r<=x+1;r++){
          for(let c=y-1; c<=y+1;c++){
            if(9*r+c != (9*x+y)){
              if(vettore[9*r+c] == event.keyCode-48){
                vettore[9*x+y] = "/";
                errore[9*x+y].push(event.keyCode - 48);
                errori+=1;
                event.preventDefault();
                let elementoP = document.getElementById("demo2");
                let nuovoNumero = errori;
                elementoP.innerHTML = "errori: " + nuovoNumero;
                console.log(vettore);
                return;
              }
            }
          }
        }
      }
      else{
        for(let r = x-1;r<=x+1;r++){
          for(let c = y-2;c<=y;c++){
            if(9*r+c != (9*x+y)){
              if(vettore[9*r+c] == event.keyCode-48){
                vettore[9*x+y] = "/";
                errore[9*x+y].push(event.keyCode - 48);
                errori+=1;
                event.preventDefault();
                let elementoP = document.getElementById("demo2");
                let nuovoNumero = errori;
                elementoP.innerHTML = "errori: " + nuovoNumero;
                console.log(vettore);
                return;
              }
            }
          }
        }
      }
      break;
      case 2:
      let f = y%3;
      if(f==0){
        for(let r = x-2;r<=x;r++){
          for(let c = y;c<=y+2;c++){
            if(9*r+c != (9*x+y)){
              if(vettore[9*r+c] == event.keyCode-48){
                vettore[9*x+y] = "/";
                errore[9*x+y].push(event.keyCode - 48);
                errori+=1;
                event.preventDefault();
                let elementoP = document.getElementById("demo2");
                let nuovoNumero = errori;
                elementoP.innerHTML = "errori: " + nuovoNumero;
                console.log(vettore);
                return;
              }
            }
          }
        }
      }
      else if(f==1){
        for(let r = x-2;r<=x;r++){
          for(let c=y-1; c<=y+1;c++){
            if(9*r+c != (9*x+y)){
              if(vettore[9*r+c] == event.keyCode-48){
                vettore[9*x+y] = "/";
                errore[9*x+y].push(event.keyCode - 48);
                errori+=1;
                event.preventDefault();
                let elementoP = document.getElementById("demo2");
                let nuovoNumero = errori;
                elementoP.innerHTML = "errori: " + nuovoNumero;
                console.log(vettore);
                return;
              }
            }
          }
        }
      }
      else{
        for(let r = x-2;r<=x;r++){
          for(let c = y-2;c<=y;c++){
            if(9*r+c != (9*x+y)){
              if(vettore[9*r+c] == event.keyCode-48){
                vettore[9*x+y] = "/";
                errore[9*x+y].push(event.keyCode - 48);
                errori+=1;
                event.preventDefault();
                let elementoP = document.getElementById("demo2");
                let nuovoNumero = errori;
                elementoP.innerHTML = "errori: " + nuovoNumero;
                console.log(vettore);
                return;
              }
            }
          }
        }
      }
      break;
      default:
         ;
    }
    let debug = posso_vincere();
    // se sono qui la casella inserita è lecita
    console.log(debug);
    if(posso_vincere()){
    da_inserire -=1;
    if(da_inserire != 0){
    let target = document.getElementById("rimanenti");
    let mancanti = da_inserire;
    target.innerHTML = "esito: ancora " + mancanti + " caselle da inserire";
    }
    else{
      document.getElementById("rimanenti").innerHTML = "esito: ancora " + da_inserire + " caselle da inserire";
      let target = document.getElementById("vittoria");
      target.innerHTML = "VITTORIA";
      punteggio = (totali - da_inserire)/totali*100;
      let req = new XMLHttpRequest();
    req.open("POST", "../php/finePartita.php");
    req.setRequestHeader('Content-Type','application/json');
    let data = {
        punteggio: punteggio,
        errori: errori
    };
    req.onload = function(){
        if(req.status == 200){
            
        }
    }
    req.send(JSON.stringify(data));
    }
  }
  else{
    da_inserire-=1;
    document.getElementById("rimanenti").innerHTML = "esito: ancora " + da_inserire + " caselle da inserire";
    let target = document.getElementById("vittoria");
    target.innerHTML = "HAI PERSO";
    punteggio = (totali - da_inserire)/totali*100;
    let req = new XMLHttpRequest();
    req.open("POST", "../php/finePartita.php");
    req.setRequestHeader('Content-Type','application/json');
    let data = {
        punteggio: punteggio,
        errori: errori
    };
    req.onload = function(){
        if(req.status == 200){
            
        }
    }
    req.send(JSON.stringify(data));
  }
  console.log(vettore);
    return;
  }
  // caso inserisco in una cella non toccata in precedenza

  
  vettore[9*x+y] = event.keyCode-48;

  // nella riga è presente una altro numero uguale

   for(let a = 9*x; a<(9*x+9);a++){
     if(a != 9*x+y){
       if(vettore[a] == event.keyCode-48){
         vettore[9*x+y] = "/";
         errore[9*x+y].push(event.keyCode - 48);
         errori+=1;
         event.preventDefault();
         let elementoP = document.getElementById("demo2");
         let nuovoNumero = errori;
         elementoP.innerHTML = "errori: " + nuovoNumero;
         console.log(vettore);
         return;
       }
     }
   }
  
   //nella colonna è presente un altro numero uguale

   for(let b = y; b<81 ; b+=9){
      if(b != 9*x+y){
        if(vettore[b] == event.keyCode-48){
          vettore[9*x+y] = "/";
          errore[9*x+y].push(event.keyCode - 48);
          errori+=1;
          event.preventDefault();
          let elementoP = document.getElementById("demo2");
          let nuovoNumero = errori;
          elementoP.innerHTML = "errori: " + nuovoNumero;
          console.log(vettore);
          return;
        }
      }
   }

  
  //nel riquadro corrispondente c'è un altro numero uguale

  let c = x%3;
  switch(c){
    case 0:
   let d = y%3;
    if(d==0){
      for(let r = x;r<=x+2;r++){
        for(let c = y;c<=y+2;c++){
          if(9*r+c != (9*x+y)){
            if(vettore[9*r+c] == event.keyCode-48){
              vettore[9*x+y] = "/";
              errore[9*x+y].push(event.keyCode - 48);
              errori+=1;
              event.preventDefault();
              let elementoP = document.getElementById("demo2");
              let nuovoNumero = errori;
              elementoP.innerHTML = "errori: " + nuovoNumero;
              console.log(vettore);
              return;
            }
          }
        }
      }
    }
    else if(d==1){
      for(let r = x;r<=x+2;r++){
        for(let c=y-1; c<=y+1;c++){
          if(9*r+c != (9*x+y)){
            if(vettore[9*r+c] == event.keyCode-48){
              vettore[9*x+y] = "/";
              errore[9*x+y].push(event.keyCode - 48);
              errori+=1;
              event.preventDefault();
              let elementoP = document.getElementById("demo2");
              let nuovoNumero = errori;
              elementoP.innerHTML = "errori: " + nuovoNumero;
              console.log(vettore);
              return;
            }
          }
        }
      }
    }
    else{
      for(let r = x;r<=x+2;r++){
        for(let c = y-2;c<=y;c++){
          if(9*r+c != (9*x+y)){
            if(vettore[9*r+c] == event.keyCode-48){
              vettore[9*x+y] = "/";
              errore[9*x+y].push(event.keyCode - 48);
              errori+=1;
              event.preventDefault();
              let elementoP = document.getElementById("demo2");
              let nuovoNumero = errori;
              elementoP.innerHTML = "errori: " + nuovoNumero;
              console.log(vettore);
              return;
            }
          }
        }
      }
    }
    break;
    case 1:
    let e = y%3;
    if(e==0){
      for(let r = x-1;r<=x+1;r++){
        for(let c = y;c<=y+2;c++){
          if(9*r+c != (9*x+y)){
            if(vettore[9*r+c] == event.keyCode-48){
              vettore[9*x+y] = "/";
              errore[9*x+y].push(event.keyCode - 48);
              errori+=1;
              event.preventDefault();
              let elementoP = document.getElementById("demo2");
              let nuovoNumero = errori;
              elementoP.innerHTML = "errori: " + nuovoNumero;
              console.log(vettore);
              return;
            }
          }
        }
      }
    }
    else if(e==1){
      for(let r = x-1;r<=x+1;r++){
        for(let c=y-1; c<=y+1;c++){
          if(9*r+c != (9*x+y)){
            if(vettore[9*r+c] == event.keyCode-48){
              vettore[9*x+y] = "/";
              errore[9*x+y].push(event.keyCode - 48);
              errori+=1;
              event.preventDefault();
              let elementoP = document.getElementById("demo2");
              let nuovoNumero = errori;
              elementoP.innerHTML = "errori: " + nuovoNumero;
              console.log(vettore);
              return;
            }
          }
        }
      }
    }
    else{
      for(let r = x-1;r<=x+1;r++){
        for(let c = y-2;c<=y;c++){
          if(9*r+c != (9*x+y)){
            if(vettore[9*r+c] == event.keyCode-48){
              vettore[9*x+y] = "/";
              errore[9*x+y].push(event.keyCode - 48);
              errori+=1;
              event.preventDefault();
              let elementoP = document.getElementById("demo2");
              let nuovoNumero = errori;
              elementoP.innerHTML = "errori: " + nuovoNumero;
              console.log(vettore);
              return;
            }
          }
        }
      }
    }
    break;
    case 2:
    let f = y%3;
    if(f==0){
      for(let r = x-2;r<=x;r++){
        for(let c = y;c<=y+2;c++){
          if(9*r+c != (9*x+y)){
            if(vettore[9*r+c] == event.keyCode-48){
              vettore[9*x+y] = "/";
              errore[9*x+y].push(event.keyCode - 48);
              errori+=1;
              event.preventDefault();
              let elementoP = document.getElementById("demo2");
              let nuovoNumero = errori;
              elementoP.innerHTML = "errori: " + nuovoNumero;
              console.log(vettore);
              return;
            }
          }
        }
      }
    }
    else if(f==1){
      for(let r = x-2;r<=x;r++){
        for(let c=y-1; c<=y+1;c++){
          if(9*r+c != (9*x+y)){
            if(vettore[9*r+c] == event.keyCode-48){
              vettore[9*x+y] = "/";
              errore[9*x+y].push(event.keyCode - 48);
              errori+=1;
              event.preventDefault();
              let elementoP = document.getElementById("demo2");
              let nuovoNumero = errori;
              elementoP.innerHTML = "errori: " + nuovoNumero;
              console.log(vettore);
              return;
            }
          }
        }
      }
    }
    else{
      for(let r = x-2;r<=x;r++){
        for(let c = y-2;c<=y;c++){
          if(9*r+c != (9*x+y)){
            if(vettore[9*r+c] == event.keyCode-48){
              vettore[9*x+y] = "/";
              errore[9*x+y].push(event.keyCode - 48);
              errori+=1;
              event.preventDefault();
              let elementoP = document.getElementById("demo2");
              let nuovoNumero = errori;
              elementoP.innerHTML = "errori: " + nuovoNumero;
              console.log(vettore);
              return;
            }
          }
        }
      }
    }
    break;
    default:
       ;
  }
  let debug1 = posso_vincere();
  // se sono qui la casella inserita è lecita
  if(debug1){
  da_inserire -=1;
  if(da_inserire != 0){
  let target = document.getElementById("rimanenti");
  let mancanti = da_inserire;
  target.innerHTML = "esito: ancora " + mancanti + " caselle da inserire";
  }
  else{
    document.getElementById("rimanenti").innerHTML = "esito: ancora " + da_inserire + " caselle da inserire";
    let target = document.getElementById("vittoria");
    target.innerHTML = "VITTORIA";
    punteggio = (totali - da_inserire)/totali*100;
    let req = new XMLHttpRequest();
    req.open("POST", "../php/finePartita.php");
    req.setRequestHeader('Content-Type','application/json');
    let data = {
        punteggio: punteggio,
        errori: errori
    };
    req.onload = function(){
        if(req.status == 200){
            
        }
    }
    req.send(JSON.stringify(data));
  }
}

else{
    da_inserire-=1;
    document.getElementById("rimanenti").innerHTML = "esito: ancora " + da_inserire + " caselle da inserire";
    let target = document.getElementById("vittoria");
    target.innerHTML = "HAI PERSO";
    punteggio = (totali - da_inserire)/totali*100;
    let req = new XMLHttpRequest();
    req.open("POST", "../php/finePartita.php");
    req.setRequestHeader('Content-Type','application/json');
    let data = {
        punteggio: punteggio,
        errori: errori
    };
    req.onload = function(){
        if(req.status == 200){
            
        }
    }
    req.send(JSON.stringify(data));
}
console.log(vettore);
return;
  }
  //caso sudoku classico
  else{
    // se ho gia esaurito il numero di errori tollerabili dalla modalità scelta
    if(errori == tentativi){
      event.preventDefault();
      return;
    }
    
    let stringa = event.target.id;
    let i = parseInt(stringa[0]);
    let j = parseInt(stringa[2]);
    console.log(event.key);
    console.log(soluzione[9*i+j]);
    //se inserisco un un valore che non è una cifra da 0 a 9
    if(vettore[9*i+j] >= 1 && vettore[9*i+j]<=9){
      event.preventDefault();
      return;
    }
    // se inserisco il valore corretto
    if(soluzione[9*i+j] == event.key){
      // se tale valore era già stato inserito
      if(vettore[9*i+j] != "" && vettore[9*i+j] != "/"){
        return;
      }
      da_inserire -=1;
      vettore[9*i+j] = event.key;
      document.getElementById(i + "_" + j).classList.add("casella_cliccata_giusta");
      document.getElementById("rimanenti").innerHTML = "esito: ancora " + da_inserire + " caselle da inserire";
      if(da_inserire == 0){
        let target = document.getElementById("vittoria");
        target.innerHTML = "VITTORIA";
        document.getElementById("soluzione").disabled = true;
        punteggio = (totali - da_inserire)/totali*100;
        let req = new XMLHttpRequest();
    req.open("POST", "../php/finePartita.php");
    req.setRequestHeader('Content-Type','application/json');
    let data = {
        punteggio: punteggio,
        errori: errori
    };
    req.onload = function(){
        if(req.status == 200){
            
        }
    }
    req.send(JSON.stringify(data));
      }
      return;
    }
    else{
      // se in precedenza non era stato fatto un errore
      if(vettore[9*i+j] != "/"){
      vettore[9*i+j] = "/";
      errore[9*i+j].push(event.key);
      errori+=1;
      document.getElementById(i + "_" + j).classList.add("casella_cliccata_errata");
      document.getElementById("demo2").innerHTML = "errori: " + errori;
      if(errori == tentativi){
        let target = document.getElementById("vittoria");
        target.innerHTML = "HAI PERSO";
        punteggio = (totali - da_inserire)/totali*100;
        let req = new XMLHttpRequest();
    req.open("POST", "../php/finePartita.php");
    req.setRequestHeader('Content-Type','application/json');
    let data = {
        punteggio: punteggio,
        errori: errori
    };
    req.onload = function(){
        if(req.status == 200){
            
        }
    }
    req.send(JSON.stringify(data));
      }
      event.preventDefault();
      return;
    }else{
      // se tale casella conteneva già questo errore
      for(let b = 0;b<errore[9*i+j].length;b++){
        if(errore[9*i+j][b] == event.key){
          event.preventDefault();
          return;
        }
      }
      errore[9*i+j].push(event.key);
      errori+=1;
      document.getElementById(i + "_" + j).classList.add("casella_cliccata_errata");
      document.getElementById("demo2").innerHTML = "errori: " + errori;
      if(errori == tentativi){
        let target = document.getElementById("vittoria");
        target.innerHTML = "HAI PERSO";
        punteggio = (totali - da_inserire)/totali*100;
        let req = new XMLHttpRequest();
    req.open("POST", "../php/finePartita.php");
    req.setRequestHeader('Content-Type','application/json');
    let data = {
        punteggio: punteggio,
        errori: errori
    };
    req.onload = function(){
        if(req.status == 200){
            
        }
    }
    req.send(JSON.stringify(data));
      }
      event.preventDefault();
      return;
    }
    }
   
  }

}
let sudoku_libero;
let a;//variabile per inizializzazione del vettore soluzione a seconda del sudoku scelto
let tentativi;// tentativi in base alla modalità
let valorePrecSudoku;
let da_inserire;// celle da riempire per finire il gioco
let totali;
let errori = 0; //errorifatti durante il gioco
let vettore = []; // vettore di 81 elementi, serve di supporto per vedere se gli inserimenti sono quelli consentiti
let soluzione = []; // vettore della soluzione di ogni sudoku per gestire il caso inserimento consentito ma errato ai fini della soluzione
let errore = [[]]; // vettore di 81 elementi(altri vettori) che mi dice gli ultimi errori fatti, casella per casella
// Numero di righe e colonne della tabella

// questa funzione serve per creare il sudoku in base la valore inserito, 5 sudoku esistenti + quello libero
function creaSudoku(val){
let rows = 9;
let cols = 9;
let screen;


for(let p = 0; p<81; p++){
  errore[p] = [];
}
if(val == 1){
sudoku_libero = false;
da_inserire = 51;
totali = da_inserire;
screen = document.getElementById("rimanenti");
screen.innerHTML = "esito: ancora " + da_inserire + " caselle da inserire";
vettore[0] = 5;
vettore[1] = 3;
vettore[4] = 7;
vettore[9] = 6;
vettore[12] = 1;
vettore[13] = 9;
vettore[14] = 5;
vettore[19] = 9;
vettore[20] = 8;
vettore[25] = 6;
vettore[27] = 8;
vettore[31] = 6;
vettore[35] = 3;
vettore[36] = 4;
vettore[39] = 8;
vettore[41] = 3;
vettore[44] = 1;
vettore[45] = 7;
vettore[49] = 2;
vettore[53] = 6;
vettore[55] = 6;
vettore[60] = 2;
vettore[61] = 8;
vettore[66] = 4;
vettore[67] = 1;
vettore[68] = 9;
vettore[71] = 5;
vettore[76] = 8;
vettore[79] = 7;
vettore[80] = 9;

soluzione[0] = 5;
soluzione[1] = 3;
soluzione[4] = 7;
soluzione[9] = 6;
soluzione[12] = 1;
soluzione[13] = 9;
soluzione[14] = 5;
soluzione[19] = 9;
soluzione[20] = 8;
soluzione[25] = 6;
soluzione[27] = 8;
soluzione[31] = 6;
soluzione[35] = 3;
soluzione[36] = 4;
soluzione[39] = 8;
soluzione[41] = 3;
soluzione[44] = 1;
soluzione[45] = 7;
soluzione[49] = 2;
soluzione[53] = 6;
soluzione[55] = 6;
soluzione[60] = 2;
soluzione[61] = 8;
soluzione[66] = 4;
soluzione[67] = 1;
soluzione[68] = 9;
soluzione[71] = 5;
soluzione[76] = 8;
soluzione[79] = 7;
soluzione[80] = 9;
  solveSudoku(soluzione);
  console.log(soluzione);
  console.log(vettore);
}
if(val == 2){
  sudoku_libero = false;
  da_inserire = 60;
  totali = da_inserire;
  screen = document.getElementById("rimanenti");
  screen.innerHTML = "esito: ancora " + da_inserire + " caselle da inserire";
  vettore[0] = 8;
  vettore[11] = 3;
  vettore[12] = 6;
  vettore[19] = 7;
  vettore[22] = 9;
  vettore[24] = 2;
  vettore[28] = 5;
  vettore[32] = 7;
  vettore[40] = 4;
  vettore[41] = 5;
  vettore[42] = 7;
  vettore[48] = 1;
  vettore[52] = 3;
  vettore[56] = 1;
  vettore[61] = 6;
  vettore[62] = 8;
  vettore[65] = 8;
  vettore[66] = 5;
  vettore[70] = 1;
  vettore[73] = 9;
  vettore[78] = 4;

  soluzione[0] = 8;
  soluzione[11] = 3;
  soluzione[12] = 6;
  soluzione[19] = 7;
  soluzione[22] = 9;
  soluzione[24] = 2;
  soluzione[28] = 5;
  soluzione[32] = 7;
  soluzione[40] = 4;
  soluzione[41] = 5;
  soluzione[42] = 7;
  soluzione[48] = 1;
  soluzione[52] = 3;
  soluzione[56] = 1;
  soluzione[61] = 6;
  soluzione[62] = 8;
  soluzione[65] = 8;
  soluzione[66] = 5;
  soluzione[70] = 1;
  soluzione[73] = 9;
  soluzione[78] = 4;
  solveSudoku(soluzione);
  console.log(soluzione);
  console.log(vettore);
}
if(val==3){
  sudoku_libero = false;
  da_inserire = 65;
  totali = da_inserire;
  screen = document.getElementById("rimanenti");
  screen.innerHTML = "esito: ancora " + da_inserire + " caselle da inserire";
  vettore[0] = 5;
  vettore[5] = 1;
  vettore[7] = 8;
  vettore[10] = 4;
  vettore[13] = 6;
  vettore[19] = 3;
  vettore[31] = 3;
  vettore[34] = 7;
  vettore[37] = 1;
  vettore[44] = 9;
  vettore[47] = 2;
  vettore[48] = 7;
  vettore[53] = 6;
  vettore[61] = 1;
  vettore[71] = 8;
  vettore[78] = 4;
 
  soluzione[0] = 5;
  soluzione[5] = 1;
  soluzione[7] = 8;
  soluzione[10] = 4;
  soluzione[13] = 6;
  soluzione[19] = 3;
  soluzione[31] = 3;
  soluzione[34] = 7;
  soluzione[37] = 1;
  soluzione[44] = 9;
  soluzione[47] = 2;
  soluzione[48] = 7;
  soluzione[53] = 6;
  soluzione[61] = 1;
  soluzione[71] = 8;
  soluzione[78] = 4;
  solveSudoku(soluzione);
  console.log(soluzione);
  console.log(vettore);
}
if(val == 4){
  sudoku_libero = false;
  da_inserire = 59;
  totali = da_inserire;
  screen = document.getElementById("rimanenti");
  screen.innerHTML = "esito: ancora " + da_inserire + " caselle da inserire";
  vettore[0] = 1;
  vettore[5] = 7;
  vettore[6] = 6;
  vettore[11] = 3;
  vettore[12] = 6;
  vettore[19] = 7;
  vettore[22] = 9;
  vettore[24] = 2;
  vettore[28] = 5;
  vettore[34] = 7;
  vettore[40] = 4;
  vettore[41] = 5;
  vettore[48] = 1;
  vettore[52] = 3;
  vettore[56] = 1;
  vettore[61] = 6;
  vettore[62] = 8;
  vettore[65] = 8;
  vettore[66] = 5;
  vettore[70] = 1;
  vettore[73] = 9;
  vettore[78] = 4;

  soluzione[0] = 1;
  soluzione[5] = 7;
  soluzione[6] = 6;
  soluzione[11] = 3;
  soluzione[12] = 6;
  soluzione[19] = 7;
  soluzione[22] = 9;
  soluzione[24] = 2;
  soluzione[28] = 5;
  soluzione[34] = 7;
  soluzione[40] = 4;
  soluzione[41] = 5;
  soluzione[48] = 1;
  soluzione[52] = 3;
  soluzione[56] = 1;
  soluzione[61] = 6;
  soluzione[62] = 8;
  soluzione[65] = 8;
  soluzione[66] = 5;
  soluzione[70] = 1;
  soluzione[73] = 9;
  soluzione[78] = 4;
  solveSudoku(soluzione);
  console.log(soluzione);
  console.log(vettore);
}
if(val == 5){
  sudoku_libero = false;
  da_inserire = 66;
  totali = da_inserire;
  screen = document.getElementById("rimanenti");
  screen.innerHTML = "esito: ancora " + da_inserire + " caselle da inserire";
  vettore[0] = 5;
  vettore[5] = 8;
  vettore[7] = 6;
  vettore[15] = 1;
  vettore[19] = 7;
  vettore[21] = 6;
  vettore[26] = 3;
  vettore[27] = 4;
  vettore[40] = 5;
  vettore[42] = 6;
  vettore[47] = 9;
  vettore[53] = 8;
  vettore[70] = 5;
  vettore[73] = 3;
  vettore[76] = 4;
  
  soluzione[0] = 5;
  soluzione[5] = 8;
  soluzione[7] = 6;
  soluzione[15] = 1;
  soluzione[19] = 7;
  soluzione[21] = 6;
  soluzione[26] = 3;
  soluzione[27] = 4;
  soluzione[40] = 5;
  soluzione[42] = 6;
  soluzione[47] = 9;
  soluzione[53] = 8;
  soluzione[70] = 5;
  soluzione[73] = 3;
  soluzione[76] = 4;
  solveSudoku(soluzione);
  console.log(soluzione);
  console.log(vettore);
}
if(val==0){
  sudoku_libero = true;
  da_inserire = 81;
  totali = da_inserire;
  screen = document.getElementById("rimanenti");
  screen.innerHTML = "esito: ancora " + da_inserire + " caselle da inserire";
  document.getElementById("soluzione").disabled = true;
}
for(let k = 0; k<81;k++){
 if(vettore[k] != 1 && vettore[k] != 2 && vettore[k] != 3 && vettore[k] != 4 && vettore[k] != 5 && vettore[k] != 6 && vettore[k] != 7 && vettore[k] != 8 && vettore[k] != 9)
  vettore[k] = "";
}
console.log(sudoku_libero);
//let da_inserire = 51; // celle da riempire per finire il gioco
//let errori = 0; //errorifatti durante il gioco
// Ottieni il riferimento della tabella
let table = document.getElementById("tabella");

// Crea le righe e le colonne
for (let i = 0; i < rows; i++) {
  let row = table.insertRow(i);
  for (let j = 0; j < cols; j++) {
    let cell = row.insertCell(j);
    let input = document.createElement("input");
    if((j === 2) || (j === 5)){
       input.classList.add("bordo-grande-dx");
    }
    if((i === 2) || ( i === 5)){
       input.classList.add("bordo-grande-dw");
    }
    input.type = "text";
    input.id =  i + "_" + j;
    input.maxLength = "1";
    if(val == 1){
    if(9*i+j == 12 || 9*i+j == 44 || 9*i+j == 67){
        input.value = 1;
    }
    if(9*i+j == 49 || 9*i+j == 60){
        input.value = 2;
    }
    if(9*i+j == 1 || 9*i+j == 35 || 9*i+j == 41){
        input.value = 3;
    }
    if(9*i+j == 36 || 9*i+j == 66){
        input.value = 4;
    }
    if(9*i+j == 0 || 9*i+j == 14 || 9*i+j == 71){
        input.value = 5;
    }
    if(9*i+j == 9 || 9*i+j == 25 || 9*i+j == 31 || 9*i+j == 53 || 9*i+j == 55){
        input.value = 6;
    }
    if(9*i+j == 4 || 9*i+j == 45 || 9*i+j == 79){
        input.value = 7;
    }
    if(9*i+j == 20 || 9*i+j == 27 || 9*i+j == 39 || 9*i+j == 61 || 9*i+j == 76){
        input.value = 8;
    }
    if(9*i+j == 13 || 9*i+j == 19 || 9*i+j == 68 || 9*i+j == 80){
        input.value = 9;
    }
  }
  if(val == 2){
    if(9*i+j == 48 || 9*i+j == 56 || 9*i+j == 70){
      input.value = 1;
    }
    if(9*i+j == 24){
      input.value = 2;
    }
    if(9*i+j == 11 || 9*i+j == 52){
      input.value = 3;
    }
    if(9*i+j == 40 || 9*i+j == 78){
      input.value = 4;
    }
    if(9*i+j == 28 || 9*i+j == 41 || 9*i+j == 66){
      input.value = 5;
    }
    if(9*i+j == 12 || 9*i+j == 61){
      input.value = 6;
    }
    if(9*i+j == 19 || 9*i+j == 32 || 9*i+j == 42){
      input.value = 7;
    }
    if(9*i+j == 0 || 9*i+j == 62 || 9*i+j == 65){
      input.value = 8;
    }
    if(9*i+j == 22 || 9*i+j == 73){
      input.value = 9;
    }
  }
  if(val == 3){
    if(9*i+j == 5 || 9*i+j == 37 || 9*i+j == 61){
      input.value = 1;
    }
    if(9*i+j == 47){
      input.value = 2;
    }
    if(9*i+j == 19 || 9*i+j == 31){
      input.value = 3;
    }
    if(9*i+j == 10 || 9*i+j == 78){
      input.value = 4;
    }
    if(9*i+j == 0){
      input.value = 5;
    }
    if(9*i+j == 13 || 9*i+j == 53){
      input.value = 6;
    }
    if(9*i+j == 34 || 9*i+j == 48){
      input.value = 7;
    }
    if(9*i+j == 7 || 9*i+j == 71){
      input.value = 8;
    }
    if(9*i+j == 44){
      input.value = 9;
    }
  }
  if(val == 4){
    if(9*i+j == 0 || 9*i+j == 48 || 9*i+j == 56 || 9*i+j == 70){
      input.value = 1;
    }
    if(9*i+j == 24){
      input.value = 2;
    }
    if(9*i+j == 11 || 9*i+j == 52){
      input.value = 3;
    }
    if(9*i+j == 40 || 9*i+j == 78){
      input.value = 4;
    }
    if(9*i+j == 28 || 9*i+j == 41 || 9*i+j == 66){
      input.value = 5;
    }
    if(9*i+j == 6 || 9*i+j == 12 || 9*i+j == 61){
      input.value = 6;
    }
    if(9*i+j == 5 || 9*i+j == 19 || 9*i+j == 34){
      input.value = 7;
    }
    if(9*i+j == 62 || 9*i+j == 65){
      input.value = 8;
    }
    if(9*i+j == 22 || 9*i+j == 73){
      input.value = 9;
    }
  }
  if(val == 5){
    if(9*i+j == 15){
      input.value = 1;
    }
    if(9*i+j == 26 || 9*i+j == 73){
      input.value = 3;
    }
    if(9*i+j == 27 || 9*i+j == 76){
      input.value = 4;
    }
    if(9*i+j ==0 || 9*i+j == 40 || 9*i+j == 70){
      input.value = 5;
    }
    if(9*i+j == 7 || 9*i+j == 21 || 9*i+j == 42){
      input.value = 6;
    }
    if(9*i+j == 19){
      input.value = 7;
    }
    if(9*i+j == 5 || 9*i+j == 53){
      input.value = 8;
    }
    if(9*i+j == 47){
      input.value = 9;
    }
  }
    input.addEventListener("keydown", handleInput);
    cell.appendChild(input);
  }
}
}
//qui mi porto il parametro dalla pagina di navigazione precedente, in base al quale creo un sudoku libero oppure classico
let urlParams = new URLSearchParams(window.location.search);
let scelta = urlParams.get('parametro');
console.log(scelta);
if(scelta == 1){
  if(document.getElementById("scegliMod").value <1 || document.getElementById("scelgliMod").value > 3){
    document.getElementById("logout").disabled = true;
  }
  creaSudoku(Math.floor(Math.random() * 5) + 1);
}
if(scelta == 0){
  //devo inserire manualmente nel db il valore della difficoltà, in questo caso 0, perché non sono
  //previste distinzioni di errori tollerabili nel vaso di sudoku libero
  let req = new XMLHttpRequest();
    req.open("POST", "../php/sceltaModalita.php");
    req.setRequestHeader('Content-Type','application/json');
    let data = {
        modalitaScelta: 0
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
  creaSudoku(0);
}

 // ogni volta che viene caricata la pagina del gioco, vengono create le classifiche precedenti delle 2 modalità
    creaClassifica("classifica1");
    creaClassifica("classifica0");



