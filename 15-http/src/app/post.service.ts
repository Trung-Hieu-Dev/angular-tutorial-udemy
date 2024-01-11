import { Injectable } from '@angular/core';
import { PostModel } from './post.model';
import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createPost(postData) {
    // Send Http request
    this.http
      .post<PostModel>(
        'https://angular-65006-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
        postData,
        { observe: 'response' },
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          this.error.next(error.message);
        },
      );
  }

  getAllPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'new');
    return this.http
      .get<{ [key: string]: PostModel }>(
        'https://angular-65006-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
        {
          headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
          params: searchParams,
          responseType: 'json',
        },
      )
      .pipe(
        map((data) => {
          const posts: PostModel[] = [];
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              posts.push({ ...data[key], id: key });
            }
          }
          return posts;
        }),
        catchError((errorRes) => {
          return throwError(errorRes);
        }),
      );
  }

  deletePosts() {
    return this.http
      .delete(
        'https://angular-65006-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
        { observe: 'events' },
      )
      .pipe(
        tap((event) => {
          console.log(event);
          if (event.type === HttpEventType.Sent) {
            //...
          }
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        }),
      );
  }
}
