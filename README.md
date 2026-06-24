# Let's Drive Auction - Car Auction Broker Platform

A modern web application for dealership car auctions where customers can bid on vehicles through a licensed broker, even without a driver's license.

## Features

- **User Authentication**: Secure login and registration for customers and brokers
- **Vehicle Listings**: Browse available cars with detailed information and images
- **Bidding System**: Real-time bidding on auction items
- **Broker Services**: Licensed brokers can bid on behalf of customers
- **User Profiles**: Manage personal information and auction history
- **Payment Processing**: Secure payment integration
- **Auction Management**: Track active, closed, and won auctions
- **Admin Dashboard**: Manage users, vehicles, and auction settings

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js with Express
- **Database**: MongoDB or PostgreSQL
- **Authentication**: JWT-based auth
- **Payments**: Stripe integration

## Project Structure

```
Let-s-Drive-Auction/
├── frontend/           # React frontend application
├── backend/            # Node.js backend API
├── docs/               # Documentation
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB or PostgreSQL
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/oxgirl/Let-s-Drive-Auction.git
cd Let-s-Drive-Auction

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Running the Application

```bash
# Start backend server (from backend directory)
npm run dev

# Start frontend (from frontend directory)
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Vehicles
- `GET /api/vehicles` - Get all vehicles
- `GET /api/vehicles/:id` - Get vehicle details
- `POST /api/vehicles` - Add new vehicle (admin only)

### Auctions
- `GET /api/auctions` - Get active auctions
- `GET /api/auctions/:id` - Get auction details
- `POST /api/auctions/:id/bid` - Place a bid
- `GET /api/auctions/:id/bids` - Get auction bids

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/:id/auctions` - Get user's auctions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@letsdrive-auction.com or open an issue in the repository.
