# SPortal

SPortal is a modern, news-style web application that tracks social media shares and provides an admin dashboard to visualize the data.

## Features

- **Front-End**: Beautiful, editorial-style news portal with 7 article categories (Nation, Business, Sport, Lifestyle, Tech, Opinion, Videos).
- **Dynamic Channels**: Manage your share buttons directly from the admin panel (Add, Edit, Delete). No code changes required to add new social platforms!
- **Tracking API**: Tracks whenever a reader clicks a share button, securely storing the URL, platform, and timestamp in real-time.
- **Admin Dashboard**: Secured, beautifully designed dashboard showing interactive charts of shares over time, filterable by date range, URL, and social channel.
- **Client-Side Validation**: All forms (Login, Register, Dashboard Filters, Channel Management) feature robust, instant client-side validation.
- **Tech Stack**: Laravel 11, React, Inertia.js, Tailwind CSS, Recharts.

## Requirements

- PHP 8.2 or higher
- Composer
- Node.js & NPM
- MySQL Database

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd SPortal
   ```

2. **Install PHP dependencies:**
   ```bash
   composer install
   ```

3. **Install Node dependencies:**
   ```bash
   npm install
   ```

4. **Environment Setup:**
   Copy the example `.env` file:
   ```bash
   cp .env.example .env
   ```
   Generate the application key:
   ```bash
   php artisan key:generate
   ```
   Configure your database connection in the `.env` file:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=sportal
   DB_USERNAME=root
   DB_PASSWORD=
   ```

5. **Run Migrations & Seeding:**
   ```bash
   php artisan migrate --seed
   ```
   *Note: The `--seed` flag is important! It will automatically populate the database with the 5 default social share buttons (Facebook, X, WhatsApp, Telegram, Email) and a test user account.*

6. **Build Frontend Assets:**
   ```bash
   npm run build
   ```
   *(For development, you can use `npm run dev`)*

7. **Run the Application:**
   ```bash
   php artisan serve
   ```
   Visit `http://localhost:8000` in your browser.

## Admin Access

To access the admin dashboard and manage share channels:
1. Click the **"Admin dashboard"** link located in the top red bar of the main landing page, OR visit `http://localhost:8000/login` directly.
2. Log in using the default seeded account (`test@example.com` / `password`).
3. You can also register a new admin account by visiting `http://localhost:8000/register` or clicking the Register link on the login page.
