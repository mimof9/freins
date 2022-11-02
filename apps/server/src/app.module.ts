import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PtyModule } from './pty/pty.module';

@Module({
  imports: [PtyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
