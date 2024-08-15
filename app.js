

// let promise = new Promise((resolve,reject) => {
//     setTimeout(() => {
//         let userdata = [
//             {
//                 name:"Ali",
//                 age:22
//             },
//             {
//                 name:"Ali",
//                 age:22
//             }
//         ]
//         return resolve(userdata);
//         // return reject({
//         //     message: "qandaydor xatolik yuz berdi",
//         //     code:403
//         // })
//     }, 2000);
// })
// promise
//  .then((response) => console.log(response))
//  .catch((err) => console.log(err))


// function domchachiqaratir(data = [] ){
//     document.body.innerHTML = ""
//     data.forEach((el) => {
//         document.body.innerHTML += `<li>${el.name} tel: ${el.phone}</li>`
//     })
// }

// fetch("https://jsonplaceholder.typicode.com/users")
// .then((response) => response.json())
// .then((data) => {
//     console.log(data);
//     domchachiqaratir(data)
    
// })



let result = document.getElementById("result");
let result1 = document.getElementById("result1");

document.addEventListener("DOMContentLoaded", function() {
    getUsers();
});

async function getUsers() {
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    let users = await response.json();
    displayUsers(users);
}

function displayUsers(users) {
    result.innerHTML = "";
    users.forEach((element, index) => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${element.name}</td>
        <td>${element.username}</td>
        <td>${element.email}</td>
        <td>${element.address.street}</td>
        <td>${element.phone}</td>
        <td>${element.website}</td>
        `;

        let btn = document.createElement('button');
        btn.textContent = 'View Photos';
        btn.classList.add('btn-style');

        let btnTd = document.createElement('td');
        btnTd.appendChild(btn);

        tr.appendChild(btnTd);
        result.appendChild(tr);

       
        btn.addEventListener("click", function() {
            getPhotos(element.id); 
        });
    });
}

async function getPhotos(userId) {
    let response = await fetch("https://jsonplaceholder.typicode.com/photos");
    let photos = await response.json();
    displayPhotos(photos, userId);
}

function displayPhotos(photos, userId) {
    result1.innerHTML = "";
    photos.forEach((element, index) => {

        if (element.albumId === userId) {
            let tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${element.albumId}</td>
                <td>${element.id}</td>
                <td>${element.title}</td>
                <td><a href="${element.url}" target="_blank">Link</a></td>
                <td><img src="${element.thumbnailUrl}" alt="Thumbnail"></td>
            `;
            result1.appendChild(tr);
        }
    });
}
