import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  NEWS,
  NewsApi,
  Sorting,
  fetchNews,
  doPagination,
  sortNewsByDate,
  selectFeatureError,
  selectFeatureLoading,
  selectFeatureNews,
  selectFeatureSortMode,
} from '../store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public news$!: Observable<NewsApi[]>;
  public isLoading$!: Observable<boolean>;
  public errorMessage$!: Observable<string>;

  public sortingMode$!: Observable<Sorting>;

  @ViewChild('buttonRef') public buttonRef!: ElementRef<HTMLButtonElement>;

  public isShow!: boolean;
  public topPosToStartShowing = 100;
  constructor(private store: Store<{ news: NEWS }>) {}

  ngOnInit(): void {
    this.news$ = this.store.pipe(select(selectFeatureNews));
    this.isLoading$ = this.store.pipe(select(selectFeatureLoading));
    this.errorMessage$ = this.store.pipe(select(selectFeatureError));
    this.sortingMode$ = this.store.pipe(select(selectFeatureSortMode));
    this.store.dispatch(fetchNews());
  }

  public onToggleSorting() {
    this.store.dispatch(
      sortNewsByDate({
        mode: this.buttonRef.nativeElement.innerText.toLowerCase() as Sorting,
      })
    );
  }

  public doPagination(selectRef: HTMLSelectElement) {
    if (selectRef.value === 'all') return;
    this.store.dispatch(doPagination({ page: +selectRef.value }));
  }

  @HostListener('window:scroll')
  public checkScroll() {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    console.log('[scroll]', scrollPosition);

    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  public gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
