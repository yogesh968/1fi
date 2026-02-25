# 1Fi EMI Store 
---

##  Features

- **Bespoke Product Experience**: Dynamic product pages at `/products/:slug` with high-end studio imagery.
- **Hardware Configurator**: Luxury variant selector for storage and finishes.
- **Elite EMI Plans**: Multi-tenure ownership plans with 0% interest and instant cashback.
-  **Order Verification**: Full confirmation flow with a dedicated "Order Success" portal.
- **Cloud Database**: Integrated with **MongoDB Atlas** for high-availability production storage.
-  **Adaptive Luxury**: Fully responsive two-column desktop layout that elegantly stacks for mobile with a sticky CTA.
- **Performance First**: Ultra-fast loading with shimmer skeletons and transition-aware UI.

---

##  Folder Structure

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

##  Database Schema (MongoDB Atlas)

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

##  API Endpoints

| Method | Endpoint                          | Description                     |
|--------|-----------------------------------|---------------------------------|
| GET    | `/api/products`                   | Comprehensive product list      |
| GET    | `/api/products/:slug`             | Full details + Variants + EMI   |
| GET    | `/api/emi-plans/:variantId`       | Dynamic plans for config        |
| POST   | `/api/orders`                     | Process new EMI application     |
| GET    | `/api/health`                     | Production integrity check      |

---

## Environment & Setup

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

## 🎬 Demo Video 
https://drive.google.com/file/d/1G3f98eThNFLpYX9SLIO5jxml09y-90Mn/view?usp=sharing

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

