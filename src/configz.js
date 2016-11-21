const http = require('http');
const net = require('net');
const express = require('express');
const bodyParser = require('body-parser');

const Config = require('./config.js');
const getPath = require('./routes/get-path.js');
const postPath = require('./routes/post-path.js');
const deletePath = require('./routes/delete-path.js');
const NullStorage = require('./storages/null.js');

class Configz {
    constructor({
        app,
        config,
        storage = new NullStorage(),
        tcpSocketUpdates = false,
        webSocketUpdates = false,
    } = {}) {
        this._server = app || express();
        this._server.use(bodyParser.json());
        this._config = config || new Config(storage, this._broadcast.bind(this));
        this._tcpSocketUpdates = tcpSocketUpdates;
        this._broadcastEnabled = tcpSocketUpdates || webSocketUpdates;

        this._server.get('/(*)', getPath(this._config));
        this._server.post('/(*)', postPath(this._config));
        this._server.delete('/(*)', deletePath(this._config));

        if (tcpSocketUpdates) this._setupTcpSocketUpdateServer();
    }

    getServer() {
        return this._server;
    }

    _broadcastTcp(message) {
        this._tcpSockets.forEach((socket) => {
            socket.write(JSON.stringify(message));
        });
    }

    _broadcast(message) {
        this._broadcastTcp.bind(this, message);
    }

    _setupTcpSocketUpdateServer() {
        this._tcpSockets = new Set;
        this._tcpServer = net.createServer((socket) => {
            this._tcpSockets.add(socket);

            socket.on('end', () => {
                this._tcpSockets.delete(socket);
            });
        });
    }

    start() {
        this._server.listen(8080);
        if (this._tcpSocketUpdates) {
            this._tcpServer.listen(1987);
            this._broadcastTcp({
                type: 'init',
                body: {
                    data: this._config.getData(),
                },
            });
        }
    }
}

module.exports = Configz;
