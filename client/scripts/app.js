// YOUR CODE HERE:
var app = {};
var messageObject = function(message, roomname) {
  
  this.roomname = roomname;
  this.text = message;
  this.username = window.location.search.split('username=')[1];

};

app.init = function() {
  var roomname;
  console.log(document.getElementById('roomSelect').value);
  roomname = document.getElementById('roomSelect').value;
  app.fetch();
  $('#send').submit(function(event) {
    var message = document.getElementById('inputMessage').value;
    var newMessage = new messageObject(message, roomname);
    console.log(newMessage);
    app.send(newMessage);
    event.preventDefault();
  });
  $('button').click(function(event) {
    window.location.reload();
  });
  $('#newRoom').submit(function(event) {
    var brandNewRoom = document.getElementById('inputRoom').value;
    app.addRoom(brandNewRoom);
    event.preventDefault();
  });
};

function myFunction(val) {
  roomname = val;
  var message = document.getElementById('inputMessage').value;
  var newMessage = new messageObject(message, roomname);
  console.log(newMessage);
}


app.send = function(message) {
  $.ajax({
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      // data = JSON.parse(data);
      data.text = message.text;
      data.roomname = message.roomname;
      data.username = message.username;
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
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
  //    console.log(data)
      var newArr = [];
      data.results.forEach(function(ele) {
        newArr.push(ele.roomname);
        app.renderMessage(ele);
      });

      var uniqueArr = _.uniq(newArr);
      uniqueArr.forEach(function(eachRoom) {
        app.addRoom(eachRoom);
      });
    },
    error: function (data) {
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

app.addRoom = function(eachRoom) {
  $('#roomSelect').append($(`<option>${eachRoom}</option>`));
};

$( document ).ready(function() {
  app.init();
});
