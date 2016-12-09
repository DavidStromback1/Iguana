@extends('gameLogin')

@section('overLayContent')
<div class="layOver" tabindex="-1" role="dialog">
    <div class="overLay">
    </div>
    <div class="content">
    @yield('content')    
    </div>
    
</div>

@endsection

    






