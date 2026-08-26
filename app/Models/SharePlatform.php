<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SharePlatform extends Model
{
    protected $fillable = [
        'key', 'label', 'color', 'icon', 'url_template', 'is_active', 'order_column'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
