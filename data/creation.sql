drop if exists Favorite;

drop if exists QuestionTag;

drop if exists Tag;

drop if exists Answer;

drop if exists Question;

drop if exists User;

Create table `User` (
    `idUser` varchar(100) not null,
    `name` varchar(255) not null,
    `email` varchar(255) not null,
    `password` varchar(255) not null,
    `lecturer` boolean default false,
    `createdAt` datetime not null,
    `updatedAt` datetime not null,
    primary key (`idUser`)
);

Create table `Question` (
    `idQuest` varchar(100) not null,
    `idUser` varchar(100) not null,
    `content` text not null,
    `votes` int default 0,
    `flagsSpam` int default 0,
    `flagsOffensive` int default 0,
    `status` enum('Solved', 'Unsolved') default 'Unsolved',
    `createdAt` datetime not null,
    `updatedAt` datetime not null,
    primary key (`idQuest`),
    foreign key (`idUser`) references `User` (`idUser`) ON DELETE CASCADE
);

Create table `Answer` (
    `idAnsw` varchar(100) not null,
    `idQuest` varchar(100) not null,
    `idUser` varchar(100) not null,
    `content` text not null,
    `final` boolean default false,
    `createdAt` datetime not null,
    `updatedAt` datetime not null,
    primary key (`idAnsw`),
    foreign key (`idQuest`) references `Question` (`idQuest`) ON DELETE CASCADE,
    foreign key (`idUser`) references `User` (`idUser`) ON DELETE CASCADE
);

Create table `Tag` (
    `idTag` varchar(100) not null,
    `idUser` varchar(100) not null,
    `name` varchar(255) not null,
    `description` text not null,
    `occurrence` int default 0,
    `createdAt` datetime not null,
    `updatedAt` datetime not null,
    primary key (`idTag`),
    foreign key (`idUser`) references `User` (`idUser`) ON DELETE CASCADE
);

Create table `QuestionTag` (
    `idQuest` varchar(100) not null,
    `idTag` varchar(100) not null,
    primary key (`idQuest`, `idTag`),
    foreign key (`idQuest`) references `Question` (`idQuest`) ON DELETE CASCADE,
    foreign key (`idTag`) references `Tag` (`idTag`) ON DELETE CASCADE
);

Create table `Favorite` (
    `idUser` varchar(100) not null,
    `idQuest` varchar(100) not null,
    primary key (`idUser`, `idQuest`),
    foreign key (`idUser`) references `User` (`idUser`) ON DELETE CASCADE,
    foreign key (`idQuest`) references `Question` (`idQuest`) ON DELETE CASCADE
);