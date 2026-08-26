<?php

namespace App\Http\Controllers;

use App\Models\ShareClick;
use App\Models\SharePlatform;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ShareClickController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            "url" => "required|url",
            "platform" => "required|string|max:50"
        ]);

        ShareClick::create([
            "url" => $validated["url"],
            "platform" => $validated["platform"],
            "ip_address" => $request->ip(),
            "user_agent" => $request->userAgent()
        ]);

        return response()->json(["message" => "Click recorded"], 201);
    }

    public function dashboard(Request $request)
    {
        $startDate = $request->input("from", Carbon::now()->subDays(29)->format("Y-m-d"));
        $endDate = $request->input("to", Carbon::now()->format("Y-m-d"));
        $platformFilters = $request->input("platforms", []);
        $urlContains = $request->input("urlContains", "");

        $query = ShareClick::query()
            ->whereDate("created_at", ">=", $startDate)
            ->whereDate("created_at", "<=", $endDate);

        if (!empty($platformFilters) && is_array($platformFilters)) {
            $query->whereIn("platform", $platformFilters);
        }

        if (!empty($urlContains)) {
            $query->where("url", "like", "%" . $urlContains . "%");
        }

        // Always use all active platforms from the database as the source of truth
        $dbPlatforms = SharePlatform::where('is_active', true)->orderBy('order_column')->get()->keyBy('key');
        $allPlatformKeys = $dbPlatforms->keys()->toArray();

        // Also include any platforms that appear in clicks but aren't in the config table
        $clickedPlatforms = ShareClick::select("platform")->distinct()->pluck("platform")->toArray();
        $allPlatformKeys = array_unique(array_merge($allPlatformKeys, $clickedPlatforms));

        $total = (clone $query)->count();

        $timelineData = (clone $query)
            ->select(
                DB::raw("DATE(created_at) as date"),
                "platform",
                DB::raw("count(*) as count")
            )
            ->groupBy("date", "platform")
            ->orderBy("date")
            ->get();

        $timeline = [];
        foreach ($timelineData as $row) {
            $date = clone Carbon::parse($row->date);
            $day = $date->format("Y-m-d");
            if (!isset($timeline[$day])) {
                $timeline[$day] = ["day" => $day];
                foreach ($allPlatformKeys as $p) {
                    $timeline[$day][$p] = 0;
                }
            }
            $timeline[$day][$row->platform] = $row->count;
        }

        $platformCounts = (clone $query)
            ->select("platform", DB::raw("count(*) as count"))
            ->groupBy("platform")
            ->get()
            ->keyBy("platform");

        $byPlatform = [];
        foreach ($allPlatformKeys as $p) {
            $platformConfig = $dbPlatforms->get($p);
            $byPlatform[] = [
                "key" => $p,
                "label" => $platformConfig ? $platformConfig->label : ucfirst($p),
                "color" => $platformConfig ? $platformConfig->color : "#8884d8",
                "count" => isset($platformCounts[$p]) ? $platformCounts[$p]->count : 0
            ];
        }

        $topPages = (clone $query)
            ->select("url", DB::raw("count(*) as count"))
            ->groupBy("url")
            ->orderByDesc("count")
            ->limit(5)
            ->get();

        $recent = (clone $query)
            ->orderByDesc("created_at")
            ->limit(10)
            ->get()
            ->map(function ($item) {
                return [
                    "id" => $item->id,
                    "clicked_at" => $item->created_at->toIso8601String(),
                    "platform_key" => $item->platform,
                    "page_url" => $item->url,
                    "page_title" => $item->url,
                ];
            });

        return Inertia::render("Dashboard", [
            "analyticsData" => [
                "total" => $total,
                "timeline" => array_values($timeline),
                "byPlatform" => $byPlatform,
                "topPages" => $topPages,
                "recent" => $recent
            ],
            "allPlatforms" => $byPlatform,
            "filters" => [
                "from" => $startDate,
                "to" => $endDate,
                "platforms" => is_array($platformFilters) ? $platformFilters : [],
                "urlContains" => $urlContains
            ]
        ]);
    }
}
