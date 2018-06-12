Looking to create MERN APP where user provide some url and my backend(NodeJS) will fetch all header and send back to frontend. In frontend, I need Nested drag with edit option of that header in the end I need that updated json.

Express Running on : PORT=3001 nodemon // http://localhost:3001

React running on : npmm start // http://localhost:3000


ISSUE : React component not re-rendering on state change

Using Redux with ReactJS, I am keeping an array of objects  in the store and dispatching actions that sort and manipulate it. In mapStateToProps, I return this results array, which renders the results in a list on the view.


I have found that although my mapStateToProps successfully triggers to update the props to my class component, for some reason the view only updates on the FIRST time that the results array gets manipulated, but does not update on future updates to the store.
