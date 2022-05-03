<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InventoryController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('{reactRoutes}', function () {
    return view('welcome'); // your start view
})->where('reactRoutes', '^((?!api).)*$'); // except 'api' word

Route::resource('/api/sales', \App\Http\Controllers\SalesController::class);
Route::resource('/api/customers', \App\Http\Controllers\CustomersController::class);
Route::resource('api/inventory', \App\Http\Controllers\InventoryController::class);