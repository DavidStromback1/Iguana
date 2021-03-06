<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Highscore extends Model
{
    public $table = "highscore";
    protected $fillable = [
        'highscore'
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
}