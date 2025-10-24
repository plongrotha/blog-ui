import { Component } from '@angular/core';
import { profileInfo } from '../../core/model/class/myProfile';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [NgForOf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  info = profileInfo;
}
