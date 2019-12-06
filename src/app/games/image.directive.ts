import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Directive({
  selector: '[appImage]'
})
export class ImageDirective implements AfterViewInit {

  @Input() src;
 // @Input() background;

  constructor(private imageRef: ElementRef, private http: HttpClient) {
  }

  ngAfterViewInit(): void {
    const img = new Image();
    img.onload = () => {

      try {
        this.setImage(this.src);
      } catch (error) {
       /* console.log(this.background);

        this.setImage(this.background);*/
      }
    };

    img.onerror = () => {
      // console.log('prevent');
      // Set a placeholder image
      this.setImage('assets/404.svg');
    };

    if (!this.src) {
      this.setImage('assets/404.svg');
    } else {
      img.src = this.src;
    }
  }

  private setImage(src: string) {
    //  console.log(src);

     try {
      this.imageRef.nativeElement.setAttribute('src', src);
    } catch (error) {
      /// this.imageRef.nativeElement.setAttribute('src', this.background);
    }

  }
}
