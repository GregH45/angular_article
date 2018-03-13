import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { Article } from "../models/article";
import { ArticleService } from "../services/article.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private article: Article;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getAll().forEach((articles) => {
      this.article = articles[0];
    });
  }

}
