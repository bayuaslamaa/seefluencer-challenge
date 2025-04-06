# Seefluencer

A full-stack web application built with Laravel (backend) and Next.js (frontend).

## Project Structure

This project is split into two main parts:
- `seefluencer-backend/` - Laravel API backend
- `seefluencer-frontend/` - Next.js frontend application

## Prerequisites

- PHP 8.2 or higher
- Node.js (LTS version recommended)
- Composer
- npm or yarn
- MySQL/PostgreSQL (or your preferred database)

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
```bash
cd seefluencer-backend
```

2. Install PHP dependencies:
```bash
composer install
```

3. Set up your environment:
```bash
cp .env.example .env
php artisan key:generate

```

4. Run Postgresql (in my Case using docker):
```
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=seefluencer_backend
DB_USERNAME=postgres
DB_PASSWORD=secret
```
docker run --name run-demo \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=secret \
  -e POSTGRES_DB=seefluencer_backend \
  -p 5432:5432 \
  -d postgres


4. Configure your database in `.env` and run migrations:
```bash
php artisan migrate
```

5. Start the development server:
```bash
composer run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd seefluencer-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up your environment:
```bash
cp .env.example .env

envs sent to Kak Agung
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Development

### Backend Development

The Laravel backend includes:
- PHP 8.2 support
- Laravel 12.0
- Pest PHP for testing
- Laravel Pint for code styling
- Laravel Sail for Docker support

### Frontend Development

The Next.js frontend includes:
- TypeScript support
- Modern ES2017+ features
- Path aliases configured (`@/*`)
- Built-in optimization features


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.






