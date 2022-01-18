<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Personnel extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('personnels', function (Blueprint $table){
            $table->id();
            $table->string('name');
            $table->string('lastname');
            $table->string('firstname');
            $table->string('email')->unique();
            $table->string('address');
            $table->string('phone');
            $table->string('state');
            $table->date('vacation');
            $table->string('contract_type');
            $table->date('birthday')->nullable();
            $table->string('gender', 1);
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('personnel');
        
    }
}
