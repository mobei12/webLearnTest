class WebSocket {
    connection
    url
    constructor(url, onMessageCallback) {
        this.url = url
        this.onMessageCallback = onMessageCallback;
        this.connection = null
        this.connection.connect()
    }
    static connect() {
        this.websocket = new WebSocket(this.url);

        this.websocket.onopen = () => {
            console.log('WebSocket connection opened.');
        };

        this.websocket.onmessage = (event) => {
            this.handleMessage(event);
        };

        this.websocket.onclose = () => {
            console.log('WebSocket connection closed.');
        };

        this.websocket.onerror = (error) => {
            console.error(`WebSocket Error: ${error}`);
        };
    }
    handleMessage(event) {
        const message = event.data;
        if (this.onMessageCallback) {
            this.onMessageCallback(message);
        }
    }

    sendMessage(message) {
        if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
            this.websocket.send(message);
        } else {
            console.error('WebSocket is not open. Message not sent.');
        }
    }

    closeConnection() {
        if (this.websocket) {
            this.websocket.close();
        }
    }
}