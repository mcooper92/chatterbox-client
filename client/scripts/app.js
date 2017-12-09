// YOUR CODE HERE:
var app = {
  
  roomname: 'lobby',
  messages: [],
  username: 'anonymous',
  

};

app.init = function() {
  app.fetch();
  $('#submit').on('click', function(event) {
    //pass input message to app.send
    app.send($('#message').val());
    // pass input message to rendermessage to show input message
  });
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
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: {order: '-createdAt' },
    contentType: 'application/json',
    success: function (data) {
      //console.log(data)
      data.results.forEach(function(ele) {
        app.renderMessage(ele);
      });
      
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive message', data);
    }
  }); 
};

// app.clearMessages = function() {
//   $('#chats').html('');
// };

app.renderMessage = function(message) {
  //this.clearMessages();
  $('#chats').append($(`<h3 class='username'> ${message.username}</h3>`));
  $('#chats').append($(`<p class='text'> ${message.text}</p>`));
};

app.renderRoom = function(room) {
  var newNode = document.createElement('div');
  newNode.append(room);
  $('#roomSelect').append(newNode);
};

// var message = {
//   username: 'Mel Brooks',
//   text: 'Never underestimate the power of the Schwartz!',
//   roomname: 'lobby'
// };
$( document ).ready(function() {
  app.init();
});
