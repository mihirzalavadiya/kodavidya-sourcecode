// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
  // Get all category filter links
  const categoryLinks = document.querySelectorAll('.category');
  // Get all the cards
  const cards = document.querySelectorAll('.card');
  // Get the empty message container
  const emptyMessage = document.querySelector('.empty-message');

  // Add event listener for each category
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
    });
  });
});
