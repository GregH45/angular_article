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
    const list = document.getElementById('listArticles'),
          search = this.searchForm.value.search.toLowerCase();

    function resetList() {
      list.classList.remove('active');
      
      while (list.children.length > 0) {
        list.children[0].remove();
      }
    }

    function addArticle(article) {
      let li = document.createElement('li'),
          a = document.createElement('a');

      a.innerText = article.title;
      a.href = '/articles/' + article.id;

      li.appendChild(a);
      list.appendChild(li);
    }


    resetList();

    if (search.length > 0) {
      let results = [];
      this._articles.forEach((article) => {
        if (JSON.stringify(article).toLowerCase().includes(search)) {
          results.push(article);
        }
      });

      switch (results.length) {
        // No Result
        case 0:
          alert('Aucun result');
          break;

        // Unique Result
        case 1:
          window.location.href = '/articles/' + results[0].id;
          break;

        // Multiple Results
        default:
          resetList();
          results.forEach((article) => {
            addArticle(article);
          });
          list.classList.add('active');
      }
    }
  }

}
