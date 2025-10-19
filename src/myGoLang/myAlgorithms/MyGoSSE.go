package myAlgorithms

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sync"
	"time"
)

// SSEEvent 表示要发送给客户端的事件
// SSEEvent represents an event to be sent to clients
type SSEEvent struct {
	ID      string `json:"id"`      // 事件ID，可选
	Event   string `json:"event"`   // 事件类型，可选
	Data    string `json:"data"`    // 事件数据，必需
	Channel string `json:"channel"` // 事件频道，用于过滤，可选
}

// Client 表示已连接的SSE客户端
// Client represents a connected SSE client
type Client struct {
	channel string              // 客户端订阅的频道
	writer  http.ResponseWriter // HTTP响应写入器
	flusher http.Flusher        // HTTP刷新器，用于立即发送数据
	done    chan bool           // 用于通知客户端连接已关闭的通道
}

// MyGoSSE 是一个服务器发送事件(SSE)管理器
// MyGoSSE is a Server-Sent Events manager
type MyGoSSE struct {
	clients      map[*Client]bool // 已连接的客户端映射
	clientsMutex sync.Mutex       // 客户端映射的互斥锁，防止并发访问冲突
	broadcast    chan SSEEvent    // 广播事件的通道
	register     chan *Client     // 注册新客户端的通道
	unregister   chan *Client     // 注销客户端的通道
}

// NewSSE 创建一个新的SSE服务器
// NewSSE creates a new SSE server
func NewSSE() *MyGoSSE {
	return &MyGoSSE{
		clients:    make(map[*Client]bool), // 初始化客户端映射
		broadcast:  make(chan SSEEvent),    // 初始化广播通道
		register:   make(chan *Client),     // 初始化注册通道
		unregister: make(chan *Client),     // 初始化注销通道
	}
}

// Start 启动SSE服务器
// Start begins the SSE server
func (sse *MyGoSSE) Start() {
	// 启动一个goroutine来处理客户端注册、注销和事件广播
	go func() {
		for {
			select {
			// 处理客户端注册
			case client := <-sse.register:
				sse.clientsMutex.Lock()
				sse.clients[client] = true
				sse.clientsMutex.Unlock()
				log.Printf("客户端已注册。总客户端数: %d", len(sse.clients))

			// 处理客户端注销
			case client := <-sse.unregister:
				sse.clientsMutex.Lock()
				if _, ok := sse.clients[client]; ok {
					delete(sse.clients, client)
					close(client.done)
				}
				sse.clientsMutex.Unlock()
				log.Printf("客户端已注销。总客户端数: %d", len(sse.clients))

			// 处理事件广播
			case event := <-sse.broadcast:
				sse.broadcastEvent(event)
			}
		}
	}()
}

// broadcastEvent 向所有已连接的客户端发送事件
// broadcastEvent sends an event to all connected clients
func (sse *MyGoSSE) broadcastEvent(event SSEEvent) {
	sse.clientsMutex.Lock()
	defer sse.clientsMutex.Unlock()

	for client := range sse.clients {
		// 如果事件有频道，只发送给订阅该频道的客户端
		if event.Channel != "" && client.channel != event.Channel {
			continue
		}

		// 为每个客户端启动一个goroutine来发送事件，避免阻塞
		go func(client *Client) {
			sse.sendEventToClient(client, event)
		}(client)
	}
}

// sendEventToClient 向特定客户端发送事件
// sendEventToClient sends an event to a specific client
func (sse *MyGoSSE) sendEventToClient(client *Client, event SSEEvent) {
	// 按照SSE协议格式化事件数据
	eventData := ""
	if event.ID != "" {
		eventData += fmt.Sprintf("id: %s\n", event.ID)
	}
	if event.Event != "" {
		eventData += fmt.Sprintf("event: %s\n", event.Event)
	}
	eventData += fmt.Sprintf("data: %s\n\n", event.Data)

	// 写入事件数据到客户端
	_, err := fmt.Fprint(client.writer, eventData)
	if err != nil {
		log.Printf("向客户端发送事件时出错: %v", err)
		sse.unregister <- client
		return
	}

	// 立即刷新数据到客户端
	client.flusher.Flush()
}

// ServeHTTP 处理SSE连接，实现http.Handler接口
// ServeHTTP handles the SSE connection
func (sse *MyGoSSE) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// 检查客户端是否支持SSE
	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "不支持流式传输", http.StatusInternalServerError)
		return
	}

	// 设置SSE所需的HTTP头
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// 从查询参数获取频道
	channel := r.URL.Query().Get("channel")

	// 创建新客户端
	client := &Client{
		channel: channel,
		writer:  w,
		flusher: flusher,
		done:    make(chan bool),
	}

	// 注册客户端
	sse.register <- client

	// 发送连接建立事件
	sse.sendEventToClient(client, SSEEvent{
		Event: "connected",
		Data:  fmt.Sprintf("{\"time\":\"%s\"}", time.Now().Format(time.RFC3339)),
	})

	// 保持连接活跃，直到请求上下文完成
	notify := r.Context().Done()
	go func() {
		<-notify
		sse.unregister <- client
	}()

	// 阻塞直到客户端连接关闭
	<-client.done
}

// PublishHandler 处理发布事件的POST请求
// PublishHandler handles POST requests to publish events
func (sse *MyGoSSE) PublishHandler(w http.ResponseWriter, r *http.Request) {
	// 只允许POST方法
	if r.Method != http.MethodPost {
		http.Error(w, "方法不允许", http.StatusMethodNotAllowed)
		return
	}

	// 从请求体解析事件
	var event SSEEvent
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&event); err != nil {
		http.Error(w, "无效的请求体", http.StatusBadRequest)
		return
	}

	// 广播事件
	sse.broadcast <- event

	// 响应成功
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "published"})
}

// SetupRoutes 设置SSE服务器的HTTP路由
// SetupRoutes sets up the HTTP routes for the SSE server
func (sse *MyGoSSE) SetupRoutes(mux *http.ServeMux) {
	mux.Handle("/events", sse)                // 客户端连接SSE的端点
	mux.HandleFunc("/publish", sse.PublishHandler) // 发布事件的POST端点
}

// ExampleSSEServer 展示如何使用SSE服务器的示例
// Example of how to use the SSE server
func ExampleSSEServer() {
	// 创建并启动SSE服务器
	sse := NewSSE()
	sse.Start()

	// 创建HTTP路由
	mux := http.NewServeMux()
	sse.SetupRoutes(mux)

	// 添加一个简单的索引页面，包含测试用的HTML和JavaScript
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/html")
		w.Write([]byte(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>SSE 示例</title>
				<script>
					document.addEventListener('DOMContentLoaded', function() {
						// 创建SSE连接
						const eventSource = new EventSource('/events');
						
						// 处理普通消息
						eventSource.onmessage = function(e) {
							const messagesDiv = document.getElementById('messages');
							messagesDiv.innerHTML += '<p>' + e.data + '</p>';
						};
						
						// 处理连接事件
						eventSource.addEventListener('connected', function(e) {
							console.log('已连接到SSE服务器:', e.data);
						});
						
						// 处理表单提交，发送消息
						document.getElementById('publishForm').addEventListener('submit', function(e) {
							e.preventDefault();
							const data = document.getElementById('eventData').value;
							
							// 发送POST请求到/publish端点
							fetch('/publish', {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json'
								},
								body: JSON.stringify({
									event: 'message',
									data: data
								})
							})
							.then(response => response.json())
							.then(result => {
								console.log('已发布:', result);
								document.getElementById('eventData').value = '';
							})
							.catch(error => {
								console.error('错误:', error);
							});
						});
					});
				</script>
			</head>
			<body>
				<h1>SSE 示例</h1>
				<form id="publishForm">
					<input type="text" id="eventData" placeholder="事件数据">
					<button type="submit">发布</button>
				</form>
				<div id="messages"></div>
			</body>
			</html>
		`))
	})

	// 启动HTTP服务器
	log.Println("在端口8080上启动SSE服务器")
	log.Fatal(http.ListenAndServe(":8080", mux))
}