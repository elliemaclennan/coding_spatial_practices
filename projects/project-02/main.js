const entries = document.querySelectorAll('.entry');
const popup = document.getElementById('popup');
const popupImg = document.getElementById('popupImg');
const popupText = document.getElementById('popupText');
const closePopup = document.getElementById('closePopup');

entries.forEach(entry => {
  entry.addEventListener('click', () => {
    const imgSrc = entry.querySelector('img').src;
    const infoText = entry.getAttribute('data-info');

    popupImg.src = imgSrc;
    popupText.textContent = infoText;
    popup.style.display = 'flex';
  });
});

closePopup.addEventListener('click', () => {
  popup.style.display = 'none';
});

popup.addEventListener('click', e => {
  if (e.target === popup) popup.style.display = 'none';
});
