<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use App\Mail\ContactFormMail;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:1000'
        ]);

        //Mentjük az eadatbázisba
        $contact = Contact::create($validated);

        Mail::to('test@example.com')->send(new ContactFormMail($validated));



        return response()->json([
            'message' => 'Üzenet sikeresen elküldve',
            'contact' => $contact
        ]);
    }
}
