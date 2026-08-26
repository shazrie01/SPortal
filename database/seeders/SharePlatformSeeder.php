<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SharePlatform;

class SharePlatformSeeder extends Seeder
{
    public function run(): void
    {
        $platforms = [
            [
                'key' => 'facebook',
                'label' => 'Facebook',
                'color' => '#1877F2',
                'icon' => 'facebook',
                'url_template' => 'https://www.facebook.com/sharer/sharer.php?u={url}',
                'is_active' => true,
                'order_column' => 1
            ],
            [
                'key' => 'x',
                'label' => 'X',
                'color' => '#000000',
                'icon' => 'x',
                'url_template' => 'https://twitter.com/intent/tweet?url={url}&text={title}',
                'is_active' => true,
                'order_column' => 2
            ],
            [
                'key' => 'whatsapp',
                'label' => 'WhatsApp',
                'color' => '#25D366',
                'icon' => 'whatsapp',
                'url_template' => 'https://api.whatsapp.com/send?text={title}%20{url}',
                'is_active' => true,
                'order_column' => 3
            ],
            [
                'key' => 'telegram',
                'label' => 'Telegram',
                'color' => '#0088cc',
                'icon' => 'telegram',
                'url_template' => 'https://t.me/share/url?url={url}&text={title}',
                'is_active' => true,
                'order_column' => 4
            ],
            [
                'key' => 'email',
                'label' => 'Email',
                'color' => '#E4002B',
                'icon' => 'mail',
                'url_template' => 'mailto:?subject={title}&body={title}%0A%0A{url}',
                'is_active' => true,
                'order_column' => 5
            ],
        ];

        foreach ($platforms as $p) {
            SharePlatform::updateOrCreate(['key' => $p['key']], $p);
        }
    }
}
