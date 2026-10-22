

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