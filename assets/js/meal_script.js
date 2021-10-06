//this function fetches the meal id passed as query param and renders it
function getMeal() {
    var xhrRequest = new XMLHttpRequest(); //creating a new xhr request
    let url = window.location.href; //the window url
    let id = ""; //this stores the meal id
    let flag = false;
    //extracting id from the string
    for (let i = 0; i < url.length; i++) {
        if (flag) {
            id += url.charAt(i);
        }
        if (url.charAt(i) == '?') {
            flag = true;
        }
    }
    id = id.substr(3, url.length); //storing the id

    xhrRequest.onload = function () {
        let res = JSON.parse(xhrRequest.response).meals[0]; //parsing resultant food item retrned
        createFoodItem(res); //creating the new item's HTML
    }
    //creating a get api call to fetch meal with given id
    xhrRequest.open('get', `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`, true);
    //sending the request
    xhrRequest.send();
}

function createFoodItem(res) {
    //HTML code for the food item
    let foodItem = `<div id="meal-image">
                        <img src="${res.strMealThumb}">
                    </div>
                    <div id="meal-details">
                        <div id="meal-name">${res.strMeal} Recipie</div>
                        <div id="meal-recipie">${res.strInstructions}</div>
                    </div>`
    //appending the result to the root 'meal-box' div
    let outerDiv = document.getElementById('meal-box');
    outerDiv.innerHTML = foodItem;
}

getMeal(); //calling the getMeal function