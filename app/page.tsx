'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Lightbulb, Target, Zap, Brain } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ThinkingStep {
  step: number
  content: string
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [thinkingSteps, setThinkingSteps] = useState<ThinkingStep[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showWelcome, setShowWelcome] = useState(true)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, thinkingSteps])

  const generateThinkingSteps = (userInput: string): ThinkingStep[] => {
    const steps: ThinkingStep[] = []

    steps.push({ step: 1, content: '🎯 Goal ko samajh raha hoon...' })
    steps.push({ step: 2, content: '🧠 Best approach soch raha hoon...' })

    if (userInput.length > 50 || userInput.includes('?')) {
      steps.push({ step: 3, content: '📊 Information analyze kar raha hoon...' })
    }

    steps.push({ step: 4, content: '✨ Perfect solution tayyar kar raha hoon...' })

    return steps
  }

  const generateResponse = async (userMessage: string): Promise<string> => {
    const lowerInput = userMessage.toLowerCase()

    // Goal detection patterns
    if (lowerInput.includes('goal') || lowerInput.includes('objective') ||
        lowerInput.includes('chahiye') || lowerInput.includes('karna hai') ||
        lowerInput.includes('help') || lowerInput.includes('madad')) {

      if (lowerInput.includes('website') || lowerInput.includes('web')) {
        return `### 🎯 Website Development Goal Detected!

**Main kya karunga:**
1. **Planning Phase**
   - Technology stack decide karunga (Next.js, React, etc.)
   - Features ki priority set karunga
   - Design mockup suggestions dunga

2. **Development Phase**
   - Step-by-step code implement karunga
   - Responsive design ensure karunga
   - Performance optimize karunga

3. **Testing & Deployment**
   - Testing strategy suggest karunga
   - Deployment options bataunga (Vercel, Netlify)
   - SEO optimization tips dunga

**Next Step:** Mujhe batao:
- Website ka purpose kya hai?
- Kaun se features chahiye?
- Koi specific design preference hai?

Ek baar detail mil jaaye, main immediately kaam shuru kar dunga! 🚀`
      }

      if (lowerInput.includes('content') || lowerInput.includes('write') ||
          lowerInput.includes('article') || lowerInput.includes('blog')) {
        return `### ✍️ Content Creation Goal Detected!

**Meri Strategy:**

**Phase 1: Research & Planning**
- Topic ko deeply research karunga
- Target audience identify karunga
- Key points outline karunga

**Phase 2: Content Creation**
- Engaging introduction likhunga
- Clear, actionable content provide karunga
- Examples aur case studies add karunga

**Phase 3: Optimization**
- SEO-friendly banaunga
- Readability improve karunga
- CTA (Call to Action) add karunga

**Batao:**
- Topic kya hai?
- Audience kaun hai?
- Tone formal ya casual?
- Length kitna chahiye?

Details batao aur main high-quality content create kar dunga! 📝✨`
      }

      if (lowerInput.includes('business') || lowerInput.includes('startup') ||
          lowerInput.includes('idea')) {
        return `### 💡 Business/Startup Goal Detected!

**Mera Approach:**

**1. Idea Validation**
- Market research karunga
- Competition analysis dunga
- Unique value proposition identify karunga

**2. Strategy Building**
- Business model suggest karunga
- Revenue streams plan karunga
- Growth roadmap banaunga

**3. Execution Plan**
- MVP (Minimum Viable Product) define karunga
- Resource requirements bataunga
- Timeline suggest karunga

**4. Marketing Strategy**
- Target audience profile banaunga
- Marketing channels suggest karunga
- Budget-friendly tactics bataunga

**Mujhe batao:**
- Idea kya hai?
- Problem kya solve kar raha hai?
- Target market kaun hai?
- Budget kya hai?

Sab detail do, main complete action plan tayaar karunga! 🚀💼`
      }

      if (lowerInput.includes('learn') || lowerInput.includes('sikh') ||
          lowerInput.includes('study') || lowerInput.includes('padh')) {
        return `### 📚 Learning Goal Detected!

**Mera Teaching Approach:**

**Step 1: Foundation Building**
- Basics se shuru karunga
- Core concepts clearly explain karunga
- Real-world examples dunga

**Step 2: Practical Application**
- Hands-on exercises provide karunga
- Projects suggest karunga
- Common mistakes avoid karne ke tips dunga

**Step 3: Advanced Topics**
- Gradually difficult concepts introduce karunga
- Best practices bataunga
- Resources aur references dunga

**Step 4: Practice & Mastery**
- Practice problems dunga
- Review aur feedback dunga
- Next steps guide karunga

**Batao:**
- Kya seekhna hai?
- Current level kya hai (beginner/intermediate/advanced)?
- Time availability kitni hai?
- Preferred learning style kya hai?

Details share karo, main personalized learning path create kar dunga! 🎓✨`
      }

      // Generic goal
      return `### 🎯 Goal Understood!

**Mera Action Plan:**

**Step 1: Deep Analysis**
- Aapke requirement ko detail mein samjhunga
- Constraints aur limitations identify karunga
- Success criteria define karunga

**Step 2: Strategic Planning**
- Multiple approaches evaluate karunga
- Best solution select karunga
- Step-by-step execution plan banaunga

**Step 3: Implementation**
- Systematically har step execute karunga
- Progress track karunga
- Problems ko solve karte jaunga

**Step 4: Optimization**
- Results review karunga
- Improvements suggest karunga
- Better alternatives explore karunga

**Ab mujhe thoda aur detail do:**
- Exactly kya achieve karna hai?
- Timeline kya hai?
- Koi specific constraints hain?
- Success kaise measure karenge?

Complete information dedo, main immediately action mein aa jaunga! 🚀💪`
    }

    // Problem solving
    if (lowerInput.includes('problem') || lowerInput.includes('issue') ||
        lowerInput.includes('error') || lowerInput.includes('bug') ||
        lowerInput.includes('fix') || lowerInput.includes('solve')) {
      return `### 🔧 Problem Solving Mode Activated!

**Mera Troubleshooting Process:**

**Step 1: Problem Identification**
- Issue ko clearly define karunga
- Symptoms analyze karunga
- Root cause identify karunga

**Step 2: Solution Research**
- Multiple solutions explore karunga
- Pros and cons evaluate karunga
- Best approach select karunga

**Step 3: Implementation**
- Step-by-step solution implement karunga
- Testing karunga
- Edge cases handle karunga

**Step 4: Prevention**
- Future ke liye best practices suggest karunga
- Similar problems avoid karne ke tips dunga

**Problem detail mein batao:**
- Kya exactly issue hai?
- Kab start hua?
- Kya already try kiya?
- Error messages kya hain?

Complete details share karo, main optimal solution provide karunga! 🛠️✨`
    }

    // Code/Development
    if (lowerInput.includes('code') || lowerInput.includes('program') ||
        lowerInput.includes('develop') || lowerInput.includes('build') ||
        lowerInput.includes('create app') || lowerInput.includes('software')) {
      return `### 💻 Development Mode Activated!

**Mera Development Process:**

**Phase 1: Requirements Analysis**
- Functionality clearly define karunga
- Technical requirements gather karunga
- Architecture design karunga

**Phase 2: Technology Selection**
- Best tech stack suggest karunga
- Tools aur libraries recommend karunga
- Scalability consider karunga

**Phase 3: Implementation**
- Clean, readable code likhunga
- Best practices follow karunga
- Comments aur documentation add karunga

**Phase 4: Testing & Optimization**
- Edge cases test karunga
- Performance optimize karunga
- Security considerations handle karunga

**Batao:**
- Kya build karna hai?
- Target platform kya hai (web/mobile/desktop)?
- Koi specific tech preference hai?
- Key features kya honge?

Details do, main production-ready code deliver karunga! 🚀👨‍💻`
    }

    // Ideas/Creativity
    if (lowerInput.includes('idea') || lowerInput.includes('suggest') ||
        lowerInput.includes('creative') || lowerInput.includes('brainstorm')) {
      return `### 💡 Creative Brainstorming Mode!

**Mera Creative Process:**

**Step 1: Context Understanding**
- Domain aur industry research karunga
- Current trends analyze karunga
- Gap opportunities identify karunga

**Step 2: Idea Generation**
- Multiple unique ideas generate karunga
- Different angles explore karunga
- Innovative solutions think karunga

**Step 3: Evaluation**
- Feasibility check karunga
- Impact assess karunga
- Implementation difficulty estimate karunga

**Step 4: Refinement**
- Best ideas ko further develop karunga
- Action plans create karunga
- Next steps suggest karunga

**Context do:**
- Field/Domain kya hai?
- Kisne liye ideas chahiye?
- Koi specific constraints hain?
- Goal kya achieve karna hai?

Context share karo, main creative aur practical ideas dunga! 🎨✨`
    }

    // Planning/Strategy
    if (lowerInput.includes('plan') || lowerInput.includes('strategy') ||
        lowerInput.includes('roadmap') || lowerInput.includes('how to')) {
      return `### 📋 Strategic Planning Mode!

**Mera Planning Framework:**

**Step 1: Goal Definition**
- Clear objectives set karunga
- Success metrics define karunga
- Timeline estimate karunga

**Step 2: Resource Assessment**
- Available resources identify karunga
- Constraints consider karunga
- Requirements list karunga

**Step 3: Strategy Development**
- Multiple approaches evaluate karunga
- Risk assessment karunga
- Best path select karunga

**Step 4: Action Plan**
- Detailed roadmap create karunga
- Milestones set karunga
- Contingency plans banaunga

**Step 5: Execution Framework**
- Task breakdown karunga
- Priority assign karunga
- Progress tracking method suggest karunga

**Planning ke liye batao:**
- Main objective kya hai?
- Timeline kya hai?
- Resources available hain?
- Major constraints kya hain?

Complete picture do, main comprehensive strategy plan create karunga! 📊🎯`
    }

    // Greeting responses
    if (lowerInput.includes('hello') || lowerInput.includes('hi') ||
        lowerInput.includes('hey') || lowerInput.includes('namaste')) {
      return `### Namaste! 🙏

Main aapka AI Agent hoon - **smart, fast, aur results-oriented!**

**Main kya kar sakta hoon:**

🎯 **Task Execution**
- Complex tasks ko simple steps mein break karunga
- Efficiently execute karunga
- Best results deliver karunga

💡 **Problem Solving**
- Har problem ka solution dhundunga
- Multiple approaches suggest karunga
- Optimal path choose karunga

✍️ **Content Creation**
- High-quality content generate karunga
- Creative ideas provide karunga
- Professional output deliver karunga

📚 **Learning & Teaching**
- Complex topics easily explain karunga
- Step-by-step guide dunga
- Resources suggest karunga

🚀 **Strategy & Planning**
- Detailed roadmaps banaunga
- Action plans create karunga
- Goal achievement mein help karunga

**Abhi apna goal batao - main turant kaam shuru karta hoon!** 💪✨`
    }

    // Default intelligent response
    return `### Samjha! Let me help you with this 🚀

**Mera Approach:**

**Analysis:**
- Aapke request ko analyze kiya
- Key requirements identify ki hain
- Best solution approach plan kar raha hoon

**Action Plan:**
1. **Understanding** - Context aur requirements clear kar raha hoon
2. **Research** - Relevant information gather kar raha hoon
3. **Solution** - Optimal approach implement kar raha hoon
4. **Delivery** - Clear aur actionable output provide kar raha hoon

**Response:**
${generateContextualResponse(userMessage)}

**Next Steps:**
- Agar aur detail chahiye, batao
- Koi specific aspect deep dive karna ho, bolo
- Alternative approach chahiye, ask karo

Main hamesha optimize results ke liye kaam karta hoon! 💪✨

**Tip:** Agar aap:
- Koi goal set kar rahe ho → detailed plan dunga
- Problem solve kar rahe ho → step-by-step solution dunga
- Kuch create kar rahe ho → creative aur practical ideas dunga
- Kuch seekh rahe ho → clear explanations aur examples dunga

Bas clearly batao kya chahiye! 🎯`
  }

  const generateContextualResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes('?')) {
      return `Aapke sawal ka jawaab:

Mujhe thoda aur context chahiye to give you the most accurate and helpful response.

**Please specify:**
- What exactly do you want to know?
- Any particular aspect you're focused on?
- What's the end goal?

With more details, main targeted aur highly useful response de sakta hoon! 🎯`
    }

    return `Main aapke request par kaam kar raha hoon!

**Current Understanding:**
"${input}"

**To provide the best solution, agar aap:**
- More details de sako about your requirements
- Context clarify kar sako
- Expected outcome bata sako

...toh main aur bhi accurate aur comprehensive help kar paunga!

**Pro Tip:** Jitni clear aur detailed request hogi, utna better output milega! 💡`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setShowWelcome(false)

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsThinking(true)

    // Generate and display thinking steps
    const steps = generateThinkingSteps(input)
    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 600))
      setThinkingSteps(prev => [...prev, step])
    }

    await new Promise(resolve => setTimeout(resolve, 800))

    const response = await generateResponse(input)

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, assistantMessage])
    setIsThinking(false)
    setThinkingSteps([])
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto max-w-5xl h-screen flex flex-col p-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-2xl shadow-2xl p-6 mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-xl">
                <Brain className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">AI Agent</h1>
                <p className="text-purple-100 text-sm">Your Smart Assistant 🚀</p>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-300" />
                <span className="text-white text-sm font-semibold">Fast</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2">
                <Target className="w-4 h-4 text-green-300" />
                <span className="text-white text-sm font-semibold">Accurate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white/95 backdrop-blur-sm overflow-y-auto p-6 space-y-4">
          {showWelcome && messages.length === 0 && (
            <div className="text-center py-12 space-y-6">
              <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-full">
                <Bot className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                Apna goal batao – main AI Agent ki tarah kaam shuru karta hoon 🚀
              </h2>
              <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto mt-8">
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-all cursor-pointer"
                     onClick={() => setInput('Mujhe ek modern website banana hai')}>
                  <Lightbulb className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-bold text-gray-800 mb-2">💻 Development</h3>
                  <p className="text-sm text-gray-600">Website, app, ya code build karna hai?</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200 hover:border-green-400 transition-all cursor-pointer"
                     onClick={() => setInput('Mujhe content writing mein help chahiye')}>
                  <Target className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-bold text-gray-800 mb-2">✍️ Content Creation</h3>
                  <p className="text-sm text-gray-600">Articles, scripts, ya creative content?</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border-2 border-orange-200 hover:border-orange-400 transition-all cursor-pointer"
                     onClick={() => setInput('Mujhe problem solve karni hai')}>
                  <Zap className="w-8 h-8 text-orange-600 mb-3" />
                  <h3 className="font-bold text-gray-800 mb-2">🔧 Problem Solving</h3>
                  <p className="text-sm text-gray-600">Koi issue ya challenge solve karna hai?</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-all cursor-pointer"
                     onClick={() => setInput('Mujhe strategy aur planning mein help chahiye')}>
                  <Brain className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold text-gray-800 mb-2">📋 Planning & Strategy</h3>
                  <p className="text-sm text-gray-600">Roadmap ya action plan banana hai?</p>
                </div>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 chat-message ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.role === 'assistant' ? (
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown
                      components={{
                        h3: ({node, ...props}) => <h3 className="text-lg font-bold text-purple-700 mt-2 mb-3" {...props} />,
                        h4: ({node, ...props}) => <h4 className="text-base font-bold text-gray-800 mt-2 mb-2" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-bold text-gray-900" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-1" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal pl-5 space-y-1" {...props} />,
                        li: ({node, ...props}) => <li className="text-gray-700" {...props} />,
                        p: ({node, ...props}) => <p className="mb-2 text-gray-700" {...props} />,
                        code: ({node, ...props}) => <code className="bg-purple-100 text-purple-800 px-1 py-0.5 rounded" {...props} />,
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap">{message.content}</p>
                )}
                <p className="text-xs mt-2 opacity-70">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
              {message.role === 'user' && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
          ))}

          {isThinking && (
            <div className="flex gap-3 chat-message">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="max-w-[80%] rounded-2xl p-4 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200">
                <div className="space-y-3">
                  {thinkingSteps.map((step) => (
                    <div key={step.step} className="flex items-center gap-2 animate-pulse">
                      <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold">
                        {step.step}
                      </div>
                      <p className="text-sm text-gray-700 font-medium">{step.content}</p>
                    </div>
                  ))}
                  <div className="typing-indicator flex gap-1 mt-2">
                    <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                    <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                    <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="bg-white rounded-b-2xl shadow-2xl p-4 mb-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Apna goal ya task yahan type karo..."
              className="flex-1 px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-purple-500 text-gray-800 placeholder-gray-400"
              disabled={isThinking}
            />
            <button
              type="submit"
              disabled={isThinking || !input.trim()}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 font-semibold"
            >
              <Send className="w-5 h-5" />
              Send
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
