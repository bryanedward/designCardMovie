const mealsList = document.getElementById('meals')
const search = document.getElementById('search_term')
const btnSearch = document.getElementById('search')

getRandonMeal()

btnSearch.addEventListener('click', async () => {

    // cleaner container
    mealsList.innerHTML = ""
    const allMeals = await queryApi(search.value)

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

async function queryApi(model) {
    // search meal of the user from input
    const responde = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${model}`
    )
    const respData = await responde.json()
    const meals = respData.meals
    return meals
}

function createMeal(model) {
    // create the design and show the information , create btn add meals
    // favouritte
    const meal = document.createElement('div')
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

function saveMealsLocalS(model) {
    // save data in the localstorage
    const mealIds = getMealIds()

    localStorage.setItem('mealIds', JSON.stringify([
        ...mealIds, model
    ]))

    console.log(JSON.parse(localStorage.getItem('mealIds')));
}

function getMealIds() {
    // get key from meal if exits that
    const mealIds = JSON.parse(localStorage.getItem('mealIds'))
    return mealIds === null ? [] : mealIds 
}


