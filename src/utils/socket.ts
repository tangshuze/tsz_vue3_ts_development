export default class Socket {
  constructor(url: string, cb: (data: any) => void) {
    this.url = url;
    this.cb = cb;
    this.connect();
  }
  private readonly url: string = '';
  private cb?: (data: any) => void;
  private ws?: WebSocket;
  private remainPayload: any[] = [];
  public connect() {
    return new Promise<void>(resolve => {
      const ws = new WebSocket(this.url);
      ws.onopen = e => {
        this.remainPayload.forEach(payload => {
          ws.send(payload);
        });
        resolve();
      };
      ws.onmessage = e => { if (this.cb) this.cb(e.data) };
      ws.onerror = e => console.error('ws error', e);
      this.ws = ws;
    });
  }
  public async send(payload: any) {
    if (!payload || !this.ws) {
      if (!this.ws) {
        this.remainPayload.push(JSON.stringify(payload));
      }
      return;
    }
    if (this.isConnected) {
      this.ws.send(JSON.stringify(payload));
    } else {
      await this.connect();
      this.ws.send(JSON.stringify(payload));
    }
  }

  private get isConnected() {
    return this.ws && this.ws.readyState === WebSocket.OPEN;
  }
  public close() {
    if (this.ws) {
      this.ws.close();
      this.ws = undefined;
    }
  }
}

