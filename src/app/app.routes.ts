import { Routes } from '@angular/router';
import { FaceSnapListComponent } from './components/face-snap-list/face-snap-list.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import {
  SingleFaceSnapComponent
} from "./components/single-face-snap/single-face-snap.component";
import {ObservableComponent} from "./observable/observable.component";

export const routes: Routes = [
    { path: 'facesnaps/:id', component: SingleFaceSnapComponent },
    { path: 'facesnaps', component: FaceSnapListComponent },
    { path: 'observable', component: ObservableComponent },
    { path: '', component: LandingPageComponent }
  ];
