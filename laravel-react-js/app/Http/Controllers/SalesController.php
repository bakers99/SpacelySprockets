<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sale;

class SalesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Sale::all();
    }


    public function create(Request $req)
    {
        return $req->input();
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
            'customer_customerID'=>'required',
            'item_itemID'=>'required',
            'saleDate'=>'required',
            'saleTime'=>'required',
            'saleAmount'=>'required',
            'salePrice'=>'required'
        ]);

        try{
            $sales = new Sale;
            $sales->customer_customerID = $request->customer_customerID;
            $sales->item_itemID = $request->item_itemID;
            $sales->saleDate = $request->saleDate;
            $sales->saleTime = $request->saleTime;
            $sales->saleAmount = $request->saleAmount;
            $sales->salePrice = $request->salePrice;
            $sales->save();

            return response()->json([
                'message'=>'Sale transaction completed Successfully!!'
            ]);
        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something went wrong while creating a sale!!'
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
        //
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
        //
    }
}
