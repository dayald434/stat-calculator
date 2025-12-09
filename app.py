from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import math
import statistics
from scipy import stats
import csv
from io import StringIO

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

def parse_csv_data(csv_content):
    """Parse CSV content and return list of numbers"""
    numbers = []
    csv_file = StringIO(csv_content)
    csv_reader = csv.reader(csv_file)
    
    for row in csv_reader:
        for value in row:
            value = value.strip()
            if value:  # Skip empty values
                try:
                    numbers.append(float(value))
                except ValueError:
                    # Skip non-numeric values (headers, etc.)
                    continue
    
    return numbers

@app.route('/api/descriptive-stats', methods=['POST'])
def descriptive_stats():
    try:
        # Handle both JSON and file uploads
        if request.is_json:
            data = request.json.get('data', '')
            numbers = [float(x.strip()) for x in data.split(',') if x.strip()]
        else:
            # Handle CSV file upload
            if 'file' not in request.files:
                return jsonify({'error': 'No file uploaded'}), 400
            
            file = request.files['file']
            if file.filename == '':
                return jsonify({'error': 'No file selected'}), 400
            
            if not file.filename.endswith('.csv'):
                return jsonify({'error': 'Please upload a CSV file'}), 400
            
            csv_content = file.read().decode('utf-8')
            numbers = parse_csv_data(csv_content)
        
        if not numbers:
            return jsonify({'error': 'Please enter valid numbers'}), 400
        
        # Calculate statistics
        n = len(numbers)
        total = sum(numbers)
        mean = statistics.mean(numbers)
        median = statistics.median(numbers)
        
        # Variance and standard deviation
        if n > 1:
            variance = statistics.variance(numbers)
            std_dev = statistics.stdev(numbers)
        else:
            variance = 0
            std_dev = 0
        
        minimum = min(numbers)
        maximum = max(numbers)
        data_range = maximum - minimum
        
        # Mode (if exists)
        try:
            mode = statistics.mode(numbers)
        except statistics.StatisticsError:
            mode = "No unique mode"
        
        result = {
            'count': n,
            'sum': round(total, 4),
            'mean': round(mean, 4),
            'median': round(median, 4),
            'mode': mode if isinstance(mode, str) else round(mode, 4),
            'variance': round(variance, 4),
            'stdDev': round(std_dev, 4),
            'min': round(minimum, 4),
            'max': round(maximum, 4),
            'range': round(data_range, 4)
        }
        
        return jsonify(result)
    
    except ValueError:
        return jsonify({'error': 'Invalid input. Please enter numbers only.'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/t-test', methods=['POST'])
def t_test():
    try:
        # Handle both JSON and file uploads
        if request.is_json:
            data = request.json.get('data', '')
            
            # Split by newlines and filter empty lines
            lines = [line.strip() for line in data.strip().split('\n') if line.strip()]
            
            if len(lines) < 2:
                return jsonify({'error': 'Enter sample data (line 1) and population mean (line 2). Make sure to press Enter between lines.'}), 400
            
            # Parse sample data
            sample = [float(x.strip()) for x in lines[0].split(',') if x.strip()]
            population_mean = float(lines[1].strip())
        else:
            # Handle CSV file upload
            if 'file' not in request.files:
                return jsonify({'error': 'No file uploaded'}), 400
            
            file = request.files['file']
            if file.filename == '' or not file.filename.endswith('.csv'):
                return jsonify({'error': 'Please upload a CSV file'}), 400
            
            csv_content = file.read().decode('utf-8')
            all_numbers = parse_csv_data(csv_content)
            
            if len(all_numbers) < 2:
                return jsonify({'error': 'CSV must contain sample data and population mean (last value)'}), 400
            
            # Last value is population mean, rest is sample
            sample = all_numbers[:-1]
            population_mean = all_numbers[-1]
        
        if not sample:
            return jsonify({'error': 'Sample data cannot be empty'}), 400
        
        if len(sample) < 2:
            return jsonify({'error': 'Need at least 2 data points for t-test'}), 400
        
        # Calculate t-test using scipy
        t_statistic, p_value = stats.ttest_1samp(sample, population_mean)
        
        n = len(sample)
        sample_mean = statistics.mean(sample)
        sample_std = statistics.stdev(sample)
        std_error = sample_std / math.sqrt(n)
        df = n - 1
        
        # Determine significance
        significance = "Significant" if p_value < 0.05 else "Not Significant"
        
        result = {
            'sampleSize': n,
            'sampleMean': round(sample_mean, 4),
            'populationMean': round(population_mean, 4),
            'sampleStdDev': round(sample_std, 4),
            'standardError': round(std_error, 4),
            'tStatistic': round(t_statistic, 4),
            'pValue': round(p_value, 6),
            'degreesOfFreedom': df,
            'significance': significance,
            'interpretation': f'At α=0.05: {significance} (p={round(p_value, 4)})'
        }
        
        return jsonify(result)
    
    except ValueError as e:
        return jsonify({'error': f'Invalid input format: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'error': f'Unexpected error: {str(e)}'}), 500

@app.route('/api/chi-square', methods=['POST'])
def chi_square():
    try:
        # Handle both JSON and file uploads
        if request.is_json:
            data = request.json.get('data', '')
            
            # Split by newlines and filter empty lines
            lines = [line.strip() for line in data.strip().split('\n') if line.strip()]
            
            if len(lines) < 2:
                return jsonify({'error': 'Enter observed (line 1) and expected (line 2) frequencies. Make sure to press Enter between lines.'}), 400
            
            # Parse observed and expected frequencies
            observed = [float(x.strip()) for x in lines[0].split(',') if x.strip()]
            expected = [float(x.strip()) for x in lines[1].split(',') if x.strip()]
        else:
            # Handle CSV file upload
            if 'file' not in request.files:
                return jsonify({'error': 'No file uploaded'}), 400
            
            file = request.files['file']
            if file.filename == '' or not file.filename.endswith('.csv'):
                return jsonify({'error': 'Please upload a CSV file'}), 400
            
            csv_content = file.read().decode('utf-8')
            csv_file = StringIO(csv_content)
            csv_reader = csv.reader(csv_file)
            
            rows = []
            for row in csv_reader:
                values = [float(x.strip()) for x in row if x.strip()]
                if values:
                    rows.append(values)
            
            if len(rows) < 2:
                return jsonify({'error': 'CSV must contain 2 rows: observed and expected frequencies'}), 400
            
            observed = rows[0]
            expected = rows[1]
        
        if not observed:
            return jsonify({'error': 'Observed frequencies cannot be empty'}), 400
        
        if not expected:
            return jsonify({'error': 'Expected frequencies cannot be empty'}), 400
        
        if len(observed) != len(expected):
            return jsonify({'error': f'Observed ({len(observed)}) and expected ({len(expected)}) must have same length'}), 400
        
        if any(e <= 0 for e in expected):
            return jsonify({'error': 'Expected frequencies must be positive values'}), 400
        
        # Check if sums are approximately equal
        sum_obs = sum(observed)
        sum_exp = sum(expected)
        print(f"Sum observed: {sum_obs}, Sum expected: {sum_exp}")
        
        # If sums don't match, normalize expected frequencies
        if abs(sum_obs - sum_exp) > 1e-6:
            print(f"Sums don't match. Normalizing expected frequencies...")
            # Normalize expected to match observed sum
            expected = [(e * sum_obs / sum_exp) for e in expected]
            print(f"Normalized expected: {expected}")
        
        # Calculate chi-square manually for better control
        chi_square_stat = sum((o - e) ** 2 / e for o, e in zip(observed, expected))
        df = len(observed) - 1
        
        # Calculate p-value using chi-square distribution
        p_value = 1 - stats.chi2.cdf(chi_square_stat, df)
        
        # Determine significance
        significance = "Significant" if p_value < 0.05 else "Not Significant"
        
        result = {
            'chiSquareStatistic': round(chi_square_stat, 4),
            'pValue': round(p_value, 6),
            'degreesOfFreedom': df,
            'categories': len(observed),
            'significance': significance,
            'observedSum': round(sum_obs, 2),
            'expectedSum': round(sum(expected), 2),
            'interpretation': f'At α=0.05: {significance} (p={round(p_value, 4)})'
        }
        
        return jsonify(result)
    
    except ValueError as e:
        return jsonify({'error': f'Invalid input format: {str(e)}'}), 400
    except ZeroDivisionError:
        return jsonify({'error': 'Expected frequencies cannot be zero'}), 400
    except Exception as e:
        return jsonify({'error': f'Unexpected error: {str(e)}'}), 500

@app.route('/api/correlation', methods=['POST'])
def correlation():
    try:
        # Handle both JSON and file uploads
        if request.is_json:
            data = request.json.get('data', '')
            
            # Split by newlines and filter empty lines
            lines = [line.strip() for line in data.strip().split('\n') if line.strip()]
            
            if len(lines) < 2:
                return jsonify({'error': 'Enter X values (line 1) and Y values (line 2). Make sure to press Enter between lines.'}), 400
            
            # Parse X and Y values
            x_values = [float(x.strip()) for x in lines[0].split(',') if x.strip()]
            y_values = [float(y.strip()) for y in lines[1].split(',') if y.strip()]
        else:
            # Handle CSV file upload
            if 'file' not in request.files:
                return jsonify({'error': 'No file uploaded'}), 400
            
            file = request.files['file']
            if file.filename == '' or not file.filename.endswith('.csv'):
                return jsonify({'error': 'Please upload a CSV file'}), 400
            
            csv_content = file.read().decode('utf-8')
            csv_file = StringIO(csv_content)
            csv_reader = csv.reader(csv_file)
            
            rows = []
            for row in csv_reader:
                values = [float(x.strip()) for x in row if x.strip()]
                if values:
                    rows.append(values)
            
            if len(rows) < 2:
                return jsonify({'error': 'CSV must contain 2 rows: X values and Y values'}), 400
            
            x_values = rows[0]
            y_values = rows[1]
        
        if not x_values:
            return jsonify({'error': 'X values cannot be empty'}), 400
        
        if not y_values:
            return jsonify({'error': 'Y values cannot be empty'}), 400
        
        if len(x_values) != len(y_values):
            return jsonify({'error': f'X ({len(x_values)}) and Y ({len(y_values)}) must have same length'}), 400
        
        if len(x_values) < 2:
            return jsonify({'error': 'Need at least 2 data points for correlation'}), 400
        
        # Calculate Pearson correlation using scipy
        correlation_coef, p_value = stats.pearsonr(x_values, y_values)
        
        # Coefficient of determination
        r_squared = correlation_coef ** 2
        
        n = len(x_values)
        mean_x = statistics.mean(x_values)
        mean_y = statistics.mean(y_values)
        
        # Determine significance
        significance = "Significant" if p_value < 0.05 else "Not Significant"
        
        result = {
            'n': n,
            'correlationCoefficient': round(correlation_coef, 4),
            'pValue': round(p_value, 6),
            'rSquared': round(r_squared, 4),
            'meanX': round(mean_x, 4),
            'meanY': round(mean_y, 4),
            'significance': significance,
            'interpretation': get_correlation_interpretation(correlation_coef, p_value)
        }
        
        return jsonify(result)
    
    except ValueError as e:
        return jsonify({'error': f'Invalid input format: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'error': f'Unexpected error: {str(e)}'}), 500

def get_correlation_interpretation(r, p_value):
    r_abs = abs(r)
    if r_abs >= 0.9:
        strength = "Very strong"
    elif r_abs >= 0.7:
        strength = "Strong"
    elif r_abs >= 0.5:
        strength = "Moderate"
    elif r_abs >= 0.3:
        strength = "Weak"
    else:
        strength = "Very weak"
    
    direction = "positive" if r > 0 else "negative" if r < 0 else "no"
    sig_text = "significant" if p_value < 0.05 else "not significant"
    
    return f"{strength} {direction} correlation ({sig_text} at α=0.05, p={round(p_value, 4)})"

if __name__ == '__main__':
    app.run(debug=True, port=5000)