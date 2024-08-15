let result = document.getElementById("result");
let currentPage = 1;
const itemsPerPage = 10;
let posts = []; 

document.addEventListener("DOMContentLoaded", function() {
    getPosts();
})

async function getPosts() {
    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/posts");
        posts = await response.json();
        displayPosts();
        updatePagination();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayPosts() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentPosts = posts.slice(start, end);

    result.innerHTML = "";
    currentPosts.forEach((element) => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${element.userId}</td>
            <td>${element.id}</td>
            <td>${element.title}</td>
            <td>${element.body}</td>
        `;

        let btn = document.createElement('button');
        btn.textContent = 'Delete';
        btn.classList.add('btn-style');

        let btntd = document.createElement('td');
        btntd.appendChild(btn);

        tr.appendChild(btntd);
        result.appendChild(tr);

        btn.addEventListener("click", function() {
            tr.remove();
        });
    });
}

function updatePagination() {
    const totalPages = Math.ceil(posts.length / itemsPerPage);
    document.getElementById('currentPage').textContent = `Page ${currentPage} of ${totalPages}`;

    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');

    prevButton.removeEventListener('click', prevPage);
    nextButton.removeEventListener('click', nextPage);
    prevButton.addEventListener('click', prevPage);
    nextButton.addEventListener('click', nextPage);

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
    const totalPages = Math.ceil(posts.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayPosts();
        updatePagination();
    }
}
