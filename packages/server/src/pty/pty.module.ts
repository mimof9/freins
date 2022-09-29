import { Module } from '@nestjs/common';
import { PtyGateway } from './pty.gateway';

@Module({
  providers: [PtyGateway],
})
export class PtyModule {}
