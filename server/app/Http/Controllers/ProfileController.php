<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use App\Http\Requests\UserStoreRequest;
use App\CarModel;
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
      //  return response()->json($vendor, 500);
        $user['vendor'] = null;
        if (!empty($vendor)) {
          $service_type = ServiceType::where('id', $vendor->service_id)->first();
          $car_model = CarModel::where('id', $vendor->cars)->first();
          $user['vendor'] = $vendor;
          $user->vendor['model'] = $car_model;
          $user->vendor['service'] = $service_type;
        }
        return response()->json($user, 200);
    }
}
