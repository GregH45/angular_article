import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArticleService } from "../services/article.service";
import { RawArticle } from "../models/raw-article";
import { EventEmitter } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Article } from '../models/article';



@Component({
  selector: 'app-article-creation',
  templateUrl: './article-creation.component.html',
  styleUrls: ['./article-creation.component.css']
})
export class ArticleCreationComponent implements OnInit {

  articleForm : FormGroup;
  edit = false;
  article : Article;

  constructor(private fb: FormBuilder, private articleService : ArticleService, private route: ActivatedRoute) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required ],
      content : ['', Validators.required ],
      authors : ['', Validators.required ],
    });
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      if (params && params['id']){  
        this.articleService.get(params['id']).subscribe(fetchedArticle => {
          this.edit = true;
          this.article = fetchedArticle;
          this.articleForm = this.fb.group({
            title: [this.article.title, Validators.required ],
            content : [this.article.content, Validators.required ],
            authors : [this.article.authors, Validators.required ],
          });
        });        
      }
    });
  }

  submit() {
    if (this.edit) {
      this.updateArticle();
    } else {
      this.createArticle();
    }
  }

  private createArticle(){
    const formModel = this.articleForm.value;
    const rawArticle : RawArticle = {
      title : formModel.title,
      content : formModel.content,
      authors : formModel.authors
    };

    this.articleService.add(rawArticle).subscribe(article => {
      window.location.href = '/articles/' + article.id;
    });
  }

  private updateArticle() {
    const formModel = this.articleForm.value;
    const rawArticle : Article = {
      id      : this.article.id,    
      title   : formModel.title,
      content : formModel.content,
      authors : formModel.authors
    };

    this.articleService.update(rawArticle).subscribe(() => {
      window.location.href = '/articles/' + this.article.id;
    });
  }
}
