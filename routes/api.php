<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ShareClickController;

Route::post("/shares", [ShareClickController::class, "store"]);
