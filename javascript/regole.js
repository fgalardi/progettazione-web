function regolamentoGioco(event){
    event.preventDefault();
    let url = event.target.getAttribute('href');
    window.open(url, '_blank');
}

document.getElementById("regolamento").addEventListener("click",regolamentoGioco);