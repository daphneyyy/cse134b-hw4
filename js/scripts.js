document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const commentInput = document.getElementById("comment");
    const errorMessages = document.querySelectorAll(".error-message");
    const infoMessages = document.querySelectorAll(".info-message");

    // Event listener for the name input
    nameInput.addEventListener("input", (e) => {
        const nameVal = nameInput.value;
        if (!/^[a-zA-Z\s.,-]+$/.test(nameVal)) {
            nameInput.value = nameVal.slice(0, -1);
            errorMessages[0].textContent = "Illegal character entered!";
            setTimeout(() => {
                errorMessages[0].textContent = "";
            }, 3000);
        } else {
            errorMessages[0].textContent = "";
        }
    });

    // Event listener for the email input
    emailInput.addEventListener("input", (e) => {
        const emailVal = emailInput.value;
        if (!/^[a-zA-Z0-9@.]+$/.test(emailVal)) {
            emailInput.value = emailVal.slice(0, -1);
            errorMessages[1].textContent = "Illegal character entered!";
            setTimeout(() => {
                errorMessages[1].textContent = "";
            }, 3000);
        } else if (!/^\w+@\w+\.\w+$/.test(emailVal)) {
            errorMessages[1].textContent = "Not a valid email address!";
        } else {
            errorMessages[1].textContent = "";
        }
    });

    // Event listener for the comment input
    commentInput.addEventListener("input", () => {
        const comVal = commentInput.value;
        if (!/^[a-zA-Z0-9\s.,!?-]+$/.test(comVal)) {
            commentInput.value = comVal.slice(0, -1);
            errorMessages[2].textContent = "Illegal character entered!";
            setTimeout(() => {
                errorMessages[2].textContent = "";
            }, 3000);
        } else {
            errorMessages[2].textContent = "";
        }

        infoMessages[2].textContent = `${commentInput.maxLength - comVal.length} characters left`;
        if (commentInput.maxLength - comVal.length <= 20) {
            infoMessages[2].style.color = "orange";
        } else if (commentInput.maxLength - comVal.length <= 0) {
            infoMessages[2].style.color = "red";
            infoMessages[2].textContent = "You have reached the character limit!";
        } else {
            infoMessages[2].style.color = "green";
        }
    });

    // Event listener for form submission
    form.addEventListener("submit", (event) => {
        validateInput(nameInput, errorMessages[0]);
        validateInput(emailInput, errorMessages[1]);
        validateInput(commentInput, errorMessages[2]);

        // Prevent form submission if there are errors
        if (!form.checkValidity()) {
            event.preventDefault();
        }
    });

    // Function to validate input and set custom validity message
    function validateInput(input, errorMessage) {
        if (!input.validity.valid) {
            input.setCustomValidity(errorMessage.textContent.trim() || "Invalid input.");
        } else {
            input.setCustomValidity("");
        }
    }
});
