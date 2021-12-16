<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\EquipementController;
use App\Http\Controllers\Api\AuthenticateController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post("register", [AuthenticateController::class, "register"]);
Route::post('signin', [AuthenticateController::class, "signin"]);

Route::group(['middleware' => ['auth:sanctum']], function() {
    Route::get('/customers', [CustomerController::class, 'index']);
    Route::post('/customers', [CustomerController::class, 'store']);
    Route::get('/customers/{customerId}', [CustomerController::class, 'show']);
    Route::put('/customers/{customerId}', [CustomerController::class, 'update']);
    Route::delete('/customers/{customerId}', [CustomerController::class, 'destroy']);
    Route::get('/equipements', [EquipementController::class, 'index']);
    Route::post('/equipements', [EquipementController::class, 'store']);
    Route::get('/equipements/{equipementId}', [EquipementController::class, 'show']);
    Route::put('/equipements/{equipementId}', [EquipementController::class, 'update']);
    Route::delete('/equipements/{equipementId}', [EquipementController::class, 'destroy']);
    Route::post('/signout', [AuthenticateController::class, 'signout']);
});