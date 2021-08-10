// let dialogs = [
//     { id: 1, name: "Dima" },
//     { id: 2, name: "Dima2" },
//     { id: 3, name: "Dima3" },
//     { id: 4, name: "Dima4" },
//     { id: 5, name: "Dima5" },
//   ];
  
//   let messages = [
//     { id: 1, message: "Привет" },
//     { id: 2, message: "Hi" },
//     { id: 3, message: "How are you" },
//     { id: 4, message: "Yo" },
//     { id: 5, message: "Lalka" },
//   ];
  
//   let posts = [
//     { id: 1, message: "Hi, my 1 post", likesCount: "2" },
//     { id: 2, message: "Lalka, my 1 post", likesCount: "4" },
//   ];

  let state = {
      profilePage: {
      posts: [
        { id: 1, message: "Hi, my 1 post", likesCount: "2" },
        { id: 2, message: "Lalka, my 1 post", likesCount: "4" },
      ],
      },
      dialogsPage: {
              messages: [
        { id: 1, message: "Привет" },
        { id: 2, message: "Hi" },
        { id: 3, message: "How are you" },
        { id: 4, message: "Yo" },
        { id: 5, message: "Lalka" },
      ],
      dialogs: [
        { id: 1, name: "Dima" },
        { id: 2, name: "Dima2" },
        { id: 3, name: "Dima3" },
        { id: 4, name: "Dima4" },
        { id: 5, name: "Dima5" },
      ]
      },
      sidebar: {}
  }

  export default state;