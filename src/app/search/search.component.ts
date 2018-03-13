import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from "rxjs/Observable";

import { Article } from "../models/article";
import { ArticleService } from "../services/article.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private searchForm: FormGroup;
  private _articles : Article[];

  constructor(private articleService: ArticleService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      search: ['', Validators.required ]
    });
  }

  ngOnInit() {
    this.articleService.getAll().forEach((articles) => {
      this._articles = articles;
    });
  }

  search() {
    const search = this.searchForm.value.search.toLowerCase();
    let results = [];

    this._articles.forEach((article) => {
      const exist = JSON.stringify(article).toLowerCase().includes(search);
      if (exist) {
        results.push(article);
      }
    });

    switch (results.length) {
      case 0:
        alert('Aucun result');
        break;
      case 1:
        window.location.href = '/articles/' + results[0].id;
        break;
      default:
        console.log(results);
    }
  }

}
