<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('alunos', 'App\Http\Controllers\Api\AlunoController');
