// YOUR CODE HERE:
var app = {
  
  roomname: 'lobby',
  messages: [],
  username: 'anonymous',
  

  init: function() {
  }




};


app.send = function(message) {
  $.ajax({
      // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: message,
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  }); 
};
app.fetch = function() {
  $.ajax({
      // This is the url you should use to communicate with the parse API server.
    url: undefined,
    type: 'GET',
    data: message,
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message received');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive message', data);
    }
  }); 
};

app.clearMessages = function() {
  $('#chats').html('');
};

app.renderMessage = function(message) {
  this.clearMessages();
  var newNode = document.createElement('span');
  newNode.append(message.text);
  $('#chats').append(newNode);
};

app.renderRoom = function(room) {
  var newNode = document.createElement('div');
  newNode.append(room);
  $('#roomSelect').append(newNode);
};

