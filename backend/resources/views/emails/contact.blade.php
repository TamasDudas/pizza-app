<!DOCTYPE html>
<html>

<head>
    <title>Új kapcsolatfelvételi üzenet</title>
</head>

<body>
    <h1>Új kapcsolatfelvételi üzenet érkezett</h1>
    <p><strong>Név:</strong> {{ $contactData['name'] }}</p>
    <p><strong>E-mail:</strong> {{ $contactData['email'] }}</p>
    <p><strong>Tárgy:</strong> {{ $contactData['subject'] }}</p>
    <p><strong>Üzenet:</strong></p>
    <p>{{ $contactData['message'] }}</p>
</body>

</html>
