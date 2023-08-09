const modalContainer = document.querySelector('.modal-container');
const showButton = document.querySelector('#show-modal');
const closeButton = document.querySelector('.close-icon');
const bookmarkForm = document.querySelector('#bookmark-form');
const websiteNameEl = document.querySelector('#website-name');
const websiteUrlEl = document.querySelector('#website-url');
const bookmarkContainer = document.querySelector('.container');

let bookmarks = []

function showModal() {
    modalContainer.classList.add('show-modal');
    websiteNameEl.focus();
}
function validate(nameValue, urlValue) {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
    const regEx = new RegExp(expression);
    if (!nameValue || !urlValue) {
        alert('Please fill in all fields!')
        return false;
    }
    if (!urlValue.match(regEx)) {
        alert('Please insert valid URL!');
        return false;
    }
    return true;
}

// Build Bookmarks DOM
function buildBookmarks() {
    bookmarkContainer.textContent = '';
    bookmarks.forEach((bookmark) => {
        const { name, url } = bookmark;
        //Item
        const item = document.createElement('div');
        item.classList.add('item');
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fa-regular', 'fa-circle-xmark');
        closeIcon.setAttribute('title', 'Delete Bookmark');
        closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');
        const favicon = document.createElement('img');
        favicon.setAttribute('src', `https://www.google.com/s2/favicons?domain=${url}`);
        const link = document.createElement('a');
        link.setAttribute('href', `${url}`);
        link.setAttribute('target', '_blank');
        link.textContent = name;
        linkInfo.append(favicon, link);
        item.append(closeIcon, linkInfo);
        bookmarkContainer.appendChild(item)
    });
}
function fetchBookmarks() {
    if (localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    } else {
        bookmarks = [
            {
                name: 'Google',
                url: 'https://google.com'
            },
        ];
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    buildBookmarks();

}

function deleteBookmark(url) {
    bookmarks.forEach((bookmark, i) => {
        if (bookmark.url === url) {
            bookmarks.splice(i, 1);
        }
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    });
    buildBookmarks();

}
function saveBookmark(e) {
    e.preventDefault();
    const websiteName = websiteNameEl.value;
    let websiteUrl = websiteUrlEl.value;
    if (!websiteUrl.includes('http://') && !websiteUrl.includes('https://')) {
        websiteUrl = `https://${websiteUrl}`;
    }
    if (!validate(websiteName, websiteUrl)) {
        return false;
    }
    const bookmark = {
        name: websiteName,
        url: websiteUrl,
    };
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteNameEl.focus();
}
showButton.addEventListener('click', showModal);
closeButton.addEventListener('click', () => { modalContainer.classList.remove('show-modal') });
window.addEventListener('click', (e => {
    e.target == modalContainer ? modalContainer.classList.remove('show-modal') : false;
}))
bookmarkForm.addEventListener('submit', saveBookmark);
fetchBookmarks();