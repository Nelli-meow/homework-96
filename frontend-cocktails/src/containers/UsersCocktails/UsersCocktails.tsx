import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import {  selectIsLoading, selectUserCocktails } from '../../features/cocktails/cocktailsSlice.ts';
import {  fetchUserCocktailsThunk } from '../../features/cocktails/cocktailsThunk.ts';
import PreLoader from '../../components/UI/PreLoader.tsx';
import { apiURL } from '../../globalConstants.ts';


const UsersCocktails = ({ userId }: { userId: string }) => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectUserCocktails);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchUserCocktailsThunk(userId));
  }, [dispatch, userId]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Your Cocktails :3</h2>
      {isLoading && <PreLoader/> }
      {!isLoading && cocktails.length === 0 && (
        <p className="text-gray-500">No cocktails.</p>
      )}
      <ul className="space-y-4">
        {cocktails.map((cocktail) => (
          <li key={cocktail._id} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700">{cocktail.name}</h3>
            <p className="text-gray-600 mt-1">{cocktail.recipe}</p>
            {cocktail.image && (
              <img
                src={apiURL + '/' + cocktail.image}
                alt={cocktail.name}
                className="w-full h-48 object-cover rounded-lg mt-2"
              />
            )}

            {cocktail?.ingredients && Array.isArray(cocktail.ingredients) && cocktail.ingredients.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700">
                {cocktail.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.ingredientAmount}ml × {ingredient.ingredientName}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700">No ingredients listed.</p>
            )}

          </li>
        ))}
      </ul>

    </div>
  );
};

export default UsersCocktails;
