1. models/types: todo, tdList, subtd, user
user: id, name, todoLists.
tdlist: id, title, todos, userId.
todo: id, title, text, deadline, cost, tdListId.
subtd: id, title, text, deadline, cost, todoId.
2. components: todocard, todoGallery, tdlistCard, tdList Gallery, subtdcard, usercard, userGallery, Login, Home.

● ⚠ (required): I as a user can create to-do items, such as a grocery list
● ⚠ (required):I as a user can create multiple to-do lists where each list has it's unique URL that
I can share with my friends - so that I could have separate to do lists for my groceries and work
related tasks
● ⚠ (required): I as a user can mark to-do items as “done” - so that I can avoid clutter and focus
on things that are still pending
● ⚠ (required): I as a user can filter the to-do list and view items that were marked as done - so
that I can retrospect on my prior progress
● I as a user can add sub-tasks to my to-do items - so that I could make logical groups of
tasks and see their overall progress
● I as a user can specify cost/price for a task or a subtask - so that I can track my
expenses / project cost
● I as a user can change the order of tasks via drag & drop
● I as a user can move/convert subtasks to tasks via drag & drop
● I as a user can be sure that my todos will be persisted so that important information is
not lost when server restarts
● I as an owner/creator of a certain to-do list can freeze/unfreeze a to-do list I've created to
avoid other users from mutating it.

● I as a user can keep editing the list even when I lose internet connection, and can expect it to
sync up with BE as I regain connection
● I as another user can collaborate in real-time with user - so that we can (for example) edit our
family shopping-list together
● I as a user can see the cursor and/or selection of another-user as he selects/types when
they are editing text - so that we can discuss focused words during our online call.
