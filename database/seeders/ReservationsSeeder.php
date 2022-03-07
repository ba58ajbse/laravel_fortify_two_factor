<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReservationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('reservation')->insert([
            'user_id' => 1,
            'date' => '20220401',
            'start_time' => '1200',
            'end_time' => '1400',
        ]);
    }
}
