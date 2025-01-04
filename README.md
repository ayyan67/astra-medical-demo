# Astra Medical Demo

A technology demonstration of AI-assisted medical billing automation. This project showcases how machine learning can streamline the medical billing process by automatically predicting ICD/CPT codes from clinical notes.

## 🚨 Demo Notice

This is a technology demonstration only. No real medical data is processed. The AI predictions are simulated for demonstration purposes.

## 🌟 Features

- AI-assisted ICD/CPT code prediction (simulated)
- Medical claims submission workflow
- Claims history tracking
- Interactive dashboard
- Secure authentication

## 🛠️ Tech Stack

- Next.js 14 with App Router
- TypeScript
- TailwindCSS
- shadcn/ui components
- NextAuth.js
- Zustand

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/astra-medical-demo.git

# Install dependencies
npm install

# Create .env.local file with required environment variables
cp .env.example .env.local

# Run the development server
npm run dev
```

## 📝 Environment Variables

Create a `.env.local` file with the following:

```
NEXT_PUBLIC_APP_MODE=demo
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
DEMO_USER_EMAIL=demo@astramedical.com
DEMO_USER_PASSWORD=demopass123
```

## 👩‍💻 Demo Access

Use these credentials to explore the demo:
- Email: demo@astramedical.com
- Password: demopass123

## 📚 Documentation

The AI prediction system design is based on research in automated medical coding. For more details, see the included documentation in the `/docs` directory.

## 🤝 Contributing

This is a demonstration project. While we welcome feedback and suggestions, we're not actively seeking contributions at this time.

## ⚠️ Disclaimer

This is a technology demonstration only. It is not intended for use with real patient data or in production medical environments. The code predictions are simulated for demonstration purposes.

## 📄 License

MIT License - see LICENSE file for details