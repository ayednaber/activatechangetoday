const submitBtn = document.getElementById('appointment-submit-btn');

submitBtn.addEventListener('click', function(e) {
    e.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // Validate the fields (optional but recommended)
    if (!firstName || !lastName || !email || !phone || !message) {
      alert('Please fill out all fields.');
      return;
    }

    submitBtn.disabled = true;

    // Create the request body
  const requestBody = {
    firstName,
    lastName,
    email,
    phone,
    message,
  };

  // Send a POST request to the backend
  fetch('https://act-email-server.onrender.com/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to send email.');
      }
    })
    .then((data) => {
      if (data.success) {
        alert('Email sent successfully!');
        submitBtn.disabled = false;
      } else {
        alert('Failed to send email: ' + data.message);
        submitBtn.disabled = false;
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
      submitBtn.disabled = false;
    });
});
