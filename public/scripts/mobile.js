/*Click listener to change the display style of the */
const mobileMenuBtnElement= document.getElementById('mobile-menu-btn');

const mobileMenuElement= document.getElementById('mobile-menu');

//Function for toggling menu

function toggleMobileMenu(){
    mobileMenuElement.classList.toggle('open');
}

mobileMenuBtnElement.addEventListener('click', toggleMobileMenu);
