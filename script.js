
// HTML recipe-card
/*<div class="recipe-card">
<a href="#">
    <div class="recipe-img"></div>
    <div class="recipe-header">
        <h2></h2>
        <div class="recipe-time">
            <i class="far fa-clock"></i>
            <p>min</p>
        </div>
    </div>
    <div class="recipe-details">
        <ul class="ingredients">
            <li></li>
        </ul>
        <p class="recipe-description"></p>
    </div>
</a>
</div>*/

const mainInput = document.getElementById("main-input");
const recipesMain = document.querySelector(".recipes");
const container = document.querySelector(".container");


// print recipes in .recipes
function showRecipe(tabRecipes) {
    tabRecipes.forEach(function(recipe) {
        
        //getting out recipes ingredients from array in an array
        var recipeIngredients = recipe["ingredients"]; // array of objects
        let listOfIngredients = '';
        
        recipeIngredients.map (ingredient => {
            if (ingredient.quantity && !ingredient.unit) {
                listOfIngredients += '<li>'+ ingredient["ingredient"] + ':' + ' ' + ingredient["quantity"] + '</li>'; 
            }    
            else if (ingredient.unit) {
                listOfIngredients += '<li>'+ ingredient["ingredient"] + ':' + ' ' + ingredient["quantity"] + ' ' + ingredient["unit"] + '</li>';
            }
            else {
                listOfIngredients += '<li>'+ ingredient["ingredient"] + '</li>';
            }
        })

        //print out recipes in recipe-card
        let recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");

        recipeCard.innerHTML = '<a href="#">' + '<div class="recipe-img">' + '</div>' + '<div class="recipe-header">' + '<h2>' + recipe["name"] + '</h2>' + '<div class="recipe-time">' + '<i class="far fa-clock">' + '</i>' + '<p>' + recipe["time"] + 'min' + '</p>' + '</div>' +  '</div>' + '<div class="recipe-details">' + '<ul class="ingredients">' + listOfIngredients + '</ul>' + '<p class="recipe-description">' + recipe["description"] + '</p>' +'</div>' + '</a>' + '</div>';

        recipesMain.appendChild(recipeCard);  
    });    
}

showRecipe(recipesAll);



//looping through ingredients 
/*recipesAll.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
        if (searchBar == ingredient)
        console.log("yes");
    })
})*/


mainInput.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    if (searchString.length < 3) {
        recipesMain.innerHTML = "Veuillez entrer au moins 3 caractères d'un ingrédient ou ustensiles."
        //showRecipe(recipesAll);
    }
    else {
        recipesMain.innerHTML = "";
        recipeFilter(searchString);
    }
}); 

function recipeFilter(value) {
    const filteredRecipes = recipesAll.filter((recipe) => {
        return (
            recipe.name.toLowerCase().includes(value) ||

            recipe.description.toLowerCase().includes(value) ||
            recipe.ingredients.some((ingredientDetail) => ingredientDetail.ingredient.toLowerCase().includes(value))
        )
    });
    console.log(filteredRecipes);
    showRecipe(filteredRecipes);
}


//search in recipesAll.ingredients  
let recipeIngredientsAll = [] // array of objects with all recipe ingredients in it

function searchRecipeIngredients(recipeIngredients, recipeAll) {
    recipesAll.forEach(function(recipe) {
        var recipeIngredients = recipe["ingredients"]; //array of string
        const recipeArray = recipeIngredientsAll.push(recipeIngredients);
    });    
}
console.log(recipeIngredientsAll);
searchRecipeIngredients();

//search in recipesAll.description
let recipeDescriptionAll = [] // array of string with all recipe description in it

function searchRecipeDescription(recipeDescription, recipeAll) {
    recipesAll.forEach(function(recipe) {
        var recipeDescription = recipe["description"]; //array of string
        const recipeArray = recipeDescriptionAll.push(recipeDescription);
    });    
}
console.log(recipeDescriptionAll);
searchRecipeDescription();


// dropdowns

const filters = document.querySelectorAll('.filter-button');
const arrows = document.querySelectorAll('.arrow')
filters.forEach(filter => {
    
filter.addEventListener('click', showDropDown)
});

filters.innerHTML = 'rechercher un ingrédient';
function showDropDown() {
    
    const filterSearch = filters.innerHTML;

    //ul mettre une class show
    //li  data-color
}

arrows.forEach(arrow => {
    arrow.addEventListener('click', () => {
        arrow.style.transform = 'rotate(180deg)';
        showAppliance();
    })
})


//looping through appliance - launching dropdown appliance

const dropDownAppliance = document.getElementById("dropdown-appliance");

function showAppliance() {
    let recipeApplianceAll = [];
    recipesAll.forEach(recipe => {

        var recipeAppliance = recipe["appliance"]; //object of strings
        
        if (!recipeApplianceAll.includes(recipeAppliance)) {
            recipeApplianceAll.push(recipeAppliance);
        }
    });

    recipeApplianceAll.forEach(recipe => {
        let appliance = document.createElement("li");
        appliance.classList.add("appliance-li");

        appliance.innerHTML = recipe;
        dropDownAppliance.appendChild(appliance);
    });
    //console.log(recipeApplianceAll);
};

showAppliance();


////looping through ustensils - launching dropdown ustensils
const dropDownUstensils = document.getElementById("dropdown-ustensils");

function showUstensils() {
    let recipeUstensilsAll = [];

    recipesAll.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            var recipeUstensil = ustensil;
            if (!recipeUstensilsAll.includes(recipeUstensil)) {
                recipeUstensilsAll.push(recipeUstensil);
            }
        })
    });
    console.log(recipeUstensilsAll);
    recipeUstensilsAll.forEach(recipe => {
        let ustensil = document.createElement("li");
        ustensil.classList.add("ustensil-li");

        ustensil.innerHTML = recipe;
        dropDownUstensils.appendChild(ustensil);
    });
}
showUstensils()


