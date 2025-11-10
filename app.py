from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import math
import statistics

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/descriptive-stats', methods=['POST'])
def descriptive_stats():
    try:
        data = request.json.get('data', '')
        numbers = [float(x.strip()) for x in data.split(',') if x.strip()]
        
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
        data = request.json.get('data', '')
        lines = data.strip().split('\n')
        
        if len(lines) < 2:
            return jsonify({'error': 'Enter sample data (line 1) and population mean (line 2)'}), 400
        
        # Parse sample data
        sample = [float(x.strip()) for x in lines[0].split(',') if x.strip()]
        population_mean = float(lines[1].strip())
        
        if not sample:
            return jsonify({'error': 'Invalid sample data'}), 400
        
        # Calculate t-test
        n = len(sample)
        sample_mean = statistics.mean(sample)
        
        if n > 1:
            sample_std = statistics.stdev(sample)
            std_error = sample_std / math.sqrt(n)
            t_statistic = (sample_mean - population_mean) / std_error
        else:
            return jsonify({'error': 'Need at least 2 data points'}), 400
        
        df = n - 1
        
        result = {
            'sampleSize': n,
            'sampleMean': round(sample_mean, 4),
            'populationMean': round(population_mean, 4),
            'sampleStdDev': round(sample_std, 4),
            'standardError': round(std_error, 4),
            'tStatistic': round(t_statistic, 4),
            'degreesOfFreedom': df,
            'note': '|t| > 2.0 suggests significance at α=0.05 for most cases'
        }
        
        return jsonify(result)
    
    except ValueError:
        return jsonify({'error': 'Invalid input format'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/chi-square', methods=['POST'])
def chi_square():
    try:
        data = request.json.get('data', '')
        lines = data.strip().split('\n')
        
        if len(lines) < 2:
            return jsonify({'error': 'Enter observed (line 1) and expected (line 2) frequencies'}), 400
        
        observed = [float(x.strip()) for x in lines[0].split(',') if x.strip()]
        expected = [float(x.strip()) for x in lines[1].split(',') if x.strip()]
        
        if len(observed) != len(expected):
            return jsonify({'error': 'Observed and expected must have same length'}), 400
        
        if not observed or not expected:
            return jsonify({'error': 'Invalid frequency data'}), 400
        
        # Calculate chi-square
        chi_square_stat = sum((o - e) ** 2 / e for o, e in zip(observed, expected))
        df = len(observed) - 1
        
        result = {
            'chiSquareStatistic': round(chi_square_stat, 4),
            'degreesOfFreedom': df,
            'categories': len(observed),
            'note': 'χ² > 3.84 suggests significance at α=0.05 for df=1, χ² > 5.99 for df=2'
        }
        
        return jsonify(result)
    
    except ValueError:
        return jsonify({'error': 'Invalid input format'}), 400
    except ZeroDivisionError:
        return jsonify({'error': 'Expected frequencies cannot be zero'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/correlation', methods=['POST'])
def correlation():
    try:
        data = request.json.get('data', '')
        lines = data.strip().split('\n')
        
        if len(lines) < 2:
            return jsonify({'error': 'Enter X values (line 1) and Y values (line 2)'}), 400
        
        x_values = [float(x.strip()) for x in lines[0].split(',') if x.strip()]
        y_values = [float(y.strip()) for y in lines[1].split(',') if y.strip()]
        
        if len(x_values) != len(y_values):
            return jsonify({'error': 'X and Y must have same length'}), 400
        
        if len(x_values) < 2:
            return jsonify({'error': 'Need at least 2 data points'}), 400
        
        # Calculate correlation coefficient
        n = len(x_values)
        mean_x = statistics.mean(x_values)
        mean_y = statistics.mean(y_values)
        
        # Pearson correlation coefficient
        numerator = sum((x - mean_x) * (y - mean_y) for x, y in zip(x_values, y_values))
        denominator = math.sqrt(
            sum((x - mean_x) ** 2 for x in x_values) * 
            sum((y - mean_y) ** 2 for y in y_values)
        )
        
        if denominator == 0:
            correlation_coef = 0
        else:
            correlation_coef = numerator / denominator
        
        # Coefficient of determination
        r_squared = correlation_coef ** 2
        
        result = {
            'n': n,
            'correlationCoefficient': round(correlation_coef, 4),
            'rSquared': round(r_squared, 4),
            'meanX': round(mean_x, 4),
            'meanY': round(mean_y, 4),
            'interpretation': get_correlation_interpretation(correlation_coef)
        }
        
        return jsonify(result)
    
    except ValueError:
        return jsonify({'error': 'Invalid input format'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def get_correlation_interpretation(r):
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
    return f"{strength} {direction} correlation"

if __name__ == '__main__':
    app.run(debug=True, port=5000)