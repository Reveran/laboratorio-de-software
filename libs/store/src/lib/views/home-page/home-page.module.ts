import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbCarouselModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { HomePageRoutingModule } from './home-page-routing.module';
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { HomePageComponent } from './home-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RangeSelectorComponent } from './components/range-selector/range-selector.component';
import { FeaturedCarouselComponent } from './components/featured-carousel/featured-carousel.component';
import { BookPreviewComponent } from './components/book-preview/book-preview.component';
import { ProfilePictureModule } from '../../components/profile-picture/profile-picture.module';

@NgModule({
	declarations: [HomePageComponent, SidePanelComponent, NavBarComponent, RangeSelectorComponent, FeaturedCarouselComponent, BookPreviewComponent],
	imports: [CommonModule, HomePageRoutingModule, FormsModule, FontAwesomeModule, NgbCarouselModule, NgbDropdownModule, ProfilePictureModule],
})
export class HomePageModule {}
