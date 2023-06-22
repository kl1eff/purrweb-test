const slider = document.querySelector('.slider');
const sliderInner = document.querySelector('.slider__inner');
const primary = sliderInner.offsetLeft;
const indicators = document.querySelector('.slider__indicators');

const elements = document.querySelectorAll('.slider__element');
const elementsCount = elements.length;
const width = 600;

const next = document.querySelector('.right');
const prev = document.querySelector('.left');

const first = sliderInner.firstElementChild.cloneNode(true);
const last = sliderInner.lastElementChild.cloneNode(true);


let index = 0;
indicators.children[index].classList.add('current');


sliderInner.append(first);
sliderInner.prepend(last);



const slide = (direction, target) => {
  if (sliderInner.classList.contains('allow')) {
    check();
    const initial = sliderInner.offsetLeft;
    let i = initial;
    

    if (direction === 1) {
      const targetLocation = target ? primary - width * target : sliderInner.offsetLeft - width;
      
      const interval = setInterval(() => {
        sliderInner.classList.remove('allow');
        sliderInner.style.left = i + 'px';

        if (i === targetLocation) {
          sliderInner.classList.add('allow');
          clearInterval(interval);
        }
        i -= 50;
      }, 15);

      index = targetLocation === sliderInner.offsetLeft - width ? index + 1 : target;
    } else if (direction === -1) {
      const targetLocation = target !== undefined ? primary - width * target : sliderInner.offsetLeft + width;

      const interval = setInterval(() => {
        sliderInner.classList.remove('allow');
        sliderInner.style.left = i + 'px';

        if (i === targetLocation) {
          sliderInner.classList.add('allow');
          clearInterval(interval);
        }
        i += 50;
      }, 15);

      index = targetLocation === sliderInner.offsetLeft + width ? index - 1 : target;
    }
    
    if (index === elements.length) {
      indicators.children[0].classList.add('current');
    } else if (index === -1) {
      indicators.children[elements.length - 1].classList.add('current');
    } else if (index !== elements.length) {
      indicators.children[index].classList.add('current');
    }
  }
};

const check = () => {
  if (index === elements.length) {
    sliderInner.style.left = -width + 'px';
    index = 0;
  } else if (index === -1) {
    sliderInner.style.left = -(width * elements.length) + 'px';
    index = elements.length - 1;
  }

  indicators.children[index].classList.remove('current');
};



next.addEventListener('click', () => slide(1));
prev.addEventListener('click', () => slide(-1));

indicators.addEventListener('click', (event) => {
  if (event.target.classList.contains('slider__indicator') && !event.target.classList.contains('current')) {
    check();
    const location = [...indicators.children].indexOf(event.target);
    if (index > location) slide(-1, location);
    else if (index < location) slide(1, location);
  }
});
