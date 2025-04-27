import { useState } from 'react';
import { useGetGenres } from '@/components/movie/hooks/use-get-genres';
import { useMovieFilters } from '@/components/movie/hooks/use-movie-filters';

// Constants
const SORT_OPTIONS: Array<{ value: string; label: string }> = [
  { value: 'popularity.desc', label: '인기도 높은순' },
  { value: 'popularity.asc', label: '인기도 낮은순' },
  { value: 'vote_average.desc', label: '평점 높은순' },
  { value: 'vote_average.asc', label: '평점 낮은순' },
  { value: 'release_date.desc', label: '최신순' },
  { value: 'release_date.asc', label: '오래된순' },
];

const VOTE_AVERAGE_OPTIONS = [
  { value: '0', label: '모든 평점' },
  { value: '7', label: '7점 이상' },
  { value: '8', label: '8점 이상' },
  { value: '9', label: '9점 이상' },
];

const buttonStyles = 'px-4 py-2 bg-gray-700/80 rounded-lg hover:bg-gray-600/90 transition-colors';
const dropdownStyles =
  'absolute z-50 mt-2 w-64 bg-gray-800/95 backdrop-blur rounded-lg shadow-lg max-h-96 overflow-y-auto border border-gray-700/50';
const optionStyles = 'flex items-center p-2 hover:bg-gray-600/80 rounded cursor-pointer transition-colors';

const FilterButton: React.FC<{
  label: string;
  count?: number;
  isOpen: boolean;
  onClick: () => void;
}> = ({ label, count, isOpen, onClick }) => (
  <button className={`${buttonStyles} min-w-[120px] flex items-center justify-between`} onClick={onClick}>
    <span>
      {label} {count ? `(${count})` : ''}
    </span>
    <svg
      className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </button>
);

const MultiSelectDropdown: React.FC<{
  isOpen: boolean;
  options: { id: number; name: string }[];
  selectedValues: number[];
  onChange: (value: number) => void;
}> = ({ isOpen, options, selectedValues, onChange }) => {
  if (!isOpen) return null;

  return (
    <div className={dropdownStyles}>
      <div className="p-2">
        {options.map((option) => (
          <label key={option.id} className={optionStyles}>
            <input
              type="checkbox"
              checked={selectedValues.includes(option.id)}
              onChange={() => onChange(option.id)}
              className="mr-2 accent-blue-500"
            />
            {option.name}
          </label>
        ))}
      </div>
    </div>
  );
};

const SelectFilter: React.FC<{
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}> = ({ value, onChange, options }) => (
  <select value={value} onChange={(e) => onChange(e.target.value)} className={buttonStyles}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

const MovieFilter: React.FC = () => {
  const { data: genres } = useGetGenres();
  const [{ genres: selectedGenres, sort_by: sortBy, vote_average: voteAverage }, setFilters] = useMovieFilters();

  const [openDropdown, setOpenDropdown] = useState<'genre' | null>(null);

  const handleGenreChange = (value: number) => {
    const genreId = value;
    const currentGenres = selectedGenres;
    setFilters({
      genres: currentGenres.includes(genreId)
        ? currentGenres.filter((id) => id !== genreId)
        : [...currentGenres, genreId],
    });
  };

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-gray-800/50 backdrop-blur rounded-lg">
      <div className="relative">
        <FilterButton
          label="장르"
          count={selectedGenres?.length}
          isOpen={openDropdown === 'genre'}
          onClick={() => setOpenDropdown(openDropdown === 'genre' ? null : 'genre')}
        />
        <MultiSelectDropdown
          isOpen={openDropdown === 'genre'}
          options={genres?.map((genre) => ({ id: genre.id, name: genre.name })) ?? []}
          selectedValues={selectedGenres}
          onChange={handleGenreChange}
        />
      </div>
      <SelectFilter value={sortBy} onChange={(value) => setFilters({ sort_by: value })} options={SORT_OPTIONS} />
      <SelectFilter
        value={voteAverage}
        onChange={(value) => setFilters({ vote_average: value })}
        options={VOTE_AVERAGE_OPTIONS}
      />
    </div>
  );
};

export { MovieFilter };
