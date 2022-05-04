<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sale;
use App\Models\Item;

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
        ]);

        $item = Item::find($request->item_itemID);
        $total = ($item->itemCost*$request->saleAmount);
        $newamount=($item->itemCount-$request->saleAmount);


        try{
            $sales = new Sale;
            $sales->customer_customerID = $request->customer_customerID;
            $sales->item_itemID = $request->item_itemID;
            $sales->saleDate = $request->saleDate;
            $sales->saleTime = $request->saleTime;
            $sales->saleAmount = $request->saleAmount;
            $sales->salePrice = $total;
            $sales->save();

            $items = Item::find($request->item_itemID);
            $items->itemCount = $newamount;
            $items->save();

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
        return Sale::find($id);
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
        $request->validate([
            'customer_customerID'=>'required',
            'item_itemID'=>'required',
            'saleDate'=>'required',
            'saleTime'=>'required',
            'saleAmount'=>'required',
        ]);

        $item = Item::find($request->item_itemID);
        $total = ($item->itemCost*$request->saleAmount);
        $newamount=($item->itemCount-$request->saleAmount);

        try{
            $sale = Sale::find($id);
            $sale->customer_customerID = $request->customer_customerID;
            $sale->item_itemID = $request->item_itemID;
            $sale->saleDate = $request->saleDate;
            $sale->saleTime = $request->saleTime;
            $sale->saleAmount = $request->saleAmount;
            $sale->salePrice = $total;
            $sale->save();

            $items = Item::find($request->item_itemID);
            $items->itemCount = $newamount;
            $items->save();

            return response()->json([
                'message'=>'Customer Created Successfully!!'
            ]);
        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while updating sales info!!'
            ],500);
        }
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
        $item = Sale::find($id);
        $item->delete();

    }
}
