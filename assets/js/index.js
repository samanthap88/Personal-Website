document.getElementById('scrollAbout').addEventListener('click', function() {
    const section = document.getElementById('one');
    const sectionRect = section.getBoundingClientRect();
    const offset = (window.innerHeight - sectionRect.height) / 2;
    window.scrollTo({
        top: sectionRect.top + window.pageYOffset - offset,
        behavior: 'smooth'
    });
});
document.getElementById('scrollWork').addEventListener('click', function() {
    document.getElementById('two').scrollIntoView({ behavior: 'smooth' });
});
document.getElementById('scrollProjects').addEventListener('click', function() {
    document.getElementById('three').scrollIntoView({ behavior: 'smooth' });
});
document.getElementById('scrollContact').addEventListener('click', function() {
    document.getElementById('cta').scrollIntoView({ behavior: 'smooth' });
});



document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get form data
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    // Construct the alert message
    const alertMessage = `Message sent! Thank you!`;

    // Show the alert
    alert(alertMessage);

    // Optionally, you can reset the form after showing the alert
    this.reset();
});