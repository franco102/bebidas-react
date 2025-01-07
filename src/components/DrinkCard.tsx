import { useAppStore } from "../stores/useAppStore"
import { Drink } from "../utils/recipes-schema"

type DrinkCardProps = {
    drink:Drink
}

export const DrinkCard = ({drink}:DrinkCardProps) => {
    const fetchSelectRecipe=useAppStore((state)=>state.fetchSelectRecipe )
    
  return (
    <div className="border shadow-lg">
        <div className="overflow-hidden">
            <img
                className="hover:scale-125 transition-transform hover:rotate-2 w-full" 
                src={drink.strDrinkThumb} alt={drink.strDrink} />
        </div>
        <div className="p-5">
            <h2 className="text-2xl truncate font-bold">{drink.strDrink}</h2>
            <button
                type="button"
                className="bg-orange-400 hover:bg-orange-500 mt-5 w-full uppercase font-bold text-white text-center p-3 text-lg"	
                onClick={()=>fetchSelectRecipe(drink.idDrink)}
            >Ver Receta</button>
        </div>
    </div>
  )
} 

