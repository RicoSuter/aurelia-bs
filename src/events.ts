export class EventSubscription {
  callback: (data?: any) => void;
  eventChannel: IEventChannel;

  constructor(callback: (data?: any) => void, eventChannel: IEventChannel) {
    this.callback = callback;
    this.eventChannel = eventChannel;
  }

  publish(data?: any) {
    try {
      this.callback(data);
    } catch (e) {
      console.error('Error in EventSubscription callback:');
      console.error(e);
    }
  }

  unsubscribe() {
    this.eventChannel.unsubscribe(this);
  }
}

export interface IEventChannel {
  publish(data?: any): void;
  subscribe(callback: (data?: any) => void): void;
  unsubscribe(subscription: EventSubscription): void;
}

export class EventChannel<TData> implements IEventChannel {
  private subscriptions: EventSubscription[] = [];
  private eventName: string;

  logEvents = false;

  constructor(eventName: string) {
    this.eventName = eventName;
  }

  publish(data?: TData) {
    for (let subscription of this.subscriptions)
      subscription.publish(data);

    if (this.logEvents)
      console.log('An event on EventChannel \'' + this.eventName + '\' has been triggered for ' + this.subscriptions.length + ' subscribers.');
  }

  subscribe(callback: (data?: TData) => void) {
    let subscription = new EventSubscription(callback, this);
    this.subscriptions.push(subscription);
    return subscription;
  }

  unsubscribe(subscription: EventSubscription) {
    this.subscriptions = this.subscriptions.filter(s => s !== subscription);
  }
}

export class EventManager {
  private channels: { [eventName: string]: IEventChannel } = {};

  getChannel<TData>(eventName: string) {
    if (!this.channels.hasOwnProperty(eventName))
      this.channels[eventName] = new EventChannel<TData>(eventName);

    return <EventChannel<TData>>this.channels[eventName];
  }
}

export const eventManager = new EventManager();
