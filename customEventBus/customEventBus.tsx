import { EventEmitter } from "events";

interface CustomEventBus {
  on<T>(eventName: string, callback: (data: T) => void): void;
  dispatchEvent<T>(eventName: string, data?: T): void;
  remove(eventName: string, callback: (data: any) => void): void;
}

class CustomEventBusImpl implements CustomEventBus {
  private eventEmitter = new EventEmitter();

  on<T>(eventName: string, callback: (data: T) => void): void {
    this.eventEmitter.on(eventName, callback);
  }

  dispatchEvent<T>(eventName: string, data?: T): void {
    this.eventEmitter.emit(eventName, data);
  }

  remove(eventName: string, callback: (data: any) => void): void {
    this.eventEmitter.off(eventName, callback);
  }
}

const customEventBus: CustomEventBus = new CustomEventBusImpl();

export default customEventBus;
