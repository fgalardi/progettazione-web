<?php
$conn = mysqli_connect('localhost', 'root', '', 'galardi_635729');
if($conn->connect_error){
    die("Connessione al database fallita: " . $conn->connect_error);
}
$data = json_decode(file_get_contents('php://input'),true);
$modalita = $data['modalitaScelta'];
session_start();
$scelta = $_SESSION['sudokuScelto'];
$utente = $_SESSION['username'];
$password_criptata = $_SESSION['password'];
$terminata = $_SESSION['terminata'];
$sql = "SELECT * FROM partita WHERE tipoSudoku = ? AND persona_utente = ? AND persona_password = ? AND terminata = ?";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt,"issi",$scelta,$utente,$password_criptata,$terminata);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
if(mysqli_num_rows($result) == 0){
    echo json_encode(['messaggio' => $scelta]);
    mysqli_close($conn);
    die();
}
$sql1 = "UPDATE partita SET tentativi = ?, erroriFatti = 0 WHERE tipoSudoku = ? AND persona_utente = ? AND persona_password = ? AND terminata = ?";
$stmt1 = mysqli_prepare($conn, $sql1);
mysqli_stmt_bind_param($stmt1,"iissi",$modalita,$scelta,$utente,$password_criptata,$terminata);
if(mysqli_stmt_execute($stmt1)){
    echo json_encode(['messaggio' => 'successo']);
}
else{
    echo json_encode(['messaggio' => $conn->error]);
}
$_SESSION['modalitaScelta'] = $modalita;
mysqli_close($conn);
?>