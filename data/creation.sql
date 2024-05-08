drop if exists Favorite;
drop if exists QuestionTag;
drop if exists Tag;
drop if exists Answer;
drop if exists Question;
drop if exists Lecturer;
drop if exists Student;

Create table `Student` (
    `idStu` varchar(255) not null,
    `name` varchar(255) not null,
    `email` varchar(255) not null,
    `password` varchar(255) not null,
    `createdAt` datetime not null,
    `updatedAt` datetime not null,
    primary key (`idStu`)
);

Create table `Lecturer` (
    `idLect` varchar(255) not null,
    `name` varchar(255) not null,
    `email` varchar(255) not null,
    `password` varchar(255) not null,
    `createdAt` datetime not null,
    `updatedAt` datetime not null,
    primary key (`idLect`)
);

Create table `Question` (
    `idQuest` varchar(255) not null,
    `idStu` varchar(255) not null,
    `content` text not null,
    `votes` int default 0,
    `flagsSpam` int default 0,
    `flagsOffensive` int default 0,
    `status` enum('Solved', 'Unsolved') default 'Unsolved',
    `createdAt` datetime not null,
    `updatedAt` datetime not null,
    primary key (`idQuest`)
    foreign key (`idStu`) references `Student`(`idStu`) ON DELETE CASCADE,
);

Create table `Answer`(
    `idAnsw` varchar(255) not null,
    `idQuest` varchar(255) not null,
    `idLect` varchar(255) not null,
    `content` text not null,
    `final` boolean default false,
    `createdAt` datetime not null,
    `updatedAt` datetime not null,
    primary key (`idAns`)
    foreign key (`idQuest`) references `Question`(`idQuest`) ON DELETE CASCADE,
    foreign key (`idLect`) references `Lecturer`(`idLect`) ON DELETE CASCADE,
);

Create table `Tag` (
    `idTag` varchar(255) not null,
    `idLect` varchar(255) not null,
    `name` varchar(255) not null,
    `description` text not null,
    `createdAt` datetime not null,
    `updatedAt` datetime not null,
    primary key (`idTag`)
    foreign key (`idLect`) references `Lecturer`(`idLect`) ON DELETE CASCADE,
);

Create table `QuestionTag` (
    `idQuest` varchar(255) not null,
    `idTag` varchar(255) not null,
    primary key (`idQuest`, `idTag`)
    foreign key (`idQuest`) references `Question`(`idQuest`) ON DELETE CASCADE,
    foreign key (`idTag`) references `Tag`(`idTag`) ON DELETE CASCADE,
);

Create table `Favorite` (
    `idStu` varchar(255) not null,
    `idQuest` varchar(255) not null,
    primary key (`idStu`, `idQuest`)
    foreign key (`idStu`) references `Student`(`idStu`) ON DELETE CASCADE,
    foreign key (`idQuest`) references `Question`(`idQuest`) ON DELETE CASCADE,
);
