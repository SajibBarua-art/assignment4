const mealDetails = mealData => {
    const mealImage = mealData.strMealThumb;
    const mealDescription = mealData.strMeal;
    // console.log(mealImages);

    const relatedMeals = document.getElementById('relatedMeals');
    const div = document.createElement('div');
    div.className = 'mealInfo'
    const mealInformation = `
        <img class="mealImage" src="${mealImage}">
        <h3 class="mealName">${mealDescription}</h3>
    `
    div.innerHTML = mealInformation;
    relatedMeals.appendChild(div);
}
const allMealsDetails = searchMealCategory => {
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c="+searchMealCategory)
        .then(response => response.json())
        .then(data => {
             //console.log(data);
            const allMeals = data.meals;
            allMeals.map((mealData) => mealDetails(mealData));
        })
}
const main = () => {
    const mealCategoryId = document.getElementById('searchBox');
    const searchButtonId = document.getElementById('searchButton');
    searchButtonId.addEventListener('click', () => {
        allMealsDetails(mealCategoryId.value);
    })
}
main();