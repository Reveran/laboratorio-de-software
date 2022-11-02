import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nabu-book-preview',
  templateUrl: './book-preview.component.html',
  styleUrls: ['./book-preview.component.scss'],
})
export class BookPreviewComponent implements OnInit {
  @Input() image = '';
  @Input() name = 'test';

  ngOnInit(): void {
    return;
  }
}
