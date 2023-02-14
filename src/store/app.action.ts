import { createAction, props } from '@ngrx/store';
import { NewsApi, Sorting } from './model';

const ACTIONS = {
  fetchNews: '[News] Fetch All News',
  fetchNewsSuccess: '[News] Fetch News Success',
  fetchNewsFailure: '[News] Fetch News Failure',
  sortNewsByDate: '[News] Sort News By Date',
  pagination: '[News] Pagination',
};

export const fetchNews = createAction(ACTIONS.fetchNews);
export const fetchNewsSuccess = createAction(
  ACTIONS.fetchNewsSuccess,
  props<{ news: NewsApi[] }>()
);
export const fetchNewsFailure = createAction(
  ACTIONS.fetchNewsFailure,
  props<{ errorMessage: string }>()
);
export const sortNewsByDate = createAction(
  ACTIONS.sortNewsByDate,
  props<{ mode: Sorting }>()
);
export const doPagination = createAction(ACTIONS.pagination);
