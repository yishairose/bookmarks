const modalContainer = document.querySelector('.modal-container');
const showButton = document.querySelector('#show-modal');
const closeButton = document.querySelector('.close-icon');
const bokkmarkForm = document.querySelector('#bookmark-form');
const websiteNameEl = document.querySelector('#website-name');
const websiteUrlEl = document.querySelector('#website-url');
const bookmarkContainer = document.querySelector('.container')

function showModal() {
    modalContainer.classList.add('show-modal');
    websiteNameEl.focus();
}
showButton.addEventListener('click', showModal);
closeButton.addEventListener('click', () => { modalContainer.classList.remove('show-modal') });
window.addEventListener('click', (e => {
    e.target == modalContainer ? modalContainer.classList.remove('show-modal') : false;
}))