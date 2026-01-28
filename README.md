# SourceMind AI 🧠

> **Decode the Matrix of Code.**
> 
> An elite AI Technical Architect dashboard that analyzes GitHub repositories instantly. SourceMind uses **Google Gemini 3 Flash** to extract architectural insights, evaluate innovation, detect security risks, and generate code blueprints.

![SourceMind AI](https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3)

## ✨ Key Features

- **📊 Instant Architecture Audit**: Decodes the likely file structure, dependencies, and potential issues of any repo.
- **🛡️ Security Risk Center**: AI-driven vulnerability scanning and compliance checks.
- **💡 Innovation Scoring**: Quantifies the "Innovation Index" and "Complexity" of the codebase.
- **🏗️ Code Blueprint**: Auto-generates MVP code snippets to replicate core functionality.
- **⚡ High Performance**: Parallel data fetching and optimistic UI for a seamless experience.

## 🚀 Getting Started

This project is built with React 19, TypeScript, and Tailwind CSS. It uses modern ES Modules.

### ⚠️ Security Note
**NEVER commit your `.env` file to GitHub.** This project uses environment variables to keep your API key safe.

### Prerequisites

- A **Google Gemini API Key**. Get one [here](https://aistudio.google.com/).
- (Optional) A **GitHub Personal Access Token** if you plan to analyze many repos (to avoid rate limits).

### Installation

1.  **Clone the repo**
    ```bash
    git clone https://github.com/your-username/SourceMind-AI.git
    cd SourceMind-AI
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory (do not commit this file):
    ```bash
    cp .env.example .env
    ```
    Open `.env` and paste your Gemini API Key:
    ```env
    API_KEY=AIzaSy...YourKeyHere
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS, Lucide React (Icons)
- **AI Core**: Google Gemini 3 Flash (`@google/genai`)
- **Data**: GitHub REST API
- **Charts**: Recharts

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
