let contrastToggle = false;

function toggleContrast() {
    contrastToggle = !contrastToggle;
    if (contrastToggle) {
        document.body.classList.add(`dark-theme`)
    }
    else {
        document.body.classList.remove(`dark-theme`)
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const increaseButton = document.querySelector(".increase__hunger");

    if (increaseButton) {

        increaseButton.addEventListener("click", function () {
            let currentHunger = parseInt(localStorage.getItem('hungerRating')) || 1;

            if (currentHunger < 5) {
                currentHunger += 1;
                localStorage.setItem('hungerRating', currentHunger);
                alert(`Hunger increased to ${currentHunger}`);
            } else {
                alert("Hunger is already at maximum!");
            }
        });
    }
    else {
        console.error(`Increase Button Not Found`)
    }
});

// Sync across multiple instances
window.addEventListener("storage", function (e) {
    if (e.key === 'hungerRating') {
        alert(`Hunger rating changed to ${e.newValue}`);
        // Optionally, update the UI here
    }
});