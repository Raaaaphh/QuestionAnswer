DROP TABLE IF EXISTS `Favorite`;

DROP TABLE IF EXISTS `QuestionTag`;

DROP TABLE IF EXISTS `Tag`;

DROP TABLE IF EXISTS `Answer`;

DROP TABLE IF EXISTS `Question`;

DROP TABLE IF EXISTS `User`;

Create table `User` (
    `idUser` varchar(100) not null,
    `name` varchar(255) not null,
    `email` varchar(255) not null,
    `password` varchar(255) not null,
    `role` enum(
        'SuperAdmin',
        'Lecturer',
        'Student'
    ) default 'Student',
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

CREATE TABLE `Invitation` (
    `idInvitation` INT AUTO_INCREMENT PRIMARY KEY,
    `idSender` varchar(100) NOT NULL,
    `idRecipient` varchar(100) NOT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    FOREIGN KEY (`idSender`) REFERENCES `User` (`idUser`) ON DELETE CASCADE,
    FOREIGN KEY (`idRecipient`) REFERENCES `User` (`idUser`) ON DELETE CASCADE
);