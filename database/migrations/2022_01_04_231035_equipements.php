<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Equipements extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('equipements', function (Blueprint $table) {
            $table->id();
            $table->string('designation');
            $table->string('marque');
            $table->string('modele');
            $table->string('fabricant');
            $table->string('capacite');
            $table->string('affectation');
            $table->string('situation_actuelle');
            $table->date('derniere_intervention');
            $table->string('type_intervention');
            $table->date('prochaine_interv_prev');
            
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
        Schema::dropIfExists('equipements');
    }
}
