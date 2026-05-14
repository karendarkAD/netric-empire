const services = [
    { name: "Braiding", price: 80 },
    { name: "Wig Installation", price: 120 },
    { name: "Hair Styling", price: 60 },
    { name: "Manicure", price: 50 },
    { name: "Pedicure", price: 60 },
    { name: "Acrylic / Gel Nails", price: 100 },
    { name: "Classic Lashes", price: 80 },
    { name: "Volume Lashes", price: 120 },
    { name: "Hybrid Lashes", price: 100 },
    { name: "Basic Facial", price: 70 },
    { name: "Deep Cleansing", price: 100 },
    { name: "Eyebrow Wax", price: 30 },
    { name: "Underarm Wax", price: 40 },
    { name: "Leg Wax", price: 80 },
];

let selected = [];

function renderCalculator() {
    const container = document.getElementById('calcServices');
    container.innerHTML = services.map((s, i) => `
      <div class="calc-item ${selected.includes(i) ? 'selected' : ''}" onclick="toggleService(${i})">
        <span class="calc-item-name">${s.name}</span>
        <span class="calc-item-price">GH₵${s.price}</span>
      </div>
    `).join('');
}

function toggleService(index) {
    if (selected.includes(index)) {
        selected = selected.filter(i => i !== index);
    } else {
        selected.push(index);
    }
    renderCalculator();
    updateSummary();
}

function updateSummary() {
    const container = document.getElementById('selectedServices');
    const total = selected.reduce((sum, i) => sum + services[i].price, 0);
    document.getElementById('totalAmount').textContent = total;
    if (selected.length === 0) {
        container.innerHTML = '<p class="calc-empty">No services selected yet.</p>';
        return;
    }
    container.innerHTML = selected.map(i => `
      <div class="selected-service-row">
        <span>${services[i].name}</span>
        <span>GH₵${services[i].price}</span>
      </div>
    `).join('');
}

function bookFromCalculator() {
    if (selected.length === 0) {
        alert('Please select at least one service first.');
        return;
    }
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}

function submitBooking() {
    const name = document.getElementById('bookName').value;
    const phone = document.getElementById('bookPhone').value;
    const service = document.getElementById('bookService').value;
    const date = document.getElementById('bookDate').value;
    const time = document.getElementById('bookTime').value;

    if (!name || !phone || !service || !date || !time) {
        alert('Please fill in all fields to complete your booking request.');
        return;
    }

    const confirm = document.getElementById('bookingConfirm');
    confirm.style.display = 'block';

    const msg = `Hello Netric Empire! I'd like to book an appointment.%0A%0AName: ${encodeURIComponent(name)}%0AService: ${encodeURIComponent(service)}%0ADate: ${date}%0ATime: ${time}%0APhone: ${encodeURIComponent(phone)}`;
    setTimeout(() => {
        window.open(`https://wa.me/233598346131?text=${msg}`, '_blank');
    }, 800);
}

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); }
    });
}, { threshold: 0.1 });
reveals.forEach(r => observer.observe(r));

window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    nav.style.boxShadow = window.scrollY > 50 ? '0 2px 30px rgba(0,0,0,0.08)' : 'none';
});

function toggleMenu() {
    const links = document.querySelector('.nav-links');
    if (links.style.display === 'flex') {
        links.style.display = 'none';
    } else {
        links.style.display = 'flex';
        links.style.flexDirection = 'column';
        links.style.position = 'absolute';
        links.style.top = '70px';
        links.style.left = '0';
        links.style.right = '0';
        links.style.background = '#ffffff';
        links.style.padding = '20px 30px';
        links.style.borderBottom = '1px solid rgba(201,169,110,0.2)';
    }
}

renderCalculator();
window.addEventListener('scroll', () => {
    const btn = document.getElementById('backToTop');
    if (window.scrollY > 400) {
        btn.classList.add('visible');
    } else {
        btn.classList.remove('visible');
    }
});
const sections = document.querySelectorAll('section, .about, .contact');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('active'));
            const id = entry.target.getAttribute('id');
            const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));