import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectCocktail } from '../../features/cocktails/cocktailsSlice.ts';
import { useEffect } from 'react';
import { getOneCocktail } from '../../features/cocktails/cocktailsThunk.ts';
import { useParams } from 'react-router-dom';
import NoPic
  from '../../assets/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';
import { apiURL } from '../../globalConstants.ts';


const CocktailInfoPage = () => {

  const cocktail = useAppSelector(selectCocktail);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      dispatch(getOneCocktail(id));
    }
  }, [dispatch, id]);

  let imageSrc = NoPic;

  if(cocktail && cocktail.image) {
    imageSrc = apiURL + '/' + cocktail.image;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-center text-4xl font-bold text-gray-800 mb-6">
        {cocktail?.name ?? 'Cocktail'}
      </h3>

      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {cocktail?.image && (
          <img
            className="w-full h-80 object-cover"
            src={imageSrc}
            alt={cocktail.name}
          />
        )}

        <div className="p-6">
          <h4 className="text-2xl font-semibold text-gray-800 mb-4">Recipe</h4>
          <p className="text-gray-600">{cocktail?.recipe || 'No recipe.'}</p>

          <h4 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">Ingredients</h4>
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

          <div className="mt-6 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {cocktail?.isPublished ? 'Published' : 'Unpublished'}
            </span>
            <span className="text-sm text-gray-500">Rating: ⭐</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CocktailInfoPage;
