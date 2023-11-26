<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carros extends Model
{
    use HasFactory;

    protected $fillable = [
        'marca',
        'modelo',
        'ano',
        'placa',
        'capacidade_passageiros',
    ];
}
