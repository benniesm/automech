<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\CarModel;

class CarModelController extends Controller
{
  public function index()
  {
      return CarModel::all();
  }

  public function show(CarModel $car_model)
  {
      return $car_model;
  }

  public function store(Request $request)
  {
      $car_model = CarModel::create($request->all());

      return response()->json($car_model, 201);
  }

  public function update(Request $request, CarModel $car_model)
  {
      $car_model->update($request->all());

      return response()->json($car_model, 200);
  }

  public function delete(CarModel $car_model)
  {
      $car_model->delete();

      return response()->json(null, 204);
  }
}
