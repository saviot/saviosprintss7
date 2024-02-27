// Get the modal
const modalEditProfile = document.getElementById('modal');
const modalCreateCard = document.getElementById('modalCreateCard');
const modalPreviewImage = document.getElementById('modalImagePreview');

// Get the form inside the modal
const formOpen = modalEditProfile.querySelector('.modal__content');
const formCreateCard = modalCreateCard.querySelector('.modal__content');

// Get the button that opens the modal
const btnOpenModal = document.getElementById('openModalBtn');
const btnCreateCard = document.getElementById('openModalCardBtn');

// Get the <span> element that closes the modal
const spanExitProfile = modalEditProfile.querySelector('.modal__close');
const spanExitCard = modalCreateCard.querySelector('.modal__close');

// When the user clicks on <span> (x), close the modal
spanExitProfile.onclick = function () {
  modalEditProfile.style.display = 'none';
};
spanExitCard.onclick = function () {
  modalCreateCard.style.display = 'none';
};
modalPreviewImage.onclick = function () {
  modalPreviewImage.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modalEditProfile) {
    modalEditProfile.style.display = 'none';
  } else if (event.target == modalCreateCard) {
    modalCreateCard.style.display = 'none';
  }
};

// esc
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    modalEditProfile.style.display = 'none';
    modalCreateCard.style.display = 'none';
  }
});

// ######### PROFILE #########
btnOpenModal.addEventListener('click', function () {
  modalEditProfile.style.display = 'flex';
  modalEditProfile.classList.add('modal-show');

  // get value from .profile__name and .profile__title
  const profileName = document.querySelector('.profile__name').textContent;
  const profileTitle = document.querySelector('.profile__title').textContent;

  // set the values to the form
  formOpen.querySelector('input[name="nama"]').value = profileName;
  formOpen.querySelector('input[name="title"]').value = profileTitle;
});

// Add event listener to the form submit
formOpen.addEventListener('submit', function (event) {
  // Prevent the default form submission
  event.preventDefault();

  // get value from .profile__name and .profile__title
  const profileName = document.querySelector('.profile__name').textContent;
  const profileTitle = document.querySelector('.profile__title').textContent;

  // Get the input values
  const namaInput =
    formOpen.querySelector('input[name="nama"]').value || profileName;
  const titleInput =
    formOpen.querySelector('input[name="title"]').value || profileTitle;

  // set the values to the profile
  document.querySelector('.profile__name').textContent = namaInput;
  document.querySelector('.profile__title').textContent = titleInput;

  // clear the form values
  formOpen.querySelector('input[name="nama"]').value = '';
  formOpen.querySelector('input[name="title"]').value = '';

  // Close the modal after form submission
  modalEditProfile.style.display = 'none';
});

// ######### CARD #########

// staic card
const initialCards = [
  {
    name: 'Lembah Yosemite',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg',
  },
  {
    name: 'Danau Louise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg',
  },
  {
    name: 'Pegunungan Gundul',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg',
  },
  {
    name: 'Gunung Latemar',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg',
  },
  {
    name: 'Taman Nasional Vanoise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg',
  },
  {
    name: 'Lago di Braies',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg',
  },
];

// open modal create card
btnCreateCard.addEventListener('click', function () {
  modalCreateCard.style.display = 'flex';
  modalEditProfile.classList.add('modal-show');
});

// Add event listener to the form submit
formCreateCard.addEventListener('submit', function (event) {
  // Prevent the default form submission
  event.preventDefault();

  // Get the input values
  const namaInput = formCreateCard.querySelector('input[name="nama_tempat"]');
  const linkInput = formCreateCard.querySelector('input[name="link_gambar"]');

  // Add the card to the card container
  addCardToContainer({
    name: namaInput.value,
    link: linkInput.value,
  });

  // clear the form values
  namaInput.value = '';
  linkInput.value = '';

  // Close the modal after form submission
  modalCreateCard.style.display = 'none';
});

const cardContainer = document.querySelector('.card__container');

// Function to create HTML for a card
let cardCounter = 1; // Initialize a counter for unique card IDs

function createCardHTML(card) {
  const cardTemplate = document.getElementById('card-template');
  const currentCardID = `card${cardCounter++}`;

  const cardClone = cardTemplate.content.cloneNode(true);
  const cardImage = cardClone.querySelector('.card__image img');
  const cardTitle = cardClone.querySelector('.card__info-title');

  cardImage.addEventListener('click', function () {
    showPopup(card.link, card.name);
  });

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  // Find the elements
  var activeCardIcon = cardClone.querySelector('.card__icon.active');
  var xCardIcon = cardClone.querySelector('.card__icon-x');

  // Add IDs to the elements
  activeCardIcon.id = `${currentCardID}_svg1`;
  xCardIcon.id = `${currentCardID}_svg2`;

  // Add event listeners
  activeCardIcon.addEventListener('click', function () {
    toggleSvgLove(`${currentCardID}_svg1`, `${currentCardID}_svg2`);
  });

  xCardIcon.addEventListener('click', function () {
    toggleSvgLove(`${currentCardID}_svg1`, `${currentCardID}_svg2`);
  });

  // Insert the new card at the beginning of the container
  if (cardContainer.firstChild) {
    cardContainer.insertBefore(cardClone, cardContainer.firstChild);
  } else {
    cardContainer.appendChild(cardClone);
  }
}

// Function to add a card to the card container
function addCardToContainer(card) {
  // Create the card HTML
  createCardHTML(card);
  // delete card button
  deleteCard();
}

// Add existing cards
initialCards.forEach((card) => {
  addCardToContainer(card);
});

// delete card
function deleteCard() {
  const deleteButtons = document.querySelectorAll('.card__delete');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const cardItem = button.closest('.card__item');
      if (cardItem && cardContainer.contains(cardItem)) {
        cardContainer.removeChild(cardItem);
      }
    });
  });
}

// init delete card
deleteCard();

// like
function toggleSvgLove(svg_1, svg_2) {
  const svg1 = document.getElementById(svg_1);
  const svg2 = document.getElementById(svg_2);

  if (svg1.classList.contains('active')) {
    svg1.classList.remove('active');
    svg2.classList.add('active');
  } else {
    svg2.classList.remove('active');
    svg1.classList.add('active');
  }
}

// image popup
function showPopup(imageSrc, nama) {
  modalPreviewImage.style.display = 'flex';
  modalPreviewImage.classList.add('modal-show');

  const priviewImage = modalPreviewImage.querySelector('#previewImage');
  priviewImage.src = imageSrc;

  const previewTitle = modalPreviewImage.querySelector('#namaImage');
  previewTitle.textContent = nama;
}
