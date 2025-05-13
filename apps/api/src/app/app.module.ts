import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CandidatesController } from './candidates/candidates.controller';
import { CandidatesService } from './candidates/candidates.service';

@Module({
  imports: [],
  controllers: [AppController, CandidatesController],
  providers: [AppService, CandidatesService],
})
export class AppModule {}
