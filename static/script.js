// JavaScript for Red Flag Predictor

document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply to links within the same page
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Form validation and enhancement
    const predictionForm = document.querySelector('#predict form');
    
    if (predictionForm) {
        predictionForm.addEventListener('submit', function(e) {
            // Basic validation
            const inputs = this.querySelectorAll('input[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'var(--danger-color)';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            // Add visual feedback for form submission
            if (isValid) {
                const button = this.querySelector('button[type="submit"]');
                button.innerHTML = 'Processing... 🔍';
                button.disabled = true;
                
                // Re-enable after 2 seconds (just for UX, the form will still submit)
                setTimeout(() => {
                    button.disabled = false;
                    button.innerHTML = 'Predict 🚀';
                }, 2000);
            } else {
                e.preventDefault();
                // Show error message
                const errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                errorMsg.textContent = 'Please fill in all required fields!';
                
                // Remove any existing error messages
                const existingError = this.querySelector('.error-message');
                if (existingError) {
                    existingError.remove();
                }
                
                this.appendChild(errorMsg);
                
                // Auto-remove error after 3 seconds
                setTimeout(() => {
                    errorMsg.remove();
                }, 3000);
            }
        });
        
        // Add visual feedback on input focus
        const formInputs = predictionForm.querySelectorAll('input, select');
        
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.boxShadow = '0 0 0 2px rgba(255, 71, 87, 0.2)';
            });
            
            input.addEventListener('blur', function() {
                this.style.boxShadow = '';
            });
        });
    }
    
    // Style the prediction result based on content
    const predictionResult = document.querySelector('h3');
    
    if (predictionResult && predictionResult.textContent.includes('Prediction:')) {
        const predictionText = predictionResult.textContent.split(':')[1].trim().toLowerCase();
        
        predictionResult.className = 'prediction-result';
        
        if (predictionText.includes('red flag') || predictionText.includes('warning')) {
            predictionResult.classList.add('prediction-red');
        } else if (predictionText.includes('safe') || predictionText.includes('green')) {
            predictionResult.classList.add('prediction-green');
        } else {
            predictionResult.classList.add('prediction-yellow');
        }
    }
});
