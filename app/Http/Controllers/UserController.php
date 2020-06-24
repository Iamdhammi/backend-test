<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

use App\Talk;
use App\Attendee;

class UserController extends Controller
{
    public function createTalk(Request $request) {
        $userId = Auth::id();
        $data = $request->all();

        $talk = new Talk;
        $talk->user_id = $userId;
        $talk->talk_name = $data['name'];
        $talk->talk_date = $data['date'];
        $talk->talk_time = $data['time'];
        $talk->talk_address = $data['venue'];

        $talk->save();

        return response()->json([
            'message' => 'Talk created successfully',
            'sucess' => true
        ], 200);
    }

    public function getAllTalks() {
        $userId = Auth::id();
        // dd($userId);
        $talks = Talk::where('user_id', $userId)->get();
        return response()->json([
            'talks' => $talks,
            'success' => true
        ], 200);
    }

    public function deleteTalk($id = null) {
        $userId = Auth::id();

        $talk = Talk::where('user_id', $userId)->where('id', $id)->first();
        if(!$talk) {
            return response()->json([
                'message' => 'Talk not found',
                'success' => false
            ], 404);
        }

        $talk->delete();
        return response()->json([
            'message' => 'Talk deleted successfully',
            'success' => true
        ], 200);
    }

    public function createAttendee(Request $request) {
        $userId = Auth::id();
        $data = $request->all();

        $validator = Validator::make($request->all(), [
            'fullName' => 'required',
            'email' => 'required|unique:attendees'
        ]);
        
        if ($validator->fails()) {
            $errorMessages = $validator->messages();
            return response()->json([
                'message' => $errorMessages,
                'success' => false
            ], 500);
        } else {
            $talk = new Attendee;
            $talk->user_id = $userId;
            $talk->full_name = $data['fullName'];
            $talk->email = $data['email'];

            $talk->save();

            return response()->json([
                'message' => 'Attendee created successfully',
                'sucess' => true
            ], 200);
        }
    }

    public function getAllAttendees() {
        $userId = Auth::id();

        $attendees = Attendee::where('user_id', $userId)->get();
        return response()->json([
            'attendees' => $attendees,
            'success' => true
        ], 200);
    }

    public function deleteAttendee($id = null) {
        $userId = Auth::id();

        $attendee = Attendee::where('user_id', $userId)->where('id', $id)->first();
        if(!$attendee) {
            return response()->json([
                'message' => 'Attendee not found',
                'success' => false
            ], 404);
        }

        $attendee->delete();
        return response()->json([
            'message' => 'Attendee deleted successfully',
            'success' => true
        ], 200);
    }
}
