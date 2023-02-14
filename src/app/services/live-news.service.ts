import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

interface NewsApiModel {
  articles: [];
  status: string;
  totalResults: number;
}

@Injectable({ providedIn: 'root' })
export class LiveNewsApiService {
  constructor(private http: HttpClient) {}

  public get fetchNews() {
    return this.http
      .get<NewsApiModel>('http://newsapi.org/v2/everything')
      .pipe(map((_d: NewsApiModel) => _d.articles));
  }

  public paginateNewsApi(pageSize: number) {
    return this.http
      .get<NewsApiModel>(
        `http://newsapi.org/v2/everything?pageSize=${pageSize}`
      )
      .pipe(map((_d: NewsApiModel) => _d.articles));
  }
}
