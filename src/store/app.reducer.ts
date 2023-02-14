import { createReducer, on } from '@ngrx/store';
import {
  fetchNews,
  fetchNewsFailure,
  fetchNewsSuccess,
  sortNewsByDate,
} from './app.action';
import { NEWS } from './model';

export const intialState: NEWS = {
  isLoading: false,
  error: null,
  data: [],
  sortMode: 'ascending',
  paginaton: 10,
};

export const newsReducer = createReducer(
  intialState,
  on(fetchNews, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(fetchNewsSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      data: action.news,
    };
  }),
  on(fetchNewsFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      data: [],
      error: action.errorMessage,
    };
  }),
  on(sortNewsByDate, (state, action) => {
    const data = state.data
      .filter((_d) => _d.description?.length > 100)
      .filter((_d) => _d.urlToImage !== null);
    return {
      ...state,
      sortMode: action.mode === 'ascending' ? 'ascending' : 'descending',
      data:
        action.mode === 'ascending'
          ? data.sort(
              (a, b) =>
                new Date(b.publishedAt).getTime() -
                new Date(a.publishedAt).getTime()
            )
          : data.sort(
              (a, b) =>
                new Date(a.publishedAt).getTime() -
                new Date(b.publishedAt).getTime()
            ),
    };
  })
);
