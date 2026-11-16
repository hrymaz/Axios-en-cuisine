const recipesContainer = document.querySelector("#recipes");

function fodeBailla() {
  let URL = "https://dummyjson.com/recipes?limit=12";

  axios
    .get(URL)
    .then((response) => {
      const recipes = response.data.recipes;

      recipes.forEach((recipe) => {
        const div = document.createElement("div");
       
        const img = document.createElement("img");
        img.src = recipe.image;
        img.classList.add('rounded-3xl')
        const h2 = document.createElement("h2");
        h2.textContent = recipe.name;

        const h3 = document.createElement("h3");
        h3.textContent = "difficulty : " + recipe.difficulty;

        const h5 = document.createElement('h3')
        h5.textContent = "pepTimeMinutes :" +recipe.prepTimeMinutes ; 

        const h4 = document.createElement("h4");
         h4.textContent = "Cuisine : " + recipe.cuisine;
        
    
        div.append(img);
        div.append(h2);
        div.append(h3);
        div.append(h5)
        div.append(h4);

        recipesContainer.append(div);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

fodeBailla();
