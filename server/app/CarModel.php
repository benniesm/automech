<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CarModel extends Model
{
  protected $fillable =
  [
    'car_model'
  ];

  public function vendor()
  {
      return $this->belongsTo(Vendor::class);
  }

  public $timestamps = false;
}
