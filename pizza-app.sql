-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Nov 11. 17:04
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `pizza-app`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `contacts`
--

CREATE TABLE `contacts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `aszf_accepted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `email`, `subject`, `message`, `aszf_accepted`, `created_at`, `updated_at`) VALUES
(12, 'Dudás Tamás', 'ddstms@gmail.com', 'Elégedettség', 'Az étel kiválló volt és a kiszállítás is gyors volt.', 1, '2025-11-11 15:00:24', '2025-11-11 15:00:24');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_11_06_095201_create_pizzas_table', 1),
(5, '2025_11_06_095247_create_orders_table', 1),
(6, '2025_11_06_100606_create_contacts_table', 1),
(7, '2025_11_06_183143_create_personal_access_tokens_table', 1),
(8, '2025_11_09_103723_add_aszf_to_contacts_table', 2),
(9, '2025_11_09_104352_add_aszf_to_orders_table', 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_email` varchar(255) NOT NULL,
  `customer_phone` varchar(255) NOT NULL,
  `delivery_address` text NOT NULL,
  `items` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`items`)),
  `total_price` int(10) UNSIGNED NOT NULL,
  `status` enum('pending','completed','cancelled') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `aszf_accepted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `orders`
--

INSERT INTO `orders` (`id`, `customer_name`, `customer_email`, `customer_phone`, `delivery_address`, `items`, `total_price`, `status`, `created_at`, `updated_at`, `aszf_accepted`) VALUES
(10, 'Dudás Tamás', 'tamasdudas230@gmail.com', '0620505895', 'Regős', '[{\"pizza_id\":15,\"pizza_name\":\"Frutti di Mare\",\"size\":\"small\",\"price\":1267,\"quantity\":1}]', 1267, 'pending', '2025-11-11 15:01:09', '2025-11-11 15:01:09', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `pizzas`
--

CREATE TABLE `pizzas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `toppings` text NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `price_small` int(10) UNSIGNED DEFAULT NULL,
  `price_medium` int(10) UNSIGNED DEFAULT NULL,
  `price_large` int(10) UNSIGNED DEFAULT NULL,
  `popularity` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `pizzas`
--

INSERT INTO `pizzas` (`id`, `name`, `toppings`, `description`, `image`, `price_small`, `price_medium`, `price_large`, `popularity`, `created_at`, `updated_at`) VALUES
(1, 'Margherita', 'paradicsomszósz, mozzarella, bazsalikom', 'A klasszikus olasz pizza egyszerű és finom alapanyagokkal', 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?w=400&h=300&fit=crop', 1466, 1988, 2591, 39, '2025-11-07 11:00:39', '2025-11-07 11:00:39'),
(2, 'Hawaii', 'sonka, ananász, sajt', 'Trópusi ízek találkozása a hagyományos pizzával', 'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?w=400&h=300&fit=crop', 1218, 1642, 2518, 38, '2025-11-07 11:00:39', '2025-11-07 11:00:39'),
(3, 'Pepperoni', 'pepperoni, sajt, paradicsomszósz', 'Pikáns pepperoni szalámival a fűszeres élményért', 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?w=400&h=300&fit=crop', 1283, 2143, 2406, 9, '2025-11-07 11:00:39', '2025-11-07 11:00:39'),
(4, 'Quattro Formaggi', 'mozzarella, gorgonzola, parmezán, camembert', 'Négyfajta sajt harmóniája a sajtszeretőknek', 'https://images.pexels.com/photos/4394612/pexels-photo-4394612.jpeg?w=400&h=300&fit=crop', 1017, 1626, 2748, 38, '2025-11-07 11:00:39', '2025-11-07 11:00:39'),
(5, 'Vegetariana', 'paradicsomszósz, paprika, gomba, cukkini, sajt', 'Friss zöldségek gazdag keveréke húsmentes élvezet', 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?w=400&h=300&fit=crop', 1388, 1894, 2345, 28, '2025-11-07 11:00:39', '2025-11-07 11:00:39'),
(6, 'Diavola', 'csípős szalámi, paprika, mozzarella', 'Tüzes pizza a csípős ízek kedvelőinek', 'https://images.pexels.com/photos/327158/pexels-photo-327158.jpeg?w=400&h=300&fit=crop', 1059, 1706, 2438, 14, '2025-11-07 11:00:39', '2025-11-07 11:00:39'),
(7, 'Capricciosa', 'sonka, gomba, articsóka, oliva, sajt', 'Gazdag feltétekkel megrakott hagyományos olasz pizza', 'https://images.pexels.com/photos/263041/pexels-photo-263041.jpeg?w=400&h=300&fit=crop', 1003, 1784, 2847, 33, '2025-11-07 11:00:39', '2025-11-07 11:00:39'),
(8, 'Tonno', 'tonhal, hagyma, sajt', 'Tengeri ízek egyszerű és egészséges összeállításban', 'https://images.pexels.com/photos/1049626/pexels-photo-1049626.jpeg?w=400&h=300&fit=crop', 1298, 1611, 2643, 19, '2025-11-07 11:00:39', '2025-11-07 11:00:39'),
(9, 'Salami', 'szalámi, paradicsomszósz, sajt', 'Klasszikus szalámi pizza mindig jó választás', 'https://images.pexels.com/photos/265393/pexels-photo-265393.jpeg?w=400&h=300&fit=crop', 1455, 1794, 2858, 13, '2025-11-07 11:00:39', '2025-11-07 11:00:39'),
(10, 'Funghi', 'gomba, paradicsomszósz, sajt', 'Zamatos gombák egyszerű és ízletes kombinációja', 'https://images.pexels.com/photos/367915/pexels-photo-367915.jpeg?w=400&h=300&fit=crop', 1227, 1746, 2501, 46, '2025-11-07 11:00:39', '2025-11-07 11:00:39'),
(11, 'Prosciutto', 'sonka, paradicsomszósz, mozzarella', 'Prémium sonka friss mozzarellával', 'https://images.pexels.com/photos/2232/vegetables-italian-pizza-restaurant.jpg?w=400&h=300&fit=crop', 1085, 1969, 2743, 44, '2025-11-07 11:00:39', '2025-11-07 11:00:39'),
(12, 'Calzone', 'sonka, gomba, sajt, paradicsomszósz', 'Összehajtott pizza gazdag töltelékkel', 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?w=400&h=300&fit=crop', 1282, 1616, 2500, 27, '2025-11-07 11:00:39', '2025-11-07 11:00:39'),
(13, 'Napoli', 'szardella, olíva, kapribogyó, sajt', 'Mediterrán ízek hagyományos nápolyi stílusban', 'https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?w=400&h=300&fit=crop', 1248, 1981, 2525, 41, '2025-11-07 11:00:39', '2025-11-07 11:00:39'),
(14, 'Boscaiola', 'gomba, szalámi, tejszín, sajt', 'Erdei gombák tejszínes szósszal', 'https://images.pexels.com/photos/2271107/pexels-photo-2271107.jpeg?w=400&h=300&fit=crop', 1147, 1661, 2706, 10, '2025-11-07 11:00:39', '2025-11-07 11:00:39'),
(15, 'Frutti di Mare', 'tengeri herkentyűk, fokhagyma, petrezselyem, sajt', 'Friss tengeri ételek ínyenceknek', 'https://images.pexels.com/photos/4394613/pexels-photo-4394613.jpeg?w=400&h=300&fit=crop', 1267, 1725, 2977, 45, '2025-11-07 11:00:39', '2025-11-07 11:00:39'),
(16, 'Mexicana', 'csípős hús, paprika, kukorica, sajt', 'Mexikói fűszerezés tüzes karakterrel', 'https://images.pexels.com/photos/803963/pexels-photo-803963.jpeg?w=400&h=300&fit=crop', 1365, 2117, 2522, 10, '2025-11-07 11:00:39', '2025-11-07 11:00:39');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('1o5wjzhiL0nFwHKCfrdqkJDVzpKQwNL16eIcycNt', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibEltU3p4NEQ3ZFJub05nV0hCdnV5am56SGVHOVFZODQ4eVNhTVBGNiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC90ZXN0LWVtYWlsIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1762676131),
('xzYDNIauBPoA9rbUtdeVlgpEEwyQQu61BhZkKyF5', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidFdObDZQUG91QkpBYXo1YXltODBHbHpkeVdpN3U4UHNhUHMxd3VSYyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1762844168);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- A tábla indexei `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- A tábla indexei `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- A tábla indexei `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- A tábla indexei `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- A tábla indexei `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- A tábla indexei `pizzas`
--
ALTER TABLE `pizzas`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT a táblához `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT a táblához `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `pizzas`
--
ALTER TABLE `pizzas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
