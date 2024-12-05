// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
  // Get all category filter links
  const categoryLinks = document.querySelectorAll('.category');
  // Get all the cards
  const cards = document.querySelectorAll('.card');
  // Get the empty message container
  const emptyMessage = document.querySelector('.empty-message');
  // Get the theme toggle button
  const themeToggle = document.getElementById('theme-toggle');
  // Get the body element
  const body = document.body;
  // Get the category dropdown for smaller screens
  const dropdown = document.getElementById('category-dropdown');

  // Add event listener for each category link
  categoryLinks.forEach((link) => {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      // Remove 'active' class from all links
      categoryLinks.forEach((link) => link.classList.remove('active'));
      // Add 'active' class to the clicked link
      this.classList.add('active');

      // Get the category filter
      const category = this.getAttribute('data-category');

      let hasVisibleCards = false;

      // Loop through all cards and show/hide based on category
      cards.forEach((card) => {
        const cardCategories = card.getAttribute('data-category').split(',');

        // Check if the card belongs to the selected category or if 'all' is selected
        if (category === 'all' || cardCategories.includes(category)) {
          card.style.display = 'block';
          hasVisibleCards = true;
        } else {
          card.style.display = 'none';
        }
      });

      // Show or hide the empty message
      if (hasVisibleCards) {
        emptyMessage.style.display = 'none';
      } else {
        emptyMessage.style.display = 'block';
      }

      // Update the dropdown to match the selected category
      dropdown.value = category;
    });
  });

  // Add event listener for the dropdown change
  dropdown.addEventListener('change', function () {
    const category = this.value;
    categoryLinks.forEach((link) => {
      if (link.getAttribute('data-category') === category) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    let hasVisibleCards = false;
    cards.forEach((card) => {
      const cardCategories = card.getAttribute('data-category').split(',');

      if (category === 'all' || cardCategories.includes(category)) {
        card.style.display = 'block';
        hasVisibleCards = true;
      } else {
        card.style.display = 'none';
      }
    });

    if (hasVisibleCards) {
      emptyMessage.style.display = 'none';
    } else {
      emptyMessage.style.display = 'block';
    }
  });

  // Get the saved theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    body.classList.add(savedTheme);
    themeToggle.textContent = savedTheme === 'dark-mode' ? '☀️' : '🌙';
  }

  // Toggle theme on button click
  themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
      body.classList.remove('dark-mode');
      localStorage.setItem('theme', '');
      themeToggle.textContent = '🌙';
    } else {
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark-mode');
      themeToggle.textContent = '☀️';
    }
  });
});
