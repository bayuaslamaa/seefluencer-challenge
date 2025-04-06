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

4. Configure your database in `.env` and run migrations:
```bash
php artisan migrate
```

5. Start the development server:
```bash
php artisan serve
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
```

3. Set up your environment:
```bash
cp .env.example .env.local
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

## Testing

### Backend Tests
```bash
cd seefluencer-backend
php artisan test
```

### Frontend Tests
```bash
cd seefluencer-frontend
npm run test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.






