import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostService } from './post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts = [];
  isFetching = false;
  error = null;
  private errSub: Subscription;

  constructor(
    private http: HttpClient,
    private postService: PostService,
  ) {}

  ngOnInit() {
    this.errSub = this.postService.error.subscribe((errRes) => {
      this.isFetching = false;
      this.error = errRes;
    });
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.postService.createPost(postData);
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  onErrorHandle() {
    this.error = null;
  }

  ngOnDestroy() {
    this.errSub.unsubscribe();
  }

  private fetchPosts() {
    this.isFetching = true;
    this.postService.getAllPosts().subscribe(
      (data) => {
        this.isFetching = false;
        this.loadedPosts = data;
      },
      (error) => {
        this.isFetching = false;
        this.error = error.statusText;
        console.log(error);
      },
    );
  }
}
