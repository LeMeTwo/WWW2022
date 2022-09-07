$().ready(function (){
  const socket = io('http://localhost:3000')
  const messageContainer = document.getElementById('priv-message-container')
  const messageForm = document.getElementById('priv-send-container')
  const messageInput = document.getElementById('priv-message-input')

  const rollContainer = document.getElementById('priv-roll-container')
  const rollForm = document.getElementById('priv-roll-button-container')

  const name = prompt('What is your name?')
  appendMessage('You joined')
  socket.emit('priv-new-user', name)

  socket.on('priv-chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
  })

  socket.on('priv-user-connected', name => {
    appendMessage(`${name} connected`)
  })

  socket.on('priv-user-disconnected', name => {
    appendMessage(`${name} disconnected`)
  })

  messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('priv-send-chat-message', message)
    messageInput.value = ''
  })

  function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.setAttribute("style", "margin-top: 5px; margin-bottom: 5px");
    messageElement.innerText = message
    messageContainer.prepend(messageElement)
  }

  socket.on('priv-chat-roll', data => {
    appendRoll(`${data.name}: ${data.roll}`)
    })

  rollForm.addEventListener('submit', e => {
    e.preventDefault()
    
    var dice = new Array()
    dice[0] = "<img src=\'dice_sides_db/dice1.png\' width=\'50px\' height=\'50px\'>";
    dice[1] = "<img src=\'dice_sides_db/dice2.png\' width=\'50px\' height=\'50px\'>";
    dice[2] = "<img src=\'dice_sides_db/dice3.png\' width=\'50px\' height=\'50px\'>";
    dice[3] = "<img src=\'dice_sides_db/dice4.png\' width=\'50px\' height=\'50px\'>";
    dice[4] = "<img src=\'dice_sides_db/ludwin.png\' width=\'50px\' height=\'50px\'>";
    dice[5] = "<img src=\'dice_sides_db/hulicki.png\' width=\'50px\' height=\'50px\'>";
    var json = Math.floor(Math.random() * 6);
    const roll = dice[json]
    
    appendRoll(`You: ${roll}`)
    socket.emit('priv-send-chat-roll', roll)
  })

  function appendRoll(roll) {
    const rollElement = document.createElement('div')
    rollElement.setAttribute("style", "margin-top: 5px; margin-bottom: 5px");
    rollElement.innerHTML = roll
    rollContainer.prepend(rollElement)
  }
});