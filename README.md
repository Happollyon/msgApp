# StealthComms — Concealed Messaging App

StealthComms is a secure and discreet messaging platform built for those who require high privacy standards in communication. Developed as part of my BSc (Hons) in Computing (Cybersecurity), this project features a hidden interface that can be disguised as a calculator, Tetris, or Snake game. The app combines robust security measures with a modern and user-friendly design.

---

## Features

- **Disguised Interface**: Launch the messaging app hidden behind a familiar disguise (Calculator, Tetris, or Snake).
- **Real-Time Messaging**: Instant secure communication powered by WebSockets.
- **End-to-End Encryption**: Ensure that messages remain private from sender to recipient.
- **JWT-Based Authentication**: Manage secure sessions with JSON Web Tokens.
- **Two-Factor Authentication (2FA)**: Enhance login security with Google Authenticator.
- **AWS S3 Image Storage**: Securely upload and store user images in the cloud.
- **Contact Management**: Easily search, add, block, and unblock contacts.
- **Secure Notifications**: Receive discreet notifications that blend in with other apps.
- **Password Policy Enforcement**: Strong password requirements to ensure account security.

---

## Tech Stack

| **Component** | **Technology** |
|---------------|----------------|
| **Frontend**  | React Native, React Navigation, React Native Paper, SQLite (local storage) |
| **Backend**   | Node.js, Express.js, PostgreSQL, JWT, WebSocket, AWS S3, Amazon EC2 |
| **Security**  | End-to-End Encryption, Two-Factor Authentication (Google Authenticator) |

---

## Screenshots

Place your screenshots below by updating the paths accordingly:

![Calculator Disguise](./screenshots/calculator-disguise.png)  
*Calculator interface serving as a disguise.*

![Chat Screen](./screenshots/chat-screen.png)  
*Real-time chat interface.*

![Login Screen](./screenshots/login-screen.png)  
*User login and registration process.*

---

## Installation

### Backend

1. **Navigate to the backend directory:**
   ```bash
   cd backend
1. **Install dependencies:**
   ```bash
   npm install
1. **Set up environment variables:**
   
   Create a .env file in the backend directory and add:
   ```ini
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   JWT_SECRET=your_jwt_secret
   POSTGRES_URI=your_postgres_uri

1. **Start the server:**
   
   Create a .env file in the backend directory and add:
   ```bash
   node index.js
  
### Frontend
1. **Navigate to the frontend directory:**
   
   Create a .env file in the backend directory and add:
   ```bash
   cd frontend
1. **Install dependencies:**
   
   Create a .env file in the backend directory and add:
   ```bash
   npm install
1. **Run the app on your device or emulator:**
   
   Create a .env file in the backend directory and add:
   ```bash
   npx react-native run-android

## Development Workflow

The project is divided into two main stages:

### Pre-Authentication Stage
- User registration and email verification.
- Password setup with enforced security guidelines.

### Post-Authentication Stage
- Real-time chat and contact management.
- Profile updates, secure image uploads, and discreet notifications.

This modular approach ensures easy scalability and maintainability.

---

## Future Enhancements

- Implement fully functional Tetris and Snake disguises.
- Add support for self-destructing messages.
- Extend file sharing capabilities for additional document types.
- Integrate the Giphy API for dynamic image sharing.
- Expand the notification system with customizable alert settings.

---

## License

This project is licensed under the **MIT License**.

---

## Author

**Fagner Nunes**  
[GitHub](https://github.com/happollyon) • [LinkedIn](https://www.linkedin.com/in/fagner-nunes)

---

## Contributing

Contributions are welcome!  
Please open an issue or submit a pull request for suggestions or enhancements.

---

## Contact

📧 [x19216718@student.ncirl.ie](mailto:x19216718@student.ncirl.ie)
