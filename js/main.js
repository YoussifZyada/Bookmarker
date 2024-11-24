const bookmarks = [];

document.getElementById('bookmarkForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const websiteName = document.getElementById('websiteName').value;
    let websiteURL = document.getElementById('websiteURL').value;

    if (!isValidURL(websiteURL)) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid URL',
            text: 'Please enter a valid URL with the correct format (e.g., http://, https://, www, .com, .org, etc.).'
        });
        return;
    }

    if (!/^https?:\/\//i.test(websiteURL)) {
        websiteURL = 'http://' + websiteURL;
    }

    addBookmark(websiteName, websiteURL);
    clearForm();
});

function isValidURL(url) {
    const regex = /^(https?:\/\/|www\.)[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([\/?].*)?$/i;
    return regex.test(url);
}

function addBookmark(name, url) {
    bookmarks.push({ name, url });
    renderBookmarks();
    Swal.fire({
        icon: 'success',
        title: 'Bookmark Added',
        text: `Successfully added "${name}".`
    });
}

function deleteBookmark(index) {
    const deletedBookmark = bookmarks.splice(index, 1);
    renderBookmarks();
    Swal.fire({
        icon: 'info',
        title: 'Bookmark Deleted',
        text: `Deleted bookmark "${deletedBookmark[0].name}".`
    });
}

function renderBookmarks() {
    const tableBody = document.getElementById('bookmarkTable');
    tableBody.innerHTML = '';

    bookmarks.forEach((bookmark, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${bookmark.name}</td>
            <td>
                <a href="${bookmark.url}" target="_blank" class="btn btn-success btn-sm">Visit</a>
            </td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteBookmark(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function clearForm() {
    document.getElementById('websiteName').value = '';
    document.getElementById('websiteURL').value = '';
}
