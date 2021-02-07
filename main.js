
//dark svg path 
const moonPath="M17.5 40C17.5 62.0914 40 80 40 80C17.9086 80 0 62.0914 0 40C0 17.9086 17.9086 0 40 0C40 0 17.5 17.9086 17.5 40Z" ;
const sunPath= "M55 27.5C55 42.6878 42.6878 55 27.5 55C12.3122 55 0 42.6878 0 27.5C0 12.3122 12.3122 0 27.5 0C42.6878 0 55 12.3122 55 27.5Z";
const darkMode = document.querySelector('#dark-mode');
//submit 
const submit = document.querySelector('#book-form') ;

//book class

class Book{
   constructor(title , author , isbn){
       this.title=title ;
       this.author= author ;
       this.isbn=isbn;  

   }
}


// ui class : ui tasks

class UI{
    //display Book method
    static displayBook(){
       
        Store.getBooks().forEach((book)=>UI.insertBook(book));

    }
    
    //insert book method
    static insertBook(book){
        const list=document.getElementById('book-list');
        const row =document.createElement('tr') ;

        row.innerHTML= `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><button class="btn btn-danger btn-sm float-right delete ">X</button></td> `;
        
        list.appendChild(row);

    }
    // delete book method
    static deleteBook(el){
        if(el.classList.contains='delete'){
            el.parentElement.parentElement.remove();
            }
    }
    //clear field method
    static clearFields(){
        document.querySelector('.title').value="";
        document.querySelector('.author').value="";
        document.querySelector('.isbn').value="";
    }
    //yellow alert
    static showAlert(){
        const container= document.querySelector('.divs');
        const alert=document.querySelector('.alert-warning');
        const div= alert.cloneNode(true);
        div.style.display="flex";
        container.appendChild(div);
        setTimeout(()=>div.remove(),2000);
        div.addEventListener("click", (e)=>{
            if(e.target.classList.contains("close")){
                div.remove();
            }
        });

    }
    //green alert
    static showSuccess(message , className){
        const div= document.createElement('div') ;
        div.className=`alert alert-${className}` ;
        
        div.appendChild(document.createTextNode(message));

        const container=document.querySelector('.container');
        const form=document.querySelector('#book-form');
        container.insertBefore(div,form);
        setTimeout(()=>div.remove(),2500);
        
    }
   //Ui class ended
}


//store class: storage
class Store{
    static getBooks(){
       let books ;
         if(localStorage.getItem("books")==null){
             books=[];
         }
         else{
            books= JSON.parse(localStorage.getItem("books"));
         }
         
         return books ;
    }

    static addBook(book){
         const books = this.getBooks() ;

         books.push(book);

         localStorage.setItem('books', JSON.stringify(books));

    }
    static removeBook(isbn){
         const books=this.getBooks();
         books.forEach((book,index)=>{
              if(book.isbn===isbn){
                  books.splice(index,1);
              }
         })
         
         localStorage.setItem("books",JSON.stringify(books));
 
    }
}
//event display book 

document.addEventListener("DOMContentLoaded",UI.displayBook);

//event add book 
submit.addEventListener('submit', (e)=>{

    e.preventDefault();
    const title= document.querySelector('.title').value;
    const author= document.querySelector('.author').value;
    const isbn= document.querySelector('.isbn').value;

    if(title==='' || author==="" || isbn===""){
        UI.showAlert();
    }
    else{
        let book= new Book(title, author, isbn);
        Store.addBook(book);
        UI.insertBook(book);
        UI.clearFields();
        UI.showSuccess("Book Added Successfully","success");
    }   
});

//event delete book

document.querySelector('#book-list').addEventListener("click",(e)=>{
    
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    UI.deleteBook(e.target) ;
    UI.showSuccess("Book Deleted Successfully","success")
} );

//dark mode 
let toggle=false;

darkMode.addEventListener("click",()=>{

    let timeline = anime.timeline({
        duration:600,
   
        easing: 'easeOutExpo'
    });

    if(!toggle){
        timeline.add(
        {       
                targets:".sun" ,
                d:[
                    {value: !toggle ? moonPath : sunPath}
                ]
        })
        .add({
      
            targets: "#dark-mode",
            rotate: 580
               
            
        },"-=200")
        .add({
            targets:"body",
            backgroundColor: !toggle ?"#0e1531": "#ffffff"  ,
            color: !toggle ? "#fffff" :"#888"
            
        },"-=200");
        timeline.children[1].animations[0].tweens[0].from.numbers[0]= 10;
        document.getElementById('dark-mode').classList.remove('triggered') ;
    }
    else{
        document.getElementById('dark-mode').classList.add('triggered') ;
        timeline.add({
      
            targets: "#dark-mode",
            rotate: 580
            
            
            
        })
        .add(
        {
                targets:".sun" ,
                d:[
                    {value: !toggle ? moonPath : sunPath}
                ]
        })
        .add({
            targets:"body",
            backgroundColor: !toggle ?"#0e1531": "#ffffff"  ,
            color: !toggle ? "#fffff" :"#888"
            
        },"-=200");
    }
    

    
       toggle=!toggle ;
        console.log(toggle);
        if(toggle) {
            
           
            document.querySelector(".table").classList.add("dark");
            document.querySelector("h1").classList.add("dark");
            window.x=setInterval(()=>{
                const snowflake= document.createElement("i");
                snowflake.classList.add("fas");
                snowflake.classList.add("fa-snowflake");
                snowflake.style.left= `${Math.random() * 90}%` ;
                snowflake.style.fontSize=`${Math.random()*0.6 +0.6}rem`;
                snowflake.style.opacity=`${Math.random()*0.8 + 0.2}`;
                snowflake.style.animationDuration=`${Math.random()*3 +3}s`;
                document.querySelector('header').appendChild(snowflake);
                
            }
            ,100);



            

        }
        else {
        
            clearInterval(window.x);
            document.querySelector(".table").classList.remove("dark");
            document.querySelector("h1").classList.remove('dark');
            
            const faArray= Array.from(document.getElementsByTagName("i"));
            faArray.forEach((x)=>x.classList.remove("fa-snowflake"));
               
            
            
             
            
        }

       
});






