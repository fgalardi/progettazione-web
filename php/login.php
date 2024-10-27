<?php
$conn = mysqli_connect('localhost', 'root', '', 'galardi_635729');
if($conn->connect_error){
    die("Connessione al database fallita: " . $conn->connect_error);
}

$inserimento = 0;
$data = json_decode(file_get_contents('php://input'),true);
$email = $data['email'];
$password = $data['password'];

$prova = "SELECT password FROM persona WHERE utente = ?";
$stmt = mysqli_prepare($conn,$prova);
mysqli_stmt_bind_param($stmt, "s",$email);
mysqli_stmt_execute($stmt);
$result = $result = mysqli_stmt_get_result($stmt);
if(mysqli_num_rows($result) > 0){
    $row = $result->fetch_assoc();

    // Assegna il valore alla variabile PHP
    $valore = $row['password'];

    // Libera il risultato della query
    $result->free();

if(password_verify($password, $valore)){
    $sql1 = "INSERT INTO partita(persona_utente,persona_password,terminata,data) values (?,?,?,current_timestamp)";
    $stmt1 = mysqli_prepare($conn,$sql1);
    mysqli_stmt_bind_param($stmt1, "ssi",$email,$valore,$inserimento);
    if(mysqli_stmt_execute($stmt1)){
        echo json_encode(['messaggio' => 'successo']);
    }
    else{
        echo json_encode(['messaggio' => $conn->error]);
    }
}
else{
    echo json_encode(['messaggio' => $password]);
    mysqli_close($conn);
    die();
}
}
else{
    echo json_encode(['messaggio' => 'nome utente errato']);
    mysqli_close($conn);
    die();
}
/*
$controllo = "SELECT * FROM partita WHERE persona_utente = '$email' AND persona_password = '$password_criptata' AND terminata = 0";
if(mysqli_num_rows(mysqli_query($conn, $controllo)) > 0){
    echo json_encode(['messaggio' => "gia registrato"]);
    mysqli_close($conn);
    die();
}
$sql = "SELECT * FROM persona WHERE utente = '$email' AND password = '$password_criptata'";
$risultato = mysqli_query($conn, $sql);
if(mysqli_num_rows($risultato) > 0){
    $controllo = 1;
}
else{
    $controllo = 0;
}

$sql1 = "INSERT INTO partita values (null,null,null,'$email','$password_criptata', 0 , current_timestamp , null)";

if($conn->query($sql1) == true){
    $controllo = 1;
}
else{
    $controllo = 0;
}
if($controllo){
    echo json_encode(['messaggio' => 'successo']);
}
else{
    echo json_encode(['messaggio' => $password_criptata]);
}*/
//costruisco la sessione
session_start();
$_SESSION['username'] = $email;
$_SESSION['password'] = $valore;
$_SESSION['terminata'] = 0;
mysqli_close($conn);
?>