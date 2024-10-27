<?php
$conn = mysqli_connect('localhost', 'root', '', 'galardi_635729');
if($conn->connect_error){
    die("Connessione al database fallita: " . $conn->connect_error);
}
$data = json_decode(file_get_contents('php://input'),true);
$email = $data['email'];
$password = $data['password'];
$password_criptata = password_hash($password, PASSWORD_DEFAULT);
$prova = "SELECT * FROM persona WHERE utente = ? ";
$stmt = mysqli_prepare($conn,$prova);
mysqli_stmt_bind_param($stmt, "s",$email);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
if(mysqli_num_rows($result) > 0){
    echo json_encode(['messaggio' => "gia registrato"]);
    mysqli_close($conn);
    die();
}
$sql = "INSERT INTO persona values (?,?)";
$stmt1 = mysqli_prepare($conn,$sql);
mysqli_stmt_bind_param($stmt1, "ss",$email,$password_criptata);

if(mysqli_stmt_execute($stmt1)){
    echo json_encode(['messaggio' => 'successo']);
}
else{
    echo json_encode(['messaggio' => $conn->error]);
}
mysqli_close($conn);
?>