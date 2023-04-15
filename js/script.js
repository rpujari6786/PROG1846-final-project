// Display Drink 1 of the Day Data

let drink1 = document.getElementById("sec1-drink-1");

if (drink1) {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        .then((response) => response.json())
        .then((data) => {
            displayData(data);
        });
}

const displayData = (data) => {
    // Section1 Drink1 Img
    drink1.src = data.drinks[0].strDrinkThumb;

    // Section1 Drink1 Title
    document.getElementById("sec1-drink-1-title").innerHTML =
        data.drinks[0].strDrink;

    // Section1 Drink1 Title (Small Screen Devices)
    let elems = document.querySelectorAll(".sec1-drink-1");
    for (let i = 0; i < elems.length; i++) {
        elems[i].innerHTML = data.drinks[0].strDrink;
        // console.log(elems[i].innerHTML);
    }

    // Recipe Ingredients
    let recipeIngredients = document.getElementById("recipe-ingredients");

    for (let i = 1; i <= 15; i++) {
        if (data.drinks[0][`strIngredient${i}`] !== null) {
            let span = document.createElement("span");

            span.setAttribute("class", "btn badge p-2 m-1 text-dark");
            let ingredient = data.drinks[0][`strIngredient${i}`];
            let measure = data.drinks[0][`strMeasure${i}`];
            let text = document.createTextNode(
                ingredient +
                    " : " +
                    (measure === null ? "NA" : measure) +
                    "\r\n"
            );
            span.appendChild(text);
            recipeIngredients.appendChild(span);
        }
    }

    // Section1 Drink1 Category
    document.getElementById("sec1-drink-1-category").innerHTML =
        data.drinks[0].strCategory;

    // Section1 Drink1 Instructions
    document.getElementById("sec1-drink-1-instructions").innerHTML =
        data.drinks[0].strInstructions;
};

// Section - Search Drinkes by Name or Keywords

let searchByDrinkName = document.getElementById("search-drink-name");

let drinks = [];
searchByDrinkName.addEventListener("input", (e) => {
    let search = e.target.value;
    if (search.length > 1) {
        let ddOptions = document.getElementById("search-by-drink");
        if (ddOptions.hasChildNodes) {
            const newNode = ddOptions.cloneNode(false);
            ddOptions.replaceWith(newNode);
        }
        fetch(
            "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + search
        )
            .then((response) => response.json())
            .then((data) => {
                drinks.length = 0;
                // iterating through list of drinks
                for (let drink of data.drinks) {
                    let option = document.createElement("option");
                    option.setAttribute("class", "dropdown-item");
                    option.setAttribute("name", "dropdown-item");
                    option.setAttribute("value", drink.strDrink);
                    option.setAttribute("id", drink.idDrink);

                    drinks.push({
                        dishName: drink.strDrink,
                        dishId: drink.idDrink,
                    });
                    document
                        .getElementById("search-by-drink")
                        .appendChild(option);

                    // console.log(drink.idDrink + " " + drink.strDrink);
                }
            })
            .catch((err) => console.log(err));
    }
});

document
    .getElementsByName("search-drink-name")[0]
    .addEventListener("change", (e) => {
        window.sessionStorage.setItem("drinkId", drinks[0].dishId);
    });

let btnSearchByDrinkName = document.getElementById("btnSearchByDrinkName");
btnSearchByDrinkName.addEventListener("click", () => {
    fetchAPI(window.sessionStorage.getItem("drinkId"));
});

const fetchAPI = (drinkId) => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`)
        .then((response) => response.json())
        .then((data) => {
            displayData(data);
        });
};
