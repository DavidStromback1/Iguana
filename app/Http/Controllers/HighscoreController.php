<?php

namespace App\Http\Controllers;

use App\Highscore;
use Illuminate\Http\Request;

class HighscoreController extends Controller
{
    public function index(){
        
        $hs = 100000;
        $user->highscore()->save($hs);
        
        $userHighscore = 100;
        $highscore = Highscore::all();
        return view('highscore', compact('highscore', 'userHighscore'));
    }
}
