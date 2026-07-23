# Modern Chat App

A real-time chat application built with Node.js, Express, and Socket.IO. Experience seamless communication with a modern, responsive interface.

## ✨ Features

- **Real-time Messaging**: Instant message delivery using WebSocket technology
- **Multi-room Support**: Join different chat rooms for organized conversations
- **Modern UI**: Clean, responsive design with smooth animations
- **User Management**: See who's online in your current room
- **Connection Status**: Real-time connection indicator
- **Keyboard Shortcuts**: Quick actions for better user experience
- **Mobile Responsive**: Works perfectly on all devices

## 🚀 Tech Stack

- **Backend**: Node.js, Express.js
- **Real-time Communication**: Socket.IO
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Styling**: Modern CSS with CSS Variables and Flexbox
- **Icons**: Font Awesome
- **Fonts**: Inter (Google Fonts)

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- npm (comes with Node.js)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/modern-chat-app.git
   cd modern-chat-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 Usage

1. **Join a Chat Room**
   - Enter your username
   - Choose a room name
   - Click "Join Chat"

2. **Start Chatting**
   - Type your message in the input field
   - Press Enter or click the send button
   - Use Ctrl/Cmd + Enter for quick sending

3. **Room Features**
   - See active users in the sidebar
   - Real-time connection status
   - Automatic message scrolling

## 🎨 Features in Detail

### Real-time Communication
- Instant message delivery
- Live user presence
- Connection status monitoring
- Automatic reconnection

### Modern Interface
- Gradient backgrounds
- Smooth animations
- Responsive design
- Clean typography
- Intuitive navigation

### User Experience
- Welcome messages
- Loading states
- Error notifications
- Keyboard shortcuts
- Auto-scroll to new messages

## 📁 Project Structure

```
modern-chat-app/
├── src/
│   ├── index.js              # Main server file
│   └── utils/
│       ├── messages.js       # Message utilities
│       └── user.js          # User management
├── public/
│   ├── index.html           # Join page
│   ├── chat.html            # Chat interface
│   ├── css/
│   │   └── styles.css       # Modern styling
│   └── js/
│       └── chat.js          # Frontend logic
├── package.json
└── README.md
```

## 🔧 Configuration

The application uses environment variables for configuration:

```bash
# .env file
PORT=3000
HOST=0.0.0.0
CLERK_SECRET_KEY=sk_test_your_secret_key_here
```

## 🔐 Authentication

Sign-in is handled by [Clerk](https://clerk.com). The public join form
(`public/index.html`) collects a username and password and authenticates via
`Clerk.client.signIn.create()` in the browser, using the publishable key
already embedded in the page.

Every socket `join` event also carries a fresh Clerk session token. The
server (`src/index.js`) verifies that token with `@clerk/backend` and checks
that the token's user actually matches the claimed username before letting
anyone into a room — so the password box isn't just cosmetic, and `chat.html`
can't be reached by guessing a username/room in the URL.

To run this yourself, set `CLERK_SECRET_KEY` in `.env` to your Clerk
project's **secret key** (Clerk dashboard → API Keys → Secret key). Never
commit this value or expose it to the client — only the publishable key
belongs in front-end code.

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- [Socket.IO](https://socket.io/) for real-time communication
- [Express.js](https://expressjs.com/) for the web framework
- [Font Awesome](https://fontawesome.com/) for icons
- [Inter Font](https://rsms.me/inter/) for typography

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Built with ❤️ using Node.js and Socket.IO**