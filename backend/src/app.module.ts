import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { User } from './modules/users/user.model';
import { UsersModule } from './modules/users/users.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { AnswersModule } from './modules/answers/answers.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { Question } from './modules/questions/question.model';
import { Answer } from './modules/answers/answer.model';
import { Favorite } from './modules/favorites/favorite.model';
import { QuestiontagsModule } from './modules/questiontags/questiontags.module';
import { InvitationsModule } from './modules/invitations/invitations.module';
import { TagsModule } from './modules/tags/tags.module';
import { Tag } from './modules/tags/tag.model';
import { QuestionTag } from './modules/questiontags/questiontag.model';
import { Picture } from './modules/pictures/picture.model';
import { PicturesModule } from './modules/pictures/pictures.module';
import { JwtMiddleware } from './middlewares/jwt.middleware';
import { Invitation } from './modules/invitations/invitation.model';
import { VotesModule } from './modules/votes/votes.module';
import { Vote } from './modules/votes/vote.model';
import { FlagsModule } from './modules/flags/flags.module';
import { Flag } from './modules/flags/flag.model';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '../.env',
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
      models: [User, Question, Answer, Favorite, Tag, QuestionTag, Picture, Invitation, Vote, Flag],
      //autoLoadModels: true,
      //synchronize: true,
    }),
    inject: [ConfigService],
  }),
    UsersModule,
    QuestionsModule,
    AnswersModule,
    FavoritesModule,
    QuestiontagsModule,
    InvitationsModule,
    TagsModule,
    QuestionsModule,
    PicturesModule,
    VotesModule,
    FlagsModule,
  ],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        { path: 'auth/register', method: RequestMethod.POST },
        { path: 'auth/login', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
