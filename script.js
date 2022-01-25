
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

        recipeCard.innerHTML = '<a href="#">' + '<div class="recipe-img">' + '</div>' + '<div class="recipe-info">' + '<div class="recipe-header">' + '<h2>' + recipe["name"] + '</h2>' + '<div class="recipe-time">' + '<i class="far fa-clock">' + '</i>' + '<p>' + recipe["time"] + 'min' + '</p>' + '</div>' +  '</div>' + '<div class="recipe-details">' + '<ul class="ingredients">' + listOfIngredients + '</ul>' + '<p class="recipe-description">' + recipe["description"] + '</p>' +'</div>' + '</div>' + '</a>' + '</div>';

        recipesMain.appendChild(recipeCard);  
    });    
}

showRecipe(recipesAll);


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

    let filteredRecipesArray = [];
    console.log(filteredRecipesArray);
    filteredRecipesArray.push(filteredRecipes);
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
        inputText(e, inputs);
    })  
});

function showDropDown(e, input) {
    e.target.dataset.choisi =  e.target.dataset.choisi == "true" ? "false": "true";
        console.log(e.target.dataset)

        if(e.target.dataset.choisi === "true") {
            input.parentNode.classList.add("active")
            
        }
        if(e.target.dataset.choisi === "false" ) {
            input.parentNode.classList.remove("active")
        }
}

const inputs = document.querySelectorAll('.filter-button > input');  
const ingredientsInput = document.getElementById('ingredients'); 
const applianceInput = document.getElementById('appliance');
const ustensilsInput = document.getElementById('ustensils');

console.log(ingredientsInput.value);
console.log(applianceInput.value);
console.log(ustensilsInput.value);

 
function inputText (e, inputs) {
    
        inputs.forEach(input => {
            if (input.value == "Ingrédients") {
                console.log (input.value)
                input.removeAttribute('value');
                input.setAttribute('placeholder', 'Recherche un ingrédient')
            }
        });
    
    
    /*let ingredientsInput = true;
    if (ingredientsInput) {
        ingredientsInput.removeAttribute('value');
        ingredientsInput.setAttribute ('placeholder', 'Recherche un ingrédient')
    }*/
    /*switch (input) {
        case 'Ingrédients': 
        ingredientsInput.removeAttribute('value');
        ingredientsInput.setAttribute ('placeholder', 'Recherche un ingrédient')
        console.log('he');
        break;
        case 'Appareil': 
        applianceInput.setAttribute ('placeholder', 'Recherche un appareil')
        break;
        case 'Ustensiles': 
        ustensilsInput.setAttribute ('placeholder', 'Recherche un ustensile')
        break;
        default:
        break;    
    }*/
    console.log('he');
}
inputText(inputs);

//looping through appliance - launching dropdown appliance

const dropDownAppliance = document.getElementById("dropdown-appliance");

function showAppliance() {
    let recipeApplianceAll = [];
    recipesAll.forEach(recipe => {

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

    recipesAll.forEach(recipe => {
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
    recipesAll.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            var recipeIngredient = ingredient.ingredient;
            if (!recipeIngredientsAll.includes(recipeIngredient)) {
            recipeIngredientsAll.push(recipeIngredient);
            }
        })
    });
    recipeIngredientsAll.forEach(recipe => {
        let ingredient = document.createElement("li");
        ingredient.classList.add("ingredient-li");

        ingredient.innerHTML = recipe;
        dropDownIngredients.appendChild(ingredient);
    }); 
}
showIngredients();



