// global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const searchBar = document.getElementById("searchBar");
let cardIndex = null;

// fetches data from API
fetch(urlAPI)
.then(res => res.json())
.then(res => res.results)
.then(displayEmployees)
.catch(err => console.log(err))


// displays data in employee cards
function displayEmployees(employeeData) {
    employees = employeeData;
    
    let employeeHTML = '';
    
    employees.forEach((employee, index) => {
    console.log(index);
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;
    
    employeeHTML += `
        <div class="card" data-index="${index}">
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
        </div>
        </div>
        `
    });
    gridContainer.innerHTML = employeeHTML;
}

// Creates a modal window that will pop up when any part of the user’s row is clicked.
function displayModal(index) {

    let { name, dob, phone, email, location: { city, street, state, postcode }, picture } = employees[index];
    let date = new Date(dob.date);
    cardIndex = Number(index);
    
    // Removes unneccessary arrows on first and last card
    if (cardIndex === 0) {
        left.style.visibility = "hidden";
    } else {
        left.style.visibility = "visible";
    };

    if (cardIndex === 11) {
        right.style.visibility = "hidden";
    } else {
        right.style.visibility = "visible";
    };

    // Populates the modal with HTML
    const modalHTML = `
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
        <hr />
        <p>${phone}</p>
        <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
        <p>Birthday:
        ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
        `;

    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}

// choses correrct card when not grid container itself is clicked
gridContainer.addEventListener('click', e => {
    if (e.target !== gridContainer) {
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');
        
        displayModal(index);
    }
});

// If user clicks close or outside modal overlay should be hidden
modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});

window.onclick = function(e) {
    if (e.target == overlay) {
        overlay.classList.add("hidden");
    };
};

// Adds a way to filter the directory by name. 
searchBar.addEventListener('keyup', e => {
    let searchResult = e.target.value.toLowerCase();
    let profileName = document.querySelectorAll('.name');
    
    profileName.forEach(profile => {
        if (profile.textContent.toLowerCase().includes(searchResult)) {
            profile.parentNode.parentNode.style.display = 'flex';
        } else {
            profile.parentNode.parentNode.style.display = 'none';
        }
    });
});

// Adds a way to move back and forth between employee detail windows when the modal window is open.
const left = document.getElementById("left-arrow");
const right = document.getElementById("right-arrow");

left.addEventListener('click', () => {
    displayModal(cardIndex - 1);
});

right.addEventListener('click', () => {
    displayModal(cardIndex + 1);
});
