# Pizza App - Teljes Stack Webalkalmazás

Egy modern, teljes funkcionalitású pizza rendelő webalkalmazás Laravel backend és React frontend technológiákkal.

## Tartalom

- [Technológiák](#technológiák)
- [Funkciók](#funkciók)
- [Telepítés](#telepítés)
- [Használat](#használat)
- [API Dokumentáció](#api-dokumentáció)
- [Fejlesztői információk](#fejlesztői-információk)

## Technológiák

### Backend

- **PHP 8.2+**
- **Laravel 12.0** - Web framework
- **MySQL** - Adatbázis
- **Laravel Sanctum** - API token authentikáció
- **Laravel Mail** - E-mail küldés
- **PHPUnit** - Tesztelés

### Frontend

- **React 19.1** - UI library
- **Vite 7.1** - Build tool és dev server
- **React Router Dom 7.9** - Routing
- **Bootstrap 5.3** - CSS framework
- **Axios 1.13** - HTTP kliens
- **Google Maps API** - Térképek
- **Lodash Debounce** - Keresési optimalizálás

## Funkciók

### Felhasználói funkciók

**Pizza katalógus** - Szűrés, keresés, rendezés
**Kosár kezelés** - Termékek hozzáadása/eltávolítása
**Reszponzív design** - Mobil és desktop optimalizáció
**Élő keresés** - Debounced search funkcionalitás
**Lapozás** - Hatékony adatmegjelenítés
**Kapcsolati űrlap** - E-mail küldés
**Google Maps** - Helymeghatározás
**Rendelés leadás** - Teljes rendelési folyamat

### Admin funkciók

**Adatbázis kezelés** - Migrations és seeders
**API biztonság** - Sanctum token authentication
**E-mail templatok** - Blade template motor
**Tesztelés** - PHPUnit test suite

## Telepítés

### Előfeltételek

- PHP 8.2+
- Composer
- Node.js 18+
- npm vagy yarn
- MySQL 8.0+
- Git

### 1. Repository klónozása

```bash
git clone https://github.com/TamasDudas/pizza-app.git
cd pizza-app
```

### 2. Backend beállítás

```bash
cd backend

# Függőségek telepítése
composer install

# Environment fájl másolása
cp .env.example .env

# Alkalmazás kulcs generálása
php artisan key:generate

# Adatbázis konfiguráció (.env fájlban)
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=pizza_app
DB_USERNAME=your_username
DB_PASSWORD=your_password

# E-mail konfiguráció (.env fájlban)
MAIL_MAILER=smtp
MAIL_HOST=your_smtp_host
MAIL_PORT=587
MAIL_USERNAME=your_email
MAIL_PASSWORD=your_password

# Adatbázis migrálás és seedek futtatása
php artisan migrate --seed
```

### 3. Frontend beállítás

```bash
cd ../frontend

# Függőségek telepítése
npm install

# Environment fájl létrehozása
echo "VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key" > .env
```

### 4. Indítás

#### Backend (Laravel)

```bash
cd backend
php artisan serve
# Futni fog: http://localhost:8000
```

#### Frontend (React + Vite)

```bash
cd frontend
npm run dev
# Futni fog: http://localhost:5173
```

## Használat

### Fejlesztői szerverek

- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:8000/api`
- **Laravel Admin**: `http://localhost:8000`

### Fő útvonalak

- `/` - Főoldal
- `/pizzak` - Pizza katalógus
- `/pizzak/:id` - Pizza részletek
- `/kosar` - Kosár
- `/rendeles` - Rendelés leadás
- `/kapcsolat` - Kapcsolati űrlap
- `/aszf` - Felhasználási feltételek

## API Dokumentáció

### Fő végpontok

#### Pizzák

```http
GET /api/pizzas                 # Összes pizza (lapozással)
GET /api/pizzas?search=margherita # Keresés
GET /api/pizzas?sort_by=price&direction=asc # Rendezés
GET /api/pizzas/{id}           # Egy pizza részletei
```

#### Rendelések

```http
POST /api/orders               # Új rendelés
GET /api/orders/{id}          # Rendelés részletei
```

#### Kapcsolat

```http
POST /api/contact             # Kapcsolati űrlap küldés
```

### Query paraméterek

- `page` - Lapszám (alapértelmezett: 1)
- `per_page` - Elemek száma oldalanként (alapértelmezett: 6)
- `search` - Keresési kifejezés
- `sort_by` - Rendezési mező (name, price, popularity)
- `direction` - Rendezés iránya (asc, desc)

## Fejlesztői információk

### Projekt struktúra

```
pizza-app/
├── backend/                 # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/
│   │   ├── Models/
│   │   └── Mail/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   └── routes/api.php
├── frontend/                # React alkalmazás
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   └── pages/
│   └── public/
└── README.md
```

### Fejlesztői parancsok

#### Backend

```bash
# Új migráció létrehozása
php artisan make:migration create_table_name

# Új modell létrehozása
php artisan make:model ModelName

# Új controller létrehozása
php artisan make:controller ControllerName

# Tesztek futtatása
php artisan test
```

#### Frontend

```bash
# Fejlesztői szerver
npm run dev

# Production build
npm run build

# Linting
npm run lint

# Build előnézet
npm run preview
```

### Környezeti változók

#### Backend (.env)

```env
APP_NAME="Pizza App"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=pizza_app
DB_USERNAME=
DB_PASSWORD=

MAIL_MAILER=smtp
MAIL_HOST=
MAIL_PORT=587
MAIL_USERNAME=
MAIL_PASSWORD=
```

#### Frontend (.env)

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## Hibaelhárítás

### Gyakori problémák

#### CORS hibák

```bash
# Laravel backend
php artisan config:clear
php artisan route:clear
```

#### Node.js függőség problémák

```bash
# Frontend
rm -rf node_modules package-lock.json
npm install
```

#### Adatbázis kapcsolat

```bash
# Ellenőrizd az .env beállításokat
php artisan config:clear
php artisan migrate:fresh --seed
```


## Szerző

**Tamás Dudas**

- GitHub: [@TamasDudas](https://github.com/TamasDudas)
