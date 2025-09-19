# HTTP 状态码测试服务（Gin）

这是一个使用 Gin 编写的简单 HTTP 服务，用于测试 1xx 到 5xx 的各种状态码。

- 支持返回任意 `100 ~ 599` 的状态码：`/status/{code}`
- 支持所有 HTTP 方法（GET/POST/PUT/DELETE/...）
- 可选 `delay`（毫秒）参数，用于延迟响应
- 1xx 状态码提供两种模式：
  - 默认：为了便于在浏览器/工具中观察，使用 200 包裹返回（并在 header/body 说明请求的 1xx）
  - 严格：`strict=true` 时尝试直接返回 1xx（注意：多数客户端不会把 1xx 当作最终响应展示）
- 特殊处理：`204 No Content`、`304 Not Modified` 不会写入响应体
- 3xx 可选 `location` 参数设置重定向地址

## 运行

需要 Go 1.21+。

```bash
# 进入该目录
cd src/myGoLang/servers

# 拉取依赖并运行
go mod tidy
go run main.go
```

服务默认监听：`http://127.0.0.1:8080`

## 快速测试

- 200 OK
```bash
curl -i http://127.0.0.1:8080/status/200
```

- 404 Not Found
```bash
curl -i http://127.0.0.1:8080/status/404
```

- 500 Internal Server Error（延迟 1 秒返回）
```bash
curl -i "http://127.0.0.1:8080/status/500?delay=1000"
```

- 204 No Content（无响应体）
```bash
curl -i http://127.0.0.1:8080/status/204
```

- 3xx 重定向（设置 Location）
```bash
curl -i "http://127.0.0.1:8080/status/302?location=https://example.com"
```

- 1xx 信息性状态码（默认模式：用 200 包裹，方便可见）
```bash
curl -i http://127.0.0.1:8080/status/100
```

- 1xx 严格模式（严格尝试返回 1xx，注意客户端/代理可能不会显示）
```bash
curl -i "http://127.0.0.1:8080/status/103?strict=true"
```

## 其他便捷路由

- `/ok` -> 200
- `/bad-request` -> 400
- `/unauthorized` -> 401
- `/forbidden` -> 403
- `/not-found` -> 404
- `/conflict` -> 409
- `/internal-error` -> 500

## 接口说明

- `GET/POST/... /status/:code`
  - 路径参数：`code`，范围 `100 ~ 599`
  - 查询参数：
    - `delay`（可选，单位毫秒，0~600000）：延迟返回
    - `strict`（可选，默认 false）：仅对 1xx 有效；`strict=true` 时尝试直接返回对应 1xx
    - `location`（可选）：对 3xx 有效；设置 `Location` 头

返回示例（非 204/304）：
```json
{
  "status": 404,
  "text": "Not Found"
}
```

对于 1xx（默认模式）会返回 200，带有：
```json
{
  "requested_status": 100,
  "note": "1xx 信息性状态码通常不会作为最终响应被客户端展示，已用 200 包裹返回。若需严格返回，请加 strict=true"
}
```

## 注意事项（1xx）
- 按 HTTP 协议，1xx 属于“信息性”中间响应，通常不会作为最终响应被展示。
- 某些运行环境/代理/客户端会丢弃或隐藏 1xx。若你需要确认 1xx 的可见性，请使用 `strict=true` 并通过底层抓包工具（如 tcpdump、Wireshark）或使用能显示 1xx 的 HTTP 客户端进行验证。
