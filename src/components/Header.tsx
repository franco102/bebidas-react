import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore";
import { SearchFiter } from "../types";

export const Header = () => {
    const {pathname} = useLocation();
    const categories = useAppStore((state)=>state.categories);
    const  isHome=useMemo(()=>pathname=='/',[pathname]);
    const fetchCAtegories=useAppStore((state)=>state.fetchCAtegories )
    const fetchSearchRecipes=useAppStore((state)=>state.fetchSearchRecipes )
    const showNotification =  useAppStore(state=>state.showNotification)
    const [searchFilters,setSearchFilters]=useState<SearchFiter>({
        ingredient:'',
        category:''
    });
    const handleChange=(e:ChangeEvent<HTMLSelectElement|HTMLInputElement>)=>{
        setSearchFilters({
            ...searchFilters,
            [e.target.name]:e.target.value

        })
    }
    const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(Object.values(searchFilters).includes('')){
            return showNotification({text:'Todos los campos deben ser obligarotio',error:true});
        }
        fetchSearchRecipes(searchFilters);
    }

    useEffect(()=>{
        fetchCAtegories()
    },[])
    
  return (
    <header className={isHome?" bg-header bg-cover bg-center":"bg-slate-800"}>
        <div className="mx-auto container px-5 py-16">
            <div className="flex justify-between items-center">
                <div>
                    <img className="w-32" src="/logo.svg" alt="" />
                </div>
                <nav className="flex gap-4">
                    <NavLink to='/' className={({isActive})=>` ${isActive ? 'text-orange-400':'text-white'} uppercase font-bold`}>Inicio</NavLink>
                    <NavLink to='/favoritos' className={({isActive})=>` ${isActive ? 'text-orange-400':'text-white'} uppercase font-bold`}>Favoritos</NavLink>
                </nav>
            </div>
            { isHome && (
                <form onSubmit={handleSubmit} className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6">
                    <div className=" space-y-6">
                        <label htmlFor="ingredient" className="block text-white font-extrabold text-lg">
                            Nombre o Ingrediente
                        </label>
                        <input 
                            value={searchFilters.ingredient}
                            onChange={handleChange}
                            type="text" 
                            id="ingredient" 
                            name='ingredient' 
                            className="p-3  w-full rounded-lg focus:outline-none" 
                            placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila, Café"
                        />
                    </div>
                    <div className=" space-y-6">
                        <label htmlFor="category" className="block text-white font-extrabold text-lg">
                            Categoria
                        </label>
                        <select 
                            id="category" 
                            name='category' 
                            className="p-3  w-full rounded-lg focus:outline-none" 
                            value={searchFilters.category}
                            onChange={handleChange}
                        >
                            <option value="">-- Seleccione --</option>
                            {categories.drinks.map((category,i)=><option key={i} value={category.strCategory}>{category.strCategory}</option>)}
                        </select>
                    </div>
                    <input type="submit" value="Buscar Recetas" className="cursor-pointer w-full p-2 bg-orange-800 hover:bg-orange-900 text-white text-center rounded-lg uppercase font-bold"/> 
                </form>
            )

            }
        </div>
    </header>
  )
}
