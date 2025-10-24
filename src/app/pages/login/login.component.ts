import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogloginComponent } from '../../components/dialoglogin/dialoglogin.component';
import { LoginService } from '../../core/service/login.service';
import { Router } from '@angular/router';
import { ILogin } from '../../core/model/interface/login.model';

@Component({
  selector: 'app-login',
  imports: [FormsModule, DialogloginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @ViewChild('loginDialog') loginDialog!: DialogloginComponent;

  loginObj: ILogin = {
    username: '',
    password: '',
  };

  private loginService = inject(LoginService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  useLogin(): void {
    this.loginService.login(this.loginObj).subscribe({
      next: (res) => {
        console.log(res.message);
        if (res.success) {
          this.router.navigateByUrl('/home');
        } else {
          setTimeout(() => {
            this.loginDialog?.open(res.message || 'Invalid credentials.');
            this.cdr.detectChanges();
          }, 0);
        }
      },
      error: (err) => {
        const message = err?.error?.message || 'Invalid Crediental';
        this.loginDialog.open(message);
        console.error('login is failed.');
        setTimeout(() => {
          this.loginDialog?.open(message);
          this.cdr.detectChanges();
        }, 0);
      },
    });
  }
  logout() {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }
}
