import Cocktails from '../features/cocktails/cocktails.tsx';


const MainPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-5">
        <Cocktails/>
      </div>
    </div>
  );
};

export default MainPage;
