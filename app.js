const mealDetails = (mealData) => {
    const mealDescription = mealData.strMeal;
    const mealImages = mealData.strMealThumb;
    console.log(mealDescription, mealImages);
}
const allMealsDetails = (searchMealCategory) => {
    console.log(searchMealCategory);
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c="+searchMealCategory)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const allMeals = data.meals;
            for (let i = 0; i < allMeals.length; i++) {
                const mealData = allMeals[i];
                mealDetails(mealData);
            }
        })
}
const main = () => {
    const mealCategoryId = document.getElementById('mealCategory');
    const searchButtonId = document.getElementById('searchButton');
    searchButtonId.addEventListener('click', () => {
        allMealsDetails(mealCategoryId.value);
    })
}
main();