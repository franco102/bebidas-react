import { useMemo } from "react"
import { DrinkCard } from "../components/DrinkCard"
import { useAppStore } from "../stores/useAppStore"

const FavoritesPage = () => {
  const favorites=useAppStore(state=>state.favorites)
  const hasFacorites=useMemo(()=>favorites.length > 0,[favorites])
  return (
    <>
      <h1 className="text-center font-extrabold text-4xl">Favoritos</h1>
      {hasFacorites?(<div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
          {
              favorites.map((drink, index) => (
                  <DrinkCard key={index} drink={drink}/>
              )) 
          }
      </div>):(<p className="my-10 text-center  text-2xl">Los favoritos se mostratán aquí</p>)  }
      
    </>
  )
}

export default FavoritesPage
