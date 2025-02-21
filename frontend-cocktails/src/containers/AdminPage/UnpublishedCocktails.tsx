import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectCocktails, selectIsLoading } from '../../features/cocktails/cocktailsSlice.ts';
import { fetchCocktailsThunk, publishCocktail } from '../../features/cocktails/cocktailsThunk.ts';
import PreLoader from '../../components/UI/PreLoader.tsx';
import CocktailItem from '../../components/CocktailItem/CocktailItem.tsx';
import { Button } from '@mui/material';

const UnpublishedCocktails = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktails);
  const isLoading = useAppSelector(selectIsLoading);

  console.log(cocktails);

  const onPublishCocktails = async (id: string) => {
    console.log('Publishing cocktail with ID:', id);
    await dispatch(publishCocktail(id));
    dispatch(fetchCocktailsThunk());
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-5">
        <h3 className="text-center my-4">Unpublished cocktails</h3>
        {isLoading ? (
          <PreLoader/>
        ) : cocktails.length === 0 ? (
          <p className="text-center">No unpublished cocktails :(</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {cocktails
              .filter((cocktail) => !cocktail.isPublished)
              .map((cocktail) => (
                <div key={cocktail._id} className="bg-white shadow-md p-4 rounded-lg flex  flex-col items-center">
                  <CocktailItem name={cocktail.name} image={cocktail.image} recipe={cocktail.recipe}/>
                  <Button
                    onClick={() => onPublishCocktails(cocktail._id)}
                  >
                    Publish
                  </Button>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UnpublishedCocktails;