import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

declare var jQuery: any;

@Component({
  selector: 'travel-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

 albums: any[];

  constructor() {

      /// get the list of albums
      this.albums = [
         { defaultPic: "/assets/images/006.jpg" },
         { defaultPic: "/assets/images/002.jpg" },
         { defaultPic: "/assets/images/003.jpg" },
         { defaultPic: "/assets/images/004.jpg" },
         { defaultPic: "/assets/images/005.jpg" },
         { defaultPic: "/assets/images/001.jpg" }
      ];
   }

   ngOnInit() {
    
        /// carousel...
         jQuery('.homeCarousel').slick({
            dots: true,
            fade: true,
            autoplay: true,
            autoplaySpeed: 2000
        });
    }

}
