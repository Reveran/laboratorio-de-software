import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nabu-featured-carousel',
  templateUrl: './featured-carousel.component.html',
  styleUrls: ['./featured-carousel.component.scss'],
})
export class FeaturedCarouselComponent implements OnInit {
  slides = [
    {
      image: 'https://escotilha.com.br/wp-content/uploads/2021/06/mitos-de-cthulhu-horror-cosmico-literatura-h-p-lovecraft.jpeg',
      title: 'H.P. Lovecraft',
      description: 'Adentrate en un universo de terror inimaginable.',
    },
    {
      image: 'https://images3.alphacoders.com/854/854672.jpg',
      title: 'Destiny 2: Libros de Lore',
      description: 'Descubre los secretos tras la gran historia de Destiny 2',
    },
    {
      image: 'https://es.gamewallpapers.com/img_script/wallpaper_dir/img.php?src=wallpaper_the_witcher_3_wild_hunt_35_2560x1080.jpg&height=506&sharpen',
      title: 'Saga de Geralt de Rivia',
      description: 'Vive las aventuras de un brujo en un mundo de fantasia',
    },
  ];
  ngOnInit(): void {
    return;
  }
}
