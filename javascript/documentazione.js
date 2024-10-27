function documentazioneGioco(event){
    event.preventDefault();
    let url = event.target.getAttribute('href');
    window.open(url, '_blank');
}

document.getElementById("documentazione").addEventListener("click",documentazioneGioco);