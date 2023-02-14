import { Actions, ofType, createEffect } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import {
  doPagination,
  fetchNews,
  fetchNewsFailure,
  fetchNewsSuccess,
} from './app.action';
import { LiveNewsApiService } from '../app/services';
import { AppState } from './app.state';
import { select, Store } from '@ngrx/store';
import { selectFeaturePage } from './app.selector';

@Injectable()
export class NewsEffects {
  getAllNews$ = createEffect(
    () =>
      this.actions$
        .pipe(
          ofType(fetchNews),
          switchMap((_d) => this.newsApi.fetchNews)
        )
        .pipe(map((news) => fetchNewsSuccess({ news })))
        .pipe(
          catchError((error: HttpErrorResponse) => {
            return of(fetchNewsFailure({ errorMessage: error.message }));
          })
        ),
    { dispatch: true }
  );

  doPagination$ = createEffect(
    () =>
      this.actions$
        .pipe(
          ofType(doPagination),
          withLatestFrom(this.store.pipe(select(selectFeaturePage))),
          switchMap(([_d, page]) => this.newsApi.paginateNewsApi(page))
        )
        .pipe(map((news) => fetchNewsSuccess({ news })))
        .pipe(
          catchError((error: HttpErrorResponse) => {
            return of(fetchNewsFailure({ errorMessage: error.message }));
          })
        ),
    { dispatch: true }
  );
  constructor(
    private actions$: Actions,
    private newsApi: LiveNewsApiService,
    private store: Store<AppState>
  ) {}
}
