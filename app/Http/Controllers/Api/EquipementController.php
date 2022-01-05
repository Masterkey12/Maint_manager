<?php

namespace App\Http\Controllers\Api;

use App\Models\Equipement;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class EquipementController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Equipement::all();
        
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
        {  // validate data from request
            $validated = Validator::make($request->all(), [
                'designation' => 'required|max:60',
                'marque' => 'required',
                'modele' => 'required',
                'fabricant' => 'required',
                'capacite' => 'required',
                'affectation' => 'required',
                'situation_actuelle' => 'required',
                'derniere_intervention' => 'required',
                'type_intervention' => 'required',
                'prochaine_interv_prev' => 'required',
            ]);
    
            if ($validated->fails()) {
                return response()->json([$validated->errors()], 422);
            }
    
            $newEquipement = Equipement::create($request->all());
            return response()->json($newEquipement, 201);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Equipement  $equipement
     * @return \Illuminate\Http\Response
     */
    public function show(Equipement $equipement,  $id)
    {
        return Equipement::find($id);
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Equipement  $equipement
     * @return \Illuminate\Http\Response
     */
    public function edit(Equipement $equipement)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Equipement  $equipement
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Equipement $equipement)
    {
        $validated = Validator::make($request->all(), [
            'designation' => 'required|max:60',
            'marque' => 'required',
            'modele' => 'required',
            'fabricant' => 'required',
            'capacite' => 'required',
            'affectation' => 'required',
            'situation_actuelle' => 'required',
            'derniere_intervention' => 'required',
            'type_intervention' => 'required',
            'prochaine_interv_prev' => 'required',
        ]);
        if ($validated->fails()) {
            return response()->json([$validated->errors()]);
        }
        
        $equipement = Equipement::findOrFail($id);
        $equipement->update($request->all());
        
        return response()->json($equipement, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Equipement  $equipement
     * @return \Illuminate\Http\Response
     */
    public function destroy(Equipement $equipement,$id)
    {
        $equipement->findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
