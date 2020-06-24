<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TalkAttendee extends Model
{
    public function Talk(){
    	return $this->belongsTo('App\Talk', 'id', 'talk_id');
    }
}
