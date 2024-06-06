import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vote } from './vote.model';
import { VotesController } from './controllers/votes.controller';
import { VotesService } from './services/votes.service';

@Module({
    imports: [SequelizeModule.forFeature([Vote])],
    providers: [VotesService],
    controllers: [VotesController],
    exports: [SequelizeModule],
})
export class VotesModule { }
