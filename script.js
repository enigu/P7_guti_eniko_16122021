
// HTML recipe-card
/*<div class="recipe-card">
<a href="#">
    <div class="recipe-img"></div>
    <div class="recipe-info">
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
                listOfIngredients += '<li>'+ '<span class="bold">' + ingredient["ingredient"] + ':' + '</span>'+ ' ' + ingredient["quantity"] + '</li>'; 
            }    
            else if (ingredient.unit) {
                listOfIngredients += '<li>' + '<span class="bold">' + ingredient["ingredient"] + ':' + '</span>' + ' ' + ingredient["quantity"] + ' ' + ingredient["unit"] + '</li>';
            }
            else {
                listOfIngredients += '<li>' + '<span class="bold">'+ ingredient["ingredient"] + '</span>' + '</li>';
            }
        })

        //print out recipes in recipe-card
        let recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");

        recipeCard.innerHTML = '<a href="#">' + '<div class="recipe-img">' + '</div>' + '<div class="recipe-info">' + '<div class="recipe-header">' + '<h2>' + recipe["name"] + '</h2>' + '<div class="recipe-time">' + '<i class="far fa-clock">' + '</i>' + '<p>' + recipe["time"] + 'min' + '</p>' + '</div>' +  '</div>' + '<div class="recipe-details">' + '<ul class="ingredients">' + listOfIngredients + '</ul>' + '<p class="recipe-description">' + recipe["description"] + '</p>' +'</div>' + '</div>' + '</a>' + '</div>';

        recipesMain.appendChild(recipeCard);  
    });    
}

showRecipe(recipesAll);


mainInput.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    if (searchString.length < 3) {
        recipesMain.innerHTML = "Aucune recette ne correspond à votre critère...vous pouvez chercher  «tarte aux pommes»,  «poisson» etc."
    }

    else {
        recipesMain.innerHTML = "";
        recipeFilter(searchString);
    }
}); 


let filteredRecipesArray = recipesAll;

function recipeFilter(value) {
    const filteredRecipes = recipesAll.filter((recipe) => {
        return (
            recipe.name.toLowerCase().includes(value) ||
            recipe.description.toLowerCase().includes(value) ||
            recipe.ingredients.some((ingredientDetail) => ingredientDetail.ingredient.toLowerCase().includes(value))
        )
    });
   
    filteredRecipesArray = filteredRecipes;

    showIngredients();
    showAppliance();
    showUstensils();
    showRecipe(filteredRecipes);
}


// 3 dropdowns: ingredients, appliance, ustensiles - on click show dropdowns

const filters = document.querySelectorAll('.filter-button');
const arrows = document.querySelectorAll('.arrow')
const dropDown = document.querySelectorAll('.dropdown')
const dropDownMenu = document.querySelectorAll('.dropdown-menu')


const filterInputs = document.querySelectorAll('.filter-button > input')

//eventListener on 3 filter buttons: ingredients, appliance, ustensils
filterInputs.forEach(input => {
    input.addEventListener('click', e => {
        showDropDown(e, input)
    })  
});

function showDropDown(e, input) {
    e.target.dataset.choisi =  e.target.dataset.choisi == "true" ? "false": "true";
        console.log(e.target.dataset)

        if(e.target.dataset.choisi === "true") {
            input.parentNode.classList.add("active")
            input.style.width = '195px';
            input.value =  "";
        }
        
        if(e.target.dataset.choisi === "false" ) {
            input.parentNode.classList.remove("active")
            input.style.width = '166px';
            input.value =  e.target.getAttribute("data-value");
        }
}

const inputs = document.querySelectorAll('.filter-button > input');  
const ingredientsInput = document.getElementById('ingredients'); 
const applianceInput = document.getElementById('appliance');
const ustensilsInput = document.getElementById('ustensils');

console.log(ingredientsInput.value);
console.log(applianceInput.value);
console.log(ustensilsInput.value);


//looping through appliance - launching dropdown appliance

const dropDownAppliance = document.getElementById("dropdown-appliance");

function showAppliance() {
    
    let recipeApplianceAll = [];
    filteredRecipesArray.forEach(recipe => {

        let recipeAppliance = recipe["appliance"]; //object of strings
        
        if (!recipeApplianceAll.includes(recipeAppliance)) {
            recipeApplianceAll.push(recipeAppliance);
        }
    });

    /*applianceSorted = []
    function applianceSort() {  
        sortedAppliance = recipeApplianceAll.sort()
        applianceSorted.push(sortedAppliance);
        
    }
    console.log(applianceSorted)
    applianceSort();*/
    dropDownAppliance.innerHTML = "";
    recipeApplianceAll.forEach(recipe => {
        let appliance = document.createElement("li");
        appliance.classList.add("appliance-li");

        appliance.innerHTML = recipe;
        dropDownAppliance.appendChild(appliance);
    }); 
};

showAppliance();


//looping through ustensils - launching dropdown ustensils
const dropDownUstensils = document.getElementById("dropdown-ustensils");

function showUstensils() {
    let recipeUstensilsAll = [];
    filteredRecipesArray.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            var recipeUstensil = ustensil;
            if (!recipeUstensilsAll.includes(recipeUstensil)) {
                recipeUstensilsAll.push(recipeUstensil);
            }
        })

        function ustensilSort(recipeUstensilsAll) { 
            sortedUstensils = recipeUstensilsAll.sort()
            let upperCasedUstensils = sortedUstensils.map(ustensil => ustensil.charAt(0).toUpperCase() + ustensil.substr(1))
            //console.log(upperCasedUstensils);
            return upperCasedUstensils;
        }
        ustensilSort(recipeUstensilsAll); 
    });
    dropDownUstensils.innerHTML = "";
    recipeUstensilsAll.forEach(recipe => {
        let ustensil = document.createElement("li");
        ustensil.classList.add("ustensil-li");
        

        ustensil.innerHTML = recipe;
        dropDownUstensils.appendChild(ustensil);
    });
}
showUstensils()

//looping through ingredients - launching dropdown of ingredients
const dropDownIngredients = document.getElementById("dropdown-ingredients");

function showIngredients() {
    let recipeIngredientsAll = []
    filteredRecipesArray.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            var recipeIngredient = ingredient.ingredient;
            if (!recipeIngredientsAll.includes(recipeIngredient)) {
            recipeIngredientsAll.push(recipeIngredient);
            }
        })
    });
    dropDownIngredients.innerHTML = "";
    recipeIngredientsAll.forEach(recipe => {
        let ingredient = document.createElement("li");
        ingredient.classList.add("ingredient-li");

        ingredient.innerHTML = recipe;
        dropDownIngredients.appendChild(ingredient);
    }); 
}
showIngredients();



