// Initialize Chart.js
let moodChart;
const ctx = document.createElement('canvas');
document.getElementById('moodChart').appendChild(ctx);

// Get mood entries from localStorage or initialize empty array
let moodEntries = JSON.parse(localStorage.getItem('moodEntries')) || [];

// Create or update chart
function updateChart() {
    const data = {
        labels: moodEntries.map(entry => entry.date),
        datasets: [{
            label: 'Mood Level',
            data: moodEntries.map(entry => entry.mood),
            borderColor: '#f43f5e',
            backgroundColor: 'rgba(244, 63, 94, 0.1)',
            tension: 0.4,
            fill: true
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            scales: {
                y: {
                    min: 1,
                    max: 10,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        afterLabel: function(context) {
                            const entry = moodEntries[context.dataIndex];
                            return entry.notes ? `Notes: ${entry.notes}` : '';
                        }
                    }
                }
            }
        }
    };

    if (moodChart) {
        moodChart.destroy();
    }
    moodChart = new Chart(ctx, config);
}

// Handle form submission
document.getElementById('moodForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const mood = parseInt(document.getElementById('moodRange').value);
    const notes = document.getElementById('moodNotes').value;
    const date = new Date().toISOString().split('T')[0];

    const newEntry = { date, mood, notes };
    moodEntries.push(newEntry);
    
    // Save to localStorage
    localStorage.setItem('moodEntries', JSON.stringify(moodEntries));
    
    // Update chart
    updateChart();
    
    // Reset form
    document.getElementById('moodNotes').value = '';
    
    // Show success message
    alert('Mood logged successfully!');
});

// Initialize chart on page load
if (moodEntries.length > 0) {
    updateChart();
}





// Function to update the mood history
function updateMoodHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = ""; // Clear current list

    if (moodEntries.length === 0) {
        historyList.innerHTML = "<li>No mood entries found.</li>";
        return;
    }

    moodEntries.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = `${entry.date} - Mood: ${entry.mood} - Notes: ${entry.notes || 'No notes'}`;
        historyList.appendChild(listItem);
    });
}

// Function to toggle the visibility of the mood history
function toggleMoodHistory(event) {
    event.preventDefault(); // Prevent form submission if any

    const moodHistoryDiv = document.getElementById('moodHistory');
    if (moodHistoryDiv.style.display === "none") {
        moodHistoryDiv.style.display = "block";
    } else {
        moodHistoryDiv.style.display = "none";
    }
}

// Event listener to toggle the mood history visibility
document.getElementById('toggleHistoryBtn').addEventListener('click', toggleMoodHistory);

// Handle form submission for mood logging
document.getElementById('moodForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const mood = parseInt(document.getElementById('moodRange').value);
    const notes = document.getElementById('moodNotes').value;
    const date = new Date().toISOString().split('T')[0];

    const newEntry = { date, mood, notes };
    moodEntries.push(newEntry);
    
    // Save to localStorage
    localStorage.setItem('moodEntries', JSON.stringify(moodEntries));
    
    // Update chart
    updateChart();
    
    // Reset form
    document.getElementById('moodNotes').value = '';
    
    // Show success message
    alert('Mood logged successfully!');
});

// Initialize the page with stored mood entries from localStorage
window.addEventListener('load', () => {
    const storedEntries = JSON.parse(localStorage.getItem('moodEntries'));
    if (storedEntries) {
        moodEntries = storedEntries;
        updateChart(); // Rebuild the chart with existing data
        updateMoodHistory(); // Show the mood history on page load
    }
});
