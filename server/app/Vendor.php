<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
{
    protected $fillable =
		[
  			'user_id',
  			'image',
  			'latitude',
  			'longitude',
        'description',
        'rating',
        'certified'
		];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
