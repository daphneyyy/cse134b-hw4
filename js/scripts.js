document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const commentInput = document.getElementById("comment");
    const errorMessages = document.querySelectorAll(".error-message");
    const infoMessages = document.querySelectorAll(".info-message");

    let form_errors = [];

    nameInput.addEventListener("input", (e) => {
        const nameVal = nameInput.value;
        if (!/^[a-zA-Z\s.,-]+$/.test(nameVal)) {
            nameInput.value = nameVal.slice(0, -1);
            const errorMsg = "Illegal character entered!";
            errorMessages[0].textContent = errorMsg;
            nameVal.setCustomValidity(errorMsg);
            form_errors.push({field: "name", message: errorMsg})
            setTimeout(() => {
                errorMessages[0].textContent = "";
            }, 3000);
        } else {
            errorMessages[0].textContent = "";
        }
    });

    emailInput.addEventListener("input", (e) => {
        const emailVal = emailInput.value;
        if (!/^[\w\d@._]+$/.test(emailVal)) {
            emailInput.value = emailVal.slice(0, -1);
            const errorMsg = "Illegal!";
            errorMessages[1].textContent = errorMsg;
            emailInput.setCustomValidity(errorMsg);
            form_errors.push({field: "email", message: errorMsg});
            setTimeout(() => {
                errorMessages[1].textContent = "";
            }, 3000);
        } else {
            errorMessages[1].textContent = "";
        }
    });

    commentInput.addEventListener("input", () => {
        const comVal = commentInput.value;
        if (!/^[a-zA-Z0-9\s:.,'"()!?-]+$/.test(comVal)) {
            commentInput.value = comVal.slice(0, -1);
            const errorMsg = "Illegal character entered!";
            errorMessages[2].textContent = errorMsg;
            emailInput.setCustomValidity(errorMsg);
            form_errors.push({field: "comment", message: errorMsg});
            setTimeout(() => {
                errorMessages[2].textContent = "";
            }, 3000);
        } else {
            errorMessages[2].textContent = "";
        }

        infoMessages[2].textContent = `${500 - comVal.length} characters left`;
        if (500 - comVal.length <= 20) {
            infoMessages[2].style.color = "orange";
        } else if (500 - comVal.length <= 0) {
            infoMessages[2].style.color = "red";
            infoMessages[2].textContent = "You have reached the character limit!";
        } else {
            infoMessages[2].style.color = "green";
        }
    });

    form.addEventListener("submit", (event) => {
        if (!/^\w+@\w+\.\w+$/.test(emailVal)) {
            const errorMsg = "Not a valid email address!";
            errorMessages[1].textContent = errorMsg;
            emailInput.setCustomValidity(errorMsg);
            form_errors.push({field: "email", message: errorMsg});
        }
        
        const errors = document.createElement("input");
        errors.type = "hidden";
        errors.name = "form-errors";
        errors.value = JSON.stringify(form_errors);

        if (!form.checkValidity()) {
            event.preventDefault();
        }
    });
});
