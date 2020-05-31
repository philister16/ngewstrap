import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileImageComponent implements OnInit {
  @Input() src: string;
  @Input() alt = 'Profile image';
  @Input() userInitials = 'UA';
  @Input() className: string;

  constructor() { }

  ngOnInit(): void {
  }

}
