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
    new Book(0, 'The secret history','DONNA TARTT'),
    new Book(1,'The Hollow Places','T. KINGFISHER'),
];



for(let i=0;i<books.length;i++)
{
    document.getElementById("book"+i).innerHTML="<br>"+books[i].title +"<br><br>"+ books[i].author+"<br>";

}

function readFunction(event){
    $("#readModal").show();

$("#closeReadSpn").click(function(){
    $("#readModal").hide();
});
}



// Add event to Start Reading button
document.addEventListener('DOMContentLoaded',(event)=>{

    const readMeBtn = document.getElementsByName("startReadBtn");

    for (let i = 0; i < readMeBtn.length; i++) {
        readMeBtn[i].addEventListener("click", readFunction);
    }

    
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


