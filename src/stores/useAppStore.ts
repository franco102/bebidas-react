import { create } from "zustand";
import { createRecipesSlice, RecipesSliceType } from "./recipeSlice";
import { devtools } from "zustand/middleware";
import { createFavoritesSlice, FavoritesSliceType } from "./favortireSlice";
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice";

//Slice Parent
export  const useAppStore=create<RecipesSliceType&FavoritesSliceType&NotificationSliceType>()(devtools((...a)=>({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a),
})))