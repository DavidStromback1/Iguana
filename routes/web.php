<?php

use App\Highscore;
use Illuminate\Support\Facades\Input;
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

Route::get('/game', function () {
    $highscore = Highscore::all()->sortByDesc("highscore");;
    return view('game', compact('highscore'));
});

Route::get('/home', 'HomeController@index');

Route::post('/getHighscore',function(){

    if(Auth::check()){
        $user = Auth::user();
        $score = Input::get('Highscore');
        $res = $user->highscore()->get();
        if($res->count())
        {
            if($res[0]->highscore < $score){
                $oldHS = Highscore::find($res[0]->id);
                $oldHS->delete();
                
                $hs = new Highscore();
                $hs->highscore = $score;
                $user->highscore()->save($hs);
            }
        }
        else{
            $hs = new Highscore();
            $hs->highscore = $score;
            $user->highscore()->save($hs);
        }
    }
});