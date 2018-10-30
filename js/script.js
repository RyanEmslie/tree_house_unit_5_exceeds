//
//Ryan Emslie - Unit 5 - Exceeds Expectation
//Techdegree
//CSS Style changes - Background image/Card-hover/Image-Color
//

let url = "https://randomuser.me/api/?nat=us&results=12&noinfo";
let dataType = "json";
let employee = [];
let matchArray = [];
let currentEmp = 0;
let searchArray = false;


function listPerson(data) {
  let person = data;
  for (let i = 0; i < 12; i++) {
    let tempInfo = person.results[i];
    let fName = tempInfo.name.first;
    let lName = tempInfo.name.last;
    let city = tempInfo.location.city;
    let thumb = tempInfo.picture.large;
    let email = tempInfo.email;
    let state = tempInfo.location.state;
    let zipcode = tempInfo.location.postcode;
    let street = tempInfo.location.street;
    let date = tempInfo.dob.date;
    let dob = date.slice(-20,-10);
    let phone = tempInfo.phone;

    employee[i] = {
      fName: fName,
      lName: lName,
      email: email,
      phone: phone,
      city: city,
      thumb: thumb,
      state: state,
      zipcode: zipcode,
      street: street,
      dob: dob
    };

    // Dynamically appends innerHTML to the HTML #gallery
    let newHTML = document.querySelector("#gallery");
    newHTML.innerHTML += `<div class="card" onclick="populateModal(employee,${i})" >
<div class="card-img-container">
    <img class="card-img" src="${employee[i].thumb}" alt="profile picture">
</div>
<div class="card-info-container">
    <h3 id="name" class="card-name cap">${employee[i].fName} ${
      employee[i].lName
    }</h3>
    <p class="card-text">${employee[i].email}</p>
    <p class="card-text cap">${employee[i].city}, ${employee[i].state}</p>
</div>
</div>`;
  } //for loop
} //listPerson()

//function create cards
function createGallery() {
  removeChild("card");
  console.log(matchArray.length);
  for (let i = 0; i < matchArray.length; i++) {
    // Dynamically appends innerHTML to the HTML #gallery
    let newHTML = document.querySelector("#gallery");
    newHTML.innerHTML += `<div class="card" onclick="populateModal(matchArray,${i})" >
<div class="card-img-container">
    <img class="card-img" src="${matchArray[i].thumb}" alt="profile picture">
</div>
<div class="card-info-container">
    <h3 id="name" class="card-name cap">${matchArray[i].fName} ${
      matchArray[i].lName
    }</h3>
    <p class="card-text">${matchArray[i].email}</p>
    <p class="card-text cap">${matchArray[i].city}, ${matchArray[i].state}</p>
</div>
</div>`;
  }
}


function createSearch() {
  let newSearch = document.querySelector(".search-container");
  newSearch.innerHTML += `
<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" onclick="startSearch()" value="&#x1F50D;" id="serach-submit" class="search-submit">
</form>`;
} //function createSearch


//function Creates a blank modal and uses the hidden class
function createModal() {
  let newBody = document.querySelector("body");
  newBody.innerHTML += `<div class="modal-container hidden" id="">
        <div class="modal">
            <button onClick="hideModal()" type="button" id="modal-close-btn" class="modal-close-btn" ><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="" alt="profile picture">
                <h3 id="name" class="modal-name cap"><span id="newfName"></span> <span id="newlName"></span></h3>
                <p class="modal-text"><span id="newEmail"></span></p>
                <p class="modal-text cap"><span id="newCity"></span></p>
                <hr>
                <p class="modal-text"><span id="newPhone"></span></p>
                <p class="modal-text"><span id="newStreet"></span>, <span id="newCity"></span>, <span id="newState"></span> <span id="newZipcode"></span></p>
                <p class="modal-text">Birthday: <span id="newDob"></span></p>
            </div>
            <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn" onclick="prevEmp()">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn" onclick="nextEmp()">Next</button>
                </div>
        </div> `;
} //createModal()

//Populates the gallery
function populateModal(arr, num) {
  currentEmp = num;
  document.querySelector(".modal-img").src = arr[num].thumb;
  document.getElementById("newfName").innerHTML = arr[num].fName;
  document.getElementById("newlName").innerHTML = arr[num].lName;
  document.getElementById("newEmail").innerHTML = arr[num].email;
  document.getElementById("newCity").innerHTML = arr[num].city;
  document.getElementById("newPhone").innerHTML = arr[num].phone;
  document.getElementById("newStreet").innerHTML = arr[num].street;
  document.getElementById("newCity").innerHTML = arr[num].city;
  document.getElementById("newState").innerHTML = arr[num].state;
  document.getElementById("newZipcode").innerHTML = arr[num].zipcode;
  document.getElementById("newDob").innerHTML = arr[num].dob;
  showModal();
} //function populateModal()


// function hideModal
const hideModal = () => {
  document.querySelector(".modal-container").classList.add("hidden");
};


// function showMoal()
const showModal = () => {
  document.querySelector(".modal-container").classList.remove("hidden");
};


function startSearch() {
  searchArray = true;
  matchArray.length = 0;
  let searched = document.getElementById("search-input").value;
  let x;
  for (let i = 0; i < employee.length; i++) {
    if (
      employee[i].fName.indexOf(searched) !== -1 ||
      employee[i].lName.indexOf(searched) !== -1
    ) {
      x = employee[i];
      matchArray.push(x);
    }
  }
  createGallery();
} // function startSearch()

function removeChild(className) {
  let elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
} // function removeChild()

const prevEmp = () => {
  
 if (searchArray === true){ 
  if (currentEmp === 0) {
    return
  }else {
    currentEmp -= 1;
    console.log(`calling matcharray`)
    populateModal(matchArray, currentEmp);
  }
} else {
  if (currentEmp === 0) {
    return
  }else {
    currentEmp -= 1;
    populateModal(employee, currentEmp);
  }
}
}; //function prevEmp()


const nextEmp = () => {
if (searchArray === true){
  if (currentEmp < matchArray.length - 1) {
    currentEmp += 1;
    populateModal(matchArray, currentEmp);
  }
}else {
  if (currentEmp < employee.length -1){
    currentEmp += 1;
    populateModal(employee, currentEmp);
  }
}
}; //function nextEmp()

$.getJSON(url, dataType, listPerson);

createSearch();
createModal();
