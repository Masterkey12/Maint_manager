<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Personnel;
use Illuminate\Http\Request;

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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
            'nom' => 'required|max:60',
            'post-nom' => 'required',
            'prenom' => 'required',
            'address' => 'required',
            'phone' => 'required',
            'etat' => 'required',
            'conge' => 'required',
            'type_contrat' => 'required',
            'email' => 'required|email|unique:personnel,email',
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
     * Show the form for editing the specified resource.
     *
     * @param  \App\Personnel  $personnel
     * @return \Illuminate\Http\Response
     */
    public function edit(Personnel $personnel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Personnel  $personnel
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Personnel $personnel)
    {
        $validated = Validator::make($request->all(), [
            'nom' => 'required|max:60',
            'post-nom' => 'required',
            'prenom' => 'required',
            'address' => 'required',
            'phone' => 'required',
            'etat' => 'required',
            'conge' => 'required',
            'type_contrat' => 'required',
            'email' => 'required|email|unique:personnel,email',
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
        $customer->findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
