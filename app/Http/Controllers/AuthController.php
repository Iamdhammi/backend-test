<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\User;

class AuthController extends Controller
{
    public function Authenticate(Request $request) {
        $request->validate([
            'email' => 'email|required',
            'password' => 'required'
        ]);
        $data = $request->all();

        $user = User::where('email', $data['email'])->first();
        if($user) {
            //Login
            if(auth()->attempt(['email' => $data['email'], 'password' => $data['password']])) {
                $token = $user->createToken('EventTalk')->plainTextToken;
                return response()->json([
                    'access_token' => $token,
                    'message' => 'Logged in successfully'
                ], 200);
            } else {
                return response()->json([
                    'message' => 'Oops! Password is incorrect'
                ], 500);
            }
        } else {
            //Register
            $userDetails = new User;
            $userDetails->email = $data['email'];
            $userDetails->password = bcrypt($data['password']);
            $userDetails->save();

            $user = User::where('email', $data['email'])->first();
            $token = $user->createToken('EventTalk')->plainTextToken;

            return response()->json([
                'access_token' => $token,
                'message' => 'Registered successfully'
            ], 200);
        }
    }
}
