<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactFormMail;

Route::get('/', function () {
    return view('welcome');
});
