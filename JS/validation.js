export async function searchRecipe(search) {

    try {

        const response = await API.get("recipes/search?q=" + search);

        return {
            status: "good",
            data: response.data
        };

    } catch (error) {

        return {
            status: "bad",
            errorMessage: String(error)
        };

    }

}


export default function validateRecipe(name, cooking, difficulty, time) {

    let isValid = true;

    document.querySelectorAll(".error").forEach((el) => {
        el.textContent = "";
    });

    if (name.length < 3 || name.length > 60) {

        document.querySelector("#nameError").textContent =
            "Name must be between 3 and 60 characters.";

        isValid = false;
    }

    if (!cooking) {

        document.querySelector("#cookingError").textContent =
            "Cooking method is required.";

        isValid = false;
    }

    if (!difficulty) {

        document.querySelector("#difficultyError").textContent =
            "Please select a difficulty.";

        isValid = false;
    }

    if (!Number.isInteger(time) || time < 1 || time > 300) {

        document.querySelector("#timeError").textContent =
            "Time must be between 1 and 300 minutes.";

        isValid = false;
    }

    return isValid;
}
