import {Injectable} from '@angular/core';
import {Article} from "../models/article";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {RawArticle} from "../models/raw-article";

@Injectable()
export class ArticleService {

  private _article : Observable<Article[]>;

  constructor(private http : HttpClient) {}

  public getAll(): Observable<Article[]> {
    return this.http.get<Article[]>("http://localhost:3000/articles");
  }

  public get(id: number): Observable<Article> {
    return this.http.get<Article>(`http://localhost:3000/articles/${id}`);
  }

  public delete(id: number): Observable<Article> {
    return this.http.delete<Article>(`http://localhost:3000/articles/${id}`);
  }

  public add(article: RawArticle): Observable<Article> {
    return this.http.post<Article>("http://localhost:3000/articles/", article);
  }

  public update(article: Article): Observable<Article> {
    return this.http.put<Article>(`http://localhost:3000/articles/${article.id}`, article);
  }
}
