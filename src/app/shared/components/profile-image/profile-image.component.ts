import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileImageComponent implements OnInit {
  @Input() size = '32px';
  @Input() src: string;
  @Input() alt = 'Profile image';
  @Input() borderRadius = '50%';
  @Input() fontSize = '16px';
  @Input() userInitials = 'UA';

  constructor() { }

  ngOnInit(): void {
  }

}
