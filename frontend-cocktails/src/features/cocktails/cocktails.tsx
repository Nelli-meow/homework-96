import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectCocktails, selectIsLoading } from './cocktailsSlice.ts';
import PreLoader from '../../components/UI/PreLoader.tsx';
import { selectUser } from '../users/UsersSlice.ts';
import CocktailItem from '../../components/CocktailItem/CocktailItem.tsx';
import { useEffect } from 'react';
import {  fetchCocktailsThunk } from './cocktailsThunk.ts';


const Cocktails = () => {
  const cocktails = useAppSelector(selectCocktails);
  const isLoading = useAppSelector(selectIsLoading);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(fetchCocktailsThunk());
  }, [dispatch]);


  return (
    <>
      <h3 className="text-center text-3xl my-5">Cocktails</h3>

      {isLoading ? (
        <PreLoader/>
      ) : cocktails.length === 0 ? (
        <p className="text-center">No cocktails here yet :(</p>
      ) : (
        <div className="flex flex-wrap">
          {cocktails
            .filter(cocktail => user?.role === 'admin' || cocktail.isPublished)
            .map((cocktail) => (
              <div key={cocktail._id}>
                <div className="container mx-auto px-4">
                  <CocktailItem name={cocktail.name} recipe={cocktail.recipe} image={cocktail.image}/>
                </div>
              </div>
            ))
          }
        </div>
      )}
    </>
  );
};

export default Cocktails;