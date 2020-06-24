<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Talk extends Model
{
    public function TalkAttendee(){
    	return $this->hasMany('App\TalkAttendee', 'talk_id', 'id');
    }

}
