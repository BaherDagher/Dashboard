# 🧩 Admin Dashboard - Next.js

A responsive and modern admin dashboard built with **Next.js**, **Redux Toolkit**, **Recharts**, **Tailwind CSS**,  **Formik**,  **Yup** and **Firebase**. The dashboard includes user authentication, a dynamic data table with pagination and filtering, and interactive charts. Designed with mobile-first responsiveness in mind.

---

## 🚀 Features

- 🔐 **Authentication (Firebase)**
  - Email/Password Registration & Login
  - Google Sign-In
  - 🔁 Forgot Password (Reset via Email with validation + email existence check)
  - Form validation powered by **Formik** and **Yup** for all forms

- 📊 **Dashboard**
  - Dynamic **charts** built with **Recharts**
  - Data table with sorting, filtering, pagination (`react-data-table-component`)

- 🧠 **State Management**
  - Global state using **Redux Toolkit**

- 💅 **UI & Styling**
  - Built entirely with **Tailwind CSS**
  - Fully responsive design

- 🛠️ Well-structured, scalable folder architecture
- ✨ Clean, accessible UI and animations

---

## 🛠 Tech Stack

- **Frontend**: Next.js (App Router), React, Tailwind CSS
- **Auth/DB**: Firebase (Auth + Firestore)
- **State**: Redux Toolkit
- **Validation**: Formik + Yup
- **Charts**: Recharts
- **Table**: react-data-table-component

---

## 🧩 Folder Structure

Dashboard/
        ├── src/
                ├── app/                 # App router structure
                ├── components/          # Reusable UI components (forms, charts, navbar)
                ├── firebase/            # Firebase config and helper functions
                ├── redux/               # Redux Toolkit store and slices
                ├── Data/                # Dashboard Data

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/admin-dashboard-next.git
cd admin-dashboard-next
```

### 2. Install Dependencies

```bash
npm install
```

### 3.Setup Firebase

1.	Go to console.firebase.google.com and create a new project

2.	After the project is created, click on the Web (</>) icon to register a new web app.
	•	Enter a nickname for your app (e.g., admin-dashboard) and click “Register app”.

3.	Firebase will now show your Firebase configuration object. It looks like this:

             const firebaseConfig = {
                                        apiKey: "your_api_key",
                                        authDomain: "your_project.firebaseapp.com",
                                        projectId: "your_project_id",
                                        storageBucket: "your_project.appspot.com",
                                        messagingSenderId: "your_sender_id",
                                        appId: "your_app_id",
                                        measurementId: "your_measurement_id"
                                    };

4.	Create a .env.local file in the root directory of your project and paste your credentials like this: 

    •	NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
	•	NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    •   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    •   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
    •   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    •   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id 
    •   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement

    !!! NOTE: Ensure the environment variables are correctly named as shown. These values are exposed to the browser, so prefix them with NEXT_PUBLIC_ !!!

5.	In the Firebase console, go to Authentication > Sign-in method, and enable:
	•	Email/Password
	•	Google Sign-In

6.	Go to Firestore Database, create a new database in test mode (for development).


### 4. Run the Development Server

```bash
npm run dev
```

---


## 🧠 Implementation Approach

This dashboard was built with scalability and maintainability in mind:

	•	Authentication is handled through Firebase using both email/password and Google providers.
	•	Form Validation is centralized with Yup + Formik for consistency across login, register and forget password.
	•	Redux Toolkit is used to globally manage user and data state.
	•	Charts are implemented with Recharts to visualize dummy analytics.
	•	UI is made modular with Tailwind for a clean, responsive, and professional design.


## 📬 Contact

For questions or suggestions:

Baher Osama Farouk Dagher
📧 baherosama5828@example.com
🌐 https://www.linkedin.com/in/baher-dagher/