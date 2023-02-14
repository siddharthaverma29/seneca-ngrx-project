import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsApi } from '../../store';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
})
export class NewsCardComponent {
  @Input() news$!: Observable<NewsApi[]>;
  @Input() isLoading$!: Observable<boolean>;
  @Input() errorMessage$!: Observable<string>;
  constructor() {}

  public readFullContent(content: string) {
    window.alert(content);
  }
}
