<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Vendor;

class VendorController extends Controller
{
    public function index()
    {
      	return Vendor::with('user')->get();
    }

    public function show(Vendor $vendor)
    {
        return $vendor;
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
        return response()->json($vendor, 201);
    }

    public function update(Request $request, Vendor $vendor)
    {
        $vendor->update($request->all());

        $data = Vendor::with('user')->find($vendor['id']);

        return response()->json($data, 200);
    }

    public function update_image(Request $request, Vendor $vendor)
    {
        if (!$request->hasFile('image')) {
        	return response()->json($request, 400);
        }

        $file = $request->file('image');
        if (!$file->isValid()) {
        	return response()->json($request, 400);
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

  			$data = Vendor::with('user')->find($request['id']);

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
