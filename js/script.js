/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/


const studentList = document.querySelector(".student-list");
const linkList = document.querySelector(".link-list");
const header = document.querySelector("header");

let label = document.createElement("label");
header.appendChild(label);
label.for = "search";
label.className = "student-search";
let span = document.createElement("span");
label.appendChild(span);
span.textContent = "Search by name";
let input = document.createElement("input");
label.appendChild(input);
input.id = "search";
input.placeholder = "Search by name...";
let button = document.createElement("button");
label.appendChild(button);
button.type = "button";
let img = document.createElement("img");
button.appendChild(img);
img.src = "img/icn-search.svg";
img.alt = "Search icon";




// showPage function that requires a list (array of data) and page number; 
//it then displays 9 objects from that list on the requested page number.
function showPage(list, page) {
   let startIndex = (page * 9) - 9;
   let endIndex = (page * 9);
   studentList.innerHTML = "";
   for (let i=0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         let studentItem = 
            `<li class="student-item cf">
            <div class="student-details">
            <img class="avatar" src=${list[i].picture.thumbnail} alt="Profile Picture">
            <h3>${list[i].name.first} ${list[i].name.last}</h3>
            <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
            <span class="date">Joined ${list[i].registered.date}</span>
            </div>
            </li>
            `;
            studentList.insertAdjacentHTML("beforeend", studentItem);
      } 
      
   }
};


// addPagination function takes a provided list (array of objects) and creates buttons 
//at the bottom of the page with page numbers required to show full list with 9 objects per page
function addPagination(list) {
   let numOfPages = Math.ceil(list.length / 9);
   linkList.innerHTML = "";
   for (let i=1; i <= numOfPages; i++) {
      let button = 
      `<li>
      <button type="button">${i}</button>
      </li>
      `;
      linkList.insertAdjacentHTML("beforeend", button);
   }
   document.querySelector("button").className = "active";
};

// EventListener looks for a click on one of the page buttons and selects that "page" to display using the showPage function
linkList.addEventListener("click", (e) => {
   if (e.target.tagName === "BUTTON") {
      document.querySelector(".active").className = "";
      e.target.className = "active";
      showPage(data, e.target.textContent);
   }
});


showPage(data, 1);
addPagination(data);
