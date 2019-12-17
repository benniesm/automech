<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', 'Auth\RegisterController@register');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout');
Route::get('confirm-code', 'Auth\LoginController@confirm_code');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['middleware' => ['auth:api', 'cors']], function() {
    Route::get('profile/{user}', 'ProfileController@show');
	  Route::put('profile/{user}', 'ProfileController@update');

    Route::get('vendors', 'VendorController@index');
  	Route::get('vendors/{vendor}', 'VendorController@show');
  	Route::get('vendors/services/{service}', 'VendorController@show_services');
  	Route::post('vendors', 'VendorController@store');
  	Route::post('vendors/image/{vendor}', 'VendorController@update_image');
  	Route::put('vendors/{vendor}', 'VendorController@update');
  	Route::delete('vendors/{vendor}', 'VendorController@delete');

    Route::get('service-types', 'ServiceTypeController@index');
    Route::get('service-types/{service-type}', 'ServiceTypeController@show');

    Route::get('car-models', 'CarModelController@index');
    Route::get('car-models/{car-model}', 'CarModelController@show');
});
