<?php

namespace App\Http\Controllers;

use App\Domain\UseCase\Reservation\ReservationUseCase;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Throwable;

class ReservationController extends Controller
{
    /**
     * 予約作成
     */
    public function store(Request $request): JsonResponse
    {
        $use_case = new ReservationUseCase;
        $user_id = 1;
        // $user_id = Auth::id();

        $date = $request->date;
        $start_time = $request->start_time;
        $end_time = $request->end_time;

        $use_case->createReservation($user_id, $date, $start_time, $end_time);

        return response()->json([], 201);
    }

    /**
     * 予約全件取得
     */
    public function show(): JsonResponse
    {
        try {
            $use_case = new ReservationUseCase;

            $reservations = $use_case->findAllReservations();

            return response()->json(['data' => $reservations], 200);
        } catch (Throwable $e) {
            return response()->json($e, 400);
        }
    }

    /**
     * 予約削除
     */
    public function destroy(Request $request): JsonResponse
    {
        $user_id = 1;
        // $user_id = Auth::id();
        $reservation_id = $request->id;
        $use_case = new ReservationUseCase;

        $deleted = $use_case->deleteReservation($user_id, $reservation_id);

        return response()->json(['data' => $deleted], 200);
    }

    /**
     * 予約変更
     *
     *
     */
    public function update(Request $request): JsonResponse
    {
        $user_id = 1;
        // $user_id = Auth::id();
        $reservation_id = $request->id;
        $date = $request->date;
        $start_time = $request->start_time;
        $end_time = $request->end_time;

        $use_case = new ReservationUseCase;

        $updated = $use_case->updateReservation($user_id, $reservation_id, $date, $start_time, $end_time);

        return response()->json(['data' => $updated], 200);
    }
}
