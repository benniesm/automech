<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Vendor;
use App\ServiceType;

class VendorController extends Controller
{
    public function index()
    {
      	return Vendor::all();
    }

    public function show(Vendor $vendor)
    {
        $service_type = ServiceType::where('id', $vendor->service_id)->first();
        $vendor['service'] = $service_type;
        return $vendor;
    }

    public function show_services(Request $request, Vendor $vendor)
    {
        $service_vendors = Vendor::where('service_id', $request->service_id)
          ->with(['user' => function($q){
            $q->select('id', 'name', 'mobile_phone');
          }])
          ->get();
        return response()->json($service_vendors, 200);
    }

    public function store(Request $request)
    {
        $data = $request->all();

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            if (!$file->isValid()) {
              return response()->json($request, 400);
            }

            $path = public_path().'/uploads/profiles/images/';
            $random_name = rand(101010101010,999999999999);
            $image_file = $random_name.$file->getClientOriginalName();
            if ($file->move($path, $image_file)) {
                $data['image'] = $image_file;
            } else {
                return response()->json($request, 501);
            }
        }

        $vendor = Vendor::create($data);
        $service_type = ServiceType::where('id', $vendor->service_id)->first();
        $vendor['service'] = $service_type;
        return response()->json($vendor, 201);
    }

    public function update(Request $request, Vendor $vendor)
    {
        $vendor->update($request->all());

        $service_type = ServiceType::where('id', $vendor->service_id)->first();
        $vendor['service'] = $service_type;

        return response()->json($vendor, 200);
    }

    public function update_image(Request $request,  Vendor $vendor)
    {
        if (!$request->hasFile('image')) {
        	return response()->json($request, 406);
        }

        $file = $request->file('image');
        if (!$file->isValid()) {
        	return response()->json($request, 407);
        }

        $path = public_path().'/uploads/profiles/images/';
        $random_name = rand(101010101010,999999999999);
        $image_file = $random_name.$file->getClientOriginalName();
        if ($file->move($path, $image_file)) {
			      if (file_exists($path.$request['oldImage'])) {
				    unlink($path.$request['oldImage']);
			  }

  			$data = Vendor::find($request['id']);
  			$data->image = $image_file;
  			$data->save();

  			$data =  Vendor::with('service_type')->find($vendor);
        $service_type = ServiceType::where('id', $data->service_id)->first();
        $data['service'] = $service_type;

		    return response()->json($data, 200);
        } else {
        	return response()->json($request, 501);
        }
    }

    public function delete(Request $request, Vendor $vendor)
    {
        $vendor->delete();
        $path = public_path().'/uploads/profiles/images';

        if (file_exists($path.$request['image'])) {
        	 unlink($path.$request['image']);
        }

        return response()->json(null, 204);
    }
}
