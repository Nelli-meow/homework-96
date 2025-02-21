import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../users/UsersSlice.ts';
import CocktailsForm from '../../../components/CocktailsForm/CocktailsForm.tsx';
import { addNewCocktail, fetchCocktailsThunk } from '../cocktailsThunk.ts';
import { ICocktailMutation } from '../../../types';
import { toast } from 'react-toastify';
import { selectIsCreateLoading } from '../cocktailsSlice.ts';
import { CircularProgress } from '@mui/material';

const NewCocktail = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const isCreateLoading = useAppSelector(selectIsCreateLoading);

  const onSubmit = async (cocktail: ICocktailMutation) => {
    if (user) {
      await dispatch(addNewCocktail({cocktail, token: user.token}));
      await dispatch(fetchCocktailsThunk());

      if(user?.role === 'user') {
        toast.success('Your cocktail is under moderator review ;)');
      }
      navigate('/');
    }
  };

  return (
    <>
      {isCreateLoading ? <CircularProgress/> :
        <CocktailsForm onSubmit={onSubmit}/>
      }
    </>
  );
};


export default NewCocktail;