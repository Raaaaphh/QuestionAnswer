// Mock data for User model

enum Role {
    SuperAdmin = 'SuperAdmin',
    Lecturer = 'Lecturer',
    Student = 'Student',
  }


export const mockUsers = [
    {
      idUser: '1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      confirmed: true,
      emailToken: 'token123',
      role: Role.Student,
      color: '#FFA500',
      banned: false,
    },
    {
      idUser: '2',
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      password: 'pass321word',
      confirmed: true,
      emailToken: 'token456',
      role: Role.Lecturer,
      color: '#00FF00',
      banned: false,
    },
    

];
  
  // Mock data for Question model
export const mockQuestions = [
    {
      idQuest: '1',
      idUser: '1', // John Doe's question
      title: 'How to use Sequelize with TypeScript?',
      description: 'I need help integrating Sequelize with TypeScript in my project.',
      context: 'Node.js project',
      votes: 10,
      flagsSpam: 0,
      flagsInappropiate: 0,
      status: true,
    },
    {
      idQuest: '2',
      idUser: '2', // Jane Smith's question
      title: 'Best practices for REST API design',
      description: 'Looking for tips on designing RESTful APIs for scalability and maintainability.',
      context: 'Web development',
      votes: 15,
      flagsSpam: 2,
      flagsInappropiate: 0,
      status: true,
    },
  ];
  
  // Mock data for Answer model
export const mockAnswers = [
    {
      idAnsw: '1',
      idUser: '2', // Jane Smith's answer
      idQuest: '1', // John Doe's question
      content: 'You can follow the official Sequelize documentation for TypeScript integration.',
      votes: 5,
      isAccepted: true,
    },
    {
      idAnsw: '2',
      idUser: '1', // John Doe's answer
      idQuest: '2', // Jane Smith's question
      content: 'Consider using OpenAPI specifications for designing your REST APIs.',
      votes: 8,
      isAccepted: false,
    },
  ];
  
  // Mock data for Favorite model
export const mockFavorites = [
    {
      idUser: '1', // John Doe's favorite
      idQuest: '2', // Jane Smith's question
    },
    {
      idUser: '2', // Jane Smith's favorite
      idQuest: '1', // John Doe's question
    },
  ];
  
  // Mock data for Tag model
export const mockTags = [
    {
      idTag: '1',
      idUser: '1', // John Doe's tag
      name: 'Node.js',
      description: 'Topics related to Node.js development',
      occurrence: 20,
    },
    {
      idTag: '2',
      idUser: '2', // Jane Smith's tag
      name: 'RESTful APIs',
      description: 'Designing scalable and maintainable RESTful APIs',
      occurrence: 15,
    },
  ];
  
  // Mock data for Picture model
export const mockPictures = [
    {
      idPicture: '1',
      idQuest: '1', // John Doe's question
      url: 'https://example.com/image1.jpg',
    },
    {
      idPicture: '2',
      idQuest: '2', // Jane Smith's question
      url: 'https://example.com/image2.jpg',
    },
  ];
  
  // Mock data for Invitation model
export const mockInvitations = [
    {
      idInvitation: '1',
      email: 'newuser@example.com',
      role: Role.Student,
    },
    {
      idInvitation: '2',
      email: 'guest@example.com',
      role: Role.Lecturer,
    },
  ];
  