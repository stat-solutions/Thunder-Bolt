import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MessagingService {
currentMessage = new BehaviorSubject(null);
constructor(private angularFireMessaging: AngularFireMessaging) {
this.angularFireMessaging.messages.subscribe(
// tslint:disable-next-line: variable-name
(_messaging: any): any => {
_messaging.onMessage = _messaging.onMessage.bind(_messaging);
_messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
}
);
}
requestPermission(): any {
this.angularFireMessaging.requestToken.subscribe(
(token) => {
console.log(token);
},
(err) => {
console.error('Unable to get permission to notify.', err);
}
);
}
receiveMessage(): any {
this.angularFireMessaging.messages.subscribe(
(payload) => {
console.log('new message received.', payload);
this.currentMessage.next(payload);
});
}
}
