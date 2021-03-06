<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;

class InventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Item::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'itemCategory'=>'required',
            'itemID'=>'required',
            'itemName'=>'required',
            'itemDesc'=>'required',
            'itemCount'=>'required',
            'itemCost'=>'required'
        ]);

        try{
            $item = new Item;
            $item->itemID = $request->itemID;
            $item->itemCategory = $request->itemCategory;
            $item->itemName = $request->itemName;
            $item->itemDesc = $request->itemDesc;
            $item->itemCount = $request->itemCount;
            $item->itemCost = $request->itemCost;
            $item->save();

            return response()->json([
                'message'=>'Item Created Successfully!!'
            ]);
        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while creating a item!!'
            ],500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Item::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // delete
        $item = Item::find($id);
        $item->delete();

    }
}
