# iNotesAPI
This is a notes API in which  a user can create, delete, update notes. 

Authentication

Route to crete user : http://localhost:3000/api/auth/create   // gives back jwt token

Route to login user : http://localhost:3000/api/auth/login

Route to fetch user : http://localhost:3000/api/auth/fetchuser

Notes CURD  __ Login requrired   i.e send jwt token in header when you are doing any  operation

Route to createNote : http://localhost:3000/api/notes/createnote

Route to fetchAllNotes :http://localhost:3000/api/notes/fetchnotes

Route to updateNote :http://localhost:3000/api/notes/updatenote/:id

Route to deleteNote : http://localhost:3000/api/notes/deletenote/:id


