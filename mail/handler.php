<?php
// if ($_POST) {
//     exit(json_encode(array(
//         'status' => 'send',
//         'msg' => 'Сообщение отправлено успешно'
//     )));
// } else {
//     exit(json_encode(array(
//         'status' => 'error',
//         'msg' => 'Сообщение отправлено успешно'
//     )));
// }

$admin_email = 'dok307@gmail.com';
$form_subject = 'Новая заявка на сайте';
$project_name = 'barbiestudio.ru';
$from = 'no-reply@barbiestudio.ru';

parse_str($_POST['data'], $dataForm);

// if (empty($dataForm['name']) or empty($dataForm['phone'])) {  // если пустой пароль при добавлении
//     exit(json_encode(array('status' => 'error', 'msg' => 'Все поля обязательны для заполнения')));
// }

// if (empty($dataForm['policy'])) {  // политика
//     exit(json_encode(array('status' => 'error', 'msg' => 'Необходимо принять условия политики конфиденциальности')));
// }

$c = true;


foreach ($dataForm as $key => $value) {
    if ($value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject") {
        $message .= "
        " . (($c = !$c) ? '<tr>' : '<tr style="background-color: #f8f8f8;">') . "
            <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
            <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
        </tr>
        ";
    }
}


$message = "<table style='width: 100%;'>$message</table>";

function adopt($text)
{
    return '=?UTF-8?B?' . Base64_encode($text) . '?=';
}


$headers = "MIME-Version: 1.0" . PHP_EOL .
    "Content-Type: text/html; charset=utf-8" . PHP_EOL .
    'From: ' . "admin" . ' <' . $from . '>' . PHP_EOL .
    'Reply-To: ' . $admin_email . '' . PHP_EOL;


if (mail($admin_email, adopt($form_subject), $message, $headers)) {
    exit(json_encode(array('status' => 'send', 'msg' => 'Cообщение успешно отправлено!')));
} else {
    exit(json_encode(array('status' => 'error', 'msg' => 'Не отправлено')));
}
