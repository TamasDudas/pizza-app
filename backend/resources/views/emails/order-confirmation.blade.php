<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Rendelés visszaigazolás</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background-color: #28a745;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px;
        }

        .content {
            padding: 20px;
            background-color: #f8f9fa;
            margin: 20px 0;
            border-radius: 5px;
        }

        .order-details {
            background-color: white;
            padding: 15px;
            border-radius: 5px;
            margin: 10px 0;
        }

        .pizza-item {
            border-bottom: 1px solid #eee;
            padding: 10px 0;
        }

        .pizza-item:last-child {
            border-bottom: none;
        }

        .total {
            font-size: 18px;
            font-weight: bold;
            color: #28a745;
            text-align: right;
            margin-top: 15px;
        }

        .footer {
            text-align: center;
            color: #666;
            font-size: 12px;
            margin-top: 30px;
        }
    </style>
</head>

<body>
    <div class="header">
        <h1>Rendelés visszaigazolás</h1>
        <p>Köszönjük a rendelését!</p>
    </div>

    <div class="content">

        {{-- //A $ORDERT MEGKAPJUK AZ OrderConfirmationMail.php-től --}}
        <h2>Kedves {{ $order->customer_name }}!</h2>

        <p>Köszönjük, hogy pizzériánkat választotta! Rendelése sikeresen beérkezett és feldolgozás alatt áll.</p>

        <div class="order-details">
            <h3>Rendelés részletei</h3>
            <p><strong>Rendelésszám:</strong> #{{ $order->id }}</p>
            <p><strong>Név:</strong> {{ $order->customer_name }}</p>
            <p><strong>E-mail:</strong> {{ $order->customer_email }}</p>
            <p><strong>Telefon:</strong> {{ $order->customer_phone }}</p>
            <p><strong>Szállítási cím:</strong> {{ $order->delivery_address }}</p>
            <p><strong>Rendelés időpontja:</strong> {{ $order->created_at->format('Y-m-d H:i') }}</p>

            <h4>Rendelt termékek:</h4>
            @foreach ($order->items as $item)
                <div class="pizza-item">
                    <strong>{{ $item['pizza_name'] }}</strong>
                    ({{ $item['size'] === 'small' ? 'Kis' : ($item['size'] === 'medium' ? 'Közepes' : 'Nagy') }})
                    <br>
                    Mennyiség: {{ $item['quantity'] }} db × {{ number_format($item['price']) }} Ft =
                    <strong>{{ number_format($item['price'] * $item['quantity']) }} Ft</strong>
                </div>
            @endforeach

            <div class="total">
                Végösszeg: {{ number_format($order->total_price) }} Ft
            </div>
        </div>

        <p>Jó étvágyat kívánunk!</p>
    </div>

    <div class="footer">
        <p>Ez egy automatikus üzenet, kérjük ne válaszoljon rá.</p>
        <p>© {{ date('Y') }} Pizzéria - Minden jog fenntartva</p>
    </div>
</body>

</html>
