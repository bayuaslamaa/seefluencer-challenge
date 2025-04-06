<?php

// app/Http/Controllers/CourseController.php
namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        // Get user from request
        $user = $request->get('authUser');
        // Return only the courses of this user
        return Course::where('user_id', $user->id)->get();
    }

    public function store(Request $request)
    {
        $user = $request->get('authUser');

        $request->validate([
            'title' => 'required',
            'description' => 'nullable'
        ]);

        $course = Course::create([
            'user_id' => $user->id,
            'title' => $request->input('title'),
            'description' => $request->input('description'),
        ]);

        return response()->json($course, 201);
    }

    public function show($id, Request $request)
    {
        $user = $request->get('authUser');
        $course = Course::where('user_id', $user->id)->findOrFail($id);
        return response()->json($course);
    }

    public function update($id, Request $request)
    {
        $user = $request->get('authUser');
        $course = Course::where('user_id', $user->id)->findOrFail($id);

        $request->validate([
            'title' => 'required',
            'description' => 'nullable'
        ]);

        $course->update($request->only(['title', 'description']));

        return response()->json($course);
    }

    public function destroy($id, Request $request)
    {
        $user = $request->get('authUser');
        $course = Course::where('user_id', $user->id)->findOrFail($id);

        $course->delete();

        return response()->json(['message' => 'Course deleted']);
    }
}
