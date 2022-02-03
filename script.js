
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
console.log(arrows);
const dropDown = document.querySelectorAll('.dropdown')
const dropDownMenu = document.querySelectorAll('.dropdown-menu')


const filterInputs = document.querySelectorAll('.filter-button > input')

//eventListener on 3 filter-button-arrows: ingredients, appliance, ustensils
arrows.forEach(arrow => {
    arrow.addEventListener('click', e => {
        //showDropDown(e, input, arrow)
        showDropDown(e, arrow)
    })  
});

//eventListener on 3 filter buttons: ingredients, appliance, ustensils
/*filterInputs.forEach(input => {
    input.addEventListener('click', e => {
        showDropDown(e, input)
    })  
});*/

//show dropdown with arrow
function showDropDown(e, arrow) {
    e.target.dataset.choisi =  e.target.dataset.choisi == "true" ? "false": "true";
        console.log(e.target.dataset)

        if(e.target.dataset.choisi === "true") {
            arrow.parentNode.classList.add("active")
            arrow.previousElementSibling.width = '195px';
            console.log(arrow.previousElementSibling);
            arrow.previousElementSibling.value = "";
        }
        
        if(e.target.dataset.choisi === "false" ) {
            console.log(e.target)
            arrow.parentNode.classList.remove("active")
            arrow.previousElementSibling.width = '110px';
            console.log(arrow.previousElementSibling);
            arrows.forEach(arrow => {
                arrow.previousElementSibling.value = arrow.previousElementSibling.getAttribute("data-value");
                console.log(e.target.parentNode.previousElementSibling.getAttribute("data-value"))
            })

        }
}

//show dropdown with input
/*function showDropDown(e, input) {
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
}*/

//const inputs = document.querySelectorAll('.filter-button > input');  



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

//secondary search in filter-buttons: Ingredients, Appliance, Ustensils
const ingredientsLi = document.querySelectorAll(".ingredient-li");
const ingredientsInput = document.getElementById('ingredients'); 
const appliancesLi = document.querySelectorAll(".appliance-li");
const applianceInput = document.getElementById('appliance');
const ustensilsLi = document.querySelectorAll(".ustensil-li");
const ustensilsInput = document.getElementById('ustensils');

//secondary search in ingredients filter-button - forEach loop in <li class= "ingredient-li"></li> 
ingredientsInput.addEventListener('keyup', (e) => {
    const searchValue = e.target.value
    //console.log(searchValue);
    ingredientsLi.forEach(ingredientLi => {
        //console.log(ingredientLi.innerText);
        if ( ingredientLi.innerText.includes(searchValue)) {
            //console.log(ingredientLi);
            ingredientLi.style.display = "flex";
        }
    
        else {
            ingredientLi.style.display = "none";
        }
    })    
}); 

//secondary search in appliance filter-button - forEach loop in <li class= "appliance-li"></li> 
applianceInput.addEventListener('keyup', (e) => {
    const searchValue = e.target.value
    //console.log(searchValue);
    appliancesLi.forEach(applianceLi => {
        console.log(applianceLi.innerText);
        if (applianceLi.innerText.includes(searchValue)) {
            //console.log(applianceLi);
            applianceLi.style.display = "flex";
        }
    
        else {
            applianceLi.style.display = "none";
        }
    })    
}); 

//secondary search in ustensiles filter-button - forEach loop in <li class= "ustensil-li"></li> 
ustensilsInput.addEventListener('keyup', (e) => {
    const searchValue = e.target.value
    console.log(searchValue);
    ustensilsLi.forEach(ustensilLi => {
        console.log(ustensilLi.innerText);
        if ( ustensilLi.innerText.includes(searchValue)) {
            console.log(ustensilLi);
            ustensilLi.style.display = "flex";
        }
    
        else {
            ustensilLi.style.display = "none";
        }
    })    
}); 


//eventListener on lists-li: ingredients, appliance, ustensils: (".ingredient-li"), (".appliance-li"), (".ustensil-li");


// object of (".ingredient-li"), (".appliance-li"), (".ustensil-li");
let selectedTags = {};

//const ingredientsLi = document.querySelectorAll(".ingredient-li");
ingredientsLi.forEach(ingredientLi => {
    ingredientLi.addEventListener('click', e => {
        selectedTags[ingredientLi.innerText] = "ingredient";
    })  
});

//const appliancesLi = document.querySelectorAll(".appliance-li");
appliancesLi.forEach(applianceLi => {
    applianceLi.addEventListener('click', e => {
        selectedTags[applianceLi.innerText] = "appliance";
        console.log(selectedTags);
    })  
});

//const ustensilsLi = document.querySelectorAll(".ustensil-li");
ustensilsLi.forEach(ustensilLi => {
    ustensilLi.addEventListener('click', e => {
        selectedTags[ustensilLi.innerText] = "ustensil";
        console.log(selectedTags);
    })  
});