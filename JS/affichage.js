const recipesContainer = document.querySelector("#recipes");
const cunter = document.querySelector("#cunter");

function fodeBailla() {
  API.get("recipes?limit=12")
    .then((response) => {
      const recipes = response.data.recipes;
      cunter.textContent = "Nombre de recettes : " + recipes.length;
      recipes.forEach((recipe) => {
        const div = document.createElement("div");
        div.classList.add("bg-white", "p-4", "rounded-2xl", "shadow-md", "hover:shadow-lg", "transition", "duration-300", );

        const img = document.createElement("img");
        img.src = recipe.image;
        img.classList.add("w-full", "h-48", "object-cover", "rounded-xl");

        const h2 = document.createElement("h2");
        h2.textContent = recipe.name;
        h2.classList.add("text-xl", "font-bold", "text-gray-800", "mt-3");

        const h3 = document.createElement("h3");
        h3.textContent = "difficulty : " + recipe.difficulty;
        h3.classList.add("text-sm", "text-gray-600", "mt-2");

        const h5 = document.createElement("h3");
        h5.textContent = "Prep Time : " + recipe.prepTimeMinutes + " min";
        h5.classList.add("text-sm", "text-gray-600", "mt-1");

        const h4 = document.createElement("h4");
        h4.textContent = "Cuisine : " + recipe.cuisine;
        h4.classList.add("text-sm", "text-gray-600", "mt-1");

        const button = document.createElement("button");
        button.textContent = "Supprimer";

        button.classList.add("bg-red-500", "hover:bg-red-600", "text-white", "text-sm", "font-semibold", "px-4", "py-2", "rounded-lg", "transition", "duration-200", );
        
        button.addEventListener("click", () => {
          div.remove();
        });

        div.append(img);
        div.append(h2);
        div.append(h3);
        div.append(h5);
        div.append(h4);
        div.append(button);

        recipesContainer.append(div);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

fodeBailla();

import searchRecipe from "./validation.js";

const input = document.querySelector("#recherche");
const button = document.querySelector("#btnSearch");

button.addEventListener("click", async () => {
  try {
    const search = input.value;
    console.log(search);

    const result = await searchRecipe(search);

    if (result.status === "good") {
      const recipes = result.data.recipes;

      console.log(recipes);

      recipesContainer.textContent = "";

      recipes.forEach((recipe) => {
        const div = document.createElement("div");
        div.classList.add( "bg-white", "p-4", "rounded-2xl", "shadow-md", "hover:shadow-lg", "transition", "duration-300",);

        const img = document.createElement("img");
        img.src = recipe.image;
        img.classList.add("w-full", "h-48", "object-cover", "rounded-xl");

        const h2 = document.createElement("h2");
        h2.textContent = recipe.name;
        h2.classList.add("text-xl", "font-bold", "text-gray-800", "mt-3");

        const h3 = document.createElement("h3");
        h3.textContent = "difficulty : " + recipe.difficulty;
        h3.classList.add("text-sm", "text-gray-600", "mt-2");

        const h5 = document.createElement("h3");
        h5.textContent = "Prep Time : " + recipe.prepTimeMinutes + " min";
        h5.classList.add("text-sm", "text-gray-600", "mt-1");

        const h4 = document.createElement("h4");
        h4.textContent = "Cuisine : " + recipe.cuisine;
        h4.classList.add("text-sm", "text-gray-600", "mt-1");

        const button = document.createElement("button");
        button.textContent = "Supprimer";

        button.classList.add("bg-red-500", "hover:bg-red-600", "text-white", "text-sm", "font-semibold", "px-4", "py-2",  "rounded-lg", "transition", "duration-200", );

  
        button.addEventListener("click", () => {
          div.remove();
        });

        div.append(img);
        div.append(h2);
        div.append(h3);
        div.append(h5);
        div.append(h4);
        div.append(button);

        recipesContainer.append(div);
      });
    }
  } catch (error) {
    console.log(error);
  }
});

import validateRecipe from "./validation.js";

async function addrecipe(recipe) {
  try {
    const response = await API.post("recipes/add", recipe);

    return {
      status: "good",
      data: response.data,
    };
  } catch (error) {
    return {
      status: "bad",
      errorMessage: String(error),
    };
  }
}


const form = document.querySelector("#recipeForm");
const container = document.querySelector("#recipes");
const submitBtn = document.querySelector("#submitBtn");
const successMsg = document.querySelector("#successMsg");


function numm() {

    form.addEventListener("submit", (element) => {

        element.preventDefault();

        successMsg.textContent = "";

        const name = document.querySelector("#name").value.trim();
        const cooking = document.querySelector("#cooking").value.trim();
        const difficulty = document.querySelector("#difficulty").value;
        const time = Number(document.querySelector("#time").value);

        const valied = validateRecipe(name, cooking, difficulty, time);

        if (!valied) return;

        const newrecipe = {
            name,
            cooking,
            difficulty,
            time
        };

        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        addrecipe(newrecipe)

            .then((result) => {
               
                if (result.data.status === "bad") {
                    successMsg.style.color = "red";
                    successMsg.textContent = "Failed to add recipe.";
                    console.error(result.data.errorMessage);
                    return;
                }

                const data = result.data;
                console.log(data);

                const div = document.createElement("div");
                div.classList.add("bg-white", "p-4", "rounded-2xl", "shadow-md", "hover:shadow-lg", "transition", "duration-300" );

                const img = document.createElement("img");

                if (data.image) {
                    img.src = data.image;
                } else {
                    img.src = "https://placehold.co/600x400?text=No+Image";
                }

                img.classList.add( "w-full", "h-48", "object-cover", "rounded-xl" );

                const h2 = document.createElement("h2");
                h2.textContent = data.name;
                h2.classList.add( "text-xl", "font-bold", "text-gray-800", "mt-3" );

                const h3 = document.createElement("h3");
                h3.textContent = "Difficulty : " + data.difficulty;
                h3.classList.add( "text-sm", "text-gray-600", "mt-2" );

                const h5 = document.createElement("h5");
                h5.textContent = "Prep Time : " + time + " min";
                h5.classList.add( "text-sm", "text-gray-600", "mt-1" );

                const h4 = document.createElement("h4");
                h4.textContent = "Cuisine : " + cooking;
                h4.classList.add(
                    "text-sm",
                    "text-gray-600",
                    "mt-1"
                );

                const button = document.createElement("button");
                button.textContent = "Supprimer";
                button.classList.add( "bg-red-500", "hover:bg-red-600", "text-white", "text-sm", "font-semibold", "px-4", "py-2", "rounded-lg", "transition", "duration-200" );

                // ZEDT HNA
                button.addEventListener("click", () => {
                    div.remove();
                });

                div.append(img, h2, h3, h5, h4, button);
                container.prepend(div);

                successMsg.style.color = "green";
                successMsg.textContent = "Recipe added successfully!";

                form.reset();

            })

            .catch((error) => {

                console.error(error);

                successMsg.style.color = "red";
                successMsg.textContent = "Something went wrong.";

            })

            .finally(() => {

                submitBtn.disabled = false;
                submitBtn.textContent = "Add Recipe";

            });

    });
}

numm();