import axios from "axios";
import { parse } from "valibot";
import { CategoriesAPIREsponseSchema, Drink, DrinksAPIResponse, RecipeAPIResponseSchema } from "../utils/recipes-schema";
import { SearchFiter } from "../types";

export async function getCategories(){
    const {data}=await axios("https:///www.thecocktaildb.com/api/json/v1/1/list.php?c=list");
    return parse(CategoriesAPIREsponseSchema,data);
}
export async function getRecipes(searchFiter:SearchFiter){
    const {data}=await axios(`https:///www.thecocktaildb.com/api/json/v1/1/filter.php?c=${searchFiter.category}&i=${searchFiter.ingredient}`);
    return parse(DrinksAPIResponse,data);
}
export async function getSelectRecipe(idDrink:Drink['idDrink']){
    const {data}=await axios(`https:///www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`);
    return parse(RecipeAPIResponseSchema,data.drinks[0]);
}