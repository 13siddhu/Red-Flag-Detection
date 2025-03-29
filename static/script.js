document.addEventListener("DOMContentLoaded", function() {
    console.log("JavaScript Loaded 🚀");

    // Simple animation for form fields
    let inputs = document.querySelectorAll("input, select");

    inputs.forEach(input => {
        input.addEventListener("focus", function() {
            this.style.backgroundColor = "#222";
            this.style.color = "#ffcc00";
        });

        input.addEventListener("blur", function() {
            this.style.backgroundColor = "#fff";
            this.style.color = "#000";
        });
    });
});
