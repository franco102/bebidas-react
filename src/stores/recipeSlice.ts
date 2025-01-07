import { StateCreator } from "zustand"
import { getCategories, getRecipes, getSelectRecipe } from "../services/RecipeService"
import { Categories, Drink, Drinks, Recipe } from "../utils/recipes-schema"
import { SearchFiter } from "../types"
import { FavoritesSliceType } from "./favortireSlice"

export type RecipesSliceType={
    categories:Categories
    fetchCAtegories: () => Promise<void>
    fetchSearchRecipes: (searchFiter:SearchFiter) => Promise<void>
    drinks:Drinks
    fetchSelectRecipe: (idDrink:Drink['idDrink']) => Promise<void>
    selectedRecipe:Recipe
    modal:boolean 
    closeModal: () => void
}

export const createRecipesSlice:StateCreator<RecipesSliceType& FavoritesSliceType,[],[],RecipesSliceType>=(set)=>({
    categories:{
        drinks: []
    },
    closeModal:()=>{
        set({
            modal:false,
            selectedRecipe:{} as Recipe
        })
    },
    modal:false,
    selectedRecipe: {} as Recipe,
    drinks:{
        drinks: []
    },
    fetchCAtegories:async()=>{
        const response=await getCategories()
        set({
            categories:response
        })
    },
    fetchSearchRecipes:async(searchFiter)=>{
        const response=await getRecipes(searchFiter)
        set({
            drinks:response
        })
    },
    fetchSelectRecipe:async(idDrink)=>{
        const response=await getSelectRecipe(idDrink)
        set({
            modal:true,
            selectedRecipe:response
        })
    }
})