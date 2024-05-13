import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { User } from './users/user.model';
import { UsersModule } from './users/users.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { FavoritesModule } from './favorites/favorites.module';
import { Question } from './questions/question.model';
import { Answer } from './answers/answer.model';
import { Favorite } from './favorites/favorite.model';
import { QuestiontagsModule } from './questiontags/questiontags.module';
import { InvitationsModule } from './invitations/invitations.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),
    AuthModule,
  SequelizeModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      dialect: 'mysql',
      host: configService.get('DB_HOST'),
      port: +configService.get('DB_PORT'),
      username: configService.get('DB_USER'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      models: [User, Question, Answer, Favorite],
    }),
    inject: [ConfigService],
  }),
    UsersModule,
    QuestionsModule,
    AnswersModule,
    FavoritesModule,
    QuestiontagsModule,
    InvitationsModule,
  ],
  providers: [AppService],
})
export class AppModule { }
