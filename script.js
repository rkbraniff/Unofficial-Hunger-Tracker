let contrastToggle = false;

function toggleContrast() {
    contrastToggle = !contrastToggle;
    if (contrastToggle) {
        document.body.classList += ` dark-theme`
    }
    else {
        document.body.classList.remove(`dark-theme`)
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    // copy code here
    const makeHungerRating = function (noOfBlood = 5) {
        let rating = 0;
        let bloodComponent;

        function changeHunger(newRating) {
            rating = newRating;
        }

        function getBloodComponent() {
            if (!bloodComponent) {
                bloodComponent = document.createElement(`ul`);
                bloodComponent.className = `hunger-rating`;
                for (let i = 0; i < noOfBlood; i++) {
                    const li = document.createElement(`li`);
                    li.setAttribute(`data-rating`, i + 1)
                    li.className = `blood`;
                    if (i === 0) li.tabIndex = 0;
                    bloodComponent.append(li);0
                }
                bloodComponent.addEventListener(`mouseover`, onMouseOver);
                bloodComponent.addEventListener(`mouseLeave`, onMouseLeave);
                bloodComponent.addEventListener(`click`, onMouseClick);
                bloodComponent.addEventListener(`keyup`, onKeyUp)
            }
            return bloodComponent;
        }

        function renderChanges(rating) {
            for (let i = 0; i < rating; ++i) {
                bloodComponent.children[i].classList.add(`blood-filled`);
            }
            for (let i = rating; i < noOfBlood; ++i) {
                bloodComponent.children[i].classList.remove(`blood-filled`);
            }
        }

        function onMouseOver(e) {
            let isBlood = e.target.classList.contains(`blood`);
            if (isBlood) {
                const { rating } = e.target.dataset;
                renderChanges(rating)
            }
        }

        function onMouseLeave(e) {
            renderChanges(rating);
        }

        function onMouseClick(e) {
            let blood = e.target ?? e;
            let isBlood = blood.classList.contains(`blood`);
            if (isBlood) {
                activate(blood)
                let { rating } = blood.dataset;
                if (e.key !== `Tab` && rating === getRating()) {
                    rating = 0;
                    resetTabIndex();
                    bloodComponent.firstElementChild.tabIndex = 0;
                }
                changeHunger(rating);
                renderChanges(rating);
            }
        }

        function focusPrevBlood() {
            let focusedBlood = document.activeElement;
            if (focusedBlood.previousElementSibling) {
                onMouseClick(focusedBlood.previousElementSibling);
            }
        }

        function focusNextBlood() {
            let focusedBlood = document.activeElement;
            if (focusedBlood.nextElementSibling) {
                onMouseClick(focusedBlood.nextElementSibling);
            }
        }

        function activate(element) {
            resetTabIndex();
            element.tabIndex = 0;
            element.focus();
        }

        function resetTabIndex() {
            bloodComponent.childNodes.forEach((blood) => {
                blood.tabIndex = -1;
            })
        }

        function onKeyUp(e) {
            switch (e.key) {
                case `Tab`: {
                    onMouseClick(e);
                    break;
                }
                case `ArrowLeft`: {
                    focusPrevBlood()
                    break;
                }
                case `ArrowRight`: {
                    focusNextBlood();
                    break;
                }
                default:
                    return;
            }
        }

        function getRating() {
            return rating;
        }

        return { getRating, getBloodComponent };
    }

    const ratingModule = makeHungerRating();

    const bloodComponent = ratingModule.getBloodComponent();
    const container = document.querySelector("ul");

    container.append(bloodComponent);
});