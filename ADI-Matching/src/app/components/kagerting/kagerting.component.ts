import { Component } from '@angular/core';
import { CardComponent } from '../home/card/card.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { ContentComponent } from '../content/content.component';
import { NewsComponent } from '../news/news.component';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-kagerting',
  templateUrl: './kagerting.component.html',
  styleUrls: ['./kagerting.component.scss']
})
export class KagertingComponent {
  latestNews:any = {};
  constructor(
    public dialog: MatDialog
  ) {

  }
  openContent() {
    const dialogRef = this.dialog.open(ContentComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openFilter() {
    const dialogRef = this.dialog.open(FilterComponent);
    dialogRef.afterClosed().subscribe((result2: any) => {
      console.log(`Dialog result2: ${result2} `);
    });

  }

  openNews() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '70vh';
    const dialogRef = this.dialog.open(NewsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((news_result: any) => {
      this.latestNews = news_result
      console.log(`Dialog news_result:`, news_result);

    });
  }



  imageObject = [{
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
    title: 'Hummingbirds are amazing creatures'
  }, {
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg'
  }, {
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
    title: 'Example with title.'
  }, {
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
    title: 'Hummingbirds are amazing creatures'
  }, {
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg'
  }, {
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
    title: 'Example two with title.'
  }];
}
