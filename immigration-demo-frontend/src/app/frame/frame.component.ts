import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { EventService } from '../services/bot-event.service';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent {

  frameUrl: string = 'https://holthelaw.com'

  constructor(private sanitizer: DomSanitizer, private eventService: EventService) {}

  getSafeUrl(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.frameUrl);
  }

  ngOnInit(): void {
    this.eventService.event$.subscribe((url: string) => {
      console.log(`command received: ${url}`)
      this.frameUrl = url;
    });
  }

}
