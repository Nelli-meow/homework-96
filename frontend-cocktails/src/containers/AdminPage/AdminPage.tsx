import UnpublishedCocktails from './UnpublishedCocktails.tsx';
import { useEffect } from 'react';
import { fetchCocktailsThunk } from '../../features/cocktails/cocktailsThunk.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../../features/users/UsersSlice.ts';


const AdminPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  console.log(user);

  useEffect(() => {
    dispatch(fetchCocktailsThunk());
  }, [dispatch]);

  return (
    <>
      <UnpublishedCocktails/>
    </>
  );
};

export default AdminPage;