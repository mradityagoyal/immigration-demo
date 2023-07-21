import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { NbThemeModule, NbLayoutModule, NbMenuModule, NbCardModule, NbSidebarModule, NbTabsetModule, NbChatModule, NbButtonModule, NbToggleModule, NbInputModule, NbActionsModule, NbBadgeModule, NbListModule, NbAccordionModule, NbStepperModule, NbUserModule } from '@nebular/theme';
import { FrameComponent } from './frame/frame.component';


@NgModule({
  declarations: [
    AppComponent,
    ChatbotComponent,
    FrameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbChatModule.forRoot(),
    NbLayoutModule,
    NbEvaIconsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
