⚡ Electricity Bill Splitter App
A simple web app to help users split electricity bills fairly among roommates or housemates. Users can input total bill details, assign consumed units per person, and get their individual share calculated. Secure authentication is handled via JWT tokens.

🚀 Features:
🔐 Authentication using JWT (JSON Web Tokens)

🧮 Automatic calculation of amount to pay based on units consumed

👥 Add multiple people with their unit consumption

📊 View detailed breakdown of bill

📱 Responsive and user-friendly UI

🛠 Tech Stack 
Frontend:
React.js
Tailwind CSS
Axios

Backend:
Node.js
Express.js
MySQL
JWT for secure authentication
bcrypt for password hashing

🔑 Authentication:
Users sign up and log in with credentials.

A JWT token is issued on successful login and stored in local storage.

This token is sent in headers for accessing protected routes.

📦 Installation
1. Clone the repository:
cd my-electricity-bill-splitter

3. Setup Backend:
cd my-electricity-bill-splitter/server
npm install
cp .env.example .env
# Fill in DB credentials and JWT_SECRET
npm start

3. Setup Frontend:
bash
cd my-electricity-bill-splitter/frontend
npm install
npm run dev

✅ Usage:
Register an account.
Log in to access the bill splitter.
Input total bill and total units.
Add individual unit consumption.
Get each person's payable amount.

🧪 Future Improvements:
Save and view billing history
Dark mode toggle
