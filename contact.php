<?php
header('Content-Type: application/json');

// Dados do formulário
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$message = $_POST['message'] ?? '';

// Validação
if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'Preencha todos os campos']);
    exit;
}

// Configurações do e-mail
$to = "seu-email@provedor.com"; // Substitua pelo seu e-mail
$subject = "Nova mensagem de $name - Site sl!m";
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";

// Corpo do e-mail
$emailBody = "Nome: $name\n";
$emailBody .= "Email: $email\n\n";
$emailBody .= "Mensagem:\n$message";

// Enviar e-mail
if (mail($to, $subject, $emailBody, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Mensagem enviada com sucesso!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Erro ao enviar mensagem. Tente novamente.']);
}
?>