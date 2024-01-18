const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');


hamburger.onclick = function () {
    this.classList.toggle('open');
    nav.classList.toggle('show');

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

function calculateAge(birthDateString) {
  var birthDate = new Date(birthDateString);
  var today = new Date();
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

document.getElementById('age').textContent = calculateAge('1997-05-20');

