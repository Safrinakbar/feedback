document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault();
    setTimeout(function() {
        var successMessage = document.getElementById('success-message');
        successMessage.textContent = 'Feedback submitted successfully!';
        successMessage.style.display = 'block';
        document.getElementById('feedback-form').reset();
    }, 500);
});
