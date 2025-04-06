<?php

// app/Http/Middleware/CheckGoogleUser.php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;

class CheckGoogleUser
{
    public function handle($request, Closure $next)
    {
        $googleId = $request->header('X-Google-Id'); // or from token

        if (!$googleId) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user = User::where('google_id', $googleId)->first();

        if (!$user) {
            // Optionally, create the user or return unauthorized
            // For example:
            // $user = User::create([
            //   'google_id' => $googleId,
            //   // 'name' => ...
            // ]);
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Store user in request for further usage
        $request->merge(['authUser' => $user]);

        return $next($request);
    }
}

