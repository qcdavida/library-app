let myLibrary = [];
let counter = 0;

//Original constructor code before:
// function Book (title, author, pages, readBook, inTable, id){
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.readBook = readBook;
//     this.inTable = inTable;
//     this.bookID = id;
// }

//Refactored code to make use of Class instead of constructors:
class BookClass {
    constructor(title, author, pages, readBook, inTable, id){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readBook = readBook;
        this.inTable = inTable;
        this.bookID = id;
    }
}

//create book objects and push add it to the library
//Dummy data to fill up the table
let firstBook = new BookClass('A Clockwork Orange', 'Anthony Burgess', 160, true, false, counter++);
let secondBook = new BookClass('The Hitchhiker’s Guide To The Galaxy', 'Dougals Adams', 180, false, false, counter++);
let thirdBook = new BookClass('The Great Gatsby', 'F. Scott Fitzgerald', 184, false, false, counter++);
addBookToLibrary(firstBook);
addBookToLibrary(secondBook);
addBookToLibrary(thirdBook);
addBookToTable(myLibrary);



function addBookToLibrary(newBook){
    myLibrary.push(newBook);
}


//the next two functions handle the form popping up on the screen for the user
function openForm() {
    document.getElementById("myForm").style.display = "block";
}
  
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}


//This function helps to add the book objects to the table
//It fills in the column info with the object's states
function addBookToTable(libraryArray){
    for(let i = 0; i < libraryArray.length; i++){
        if(libraryArray[i].inTable == true){
            continue;
        }
        else{
            if(libraryArray[i].readBook == true){
                let table = document.getElementById('tableTbody');
                let row = "";
                row += '<tr><td>' + libraryArray[i].title + '</td><td>' + libraryArray[i].author +
                        '</td><td>' + libraryArray[i].pages + '</td><td>' +
                        "<button class='modifyBtn'>Read</button>" + '</td><td>' +
                        `<button class='deleteBtn' id=${libraryArray[i].bookID}>Delete</button>` + '</td></tr>';
                
                table.innerHTML += row;
                libraryArray[i].inTable = true;
            }
            else{
                let table = document.getElementById('tableTbody');
                let row = "";
                row += '<tr><td>' + libraryArray[i].title + '</td><td>' + libraryArray[i].author +
                        '</td><td>' + libraryArray[i].pages + '</td><td>' + 
                        "<button class='modifyBtn2'>Not Read</button>" + '</td><td>' +
                        `<button class='deleteBtn' id=${libraryArray[i].bookID}>Delete</button>` + '</td></tr>';
                
                table.innerHTML += row;
                libraryArray[i].inTable = true;
            }
        }
    }

}

//Event Listener for the read status button
document.addEventListener('click', function(e){
    if(e.target && (e.target.className=='modifyBtn' || e.target.className=='modifyBtn2')){
        if(e.target.innerHTML == 'Read'){
            e.target.innerHTML = 'Not Read';
            e.target.className = 'modifyBtn2';
        }
        else{
            e.target.innerHTML = 'Read';
            e.target.className = 'modifyBtn';
        }
    }
})

//Event Listener for the delete button
document.addEventListener('click', function(e){
    if(e.target && e.target.className=='deleteBtn'){
        removeBookFromLibrary(e.target.id);
        let td = e.target.parentNode;
        let tr = td.parentNode;
        tr.parentNode.removeChild(tr);
    }
})

function removeBookFromLibrary(bookID){
    for(let i = 0; i < myLibrary.length; i++){
        if(myLibrary[i].bookID == Number(bookID)){
            myLibrary.splice(i, 1);
        }
    }
}

//Create an event listener for the add form button. This will 
//take the user input and create a new book object. 
//And finally pushes the object to the library to be displayed in the table.
let createBookBtn = document.getElementById('add-book-btn');
createBookBtn.addEventListener('click', function(){
    let bookTitle = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pageCount').value;
    let readStatus = document.getElementById('readStatus').checked;
    let newBook = new BookClass(bookTitle, author, pages, readStatus, false, counter);
    counter++;

    addBookToLibrary(newBook);
    addBookToTable(myLibrary);
})

