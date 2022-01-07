
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

//Search in main searchbar
// 1. pushing searchbar (mainInput) value into tags array - to compare with recipe.title, recipe.ingredients, recipe.description

var searchBar = [];

// search in main searchbar


//|| recipe.ingredients.ingredient.includes(searchString) || recipe.description.includes(searchString)


//function mainSearch() {
    
    /*mainInput.addEventListener('keyup', (e) => {
        const searchString = e.target.value.toLowerCase();

        const filteredRecipes = recipesAll.filter((recipe) => {
            return (
                recipe.name.toLowerCase().includes(searchString) 
            );
        });
        
        /*if(e.target.value.length < 3) {
            recipesMain.innerHTML = "Veuillez entrer au moins 3 caractères d'un ingrédient ou ustensiles."
        }

        if (e.target.value.length >= 3) {
            //titleArray = searchRecipeTitle(e.target.value, recipesAll);
            //console.log(titleArray);
            //ingredientsArray = searchRecipeIngredients(e.target.value, recipesAll);
            //descriptionArray = searchRecipeDescription(e.target.value, recipesAll);
            

        }*/
        // concatenate 3 arrays above
        //titleAndIngredientsArray = titleArray.concat(ingredientsArray);
        //titleIngredientsAndDescriptionArray = titleAndIngredientsArray.concat(descriptionArray)

        //eliminate duplicates
        //const filteredTitleIngredientsAndDescriptionArray = 
        //console.log(filteredRecipes);
        //showRecipe(filteredRecipes);
    //})
    
//}
//mainSearch();

//looping through appliance 
/*recipesAll.forEach(recipe => {
    if (searchBar == recipe.appliance)
    console.log("yes");
})

//looping through ustensils
recipesAll.forEach(recipe => {
    recipe.ustensils.forEach(ustensil => {
        if (searchBar == ustensil)
        console.log("yes");
    })
})

//looping through ingredients 
recipesAll.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
        if (searchBar == ingredient)
        console.log("yes");
    })
})*/

//search in recipesAll.title  
//let recipeTitleAll = [] // array of string with all recipe title in it

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



   

/*function searchRecipeTitle(recipeTitle, recipeAll) {
    recipesAll.forEach(function(recipe) {
        var recipeTitle = recipe["name"]; //array of string
        recipeTitleAll.push(recipeTitle);
    }); 
    
     
}*/

//searchRecipeTitle();

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
        showAppliance;
    })
})


//looping through appliance 

const dropDownAppliance = document.getElementById("dropdown-appliance");


function showAppliance() {
    let recipeApplianceAll = [];
    recipesAll.forEach(recipe => {

        var recipeAppliance = recipe["appliance"]; //array of string
        
        
        if (!recipeApplianceAll.includes(recipeAppliance)) {
            recipeApplianceAll.push(recipeAppliance);
        }

        //return [...new Set(recipeApplianceAll)].sort();
        //console.log([...new Set(recipeApplianceAll)].sort());

        /*const uniqueRecipeAppliance = new Set(recipeApplianceAll);
        
        const uniqueApplianceArray = [...uniqueRecipeAppliance];
        console.log(uniqueApplianceArray);*/

        

        /*function uniqueAppliance(appliance, index, self) {
            return self.indexOf(appliance) === index;
        }
        var uniqueRecipeApplianceOnly = recipeApplianceAll.filter(uniqueAppliance);
        console.log(uniqueRecipeApplianceOnly);*/

        /*let uniqueRecipeApplianceOnly = [];
        recipeApplianceAll.forEach((appliance) => {
            if(!uniqueRecipeApplianceAll.includes(appliance)) {
                uniqueRecipeApplianceOnly.push(appliance)
            }
        })
        console.log(uniqueRecipeApplianceOnly);*/


        /*let uniqueRecipeApplianceAll = recipeApplianceAll.filter((appliance, index) =>{
            return recipeApplianceAll.indexOf(appliance) === index;
        })
        console.log(uniqueRecipeApplianceAll);*/
        


      
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

function showUstensils() {

}
showUstensils()


