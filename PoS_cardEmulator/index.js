const { NFC } = require('nfc-pcsc');
const ndef = require('@taptrack/ndef');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const nfc = new NFC();

nfc.on('reader', reader => {
    console.log(`${reader.reader.name} device attached`);

	reader.on('card', async card => {
		console.log(`Card detected`, card);
		//console.log(card.uid)
        
    });


    reader.on('error', err => {
        console.error(`${reader.reader.name} an error occurred`, err);

		console.log("SetPayment", {
			price: PRICE,
			chainId: CHAINID,
			address: ADDRESS
		})
		io.emit('setPaymentData', {
			price: PRICE,
			chainId: CHAINID,
			address: ADDRESS,
      token: TOKEN
		});
    });

    reader.on('end', () => {
        console.log(`${reader.reader.name} device removed`);
    });
});

nfc.on('error', err => {
    console.error('NFC error', err);
});


const port = 3001;

app.get('/client', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});
app.get('/pos', (req, res) => {
	res.sendFile(__dirname + '/pos.html');
});

var CHAINID, PRICE, ADDRESS, NAME, TOKEN;

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('broadcast message', (msg) => {
    console.log('Message received: ' + msg);
    io.emit('broadcast message', msg);
  });

  socket.on('setPrice', (msg) => {
	CHAINID = msg.chainId;
	PRICE = msg.price;
	ADDRESS = msg.address;
  NAME = msg.name;
  TOKEN = msg.token;
	console.log("Set price", msg)
  })

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  socket.on('transactionHash', (msg) => {
    console.log('transactionHash', JSON.stringify(msg))
    io.emit('transactionHash', msg)
  })

  socket.on('transactionSuccessful', (msg) => {
    console.log("Transaction successful", msg)
    // TODO: enter here code for dbforest
  })
});

http.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
