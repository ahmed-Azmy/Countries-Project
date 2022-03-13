//=========== ====Global variables==== =============
const filterBtn = document.getElementById('filterBtn'),
      dropdown = document.getElementById('dropdown'),
      lightDarkMode = document.getElementById('lightDarkMode'),
      navbar = document.getElementById('navbar'),
      filter = document.getElementById('filter'),
      filterIcon = document.getElementById('filterIcon'),
      paragfilter = document.querySelectorAll('.filter a'),
      searchIcon = document.querySelector('.icon-search'),
      searchField = document.querySelector('.search input'),
      contentContainer = document.getElementsByClassName('content-container'),
      infoHeading2 = document.getElementsByClassName('countryName'),
      infoHeading4 = document.getElementsByClassName('countryInfo'),
      detailsInfo = document.getElementsByClassName('detailsInfo'),
      content = document.getElementById('content'),
      searchInput = document.getElementById('searchInput'),
      borderInfo = document.getElementsByClassName('borderInfo'),
      getRegion = document.querySelectorAll('.dropdown a'),
      dropdownHover = document.querySelectorAll('.dropdown > li'),
      detailsData =JSON.parse(localStorage.getItem('detailsData')), 
      detailsImg = document.getElementById('detailsImg'),
      detailsTitle = document.getElementById('detailsTitle'),
      nativeName= document.getElementById('nativeName'),
      Population= document.getElementById('Population'),
      Region= document.getElementById('Region'),
      subRegion= document.getElementById('subRegion'),
      Capital= document.getElementById('Capital'),
      topLevelDomain= document.getElementById('topLevelDomain'),
      Currencies= document.getElementById('Currencies'),
      Languages= document.getElementById('Languages'),
      borders = document.getElementById('borders'),
      backBtn = document.getElementById('backBtn');
      
      
// ==============dropdown menue===============   
if(filterBtn){
    filterBtn.addEventListener('click' , ()=>{
    if(dropdown.style.display == 'none'){
         dropdown.style.display = 'block';
    }
    else{
        dropdown.style.display = 'none';
    }
    })
}
// ============light & dark mode===============
lightDarkMode.addEventListener('click' , ()=>{
   document.body.classList.toggle("dark-mode-body");
   navbar.classList.toggle('dark-mode-element'); 
   for (let i = 0; i < detailsInfo.length; i++) {
    detailsInfo[i].classList.toggle('dark-mode-element');
   } 
   if(filter){
     filter.classList.toggle('dark-mode-element');
     filterIcon.classList.toggle('dark-mode-element');
     filterBtn.classList.toggle('dark-mode-element');
     dropdown.classList.toggle('dark-mode-element');
     searchIcon.classList.toggle('dark-mode-element');
     searchField.classList.toggle('dark-mode-element'); 
     for (const parag of paragfilter) {
       parag.classList.toggle('dark-mode-element');
     }
     for (const back of contentContainer) {
       back.classList.toggle('dark-mode-element');
     }
     for (const info2 of infoHeading2) {
       info2.classList.toggle('dark-mode-element');
     }
     for (const info4 of infoHeading4) {
       info4.classList.toggle('dark-mode-element');
     }
     for (const drop of dropdownHover) {
       drop.classList.toggle('dark-mode-element');
     }
   }
   //to store in localstorage the mode
   if(document.body.classList.contains('dark-mode-body')){
    localStorage.setItem('mode' , 'darkMode')
   }
   else{
    localStorage.setItem('mode' , 'lightMode')
   }
})
//if mode is dark fire dark mode
if(localStorage.getItem('mode') == 'darkMode'){
  document.body.classList.toggle("dark-mode-body");
  navbar.classList.toggle('dark-mode-element'); 
  for (let i = 0; i < detailsInfo.length; i++) {
  detailsInfo[i].classList.toggle('dark-mode-element');
  }
  if(filter){
      filter.classList.toggle('dark-mode-element');
      filterIcon.classList.toggle('dark-mode-element');
      filterBtn.classList.toggle('dark-mode-element');
      dropdown.classList.toggle('dark-mode-element');
      searchIcon.classList.toggle('dark-mode-element');
      searchField.classList.toggle('dark-mode-element'); 
      for (const parag of paragfilter) {
        parag.classList.toggle('dark-mode-element');
      }
      for (const back of contentContainer) {
        back.classList.toggle('dark-mode-element');
      }
      for (const info2 of infoHeading2) {
        info2.classList.toggle('dark-mode-element');
      }
      for (const info4 of infoHeading4) {
        info4.classList.toggle('dark-mode-element');
      }
      for (const drop of dropdownHover) {
        drop.classList.toggle('dark-mode-element');
      }
  }
}

//===================get data from api=======================
let dataContainer = [];
async function getCountryData(){
    let response = await fetch('https://restcountries.com/v2/all');
    response = await response.json();
    dataContainer.push(response);
    dataContainer = dataContainer[0];
    displayCountryData(dataContainer);
}
//==call main function==
getCountryData();
  
//=============================display country data===========================
function displayCountryData(arrayToDisplay){
    let catrona = '';
    for (let i = 0; i < arrayToDisplay.length; i++) {
        catrona +=`
        <div class="content-container" onclick="showDetails('${arrayToDisplay[i].name}')">
        <img src="${arrayToDisplay[i].flags.png}">
        <div class="info">
            <h2 class="countryName">${arrayToDisplay[i].name}</h2>
            <h4 class="countryInfo">Population: <span>${arrayToDisplay[i].population}</span></h4>
            <h4 class="countryInfo">Region: <span>${arrayToDisplay[i].region}</span></h4>
            <h4 class="countryInfo">Capital: <span>${arrayToDisplay[i].capital}</span></h4>   
        </div>
        </div>
        ` 
    }
    if(content){
      content.innerHTML = catrona;
    }
    // ===To solve bug when dark mobe on and i change the region=====
    if(document.body.classList.contains('dark-mode-body'))
    {
      for (const back of contentContainer) {
        back.classList.add('dark-mode-element');
      }
      for (const info2 of infoHeading2) {
        info2.classList.toggle('dark-mode-element');
      }
      for (const info4 of infoHeading4) {
        info4.classList.toggle('dark-mode-element');
      }
    }
}

// =========================search by country name=========================
function SearchCountry(){
    let searchResult = [];
    for (let i = 0; i < dataContainer.length; i++){
        if(dataContainer[i].name.toLowerCase().includes(searchInput.value.toLowerCase())){
            searchResult.push(dataContainer[i]);
        }
    }
    displayCountryData(searchResult);
}
//==call function after key up==
if(searchInput){
  searchInput.addEventListener('keyup' , ()=>{
     SearchCountry();
  })
}

//==========================get country by region==========================
async function filterByRegion(region){
    let regionContainer = [];
    let response = await fetch(`https://restcountries.com/v2/region/${region}`);
    response = await response.json();
    regionContainer.push(response);
    regionContainer = regionContainer[0];
    displayCountryData(regionContainer);
}
//===When event fire get country(region)===
for (const region of getRegion) {
    region.addEventListener('click' , (e)=>{
        filterByRegion(e.target.innerText);
    })
}

//==========================Show details every country==========================
async function showDetails(Cname){
    let detailsContainer = [];
    let response = await fetch(`https://restcountries.com/v3.1/name/${Cname}`);
    response = await response.json();
    detailsContainer.push(response);
    detailsContainer = detailsContainer[0][0];
    localStorage.setItem('detailsData' , JSON.stringify(detailsContainer));
    document.location.href = "details.html";
}
//but data of choosen country in html    
if(detailsImg){
    detailsImg.setAttribute('src' , detailsData.flags.png)
    detailsTitle.innerHTML = detailsData.name.common;
    nativeName.innerHTML = detailsData.name.official;
    Population.innerHTML = detailsData.population;
    Region.innerHTML = detailsData.region;
    subRegion.innerHTML = detailsData.subregion;
    Capital.innerHTML = detailsData.capital;
    topLevelDomain.innerHTML = detailsData.tld[0];
    Currencies.innerHTML =  detailsData.currencies[Object.keys(detailsData.currencies)[0]].name;
    for (const property in detailsData.languages) {
        Languages.innerHTML += detailsData.languages[property] + " ";
      }
    if(detailsData.borders){
        for (let i = 0; i < detailsData.borders.length; i++) {
        borders.innerHTML +=`<span class="borderInfo detailsInfo">${detailsData.borders[i]}</span>`;
        }
    }  
    else{
        borders.innerHTML = "<span class='detailsInfo'>Not currently available</span>" ;
    }
    backBtn.addEventListener('click' , ()=>{
        document.location.href = "index.html";
    })
}

//=========================Function to get information for borders country==============================
async function getDetailsOfBorderCountry(border){
    let borderDetailsContainer = [];
    let response = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
    response = await response.json();
    borderDetailsContainer.push(response);
    borderDetailsContainer = borderDetailsContainer[0][0];
    localStorage.setItem('detailsData' , JSON.stringify(borderDetailsContainer));
    document.location.href = "details.html" ; 
}
for (let i = 0; i < borderInfo.length; i++) {
    borderInfo[i].addEventListener("click" , (e)=>{
    getDetailsOfBorderCountry(e.target.innerText);
})
}

