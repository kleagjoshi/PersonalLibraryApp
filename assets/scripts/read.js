class Book{
    constructor(_id, _title, _author){

        if(arguments.length != 3)
        {
            throw new Error("Please, provide 3 properties")
        }

        this.id = _id;
        this.title = _title;
        this.author = _author;
        
    }
}

const books = [
    new Book(0,'Babel','R.F KUANG'),
    new Book(1, 'The God Of Endings','JACQUELINE HOLLAND'),
    new Book(2, 'If We Were Villains','M.L.RIO')
];



for(let i=0;i<books.length;i++)
{
    document.getElementById("book"+i).innerHTML="<br>"+books[i].title +"<br><br>"+ books[i].author+"<br>";
    
    //<button id="readBtn" data-book-id="${book.id}">Read Me</button>
    // var Button = document.createElement('button');
    // Button.id = 'Btn'+i;
    // Button.innerHTML = 'Read Me';
    // document.getElementById("book"+i).appendChild(Button);

}

function readFunction(event){
    $("#readModal").show();

$("#closeReadSpn").click(function(){
    $("#readModal").hide();
});
}

function readFunction1(event){
    $("#addBookModal").show();

$("#closeAddModalSpn").click(function(){
    $("#addBookModal").hide();
});

}

// Add event to Read Me button
document.addEventListener('DOMContentLoaded',(event)=>{

    const readMeBtn = document.getElementsByName("readBtn");

    for (let i = 0; i < readMeBtn.length; i++) {
        readMeBtn[i].addEventListener("click", readFunction);
    }

    
})

//Add event to Add Book button
document.addEventListener('DOMContentLoaded',(event)=>{

    const addButton = document.getElementById("addBtn");
    addButton.addEventListener('click',readFunction1)
    
})

// Search function

function search(){

    const test = document.getElementById("inputId").value;
    const book1=test.toLowerCase();
    // console.log(test);
    const book = books.find(n=> n.title.toLowerCase()==book1);
    // console.log(book);

    if(book){
        alert("YAY!! \n The book ' "+book.title+" ' you are searching is in our library.");
        document.getElementsByClassName("grid-container").innerHTML="";
        const newDiv=document.createElement("div");
        newDiv.id="book"+book.id;
        newDiv.innerHTML="<br>"+book.title+"<br><br>"+book.author;
        document.getElementsByClassName("grid-container").appendChild(newDiv);
       
        // document.getElementById("book"+book.id).innerHTML="<br>"+books[book.id].title +"<br><br>"+ books[book.id].author+"<br>";
    }
    else{
        alert("Error 404!!!\nHahaha Just kidding :) \nWe don't have this book.");
    }
    

}

document.addEventListener('DOMContentLoaded',(event)=>{

    const searchButton = document.getElementById("searchBtn");
    searchButton.addEventListener('click',search);

    
})


