import { Actions, ofType, createEffect } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { fetchNews, fetchNewsFailure, fetchNewsSuccess } from './app.action';
import { LiveNewsApiService } from 'src/app/services/live-news.service';

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
  constructor(private actions$: Actions, private newsApi: LiveNewsApiService) {}
}
