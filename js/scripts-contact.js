document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const commentInput = document.getElementById("comment");
    const errorMessages = document.querySelectorAll(".error-message");
    const infoMessages = document.querySelectorAll(".info-message");

    let form_errors = [];
    
    nameInput.addEventListener("input", () => {
        const nameVal = nameInput.value;
        const noSpecialChars = /^[a-zA-Z\s.,-]*$/;

        if (!noSpecialChars.test(nameVal)) {
            nameInput.value = nameVal.slice(0, -1);
            const errorMsg = "Illegal character entered!";
            errorMessages[0].textContent = errorMsg;
            nameVal.setCustomValidity(errorMsg);
            form_errors.push({ field: "name", message: errorMsg });
            setTimeout(() => {
                errorMessages[0].textContent = "";
            }, 3000);
        } else if (nameInput.validity.valueMissing) {
            const errorMsg = "Name is required!";
            errorMessages[0].textContent = errorMsg;
            emailInput.setCustomValidity(errorMsg);
            form_errors.push({ field: "name", message: errorMsg });
            setTimeout(() => {
                errorMessages[0].textContent = "";
            }, 3000);
        } else {
            errorMessages[0].textContent = "";
        }
    });

    emailInput.addEventListener("input", () => {
        const emailVal = emailInput.value;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;
        const noSpecialChars = /^[a-zA-Z0-9.!#@$%&'*+/=?^_`{|}~-]*$/;

        if (!noSpecialChars.test(emailVal)) {
            emailInput.value = emailVal.slice(0, -1);
            const errorMsg = "Illegal character entered!";
            errorMessages[1].textContent = errorMsg;
            emailInput.setCustomValidity(errorMsg);
            form_errors.push({ field: "email", message: errorMsg });
            setTimeout(() => {
                errorMessages[1].textContent = "";
            }, 3000);
        } else if (!emailRegex.test(emailVal)) {
            const errorMsg = "Not a valid email address!";
            errorMessages[1].textContent = errorMsg;
            emailInput.setCustomValidity(errorMsg);
            form_errors.push({ field: "email", message: errorMsg });
            setTimeout(() => {
                errorMessages[1].textContent = "";
            }, 3000);
        } else if (emailInput.validity.valueMissing) {
            const errorMsg = "Email is required!";
            errorMessages[1].textContent = errorMsg;
            emailInput.setCustomValidity(errorMsg);
            form_errors.push({ field: "email", message: errorMsg });
            setTimeout(() => {
                errorMessages[1].textContent = "";
            }, 3000);
        } else {
            errorMessages[1].textContent = "";
            emailInput.setCustomValidity("");
        }
    });

    commentInput.addEventListener("input", () => {
        const comVal = commentInput.value;
        const noSpecialChars = /^[a-zA-Z0-9\s:.,'"()!?-]*$/;

        if (!noSpecialChars.test(comVal)) {
            commentInput.value = comVal.slice(0, -1);
            const errorMsg = "Illegal character entered!";
            errorMessages[2].textContent = errorMsg;
            commentInput.setCustomValidity(errorMsg);
            form_errors.push({ field: "comment", message: errorMsg });
            setTimeout(() => {
                errorMessages[2].textContent = "";
            }, 3000);
        } else if (commentInput.validity.valueMissing) {
            const errorMsg = "Comment is required!";
            errorMessages[2].textContent = errorMsg;
            commentInput.setCustomValidity(errorMsg);
            form_errors.push({ field: "comment", message: errorMsg });
            setTimeout(() => {
                errorMessages[2].textContent = "";
            }, 3000);
        } else {
            errorMessages[2].textContent = "";
            commentInput.setCustomValidity("");
        }
        
        if (comVal.trim() !== "") { 
            infoMessages[2].textContent = `${commentInput.maxLength - comVal.length} characters left`;
            if (commentInput.maxLength - comVal.length <= 20 && commentInput.maxLength - comVal.length > 1) {
                infoMessages[2].style.color = "orange";
            } else if (commentInput.maxLength - comVal.length == 0) {
                infoMessages[2].style.color = "red";
                infoMessages[2].textContent =
                    "You have reached the character limit!";
            } else {
                infoMessages[2].style.color = "green";
            }
        } else {
            infoMessages[2].textContent = "";
        }
    });

    form.addEventListener("submit", (e) => {
        // if not valid, prevent submit
        if (!form.checkValidity()) {
            e.preventDefault();
        }
        const errors = document.createElement("input");
        errors.type = "hidden";
        errors.name = "form-errors";
        errors.value = JSON.stringify(form_errors);
        console.log(errors.value);
        form.appendChild(errors);
    });
});
