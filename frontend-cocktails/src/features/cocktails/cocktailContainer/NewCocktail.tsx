import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../users/UsersSlice.ts';
import CocktailsForm from '../../../components/CocktailsForm/CocktailsForm.tsx';
import { addNewCocktail, fetchCocktailsThunk } from '../cocktailsThunk.ts';
import { ICocktailMutation } from '../../../types';
import { toast } from 'react-toastify';



const NewCocktail = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const onSubmit = async (cocktail: ICocktailMutation) => {
    if (user) {
      await dispatch(addNewCocktail({cocktail, token: user.token}));
      await dispatch(fetchCocktailsThunk());
      toast.success('Your cocktail is under moderator review ;)');
      navigate('/');
    }
  };

  return (
    <>
      <CocktailsForm onSubmit={onSubmit}/>
    </>
  );
};


export default NewCocktail;