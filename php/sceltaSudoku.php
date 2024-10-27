<?php
$conn = mysqli_connect('localhost', 'root', '', 'galardi_635729');
if($conn->connect_error){
    die("Connessione al database fallita: " . $conn->connect_error);
}
session_start();
$data = json_decode(file_get_contents('php://input'),true);
$scelta = $data['sudokuScelto'];
$utente = $_SESSION['username'];
$password_criptata = $_SESSION['password'];
$terminata = $_SESSION['terminata'];
$sql = "SELECT * FROM partita WHERE persona_utente = ? AND persona_password = ? AND terminata = ?";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt,"ssi",$utente,$password_criptata,$terminata);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
if(mysqli_num_rows($result) == 0){
    echo json_encode(['messaggio' => $utente]);
    mysqli_close($conn);
    die();
}
$sql1 = "UPDATE partita SET tipoSudoku = ? WHERE persona_utente = ? AND persona_password = ? AND terminata = ?";
$stmt1 = mysqli_prepare($conn, $sql1);
mysqli_stmt_bind_param($stmt1,"issi",$scelta,$utente,$password_criptata,$terminata);
if(mysqli_stmt_execute($stmt1)){
    echo json_encode(['messaggio' => 'successo']);
}
else{
    echo json_encode(['messaggio' => $conn->error]);
}
//session_start();
$_SESSION['sudokuScelto'] = $scelta;
mysqli_close($conn);
?>