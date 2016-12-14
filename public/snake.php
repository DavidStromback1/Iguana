<?php
//namespace App\Http\Controllers;
//use App\Http\Controllers\HighscoreController;
//use Illuminate\Support\Facades\DB;
//$highscore = DB::table('highscore')->select('highscore', 'user_id')->get();
//echo $hs;
//$user = Auth::user();
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Iguana</title>
        <link rel="stylesheet" type="text/css" href="css/style.css">
        <link rel="stylesheet" type="text/css" href="css/snake.css">
    </head>
    <body>
        <canvas id="canvas">
            <div id="wrapper"></div>
        </canvas>
        <div class="Instructions"><span> Press 'r' to start </span> 
        Use arrow keys to steer Iguana to safety and try to avoid getting eaten!</div>
        <div class="highscores">
            <div class="overlay"></div>
            <div class="content">
                <h2>Your score is <span id="cScore"></span></h2>


                <h2>Highscores</h2>
                <table> 
                    <tr>
                        <th>Player</th>
                        <th>Score</th>
                    </tr>
                    <tr>
                        <td> Bernie</td>
                        <td> 10000000 </td>
                    </tr>

                </table>
                <a id="replayBtn" class="playBTN" href="snake.php">Play again</a>
            </div>
        </div>

        <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/snake.js"></script>
        <script type="text/javascript" src="js/loginJS.js"></script>
    </body>
</html>

