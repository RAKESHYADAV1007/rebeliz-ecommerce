# Rebeliz - Premium Men's Fashion E-Commerce

![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-blue)
![Firebase](https://img.shields.io/badge/Firebase-10.7-orange)

A modern, premium men's fashion e-commerce platform built with React 19, TypeScript, and Firebase.

## Features

- 🛍️ **Product Catalog** - Browse premium men's fashion items
- 🛒 **Shopping Cart** - Add, remove, and manage items
- 👤 **User Authentication** - Firebase Auth integration
- 💳 **Checkout Process** - Secure payment processing
- 📱 **Responsive Design** - Mobile-first approach
- 🎨 **Premium UI** - Framer Motion animations
- 📊 **Admin Dashboard** - Manage products and orders
- 🔥 **Real-time Updates** - Firestore integration

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **State Management**: Context API, Zustand
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Forms**: React Hook Form, Zod validation
- **Routing**: React Router v6
- **Charts**: Chart.js
- **Icons**: React Icons

## Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/             # Page components
├── hooks/             # Custom React hooks
├── contexts/          # React Context API
├── store/             # Zustand store
├── services/          # Firebase and API services
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── styles/            # Global styles
├── config/            # Configuration files
└── App.tsx            # Main App component
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase account

### Installation

```bash
# Clone the repository
git clone https://github.com/RAKESHYADAV1007/rebeliz-ecommerce.git
cd rebeliz-ecommerce

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Add Firebase credentials to .env
```

### Development

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Firebase Setup

1. Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication, Firestore, and Storage
3. Copy your Firebase config to `.env`
4. Initialize Firestore database

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code
- `npm run type-check` - Check TypeScript types

## Deployment

The project is ready to deploy on Vercel:

```bash
vercel deploy
```

## License

MIT

## Author

Rakesh Yadav
