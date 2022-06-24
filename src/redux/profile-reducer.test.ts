import profileReducer, { actions } from "./profile-reducer";

let state = {
  posts: [{
      id: 1,
      message: "Hi, my 1 post",
      likesCount: 2
    },
    {
      id: 2,
      message: "Lalka, my 1 post",
      likesCount: 4
    },
  ],
  profile: null,
  status: "",
};

test('length of post should be incremented', () => {
  //1. test data
  let action = actions.addPostActionCreator("it-kam.com");

  //2. action
  let newState = profileReducer(state, action);
  //3. expectation
  expect(newState.posts.length).toBe(3);
});

test('message of new post should be it-kam.com', () => {
  //1. test data
  let action = actions.addPostActionCreator("it-kam.com");

  //2. action
  let newState = profileReducer(state, action);
  //3. expectation
  expect(newState.posts[2].message).toBe("it-kam.com");
});

test('after deleting length of post should be decrement', () => {
  //1. test data
  let action = actions.deletePost(1);

  //2. action
  let newState = profileReducer(state, action);
  //3. expectation
  expect(newState.posts.length).toBe(2);
});

test('after deleting length of should`t be decrement if id is incorrect', () => {
  //1. test data
  let action = actions.deletePost(1000);

  //2. action
  let newState = profileReducer(state, action);
  //3. expectation
  expect(newState.posts.length).toBe(2);
});