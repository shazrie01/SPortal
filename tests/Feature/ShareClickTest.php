<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\ShareClick;

class ShareClickTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_track_share_click(): void
    {
        $response = $this->postJson("/api/shares", [
            "url" => "https://example.com",
            "platform" => "facebook"
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas("share_clicks", [
            "url" => "https://example.com",
            "platform" => "facebook"
        ]);
    }

    public function test_rejects_invalid_url(): void
    {
        $response = $this->postJson("/api/shares", [
            "url" => "not-a-url",
            "platform" => "facebook"
        ]);

        $response->assertStatus(422);
    }

    public function test_dashboard_is_protected(): void
    {
        $response = $this->get("/dashboard");
        $response->assertRedirect("/login");
    }

    public function test_admin_can_access_dashboard(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get("/dashboard");
        $response->assertStatus(200);
    }
}
