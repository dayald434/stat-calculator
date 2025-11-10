# 📊 Statistical Calculator

A full-stack web application for performing statistical calculations and hypothesis testing. Built with Python Flask backend and HTML/CSS/JavaScript frontend.

![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)
![Flask](https://img.shields.io/badge/Flask-3.0+-green.svg)
![Tests](https://img.shields.io/badge/Tests-75%20passing-success.svg)

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have installed:
- **Python 3.11+** - [Download here](https://www.python.org/downloads/)
- **Git** - [Download here](https://git-scm.com/downloads/)

---

## 📥 Installation from GitHub

### Step 1: Clone the Repository
```bash
# Clone the project
git clone https://github.com/dayald434/Statistical_Calculator.git

# Navigate into the project folder
cd stat-calculator
```

### Step 2: Set Up Python Virtual Environment

#### Windows:
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\activate

# You should see (venv) in your terminal
```

#### Mac/Linux:
```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# You should see (venv) in your terminal
```

### Step 3: Install Dependencies
```bash
# Upgrade pip
pip install --upgrade pip

# Install required packages
pip install -r requirements.txt
```

### Step 4: Verify Installation
```bash
# Check Flask installation
python -c "import flask; print('Flask version:', flask.__version__)"

# Should output: Flask version: 3.0.x
```

---

## 🎯 Running the Application

### Start the Server
```bash
# Make sure virtual environment is activated (you should see (venv))
python app.py
```

You should see:
```
 * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
```

### Access the Application

Open your web browser and go to:
```
http://localhost:5000
```

### Stop the Server

Press `Ctrl + C` in the terminal where the server is running.

---

## 📁 Project Structure
```
stat-calculator/
├── app.py                 # Flask application & API endpoints
├── templates/
│   └── index.html        # Main HTML page
├── static/
│   ├── style.css         # CSS styling
│   └── script.js         # JavaScript functionality
├── tests/                # Unit tests
├── requirements.txt      # Python dependencies
└── README.md            # This file
```

---

## ✨ Features

### Available Calculators

1. **📈 Descriptive Statistics**
   - Count, Sum, Mean, Median, Mode
   - Variance, Standard Deviation
   - Minimum, Maximum, Range

2. **🔬 T-Test**
   - One-sample T-test
   - T-statistic calculation
   - Degrees of freedom

3. **📊 Chi-Square Test**
   - Goodness of fit test
   - Chi-square statistic
   - Categories analysis

4. **📉 Correlation Analysis**
   - Pearson correlation coefficient
   - R-squared value
   - Correlation interpretation

---

## 💡 Usage Examples

### Descriptive Statistics
```
1. Click "Descriptive Stats" tab
2. Enter: 10, 20, 30, 40, 50
3. Click "Calculate Statistics"
4. View results: mean, median, std dev, etc.
```

### T-Test
```
1. Click "T-Test" tab
2. Line 1: 12, 14, 16, 18, 20
3. Line 2: 15
4. Click "Calculate T-Test"
5. View t-statistic and results
```

### Chi-Square Test
```
1. Click "Chi-Square" tab
2. Line 1 (Observed): 20, 30, 25, 25
3. Line 2 (Expected): 25, 25, 25, 25
4. Click "Calculate Chi-Square"
5. View chi-square statistic
```

### Correlation
```
1. Click "Correlation" tab
2. Line 1 (X values): 1, 2, 3, 4, 5
3. Line 2 (Y values): 2, 4, 6, 8, 10
4. Click "Calculate Correlation"
5. View correlation coefficient
```

---

## 🧪 Running Tests

### Install Testing Dependencies
```bash
pip install pytest pytest-flask pytest-cov
```

### Run Tests
```bash
# Run all tests
pytest

# Run with verbose output
pytest -v

# Run with coverage report
pytest --cov=app --cov-report=html

# View coverage report in browser
# Windows:
start htmlcov\index.html
# Mac/Linux:
open htmlcov/index.html
```

---

## 🔧 Troubleshooting

### Issue: "python not recognized" (Windows)
```bash
# Use py launcher instead
py -m venv venv
py app.py
```

### Issue: Virtual environment not activating (Windows PowerShell)
```powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy RemoteSigned
# Then try activating again
venv\Scripts\activate
```

### Issue: Port 5000 already in use
```bash
# Windows - Find and kill process
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux - Kill process
lsof -ti:5000 | xargs kill -9

# Or change port in app.py
# Change: app.run(debug=True, port=5001)
```

### Issue: "Module not found: flask"
```bash
# Make sure virtual environment is activated
# You should see (venv) in your prompt

# Then install requirements again
pip install -r requirements.txt
```

### Issue: Template not found
```bash
# Ensure folder structure is correct:
# - index.html must be in templates/ folder
# - style.css and script.js must be in static/ folder
```

---

## 🔄 Daily Workflow

### Starting Work
```bash
# 1. Navigate to project
cd stat-calculator

# 2. Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# 3. Start server
python app.py

# 4. Open http://localhost:5000 in browser
```

### Stopping Work
```bash
# 1. Stop server: Ctrl + C

# 2. Deactivate virtual environment
deactivate
```

---

## 📦 Dependencies

All dependencies are listed in `requirements.txt`:
```
Flask==3.0.0
flask-cors==4.0.0
Werkzeug==3.0.1
```

To update dependencies:
```bash
pip install --upgrade -r requirements.txt
```

---

## 🌐 API Endpoints

The application provides RESTful API endpoints:

### 1. Descriptive Statistics
```bash
POST /api/descriptive-stats
Content-Type: application/json

{
  "data": "10, 20, 30, 40, 50"
}
```

### 2. T-Test
```bash
POST /api/t-test
Content-Type: application/json

{
  "data": "12, 14, 16, 18, 20\n15"
}
```

### 3. Chi-Square
```bash
POST /api/chi-square
Content-Type: application/json

{
  "data": "20, 30, 25, 25\n25, 25, 25, 25"
}
```

### 4. Correlation
```bash
POST /api/correlation
Content-Type: application/json

{
  "data": "1, 2, 3, 4, 5\n2, 4, 6, 8, 10"
}
```

Test with curl:
```bash
curl -X POST http://localhost:5000/api/descriptive-stats \
  -H "Content-Type: application/json" \
  -d '{"data": "10, 20, 30, 40, 50"}'
```

---

## 📊 Technology Stack

- **Backend**: Python 3.11+, Flask 3.0
- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Testing**: pytest, Jest
- **Version Control**: Git

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests: `pytest -v`
5. Commit changes: `git commit -m "Add feature"`
6. Push to branch: `git push origin feature-name`
7. Create Pull Request

---

## 📝 Development Methodology

This project follows the **Spiral Model**:

**Cycle 1 (Current)**:
- ✅ Planning: Core statistical functions identified
- ✅ Risk Analysis: Input validation & error handling
- ✅ Engineering: Backend API + Frontend UI
- ✅ Evaluation: 75 tests, 90% coverage

**Cycle 2 (Planned)**:
- Two-sample T-tests
- ANOVA
- Data visualization
- CSV import/export

---

## 🔐 License

MIT License - see LICENSE file for details

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/stat-calculator/issues)
- **Documentation**: This README
- **Email**: your.email@example.com

---

## 📈 Project Status

- **Version**: 1.0.0
- **Status**: ✅ Production Ready
- **Tests**: 75 passing (50 backend, 25 frontend)
- **Coverage**: 90%
- **Last Updated**: November 2024

---

## ⚡ Quick Reference
```bash
# Clone project
git clone https://github.com/yourusername/stat-calculator.git
cd stat-calculator

# Setup environment
python -m venv venv
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Run application
python app.py

# Run tests
pytest -v

# Access application
# http://localhost:5000
```

---

## 🎓 Requirements File

Your `requirements.txt` should contain:
```
Flask==3.0.0
flask-cors==4.0.0
Werkzeug==3.0.1
```

To generate/update this file:
```bash
pip freeze > requirements.txt
```

---

<div align="center">

**Made with ❤️ using Flask and JavaScript**

⭐ Star this project if you find it useful!

[Report Bug](https://github.com/yourusername/stat-calculator/issues) · [Request Feature](https://github.com/yourusername/stat-calculator/issues)

</div>