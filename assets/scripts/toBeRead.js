//populate grid on to be read page
const books = JSON.parse(localStorage.getItem('books')) || [];

document.getElementById("myGrid").innerHTML=" ";

const filteredBooks = books.filter(book => book.toBeRead == true);

function populateGrid(){
    $.each(filteredBooks, function(index, book){
        const item = `<div class="grid-item">
                    <div class="img-container">
                        <img class="image" src="${book.imageurl}">
                        <div class="middle">
                            <div class="text">${book.description}</div>
                        </div>
                    </div>
                    <div class="attr" id="">${book.title} <br> ${book.author}</div>
                    <div>
                         <button class ="glow-on-hover" type="button" name="startReadBtn" id="startReadBtn" data-read-id="${book.id}">Start Reading</button>   
                    </div>
                </div>`;
        
                document.getElementById("myGrid").innerHTML += item;
        
    });
}

populateGrid();

//make the button start reading functional

const gridBody = document.getElementById("myGrid");

$(gridBody).on('click', "#startReadBtn", function(){
    const bookId = $(this).data('read-id');
    const book = books.find(n => n.id == bookId);
   
    book.readBook=true; //add to already read
    book.toBeRead=false; //remove from wishing list

     // Update the books in localStorage
    localStorage.setItem('books', JSON.stringify(books));

    $("#book-name").text(book.title);

    $("#readModal").show();

    location.reload();
})


$("#closeReadSpn").click(function(){
    $("#readModal").hide();
});


// Search function

function search(){

    const test = document.getElementById("inputId").value;
    const book1=test.toLowerCase();
    
    const book = filteredBooks.find(n=> n.title.toLowerCase()==book1);
    if(book){
        alert("YAY!! \n You have' "+book.title+" ' in your wishing list.");
    }
    else{
        alert("Error 404!!!\nHahaha Just kidding :) \nYou don't have this book in your wishing list.");
    }
}

document.addEventListener('DOMContentLoaded',(event)=>{

    const searchButton = document.getElementById("searchBtn");
    searchButton.addEventListener('click',search);

    
})
