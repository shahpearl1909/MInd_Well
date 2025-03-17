let diaryHistory = [];

// Function to update the diary history
function updateDiaryHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = ""; // Clear current list

    if (diaryHistory.length === 0) {
        historyList.innerHTML = "<li>No diary entries found.</li>";
        return;
    }

    diaryHistory.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = `${entry.date}: ${entry.content}`;
        historyList.appendChild(listItem);
    });
}

// Function to log a diary entry
function logDiaryEntry() {
    const diaryEntry = document.getElementById('diaryEntry').value;
    const diaryMessage = document.getElementById('diaryMessage');

    // Check if the entry is empty
    if (!diaryEntry.trim()) {
        diaryMessage.textContent = "Please write something before logging your diary entry.";
        diaryMessage.style.color = "red";
        return;
    }

    // Log the entry with the current date
    const entry = {
        date: new Date().toLocaleDateString(),
        content: diaryEntry
    };

    // Add the entry to the diary history array
    diaryHistory.push(entry);

    // Save to localStorage (optional)
    localStorage.setItem('diaryHistory', JSON.stringify(diaryHistory));

    // Clear the entry input field
    document.getElementById('diaryEntry').value = '';

    // Update the diary history
    updateDiaryHistory();

    // Show success message
    diaryMessage.textContent = "Diary entry logged successfully!";
    diaryMessage.style.color = "green";
}

// Function to toggle the visibility of the diary history
function toggleDiaryHistory() {
    const diaryHistoryDiv = document.getElementById('diaryHistory');
    if (diaryHistoryDiv.style.display === "none") {
        diaryHistoryDiv.style.display = "block";
    } else {
        diaryHistoryDiv.style.display = "none";
    }
}

// Function to prompt the user for confirmation and then clear the history
function confirmClearHistory() {
    const userConfirmed = confirm("Are you sure you want to clear all diary entries? This action cannot be undone.");
    if (userConfirmed) {
        // If confirmed, clear the diary history
        clearDiaryHistory();
    }
}

// Function to clear the diary history
function clearDiaryHistory() {
    // Clear the diary history array
    diaryHistory = [];

    // Clear the history from localStorage
    localStorage.removeItem('diaryHistory');

    // Update the diary history display
    updateDiaryHistory();
}

// Event listener to log a diary entry when the button is clicked
document.getElementById('logDiaryBtn').addEventListener('click', logDiaryEntry);

// Event listener to toggle the history visibility
document.getElementById('toggleHistoryBtn').addEventListener('click', toggleDiaryHistory);

// Event listener to prompt for confirmation before clearing the diary history
document.getElementById('clearHistoryBtn').addEventListener('click', confirmClearHistory);

// Initialize the page with stored diary history from localStorage
window.addEventListener('load', () => {
    const storedHistory = JSON.parse(localStorage.getItem('diaryHistory'));
    if (storedHistory) {
        diaryHistory = storedHistory;
        updateDiaryHistory();
    }
});
