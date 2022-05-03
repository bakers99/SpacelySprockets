<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Eloquent;

class Item extends Eloquent
{



    protected $primaryKey = 'itemID';
    public $incrementing = false;
    protected $keyType = 'string';
    
}
