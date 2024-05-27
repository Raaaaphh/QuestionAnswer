import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vote } from './vote.model';

@Module({
    imports: [SequelizeModule.forFeature([Vote])],
    exports: [SequelizeModule],
})
export class VotesModule { }
