<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use App\Http\Requests\UserStoreRequest;
use App\ServiceType;
use App\Vendor;

class ProfileController extends Controller
{
    public function show(User $user)
    {
        $vendor = Vendor::where('user_id', $user->id)->first();
        $service_type = ServiceType::where('id', $vendor->service_id)->first();
        $user['vendor'] = $vendor;
        $user->vendor['service'] = $service_type;
        return $user;
    }

    public function update(UserStoreRequest $request, User $user)
    {
        $user->update($request->all());

        $vendor = Vendor::where('user_id', $user->id)->first();
        $service_type = ServiceType::where('id', $vendor->service_id)->first();
        $user['vendor'] = $vendor;
        $user->vendor['service'] = $service_type;
        return response()->json($user, 200);
    }
}
