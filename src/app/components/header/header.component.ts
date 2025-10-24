import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../core/service/login.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [NgIf, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isMobileMenuOpen = false;
  isDropdownOpen = false;
  isUserDropdownOpen = false;
  currentUser: string | null = 'plongrotha';

  private loginService = inject(LoginService);
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentUser = 'plongrotha';
  }

  signLout(): void {
    this.loginService.logout();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      this.isDropdownOpen = false;
      this.isUserDropdownOpen = false;
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    // Close other dropdowns
    this.isUserDropdownOpen = false;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  toggleUserDropdown(): void {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
    // Close other dropdowns
    this.isDropdownOpen = false;
  }

  closeUserDropdown(): void {
    this.isUserDropdownOpen = false;
  }

  signOut(): void {
    // Implement your sign-out logic here
    this.currentUser = null;
    this.router.navigate(['/login']);
    console.log('User signed out');
  }

  // Close dropdowns when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;

    // Check if click is outside dropdown areas
    if (!target.closest('.relative')) {
      this.isDropdownOpen = false;
      this.isUserDropdownOpen = false;
    }

    // Close mobile menu if clicking outside navbar
    if (!target.closest('nav')) {
      this.isMobileMenuOpen = false;
    }
  }

  // Close mobile menu on window resize to desktop size
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    const target = event.target as Window;
    if (target.innerWidth >= 768) {
      // md breakpoint
      this.isMobileMenuOpen = false;
    }
  }

  // Close dropdowns on route change
  @HostListener('window:popstate', ['$event'])
  onPopState(): void {
    this.isDropdownOpen = false;
    this.isUserDropdownOpen = false;
    this.isMobileMenuOpen = false;
  }
}
