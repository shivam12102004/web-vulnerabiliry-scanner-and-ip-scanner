# 🛡️ Web Vulnerability & IP Scanner

A simple and powerful web-based tool for scanning websites and IPs for open ports and potential vulnerabilities. Built with a **React frontend** and **Flask backend**, this project is ideal for beginners, cybersecurity students, and network administrators.

---

## 🚀 Features

- 🔍 Scan public IPs and domains for open ports
- 🌐 Website vulnerability detection logic (basic)
- ⚡ Fast and responsive React UI
- 🔙 Flask-powered REST API backend
- 🧩 JSON-based scan results with error handling
- 🎥 Video resource compressed for optimized performance

---

## 📁 Project Structure

vulnscanner/
├── backend/
│   ├── app.py                     # Flask main app
│   ├── scanner.py                 # Port/vulnerability scanning logic (optional)
│   ├── utils.py                   # Utility/helper functions (optional)
│   ├── requirements.txt           # Python dependencies
│   └── __init__.py                # Package marker (optional)
│
├── frontend/
│   ├── public/
│   │   ├── index.html             # Main HTML template
│   │   └── videoplayback.mp4      # (Compressed) video file if needed
│   ├── src/
│   │   ├── components/
│   │   │   ├── ResultBox.jsx      # Shows scan result
│   │   │   └── Header.jsx         # (Optional) Header/Navbar
│   │   ├── App.js                 # Main React component
│   │   ├── index.js               # React entry point
│   │   └── api.js                 # Axios API calls
│   ├── package.json               # Frontend dependencies
│   └── .env                       # (Optional) environment variables
│
├── .gitignore                     # Ignore unnecessary files
├── README.md                      # Project overview
└── render.yaml                    # (Optional) Render deployment config



---

## 🛠️ Tech Stack

- **Frontend**: React.js, Axios, HTML/CSS
- **Backend**: Python, Flask
- **Others**: Netcat (for port scanning), OS commands, Git

---

## 🔧 Setup Instructions

### ⚙️ Backend (Flask)

```bash
cd backend
pip install -r requirements.txt
python app.py


cd frontend
npm install
npm start


