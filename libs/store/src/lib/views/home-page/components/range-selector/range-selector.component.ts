import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nabu-range-selector',
  templateUrl: './range-selector.component.html',
  styleUrls: ['./range-selector.component.scss'],
})
export class RangeSelectorComponent implements OnInit {
  @Input() minGap = 10;
  @Input() sliderMaxValue = 100;
  @Input() sliderMinValue = 0;
  @Input() step = 10;
  @Input() isMoney = false;
  sliderOneValue = 0;
  sliderTwoValue = 100;
  trackStyle = '';

  ngOnInit(): void {
    this.sliderOneValue = this.sliderMinValue;
    this.sliderTwoValue = this.sliderMaxValue;
    this.fillColor();
  }

  public slideOne() {
    if (this.sliderTwoValue - this.sliderOneValue <= this.minGap) {
      this.sliderOneValue = this.sliderTwoValue - this.minGap;
    }
  }
  public slideTwo() {
    if (this.sliderTwoValue - this.sliderOneValue <= this.minGap) {
      this.sliderTwoValue = this.sliderOneValue + this.minGap;
    }
  }
  fillColor() {
    const percent1 =
      (100 / (this.sliderMaxValue - this.sliderMinValue)) *
      (this.sliderOneValue - this.sliderMinValue);
    const percent2 =
      (100 / (this.sliderMaxValue - this.sliderMinValue)) *
      (this.sliderTwoValue - this.sliderMinValue);
    this.trackStyle = `linear-gradient(to right, #d5d5d5 ${percent1}% , #241D4E ${percent1}% , #241D4E ${percent2}%, #d5d5d5 ${percent2}%)`;
  }
}
