<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/authenticate', 'AuthController@authenticate' );
Route::post('/logout', 'AuthController@logout');

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/talks', 'UserController@getAllTalks');
    Route::post('/create-talk', 'UserController@createTalk');
    Route::delete('/talks/{id}', 'UserController@deleteTalk');

    Route::get('/attendees', 'UserController@getAllAttendees');
    Route::post('/create-attendee', 'UserController@createAttendee');
    Route::delete('/attendees/{id}', 'UserController@deleteAttendee');
});