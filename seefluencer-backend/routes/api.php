<?php

// routes/api.php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::post('/users/sync', [UserController::class, 'sync']);

Route::middleware('checkGoogleUser')->group(function () {
    Route::get('/courses', [CourseController::class, 'index']);
    Route::post('/courses', [CourseController::class, 'store']);
    Route::get('/courses/{id}', [CourseController::class, 'show']);
    Route::put('/courses/{id}', [CourseController::class, 'update']);
    Route::delete('/courses/{id}', [CourseController::class, 'destroy']);

    // Lessons
    Route::get('/courses/{courseId}/lessons', [LessonController::class, 'index']);
    Route::post('/courses/{courseId}/lessons', [LessonController::class, 'store']);
    Route::get('/lessons/{id}', [LessonController::class, 'show']);
    Route::put('/lessons/{id}', [LessonController::class, 'update']);
    Route::delete('/lessons/{id}', [LessonController::class, 'destroy']);
});
