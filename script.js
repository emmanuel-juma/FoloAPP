
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


//-------------------------------------------------------


//---------------Smooth scroll for Nav Buttons-----------

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
// This code selects the images according to the button that has been clicked by filtering. 

const tabs = document.querySelectorAll('.gallery-tabs .tab');
  const designCards = document.querySelectorAll('.design-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.textContent.trim().toLowerCase();

      designCards.forEach(card => {
        const cardCategory = card.querySelector('.category')?.textContent.trim().toLowerCase() || '';

        if (category === 'all designs' || cardCategory.includes(category.replace(' nails', '').replace(' designs', ''))) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
});

//---------------------------------------------------
// code for the booking form logic 
const serviceSelect = document.getElementById('service');
const durationHint = document.querySelector('.duration-hint');
const summaryService = document.querySelector('.summary-service');
const summaryPrice = document.querySelector('.summary-price');
const summaryDate = document.querySelector('.summary-date');
const bookingForm = document.querySelector('.booking-form');

// the data for all the services

const services = {
  'classic-mani': { name: 'Classic Manicure', price: 'KES 800', duration: 45 },
  'classic-pedi': { name: 'Classic Pedicure', price: 'KES 1,000', duration: 60 },
  'gel-mani': { name: 'Gel Manicure', price: 'KES 1,500', duration: 60 },
  'gel-pedi': { name: 'Gel Pedicure', price: 'KES 1,800', duration: 75 },
  'acrylic-ext': { name: 'Acrylic Nail Extensions', price: 'KES 2,500', duration: 120 },
  'gel-ext': { name: 'Gel Nail Extensions', price: 'KES 2,800', duration: 120 },
  'french': { name: 'French Tips', price: 'KES 1,500', duration: 60 },
  'nail-art': { name: 'Nail Art', price: 'From KES 300', duration: 30 },
  'combo': { name: 'Manicure & Pedicure Combo', price: 'KES 2,000', duration: 105 }
}

// This code will Update summary when service changes
if (serviceSelect) {
  serviceSelect.addEventListener('change', () => {
    const selected = services[serviceSelect.value];
    if (selected) {
      if (durationHint) durationHint.textContent = `~${selected.duration} min`;
      if (summaryService) summaryService.textContent = selected.name;
      if (summaryPrice) summaryPrice.textContent = selected.price;
    }
  });
}



// form submit code

if (bookingForm){
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
  })
}

const Name = document.getElementById('name')?.value.trim();
const phone = document.getElementById('phone')?.value.trim();
const email = document.getElementById('email')?.value.trim();
const notes = document.getElementById('notes')?.value.trim();
const service = serviceSelect?.value;
const selectedTime = document.querySelector('.time-slot.selected')?.textContent;


// validation code
if (!Name || !phone){
  alert("please enter your name and phone number")
  return;
}


if (!selectedTime) {
  alert('Please select a time slot.');
  return;
}

if ( Name !== '' && phone !== '' && email !== '' && service !== '' ){
  alert('Appointment booked successful')
}else{
  e.preventDefault();
  alert('please fill in the form to book an appointment')
}



const booking = {
  id: Date.now(),
  service: services[service]?.name || service,
  price: services[service]?.price,
  time: selectedTime,
  Name,
  phone,
  email,
  notes,
  createdAt: new Date().toISOString()
};


