//popup
const popupLinks = document.querySelectorAll('.popup-link')
const body = document.querySelector('.body')
const lockPadding = document.querySelectorAll('.lock-padding')
const wrapper = document.querySelector('.wrapper')

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
  for (let i = 0; i < popupLinks.length; i++) {
    const popupLink = popupLinks[i]
    popupLink.addEventListener('click', function (e) {
      const popupName = popupLink.getAttribute('href').replace('#', '')
      const curentPopup = document.getElementById(popupName)
      popupOpen(curentPopup)
      e.preventDefault()
    })
  }
}
const popupCloseIcon = document.querySelectorAll('.close-popup')

if (popupCloseIcon.length > 0) {
  for (let i = 0; i < popupCloseIcon.length; i++) {
    const el = popupCloseIcon[i]
    el.addEventListener('click', function (e) {
      popupClose(el.closest('.popup'))
      e.preventDefault()
    })
  }
}

function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open')
    if (popupActive) {
      popupClose(popupActive, false)
    } 
    
    curentPopup.classList.add('open')
    wrapper.classList.add('_lock')
    curentPopup.addEventListener('click', function (e) {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'))
      }
    })
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    wrapper.classList.remove('_lock')
    popupActive.classList.remove('open');
  }
}

document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive)
  }
})





const typeOfJobsList = document.querySelector('.typeOfJobs__list')
const typeOfJobsItems = document.querySelectorAll('.typeOfJobs__item')
const typeOfJobsShowBtn = document.querySelector('.typeOfJobs__show-btn')
const typeOfJobsCloseBtn = document.querySelector('.typeOfJobs__close-btn')

for (let i = 20; i < typeOfJobsItems.length; i++) {
  typeOfJobsItems[i].style.display ='none'
}

typeOfJobsShowBtn.addEventListener('click', showTypeOfJobs)
typeOfJobsCloseBtn.addEventListener('click', closeTypeOfJobs)

function showTypeOfJobs() {
  for (let i = 20; i < typeOfJobsItems.length; i++) {
    typeOfJobsItems[i].style.display ='flex'
  }
  typeOfJobsShowBtn.style.display = 'none'
  typeOfJobsCloseBtn.style.display = 'block'
}

function closeTypeOfJobs() {
  for (let i = 20; i < typeOfJobsItems.length; i++) {
    typeOfJobsItems[i].style.display ='none'
  }
  typeOfJobsShowBtn.style.display = 'block'
  typeOfJobsCloseBtn.style.display = 'none'
}



//gallery
new Swiper('.gallery-swiper', {
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: '.gallery-swiper .slider-arrow_next',
    prevEl: '.gallery-swiper .slider-arrow_prev',
  },
  effect: 'coverflow',
  
  coverflowEffect: {
    rotate: 20,
    stretch: 30,
    slideShadows: true,
  },
  breakpoints: {
    160: {
      slidesPerView: 1,
    },
    450: {
      slidesPerView: 1.5,
    },
    600: {
      slidesPerView: 3,
    },
    // 767: {
    //   slidesPerView: 2,
    // },
    // 991: {
    //   slidesPerView: 3,
    // },
  },

});



//acordion
const questions = document.querySelectorAll('.question-answer__f-row')


questions.forEach(elem => {
  const answer = elem.nextElementSibling
  const arrow = elem.querySelector('.question-answer__arrow')
  const contentHeight = answer.scrollHeight + 'px';
  answer.style.maxHeight = '0'
  answer.style.overflow = 'hidden'

  elem.addEventListener('click', function() {
    if (answer.style.maxHeight === '0px') {
      answer.style.maxHeight = contentHeight
      answer.style.marginTop = '20px'
      arrow.style.transform = 'rotate(270deg)';
    } else {
      answer.style.marginTop = '0px'
      answer.style.maxHeight = '0'
      arrow.style.transform = 'rotate(90deg)';
    }
  })
})



//telegram bot
const token = '713:385331;BBHKhzRXmVKx[{nHy5RGNosq`jOVKRLfJIh'
const chatId = '.:79228676'
const headerForm = document.querySelector('.popup__form')
const callBackForm = document.querySelector('.send-form__form')

const url = "https://api.telegram.org/bot" + insert(token) + "/sendMessage"

function sendMessage(text) {
  fetch(url, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ chat_id: +insert(chatId), text })
  })
}

headerForm.onsubmit = () => {
  const name = document.querySelector('.popup__name').value
  const phoneNumber = document.querySelector('.popup__number').value
  const district = document.querySelector('.popup__districts').value
  const dicription = document.querySelector('.popup__textarea').value

  const text = `ім'я: ${name}, \nномер: ${phoneNumber}, \nрайон: ${district}, \nопис: ${dicription}`
  popupClose(headerForm.closest('.popup'))

  sendMessage(text)
  window.open(`thanks.html`, "_self")
}

callBackForm.onsubmit = () => {
  const name = document.querySelector('.send-form__name').value
  const phoneNumber = document.querySelector('.send-form__number').value

  const text = `ім'я: ${name}, \nномер: ${phoneNumber}`
  sendMessage(text)
  window.open(`thanks.html`, "_self")
}


function insert(t) { return String.fromCharCode(...[...t].map(c => c.charCodeAt() - 1)) }


