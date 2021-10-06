/*--------------THIS PART FETCHING ALL THE FAVOURITE MEALS--------------*/

//fetching the favourite item ids from local storage and converting it into an array
let item = window.localStorage.getItem('meal-favourites').split(/(\s+)/);
item.filter(function (e) {
    return e.trim().length > 0;
});
//fetching all the favourite meals from ids stored in local storage
for (let id of item) {
    getMeal(id);
}

//this function fetches a meal with a specific id
function getMeal(id) {
    var xhrRequest = new XMLHttpRequest(); //creating a new xhr request

    xhrRequest.onload = function () {
        let res = JSON.parse(xhrRequest.response).meals[0]; //parsing resultant food item retrned
        createFoodItem(res); //creating the new item's HTML
    }
    //creating a get api call to fetch meal with given id
    xhrRequest.open('get', `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`, true);
    //sending the request
    xhrRequest.send();
}

//this function adds the each search result to the DOM by creating a new element
function createFoodItem(res) {
    //HTML code for the individual search result/food item
    var foodItem = `<div class="food-item">
                        <div class="food-image">
                            <img src="${res.strMealThumb}" alt="">
                        </div>
                        <div class="food-name">${res.strMeal}</div>
                        <div class="action-buttons">
                            <div class="get-recipie">
                                <a href="meal_details.html?id=${res.idMeal}" value="${res.idMeal}">Get Recipie</a>
                            </div>
                            <div class="favourite-button" id="${res.idMeal}">
                                Remove Favourite
                            </div>
                        </div>
                    </div>`;
    //appending the result to the root 'recipie-list' div
    let recipieList = document.getElementById('recipie-list');
    recipieList.innerHTML = foodItem + recipieList.innerHTML;
}

/*--------------THIS PART HANDLES THE PERSISTENT FAVOURITES LIST--------------*/

//handling click event on the 'favourite-button' to unmark an item as favourite
document.body.addEventListener('click', function (event) {
    //if the targeted div is 'favourite-button'
    if (event.target.getAttribute('class') == 'favourite-button') {
        //finding the id of the current food item
        let id = event.target.getAttribute('id');
        //finding it's index in the item array
        let index = item.indexOf(id);
        //remocing it from thi array
        item.splice(index, 1);
        let items = '';
        //creating the updated list of favourite items in a space sperated string
        for (let i of item) {
            items = items + ' ' + i;
        }
        //storing the updated string in local storage
        window.localStorage.setItem('meal-favourites', items);
        //refreshing the page
        location.reload();
    }
});
