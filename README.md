# 💎 PRIME STORE — Elite Ownership Platform

> A production-grade luxury hardware acquisition platform built with **React + Vite**, **Node.js + Express**, and **MongoDB Atlas + Prisma**.

---

## ✨ Features

- 🛍️ **Bespoke Product Experience**: Dynamic product pages at `/products/:slug` with high-end studio imagery.
- 📦 **Hardware Configurator**: Luxury variant selector for storage and finishes.
- 💳 **Elite EMI Plans**: Multi-tenure ownership plans with 0% interest and instant cashback.
- 🔒 **Order Verification**: Full confirmation flow with a dedicated "Order Success" portal.
- ☁️ **Cloud Database**: Integrated with **MongoDB Atlas** for high-availability production storage.
- 📱 **Adaptive Luxury**: Fully responsive two-column desktop layout that elegantly stacks for mobile with a sticky CTA.
- ⚡ **Performance First**: Ultra-fast loading with shimmer skeletons and transition-aware UI.

---

## 🗂️ Folder Structure

```
1fi/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma      # MongoDB Schema definitions
│   │   └── seed.js            # Premium Seed Data (Images + Plans)
│   ├── src/
│   │   ├── app.js             # Express app setup
│   │   ├── server.js          # Entry point (Port 5001)
│   │   ├── config/db.js       # Prisma client singleton
│   │   ├── controllers/
│   │   │   ├── productController.js
│   │   │   ├── emiController.js
│   │   │   └── orderController.js
│   │   ├── routes/
│   │   │   ├── productRoutes.js
│   │   │   ├── emiRoutes.js
│   │   │   └── orderRoutes.js
│   │   └── middleware/
│   │       └── errorHandler.js
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ProductInfo.jsx
    │   │   ├── VariantSelector.jsx
    │   │   ├── EMIPlanCard.jsx
    │   │   ├── ConfirmModal.jsx
    │   │   └── Button.jsx
    │   ├── pages/
    │   │   ├── ProductPage.jsx
    │   │   └── OrderSuccess.jsx
    │   ├── services/
    │   │   └── api.js        # Axios/Fetch wrapper
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css         # Tailored CSS with Outfit Typography
    └── .env
```

---

## 🗄️ Database Schema (MongoDB Atlas)

```prisma
Product
  id (ObjectId), name, slug (unique), description, imageUrl, mrp, price, badge, createdAt

Variant [belongs to Product]
  id (ObjectId), productId, color, storage, priceOverride?, imageUrl, createdAt

EmiPlan [belongs to Variant]
  id (ObjectId), variantId, monthlyAmount, tenureMonths, interestRate, cashbackAmount, createdAt

Order [tracks purchases]
  id (ObjectId), orderNumber (unique), variantId, emiPlanId, totalAmount, monthlySchedule, tenure, status
```

---

## 🔌 API Endpoints

| Method | Endpoint                          | Description                     |
|--------|-----------------------------------|---------------------------------|
| GET    | `/api/products`                   | Comprehensive product list      |
| GET    | `/api/products/:slug`             | Full details + Variants + EMI   |
| GET    | `/api/emi-plans/:variantId`       | Dynamic plans for config        |
| POST   | `/api/orders`                     | Process new EMI application     |
| GET    | `/api/health`                     | Production integrity check      |

---

## 🚀 Environment & Setup

### 1. Backend Configuration (`backend/.env`)
```env
DATABASE_URL="mongodb+srv://yogakumar221_db_user:password@1fi.hfbjvjd.mongodb.net/emi_store"
PORT=5001
NODE_ENV=production
```

### 2. Frontend Configuration (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5001/api
```

### 3. Quick Start
```bash
# Install everything
cd backend && npm install
cd ../frontend && npm install

# Initialize Database
cd ../backend
npx prisma db push
npm run seed

# Launch Production-ready Dev
# Terminal 1
cd backend && npm run dev
# Terminal 2
cd frontend && npm run dev
```

---

## 🎬 Demo Video Script (2–3 Minutes)

**[0:00–0:15] Intro: The Vision**
> "Welcome to PRIME STORE — a state-of-the-art acquisition platform for elite hardware. This isn't just a store; it's a seamless ownership experience built on the MERN stack with Prisma and MongoDB Atlas."

**[0:15–0:45] Visual Interaction**
> "Notice the bespoke Product Showcase. We use hyper-realistic imagery and the Outfit font to create a luxury tech aesthetic. On the left, we have floating technical tags; on the right, the configuration panel."

**[0:45–1:15] Configuration & Logic**
> "As I switch between 256GB and 512GB finishes, the backend instantly recalculates EMI tenures. We feature 0% interest plans highlighted with high-contrast emerald green for better conversion."

**[1:15–1:45] The Order Flow**
> "When a user selects a plan, we don't just 'buy' — we confirm. Clicking 'Proceed' triggers our custom verification modal, ensuring the user understands their monthly schedule before our MongoDB-backed order service locks it in."

**[1:45–2:15] Backend & Data Integrity**
> "Driven by MongoDB Atlas, the system tracks variants and orders in real-time. Our Prisma schema ensures type-safety across the entire infrastructure, making it ready for high-scale production."

**[2:15–2:30] Closing**
> "PRIME STORE — Precision engineered software for premium hardware. Ready for deployment."

---

## ☁️ Deployment Guide

### Backend → Render
1. Create a **Web Service**.
2. Build Command: `npm install && npx prisma generate` (Prisma will connect to your MongoDB Atlas during build).
3. Set `NODE_ENV=production` and `DATABASE_URL` in environment variables.

### Frontend → Vercel
1. Connect repo.
2. Set Environment Variable `VITE_API_URL` to your Render backend URL.
3. Deploy.

---

## 📄 License

MIT (2026) | Generated for Yogkumar Production
