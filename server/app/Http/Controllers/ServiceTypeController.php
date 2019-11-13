<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ServiceType;

class ServiceTypeController extends Controller
{
  public function index()
  {
      return ServiceType::all();
  }

  public function show(ServiceType $service_type)
  {
      return $service_type;
  }

  public function store(Request $request)
  {
      $service_type = ServiceType::create($request->all());

      return response()->json($service_type, 201);
  }

  public function update(Request $request, ServiceType $service_type)
  {
      $service_type->update($request->all());

      return response()->json($service_type, 200);
  }

  public function delete(ServiceType $service_type)
  {
      $service_type->delete();

      return response()->json(null, 204);
  }
}
