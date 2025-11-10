const TemplateCard = ({ template, isFavorited, onFavoriteClick }) => {
  const { id, title, description, imageUrl } = template;

  return (
    <div className="group relative max-w-sm rounded-lg overflow-hidden shadow-xl bg-white transition-shadow duration-300 hover:shadow-2xl">
      <div className="overflow-hidden">
        <img 
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" 
          src={imageUrl || 'https://via.placeholder.com/400x250?text=No+Image'} 
          alt={title} 
        />
      </div>
      
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-900">{title}</div>
        <p className="text-gray-700 text-base min-h-18">
          {description}
        </p>
      </div>

      <div className="px-6 pt-2 pb-4">
        <button
          onClick={() => onFavoriteClick(id)}
          className={`
            w-full py-2 px-4 rounded-md font-semibold text-sm transition-all duration-300 
            flex items-center justify-center gap-2
            ${
              isFavorited
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-gray-200 text-gray-800 hover:bg-red-100 hover:text-red-600'
            }
          `}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-5 h-5"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                  stroke={isFavorited ? 'none' : 'currentColor'} 
                  fill={isFavorited ? 'currentColor' : 'none'}
                  strokeWidth={isFavorited ? 0 : 2}
            />
          </svg>
          
          {isFavorited ? 'Favorited' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
};

export default TemplateCard;