// To show the ingredients of the meal
const ingredientsDetail = (mealId) => {
    // To display the ingredient section
    document.getElementById('ingredientsBody').style.display = 'block';
    
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
            const mealData = data.meals[0];
            const mealName = mealData.strMeal;
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
            const ul = document.getElementById('ingredients');
            let intro = `
                <h3>${mealName}</h3>
                <h4>Ingredients are: </h4>
            `
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
            const introAndIngredients = intro + ingredients;
            ingredientsDiv.innerHTML = introAndIngredients;
        })
}
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
            const errorId = document.getElementById('errorMessage');
            errorId.style.display = "none";
            const allMeals = data.meals;
            allMeals.map((mealData) => mealDetails(mealData));
            const relatedMealsDiv = document.getElementById('relatedMeals');
            relatedMealsDiv.innerHTML = mealsInformation;
        })
    .catch(error => {
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
        // To not display the ingredient section
        document.getElementById('ingredientsBody').style.display = 'none';
    })
}
main();