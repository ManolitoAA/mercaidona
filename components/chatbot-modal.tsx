"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, Send } from "lucide-react"

interface ChatbotModalProps {
  onClose: () => void
  scrollToHistory?: () => void
}

interface Message {
  text: string
  isUser: boolean
  timestamp: Date
  showQuickQuestions?: boolean
}

export default function ChatbotModal({ onClose, scrollToHistory }: ChatbotModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: `Hola, soy MercAI. ¿En qué puedo ayudarte con tu compra hoy?`,
      isUser: false,
      timestamp: new Date(),
      showQuickQuestions: true,
    },
  ])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Simular respuesta del chatbot
  const generateBotResponse = (userMessage: string) => {
    const lowerCaseMessage = userMessage.toLowerCase()

    // Respuesta para la pregunta sobre ofertas similares
    if (lowerCaseMessage.includes("ofertas") && lowerCaseMessage.includes("similares")) {
      return `Basándome en tus compras habituales, tenemos estas ofertas que podrían interesarte:

1. Yogur griego natural (15% descuento) - Similar a los yogures naturales que compras habitualmente
2. Aceite de oliva virgen extra ecológico (20% descuento) - Una alternativa premium al aceite que sueles comprar
3. Pan de centeno (10% descuento) - Una opción más saludable al pan de molde integral
4. Manzanas Fuji (3x2) - Complementarias a las Golden que sueles comprar

¿Te gustaría que añada alguno de estos productos a tu lista de la compra?`
    }

    // Respuesta para recomendaciones nutricionales y de hábitos
    if (lowerCaseMessage.includes("recomendaciones") || lowerCaseMessage.includes("sugerencias personalizadas")) {
      return `Basándome en el análisis de tus compras, tengo dos recomendaciones para ti:

1️⃣ Notamos que no has comprado pescado en los últimos 2 meses. El pescado es una fuente importante de proteínas y ácidos grasos omega-3. Te recomendamos:
   • Merluza fresca (9.95€/kg)
   • Salmón en porciones (3.75€/unidad)
   • Conservas de atún en aceite de oliva (pack de 3 por 2.85€)

2️⃣ Hemos observado que compras frecuentemente productos sin gluten. Aquí tienes más variedad que podría interesarte:
   • Pasta de arroz sin gluten (1.85€)
   • Galletas de avena sin gluten (2.25€)
   • Pan de semillas sin gluten (2.95€)
   • Harina de maíz sin gluten para repostería (1.45€)

¿Quieres que añada alguno de estos productos a tu lista de la compra?`
    }

    // Para la pregunta sobre últimas compras, se manejará de forma especial
    if (
      lowerCaseMessage.includes("últimas compras") ||
      lowerCaseMessage.includes("ultimas compras") ||
      lowerCaseMessage.includes("historial")
    ) {
      return "REDIRECT_TO_HISTORY"
    }

    // Respuestas generales
    if (lowerCaseMessage.includes("oferta") || lowerCaseMessage.includes("descuento")) {
      return "Actualmente tenemos más de 200 productos en oferta. ¿Te interesa alguna categoría en particular como lácteos, carnes o productos de limpieza?"
    } else if (
      lowerCaseMessage.includes("horario") ||
      lowerCaseMessage.includes("tienda") ||
      lowerCaseMessage.includes("abierto")
    ) {
      return "Nuestras tiendas están abiertas de lunes a sábado de 9:00 a 21:30. Puedes consultar el horario específico de tu tienda en la sección 'Tiendas' de nuestra app."
    } else if (
      lowerCaseMessage.includes("entrega") ||
      lowerCaseMessage.includes("envío") ||
      lowerCaseMessage.includes("domicilio")
    ) {
      return "Realizamos entregas a domicilio en franjas de 1 hora. El coste del envío es de 7,21€ para pedidos inferiores a 100€ y gratuito para pedidos superiores."
    } else if (lowerCaseMessage.includes("devolución") || lowerCaseMessage.includes("devolver")) {
      return "Puedes devolver cualquier producto en un plazo de 14 días. Si has comprado online, puedes solicitar la devolución desde tu área de cliente o llevando el producto a tu tienda habitual."
    } else if (
      lowerCaseMessage.includes("pago") ||
      lowerCaseMessage.includes("tarjeta") ||
      lowerCaseMessage.includes("efectivo")
    ) {
      return "Aceptamos pago con tarjeta, efectivo y a través de nuestra app. También puedes utilizar Apple Pay y Google Pay en nuestras tiendas."
    } else if (lowerCaseMessage.includes("gracias")) {
      return "¡De nada! Estoy aquí para ayudarte con cualquier otra pregunta sobre tus compras."
    } else if (lowerCaseMessage.includes("receta") || lowerCaseMessage.includes("cocinar")) {
      return "Tenemos muchas recetas disponibles en nuestra sección 'Recetas'. ¿Qué tipo de plato te gustaría preparar?"
    } else if (
      lowerCaseMessage.includes("alérgeno") ||
      lowerCaseMessage.includes("alergia") ||
      lowerCaseMessage.includes("intolerancia")
    ) {
      return "Todos nuestros productos tienen información detallada sobre alérgenos. Puedes consultar esta información en la etiqueta del producto o en nuestra app escaneando el código de barras."
    } else {
      return "Gracias por tu consulta. ¿Puedo ayudarte con información sobre ofertas, horarios de tienda, entregas a domicilio o alguna otra cuestión relacionada con tu compra?"
    }
  }

  const handleQuickQuestion = (question: string) => {
    // Añadir la pregunta como mensaje del usuario
    const userMessage = {
      text: question,
      isUser: true,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])

    // Simular tiempo de respuesta
    setTimeout(() => {
      const response = generateBotResponse(question)

      // Si la respuesta es redirigir al historial
      if (response === "REDIRECT_TO_HISTORY") {
        const botResponse = {
          text: "Te mostraré tu historial de compras ahora mismo.",
          isUser: false,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botResponse])

        // Cerrar el chatbot y desplazar al historial después de un breve retraso
        setTimeout(() => {
          onClose()
          if (scrollToHistory) {
            scrollToHistory()
          }
        }, 1000)
      } else {
        // Respuesta normal
        const botResponse = {
          text: response,
          isUser: false,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botResponse])
      }
    }, 1000)
  }

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Añadir mensaje del usuario
    const userMessage = {
      text: input,
      isUser: true,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simular tiempo de respuesta
    setTimeout(() => {
      const response = generateBotResponse(input)

      // Si la respuesta es redirigir al historial
      if (response === "REDIRECT_TO_HISTORY") {
        const botResponse = {
          text: "Te mostraré tu historial de compras ahora mismo.",
          isUser: false,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botResponse])

        // Cerrar el chatbot y desplazar al historial después de un breve retraso
        setTimeout(() => {
          onClose()
          if (scrollToHistory) {
            scrollToHistory()
          }
        }, 1000)
      } else {
        // Respuesta normal
        const botResponse = {
          text: response,
          isUser: false,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botResponse])
      }
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md flex flex-col max-h-[80vh]">
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="font-bold">Asistente MercAI</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index}>
              <div className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.isUser ? "bg-green-600 text-white" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>

              {/* Preguntas rápidas después del mensaje de introducción */}
              {message.showQuickQuestions && (
                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => handleQuickQuestion("¿Qué ofertas hay en productos similares a los que consumo?")}
                    className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm border border-gray-200"
                  >
                    ¿Qué ofertas hay en productos similares a los que consumo?
                  </button>
                  <button
                    onClick={() => handleQuickQuestion("¿Cuáles son mis últimas compras?")}
                    className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm border border-gray-200"
                  >
                    ¿Cuáles son mis últimas compras?
                  </button>
                  <button
                    onClick={() => handleQuickQuestion("Sugerencias personalizadas para mi alimentación")}
                    className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm border border-gray-200"
                  >
                    Sugerencias personalizadas para mi alimentación
                  </button>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t p-4">
          <div className="flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu pregunta..."
              className="flex-grow border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleSendMessage}
              className="bg-green-600 text-white p-2 rounded-r-lg"
              disabled={!input.trim()}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
