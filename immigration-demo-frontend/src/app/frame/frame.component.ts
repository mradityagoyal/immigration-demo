import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent {

  frameUrl: string = 'https://holthelaw.com'

  constructor(private sanitizer: DomSanitizer) {}

  getSafeUrl(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.frameUrl);
  }

}
