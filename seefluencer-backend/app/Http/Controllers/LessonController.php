<?php

// app/Http/Controllers/LessonController.php
namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\Course;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    public function index($courseId, Request $request)
    {
        $user = $request->get('authUser');
        // Ensure the course belongs to the user
        $course = Course::where('user_id', $user->id)->findOrFail($courseId);

        return $course->lessons; // or Lesson::where('course_id', $courseId)->get();
    }

    public function store($courseId, Request $request)
    {
        $user = $request->get('authUser');
        $course = Course::where('user_id', $user->id)->findOrFail($courseId);

        $request->validate([
            'title' => 'required',
            'content' => 'nullable'
        ]);

        $lesson = Lesson::create([
            'course_id' => $course->id,
            'title' => $request->input('title'),
            'content' => $request->input('content'),
        ]);

        return response()->json($lesson, 201);
    }

    public function show($id, Request $request)
    {
        $user = $request->get('authUser');
        $lesson = Lesson::with('course')
            ->whereHas('course', function ($q) use ($user) {
                $q->where('user_id', $user->id);
            })
            ->findOrFail($id);

        return response()->json($lesson);
    }

    public function update($id, Request $request)
    {
        $user = $request->get('authUser');
        $lesson = Lesson::with('course')
            ->whereHas('course', function ($q) use ($user) {
                $q->where('user_id', $user->id);
            })
            ->findOrFail($id);

        $request->validate([
            'title' => 'required',
            'content' => 'nullable'
        ]);

        $lesson->update($request->only(['title', 'content']));

        return response()->json($lesson);
    }

    public function destroy($id, Request $request)
    {
        $user = $request->get('authUser');
        $lesson = Lesson::with('course')
            ->whereHas('course', function ($q) use ($user) {
                $q->where('user_id', $user->id);
            })
            ->findOrFail($id);

        $lesson->delete();

        return response()->json(['message' => 'Lesson deleted']);
    }
}
