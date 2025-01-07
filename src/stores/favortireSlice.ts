import { StateCreator } from "zustand" 
import { Recipe } from "../utils/recipes-schema"
import { createRecipesSlice, RecipesSliceType } from "./recipeSlice"
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice"

export type FavoritesSliceType={
    favorites:Recipe[] 
    handleClickFavorite:(recipe:Recipe) => void
    favoriteExists:(idDrink:Recipe['idDrink']) => boolean
    loadFromLocalStorage: () => void
}

export const createFavoritesSlice:StateCreator<FavoritesSliceType & RecipesSliceType & NotificationSliceType,[],[],FavoritesSliceType>=(set,get,api)=>({
    favorites:[] ,
    handleClickFavorite:(recipe) =>{
        if(get().favoriteExists(recipe.idDrink)){
            set(state=>({
                favorites: [...state.favorites.filter(favorite=>favorite.idDrink!==recipe.idDrink)]
            }))
            createNotificationSlice(set, get,api).showNotification({text:'Se eliminó de favoritos',error:false})
        }else{
            set(state=>({
                favorites: [...state.favorites, recipe]
            }))
            createNotificationSlice(set, get,api).showNotification({text:'Se agregó a favorites',error:false})
        }
        
        createRecipesSlice(set, get,api).closeModal();
        localStorage.setItem('favoritess', JSON.stringify(get().favorites))
    },
    favoriteExists:(idDrink)=>{
        return get().favorites.some(favorite=>favorite.idDrink===idDrink);
    },
    loadFromLocalStorage:()=>{
        const favorites=localStorage.getItem('favoritess');
        if(favorites){
            set( 
                ({
                    favorites: JSON.parse(favorites)
                })
            )
        }
    }
})