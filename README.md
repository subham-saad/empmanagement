Install dependencies for the server: 
cd server 
npm install

Start the server: 
npm run dev

Install dependencies for the client: 
cd ../client 
npm install

Start the Vite development server for the client: 
npm run dev

empmanagement/ ├── server/ ├── .env │ ├── index.js
│ ├── app.js
│ └── package.json │ ├── src/ ├── controllers/ │ ├── models/ │ ├── routes/ │ ├── utils/ ├── middlewares/ │
│
└── client/ ├── public/ ├── src/ │ ├── components/ │ ├── App.js │ ├── index.js │ └── ... ├── .env ├── package.json └── vite.config.js
