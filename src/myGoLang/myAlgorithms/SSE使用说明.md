# MyGoSSE 使用说明

## 简介

MyGoSSE 是一个基于 Go 语言实现的服务器发送事件(SSE)后端服务，支持通过 POST 请求发送事件。

## 基本用法

### 服务端

```go
// 创建并启动 SSE 服务器
sse := myAlgorithms.NewSSE()
sse.Start()

// 设置路由
mux := http.NewServeMux()
sse.SetupRoutes(mux)

// 启动 HTTP 服务器
log.Fatal(http.ListenAndServe(":8080", mux))
```

### 客户端

```javascript
// 连接 SSE
const eventSource = new EventSource('/events');

// 接收消息
eventSource.onmessage = function(e) {
    console.log('收到消息:', e.data);
};

// 发送事件
fetch('/publish', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        event: 'message',
        data: '{"content": "Hello World"}'
    })
});
```

## 主要功能

1. **客户端连接**: 通过 `/events` 端点
2. **事件发布**: 通过 `/publish` 端点 (POST 请求)
3. **频道订阅**: 使用 `/events?channel=名称` 订阅特定频道
4. **自定义事件**: 支持自定义事件类型、ID 和数据

## 事件格式

```json
{
    "id": "可选的事件ID",
    "event": "事件类型",
    "data": "事件数据",
    "channel": "事件频道"
}
```

## 示例代码

### 完整服务器示例

```go
package main

import (
    "log"
    "net/http"
    "yourproject/myAlgorithms"
)

func main() {
    // 创建 SSE 服务器
    sse := myAlgorithms.NewSSE()
    sse.Start()

    // 设置路由
    mux := http.NewServeMux()
    sse.SetupRoutes(mux)

    // 添加其他路由
    mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        // 提供前端页面
    })

    // 启动服务器
    log.Println("启动 SSE 服务器在端口 8080")
    log.Fatal(http.ListenAndServe(":8080", mux))
}
```

### 发送自定义事件

```go
// 创建事件
event := myAlgorithms.SSEEvent{
    Event:   "notification",
    Data:    `{"message": "新消息", "priority": "high"}`,
    ID:      "msg-123",
    Channel: "user-updates",
}

// 发送事件
sse.broadcast <- event
```

## 常见问题

1. **客户端无法接收事件**: 确保客户端支持 EventSource API，检查网络连接
2. **事件发布后客户端没有收到**: 检查频道是否匹配，确保事件数据格式正确
3. **处理大量客户端**: 使用负载均衡，考虑消息队列作为中间件

## 性能优化

- 使用频道过滤，避免向不需要的客户端发送事件
- 减少发送的数据量，只发送必要信息
- 在高负载情况下考虑集群部署