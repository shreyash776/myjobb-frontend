## 🛠️ Setup & Getting Started

Follow these steps to set up and run the project locally:

### 🔧 Step-by-Step Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-org/myjobb-backend.git

# 2. Navigate to the project directory
cd myjobb-backend

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

🎨 myjobb-frontend – AI Product Search UI
This is the frontend for the MyJobb platform. It features a modern, responsive UI with AI-powered product search, interactive dashboards, and analytics.

✨ Features
💡 Smart AI search using natural language

🧠 AI-generated product explanations

🖼️ Product cards & modals

📊 Dashboard with charts (Recharts)

📱 Fully responsive design

🔐 Next.js middleware for route protection

⚡ Fast, modern UI with Tailwind CSS

🧠 AI-Powered Smart Search
Users can type queries like:

"best waterproof mascara under $25"

The frontend sends the query to the backend

Displays AI-recommended products with reasons like:

"This mascara is waterproof and rated 4.8 stars under $25."

🛠️ Tech Stack
Tech	Purpose
Next.js (App Router)	React framework
TypeScript	Type safety
Tailwind CSS	Styling
Recharts	Analytics charts
React Icons	UI icons
Material UI / Spinners	Loaders
Next.js Middleware	Route protection & security
Fetch API / Axios	API calls
📁 Project Structure
text
/components
  ProductCard.tsx
  ProductModal.tsx
/pages
  /products
  /dashboard
  /analytics
/styles
.env.local
⚙️ Setup Instructions
1️⃣ Clone the repository
bash
git clone https://github.com/your-org/myjobb-frontend.git
cd myjobb-frontend
2️⃣ Install dependencies
bash
npm install
3️⃣ Configure environment
Create .env.local:

text
NEXT_PUBLIC_API_URL=http://localhost:5000
4️⃣ Run the app
bash
npm run dev
Visit: http://localhost:3000

🔐 Security Notes
✅ Next.js middleware is used to protect private routes

✅ Environment variables are used for API URLs

✅ All API requests go through a secure backend

🧠 AI Search Flow
text
graph LR
A[User enters query] --> B[Frontend sends to /api/recommend]
B --> C[Backend performs vector search + LLM]
C --> D[Returns product list with AI reasons]
D --> E[Frontend displays recommendations]
📄 License
MIT


 Security Notes: Images
<img width="1858" height="877" alt="Screenshot 2025-07-15 043843" src="https://github.com/user-attachments/assets/7c822f89-833a-471a-a177-2f672c155d12" />
<img width="1896" height="863" alt="Screenshot 2025-07-15 043938" src="https://github.com/user-attachments/assets/0f508568-7864-4445-b55b-821bc9335057" />
<img width="1839" height="830" alt="Screenshot 2025-07-15 044033" src="https://github.com/user-attachments/assets/7a33709b-01a5-4047-80a4-d5f0e7f4c081" />
<img width="1887" height="879" alt="Screenshot 2025-07-15 044645" src="https://github.com/user-attachments/assets/ecf02a14-3826-4c6d-ad51-ce5d89ea0085" />

