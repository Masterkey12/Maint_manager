<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Personnel extends Model
{
    protected $fillable = [
        "name",
        "firstname",
        "lastname",
        "email",
        "address",
        "gender",
        "state",
        "phone",
        "vacation",
        "birthday",
        "contract_type"
    ];
}
