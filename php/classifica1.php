<?php
$conn = mysqli_connect('localhost', 'root', '', 'galardi_635729');
if($conn->connect_error){
    die("Connessione al database fallita: " . $conn->connect_error);
}

// Eseguo la query per ottenere il result set
$query = "SELECT persona_utente,punteggio FROM partita where tipoSudoku = 1 AND terminata = 1 group by persona_utente,punteggio order by punteggio desc ";
$result = $conn->query($query);

if (!$result) {
    die("Errore nella query: " . $conn->error);
}

// Array per memorizzare i risultati
$resultSet = array();

// Loop attraverso i risultati della query e li memorizza nell'array $resultSet
while ($row = $result->fetch_assoc()) {
    $resultSet[] = $row;
}

// Chiudi la connessione al database
$conn->close();

// Converto il result set in JSON
$json = json_encode($resultSet);

// Invia il JSON come risposta
header('Content-Type: application/json');
echo $json;
?>