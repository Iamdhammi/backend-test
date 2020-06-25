<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

use App\Talk;
use App\Attendee;
use App\TalkAttendee;

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
        $talk->talk_venue = $data['venue'];

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

    public function getTalk($id = null) {
        $userId = Auth::id();
        $talk = Talk::where('user_id', $userId)->with('TalkAttendee')->where('id', $id)->first();
        return response()->json([
            'talk' => $talk,
            'success' => true
        ], 200);
    }

    public function addAttendeeToTalk($id = null, Request $request) {
        $userId = Auth::id();
        $attendeesIds = $request->all();

        foreach($attendeesIds as $attendeesId) {
            $attendee = Attendee::where('id', $attendeesId)->where('user_id', $userId)->first();

            $talkAttendee = new TalkAttendee;
            $talkAttendee->user_id = $userId;
            $talkAttendee->talk_id = $id;
            $talkAttendee->attendee_id = $attendeesId;
            $talkAttendee->full_name = $attendee->full_name;
            $talkAttendee->email = $attendee->email;
            $talkAttendee->save();
        }

        return response()->json([
            "message" => "Attendee(s) added successfully",
            "success" => true
        ], 200);

    }

    public function deleteTalk($id = null) {
        $userId = Auth::id();

        $talk = Talk::where('user_id', $userId)->where('id', $id)->first();
        $talkAttendees = TalkAttendee::where('user_id', $userId)->where('talk_id', $id)->get();
        if(!$talk) {
            return response()->json([
                'message' => 'Talk not found',
                'success' => false
            ], 404);
        }

        $talk->delete();
        if($talkAttendees){
            $talkAttendees->delete();
        }

        return response()->json([
            'message' => 'Talk deleted successfully',
            'success' => true
        ], 200);
    }

    public function createAttendee(Request $request) {
        $userId = Auth::id();
        $data = $request->all();

        $attendee = Attendee::where('user_id', $userId)->where('email', $data['email'])->first();

        if ($attendee) {
            return response()->json([
                'message' => "Email has already been added",
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

    public function deleteTalkAttendee($talk_id = null, $id = null) {
        $userId = Auth::id();

        $attendee = TalkAttendee::where('user_id', $userId)->where('talk_id', $talk_id)->where('id', $id)->first();
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
