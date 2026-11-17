export default async function searchRecipe(search) {
    try {
        const response = await API.get("recipes/search?q=" + search);

        return {
            status: "good",
            data: response.data
        };

    } catch (error) {
        return {
            status: "bad",
            erroressage: String(error)
        };
    }
}
