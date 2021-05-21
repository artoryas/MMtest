const nextArrow = document.querySelector('.navigation-arrow_next');
const prevArrow = document.querySelector('.navigation-arrow_prev');
const mainPage = document.querySelector('main');
const sections = document.querySelectorAll('section');
const contacts = document.querySelector('.contacts');
const navButtons = document.querySelectorAll('.navigation-bar__item');
const navDescription = document.querySelector('.navigation-description');
const loaderText = document.querySelector('.loader__text');
let currentSection = 0;

loaderText.addEventListener('animationend', ()=> loaderText.childNodes[1].innerHTML = 'Patience');

navButtons.forEach(navButton => navButton.addEventListener('click', (item) => {
    if (currentSection !== +item.target.dataset.index){
        currentSection = +item.target.dataset.index;
        handlePositionChange();
    }
}));

nextArrow.addEventListener('click', () => {
    setNextSlide();
});

const setNextSlide = () => {
    currentSection++;
    handlePositionChange();
}

prevArrow.addEventListener('click', () => {
    setPrevSlide();
})

const setPrevSlide = () => {
    currentSection--;
    handlePositionChange();
}

const handlePositionChange = () => {
    mainPage.style.backgroundPosition = `${getPosition()}%`;
    setFadeAwayAnimation();
    openCloseContacts();
    setActiveNavButton();
    addRemoveNavArrows();
}

const setFadeAwayAnimation = () => {
    fadeAwayForContent();
    fadeAwayForNavDescription();
}

const fadeAwayForContent = () => {
    const activeSection = document.querySelector('.active');
    if (activeSection) {
        activeSection.classList.add('deactivate');
        setTimeout(() => {
            // Fade away for content text
            activeSection.classList.remove('deactivate');   
            activeSection.classList.remove('active');
        }, 500)
    }
}

const fadeAwayForNavDescription = () => {
    navDescription.classList.remove('navigation-description_active');
    setTimeout(() => {
        navDescription.innerHTML = `Step ${currentSection} out of ${sections.length - 1} on the path to digital enlightenment.`;
            if (!isLastPage() && !isFirstPage()){
                navDescription.classList.add('navigation-description_active');
            }
    }, 500)
}

const openCloseContacts = () => {
    if (isLastPage()){
        navDescription.classList.remove('navigation-description_active');
        openContacts();
    } else {
        sections[currentSection].classList.add('active');
        closeContacts(); 
    }
}

const getPosition = () => {
    switch(currentSection){
        case 0: return 0;
        case 1: return 13;
        case 2: return 23;
        case 3: return 36;
        case 4: return 52;
        case 5: return 65;
        case 6: return 81;
        case 7: return 100;
        case 8: return 100;
        case 9: return 100;
    }
}

const setActiveNavButton = () => {
    document.querySelector('.navigation-bar__item_active').classList.remove('navigation-bar__item_active');
    navButtons[currentSection].classList.add('navigation-bar__item_active');
}

const addRemoveNavArrows = () => {
    prevArrow.style.display = isFirstPage() ? 'none' : 'block';
    nextArrow.style.display = isLastPage() ? 'none' : 'block';
}

const openContacts = () => {
    mainPage.style.transform = 'translate(-70%, 0)';
    contacts.style.display = 'block';
    contacts.style.transitionDelay = '0.5s';
    setTimeout(() => {
        contacts.style.opacity = 1;
    }, 50);
}

const closeContacts = () => {
    mainPage.style.transform = 'translate(0, 0)';
    contacts.style.opacity = 0;
    contacts.style.transitionDelay = '0s';
    setTimeout(() => {
        contacts.style.display = 'none';
        
    }, 500);
}

const isLastPage = () => {
    return currentSection === sections.length;
}
const isFirstPage = () => {
    return currentSection === 0
}

/// Loader
// For dev purposes only
const init = () => {
    const loader = document.querySelector('.loader');
    const navigation = document.querySelector('.navigation');
    const loaderWrapper = document.querySelector('.loader__wrapper');
    setTimeout(() => {
        loaderWrapper.style.opacity = 0;
        
        setTimeout(() => {
            loader.style.opacity = 0;
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        },500);
        
        navigation.style.display = 'block';
        mainPage.style.display = 'block';
        setTimeout(() => {
            mainPage.style.opacity = 1;
            navigation.style.opacity = 1;
        },600);
    }, 5000)
}
init();

// For Production

// window.addEventListener('load', () => {
//     const loader = document.querySelector('.loader');
//     const navigation = document.querySelector('.navigation');
//         loader.style.opacity = 0;
//         setTimeout(() => {
//             loader.style.display = 'none';
//         },100);
//         navigation.style.display = 'block';
//         mainPage.style.display = 'block';
//         setTimeout(() => {
//             mainPage.style.opacity = 1;
//             navigation.style.opacity = 1;
//         },50);
// })

// Swipe Detection
mainPage.addEventListener("touchstart", startTouch, false);
mainPage.addEventListener("touchmove", moveTouch, false);

var initialX = null;
var initialY = null;

function startTouch(e) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
};

function moveTouch(e) {
    if (initialX === null) {
        return;
    }

    if (initialY === null) {
        return;
    }

    var currentX = e.touches[0].clientX;
    var currentY = e.touches[0].clientY;

    var diffX = initialX - currentX;
    var diffY = initialY - currentY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        if (!isLastPage()) setNextSlide();
      } else {
        if (!isFirstPage()) setPrevSlide();
      }  
    }

    initialX = null;
    initialY = null;

    e.preventDefault();
  };

// Keyboard events
document.addEventListener('keyup', (e) => {
    if (e.code === "ArrowRight") {
        if (!isLastPage()) setNextSlide();
    } else if (e.code === "ArrowLeft") {
        if (!isFirstPage()) setPrevSlide();
    }
});