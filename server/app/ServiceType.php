<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ServiceType extends Model
{
  protected $fillable =
  [
    'service_type'
  ];

  public function vendor()
  {
      return $this->belongsTo(Vendor::class);
  }

  public $timestamps = false;
}
