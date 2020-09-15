const mealsList = document.getElementById('meals')
const favMealList = document.getElementById('fav_meals')
const search = document.getElementById('search_term')
const btnSearch = document.getElementById('search')


getRandonMeal()
fetchFavMeals()

btnSearch.addEventListener('click', async () => {
    // cleaner container
    mealsList.innerHTML = ""
    const allMeals = await getMealBySearch(search.value)

    if (allMeals) {
        allMeals.forEach(element => {
            createMeal(element)
        });
    }
})

async function getRandonMeal() {
    const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
    )
    const respData = await resp.json();
    const randomMeal = respData.meals[0];
    createMeal(randomMeal)
}

async function fetchFavMeals(){
    const mealIds = getMealIds()
    for (let index = 0; index < mealIds.length; index++) {
        const element = mealIds[index];
        meal = await fecthMealId(element)
        createMealFav(meal)
    }
}

async function getMealBySearch(model) {
    // search meal of the user from input
    const responde = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${model}`
    )
    const respData = await responde.json()
    const meals = respData.meals
    return meals
}

async function fecthMealId(idMeal){
    const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + idMeal
    );
    const respData = await resp.json()
    const meal = respData.meals[0]
    return meal
}


function createMeal(model) {
    // create the design and show the information , create btn add meals
    // favouritte
    const meal = document.createElement('div')
    meal.classList.add("meal");
    meal.innerHTML = `
        <div class="meal_header">
            <img src="${model.strMealThumb}"/>
            <alt="${model.strMeal}">
        </div>
        <div class="meal_body">
            <h4>${model.strMeal}</h4>
            <button class="fav_btn">
                <i class="fas fa-heart"></i>
            </button>
        </div>      
    `;

    const btnMeals = meal.querySelector('.meal_body .fav_btn')

    btnMeals.addEventListener('click', () => {
        if(btnMeals.classList.contains('active')){

        }else{
            saveMealsLocalS(model.idMeal);
        }
    })
    mealsList.appendChild(meal)
}

function createMealFav(model){
    // show the favourite meal 
    const favMeal = document.createElement('li')
    favMeal.innerHTML=`
        <img src="${model.strMealThumb}"/>
    `;
    favMealList.appendChild(favMeal)
}

function saveMealsLocalS(model) {
    // save data in the localstorage
    const mealIds = getMealIds()
    localStorage.setItem('mealIds', JSON.stringify([
        ...mealIds, model
    ]))
}

function getMealIds() {
    // get key from all meals if exits in the local storage
    const mealIds = JSON.parse(localStorage.getItem('mealIds'))
    return mealIds === null ? [] : mealIds 
}