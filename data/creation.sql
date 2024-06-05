DROP TABLE IF EXISTS `Favorites`;

DROP TABLE IF EXISTS `Votes`;

DROP TABLE IF EXISTS `Invitations`;

DROP TABLE IF EXISTS `Pictures`;

DROP TABLE IF EXISTS `QuestionTags`;

DROP TABLE IF EXISTS `Tags`;

DROP TABLE IF EXISTS `Answers`;

DROP TABLE IF EXISTS `Questions`;

DROP TABLE IF EXISTS `Users`;

Create table `Users` (
    `idUser` varchar(100) not null,
    `name` varchar(255) not null,
    `email` varchar(255) not null,
    `password` varchar(255) not null,
    `confirmed` boolean default false,
    `emailToken` varchar(255),
    `role` enum(
        'SuperAdmin',
        'Lecturer',
        'Student'
    ) default 'Student',
    `color` varchar(100) not NULL,
    `banned` boolean default false,
    `createdAt` datetime not null,
    `updatedAt` datetime not null,
    primary key (`idUser`),
    UNIQUE (`email`)
);

Create table `Questions` (
    `idQuest` varchar(100) not null,
    `idUser` varchar(100) not null,
    `title` varchar(100) not null,
    `description` text not null,
    `context` text not null,
    `votes` int default 0,
    `flagsSpam` int default 0,
    `flagsInappropriate` int default 0,
    `status` enum('Solved', 'Unsolved') default 'Unsolved',
    `createdAt` datetime not null,
    `updatedAt` datetime not null,
    primary key (`idQuest`),
    foreign key (`idUser`) references `User` (`idUser`) ON DELETE CASCADE
);

Create table `Answers` (
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

Create table `Tags` (
    `idTag` varchar(100) not null,
    `idUser` varchar(100) not null,
    `name` varchar(20) not null,
    `description` text not null,
    `occurrence` int default 0,
    `createdAt` datetime not null,
    `updatedAt` datetime not null,
    primary key (`idTag`),
    foreign key (`idUser`) references `User` (`idUser`) ON DELETE CASCADE
);

Create table `QuestionTags` (
    `idQuest` varchar(100) not null,
    `idTag` varchar(100) not null,
    `createdAt` datetime not null,
    `updatedAt` datetime not null,
    primary key (`idQuest`, `idTag`),
    foreign key (`idQuest`) references `Question` (`idQuest`) ON DELETE CASCADE,
    foreign key (`idTag`) references `Tag` (`idTag`) ON DELETE CASCADE
);

Create table `Favorites` (
    `idUser` varchar(100) not null,
    `idQuest` varchar(100) not null,
    `notified` boolean default false,
    `createdAt` datetime not null,
    `updatedAt` datetime not null,
    primary key (`idUser`, `idQuest`),
    foreign key (`idUser`) references `User` (`idUser`) ON DELETE CASCADE,
    foreign key (`idQuest`) references `Question` (`idQuest`) ON DELETE CASCADE
);

CREATE TABLE `Invitations` (
    `idInvitation` INT AUTO_INCREMENT PRIMARY KEY,
    `email` varchar(255) NOT NULL,
    `role` enum(
        'SuperAdmin',
        'Lecturer',
        'Student'
    ) default 'Student',
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL
);

CREATE TABLE `Pictures` (
    `idPicture` varchar(100) NOT NULL,
    `idQuest` varchar(100) NULL,
    `idAnsw` varchar(100) NULL,
    `imageUrl` varchar(255) NOT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    PRIMARY KEY (`idPicture`),
    FOREIGN KEY (`idQuest`) REFERENCES `Questions` (`idQuest`) ON DELETE CASCADE,
    FOREIGN KEY (`idAnsw`) REFERENCES `Answers` (`idAnsw`) ON DELETE CASCADE
);

CREATE TABLE `Votes` (
    `idVote` varchar(100) PRIMARY KEY,
    `idUser` varchar(100) NOT NULL,
    `idQuest` varchar(100) NOT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    FOREIGN KEY (`idUser`) REFERENCES `Users` (`idUser`) ON DELETE CASCADE,
    FOREIGN KEY (`idQuest`) REFERENCES `Questions` (`idQuest`) ON DELETE CASCADE,
    UNIQUE (`idUser`, `idQuest`)
);