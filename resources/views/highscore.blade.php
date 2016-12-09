<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Baby Iguana vs Snake</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

        <!-- Styles -->
        <style>
            html, body {
                background-color: #fff;
                color: #636b6f;
                font-family: 'Raleway', sans-serif;
                font-weight: 100;
                height: 100vh;
                margin: 0;
            }

            .full-height {
                height: 100vh;
            }

            .flex-center {
                align-items: center;
                display: flex;
                justify-content: center;
            }

            .position-ref {
                position: relative;
            }

            .top-right {
                position: absolute;
                right: 10px;
                top: 18px;
            }

            .content {
                text-align: center;
            }

            .title {
                font-size: 84px;
            }
            
            .score {
                font-size: 25px;
                color: #636b6f;
            }
            
            .yourScore {
                font-size: 40px;
                color: #FF0000;
                font-weight: 1000;
            }

            .links > a {
                color: #636b6f;
                padding: 0 25px;
                font-size: 12px;
                font-weight: 600;
                letter-spacing: .1rem;
                text-decoration: none;
                text-transform: uppercase;
            }

            .m-b-md {
                margin-top: -300px;
            }
        </style>
    </head>
    <body>
        <div class="flex-center position-ref full-height">
            
                <div class="top-right links">
                    <a href="{{ url('/login') }}">Login</a>
                    <a href="{{ url('/register') }}">Register</a>
                </div>
            

            <div class="content">
                <div class="title m-b-md">
                    Highscores
                </div>
                
                <div class = "yourScore">
                @if(empty($userHighscore))
                    Login to see your highscore!
                @else
                
                    Your highscore is {{$userHighscore}}!
                
                @endif
                </div>
                <br>
                <br>
                <div class = "score">
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
                </div>
                
            </div>
            
        </div>
    </body>
</html>