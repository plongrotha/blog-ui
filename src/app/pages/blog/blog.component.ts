import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  inject,
  ViewChild,
} from '@angular/core';
import { BlogService } from '../../core/service/blog.service';
import { IBlog, IBlogRequest } from '../../core/model/interface/blog.model';
import { map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog',
  imports: [CommonModule, FormsModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent {
  // injecting service
  private blogService = inject(BlogService);
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('confirmDialog') confirmDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('updateDialog') updateDialog!: ElementRef<HTMLDialogElement>;

  scrollToButtonBtn: boolean = false;
  scrollToTopBtn: boolean = false;
  // declaring
  blogs: IBlog[] = [];
  selectBlogById: number = 0;
  blogObj: IBlogRequest = {
    title: '',
    content: '',
  };

  blogUpdate: IBlogRequest = {
    title: '',
    content: '',
  };

  constructor() {
    console.log('blog is started');
  }

  ngOnInit(): void {
    this.getAllBlogs();
  }

  getAllBlogs(): void {
    this.blogService
      .getAllBlogs()
      .pipe(map((res) => res.data))
      .subscribe({
        next: (res) => {
          this.blogs = res;
          localStorage.setItem('blogs', JSON.stringify(this.blogs));
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('API Error:', err);
        },
      });
  }

  resetForm(): void {
    this.blogObj = {
      title: '',
      content: '',
    };
  }

  createBlog() {
    const newBlog = {
      title: this.blogObj.title,
      content: this.blogObj.content,
    };
    this.blogService.addNewBlog(newBlog).subscribe({
      next: (res) => {
        console.log(res.message);
        this.blogObj.title = '';
        this.blogObj.content = '';
        this.getAllBlogs();
        this.cdr.detectChanges();
      },
      error: (err) => alert('Creating blog failed' + err),
    });
  }

  openDeleteDialog(id: number): void {
    this.selectBlogById = id;
    this.confirmDialog.nativeElement.showModal();
  }
  closeDeleteDialog(): void {
    this.confirmDialog.nativeElement.close();
  }

  deleteBlogById(): void {
    this.blogService.deleteBlog(this.selectBlogById).subscribe({
      next: (res) => {
        console.log(res.message);
        this.blogs = this.blogs.filter(
          (blog) => blog.blogId != this.selectBlogById
        );
        this.cdr.detectChanges();
        this.closeDeleteDialog();
      },
      error: (err) => {
        alert('Deleting blog failed' + err);
        this.closeDeleteDialog();
      },
    });
  }

  openUpdateDialog(blog: IBlog): void {
    this.selectBlogById = blog.blogId;
    console.log(this.selectBlogById);
    this.blogUpdate = {
      title: blog.title,
      content: blog.content,
    };
    console.log(this.blogUpdate);

    this.updateDialog.nativeElement.showModal();
  }
  closeUpdateDialog(): void {
    this.updateDialog.nativeElement.close();
  }

  updateBlog(): void {
    this.blogService
      .updateBlog(this.selectBlogById, this.blogUpdate)
      .subscribe({
        next: (res) => {
          console.log(res.message);
          const index = this.blogs.findIndex(
            (i) => i.blogId === this.selectBlogById
          );
          if (index !== -1) {
            this.blogs[index] = { ...this.blogs[index], ...this.blogUpdate };
          }
          this.getAllBlogs();
          this.updateDialog.nativeElement.close();
        },
        error: (err) => {
          alert('upating is failed' + err);
        },
      });
  }

  // scrolling function

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  scrollToBottom() {
    window.scrollTo(0, window.document.body.scrollHeight - window.innerHeight);
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.scrollToTopBtn = window.scrollY > 300;
    this.scrollToButtonBtn =
      window.document.body.scrollHeight - window.innerHeight - window.scrollY >
        350 && this.scrollToTopBtn;
  }
}
