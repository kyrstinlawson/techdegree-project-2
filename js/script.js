/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

const studentList = document.querySelector(".student-list");
const linkList = document.querySelector(".link-list");
const header = document.querySelector("header");


function createElement(elementName, property, value) {
   const element = document.createElement(elementName);
   element[property] = value;
   return element;
};


// showPage function that requires a list (array of data) and page number; 
// it then displays 9 objects from that list on the requested page number.
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
// at the bottom of the page with page numbers required to show full list with 9 objects per page
// then calls the showPage function based on the button/page number clicked
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
      document.querySelector("button").className = "active";
   }
   linkList.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
         document.querySelector(".active").className = "";
         e.target.className = "active";
         showPage(list, e.target.textContent);
      }
   });
};

showPage(data, 1);
addPagination(data);

// creates search bar 
let label = createElement("label", "for", "search");
header.appendChild(label);
label.className = "student-search";
let span = createElement("span", "textContent", "Search by name");
label.appendChild(span);
let input = createElement("input", "id", "search");
label.appendChild(input);
input.placeholder = "Search by name...";
let button = createElement("button", "type", "button");
label.appendChild(button);
let img = createElement("img", "src", "img/icn-search.svg");
button.appendChild(img);
img.alt = "Search icon";

const search = document.querySelector("#search");
const searchButton = document.querySelector("button");

// Searches the first and last names of provided list and compares to search input and only shows the matches
function searchList(searchInput, list) {
   const searchMatch = [];
   for (let i = 0; i < list.length; i++) {
      if (searchInput.value.length !== 0 && 
         (list[i].name.first.toLowerCase().includes(searchInput.value.toLowerCase()) 
         || list[i].name.last.toLowerCase().includes(searchInput.value.toLowerCase()))) {
         searchMatch.push(list[i]);
         console.log(list[i].name);
         showPage(searchMatch, 1);
         addPagination(searchMatch);
      } else if (searchMatch.length === 0 && searchInput.value.length !== 0) {
         studentList.innerHTML = `<p> No results found </p>`;
         linkList.innerHTML = "";
      } else if (searchInput.value.length === 0) {
         showPage(data, 1);
         addPagination(data);
      }
   }
};

searchButton.addEventListener("submit", (e) => {
   e.preventDefault();
   searchList(search, data);
});

search.addEventListener("keyup", () => {
   searchList(search, data);
});

