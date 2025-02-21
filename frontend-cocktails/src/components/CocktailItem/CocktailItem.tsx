import { apiURL } from '../../globalConstants.ts';
import NoPic
  from '../../assets/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';
import React from 'react';


interface CocktailProps {
  name: string;
  image?: string | null;
  recipe: string;
  _id: string;
}


const CocktailItem: React.FC<CocktailProps> = ({name, image, recipe, _id}) => {
  const imageSrc = image ? `${apiURL}/${image}` : NoPic;

  return (
    <>
      <div
        className="max-w-sm bg-gradient-to-b from-blue-100 via-indigo-100 to-purple-200 border border-indigo-300 rounded-lg shadow-md mb-5 h-full flex flex-col">
        <a href={`/cocktails/${_id}`}>
          <img className="rounded-t-lg" src={imageSrc} alt={name}/>
        </a>
        <div className="p-5 flex flex-col flex-grow">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-blue-900">
            {name}
          </h5>
          <p className="mb-3 font-normal text-blue-600 overflow-hidden text-ellipsis whitespace-nowrap flex-grow">
            {recipe}
          </p>
          <div className="mt-auto">
            <a
              href={`/cocktails/${_id}`}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-700 dark:hover:bg-indigo-800 dark:focus:ring-indigo-900 transition-all duration-300"
            >
              Read more
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default CocktailItem;