import { Route, Routes } from 'react-router-dom';
import RegisterPage from './features/users/RegisterPage.tsx';
import LoginPage from './features/users/LoginPage.tsx';
import Header from './components/Header/Header.tsx';
import  './App.css';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.tsx';
import { useAppSelector } from './app/hooks.ts';
import { selectUser } from './features/users/UsersSlice.ts';
import NewCocktail from './features/cocktails/cocktailContainer/NewCocktail.tsx';
import MainPage from './containers/MainPage.tsx';
import AdminPage from './containers/AdminPage/AdminPage.tsx';
import UnpublishedCocktails from './containers/AdminPage/UnpublishedCocktails.tsx';

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="*" element={<p className="text-center">Page is not  found</p>} />
        <Route path="/cocktails/new" element={
          <ProtectedRoute isaAllowed={!!user}>
            <NewCocktail/>
          </ProtectedRoute>
        } />
        <Route path="/unpublished" element={
          <ProtectedRoute isaAllowed={user && user.role == 'admin'}>
            <AdminPage />
          </ProtectedRoute>
        } />
        <Route path="/unpublished" element={
          <ProtectedRoute isaAllowed={user && user.role == 'admin'}>
            <UnpublishedCocktails />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
};

export default App;
