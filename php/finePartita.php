<?php
$conn = mysqli_connect('localhost', 'root', '', 'galardi_635729');
if($conn->connect_error){
    die("Connessione al database fallita: " . $conn->connect_error);
}
$data = json_decode(file_get_contents('php://input'),true);
$punteggio = $data['punteggio'];
$errori = $data['errori'];
session_start();
$scelta = $_SESSION['sudokuScelto'];
$utente = $_SESSION['username'];
$password_criptata = $_SESSION['password'];
$terminata = $_SESSION['terminata'];
$modalita = $_SESSION['modalitaScelta'];
$sql = "SELECT * FROM partita WHERE tipoSudoku = ? AND persona_utente = ? AND persona_password = ? AND terminata = ? AND tentativi = ?";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt,"issii",$scelta,$utente,$password_criptata,$terminata,$modalita);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
if(mysqli_num_rows($result) == 0){
    echo json_encode(['messaggio' => 'errore']);
    mysqli_close($conn);
    die();
}
$sql1 = "UPDATE partita SET erroriFatti = $errori, punteggio = $punteggio
          WHERE tipoSudoku = ? AND persona_utente = ? AND persona_password = ? AND terminata = ? AND tentativi = ?";
$stmt1 = mysqli_prepare($conn, $sql1);
mysqli_stmt_bind_param($stmt1,"issii",$scelta,$utente,$password_criptata,$terminata,$modalita);
if(mysqli_stmt_execute($stmt1)){
    echo json_encode(['messaggio' => 'successo']);
}
else{
    echo json_encode(['messaggio' => $conn->error]);
}
$_SESSION['errori'] = $errori;
$_SESSION['punteggio'] = $punteggio;
mysqli_close($conn);
?>