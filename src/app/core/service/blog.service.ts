import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../model/interface/response.model';
import { IBlog, IBlogRequest } from '../model/interface/blog.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl = 'https://blog-api-production-09b1.up.railway.app/api/blogs';
  private http = inject(HttpClient);

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'content-type': 'application/json',
    });
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getAllBlogs(): Observable<ApiResponse<IBlog[]>> {
    return this.http.get<ApiResponse<IBlog[]>>(this.apiUrl, {
      headers: this.getHeaders(),
    });
  }

  addNewBlog(res: IBlogRequest): Observable<ApiResponse<IBlog>> {
    return this.http.post<ApiResponse<IBlog>>(this.apiUrl, res);
  }

  deleteBlog(blogId: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(this.apiUrl + '/' + blogId);
  }

  updateBlog(
    blogId: number,
    update: IBlogRequest
  ): Observable<ApiResponse<IBlog>> {
    return this.http.put<ApiResponse<IBlog>>(
      `${this.apiUrl}/${blogId}`,
      update
    );
  }
}
