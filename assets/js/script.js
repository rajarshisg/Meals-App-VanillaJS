const searchBar = document.getElementById('meal-search-bar'); //the input form where food name is entered

/*--------------THIS PART HANDLES THE DYNAMIC SEARCH RESULTS--------------*/

//adding keydown event listener to searchBar
searchBar.addEventListener('keydown', (event) => {
    let searchValue = searchBar.value; //fetching the value entered

    if (searchValue == '') {
        //if value is empty clear all search results
        document.getElementById('recipie-list').innerHTML = '';
        return;
    }

    let xhrRequest = new XMLHttpRequest(); //creating a new XMLHttpRequest

    xhrRequest.onload = function () {
        document.getElementById('recipie-list').innerHTML = ''; //clearing all the previous search results
        let res = JSON.parse(xhrRequest.response).meals; //parsing the data and finding all the meals returned
        for (let i = 0; i < res.length; i++) {
            createFoodItem(res[i]); //creating HTML code for all the search results 
        }
    }
    //fetching all meals that match the name using GET request
    xhrRequest.open('get', `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`, true);
    //sending the request
    xhrRequest.send();

});

//this function adds the each search result to the DOM by creating a new element
function createFoodItem(res) {
    //HTML code for the individual search result/food item
    let foodItem = `<div class="food-item">
                        <div class="food-image">
                            <img src="${res.strMealThumb}" alt="">
                        </div>
                        <div class="food-name">${res.strMeal}</div>
                        <div class="action-buttons">
                            <div class="get-recipie">
                                <a href="meal_details.html?id=${res.idMeal}" value="${res.idMeal}">Get Recipie</a>
                            </div>
                            <div class="favourite-button" id="${res.idMeal}">
                                Add favourite
                            </div>
                        </div>
                    </div>`;
    //appending the result to the root 'recipie-list' div
    let recipieList = document.getElementById('recipie-list');
    recipieList.innerHTML = foodItem + recipieList.innerHTML;
}


/*--------------THIS PART HANDLES THE PERSISTENT FAVOURITES LIST--------------*/


//if browser dosen't have 'meal-favourites' in local storage we create one
let fav = window.localStorage.getItem('meal-favourites');
if (!fav) {
    window.localStorage.setItem('meal-favourites', '');
}

//handling click event on the 'favourite-button' to mark an item as favourite
document.body.addEventListener('click', function (event) {
    //if the targeted div is 'favourite-button'
    if (event.target.getAttribute('class') == 'favourite-button') {
        //fetch all favourite item id's stored as space seperated string in local storage of browser
        let items = window.localStorage.getItem('meal-favourites');
        //converting the string to array by splitting at white spaces
        let item = items.split(/(\s+)/);
        //filtering out all the blank spaces
        item.filter(function (e) {
            return e.trim().length > 0;
        });
        //finding the id of the current food item
        let id = event.target.getAttribute('id');
        //if id already present in local storage we do not add and return
        if (item.includes(id)) {
            window.alert("Already added to favourites!");
            return;
        }
        //appending the new id to the string
        items = items + ' ' + id;
        //updating the local storage
        window.localStorage.setItem('meal-favourites', items);
        window.alert("Item added to favourites");
    }
});

