document.getElementById('bookmarkForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const websiteName = document.getElementById('websiteName').value;
    let websiteURL = document.getElementById('websiteURL').value;

    if (!isValidURL(websiteURL)) {
        alert('Please enter a valid URL with the correct format (e.g., http://, https://, www, .com, .org, etc.).');
        return;
    }

    if (!/^https?:\/\//i.test(websiteURL)) {
        websiteURL = 'http://' + websiteURL;
    }

    if (websiteName && websiteURL) {
        addBookmark(websiteName, websiteURL);
    }
});

function isValidURL(url) {
    const regex = /^(https?:\/\/|www\.)[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([\/?].*)?$/i;
    return regex.test(url);
}

function addBookmark(name, url) {
    const table = document.getElementById('bookmarkTable');
    const index = table.rows.length + 1;

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${index}</td>
        <td>${name}</td>
        <td>
            <a href="${url}" target="_blank" class="btn btn-success">Visit</a>
        </td>
        <td>
            <button class="btn btn-danger" onclick="deleteBookmark(this)">Delete</button>
        </td>
    `;
    table.appendChild(row);

    document.getElementById('websiteName').value = '';
    document.getElementById('websiteURL').value = '';
}

function deleteBookmark(button) {
    const row = button.closest('tr');
    row.remove();

    const table = document.getElementById('bookmarkTable');
    Array.from(table.rows).forEach((row, index) => {
        row.cells[0].innerText = index + 1;
    });
}
