<?php

namespace App\Http\Controllers\Api;

use App\Models\Personnel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Symfony\Contracts\Service\Attribute\Required;

class PersonnelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Personnel::all();
        
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = Validator::make($request->all(), [
            'name' => 'required|max:60',
            'lastname' => 'required',
            'firstname' => 'required',
            'address' => 'required',
            'phone' => 'required',
            'state' => 'required',
            'vacation' => 'required',
            'contract_type' => 'required',
            'email' => 'required|email|unique:personnels,email',
            'gender' => 'required',
            'birthday' => 'required'
        ]);

        if ($validated->fails()) {
            return response()->json([$validated->errors()], 422);
        }

        $newPersonnel = Personnel ::create($request->all());
        return response()->json($newPersonnel, 201);
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Personnel  $personnel
     * @return \Illuminate\Http\Response
     */
    public function show(Personnel $personnel,$id)
    {
        return Personnel::find($id);
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Personnel  $personnel
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validated = Validator::make($request->all(), [
            'name' => 'required|max:60',
            'lastname' => 'required',
            'firstname' => 'required',
            'address' => 'required',
            'phone' => 'required',
            'state' => 'required',
            'vacation' => 'required',
            'contract_type' => 'required',
            'email' => 'required|email',
            'gender' => 'required',
            'birthday' => 'required'
        ]);
        if ($validated->fails()) {
            return response()->json([$validated->errors()]);
        }
        
        $personnel = Personnel::findOrFail($id);
        $personnel->update($request->all());
        
        return response()->json($personnel, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Personnel  $personnel
     * @return \Illuminate\Http\Response
     */
    public function destroy(Personnel $personnel,$id)
    {
        $personnel->findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
