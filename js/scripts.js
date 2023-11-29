document.addEventListener("DOMContentLoaded", function () {
    const modeSwitch = document.getElementById("mode");
    const theme = localStorage.getItem("theme");
    if (theme) {
        document.body.classList.add(theme);
        modeSwitch.textContent = theme === "dark" ? "Light mode" : "Dark mode";
    }
    modeSwitch.onclick = () => {
        document.body.classList.toggle("dark");
        const updatedTheme = document.body.classList.contains("dark") ? "dark" : "light";
        localStorage.setItem("theme", updatedTheme);
        modeSwitch.textContent = updatedTheme === "dark" ? "Light mode" : "Dark mode";
    };
});
