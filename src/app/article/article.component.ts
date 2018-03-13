import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Article } from '../models/article';
import { ArticleService } from "../services/article.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input()
  article: Article;
  
  @Input()
  hiddenBtn: Boolean;
  
  @Output()
  removeArticle: EventEmitter<Article> = new EventEmitter();

  constructor(private route: ActivatedRoute, private articleService: ArticleService) {}

  ngOnInit() {
    this.route.params.subscribe( params => {
      if (params && params['id']){
        this.articleService.get(params['id']).subscribe(fetchedArticle => this.article = fetchedArticle);
      }
    });
  }

  delete() {
    /**/ // Remove the last slash to switch between instructions
    this.articleService.delete(this.article.id).subscribe(()=>{
      window.location.href = '/articles';
    });
    /*/
    this.removeArticle.emit(this.article);
    //*/
  }

  edit() {
    window.location.href = '/edit/' + this.article.id;
  }
}
