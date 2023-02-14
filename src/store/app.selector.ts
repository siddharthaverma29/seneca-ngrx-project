import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';
import { NEWS } from './model';

export const selectFeature = (state: AppState) => state.news;

export const selectFeatureNews = createSelector(
  selectFeature,
  (state: NEWS) =>
    state.data
      ?.filter((_d) => _d.description?.length > 100)
      .filter((_d) => _d.urlToImage !== null)
  // .sort(
  //   (a, b) =>
  //     new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  // )
);
export const selectFeatureLoading = createSelector(
  selectFeature,
  (state: NEWS) => state.isLoading
);
export const selectFeatureError = createSelector(
  selectFeature,
  (state: NEWS) => state.error
);
export const selectFeatureSortMode = createSelector(
  selectFeature,
  (state: NEWS) => state.sortMode
);
export const selectFeaturePage = createSelector(
  selectFeature,
  (state: NEWS) => state.paginaton
);
