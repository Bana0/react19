import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useEffect, useState, useRef, useCallback } from 'react'
import axios from 'axios'
import { useVirtualizer } from '@tanstack/react-virtual'

let socket: WebSocket | null = null
const initSocket = () => {
  // 连接 WebSocket
  socket = new WebSocket(`ws://${window.location.hostname}:3000`)
  // 监听连接成功事件
  socket.addEventListener('open', () => {
    console.log('WebSocket 连接成功')
  })

  // 监听连接关闭事件
  socket.addEventListener('close', () => {
    console.log('WebSocket 连接关闭')
  })
  return socket
}

const Shadcn = () => {
  const [messages, setMessages] = useState<any[]>([])
  const [text, setText] = useState('')
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // 当前用户ID（假设为 '1'）
  const currentUser = '1'

  // 初始化虚拟滚动
  const rowVirtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]') || scrollAreaRef.current,
    estimateSize: useCallback(() => 100, []), // 默认估计高度
    overscan: 5, // 预加载数量
  })

  // 消息元素引用（用于测量高度）
  const messageRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  useEffect(() => {
    const ws = initSocket()
    ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data)
      console.log('接收到消息:', msg)
      if (msg.type === 'message') {
        setMessages((prev) => [msg.data, ...prev]) // 新消息添加到开头
      } else {
        setMessages(msg.data.reverse()) // 历史消息反转（最新消息在开头）
      }
    })

    return () => {
      ws.close()
    }
  }, [])

  // 当消息更新时滚动到底部（最新消息）
  useEffect(() => {
    // 只在有新消息时滚动
    if (messages.length > 0) {
      rowVirtualizer.scrollToIndex(0, { align: 'end', behavior: 'smooth' })
    }
  }, [messages, rowVirtualizer])

  // 更新消息高度
  const updateMessageHeight = useCallback(
    (id: string, height: number) => {
      const element = messageRefs.current[id]
      if (element) {
        rowVirtualizer.measureElement(element, () => height)
      }
    },
    [rowVirtualizer]
  )

  const send = () => {
    console.log('发送消息:', text)
    if (socket) {
      axios
        .post('http://localhost:3000/api/send', {
          sender: currentUser,
          text: text,
        })
        .then(() => {
          setText('')
        })
    }
  }

  return (
    <div className="flex flex-col w-[800px] mx-auto gap-4 p-4">
      <ScrollArea ref={scrollAreaRef} className="h-[400px] border rounded-md">
        {/* 虚拟滚动容器 */}
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem) => {
            const index = messages.length - 1 - virtualItem.index // 反转索引（底部最新消息）
            const message = messages[index]
            const isCurrentUser = message?.sender === currentUser

            if (!message) return null

            return (
              <div
                key={message.id}
                ref={(el) => {
                  messageRefs.current[message.id] = el
                  // 在元素渲染后更新高度
                  if (el) {
                    setTimeout(() => {
                      const height = el.getBoundingClientRect().height
                      updateMessageHeight(message.id, height)
                    }, 0)
                  }
                }}
                data-index={virtualItem.index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <div className={`flex p-4 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start gap-2 max-w-[80%] ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
                    {/* 头像 */}
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">{message.sender.charAt(0)}</div>

                    <div className="flex flex-col">
                      {/* 消息气泡 */}
                      <div className={`px-3 py-2 rounded-xl ${isCurrentUser ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>{message.text}</div>

                      {/* 时间和发送者 */}
                      <div className={`text-xs text-gray-500 mt-1 flex gap-1 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                        <div className="font-bold">{message.sender}</div>
                        <div>{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </ScrollArea>

      <div className="flex items-center gap-2">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1"
          placeholder="请输入消息"
          onKeyDown={(e) => {
            if (e.key === 'Enter') send()
          }}
        />
        <Button onClick={send}>发送</Button>
      </div>
    </div>
  )
}

export default Shadcn
