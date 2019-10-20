<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use App\Http\Requests\UserStoreRequest;

class ProfileController extends Controller
{
    public function show(User $user)
    {
        return $user;
    }

    public function update(UserStoreRequest $request, User $user)
    {
        $user->update($request->all());

        return response()->json($user, 200);
    }
}
