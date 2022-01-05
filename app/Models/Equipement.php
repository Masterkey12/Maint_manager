<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Equipement extends Model
{   
    protected $fillable = [
        "designation",
        "marque",
        "modele",
        "fabricant",
        "capacite",
        "customer_id",
        "affectation",
        "situation_actuelle",
        "derniere_intervention",
        "type_intervention",
        "prochaine_interv_prev",
    ];
    
}
