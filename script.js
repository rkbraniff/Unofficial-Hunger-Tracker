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
    const makeHungerRating = function (noOfBlood = 5) {
        let rating = 0;
        let bloodComponent;

        function changeHunger(newRating) {
            if (newRating < 1) {
                newRating = 1
            }
            rating = newRating;
        }

        function getBloodComponent() {
            if (!bloodComponent) {
                bloodComponent = document.createElement(`ul`);
                bloodComponent.className = `hunger-rating`;
                for (let i = 0; i < noOfBlood; i++) {
                    const li = document.createElement(`li`);
                    li.setAttribute(`data-rating`, i + 1);
                    li.className = `blood`;
                    if (i === 0) li.tabIndex = 0;
                    bloodComponent.append(li);
                }
                bloodComponent.addEventListener(`mouseover`, onMouseOver);
                bloodComponent.addEventListener(`mouseleave`, onMouseLeave);
                bloodComponent.addEventListener(`click`, onMouseClick);
                bloodComponent.addEventListener(`keyup`, onKeyUp)

                renderChanges(1)
            }
            return bloodComponent;
        }

        function renderChanges(rating) {
            const effectiveRating = Math.max(rating, 1)
            for (let i = 0; i < effectiveRating; ++i) {
                bloodComponent.children[i].classList.add(`blood-filled`);
            }
            for (let i = effectiveRating; i < noOfBlood; ++i) {
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
            let blood = e.target;
            let isBlood = blood.classList.contains('blood');
            if (isBlood) {
                activate(blood);
                let { rating: clickedRating } = blood.dataset;

                clickedRating = Math.max(clickedRating, 1); // Ensure clickedRating is at least 1

                // If the rating is the same as current rating, reset it
                if (clickedRating === String(rating)) {
                    clickedRating = 1; // Reset to 0 if clicked on the same rating
                }

                // Update hunger level
                changeHunger(Number(clickedRating));
                renderChanges(Number(clickedRating));

                // Update the hunger description text after setting the new rating
                updateHungerText(Number(clickedRating));
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
                    focusPrevBlood();
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

    const ratingText = document.querySelector(".hunger__level--description");
    if (container) {
        container.append(bloodComponent);


        updateHungerText(ratingModule.getRating())
    }
    else {
        console.error("The container for blood component is missing.");
    }

    function updateHungerText(hunger) {
        console.log(`Updating hunger text for rating: ${hunger}`); // Debugging log

        ratingText.innerHTML = getRatingTextHTML(hunger);
    }


    function getRatingTextHTML(hunger) {
        // Ensure minimum hunger rating of 1
        hunger = Math.max(hunger, 1); // Ensure hunger is at least 1

        if (hunger == 0) {
            return `<div class="hunger__level--description">"I sleep, for now. You have satisfied me... but never forget, I am always here. Enjoy your peace, little one - it never lasts."</div>`;
        }
        else if (hunger == 1) {
            return `<div class="hunger__level--description">"I feel the pull again. Just a taste... you can manage that, can't you? Just enough to remind me that you know what I need."</div>`;
        }
        else if (hunger == 2) {
            return `<div class="hunger__level--description">"You're making me wait too long. Don't you feel it? That ache in your veins... I do. It's time. Find them. Feed. I won't ask nicely again."</div>`;
        }
        else if (hunger == 3) {
            return `<div class="hunger__level--description">"I'm starving! Do you really think you can hold me back? I can smell them all around us, their warmth, their blood. I will have it, one way or another... you won't stop me!"</div>`;
        }
        else if (hunger == 4) {
            return `<div class="hunger__level--description">"ENOUGH! You're nothing without me! I will tear them apart! They're just cattle, waiting to be slaughtered, and you're a fool if you think you can resist me any longer! YOU. WILL. FEED!"</div>`;
        }
        else if (hunger == 5) {
            return `<div class="hunger__level--description">“NO MORE WAITING! DO YOU HEAR ME? You think you can resist? I AM YOUR HUNGER! I AM YOUR TRUTH! Surrender to me—SATE ME NOW!”</div>`;
        }
    }
});



