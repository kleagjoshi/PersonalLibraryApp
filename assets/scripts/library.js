class Book{
    constructor(_id, _title, _authors, _description, _coverUrl, _genre) {
        this.id = _id;
        this.title = _title;
        this.authors = _authors;
        this.description = _description;
        this.coverUrl = _coverUrl;
        this.genre = _genre;
    }
}

class Author{
    constructor(_fullname)
    {
        this.fullName=_fullname;
    }
}

function readFunction1(event){
    $("#addBookModal").show();

$("#closeAddModalSpn").click(function(){
    $("#addBookModal").hide();
});
}

function readFunction2(event){
    $("#addAuthorModal").show();

$("#closeAddAuthorModalSpn").click(function(){
    $("#addAuthorModal").hide();
});
}

//Add event to Add Book button
document.addEventListener('DOMContentLoaded',(event)=>{

    const addButton = document.getElementById("addBookBtn");
    addButton.addEventListener('click',readFunction1)
    
})

//Add event to Add Author button
document.addEventListener('DOMContentLoaded',(event)=>{

    const addButton = document.getElementById("addAuthorBtn");
    addButton.addEventListener('click',readFunction2)
    
})



var books = [];

console.log('Books (before request) = ', books);

//Request books data from the api endpoint
const settings = {
    async: true,
    crossDomain: true,
    url: 'https://localhost:44320/api/Books/get-all-books',
    method: 'GET',
    headers: {
        'content-type': 'application/json'
    }
};

$.ajax(settings).done(function (response) {
    console.log(response);

    books = response;

    console.log('Books (after request response) = ', books);

    populateGrid();
});
document.getElementById("myGrid").innerHTML=" ";

function populateGrid(){
    $.each(books, function(index, book){
        const item = `<div class="grid-item">
                    <div class="img-container">
                        <img class="image" src="${book.coverUrl}">
                        <div class="middle">
                            <div class="text">${book.description}</div>
                        </div>
                    </div>
                    <div class="attr" id="">${book.title} <br> ${book.authorNames.join(', ')} <br>${book.genreTitle} </div>
                    <div>
                         <button class ="glow-on-hover" type="button" name="readBtn" id="readBtn" data-read-id="${book.bookId}">Read Me</button>    
                    </div>
                </div>`;
        
                document.getElementById("myGrid").innerHTML += item;
        
    });
}



//this function makes the form function as it should

function handleSubmit(_title, _authors, _description, _genre, _image) {
    // Convert author IDs to integers
    const authorIds = _authors.map(authorId => parseInt(authorId, 10));


    // Create Object
    var newBook = {
        
        title: _title,
        authorIds: authorIds, // Update to match the server's expected format
        description: _description,
        genreId: parseInt(_genre, 10), // Convert genre ID to integer
        coverUrl: _image
    };

    //Request orders data from the api endpoint
    const settings = {
        async: true,
        crossDomain: true,
        url: 'https://localhost:44320/api/Books/add-book-with-authors',
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        data: JSON.stringify(newBook)
    };
    console.log(newBook);

    $.ajax(settings).done(function (response) {
        alert('Book added to json file');
    });


}

$(document).ready(function () {
    $("#submitBtn").click(function () {
        // Get values from form fields
        var title = $("#bookTitle").val();
        
        // Authors are selected using checkboxes, so retrieve them differently
        var authors = [];
        $("#authorsDropdown input:checked").each(function () {
            authors.push($(this).val());
        });

        var description = $("#description").val();
        var genre = $("#genre").val(); // Get the selected genre
        var imageurl = $("#image").val();

        // Call the handleSubmit function with the form values
        handleSubmit(title, authors, description, genre, imageurl);
        $("#addBookModal").hide();
        location.reload();

    });
})


//add functionality to read me button
const gridBody = document.getElementById("myGrid");

$(gridBody).on('click', "#readBtn", function(){
    const _bookId = $(this).data('read-id');
    
   
    //decode the token
const token = localStorage.getItem('token');

if (token) {
  const decodedToken = parseJwt(token);
  var _userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']; 
}
// Function to decode a JWT token
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

//add this record (user-book) to db

var newUserBook = {
    bookId: _bookId,
    userId:_userId  
};


// api endpoint
const settings = {
    async: true,
    crossDomain: true,
    url: 'https://localhost:44320/api/UserBooks/add-book-user?bookId=' + newUserBook.bookId + '&userId=' + newUserBook.userId,
    method: 'POST',
    headers: {
        'content-type': 'application/json'
    },
    
};

$.ajax(settings).done(function (response) {
    alert('UserBook added to json file');
});

//$("#book-name").text(Book.title);
 $("#readModal").show();
});


$("#closeReadSpn").click(function(){
    $("#readModal").hide();
});


// Search function

function search(){

    const test = document.getElementById("inputId").value;
    const book1=test.toLowerCase();

    var allBooks = JSON.parse(localStorage.getItem('books')) || [];
    
    
    const book = allBooks.find(n=> n.title.toLowerCase()==book1);
    if(book){
        alert("YAY!! \n The book ' "+book.title+" ' you are searching is in our library.");
    }
    else{
        alert("Error 404!!!\nHahaha Just kidding :) \nWe don't have this book.");
    }
}

document.addEventListener('DOMContentLoaded',(event)=>{

    const searchButton = document.getElementById("searchBtn");
    searchButton.addEventListener('click',search);

    
})

//Image preview in the form

function previewImage(input) {
    const preview = document.getElementById('imagePreview');
    const url = input.value.trim();

    if (url) {
        preview.src = url;
        preview.style.display = 'block';
    } else {
        preview.src = '';
        preview.style.display = 'none';
    }
}

//add author dropdown to add a book form
document.addEventListener('DOMContentLoaded', function () {
    // Fetch authors from your API endpoint
    fetch('https://localhost:44320/get-all-authors')
        .then(response => response.json())
        .then(authors => {
            const authorsDropdown = document.getElementById('authorsDropdown');

            // Create checkboxes for each author
            authors.forEach(author => {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.name = 'authors';
                checkbox.value = author.authorId; 
                const label = document.createElement('label');
                label.appendChild(document.createTextNode(author.fullName)); // Use the author's name or another property

                const authorDiv = document.createElement('div');
                authorDiv.appendChild(checkbox);
                authorDiv.appendChild(label);

                authorsDropdown.appendChild(authorDiv);
            });
        })
        .catch(error => console.error('Error fetching authors:', error));
});

function toggleAuthorsDropdown() {
    const authorsDropdown = document.getElementById('authorsDropdown');
    authorsDropdown.style.display = (authorsDropdown.style.display === 'none' || authorsDropdown.style.display === '') ? 'block' : 'none';
}

//add genre dropdown

document.addEventListener('DOMContentLoaded', function () {
    // Fetch genres from your API endpoint
    fetch('https://localhost:44320/api/Genres/get-all-genres')
        .then(response => response.json())
        .then(genres => {
            const genreDropdown = document.getElementById('genre');

            // Dynamically populate the dropdown options
            genres.forEach(genre => {
                const option = document.createElement('option');
                option.value = genre.genreId;  // Set the value
                option.text = genre.genreTitle;   // Set the displayed text
                genreDropdown.add(option);
            });
        })
        .catch(error => console.error('Error fetching genres:', error));
});

// Event listener for the form submission
document.getElementById('bookForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the selected genre value
    const selectedGenre = document.getElementById('genre').value;

});

//add authors by form

function handleAuthorSubmit(_fullname) {
  // Create Object
    var newAuthor = {
        fullName: _fullname   
    };

    //Request orders data from the api endpoint
    const settings = {
        async: true,
        crossDomain: true,
        url: 'https://localhost:44320/add-author',
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        data: JSON.stringify(newAuthor)
    };
    console.log(newAuthor);

    $.ajax(settings).done(function (response) {
        alert('Author added to json file');
    });


}

$(document).ready(function () {
    $("#submitAuthorBtn").click(function () {
        // Get values from form fields
        var fullName = $("#fullName").val();
        
        

        // Call the handleSubmit function with the form values
        handleAuthorSubmit(fullName);
        $("#addAuthorModal").hide();
        

    });
})


