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
import {ActivatedRoute, RouterLink} from "@angular/router";

@Component({
  selector: 'app-single-face-snap',
  standalone: true,
  imports: [
    NgStyle,
    NgClass,
    UpperCasePipe,
    TitleCasePipe,
    LowerCasePipe,
    DatePipe,
    RouterLink,
  ],
  templateUrl: './single-face-snap.component.html',
  styleUrl: './single-face-snap.component.scss',
})
export class SingleFaceSnapComponent implements OnInit {

  faceSnap!: FaceSnap;
  snapButtonText!: string;
  userHasSnapped!: boolean;

  constructor(private faceSnapsService: FaceSnapsService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.prepareInterface();
    this.getFaceSnap();
  }

  private prepareInterface() {
    this.snapButtonText = 'Oh Snap!';
    this.userHasSnapped = false;
  }

  private getFaceSnap() {
    const faceSnapId = this.route.snapshot.params['id'];
    this.faceSnap = this.faceSnapsService.getFaceSnapById(faceSnapId);
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

  onViewFaceSnap() {

  }
}
