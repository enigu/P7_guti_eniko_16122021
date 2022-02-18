
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

let filteredRecipesArray = recipesAll;
//looping through ingredients - launching dropdown of ingredients
const dropDownIngredients = document.getElementById("dropdown-ingredients");
const dropDownAppliance = document.getElementById("dropdown-appliance");
//looping through ustensils - launching dropdown ustensils
const dropDownUstensils = document.getElementById("dropdown-ustensils");

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
    showIngredients();
    showAppliance();
    showUstensils();
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




function recipeFilter(value) {
    const filteredRecipes = recipesAll.filter((recipe) => {
        return (
            recipe.name.toLowerCase().includes(value) ||
            recipe.description.toLowerCase().includes(value) ||
            recipe.ingredients.some((ingredientDetail) => ingredientDetail.ingredient.toLowerCase().includes(value))
        )
    });
   
    filteredRecipesArray = filteredRecipes;


    showRecipe(filteredRecipes);
    tagFilter();
}


// 3 dropdowns: ingredients, appliance, ustensiles - on click show dropdowns

const filters = document.querySelectorAll('.filter-button');
const arrows = document.querySelectorAll('.arrow')
const dropDown = document.querySelectorAll('.dropdown')
const dropDownMenu = document.querySelectorAll('.dropdown-menu')


const filterInputs = document.querySelectorAll('.filter-button > input')

//eventListener on 3 filter-button-arrows: ingredients, appliance, ustensils
arrows.forEach(arrow => {
    arrow.addEventListener('click', e => {
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

        if(e.target.dataset.choisi === "true") {
            arrow.parentNode.classList.add("active")
            arrow.previousElementSibling.width = '195px';
            arrow.previousElementSibling.value = "";
        }
        
        if(e.target.dataset.choisi === "false" ) {
            arrow.parentNode.classList.remove("active")
            arrow.previousElementSibling.width = '110px';
            arrows.forEach(arrow => {
                arrow.previousElementSibling.value = arrow.previousElementSibling.getAttribute("data-value");
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


//looping through appliance - launching dropdown appliance



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




function showUstensils() {
    let recipeUstensilsAll = [];
    filteredRecipesArray.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            var recipeUstensil = ustensil;
            if (!recipeUstensilsAll.includes(recipeUstensil)) {
                recipeUstensilsAll.push(recipeUstensil);
            }
        })

        function ustensilSort() { 
            sortedUstensils = recipeUstensilsAll.sort()
            let upperCasedUstensils = sortedUstensils.map(ustensil => ustensil.charAt(0).toUpperCase() + ustensil.substr(1))
            //console.log(upperCasedUstensils);
            return upperCasedUstensils;
        }
        ustensilSort(); 
    });
    dropDownUstensils.innerHTML = "";
    recipeUstensilsAll.forEach(recipe => {
        let ustensil = document.createElement("li");
        ustensil.classList.add("ustensil-li");
        

        ustensil.innerHTML = recipe;
        dropDownUstensils.appendChild(ustensil);
    });
}
showUstensils();



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

function showIngredients2(tab) {
    console.log("hello");
    let recipeIngredientsAll = []
    tab.forEach(recipe => {
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

function showAppliance2(tab) {
    
    let recipeApplianceAll = [];
    tab.forEach(recipe => {

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


function showUstensils2(tab) {
    let recipeUstensilsAll = [];
    tab.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            var recipeUstensil = ustensil;
            if (!recipeUstensilsAll.includes(recipeUstensil)) {
                recipeUstensilsAll.push(recipeUstensil);
            }
        })
    });
    dropDownUstensils.innerHTML = "";
    recipeUstensilsAll.forEach(recipe => {
        let ustensil = document.createElement("li");
        ustensil.classList.add("ustensil-li");
        

        ustensil.innerHTML = recipe;
        dropDownUstensils.appendChild(ustensil);
    });
}

//secondary search in filter-buttons: Ingredients, Appliance, Ustensils
const ingredientsLi = document.querySelectorAll(".ingredient-li");
const ingredientsInput = document.getElementById('ingredients'); 
const appliancesLi = document.querySelectorAll(".appliance-li");
const applianceInput = document.getElementById('appliance');
const ustensilsLi = document.querySelectorAll(".ustensil-li");
const ustensilsInput = document.getElementById('ustensils');

//secondary search in ingredients filter-button - forEach loop in <li class= "ingredient-li"></li> 
ingredientsInput.addEventListener('keyup', (e) => {
    const ingredientsList = document.querySelectorAll(".ingredient-li");

    const searchValue = e.target.value
    ingredientsList.forEach(ingredientList => {
        if ( ingredientList.innerText.includes(searchValue)) {
            ingredientList.style.display = "flex";
        }
    
        else {
            ingredientList.style.display = "none";
        }
    })    
}); 

//secondary search in appliance filter-button - forEach loop in <li class= "appliance-li"></li> 
applianceInput.addEventListener('keyup', (e) => {
    const appliancesList = document.querySelectorAll(".appliance-li");

    const searchValue = e.target.value
    //console.log(searchValue);
    appliancesList.forEach(applianceList => {
        if (applianceList.innerText.includes(searchValue)) {
            //console.log(applianceLi);
            applianceList.style.display = "flex";
        }
    
        else {
            applianceList.style.display = "none";
        }
    })    
}); 

//secondary search in ustensiles filter-button - forEach loop in <li class= "ustensil-li"></li> 
ustensilsInput.addEventListener('keyup', (e) => {
    const ustensilsList = document.querySelectorAll(".ustensil-li");

    const searchValue = e.target.value;
    console.log(searchValue);
    ustensilsList.forEach(ustensilList => {
        console.log(ustensilList.innerText);
        if ( ustensilList.innerText.includes(searchValue)) {
            console.log(ustensilList);
            ustensilList.style.display = "flex";
        }
    
        else {
            ustensilList.style.display = "none";
        }
    })    
}); 

//eventListener on lists-li: ingredients, appliance, ustensils: (".ingredient-li"), (".appliance-li"), (".ustensil-li");


// object of (".ingredient-li"), (".appliance-li"), (".ustensil-li");
let selectedTags = {};

//const ingredientsLi = document.querySelectorAll(".ingredient-li");

function tagFilter() {
    console.log("toto");
    const ingredientsList = document.querySelectorAll(".ingredient-li");

    ingredientsList.forEach(ingredientList => {
        ingredientList.addEventListener('click', e => {
            selectedTags[ingredientList.innerText] = "ingredient";
            
            const tag = createTag(ingredientList.innerText, "ingredient");
            //console.log(tag);
            tagsSection.appendChild(tag);

            tag.children[1].addEventListener("click", e => {
                tag.remove();
                delete selectedTags[e.target.previousElementSibling.innerText];
                tagFilteredRecipes();
            })

            
            tagFilteredRecipes();
        })  
    });
    const appliancesList = document.querySelectorAll(".appliance-li");

    appliancesList.forEach(applianceList => {
        applianceList.addEventListener('click', e => {
            selectedTags[applianceList.innerText] = "appliance";

            const tag = createTag(applianceList.innerText, "appliance");
            tagsSection.appendChild(tag);

            tag.children[1].addEventListener("click", e => {
                tag.remove();
                delete selectedTags[e.target.previousElementSibling.innerText];
                tagFilteredRecipes();
            })

            tagFilteredRecipes();
        })  
    });
    const ustensilsList = document.querySelectorAll(".ustensil-li");
    ustensilsList.forEach(ustensilList => {
        ustensilList.addEventListener('click', e => {
            selectedTags[ustensilList.innerText] = "ustensil";
            const tag = createTag(ustensilList.innerText, "ustensil");
            tagsSection.appendChild(tag); 

            tag.children[1].addEventListener("click", e => {
                tag.remove();
                delete selectedTags[e.target.previousElementSibling.innerText];
                tagFilteredRecipes();
            })

            tagFilteredRecipes();
        })  
    });
}
tagFilter();







// create tags above dropdowns with accordingli colors (".ingredient-li"), (".appliance-li"), (".ustensil-li");
//HTML
/*<div class="tag">
    <span>coco</span>
    <i class="far fa-times-circle"></i>
</div>*/

const tagsSection = document.querySelector(".tags");
//tags = [];

/*function addTags(){
    tags.slice().reverse().forEach(function(tag) {
        const tag = createTag(ingredientLi.innerText);
        console.log(tag);
        tagsSection.prepend(tag); 
    })
}*/

function createTag(label, type) {
    const tagDiv = document.createElement('div');

    tagDiv.classList.add('tag');
    if (type == "ingredient") {
        tagDiv.classList.add("ingredient-tag");
    }
    else if (type == "ustensil") {
        tagDiv.classList.add("ustensil-tag");
    }
    else if (type == "appliance") {
        tagDiv.classList.add("appliance-tag");
    }
    tagDiv.innerHTML = '<span>' + label + '</span>' + '<i class="far fa-times-circle croix-tag">' + '</i>'

    return tagDiv;
}

//tagsSection.prepend(createTag('moutarde'));



function tagFilteredRecipes() {
    let tagFilteredRecipeArray = [];
    filteredRecipesArray.forEach(recipe => { 
        let bool = true;
        //ingredientsTagFilter();
        //console.log(filteredRecipesArray);
        //ingredientsTagFilter();
        //console.log(selectedTags);
        for(var key in selectedTags) {
            if (selectedTags[key] == "ingredient") {
                //lance ta fonction qui va trier les recettes par ingrédients et les mettre dans tableauTri
                bool = false;
                recipe.ingredients.forEach(ingredient => {
                    if (ingredient.ingredient.includes(key)) {
                        bool = true;
                        return;
                    }
                })
                if (bool == false)
                break;
                
            }
            if (selectedTags[key] == "appliance" && !recipe.appliance.includes(key)) {
                bool = false;
                break;
            }
            if (selectedTags[key] == "ustensil" && !recipe.ustensils.includes(key)) {
                bool = false;
                break;
            }
            console.log(bool);
        }
        if (bool == true && !tagFilteredRecipeArray.includes(recipe))
            tagFilteredRecipeArray.push(recipe);

    });
    console.log(tagFilteredRecipeArray);
    recipesMain.innerHTML = "";
    showRecipe(tagFilteredRecipeArray);
    showIngredients2(tagFilteredRecipeArray);
    showAppliance2(tagFilteredRecipeArray);
    showUstensils2(tagFilteredRecipeArray);
    tagFilter();
} 





// functional loops

/*let filteredRecipesArray = [];

for (let i = 0; i < recipesAll.length; i++) {
    if (recipesAll[i].name.toLowerCase().indexOf(searchString) > -1) {
        filteredRecipesArray.push(recipesAll[i]);
    }
    if (recipesAll[i].description.toLowerCase().indexOf(searchString) > -1) {
        filteredRecipesArray.push(recipesAll[i]);
    }
    if (recipesAll[i].ingredients.toLowerCase().indexOf(searchString) > -1) {
        filteredRecipesArray.push(recipesAll[i]);
    }

}*/





