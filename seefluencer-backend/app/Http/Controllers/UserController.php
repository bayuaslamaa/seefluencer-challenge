<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Create or update a user record based on Google OAuth data.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function sync(Request $request)
    {
        echo $request;
        $validated = $request->validate([
            'google_id' => 'required|string',
            'name'      => 'required|string|max:255',
            'email'     => 'required|string|email|max:255'
        ]);

        $user = User::updateOrCreate(
            ['google_id' => $validated['google_id']],
            ['name' => $validated['name'], 'email' => $validated['email']]
        );

        return response()->json($user, 200);
    }
}
