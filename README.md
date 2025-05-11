# 🌾 FarmConnect Backend

A scalable backend system for **FarmConnect** — a platform connecting local food producers with consumers. Built using Node.js, Express, TypeScript, Prisma ORM, and PostgreSQL (via Docker), this backend handles authentication, product listing, cart operations, order placement, and a producer analytics dashboard.

---

## 🚀 Features

- 🔐 JWT-based user authentication (Producer & Consumer roles)
- 🍅 Product management for producers (create, list)
- 🛒 Full cart system (add, view, remove, checkout)
- 📦 Order processing and history tracking
- 📊 Producer dashboard: product stock, sales count, total revenue
- 🧠 Built with Prisma ORM + PostgreSQL

---

## 🛠️ Tech Stack

- **Node.js + Express** – Web framework
- **TypeScript** – Type-safe backend development
- **Prisma** – ORM for PostgreSQL
- **Docker** – PostgreSQL containerized database
- **JWT** – Stateless authentication
- **Thunder Client** – API testing

---

## 📁 Project Structure

```
farmconnect-backend/
├── src/
│ ├── controllers/ # Handles API request logic
│ │ ├── userController.ts
│ │ ├── productController.ts
│ │ ├── orderController.ts
│ │ └── cartController.ts
│ ├── services/ # Business logic and Prisma queries
│ │ ├── userService.ts
│ │ ├── productService.ts
│ │ ├── orderService.ts
│ │ └── cartService.ts
│ ├── routes/ # Express route definitions
│ │ ├── userRoutes.ts
│ │ ├── productRoutes.ts
│ │ ├── orderRoutes.ts
│ │ └── cartRoutes.ts
│ ├── middlewares/ # Authentication, error handling
│ │ └── authMiddleware.ts
│ ├── utils/ # (Optional) Helper utilities
│ │ └── formatDate.ts
│ └── index.ts # App entry point
├── prisma/
│ ├── schema.prisma # Prisma DB schema
│ └── migrations/ # Prisma migrations
├── .env # Secret keys (not committed)
├── .env.example # Example environment config
├── .gitignore # Git ignored files
├── Dockerfile # Backend Docker container config
├── package.json # NPM scripts and dependencies
├── tsconfig.json # TypeScript configuration
└── README.md # Project overview
```


---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/farmconnect-backend.git
cd farmconnect-backend

2. Install dependencies
npm install

3. Set up environment variables

4. Start PostgreSQL via Docker

docker run --name farmconnect-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -e POSTGRES_DB=farmconnect \
  -p 5432:5432 \
  -d postgres

5. Apply database schema and generate Prisma client

npx prisma migrate dev --name init
npx prisma generate

6. Start the server

npm run dev

🔗 Core API Endpoints

| Method | Endpoint            | Role     | Description                |
| ------ | ------------------- | -------- | -------------------------- |
| POST   | /users/register     | All      | Register user              |
| POST   | /users/login        | All      | Login and receive JWT      |
| POST   | /products           | Producer | Add a product              |
| GET    | /products           | All      | List all products          |
| POST   | /cart               | Consumer | Add item to cart           |
| GET    | /cart               | Consumer | View cart items            |
| DELETE | /cart/\:id          | Consumer | Remove cart item           |
| POST   | /cart/checkout      | Consumer | Place order from cart      |
| GET    | /orders             | Consumer | View order history         |
| GET    | /producer/dashboard | Producer | View sales, stock, revenue |
