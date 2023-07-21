import { Component } from '@angular/core';
import { NebularChatMessage } from 'src/app/models/nebular-chat-message.model';


@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {

  title = "Some Title"
  isLoggedUser = false
  loggedUser = {displayName : "Hi", avatarURL : "/"}
  openaiKey: any
  botResponse: any
  maxMessagesWindow: any
  isChatEnabled: any
  termsAccepted: Boolean = false
  messages: NebularChatMessage[] = [];

  constructor(
  ) {
    console.log("constructed")
  }

  userSendMessage(event: { message: any; }) {
    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      user: {
        name: this.loggedUser.displayName,
        avatar: this.loggedUser.avatarURL,
      },
    });
    this.isChatEnabled = false
    this.getBotReply()
  }

  getBotReply() {
    console.log("click")
    this.botResponse = "hardcoded string"
    this.composeBotReply()

    // this.openaiService.postChatMessage(this.openaiKey, this.currentPrompt, this.loggedUser, this.messages.slice(this.maxMessagesWindow))
    //   .subscribe(
    //     data => {
    //       console.log("Success", data)
    //       this.botResponse = data
    //       this.composeBotReply()
    //     },
    //     error => {
    //       console.log("Success", error)
    //       this.botResponse = error
    //       this.composeBotReply()
    //     }
    //   )
  }

  composeBotReply() {
    this.messages.push(
      {
        text: `${this.botResponse}`,
        date: new Date(),
        reply: false,
        user: {
          name: "this.currentPrompt.title",
          avatar: "this.currentPrompt.avatarURL",
        },
      },
    );
    this.isChatEnabled = true
  }

}
