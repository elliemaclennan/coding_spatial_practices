document.addEventListener("DOMContentLoaded", () => {
  const entries = document.querySelectorAll('.entry');
  const popup = document.getElementById('popup');
  const popupText = document.getElementById('popupText');
  const closePopup = document.getElementById('closePopup');

  entries.forEach(entry => {
    entry.addEventListener('click', () => {
      popupText.textContent = entry.dataset.info; 
      popup.style.display = 'flex';
      document.body.style.overflow = 'hidden'; 
    });
  });

  closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
});

