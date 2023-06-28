import { defineStore } from 'pinia';
import Socket from '@/utils/socket';

const path = `ws://${import.meta.env.BASE_URL}`;

interface WebSocketModel {
  message: string;
  exhibitWs: Socket | null;
}
export const useWebsocketStore = defineStore('websocket', {
  state: (): WebSocketModel => ({
    message: '',
    exhibitWs: null
  }),
  getters: {},
  actions: {
    initExhibitSocket() {
      const resp = new Socket(`${path}api/ws`, message => {
        this.message = JSON.parse(message);
      });
      this.exhibitWs = resp;
    }
  }
});

