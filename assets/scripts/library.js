class Book{
    constructor(_id, _title, _author,_description, _imageurl,_toBeRead, _readBook){

        this.id = _id;
        this.title = _title;
        this.author = _author;
        this.description=_description;
        this.imageurl=_imageurl;
        this.toBeRead=_toBeRead;
        this.readBook=_readBook;
        
    }
}

function readFunction1(event){
    $("#addBookModal").show();

$("#closeAddModalSpn").click(function(){
    $("#addBookModal").hide();
});

}

//Add event to Add Book button
document.addEventListener('DOMContentLoaded',(event)=>{

    const addButton = document.getElementById("addBtn");
    addButton.addEventListener('click',readFunction1)
    
})


const books = JSON.parse(localStorage.getItem('books')) || [];

//adding 2 default books 
if(books.length==0)
{
    handleSubmit('BABEL', 'R. F. Kuang', 'From award-winning author R. F. Kuang comes Babel, a historical fantasy epic that grapples with student revolutions, colonial resistance, and the use of language and translation as the dominating tool of the British Empire.', 'https://i.harperapps.com/hcanz/covers/9780008501822/x480.jpg');
    handleSubmit('If We Were Villains', 'M.L. Rio', 'Oliver Marks has just served ten years in jail - for a murder he may or may not have committed. On the day he is released, he is greeted by the man who put him in prison. Detective Colborne is retiring, but before he does, he wants to know what really happened a decade ago.', 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1480717682i/30319086.jpg'); 

    populateGrid();
    location.reload();
}

document.getElementById("myGrid").innerHTML=" ";

function populateGrid(){
    $.each(books, function(index, book){
        const item = `<div class="grid-item">
                    <div class="img-container">
                        <img class="image" src="${book.imageurl}">
                        <div class="middle">
                            <div class="text">${book.description}</div>
                        </div>
                    </div>
                    <div class="attr" id="">${book.title} <br> ${book.author}</div>
                    <div>
                         <button class ="glow-on-hover" type="button" name="readBtn" id="readBtn" data-read-id="${book.id}">Read Me</button>   
                    </div>
                </div>`;
        
                document.getElementById("myGrid").innerHTML += item;
        
    });
}

populateGrid();


//this function makes the form function as it should

function handleSubmit(_title, _author, _description, _image){
    // Create Object
    var newBook = {
        id: Math.floor(Math.random() * 1000000), // Random number between 0 and 1000000
        title:_title,
        author:_author,
        description:_description,
        imageurl:_image,
        toBeRead:false,
        readBook:false

    }

    // Retrieve existing books from localStorage, or initialize an empty array if none exist
    var existingBooks = JSON.parse(localStorage.getItem('books')) || [];

    // Add the new book to the array
    existingBooks.push(newBook);

    // Update localStorage with the new array
    localStorage.setItem('books', JSON.stringify(existingBooks));

}

$(document).ready(function(){
    $("#submitBtn").click(function() {
        // Get values from form fields
        var title = $("#bookTitle").val();
        var author = $("#author").val();
        var description = $("#description").val();
        var imageurl = $("#image").val();

        // Call the handleSubmit function with the form values
        handleSubmit(title, author, description, imageurl);
    });
})


//add functionality to read me button
const gridBody = document.getElementById("myGrid");

$(gridBody).on('click', "#readBtn", function(){
    const bookId = $(this).data('read-id');
    const book = books.find(n => n.id == bookId);
    

    console.log($`Selected order = ${book}`);

    book.toBeRead=true;

     // Update the orders in localStorage
    localStorage.setItem('books', JSON.stringify(books));

    $("#book-name").text(book.title);

    $("#readModal").show();
})


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