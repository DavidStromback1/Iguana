<?php ?>

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
            Use arrow keys to steer Iguana to safety and try to avoid getting eaten!
            Check out the portal to the shadow world by running through the red one or 
            teleport through the blue and orange one!
        </div>
        <div class="highscores">
            <div class="overlay"></div>
            <div class="content">
                <h2>Your score is <span id="cScore"></span></h2>
                <table border="1" align="center">
                    <tr>
                        <th>User</th>
                        <th>Highscore</th>
                    </tr>

                    @foreach ($highscore as $hs)
                    <tr>
                        <td>{{$hs->user->name}}</td>
                        <td>{{$hs->highscore}}</td>
                    </tr>
                    @endforeach

                </table>
                <a id="replayBtn" class="playBTN" href="snake.php">Play again</a>
                <a id="backHome"  href="/">&lt; Go back home</a>
            </div>
        </div>

        <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/snake.js"></script>
        <script type="text/javascript" src="js/loginJS.js"></script>
    </body>
</html>

