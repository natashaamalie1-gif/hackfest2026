// Registration form checks, by Natasha Amalie
(function () {
  const form = document.querySelector("#registerForm");
  const message = document.querySelector("#formMessage");
  const countEl = document.querySelector("#registerCount");

  // Only run on the register page
  if (!form || !message) return;

  function getCount() {
    try {
      return Number(localStorage.getItem("hackfest-registrations")) || 0;
    } catch (error) {
      return 0;
    }
  }

  function saveCount(count) {
    try {
      localStorage.setItem("hackfest-registrations", String(count));
    } catch (error) {
      // Storage blocked: the count just won't be remembered
    }
  }

  function showCount() {
    if (countEl) countEl.textContent = getCount();
  }

  function showMessage(text, type) {
    message.textContent = text;
    message.className = "form-message " + type;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#fullName").value.trim();
    const email = document.querySelector("#email").value.trim();
    const phone = document.querySelector("#phone").value.trim();
    const department = document.querySelector("#department").value;
    const year = document.querySelector("#year").value;
    const eventChoice = document.querySelector("#eventChoice").value;
    const agreed = document.querySelector("#agree").checked;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[6-9][0-9]{9}$/;

    if (name.length < 3) {
      showMessage("Please enter your full name (at least 3 letters).", "error");
      return;
    }
    if (!emailPattern.test(email)) {
      showMessage("Please enter a valid email address.", "error");
      return;
    }
    if (!phonePattern.test(phone)) {
      showMessage("Please enter a valid 10-digit mobile number.", "error");
      return;
    }
    if (department === "" || year === "" || eventChoice === "") {
      showMessage("Please choose your department, year and event.", "error");
      return;
    }
    if (!agreed) {
      showMessage("Please agree to the code of conduct.", "error");
      return;
    }

    const newCount = getCount() + 1;
    saveCount(newCount);
    showCount();

    showMessage("🎉 Thanks " + name + "! You are registered for " + eventChoice + ".", "success");
    form.reset();
  });

  showCount();
})();

  
