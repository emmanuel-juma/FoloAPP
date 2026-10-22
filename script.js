
//------------------Navbar & Mobile Navbar---------------
document.addEventListener('DOMContentLoaded', () =>{
    const menuToggle = document.querySelector('.menu-toggle');
    const navMobile = document.getElementById('nav-mobile');

  if (menuToggle && navMobile) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMobile.style.display === 'block';
      navMobile.style.display = isOpen ? 'none' : 'block';
      menuToggle.textContent = isOpen ? '☰' : '✕';
    });

    // This code will Close mobile menu when a link is clicked
    navMobile.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMobile.style.display = 'none';
        menuToggle.textContent = '☰';
      });
    });
  }
})


//-------------------------------------------------


//---------------Smooth scroll for Nav Buttons-----

document.querySelectorAll('.nav-link, .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const text = btn.textContent.trim().toLowerCase();

      // Map button text to section IDs
      const map = {
        'home': 'home',
        'services & prices': 'services',
        'nail gallery': 'gallery',
        'about': 'about',
        'contact': 'contact',
        'book appointment': 'booking',
        'book your appointment': 'booking',
        'explore nail designs': 'gallery'
      };

      const targetId = map[text];
      if (targetId) {
        e.preventDefault();
        const section = document.getElementById(targetId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
});

//------------------------------------------------------

