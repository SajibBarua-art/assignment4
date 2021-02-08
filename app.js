// To show the ingredients of the meal
const ingredientsDetail = (mealId) => {
    // To display the ingredients list
    document.getElementById('ingredientsBody').style.display = 'block';
    
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
            const mealData = data.meals[0];
            const mealName = mealData.strMeal;
            // To take at most ten ingredients
            const ingredientsList = [
                mealData.strIngredient1,
                mealData.strIngredient2,
                mealData.strIngredient3,
                mealData.strIngredient4,
                mealData.strIngredient5,
                mealData.strIngredient6,
                mealData.strIngredient7,
                mealData.strIngredient8,
                mealData.strIngredient9,
                mealData.strIngredient10
            ];
            const ingredientsDiv = document.getElementById('ingredientsBody');
            // To take the Meal name
            let intro = `
                <h3>${mealName}</h3>
                <h4>Ingredients are: </h4>
            `
            // To take the list of all meal ingredients
            let ingredients = `
            <ul>
            `;
            ingredientsList.forEach(item => {
                if(item !== null) {
                    if (item.length) {
                        ingredients += `
                            <li>${item}</li>
                        `
                    }
                }
            })
            ingredients += `
            </ul>
            `;
            // Add them to make one string 
            const introAndIngredients = intro + ingredients;
            ingredientsDiv.innerHTML = introAndIngredients;
        })
}

// To the meal image and name section
let mealsInformation = ``;
const mealDetails = mealData => {
    const mealImage = mealData.strMealThumb;
    const mealDescription = mealData.strMeal;
    const mealId = mealData.idMeal;
    mealsInformation += `
        <div onclick='ingredientsDetail(${mealId})' class="mealInfo">
            <img class="mealImage" src="${mealImage}">
            <h3 class="mealName">${mealDescription}</h3>
        </div>
    `
}
const allMealsDetails = searchMealCategory => {
    let url = "";
    if (searchMealCategory.length <= 2) {
        // To search meal by first character
        url = "https://www.themealdb.com/api/json/v1/1/search.php?f=";
    } else {
        // To search meal by name
        url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
    }
    fetch(url + searchMealCategory)
        .then(response => response.json())
        .then(data => {
            // To hide the error message when the search elements are found
            const errorId = document.getElementById('errorMessage');
            errorId.style.display = "none";
            // To get the meal details
            const allMeals = data.meals;
            allMeals.map((mealData) => mealDetails(mealData));
            // To show the meal details
            const relatedMealsDiv = document.getElementById('relatedMeals');
            relatedMealsDiv.innerHTML = mealsInformation;
            mealsInformation = "";
        })
    .catch(error => {
        // To show the error message
        // when there is no search element found
        const errorId = document.getElementById("errorMessage");
        errorId.style.display = "block";
    })
}
const main = () => {
    const mealCategoryId = document.getElementById('searchBox');
    const searchButtonId = document.getElementById('searchButton');
    searchButtonId.addEventListener('click', () => {
        allMealsDetails(mealCategoryId.value);
        mealCategoryId.value = "";
        // To hide the ingredient section
        document.getElementById('ingredientsBody').style.display = 'none';
    })
}
main();