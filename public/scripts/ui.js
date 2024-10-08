// render chat templates to the DOM
// clear the list of chats (when the room changes)

class ChatUI {
  constructor(list) {
    this.list = list;
  }
  clear() {
    this.list.innerHTML = "";
  }
  render(data) {
    const when = dateFns.formatDistanceToNow(
      data.created_at.toDate(),
      {
        addSuffix: true
      }
    );
    const html = `
      <li class="list-group-item">
        <span class="username">${data.username}:</span>
        <span class="message">${data.message}</span>
        <div class="time">${when}</div>
      </li>
    `;

    this.list.innerHTML += html;
  }
  update(timeData) {
    const elements = Array.from(this.list.getElementsByClassName("time"));
    elements.map((el, i) => {
      const when = dateFns.formatDistanceToNow(
        timeData[i].created_at.toDate(),
        {
          addSuffix: true
        }
      );
      el.textContent = when;
    })
  }
}
