import { Component, Input, OnInit } from '@angular/core';
import { FaceSnap } from '../../models/face-snap';
import {
  NgStyle,
  NgClass,
  UpperCasePipe,
  TitleCasePipe,
  LowerCasePipe,
  DatePipe,
} from '@angular/common';
import { FaceSnapsService } from '../../services/face-snaps.service';

@Component({
  selector: 'app-face-snap',
  standalone: true,
  imports: [
    NgStyle,
    NgClass,
    UpperCasePipe,
    TitleCasePipe,
    LowerCasePipe,
    DatePipe,
  ],
  templateUrl: './face-snap.component.html',
  styleUrl: './face-snap.component.scss',
})
export class FaceSnapComponent implements OnInit {
  @Input() faceSnap!: FaceSnap;

  snapButtonText!: string;
  userHasSnapped!: boolean;

  constructor(private faceSnapsService: FaceSnapsService) {}

  ngOnInit(): void {
    this.snapButtonText = 'Oh Snap';
    this.userHasSnapped = false;
  }

  onSnap(): void {
    if (this.userHasSnapped) {
      this.snap();
    } else {
      this.unSnap();
    }

    this.userHasSnapped = !this.userHasSnapped;
  }

  unSnap(): void {
    this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'unsnap');
    this.snapButtonText = 'Oh, Snap';
    this.userHasSnapped = false;
  }

  snap() {
    this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'snap');
    this.snapButtonText = 'Oops, unSnap!';
    this.userHasSnapped = true;
  }
}
