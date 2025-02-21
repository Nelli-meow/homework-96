import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectCocktails, selectIsLoading } from './cocktailsSlice.ts';
import PreLoader from '../../components/UI/PreLoader.tsx';
import { selectUser } from '../users/UsersSlice.ts';
import CocktailItem from '../../components/CocktailItem/CocktailItem.tsx';
import  { useEffect } from 'react';
import { deleteCocktail, fetchCocktailsThunk } from './cocktailsThunk.ts';


const Cocktails = () => {
  const cocktails = useAppSelector(selectCocktails);
  const isLoading = useAppSelector(selectIsLoading);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCocktailsThunk());
  }, [dispatch]);


  const onDelete = async (id: string) => {
    await dispatch(deleteCocktail(id));
    dispatch(fetchCocktailsThunk());
  };

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
                  <CocktailItem name={cocktail.name} recipe={cocktail.recipe} image={cocktail.image} _id={cocktail._id}/>
                  {user && user.role === 'admin' && (
                    <>
                      <button onClick={() => onDelete(cocktail._id)} className=" font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 text-white bg-red-700 hover:bg-red-800">delete cocktail</button>
                    </>
                  )}
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