# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

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


empmanagement/
├── server/
    ├── .env
│   ├── index.js  
│   ├── app.js  
│   └── package.json
│   ├── src/ 
          ├── controllers/
│         ├── models/
│         ├── routes/
│         ├── utils/
          ├── middlewares/
│  
│  
└── client/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── App.js
    │   ├── index.js
    │   └── ...
    ├── .env
    ├── package.json
    └── vite.config.js
