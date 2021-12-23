<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }
    /**
     * list all customers
     * 
     * @param \Illuminate\Http\Response $request.
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return User::all();
    }

    /**
    
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // validate data from request
        $validated = Validator::make($request->all(), [
            'name' => 'required|max:60',
            'type_client' => 'required',
            'phone' => 'required',
            'duree_contrat' => 'required',
            'echeance' => 'required',
            'address' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|'
        ]);

        if ($validated->fails()) {
            return response()->json([$validated->errors()], 422);
        }

        $newCustomer = User::create($request->all());
        return response()->json($newCustomer, 201);
    }

    /**
     * Display a specific user.
     *
     * @param  String $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user, $id)
    {
        return User::find($id);
    }


    /**
     * Update the specif customer in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Customer $Customer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // validate data from request
        $validated = Validator::make($request->all(), [
            'name' => 'required|max:60',
            'address' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]);

        if ($validated->fails()) {
            return response()->json([$validated->errors()]);
        }
        
        $customer = Customer::findOrFail($id);
        $customer->update($request->all());
        
        return response()->json($customer, 200);
    }

    /**
     * Remove a specific user from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(Customer $customer,$id)
    {
        $customer->findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
