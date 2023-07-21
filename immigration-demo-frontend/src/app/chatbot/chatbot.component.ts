import { Component } from '@angular/core';
import { NebularChatMessage } from 'src/app/models/nebular-chat-message.model';
import { ChatService } from '../services/chatbot.service';
import { EventService } from '../services/bot-event.service';
import { Subscription } from 'rxjs';
import { ChatMessage, MessageSender, MessageType } from '../models/chat-models';



@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {


  title = "Chatables.ai Bot"
  // TODO: Add avatar URL
  userAvatar = "assets/icons/usericon.png"
  botAvatar =  "assets/icons/bot.png"
  maxMessagesWindow: any
  isChatEnabled: any
  termsAccepted: Boolean = false
  messages: NebularChatMessage[] = [];
  needNewBotMsg = true;

  private socketSubscription: Subscription | undefined;


  constructor(private chatService: ChatService, private eventService: EventService) { }

  ngOnInit() {
    // default chatbot welcome message
    this.socketSubscription = this.chatService.getMessages().subscribe((receivedMsg: ChatMessage) => {
        // console.log(`Message Received in component.ts: ${receivedMsg}`)
        // console.log(`receviedMsg.type: ${receivedMsg.type}`)
        if (receivedMsg.type === MessageType.STREAM_MSG) {
          if(this.needNewBotMsg){
            this.createBotReply("")
          }
            this.updateBotReply(receivedMsg.message)
        } else if (receivedMsg.type == MessageType.STREAM_END) {
            this.isChatEnabled = true
          this.needNewBotMsg = true;
        }
        else if (receivedMsg.type == MessageType.COMMAND) {
            //TODO: change format of this command message. 
            // console.log(`emiting event: ${receivedMsg}`)
            this.eventService.emitEvent(receivedMsg.message)
        }
        else if (receivedMsg.type == MessageType.QUICK_ACTION) {
          console.log("not implemented yet")
            // this.updateQuickActions(receivedMsg.message)
        }
    });
}

  userSendMessage(event: { message: any; }) {
    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      user: {
        name: "You",
        avatar: this.userAvatar,
      },
    });
    this.isChatEnabled = false
    this.chatService.sendMessage(event.message);
  }



  createBotReply(botMsg: string) {
    this.messages.push(
      {
        text: botMsg,
        date: new Date(),
        reply: false,
        user: {
          name: "Chatables.ai",
          avatar: "botAvatar",
        },
      },
    );
    this.needNewBotMsg = false;
  }

  updateBotReply(botMsg: string) {
    this.messages[this.messages.length -1].text += botMsg
  }

}
