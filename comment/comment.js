let result = document.getElementById("result");
let currentPage = 1; // Correct initialization to start from page 1
const itemsPerPage = 10;
let posts = [];

document.addEventListener("DOMContentLoaded", function() {
    getPosts();
})

async function getPosts() {
    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/comments");
        posts = await response.json();
        displayPosts();
        updatePagination();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayPosts() {
    let start = (currentPage - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let currentPosts = posts.slice(start, end);

    result.innerHTML = "";
    currentPosts.forEach((element) => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${element.postId}</td>
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.email}</td>
            <td>${element.body}</td>
        `;
        let btn = document.createElement('button');
        btn.textContent = 'Delete';
        btn.classList.add('btn-style');

        let btnd = document.createElement('td');
        btnd.appendChild(btn);
        tr.appendChild(btnd);
        result.appendChild(tr);

        btn.addEventListener("click", function() {
            tr.remove();
        });
    });
}

function updatePagination() {
    let totalPages = Math.ceil(posts.length / itemsPerPage);
    document.getElementById('currentPage').textContent = `Page ${currentPage} of ${totalPages}`;

    let prevButton = document.getElementById('prevPage');
    let nextButton = document.getElementById('nextPage');

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayPosts();
        updatePagination();
    }
}

function nextPage() {
    let totalPages = Math.ceil(posts.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayPosts();
        updatePagination();
    }
}

document.getElementById('prevPage').addEventListener('click', prevPage);
document.getElementById('nextPage').addEventListener('click', nextPage);
