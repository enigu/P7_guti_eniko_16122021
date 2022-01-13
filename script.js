
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


// dropdowns

const filters = document.querySelectorAll('.filter-button');
const arrows = document.querySelectorAll('.arrow')
const dropDown = document.querySelectorAll('.dropdown')
const dropDownMenu = document.querySelectorAll('.dropdown-menu')


const filterInputs = document.querySelectorAll('.filter-button > input')

/*filterInputs.forEach(input => {
    input.addEventListener('click', chooseDropDown(e));
    
    //input.value = `Recherche un ${data-value}`
});*/

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
            if (e.target.dataset.color === "blue") {
                input.parentNode.parentNode.style.backgroundColor = "blue";
                console.log(e.target.dataset.color);
                console.log(input.parentNode.parentNode);
            }    
        }

        if(e.target.dataset.choisi === "false" ) {
            input.parentNode.classList.remove("active")
        }

}


/*function showDropDown () {
    console.log('coucou');
    const clickedInput = document.querySelectorAll('.filter-button > input[data-choisi="true"]')
    console.log(clickedInput);
    //dropDown.style.width = '50%';
    //dropDown.classList.add('active');

}
showDropDown();*/


/*document.addEventListener("click", e => {
    const isDropDownButton = e.target.matches("[data-dropdown-button]")

    if (isDropDownButton) {
        //dropDownMenu.classList.add('active')
        //dropDownMenu.style.display = "flex"
    
    }
    //else return
  })*/

  /*function openDropDown() {
    if (!dropDownMenu.classList.contains("active")) {
        
        arrows.style.transform = 'rotate(180deg)';
        dropDownMenu.style.display = "flex";
        dropDownMenu.classList.add("active");
      }

      else if (dropDownMenu.classList.contains("active")) {
        arrow.style.transform = 'rotate(360deg)';
        dropDownMenu.style.display = "none";
        dropDownMenu.classList.remove("active");
      }
  }*/


  

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



//looping through ingredientss - launching dropdown of ingredients
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
        dropDownIngredients.style.backgroundColor = "blue";
    }); 
}
showIngredients();



