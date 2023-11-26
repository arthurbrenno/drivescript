<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Alunos;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AlunoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $alunos = Alunos::all();
            return response()->json(['alunos' => $alunos], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Validate the request
            $validator = Validator::make($request->all(), [
                'nome' => 'required|string|max:100',
                'cpf' => 'required|string|max:14',
                'data_nascimento' => 'required|date',
                'endereco' => 'required|string|max:255',
                'telefone' => 'required|string|max:15',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }

            // Create a new student
            $aluno = Alunos::create($request->all());

            return response()->json(['aluno' => $aluno], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $aluno = Alunos::find($id);

            if (!$aluno) {
                return response()->json(['error' => 'Aluno not found'], 404);
            }

            return response()->json(['aluno' => $aluno], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $aluno = Alunos::find($id);

            if (!$aluno) {
                return response()->json(['error' => 'Aluno not found'], 404);
            }

            // Validate the request
            $validator = Validator::make($request->all(), [
                'nome' => 'required|string|max:100',
                'cpf' => 'required|string|max:14',
                'data_nascimento' => 'required|date',
                'endereco' => 'required|string|max:255',
                'telefone' => 'required|string|max:15',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }

            $aluno->update($request->all());

            return response()->json(['aluno' => $aluno], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $aluno = Alunos::find($id);

            if (!$aluno) {
                return response()->json(['error' => 'Aluno not found'], 404);
            }

            $aluno->delete();

            return response()->json(['message' => 'Aluno deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
