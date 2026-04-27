🏗️ BuildMart — House Raw Material Marketplace

A full-stack MERN marketplace for browsing construction raw materials (cement, bricks, tiles & more) with AI-powered 2D floor plan + 3D render generation from plot dimensions.

🚀 Features
🛒 Marketplace

Browse raw materials by category — cement, bricks, tiles, steel, sand, wood, etc.
View detailed vendor profiles with ratings, location, and contact info
Product listings with images, pricing, availability, and MOQ (minimum order quantity)
Search & filter by material type, price range, vendor, and location
Add to cart, request quotes, and directly contact vendors

🏠 AI Floor Plan & 3D Render Generator

Input your plot dimensions (length × width in feet/meters)
Select number of floors, rooms, and preferred layout style
AI generates a 2D floor plan (room layout, dimensions, walls, doors, windows)
AI generates a 3D rendered visualization of the proposed structure
Download generated plans as images
Powered by Claude AI API with a custom system prompt for architecture generation

👤 User & Vendor Management

User registration & login (JWT auth)
Separate Vendor dashboard to list and manage products
Admin panel for platform moderation

☁️ Media & Storage

Product images and generated floor plans stored via Cloudinary
Optimized image delivery with transformations

🧰 Tech Stack
LayerTechnologyFrontendReact.js, React Router, Redux Toolkit / ZustandBackendNode.js, Express.jsDatabaseMongoDB, MongooseAuthJWT (JSON Web Tokens), bcryptStorageCloudinary (images, renders)AIClaude API (Anthropic) — floor plan + 3D render generationFile UploadsMulter + CloudinaryEnv Configdotenv

📁 Project Structure
buildmart/
├── client/ # React Frontend
│ ├── public/
│ └── src/
│ ├── assets/
│ ├── components/
│ │ ├── common/ # Navbar, Footer, Loader
│ │ ├── marketplace/ # ProductCard, VendorCard, FilterPanel
│ │ └── floorplan/ # PlotInputForm, FloorPlanViewer, RenderViewer
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── Marketplace.jsx
│ │ ├── ProductDetail.jsx
│ │ ├── VendorProfile.jsx
│ │ ├── FloorPlanGenerator.jsx
│ │ ├── Dashboard.jsx # Vendor Dashboard
│ │ └── Auth/ # Login, Register
│ ├── store/ # Redux / Zustand state
│ ├── services/ # Axios API calls
│ └── App.jsx
│
├── server/ # Express Backend
│ ├── config/
│ │ ├── db.js # MongoDB connection
│ │ └── cloudinary.js # Cloudinary config
│ ├── controllers/
│ │ ├── authController.js
│ │ ├── productController.js
│ │ ├── vendorController.js
│ │ └── aiController.js # Floor plan AI logic
│ ├── middleware/
│ │ ├── authMiddleware.js # JWT verify
│ │ ├── uploadMiddleware.js # Multer + Cloudinary
│ │ └── errorHandler.js
│ ├── models/
│ │ ├── User.js
│ │ ├── Vendor.js
│ │ ├── Product.js
│ │ └── FloorPlan.js
│ ├── routes/
│ │ ├── authRoutes.js
│ │ ├── productRoutes.js
│ │ ├── vendorRoutes.js
│ │ └── aiRoutes.js
│ ├── utils/
│ │ └── aiPrompt.js # System prompt builder for AI
│ └── server.js
│
├── .env.example
├── .gitignore
└── README.md

⚙️ Environment Variables
Create a .env file in the /server directory:
env# Server
PORT=5000
NODE_ENV=development

# MongoDB

MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/buildmart

# JWT

JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d

# Cloudinary

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Anthropic Claude API

ANTHROPIC_API_KEY=your_anthropic_api_key
AI_MODEL=claude-opus-4-5

🔌 API Endpoints
Auth
MethodEndpointDescriptionPOST/api/auth/registerRegister new user/vendorPOST/api/auth/loginLogin and get JWTGET/api/auth/meGet current user profile
Products / Materials
MethodEndpointDescriptionGET/api/productsGet all products (with filters)GET/api/products/:idGet single productPOST/api/productsAdd product (vendor only)PUT/api/products/:idUpdate productDELETE/api/products/:idDelete product
Vendors
MethodEndpointDescriptionGET/api/vendorsList all vendorsGET/api/vendors/:idVendor profile + productsPOST/api/vendors/registerRegister as vendor
AI Floor Plan
MethodEndpointDescriptionPOST/api/ai/generate-planGenerate 2D plan + 3D render from dimensionsGET/api/ai/plansGet user's saved plansGET/api/ai/plans/:idGet a specific plan

🤖 AI System Prompt (Floor Plan Generator)
The AI feature uses a structured system prompt sent to the Claude API:
You are an expert architect and civil engineer.
Given plot dimensions and requirements, you will:

1. Generate a 2D floor plan layout (room positions, dimensions, walls, doors, windows)
   described in structured JSON format
2. Generate a detailed 3D render description for visualization

Always prioritize:

- Vastu Shastra compliance (for Indian users)
- Optimal natural light and ventilation
- Standard room sizing as per NBC (National Building Code) India
- Practical room flow and accessibility

Return your response in the following JSON format:
{
"floorPlan2D": { ... },
"render3DDescription": "...",
"materialEstimate": { ... }
}

🛠️ Getting Started
Prerequisites

Node.js v18+
MongoDB Atlas account (or local MongoDB)
Cloudinary account
Anthropic API key

Installation
bash# Clone the repository
git clone https://github.com/your-username/buildmart.git
cd buildmart

# Install server dependencies

cd server
npm install

# Install client dependencies

cd ../client
npm install
Run in Development
bash# Start backend (from /server)
npm run dev

# Start frontend (from /client)

npm run dev
Or use concurrently from the root:
bashnpm run dev # runs both client and server

📸 Screenshots

(Add screenshots here after building the UI)

MarketplaceVendor ProfileFloor Plan GeneratorShow ImageShow ImageShow Image

🗺️ Roadmap

Project setup & architecture
Auth (JWT login/register)
Product CRUD + Cloudinary upload
Vendor dashboard
Marketplace browse & filter
AI floor plan integration (Claude API)
3D render display
Material cost estimator
Admin panel
Mobile responsive UI
Payment/quotation system

🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

📄 License
MIT License — feel free to use and modify.

👨‍💻 Built With ❤️ by E-Skills Web — Indore, India
