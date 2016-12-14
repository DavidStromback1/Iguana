@extends('layout')

@section('content')
<div class = "flex-center position-ref full-height">

    <!-- Add login and register button if current user is not logged in -->
    <div class = "top-right links">
        @if (Auth::guest())
        <a class="loginBtn">Login</a>
        <a class="registerBtn">Register</a>
        @else:
         <?php $user = Auth::user(); ?>
        <div class='welcomeTag'> Welcome <span><?php echo $user->name ?></span></div>
        <a class='logOutBtn' href='/logout'>Log Out</a>
        @endif
    </div>

    <!-- Add modals & overlays for login and register -->
    <div class="mainOverLayLog" tabindex="-1" role="dialog">
        <div class="overLay"></div>
        <div class="content">
            @include('auth/login')
        </div>
    </div>

    <div class="mainOverLayReg" tabindex="-1" role="dialog">
        <div class="overLay"></div>
        <div class="content">
            @include('auth/register')
        </div>
    </div>
      
    <!-- Main content of the page -->
    <div class = "content">
        <div class = "title m-b-md">
            Iguana vs. Snake
            <a href="snake.php" class="playBTN" id='playBTN'>Play<span>!</span></a>

            <!-- Change design a little to look more like game -->
        </div>
    </div>
</div>

@endsection