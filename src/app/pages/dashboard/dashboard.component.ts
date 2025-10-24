import { CommonModule, DatePipe, NgClass, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [NgClass, DatePipe, RouterLink, NgForOf, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  currentDate = new Date();
  userName = 'plongrotha';

  // Blog statistics
  blogStats = {
    totalBlogs: 12,
    publishedBlogs: 10,
    draftBlogs: 2,
    totalViews: 1547,
    totalComments: 89,
  };

  // Recent blogs (mock data - replace with actual service)
  recentBlogs = [
    {
      id: 1,
      title: 'Getting Started with Angular',
      status: 'Published',
      date: '2025-01-20',
      views: 245,
    },
    {
      id: 2,
      title: 'Understanding TypeScript',
      status: 'Published',
      date: '2025-01-18',
      views: 189,
    },
    {
      id: 3,
      title: 'CSS Grid Layout Guide',
      status: 'Draft',
      date: '2025-01-15',
      views: 0,
    },
    {
      id: 4,
      title: 'JavaScript Best Practices',
      status: 'Published',
      date: '2025-01-12',
      views: 312,
    },
  ];

  // Quick actions
  quickActions = [
    { name: 'Write New Blog', route: '/blog/create', icon: '✏️' },
    { name: 'View All Blogs', route: '/blog', icon: '📝' },
    { name: 'Edit Profile', route: '/profile', icon: '👤' },
    { name: 'Settings', route: '/settings', icon: '⚙️' },
  ];

  ngOnInit() {
    // You can load actual data from services here
  }
  getGreeting(): string {
    const hour = this.currentDate.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  }
}
