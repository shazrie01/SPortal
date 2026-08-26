<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ShareClickController;
use App\Http\Controllers\SharePlatformController;
use App\Models\SharePlatform;

$articles = [
    1 => [
        'id' => 1,
        'slug' => 'share-tracking-goes-live',
        'category' => 'Nation',
        'title' => 'Share tracking goes live: newsroom now sees every click in real time',
        'subtitle' => 'Five share channels, one tracking pipeline — every button press stores the page URL and the channel used, so editors can chart exactly where readers send the story.',
        'author' => 'Newsdesk',
        'date' => '25 Aug 2026, 11:42 AM MYT',
        'readTime' => '3 min read',
        'image' => 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
        'caption' => 'Readers across the Klang Valley are sharing stories faster than ever. — Filepic',
        'content' => '
            <p><strong>KUALA LUMPUR:</strong> Every tap on a share button now leaves a trace. The newsroom\'s new tracking layer records the channel, the page URL and the headline the moment a reader chooses Facebook, X, WhatsApp, Telegram or email.</p>
            <p>The data lands in a live database and is charted in a secured admin dashboard, where editors can filter by date range and by channel to see which stories travel and where.</p>
            <p>Because the channel list lives in the database, adding a new platform later takes a single row — the button appears on the article page and in the charts automatically, with no code changes required.</p>
            <p>Access to the dashboard is restricted: sign-in is email and password based, and an administrator role is checked on the server before any analytics are returned.</p>
        '
    ],
    2 => [
        'id' => 2,
        'slug' => 'business-markets-rally-on-data',
        'category' => 'Business',
        'title' => 'Markets rally as new real-time analytics data empowers editors',
        'subtitle' => 'Publishers see an unprecedented lift in engagement after integrating new live dashboards into their daily operations.',
        'author' => 'Biz Desk',
        'date' => '25 Aug 2026, 09:15 AM MYT',
        'readTime' => '4 min read',
        'image' => 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
        'caption' => 'The trading floor remains active as new analytics tools are rolled out. — Filepic',
        'content' => '
            <p><strong>KUALA LUMPUR:</strong> Markets reacted positively to the news of real-time analytics adoption across major publishers. Editors can now instantly understand social velocity.</p>
            <p>By leveraging tools like ShareTrace, news organizations can see which content resonates on WhatsApp versus Facebook in real-time.</p>
        '
    ],
    3 => [
        'id' => 3,
        'slug' => 'tech-new-share-button-features',
        'category' => 'Tech',
        'title' => 'How small UI changes lead to massive gains in share volume',
        'subtitle' => 'Moving from standard text links to circular icon buttons has boosted social sharing by over 40% in recent tests.',
        'author' => 'Tech Desk',
        'date' => '24 Aug 2026, 18:30 PM MYT',
        'readTime' => '2 min read',
        'image' => 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
        'caption' => 'Developers are constantly tweaking the UI to optimize engagement. — Filepic',
        'content' => '
            <p><strong>PETALING JAYA:</strong> Design matters. A recent A/B test showed that replacing bulky share buttons with sleek, circular icons significantly improved user engagement on mobile devices.</p>
            <p>ShareTrace implements these exact circular icons, ensuring that users have a seamless and familiar sharing experience.</p>
        '
    ],
    4 => [
        'id' => 4,
        'slug' => 'harimau-malaya-sea-games-triumph',
        'category' => 'Sport',
        'title' => 'Harimau Malaya roar past Thailand to claim SEA Games gold',
        'subtitle' => 'A last-minute header from Akhyar Rashid seals a dramatic 2-1 victory as Malaysia end their long wait for football gold at the Southeast Asian Games.',
        'author' => 'Sports Desk',
        'date' => '24 Aug 2026, 22:05 PM MYT',
        'readTime' => '3 min read',
        'image' => 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
        'caption' => 'The national squad celebrates their historic win at the Bukit Jalil Stadium. — Filepic',
        'content' => '
            <p><strong>KUALA LUMPUR:</strong> The Bukit Jalil National Stadium erupted in deafening cheers as Akhyar Rashid rose highest to head home a corner kick in the 92nd minute, giving Malaysia a stunning 2-1 victory over Thailand in the SEA Games final.</p>
            <p>It was a match that had everything — an early Thai opener, a brilliant equaliser by Faisal Halim, and then the late drama that sent 87,000 fans into ecstasy.</p>
            <p>"This is for every Malaysian who believed in us," said captain Dion Cools, hoisting the trophy. The last time Malaysia won SEA Games football gold was in 2011.</p>
        '
    ],
    5 => [
        'id' => 5,
        'slug' => 'penang-food-trail-michelin',
        'category' => 'Lifestyle',
        'title' => 'Penang\'s hidden food trail earns its first Michelin star',
        'subtitle' => 'A hawker stall tucked inside a George Town alley becomes the island\'s latest culinary sensation after earning international recognition.',
        'author' => 'Lifestyle Desk',
        'date' => '24 Aug 2026, 14:20 PM MYT',
        'readTime' => '5 min read',
        'image' => 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
        'caption' => 'The char kuey teow that put George Town back on the global food map. — Filepic',
        'content' => '
            <p><strong>GEORGE TOWN:</strong> For three decades, Ah Huat has been frying char kuey teow over a charcoal flame in a narrow alley off Lebuh Chulia. Now, the 68-year-old hawker holds a Michelin star.</p>
            <p>"I don\'t even know what Michelin is, but my grandchildren are very excited," he said with a chuckle, wiping soot from his hands.</p>
            <p>The Michelin Guide\'s Asia expansion has shone a spotlight on Penang\'s street food heritage, attracting food tourists from as far as Scandinavia and South America.</p>
        '
    ],
    6 => [
        'id' => 6,
        'slug' => 'press-freedom-editorial',
        'category' => 'Opinion',
        'title' => 'Why newsrooms must invest in transparency tools now',
        'subtitle' => 'An editorial on the importance of open analytics, reader trust, and the role of technology in modern journalism.',
        'author' => 'Editorial Board',
        'date' => '23 Aug 2026, 08:00 AM MYT',
        'readTime' => '6 min read',
        'image' => 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80',
        'caption' => 'The modern newsroom runs on data as much as on instinct. — Filepic',
        'content' => '
            <p>In the age of misinformation, nothing matters more than trust. And trust is built, not inherited.</p>
            <p>Newsrooms that embrace transparency — showing readers how stories spread, which channels drive engagement, and how editorial decisions are made — will be the ones that survive the next decade of digital disruption.</p>
            <p>Tools that track social sharing patterns are not surveillance; they are mirrors. They reflect what audiences care about, and give editors the data they need to serve the public interest more effectively.</p>
            <p>We urge every publisher in this region to make analytics investment a priority — not for profit alone, but for the health of the information ecosystem.</p>
        '
    ],
    7 => [
        'id' => 7,
        'slug' => 'drone-footage-taman-negara',
        'category' => 'Videos',
        'title' => 'Breathtaking drone footage captures Taman Negara at dawn',
        'subtitle' => 'A filmmaker\'s aerial journey over the world\'s oldest tropical rainforest reveals landscapes rarely seen by human eyes.',
        'author' => 'Multimedia Desk',
        'date' => '23 Aug 2026, 16:45 PM MYT',
        'readTime' => '2 min read',
        'image' => 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80',
        'caption' => 'The canopy of Taman Negara stretches endlessly into the morning mist. — Screengrab',
        'content' => '
            <p><strong>KUALA TAHAN:</strong> Malaysian filmmaker Amir Hafiz spent three weeks deep inside Taman Negara to capture what he calls "the heartbeat of the forest" — and the result is stunning.</p>
            <p>His six-minute drone film, released today, sweeps over 130-million-year-old canopy, past hidden waterfalls, and through river valleys where sunlight barely reaches the forest floor.</p>
            <p>"I wanted people in KL to see what they\'re protecting," said Amir. "This forest is older than the Amazon. It deserves our attention."</p>
        '
    ]
];

Route::get('/', function () use ($articles) {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'articles' => array_values($articles)
    ]);
});

Route::get('/article/{id}', function ($id) use ($articles) {
    if (!isset($articles[$id])) {
        abort(404);
    }
    $sharePlatforms = SharePlatform::where('is_active', true)->orderBy('order_column')->get();
    return Inertia::render('Article', [
        'canLogin' => Route::has('login'),
        'article' => $articles[$id],
        'sharePlatforms' => $sharePlatforms
    ]);
});

Route::get('/dashboard', [ShareClickController::class, 'dashboard'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // Share Platforms Admin UI
    Route::get('/admin/platforms', [SharePlatformController::class, 'index'])->name('platforms.index');
    Route::post('/admin/platforms', [SharePlatformController::class, 'store'])->name('platforms.store');
    Route::put('/admin/platforms/{platform}', [SharePlatformController::class, 'update'])->name('platforms.update');
    Route::delete('/admin/platforms/{platform}', [SharePlatformController::class, 'destroy'])->name('platforms.destroy');
});

require __DIR__.'/auth.php';
