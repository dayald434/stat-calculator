# 📊 Statistical Calculator

A full-stack web application for performing statistical calculations and hypothesis testing with **interactive data visualizations**. Built with Python Flask backend and HTML/CSS/JavaScript frontend, featuring Chart.js integration for visual data analysis.

## ✨ Features

### Statistical Tests
- **📈 Descriptive Statistics**: Mean, median, mode, variance, standard deviation, range
- **🔬 One-Sample T-Test**: Compare sample mean against hypothesized population mean
- **📊 Chi-Square Goodness of Fit**: Test if observed frequencies match expected distribution
- **📉 Pearson Correlation**: Analyze linear relationship between two variables

### Data Input Options
- **Manual Entry**: Type or paste comma-separated values
- **CSV Upload**: Upload CSV files with your data
- **Multiple Formats**: Support for comma-separated and newline-separated values

### Visual Analytics
- **Interactive Charts**: Automatic chart generation for all statistical tests
- **Frequency Histograms**: Visualize data distribution with automatic bin sizing
- **Distribution Analysis**: See sample data compared to hypothesis values
- **Scatter Plots**: View correlation with regression lines
- **Grouped Bar Charts**: Compare observed vs expected frequencies

### User-Friendly Design
- **Visual Significance Indicators**: ✓ for significant results, ✗ for non-significant (color-coded)
- **Chart Interpretation Guides**: Built-in explanations for understanding each visualization
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Error Handling**: Clear, helpful error messages for invalid inputs
- **Sample Data**: Included sample CSV files for testing

## 🎨 Screenshots

### Data Visualization Examples
- **Frequency Distribution**: Histogram showing data spread and patterns
- **T-Test Analysis**: Sample distribution with population mean overlay
- **Chi-Square Comparison**: Observed vs expected frequency bars
- **Correlation Analysis**: Scatter plot with linear regression line


## 📥 Installation from GitHub

### Step 1: Clone the Repository
```bash
# Clone the project
git clone https://github.com/dayald434/stat-calculator.git

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

#### macOS/Linux:
```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# You should see (venv) in your terminal
```

### Step 3: Install Dependencies
```bash
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
├── app.py                      # Flask application & API endpoints
├── requirements.txt            # Python dependencies
├── Procfile                    # Deployment configuration
├── README.md                   # Project documentation
├── CHANGELOG.md                # Complete feature changelog (Dec 9-10, 2025)
├── CSV_UPLOAD_GUIDE.md         # CSV upload documentation & examples
├── PROJECT_COMPLETION_STATUS.md # Task breakdown & completion tracking
├── sample_data_descriptive.csv # Sample: Descriptive statistics data
├── sample_data_ttest.csv       # Sample: T-test data
├── sample_data_chisquare.csv   # Sample: Chi-square data
├── sample_data_correlation.csv # Sample: Correlation data
├── templates/
│   └── index.html              # Main HTML page with Chart.js integration
├── static/
│   ├── style.css               # CSS styling (includes chart styles)
│   └── script.js               # JavaScript + Chart.js visualization functions
├── tests/
│   ├── __init__.py             # Tests package initialization
│   ├── test_app.py             # Unit tests (56 test cases - 100% passing ✅)
│   └── README.md               # Testing documentation
├── .github/
│   ├── workflows/
│   │   ├── ci.yml              # CI pipeline (test, lint, security)
│   │   ├── deploy.yml          # Deployment pipeline
│   │   └── code-coverage.yml   # Coverage reporting
│   └── PIPELINE_GUIDE.md       # GitHub Actions guide
└── __pycache__/                # Python bytecode cache
```

---

## 🚀 Quick Start with Sample Data

### Sample CSV Files Included
- **`sample_data_descriptive.csv`**: 10 values for descriptive statistics
- **`sample_data_ttest.csv`**: Sample data with population mean
- **`sample_data_chisquare.csv`**: Observed and expected frequencies
- **`sample_data_correlation.csv`**: X and Y values for correlation

### How to Use
1. Start the application (`python app.py`)
2. Navigate to any statistical test tab
3. Click "📁 Or upload CSV" button
4. Select a sample CSV file
5. Click "Calculate" to see results and interactive charts

---

## 🧪 Testing

### Run All Tests
```bash
python -m unittest tests.test_app -v
```

### Test Summary
- **Total**: 56 test cases
- **Status**: 100% passing ✅
- **Coverage**: Calculations, CSV uploads, chart data, error handling

### Test Categories
- Basic functionality (18 tests)
- Error handling (15 tests)
- Edge cases (14 tests)
- Chart data validation (4 tests)
- CSV upload validation (5 tests)

---

## 📊 New Features Added (Dec 2025)

### Interactive Visualizations
✅ Frequency distribution histograms  
✅ T-test sample distribution charts  
✅ Chi-square grouped bar charts  
✅ Correlation scatter plots with regression lines

### Visual Indicators
✅ ✓/✗ symbols for significance  
✅ Color-coded titles (red=significant, green=not)  
✅ Chart interpretation guides

### CSV Upload Support
✅ File upload for all statistical tests  
✅ Multiple format support (comma/newline separated)  
✅ Automatic parsing and validation  
✅ Comprehensive error handling

---

## 🛠️ Technology Stack

- **Backend**: Python 3.9+, Flask 3.1.2, NumPy, SciPy
- **Frontend**: HTML5, CSS3, JavaScript, Chart.js 4.4.0
- **Testing**: unittest (56 tests, 100% pass)
- **CI/CD**: GitHub Actions

---

## 📖 Documentation Files

| File | Description |
|------|-------------|
| `README.md` | Main project documentation |
| `CHANGELOG.md` | Detailed feature changelog |
| `CSV_UPLOAD_GUIDE.md` | CSV upload guide with examples |
| `PROJECT_COMPLETION_STATUS.md` | Task breakdown (US1-US5) |
| `tests/README.md` | Testing documentation |

---

## 🎯 Project Completion Status

✅ **US1**: CSV Upload - Complete  
✅ **US2**: Improved Error Messages - Complete  
✅ **US3**: Descriptive Statistics Visualization - Complete  
✅ **US4**: T-Test Visualization - Complete  
✅ **US5**: UI Enhancement - Complete  
🎁 **Bonus**: Chi-Square & Correlation Charts - Complete

**Overall**: 100% Complete | **Status**: Production Ready 🚀

---

**Last Updated**: December 13, 2025
