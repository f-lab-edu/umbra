enum Step {
  GENRE = 'genre',
  YEAR = 'year',
  RATING = 'rating',
  RESULTS = 'results',
}

const STEPS = {
  [Step.GENRE]: 0,
  [Step.YEAR]: 1,
  [Step.RATING]: 2,
  [Step.RESULTS]: 3,
} as const;

const SORT_OPTIONS = [
  { value: 'popularity.desc', label: '인기순' },
  { value: 'vote_average.desc', label: '평점순' },
  { value: 'release_date.desc', label: '최신순' },
  { value: 'vote_count.desc', label: '투표수순' },
  { value: 'revenue.desc', label: '수익순' },
  { value: 'original_title.asc', label: '제목순' },
] as const;

export { Step, STEPS, SORT_OPTIONS };
