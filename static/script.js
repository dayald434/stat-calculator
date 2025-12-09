// Tab switching functionality
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');
        
        // Remove active class from all tabs and buttons
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(tabName).classList.add('active');
        
        // Clear previous results
        document.getElementById(`${tabName}-result`).innerHTML = '';
    });
});

// Handle CSV file upload
function handleFileUpload(input, tabName) {
    const filenameSpan = document.getElementById(`${tabName}-filename`);
    if (input.files.length > 0) {
        filenameSpan.textContent = `✓ ${input.files[0].name}`;
    } else {
        filenameSpan.textContent = '';
    }
}

// Helper function to display results
function displayResult(elementId, data, isError = false) {
    const resultDiv = document.getElementById(elementId);
    resultDiv.className = isError ? 'result error' : 'result success';
    
    if (isError) {
        resultDiv.innerHTML = `<p><strong>❌ Error:</strong> ${data}</p>`;
        return;
    }
    
    resultDiv.innerHTML = data;
}

// Calculate Descriptive Statistics
async function calculateDescriptive() {
    const input = document.getElementById('descriptive-input').value;
    const fileInput = document.getElementById('descriptive-file');
    
    // Check if file is uploaded
    if (fileInput.files.length > 0) {
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);
        
        try {
            const response = await fetch('/api/descriptive-stats', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                displayResult('descriptive-result', result.error, true);
                return;
            }
            
            displayDescriptiveResult(result);
        } catch (error) {
            displayResult('descriptive-result', `Network error: ${error.message}`, true);
        }
        return;
    }
    
    // Otherwise use text input
    if (!input.trim()) {
        displayResult('descriptive-result', 'Please enter some numbers or upload a CSV file', true);
        return;
    }
    
    try {
        const response = await fetch('/api/descriptive-stats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: input })
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            displayResult('descriptive-result', result.error, true);
            return;
        }
        
        displayDescriptiveResult(result);
    } catch (error) {
        displayResult('descriptive-result', 'Failed to connect to server', true);
    }
}

function displayDescriptiveResult(result) {
    const html = `
        <h3>📊 Descriptive Statistics Results</h3>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-label">Count</div>
                <div class="stat-value">${result.count}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Sum</div>
                <div class="stat-value">${result.sum}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Mean</div>
                <div class="stat-value">${result.mean}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Median</div>
                <div class="stat-value">${result.median}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Mode</div>
                <div class="stat-value">${result.mode}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Variance</div>
                <div class="stat-value">${result.variance}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Std Deviation</div>
                <div class="stat-value">${result.stdDev}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Minimum</div>
                <div class="stat-value">${result.min}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Maximum</div>
                <div class="stat-value">${result.max}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Range</div>
                <div class="stat-value">${result.range}</div>
            </div>
        </div>
    `;
    
    displayResult('descriptive-result', html);
    
    // Create chart if raw data is available
    if (result.rawData) {
        createDescriptiveChart(result, result.rawData);
    }
}

// Calculate T-Test
async function calculateTTest() {
    const input = document.getElementById('ttest-input').value;
    const fileInput = document.getElementById('ttest-file');
    
    // Check if file is uploaded
    if (fileInput.files.length > 0) {
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);
        
        try {
            const response = await fetch('/api/t-test', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                displayResult('ttest-result', result.error, true);
                return;
            }
            
            displayTTestResult(result);
        } catch (error) {
            displayResult('ttest-result', `Network error: ${error.message}`, true);
        }
        return;
    }
    
    if (!input.trim()) {
        displayResult('ttest-result', 'Please enter sample data and population mean', true);
        return;
    }
    
    try {
        const response = await fetch('/api/t-test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: input })
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            displayResult('ttest-result', result.error, true);
            return;
        }
        
        displayTTestResult(result);
    } catch (error) {
        displayResult('ttest-result', 'Failed to connect to server', true);
    }
}

function displayTTestResult(result) {
    const html = `
        <h3>🔬 One-Sample T-Test Results</h3>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-label">Sample Size</div>
                <div class="stat-value">${result.sampleSize}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Sample Mean</div>
                <div class="stat-value">${result.sampleMean}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Population Mean</div>
                <div class="stat-value">${result.populationMean}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Sample Std Dev</div>
                <div class="stat-value">${result.sampleStdDev}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Standard Error</div>
                <div class="stat-value">${result.standardError}</div>
            </div>
            <div class="stat-card highlight">
                <div class="stat-label">T-Statistic</div>
                <div class="stat-value">${result.tStatistic}</div>
            </div>
            <div class="stat-card highlight">
                <div class="stat-label">P-Value</div>
                <div class="stat-value">${result.pValue}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Degrees of Freedom</div>
                <div class="stat-value">${result.degreesOfFreedom}</div>
            </div>
            <div class="stat-card ${result.significance === 'Significant' ? 'significant' : 'not-significant'}">
                <div class="stat-label">Result</div>
                <div class="stat-value">${result.significance}</div>
            </div>
        </div>
        <div class="note">
            <strong>📝 Interpretation:</strong> ${result.interpretation}
        </div>
    `;
    
    displayResult('ttest-result', html);
    
    // Create chart if sample data is available
    if (result.sampleData && result.popMean !== undefined) {
        createTTestChart(result, result.sampleData, result.popMean);
    }
}

// Calculate Chi-Square
async function calculateChiSquare() {
    const input = document.getElementById('chisquare-input').value;
    const fileInput = document.getElementById('chisquare-file');
    
    // Check if file is uploaded
    if (fileInput.files.length > 0) {
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);
        
        try {
            const response = await fetch('/api/chi-square', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                displayResult('chisquare-result', result.error, true);
                return;
            }
            
            displayChiSquareResult(result);
        } catch (error) {
            displayResult('chisquare-result', `Network error: ${error.message}`, true);
        }
        return;
    }
    
    if (!input.trim()) {
        displayResult('chisquare-result', 'Please enter observed and expected frequencies or upload CSV', true);
        return;
    }
    
    try {
        const response = await fetch('/api/chi-square', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: input })
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            displayResult('chisquare-result', result.error, true);
            return;
        }
        
        displayChiSquareResult(result);
    } catch (error) {
        displayResult('chisquare-result', 'Failed to connect to server', true);
    }
}

function displayChiSquareResult(result) {
        
        const html = `
            <h3>📊 Chi-Square Test Results</h3>
            <div class="stats-grid">
                <div class="stat-card highlight">
                    <div class="stat-label">Chi-Square Statistic</div>
                    <div class="stat-value">${result.chiSquareStatistic}</div>
                </div>
                <div class="stat-card highlight">
                    <div class="stat-label">P-Value</div>
                    <div class="stat-value">${result.pValue}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Degrees of Freedom</div>
                    <div class="stat-value">${result.degreesOfFreedom}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Categories</div>
                    <div class="stat-value">${result.categories}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Observed Sum</div>
                    <div class="stat-value">${result.observedSum}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Expected Sum</div>
                    <div class="stat-value">${result.expectedSum}</div>
                </div>
                <div class="stat-card ${result.significance === 'Significant' ? 'significant' : 'not-significant'}">
                    <div class="stat-label">Result</div>
                    <div class="stat-value">${result.significance}</div>
                </div>
            </div>
            <div class="note">
                <strong>📝 Interpretation:</strong> ${result.interpretation}
            </div>
        `;
        
        displayResult('chisquare-result', html);
        
        // Create chart if observed and expected data are available
        if (result.observed && result.expected) {
            createChiSquareChart(result, result.observed, result.expected);
        }
}

// Calculate Correlation
async function calculateCorrelation() {
    const input = document.getElementById('correlation-input').value;
    const fileInput = document.getElementById('correlation-file');
    
    // Check if file is uploaded
    if (fileInput.files.length > 0) {
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);
        
        try {
            const response = await fetch('/api/correlation', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                displayResult('correlation-result', result.error, true);
                return;
            }
            
            displayCorrelationResult(result);
        } catch (error) {
            displayResult('correlation-result', `Network error: ${error.message}`, true);
        }
        return;
    }
    
    if (!input.trim()) {
        displayResult('correlation-result', 'Please enter X and Y values or upload CSV', true);
        return;
    }
    
    try {
        const response = await fetch('/api/correlation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: input })
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            displayResult('correlation-result', result.error, true);
            return;
        }
        
        displayCorrelationResult(result);
    } catch (error) {
        displayResult('correlation-result', 'Failed to connect to server', true);
    }
}

function displayCorrelationResult(result) {
        
        const html = `
            <h3>📉 Correlation Analysis Results</h3>
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-label">Sample Size (n)</div>
                    <div class="stat-value">${result.n}</div>
                </div>
                <div class="stat-card highlight">
                    <div class="stat-label">Correlation Coefficient (r)</div>
                    <div class="stat-value">${result.correlationCoefficient}</div>
                </div>
                <div class="stat-card highlight">
                    <div class="stat-label">P-Value</div>
                    <div class="stat-value">${result.pValue}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">R-Squared (r²)</div>
                    <div class="stat-value">${result.rSquared}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Mean X</div>
                    <div class="stat-value">${result.meanX}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Mean Y</div>
                    <div class="stat-value">${result.meanY}</div>
                </div>
                <div class="stat-card ${result.significance === 'Significant' ? 'significant' : 'not-significant'}">
                    <div class="stat-label">Result</div>
                    <div class="stat-value">${result.significance}</div>
                </div>
            </div>
            <div class="note">
                <strong>📝 Interpretation:</strong> ${result.interpretation}
            </div>
        `;
        
        displayResult('correlation-result', html);
        
        // Create chart if X and Y values are available
        if (result.xValues && result.yValues) {
            createCorrelationChart(result, result.xValues, result.yValues);
        }
}

// Add Enter key support for textareas
document.querySelectorAll('textarea').forEach(textarea => {
    textarea.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            const tabId = textarea.closest('.tab-content').id;
            
            switch(tabId) {
                case 'descriptive':
                    calculateDescriptive();
                    break;
                case 'ttest':
                    calculateTTest();
                    break;
                case 'chisquare':
                    calculateChiSquare();
                    break;
                case 'correlation':
                    calculateCorrelation();
                    break;
            }
        }
    });
});

// Add visual feedback on button click
document.querySelectorAll('.btn-calculate').forEach(button => {
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 100);
    });
});

// Chart instances to keep track of created charts
let charts = {
    descriptive: null,
    ttest: null,
    chisquare: null,
    correlation: null
};

// Create histogram for descriptive statistics with frequency distribution
function createDescriptiveChart(data, numbers) {
    const container = document.getElementById('descriptive-chart-container');
    const ctx = document.getElementById('descriptive-chart');
    
    // Destroy existing chart if it exists
    if (charts.descriptive) {
        charts.descriptive.destroy();
    }
    
    // Show container
    container.style.display = 'block';
    
    // Create bins for histogram (frequency distribution)
    const min = Math.floor(data.min);
    const max = Math.ceil(data.max);
    const binCount = Math.min(10, Math.max(5, Math.ceil(Math.sqrt(numbers.length))));
    const binWidth = (max - min) / binCount || 1;
    
    // Create bins
    const bins = new Array(binCount).fill(0);
    const binLabels = [];
    
    for (let i = 0; i < binCount; i++) {
        const binStart = min + (i * binWidth);
        const binEnd = binStart + binWidth;
        binLabels.push(`${binStart.toFixed(1)}-${binEnd.toFixed(1)}`);
    }
    
    // Count frequencies
    numbers.forEach(num => {
        const binIndex = Math.floor((num - min) / binWidth);
        if (binIndex >= 0 && binIndex < binCount) {
            bins[binIndex]++;
        }
    });
    
    // Create histogram
    charts.descriptive = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: binLabels,
            datasets: [{
                label: 'Frequency',
                data: bins,
                backgroundColor: 'rgba(102, 126, 234, 0.6)',
                borderColor: 'rgba(102, 126, 234, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                title: {
                    display: true,
                    text: `Frequency Distribution (Mean=${data.mean}, Median=${data.median}, StdDev=${data.stdDev})`,
                    font: { size: 14, weight: 'bold' }
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    },
                    title: {
                        display: true,
                        text: 'Frequency (Count)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Value Range'
                    }
                }
            }
        }
    });
}

// Create comparison chart for T-Test - shows sample distribution vs population mean
function createTTestChart(result, sampleData, popMean) {
    const container = document.getElementById('ttest-chart-container');
    const ctx = document.getElementById('ttest-chart');
    
    if (charts.ttest) {
        charts.ttest.destroy();
    }
    
    container.style.display = 'block';
    
    // Create bins for sample data distribution
    const min = Math.min(...sampleData);
    const max = Math.max(...sampleData);
    const binCount = Math.max(3, Math.ceil(Math.sqrt(sampleData.length)));
    const binWidth = (max - min) / binCount || 1;
    
    const bins = new Array(binCount).fill(0);
    const binLabels = [];
    
    for (let i = 0; i < binCount; i++) {
        const binStart = min + (i * binWidth);
        const binEnd = binStart + binWidth;
        binLabels.push(`${binStart.toFixed(1)}-${binEnd.toFixed(1)}`);
    }
    
    sampleData.forEach(num => {
        const binIndex = Math.floor((num - min) / binWidth);
        if (binIndex >= 0 && binIndex < binCount) {
            bins[binIndex]++;
        }
    });
    
    // Create chart with sample distribution and population mean line
    charts.ttest = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: binLabels,
            datasets: [{
                label: 'Sample Distribution',
                data: bins,
                backgroundColor: 'rgba(102, 126, 234, 0.6)',
                borderColor: 'rgba(102, 126, 234, 1)',
                borderWidth: 2
            }, {
                label: 'Population Mean',
                data: new Array(binCount).fill(popMean),
                type: 'line',
                borderColor: 'rgba(231, 76, 60, 1)',
                borderWidth: 3,
                borderDash: [5, 5],
                pointRadius: 0,
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: `One-Sample T-Test: ${result.significance} ${result.significance === 'Significant' ? '✓' : '✗'} (t=${result.tStatistic}, p=${result.pValue})`,
                    font: { size: 14, weight: 'bold' },
                    color: result.significance === 'Significant' ? 'rgba(231, 76, 60, 1)' : 'rgba(46, 204, 113, 1)'
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    },
                    title: {
                        display: true,
                        text: 'Frequency'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Value Range'
                    }
                }
            }
        }
    });
}

// Create bar chart for Chi-Square
function createChiSquareChart(result, observed, expected) {
    const container = document.getElementById('chisquare-chart-container');
    const ctx = document.getElementById('chisquare-chart');
    
    if (charts.chisquare) {
        charts.chisquare.destroy();
    }
    
    container.style.display = 'block';
    
    const categories = observed.map((_, i) => `Category ${i + 1}`);
    
    charts.chisquare = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                label: 'Observed',
                data: observed,
                backgroundColor: 'rgba(102, 126, 234, 0.6)',
                borderColor: 'rgba(102, 126, 234, 1)',
                borderWidth: 2
            }, {
                label: 'Expected',
                data: expected,
                backgroundColor: 'rgba(231, 76, 60, 0.6)',
                borderColor: 'rgba(231, 76, 60, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: `Chi-Square Test: ${result.significance} ${result.significance === 'Significant' ? '✓' : '✗'} (χ²=${result.chiSquareStatistic}, p=${result.pValue})`,
                    font: { size: 14, weight: 'bold' },
                    color: result.significance === 'Significant' ? 'rgba(231, 76, 60, 1)' : 'rgba(46, 204, 113, 1)'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Frequency'
                    }
                }
            }
        }
    });
}

// Create scatter plot for Correlation
function createCorrelationChart(result, xValues, yValues) {
    const container = document.getElementById('correlation-chart-container');
    const ctx = document.getElementById('correlation-chart');
    
    if (charts.correlation) {
        charts.correlation.destroy();
    }
    
    container.style.display = 'block';
    
    // Create scatter data
    const scatterData = xValues.map((x, i) => ({ x: x, y: yValues[i] }));
    
    // Calculate regression line
    const n = xValues.length;
    const sumX = xValues.reduce((a, b) => a + b, 0);
    const sumY = yValues.reduce((a, b) => a + b, 0);
    const sumXY = xValues.reduce((sum, x, i) => sum + x * yValues[i], 0);
    const sumXX = xValues.reduce((sum, x) => sum + x * x, 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const regressionLine = [
        { x: minX, y: slope * minX + intercept },
        { x: maxX, y: slope * maxX + intercept }
    ];
    
    charts.correlation = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Data Points',
                data: scatterData,
                backgroundColor: 'rgba(102, 126, 234, 0.6)',
                borderColor: 'rgba(102, 126, 234, 1)',
                pointRadius: 6,
                pointHoverRadius: 8
            }, {
                label: 'Regression Line',
                data: regressionLine,
                type: 'line',
                borderColor: 'rgba(231, 76, 60, 1)',
                borderWidth: 2,
                pointRadius: 0,
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: `Pearson Correlation: ${result.significance} ${result.significance === 'Significant' ? '✓' : '✗'} (r=${result.correlationCoefficient}, p=${result.pValue}, R²=${result.rSquared})`,
                    font: { size: 14, weight: 'bold' },
                    color: result.significance === 'Significant' ? 'rgba(231, 76, 60, 1)' : 'rgba(46, 204, 113, 1)'
                },
                legend: {
                    display: true
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'X Values'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Y Values'
                    }
                }
            }
        }
    });
}

console.log('📊 Statistical Calculator loaded successfully!');