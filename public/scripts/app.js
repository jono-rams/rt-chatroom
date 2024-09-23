// DOM queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const updateNameForm = document.querySelector('.update-name');
const updateMsg = document.querySelector('.update-msg');

// add a new chat
newChatForm.addEventListener('submit', e => {
  e.preventDefault();
  const msg = newChatForm.message.value.trim();
  if (msg && msg !== '') {
    chatRoom.addChat(msg)
      .then(() => newChatForm.reset())
      .catch((err) => console.error(err));
  }
});

// update username
updateNameForm.addEventListener('submit', e => {
  e.preventDefault();
  const newName = updateNameForm.name.value.trim();
  if (newName && newName !== '') {
    // update name via chatroom
    chatRoom.updateName(newName)
    // reset the form
    updateNameForm.reset();
    // update name in message form
    newChatForm.getElementsByClassName('input-group-text').item(0).innerText = `${newName}:`;
    // show then hide the update message
    updateMsg.innerText = `Your name was successfully changed to ${newName}`;
    setTimeout(() => updateMsg.innerText = '', 1500)
  }
});

// check local storage for a username
const username = localStorage.username ? localStorage.username : 'anon';
newChatForm.getElementsByClassName('input-group-text').item(0).innerText = `${username}:`;
newChatForm.message.placeholder = `type your message here`;

// class instances
const chatUI = new ChatUI(chatList);
const chatRoom = new Chatroom('general', username);

// get chats and render
chatRoom.getChats(data => chatUI.render(data), timeData => chatUI.update(timeData));