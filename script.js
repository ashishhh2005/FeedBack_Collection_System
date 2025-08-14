document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.getElementById('feedbackForm');
    const feedbackList = document.getElementById('feedbackList');
    const totalFeedbackCount = document.getElementById('totalFeedbackCount');
    const averageRatingElement = document.getElementById('averageRating');
    const stars = document.querySelectorAll('.star');
    
    let feedbacks = [];
    let selectedRating = 0;

    // Handle star rating selection
    stars.forEach(star => {
        star.addEventListener('click', (e) => {
            selectedRating = parseInt(e.target.dataset.value);
            updateStarDisplay(selectedRating);
        });
    });

    function updateStarDisplay(rating) {
        stars.forEach(star => {
            star.classList.remove('selected');
        });
        for (let i = 0; i < rating; i++) {
            stars[i].classList.add('selected');
        }
    }

    // Handle form submission
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic form validation
        if (selectedRating === 0 || document.getElementById('comments').value.trim() === '') {
            alert('Please provide a rating and comments.');
            return;
        }

        const newFeedback = {
            name: document.getElementById('name').value || 'Anonymous',
            category: document.getElementById('category').value,
            rating: selectedRating,
            comments: document.getElementById('comments').value
        };

        feedbacks.push(newFeedback);
        renderFeedbackList();
        updateDashboardStats();
        feedbackForm.reset();
        selectedRating = 0;
        updateStarDisplay(0);
    });

    // Render feedback items to the DOM
    function renderFeedbackList() {
        feedbackList.innerHTML = ''; // Clear existing list
        feedbacks.forEach(feedback => {
            const feedbackItem = document.createElement('div');
            feedbackItem.classList.add('feedback-item');
            feedbackItem.innerHTML = `
                <h4>${feedback.name}</h4>
                <p><strong>Rating:</strong> ${'★'.repeat(feedback.rating)}</p>
                <p><strong>Category:</strong> ${feedback.category}</p>
                <p>${feedback.comments}</p>
            `;
            feedbackList.appendChild(feedbackItem);
        });
    }

    // Update the dashboard statistics
    function updateDashboardStats() {
        totalFeedbackCount.textContent = feedbacks.length;
        if (feedbacks.length > 0) {
            const totalRating = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
            const average = (totalRating / feedbacks.length).toFixed(1);
            averageRatingElement.textContent = average;
        } else {
            averageRatingElement.textContent = '0.0';
        }
    }
});