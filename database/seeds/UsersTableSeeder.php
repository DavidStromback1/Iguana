<?php

use Illuminate\Database\Seeder;
use App\User;
class UsersTableSeeder extends Seeder {

    public function run() 
    {
        DB::table('users')->delete();
        User::create(array(
            'name'     => 'Chris Sevilleja',
            'email'    => 'chris@gmail.com',
            'password' => Hash::make('awesome'),
        ));
    }

}
?>