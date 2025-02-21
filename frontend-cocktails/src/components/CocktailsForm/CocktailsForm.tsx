import React, { ChangeEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileInput from '../FileInput/FileInput.tsx';
import { ICocktailMutation } from '../../types';
import { Button } from '@mui/material';

export interface Props {
  onSubmit: (cocktail: ICocktailMutation) => void;
}

const initialState = {
  name: '',
  recipe: '',
  ingredients: '',
  image: null,
};

const CocktailsForm: React.FC<Props> = ({onSubmit}) => {
  const [cocktail, setCocktails] = useState<ICocktailMutation>(initialState);
  const [ingredients, setIngredients] = useState<{ ingredientName: string, ingredientAmount: number }[]>([]);
  const navigate = useNavigate();

  const onSubmitCocktail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cocktail.name.trim() || !cocktail.recipe.trim() || ingredients.length === 0) {
      alert('Please fill in all fields: name, recipe, and at least one ingredient.');
      return;
    }

    onSubmit({...cocktail, ingredients: JSON.stringify(ingredients)});
    setCocktails(initialState);
    navigate('/');
  };

  const inputChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;

    setCocktails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const getImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;

    if (files) {
      setCocktails(prevState => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  const addIngredient = () => {
    setIngredients(prevState => [...prevState, {ingredientName: '', ingredientAmount: 0}]);
  };

  const deleteIngredient = (index: number) => {
    setIngredients(ingredients.filter((_ing, i) => i !== index));
  };

  const onChangeIngredients = (i: number, e: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = e.target;

    setIngredients(ingredients.map((_ing, index) => {
      if (index === i) {
        return {
          ...ingredients[i],
          [name]: value,
        };
      }
      return _ing;
    }));
  };


  return (
    <div className="max-w-lg mx-auto mt-6 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-center mb-5">Add New Cocktail</h2>

      <form onSubmit={onSubmitCocktail} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
            Cocktail Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={cocktail.name}
            onChange={inputChangeHandler}
            required
            placeholder="Enter cocktail name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
            Cocktail's ingredients
          </label>
          {ingredients.map((_ing, index) => (
            <div key={index} className="row flex justify-between items-center space-x-2  mb-3">
              <div className="col-auto me-3">
                <input
                  type="text"
                  id={`ingredient-${index}`}
                  name="ingredientName"
                  onChange={e => onChangeIngredients(index, e)}
                  required
                  placeholder="Enter ingredient name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-20">
                <input
                  type="number"
                  id={`ingredient-${index}`}
                  name="ingredientAmount"
                  onChange={e => onChangeIngredients(index, e)}
                  required
                  placeholder="Enter ingredient name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                {ingredients.length <= 1 ? null :
                  <div>
                    <button
                      onClick={() => deleteIngredient(index)}
                      type="button"
                      className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Delete
                    </button>
                  </div>
                }
              </div>
            </div>
          ))}
          <Button type="button" onClick={addIngredient}>Add Ingredient</Button>
        </div>

        <div>
          <label htmlFor="photo" className="block text-gray-700 font-medium mb-1">
            Photo
          </label>
          <FileInput name="image" label="Image" onGetFile={getImage}/>
        </div>

        <div>
          <label htmlFor="recipe" className="block text-gray-700 font-medium mb-1">
            Recipe
          </label>
          <textarea
            id="recipe"
            name="recipe"
            value={cocktail.recipe}
            rows={4}
            onChange={inputChangeHandler}
            placeholder="Write the recipe..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          Add Cocktail
        </button>
      </form>
    </div>

  );
};

export default CocktailsForm;