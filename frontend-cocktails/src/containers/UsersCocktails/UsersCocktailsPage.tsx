import UsersCocktails from './UsersCocktails.tsx';
import { useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../../features/users/UsersSlice.ts';

const UsersCocktailsPage = () => {
  const user = useAppSelector(selectUser);

  if (!user?._id) return <p className="text-center text-gray-500">User not found</p>;

  return (
    <div className="container mx-auto p-6">
      <UsersCocktails userId={user._id} />
    </div>
  );
};

export default UsersCocktailsPage;
