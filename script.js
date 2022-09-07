$().ready(function (){
  const socket = io('http://localhost:3000')
  const messageContainer = document.getElementById('message-container')
  const messageForm = document.getElementById('send-container')
  const messageInput = document.getElementById('message-input')

  const rollContainer = document.getElementById('roll-container')
  const rollForm = document.getElementById('roll-button-container')

  const href = window.location.href
  const last = href.lastIndexOf('/')
  const slice = href.slice(last + 1)

  socket.emit('slice', slice)

  var nick = new Array
  nick[0] = 'Ichigo'
  nick[1] = 'Hiro'
  nick[2] = 'Goro'
  nick[3] = 'Ikuno'
  nick[4] = 'Futoshi'
  nick[5] = 'Mitsuru'
  nick[6] = 'Miku'
  nick[7] = 'Kokoro'
  nick[8] = 'Zorome'
  nick[9] = 'Naomi'
  nick[10] = 'Zero Two'
  var json = Math.floor(Math.random() * 11);
  const name = nick[json]
  //const name = prompt('What is your name?')
  appendMessage('You joined')
  socket.emit('new-user', name)

  socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
  })

  socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
  })

  socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`)
  })

  messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
  })

  function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.setAttribute("style", "margin-top: 5px; margin-bottom: 5px");
    messageElement.innerText = message
    messageContainer.prepend(messageElement)
  }

  socket.on('chat-roll', data => {
    appendRoll(`${data.name}: ${data.roll}`)
    })

  rollForm.addEventListener('submit', e => {
    e.preventDefault()
    
    var dice = new Array()
    dice[0] = "<img src=\'dice_sides_db/dice1.png\' width=\'50px\' height=\'50px\'>";
    dice[1] = "<img src=\'dice_sides_db/dice2.png\' width=\'50px\' height=\'50px\'>";
    dice[2] = "<img src=\'dice_sides_db/dice3.png\' width=\'50px\' height=\'50px\'>";
    dice[3] = "<img src=\'dice_sides_db/dice4.png\' width=\'50px\' height=\'50px\'>";
    dice[4] = "<img src=\'dice_sides_db/dice5.png\' width=\'50px\' height=\'50px\'>";
    dice[5] = "<img src=\'dice_sides_db/dice6.png\' width=\'50px\' height=\'50px\'>";
    var json = Math.floor(Math.random() * 6);
    const roll = dice[json]
    
    appendRoll(`You: ${roll}`)
    socket.emit('send-chat-roll', roll)
  })

  function appendRoll(roll) {
    const rollElement = document.createElement('div')
    rollElement.setAttribute("style", "margin-top: 5px; margin-bottom: 5px");
    rollElement.innerHTML = roll
    rollContainer.prepend(rollElement)
  }
});
