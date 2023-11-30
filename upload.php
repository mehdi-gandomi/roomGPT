<?php
$target_url = 'http://34.151.121.64/upload';


$post = array(
    'file' => new CURLFile($_FILES['file']['tmp_name'],$_FILES['file']['type'],$_FILES['file']['name'])
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $target_url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$result = curl_exec($ch);

if ($result === false) {
    echo 'Curl error: ' . curl_error($ch);
} else {
    var_dump($result);
}

curl_close($ch);
?>