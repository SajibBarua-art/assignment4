// To show the ingredients of meal
const ingredientsDetail = (mealId) => {
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
            const ul = document.getElementById('ingredients');
            const div = document.createElement('div');
            const intro = `
                <h3>${mealName}</h3>
                <h4>Ingredients are: </h4>
            `
            div.innerHTML = intro;
            ul.appendChild(div);
            ingredientsList.forEach(item => {
                if (item.length) {
                    const li = document.createElement('li');
                    li.innerText = item;
                    ul.appendChild(li);
                }
            })
        })
}
const mealDetails = mealData => {
    const mealImage = mealData.strMealThumb;
    const mealDescription = mealData.strMeal;
    const mealId = mealData.idMeal;

    const relatedMeals = document.getElementById('relatedMeals');
    const div = document.createElement('div');
    div.className = 'mealInfo';
    const mealInformation = `
        <div onclick='ingredientsDetail(${mealId})'>
            <img class="mealImage" src="${mealImage}">
            <h3 class="mealName">${mealDescription}</h3>
        </div>
    `
    div.innerHTML = mealInformation;
    relatedMeals.appendChild(div);
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
        const mealId = allMealsDetails(mealCategoryId.value);
    })
}
main();