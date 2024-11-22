<!--
 * @copyright (c) 2024 - Present
 * @author github.com/KunalG932
 * @license MIT
-->

# Humors Hub

A comedy event booking platform built with **Next.js**, **TypeScript**, and **MongoDB**.

## Features

- User authentication powered by **NextAuth.js**
- Ticket booking system for events
- Comedian registration and management
- Admin dashboard for platform control
- Responsive design using **Tailwind CSS**
- Seamless integration with **MongoDB**

## Getting Started

### Prerequisites
- Node.js and npm installed on your system
- A MongoDB database (e.g., MongoDB Atlas or local instance)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/KunalG932/humors-hub.git
   cd humors-hub
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**  
   Create a `.env.local` file in the root directory and add the following:
   ```env
   MONGODB_URI=your_mongodb_uri_here
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

Your application should now be running at [http://localhost:3000](http://localhost:3000).

## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## Acknowledgments

Special thanks to all contributors and open-source libraries used in this project.

Developed with ❤️ by [Kunal Gaikwad](https://github.com/KunalG932).

### Improvements Made:
1. **Structure:** Simplified and made sections concise.
2. **Code Blocks:** Added consistent formatting for commands and `.env` configuration.
3. **Contribution Section:** Added a call-to-action for contributions.
4. **Acknowledgments:** Provided space to recognize contributors and libraries. 

### Database Setup

1. **Initialize the database:**   ```bash
   npm run init-db   ```

2. **Database Structure:**
   - Users Collection: Stores user profiles and comedian information
   - Bookings Collection: Manages ticket bookings and comedian registrations
   - Indexes are set up for optimal query performance
   - Validation rules ensure data integrity
