// core version + navigation, pagination modules:
//import Swiper, { Navigation, Pagination } from 'swiper';


// Провірка поддержка webp, додавання класу webp або no-webp для HTML 
function isWebp() {
    // Провірка підтримки webp 
    function testWebP(callback) {

        var webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    // Додавання класу _webp або _no-webp для HTML
    testWebP(function (support) {
    
        if (support == true) {
            document.querySelector('body').classList.add('webp');
        } else {
            document.querySelector('body').classList.add('no-webp');
        }
    });
}

isWebp();
//-------------------------------------------------------------------------------------------
//background image
function ibg() {

    let ibg = document.querySelectorAll(".ibg");
    for (var i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector('img')) {
            ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
        }
    }
}

ibg();
//-------------------------------------------------------------------------------------------
//menu burger

const iconMenu = document.querySelector('.header__menu__icon');
const menuBody = document.querySelector('.header__nav');
if (iconMenu) {
    
    iconMenu.addEventListener("click", function(e) {
        document.body.classList.toggle('_lock')
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}
//-------------------------------------------------------------------------------------------

let header = document.querySelector('.header');

let headerOffset = header.offsetTop;

document.addEventListener('scroll', ()=>{
    if(window.pageYOffset > headerOffset){
        header.classList.add('fixed');
        
    } else {
        header.classList.remove('fixed');
        
    }
})


const anchors = document.querySelectorAll('.header__link[href]')

for (let anchor of anchors) {
    anchor.addEventListener("click", function(event) {
        event.preventDefault();
        const sectionId = anchor.getAttribute('href')
        document.querySelector(sectionId).scrollIntoView({
            behavior: "smooth",
            block: 'start',
        })
        document.body.classList.remove('_lock')
        iconMenu.classList.remove('_active');
        menuBody.classList.remove('_active');

    })
}


//-------------------------------------------------------------------------------------------

const swiper = new Swiper('.clients__responses', {
   
    loop: true,
    speed: 1200,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInterction: false,
    }

});

//-------------------------------------------------------------------------------------------

function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

let ButtonSubmit = document.querySelector('.contact__button');
let inputsNameItems = document.querySelectorAll('.contact__input.required');
let inputEmail = document.querySelector('.input__email');
let contactForm = document.querySelector('.contact__form');


ButtonSubmit.addEventListener('click', (e) => {
    e.preventDefault();
     //check inputs

    function checkForms(){

        document.querySelector('.message__succesed').classList.remove('_active');

        for (let i = 0; i < inputsNameItems.length; i++) {
            inputsNameItems[i].closest('.contact__field__container').querySelector('.input__error').classList.remove('_active');
    
            if (!inputsNameItems[i].value) {
                inputsNameItems[i].closest('.contact__field__container').querySelector('.input__error').classList.add('_active');
            }
    
        }   
        if (emailTest(inputEmail)) {
            inputEmail.closest('.contact__field__container').querySelector('.input__error').classList.add('_active');
        }
        //console.log(emailTest(inputEmail))
    }

    checkForms();

    let check = [...inputsNameItems].every(function(elem) {
        if (elem.value) {
            return true;
        } else {
            return false;
        }
    });

    if (check==true && !emailTest(inputEmail)) {
        document.querySelector('.message__succesed').classList.add('_active');
        contactForm.classList.add('_active');
    }
    
})
