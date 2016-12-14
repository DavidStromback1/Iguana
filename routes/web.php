<?php
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/
Route::group(['middleware' => 'web'], function(){
    Auth::routes();
});
Route::get('/logout', function(){
    Auth::logout();
    return redirect('/');
});
    
    
Route::get('/', function () {
    return view('gameLogin');
});
<<<<<<< HEAD
Route::get('/highscore', 'HighscoreController@index');
Route::get('/home', 'HomeController@index');
=======

Route::get('/highscore', 'HighscoreController@index');
Route::get('/home', 'HomeController@index');

>>>>>>> 9790a2105962ffc469b93e06e355725250a621b2
