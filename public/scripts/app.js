// DOM queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');

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

// class instances
const chatUI = new ChatUI(chatList);
const chatRoom = new Chatroom('general', 'anon');

// get chats and render
chatRoom.getChats(data => chatUI.render(data));