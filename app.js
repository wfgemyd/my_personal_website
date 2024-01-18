// const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const headline = document.getElementById('headline');
const button = document.getElementById('listen-button');

hamburger.onclick = function () {
    
    this.classList.toggle('open');
    nav.classList.toggle('show');
    
    if (window.getComputedStyle(headline).opacity == 1) { 
        headline.style.opacity = 0;
        button.style.opacity = 0;
    } else {
        headline.style.opacity = 1;
        button.style.opacity = 1;
    }
      
};

const footer = document.querySelector('footer');
const nav1 = document.getElementById('nav');


function handleScroll() {
  const footerRect = footer.getBoundingClientRect();
  const navHeight = nav.offsetHeight;
  
  // Check if the footer is coming into the viewport
  if (window.innerHeight - footerRect.top > 0) {
    // Adjust the bottom position of the nav based on the footer's position
    nav1.style.bottom = `${window.innerHeight - footerRect.top}px`;
  } else {
    // Reset the bottom position when the footer is not in view
    nav1.style.bottom = '0';
  }
}
window.addEventListener('scroll', handleScroll);



const items = document.querySelectorAll('#grid > div');

for (const item of items.values()) {
    
    new Waypoint.Inview({
        element: item,
        enter(direction) {
            if (direction == 'down') {
                item.classList.add('move-up');
            }
        },
        exited(direction) {
            if (direction == 'up') {
                item.classList.remove('move-up');
            }
        }
    });
    
}











