<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\User;


class AuthController extends Controller
{
    public function authenticate(Request $request) {
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
                    'message' => 'Logged in successfully',
                    'email' => $user->email,
                    'success' => true
                ], 200);
            } else {
                return response()->json([
                    'message' => 'Oops! Password is incorrect',
                    'success' => false
                ], 500);
            }
        } else {
            //Register
            $userDetails = new User;
            $userDetails->email = $data['email'];
            $userDetails->password = bcrypt($data['password']);
            $userDetails->save();

            //Retrieve saved user id
            $userId = $userDetails->id;

            //Then login
            auth()->attempt(['email' => $data['email'], 'password' => $data['password']]);
            $user = User::where('id', $userId)->first();
            $token = $user->createToken('EventTalk')->plainTextToken;

            return response()->json([
                'access_token' => $token,
                'message' => 'Registered successfully',
                'email' => $user->email,
                'success' => true
            ], 200);
        }
    }

    public function logout() {
        $userId = Auth::id();
        $user = User::find($userId);
        $user->tokens()->where('tokenable_id', $userId)->delete();
        return response()->json([
            'success' => true
        ], 200);
    }
}

