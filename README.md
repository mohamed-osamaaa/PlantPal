# 🌿 PlantPal — React Native + NestJS + MongoDB

## 📘 Overview

**PlantPal** is a full-stack mobile application that helps users manage and care for their plants efficiently. It includes a **React Native (Expo)** app for user interaction and a **NestJS** backend connected to **MongoDB** for data handling, authentication, and notifications.

---

## 🚀 Main Features

### 🌱 Client (React Native App)

* Clean and modern UI for managing plant data.
* Push notifications for watering or care reminders.
* Firebase integration for authentication and messaging.
* Global state management using **Zustand**.
* Axios for secure API communication.

### ⚙️ Server (NestJS Backend)

* RESTful API for managing users, plants, and notifications.
* **JWT-based authentication** for secure sessions.
* MongoDB database connection using **Mongoose**.
* Environment-based configuration using **@nestjs/config**.
* Validation with **class-validator** and **class-transformer**.

---

## 🧩 Tech Stack

### Client

* **React Native (Expo)** — Cross-platform mobile framework.
* **Axios** — For HTTP requests.
* **Firebase** — Authentication and messaging.
* **Zustand** — Lightweight state management.
* **TypeScript** — Strongly typed development.

### Server

* **NestJS** — Scalable Node.js framework.
* **MongoDB + Mongoose** — NoSQL database.
* **JWT** — Authentication tokens.
* **Class-Validator / Transformer** — Request validation.
* **TypeScript** — Backend type safety.

---

## 📂 Folder Structure

### Client

```
Client/
├── app/              # Main app screens and navigation
├── components/       # Reusable UI components
├── store/            # Zustand global state
├── styles/           # Styling and themes
├── utils/            # Helper functions
├── assets/           # Images and media
└── .env              # Environment configuration
```

### Server

```
Server/
├── src/              # Core source files (controllers, services, modules)
│   ├── users/        # User module
│   ├── plants/       # Plant module
│   ├── notifications/# Notifications module
├── db/               # Database configuration
├── uploads/          # Uploaded files
└── .env              # Environment configuration
```

---

## ⚙️ Installation and Setup

1. **Clone the repository:**

```bash
git clone https://github.com/mohamed-osamaaa/PlantPal.git
```

2. **Install dependencies:**

```bash
cd Client && npm install
cd ../Server && npm install
```

3. **Configure environment variables:**
   Create `.env` files in both the Client and Server directories.

**Client (.env):**

```env
EXPO_PUBLIC_API_URL=http://192.168.1.6:3000
```

**Server (.env):**

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
PORT=3000
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY=your_firebase_private_key
```

4. **Run the application:**

* **Server:**

```bash
npm run start:dev
```

* **Client:**

```bash
npx expo start
```

---

## 🔐 Authentication Flow

1. User registers or logs in through the app.
2. The app sends credentials to the backend.
3. The backend validates credentials and returns a **JWT token**.
4. The token is stored securely on the device.
5. Protected routes require JWT verification by middleware.

---

## 📡 API Endpoints

| Method | Endpoint        | Description          |
| ------ | --------------  | -------------------- |
| GET    | /plants         | Retrieve all plants  |
| POST   | /plants         | Add a new plant      |
| PATCH  | /plants/:id     | Update plant details |
| DELETE | /plants/:id     | Delete a plant       |
| POST   | /users/login    | User login           |
| POST   | /users/register | User registration    |

---

## 🔔 Integrations

* **Firebase Cloud Messaging (FCM)** for push notifications.

---

## 🚢 Deployment

* **Client:** Build production app with Expo or EAS.

```bash
eas build -p android --profile production
```

* **Server:** Deploy to services like Render, Railway, or AWS.

---

## 🔮 Future Improvements

* Add dark/light mode.

---

## 🧾 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Developed by Mohamed Osama**
[GitHub Profile](https://github.com/mohamed-osamaaa)
