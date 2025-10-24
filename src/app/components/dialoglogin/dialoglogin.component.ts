import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dialoglogin',
  imports: [CommonModule],
  templateUrl: './dialoglogin.component.html',
  styleUrl: './dialoglogin.component.css',
})
export class DialogloginComponent {
  @Input() message: string = 'Invalid username or password.';
  showDialog: boolean = false;

  open(message?: string) {
    if (message) this.message = message;
    this.showDialog = true;
  }

  close() {
    this.showDialog = false;
  }
}
