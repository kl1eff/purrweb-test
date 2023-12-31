const nav = document.querySelector('.content__top.top');
const buttons = document.querySelectorAll('button');

document.addEventListener('scroll', () => {
  this.scrollY > nav.offsetTop ? nav.classList.add('sticky') : nav.classList.remove('sticky');
});

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector('#contact').classList.add('vis');
    document.body.classList.add('noscroll');
  });
});

document.querySelector('#close').addEventListener('click', () => {
  document.querySelector('#contact').classList.remove('vis');
  document.body.classList.remove('noscroll');
});

const inputs = document.querySelectorAll('.content__pair input[required]');

function checkFields() {
  const submit = document.querySelector('#contact > div.contact__content.content > div:nth-child(7) > button');
  let res = true;
  inputs.forEach((input) => {
    if (!input.value) {
      res = false;
      input.parentElement.classList.add('req');
    } else {
      input.parentElement.classList.remove('req');
    }
  });
  if (!res) {
    submit.classList.add('button_blocked');
  } else {
    submit.classList.remove('button_blocked');
  }
}

inputs.forEach((input) => {
  input.parentElement.classList.add('req');
  input.addEventListener('keydown', checkFields);
  input.addEventListener('change', checkFields);
});

document.querySelector('form').addEventListener('submit', (event) => {
  document.querySelector('#thanks').classList.add('vis');
  document.querySelector('#contact').classList.remove('vis');
  event.preventDefault();
});

document.querySelector('#thanks button').addEventListener('click', () => {
  document.querySelector('#thanks').classList.remove('vis');
  document.querySelector('#contact').classList.remove('vis');
  document.body.classList.remove('noscroll');
});

const menu = document.querySelector('#menu');
menu.style.display = 'none';

document.querySelector('.top__hamburger').addEventListener('click', () => {
    menu.style.top = window.scrollY - screen.height + 'px';
    menu.style.display = 'flex';
    menu.style.top = window.scrollY + 'px';
    document.body.style.overflow = 'hidden';
});

const close = () => {
  menu.style.top = window.scrollY - screen.height * 2 + 'px';
  document.body.style.overflow = 'show';
  document.body.style.overflow = 'visible';
  setTimeout(() => {
    menu.style.display = 'none';;
  }, (500));
}

document.querySelector('.menu__close').addEventListener('click', close);
document.querySelector('.menu button').addEventListener('click', close);