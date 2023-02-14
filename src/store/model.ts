export interface NEWS {
  data: NewsApi[];
  isLoading: boolean;
  error: any;
  sortMode: Sorting;
  paginaton: number;
}

export interface NewsApi {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: { id: any; name: string };
  title: string;
  url: string;
  urlToImage: string;
}

export type Sorting = 'ascending' | 'descending';
