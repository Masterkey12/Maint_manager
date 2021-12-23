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
        Schema::create('personnel', function (Blueprint $table){
        $table->id();
        $table->string('nom');
        $table->string('post-nom');
        $table->string('prenom');
        $table->string('email')->unique();
        $table->string('address');
        $table->string('phone');
        $table->string('etat');
        $table->date('conge');
        $table->string('type_contrat');
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
