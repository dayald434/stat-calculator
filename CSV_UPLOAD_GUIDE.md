# CSV Upload Feature - Quick Guide

## 📁 How to Use CSV Upload

The Statistical Calculator now supports **CSV file uploads** for all statistical operations!

### ✨ Features Added

✅ Upload CSV files instead of typing numbers manually  
✅ Automatic parsing of numeric data  
✅ Skip non-numeric values (like headers)  
✅ Works for all 4 statistical tests  
✅ Clear format examples in the UI  

---

## 📊 CSV Format Examples

### 1. Descriptive Statistics
**Single row or column of numbers:**

```csv
12,15,18,20,22,25,28,30,32,35
```

Or vertical format:
```csv
12
15
18
20
22
25
28
```

**Sample file**: `sample_data_descriptive.csv`

---

### 2. T-Test
**All values in one row, with population mean as the last value:**

```csv
10,12,14,16,18,20,22,15
```

- Values 1-7: Sample data (10, 12, 14, 16, 18, 20, 22)
- Value 8: Population mean (15)

**Sample file**: `sample_data_ttest.csv`

---

### 3. Chi-Square Test
**Two rows: Observed frequencies, then Expected frequencies:**

```csv
25,30,45
33.3,33.3,33.3
```

- Row 1: Observed frequencies
- Row 2: Expected frequencies

**Sample file**: `sample_data_chisquare.csv`

---

### 4. Correlation Analysis
**Two rows: X values, then Y values:**

```csv
1,2,3,4,5
2,4,6,8,10
```

- Row 1: X values
- Row 2: Y values

**Sample file**: `sample_data_correlation.csv`

---

## 🚀 How to Upload

1. **Click the file upload button** in any tab
2. **Select your CSV file** (.csv extension required)
3. **Filename appears** to confirm upload
4. **Click "Calculate"** button
5. **View results** instantly!

---

## 💡 Tips

- CSV files can contain **headers** - they'll be skipped automatically
- **Empty cells** are ignored
- Works with both **comma-separated** and **newline-separated** data
- File size should be reasonable (< 1MB recommended)
- UTF-8 encoding supported

---

## 🧪 Testing

Sample CSV files are included in the project:
- `sample_data_descriptive.csv`
- `sample_data_ttest.csv`
- `sample_data_chisquare.csv`
- `sample_data_correlation.csv`

Try uploading these to test the functionality!

---

## 🔧 Technical Details

**Backend Changes:**
- Added `csv` module import
- Created `parse_csv_data()` helper function
- Modified all endpoints to accept `multipart/form-data`
- Handles both JSON and file upload requests

**Frontend Changes:**
- Added file input fields to all tabs
- Created `handleFileUpload()` function
- Updated all calculation functions to check for files first
- Added CSV format help sections with examples

**New Files:**
- `sample_data_*.csv` - Example CSV files for testing

---

## 📝 Usage in Code

### Python (requests library)
```python
import requests

with open('sample_data_descriptive.csv', 'rb') as f:
    files = {'file': f}
    response = requests.post('http://localhost:5000/api/descriptive-stats', files=files)
    print(response.json())
```

### cURL
```bash
curl -X POST http://localhost:5000/api/descriptive-stats \
  -F "file=@sample_data_descriptive.csv"
```

### JavaScript (Fetch API)
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);

fetch('/api/descriptive-stats', {
    method: 'POST',
    body: formData
})
.then(res => res.json())
.then(data => console.log(data));
```

---

## ✅ Benefits

✨ **Faster data entry** - No more typing long lists of numbers  
✨ **Less errors** - Copy-paste from Excel or other tools  
✨ **Reusable** - Save and reuse datasets  
✨ **Professional** - Industry-standard data format  
✨ **Flexible** - Works alongside text input  

---

**Version**: 2.0 (CSV Support Added)  
**Date**: December 2025  
**Status**: ✅ Fully Functional
