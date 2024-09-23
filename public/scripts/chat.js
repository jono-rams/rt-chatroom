// adding new chat documents
// setting up a real-time listener to get new chats
// updating the username
// updating the room

class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection('chats');
    this.unsub;
    this.interval;
  }
  async addChat(message) {
    // format a chat object
    const now = new Date();
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now)
    };
    // save the chat document
    const response = await this.chats.add(chat);
    return response;
  }
  getChats(callback, intervalCallback) {
    this.unsub = this.chats
      .where('room', '==', this.room)
      .orderBy('created_at', 'asc')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            // update the ui
            callback(change.doc.data());
          }
        })
      });

    this.interval = setInterval(() => {
      this.chats
        .where('room', '==', this.room)
        .orderBy('created_at', 'asc')
        .get()
        .then(snapshot => {
          const docs = [];
          snapshot.forEach(doc => {
            docs.push(doc.data());
          });
          intervalCallback(docs);
        })
        .catch(err => console.error(err));
    }, 90000);
  }
  updateName(username) {
    this.username = username;
    localStorage.setItem('username', username);
  }
  updateRoom(room) {
    this.room = room;
    if (this.unsub) {
      this.unsub();
    }
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
