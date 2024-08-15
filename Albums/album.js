


let photos = [];
let currenPage = 1;
let itemsPerPage = 10;

function fetchPhotos() {
    fetch('https://jsonplaceholder.typicode.com/albums')
    .then(response => response.json())
    .then(data => {
        photos = data;
        displayPhotos();
        updatePagination();
     })
    .catch(error => console.error('Error :', error));
    
}
function displayPhotos(){
    let start = (currenPage - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let currenPhotos = photos.slice(start,end);
    
    let photosBody = document.getElementById('photosBody');
    photosBody.innerHTML = "";

    currenPhotos.forEach(photo => {
        let row = document.createElement('tr');
        row.innerHTML =`
      <td>${photo.userId}</td>
      <td>${photo.id}</td>
      <td>${photo.title}</td>
        `;
        photosBody.appendChild(row)


    });
}
function updatePagination(){
    let totalPages = Math.ceil(photos.length / itemsPerPage);
    document.getElementById('currenPage').textContent = `Page ${currenPage} of ${totalPages}`;
    document.getElementById('prevPage').disabled = currenPage === 1;
    document.getElementById('nextPage').disabled = currenPage === totalPages;
}
document.getElementById('prevPage').addEventListener("click", () => {
    if(currenPage > 1){
        currenPage--;
        displayPhotos();
        updatePagination();
    }
})
document.getElementById('nextPage').addEventListener("click", () => {
    let totalPage = Math.ceil(photos.length / itemsPerPage);
    if(currenPage < totalPage){
        currenPage++;
        displayPhotos();
        updatePagination();
    }
})
fetchPhotos();