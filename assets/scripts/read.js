
//populate grid on already read page
const books = JSON.parse(localStorage.getItem('books')) || [];

document.getElementById("myGrid").innerHTML = " ";

const filteredBooks = books.filter(book => book.readBook == true);

function populateGrid() {
    $.each(filteredBooks, function (index, book) {
        const item = `<div class="grid-item">
                        <div class="img-container">
                            <img class="image" src="${book.imageurl}">
                        <div class="middle">
                            <div class="text">${book.description}</div>
                        </div>
                        </div>
                        <div class="attr" id="">${book.title} <br> ${book.author}</div>
                        <div
                        class="RadialProgress"
                        role="progressbar"
                        aria-valuenow="0"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                        <input class=sliding type="range" value="0" min="0" max="100" />
                </div>
                </div>`;

        document.getElementById("myGrid").innerHTML += item;

    });
}

populateGrid();

//progress bar
const controller = document.querySelector('input[type=range]');
const radialProgress = document.querySelector('.RadialProgress');

const setProgress = (progress) => {
  const value = `${progress}%`;
  radialProgress.style.setProperty('--progress', value)
  radialProgress.innerHTML = value
  radialProgress.setAttribute('aria-valuenow', value)
}

setProgress(controller.value)
controller.oninput = () => {
  setProgress(controller.value)
}


// Search function

function search() {

    const test = document.getElementById("inputId").value;
    const book1 = test.toLowerCase();

    const book = filteredBooks.find(n => n.title.toLowerCase() == book1); //iterate on filteredBooks array now
    if (book) {
        alert("YAY!! \n You have ' " + book.title + " ' in your reading list.");
    }
    else {
        alert("Error 404!!!\nHahaha Just kidding :) \nYou don't have this book in your reading list.");
    }
}

document.addEventListener('DOMContentLoaded', (event) => {

    const searchButton = document.getElementById("searchBtn");
    searchButton.addEventListener('click', search);


})