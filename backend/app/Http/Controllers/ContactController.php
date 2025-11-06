<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

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

        $contact = Contact::create($validated);

        return response()->json([
            'message' => 'Üzenet sikeresen elküldve',
            'contact' => $contact
        ]);
    }
}
