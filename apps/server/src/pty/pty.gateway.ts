import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import * as pty from 'node-pty';
import { IS_WIN, SHELL } from './constants';
import * as lodash from 'lodash';
import { WebSocket } from 'ws';

interface SessionInfo {
  tty: pty.IPty;
}
type ClientMap = Map<WebSocket, SessionInfo>;

function bufferedSend(socket: WebSocket, timeout: number) {
  let str = '';

  function buffer(data) {
    str += data;
  }

  function flush() {
    socket.send(str);
    str = '';
  }
  const throttledFlush = lodash.throttle(flush, timeout, {
    leading: true,
    trailing: true,
  });

  return (data: string) => {
    buffer(data);
    throttledFlush();
  };
}

@WebSocketGateway({
  cors: { origin: '*' },
})
export class PtyGateway implements OnGatewayConnection {
  clientMap: ClientMap;

  constructor() {
    this.clientMap = new Map();
  }

  handleConnection(socket: WebSocket, ...args: any[]) {
    socket.addEventListener('close', (event) => {
      this.clientMap.delete(socket);
    });

    socket.addEventListener('error', (event) => {
      this.clientMap.delete(socket);
    });

    socket.addEventListener('message', (event) => {
      tty.write(event.data as string);
    });

    const tty = pty.spawn(SHELL, [], {
      name: 'xterm-256color',
      cols: 80,
      rows: 30,
      cwd: process.env.HOME,
      env: process.env,
    });
    this.clientMap.set(socket, {
      tty,
    });

    // to do flow control: https://xtermjs.org/docs/guides/flowcontrol/
    const send = bufferedSend(socket, 10);
    tty.onData(function (data) {
      try {
        send(data);
      } catch (ex) {
        // The WebSocket is not open, ignore
      }
    });

    console.log(`当前服务有${this.clientMap.size}个连接`);
  }

  @SubscribeMessage('test')
  handleEvent(@MessageBody() data: string): string {
    return data + '\r\n';
  }
}
