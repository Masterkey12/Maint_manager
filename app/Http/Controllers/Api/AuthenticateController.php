<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class AuthenticateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request) {

        $validated = Validator::make($request->all(), [
            "name" => "required|string|max:20",
            "address"=> "required",
            "email" => "required|email|unique:users,email",
            "password" => "required|string|min:6"
        ]); 

        if ($validated->fails()) {
            return response()->json(['errors' => $validated->errors()], 422);
        }

        $customer = new User();
        $customer->name = $request->name;
        $customer->email = $request->email;
        $customer->address = $request->address;
        $customer->phone = $request->phone;
        $customer->type_client = $request->type_client;
        $customer->duree_contrat = $request-> duree_contrat;
        $customer->echeance = $request-> echeance;
        $customer->password = bcrypt($request->password);
        $customer->save();

        return response()->json([
            'customer' => $customer,
            'token' => $customer->createToken('tokens')->plainTextToken
        ]);
    }
    
    public function signin(Request $request) {
        $validated = Validator::make($request->all(), [
            "email" => "required|email",
            "password" => "required|string|min:6"
        ]);

        if (!Auth::attempt($request->all())) {
            return response()->json([
                'error' => "Credentials not match"
            ], 401);
        }

        return response()->json([
            'token' => auth()->user()->createToken("API Token")->plainTextToken
        ]);
    }

    public function signout() {
        auth()->user()->tokens()->delete();

        return response()->json([
            'message' => 'Tokens revoked'
        ]);
    }
}
