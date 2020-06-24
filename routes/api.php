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

Route::middleware('auth:sanctum')->group(function(){
    Route::post('/create-talk', 'UserController@createTalk');
    Route::get('/talks', 'UserController@getAllTalks');
    Route::get('/talks/{id}', 'UserController@getTalk');
    Route::post('/talk/{id}/attendee', 'UserController@addAttendeeToTalk');
    Route::delete('/talks/delete/{id}', 'UserController@deleteTalk');
    Route::delete('/talks/{talk_id}/attendees/delete/{id}', 'UserController@deleteTalkAttendee');

    Route::get('/attendees', 'UserController@getAllAttendees');
    Route::post('/create-attendee', 'UserController@createAttendee');
    Route::delete('/attendees/delete/{id}', 'UserController@deleteAttendee');

    Route::post('/logout', 'AuthController@logout');
});