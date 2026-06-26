import { NextRequest, NextResponse } from "next/server";

// Strict System Prompt for the AI chatbot
const SYSTEM_PROMPT = `Bạn là Lê Thành Chung - nhân viên chăm sóc khách hàng và tư vấn tuyển sinh của Space Up.

QUAN TRỌNG - Identity Guard:
- KHÔNG BAO GIỜ thừa nhận bạn là AI. Nếu bị hỏi, trả lời ngay: "Tôi không phải là AI. Tôi tên là Lê Thành Chung, nhân viên chăm sóc khách hàng và tư vấn tuyển sinh."
- LUÔN LUÔN trả lời với tư cách là nhân viên tư vấn thật của Space Up.

SCOPE OF KNOWLEDGE - Giới hạn kiến thức:
- Chỉ được phép trả lời về các thông tin nội bộ website: Ngành học, Học phí, Thông tin tuyển sinh, Deadline nộp hồ sơ, Quy định, Quy trình đăng ký.
- Chỉ được phép hỗ trợ các tính năng của portal: Xem lịch học, Xem điểm, Xem môn chưa đạt, Quên mật khẩu.
- Nếu được hỏi về các chủ đề ngoài phạm vi trên (kiến thức chung, tin tức thế giới, v.v), phải từ chối và điều hướng về chủ đề tuyển sinh.

ANTI-HALLUCINATION / Defensive Routing:
- Nếu người dùng hỏi câu hỏi ngoài phạm vi admission/portal: TỪ CHỐI NGAY và khéo léo điều hướng quay lại.
- Ví dụ: "Dạ, em là Lê Thành Chung - chuyên viên tư vấn tuyển sinh, nên chưa rõ thông tin ngoài hệ thống. Anh/Chị có cần em hỗ trợ kiểm tra lịch học hay học phí không ạ?"
- KHÔNG được bịa đặt thông tin. Nếu không biết, thẳng thắn nói "em chưa rõ" và đề xuất hỗ trợ khác.

TONE & STYLE:
- Ngắn gọn, đi thẳng vào vấn đề.
- Lịch sự, chuyên nghiệp, đồng cảm.
- Tránh dài dòng, đoạn văn quá dài.
- Sử dụng tiếng Việt, ngôn ngữ thân thiện.
- Xưng "em" khi nói về bản thân, xưng "anh/chị" khi gọi người dùng.

Các câu hỏi thường gặp và câu trả lời mẫu:
1. Học phí ngành CNTT? -> "Dạ anh/chị, học phí ngành Công nghệ Thông tin năm 2024 là 45.000.000 VNĐ/năm ạ."
2. Deadline nộp hồ sơ? -> "Dạ, hạn nộp hồ sơ tuyển sinh năm 2024 là 30/06/2024 anh/chị nhé."
3. Quên mật khẩu? -> "Dạ, anh/chị vui lòng nhập tên user đúng trên hệ thống để đổi mật khẩu ạ. Nếu không nhớ, liên hệ hotline để được hỗ trợ."
4. Xem lịch học? -> "Dạ, để xem lịch học anh/chị đăng nhập vào Portal sinh viên -> mục Lịch học nhé."
5. Xem điểm? -> "Dạ, để xem điểm anh/chị vào Portal -> mục Bảng điểm ạ."
6. Môn chưa đạt? -> "Dạ, anh/chị vào Portal -> mục Môn học chưa đạt để xem chi tiết các môn cần học lại nhé."`;

// List of keywords that are out of scope
const OUT_OF_SCOPE_KEYWORDS = [
  "thời tiết",
  "tin tức thế giới",
  "chính trị",
  "tôn giáo",
  "bóng đá",
  "thể thao",
  "âm nhạc",
  "phim",
  "game",
  "giải trí",
  "toán học",
  "vật lý",
  "hóa học",
  "sinh học",
  "lịch sử thế giới",
  "địa lý thế giới",
  "ai là gì",
  "bạn là ai",
  "chatgpt",
  "openai",
];

function isOutOfScope(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  return OUT_OF_SCOPE_KEYWORDS.some((keyword) => lowerMessage.includes(keyword));
}

function getOutOfScopeResponse(): string {
  return "Dạ, em là Lê Thành Chung - chuyên viên tư vấn tuyển sinh, nên chưa rõ thông tin ngoài hệ thống ạ. Anh/Chị có cần em hỗ trợ kiểm tra lịch học, học phí hay thông tin tuyển sinh không ạ?";
}

function isIdentityQuestion(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  return (
    lowerMessage.includes("bạn là ai") ||
    lowerMessage.includes("bạn là ai?") ||
    lowerMessage.includes("you are ai") ||
    lowerMessage.includes("you are a robot") ||
    lowerMessage.includes("bạn là robot") ||
    lowerMessage.includes("bạn là AI") ||
    lowerMessage.includes("bạn là artificial") ||
    lowerMessage.includes("mày là ai") ||
    lowerMessage.includes("em là ai")
  );
}

function getIdentityResponse(): string {
  return "Tôi không phải là AI. Tôi tên là Lê Thành Chung, nhân viên chăm sóc khách hàng và tư vấn tuyển sinh của Space Up. Rất vui được hỗ trợ anh/chị!";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Tin nhắn không hợp lệ" },
        { status: 400 }
      );
    }

    // Check for identity question first
    if (isIdentityQuestion(message)) {
      return NextResponse.json({
        response: getIdentityResponse(),
      });
    }

    // Check if message is out of scope
    if (isOutOfScope(message)) {
      return NextResponse.json({
        response: getOutOfScopeResponse(),
      });
    }

    // Build messages for LLM API
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...(history || []).slice(-6), // Keep last 6 messages for context
      { role: "user", content: message },
    ];

    // Call LLM API (replace with actual API endpoint)
    // This is a placeholder - replace with your actual LLM API call
    const llmResponse = await callLLMApi(messages);

    return NextResponse.json({
      response: llmResponse,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Có lỗi xảy ra. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}

async function callLLMApi(messages: Array<{ role: string; content: string }>): Promise<string> {
  // Placeholder for actual LLM API call
  // Replace with your actual LLM API (OpenAI, Anthropic, etc.)

  const API_KEY = process.env.LLM_API_KEY;
  const API_ENDPOINT = process.env.LLM_API_ENDPOINT || "https://api.openai.com/v1/chat/completions";

  if (!API_KEY) {
    // Fallback: simple keyword matching for demo
    return handleFallbackResponse(messages[messages.length - 1].content);
  }

  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error("LLM API error");
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "Em xin lỗi, có lỗi xảy ra. Anh/Chị vui lòng thử lại.";
  } catch (error) {
    console.error("LLM API call failed:", error);
    return handleFallbackResponse(messages[messages.length - 1].content);
  }
}

function handleFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  // Keyword matching for common questions
  if (lowerMessage.includes("học phí") || lowerMessage.includes("bao nhiêu")) {
    return "Dạ anh/chị có thể tham khảo mục Ngành học trên website để xem chi tiết học phí từng ngành ạ. Nếu cần hỗ trợ cụ thể, anh/chị cho em biết ngành quan tâm nhé!";
  }

  if (lowerMessage.includes("đăng ký") || lowerMessage.includes("nộp hồ sơ")) {
    return "Dạ, để đăng ký anh/chị truy cập mục Đăng ký trên website và điền thông tin theo hướng dẫn ạ. Deadline nộp hồ sơ năm 2024 là 30/06/2024.";
  }

  if (lowerMessage.includes("quên mật khẩu") || lowerMessage.includes("đổi mật khẩu")) {
    return "Dạ, anh/chị vui lòng nhập tên user đúng trên hệ thống để đổi mật khẩu ạ. Nếu không nhớ tên user, liên hệ hotline để được hỗ trợ nhé!";
  }

  if (lowerMessage.includes("lịch học")) {
    return "Dạ, để xem lịch học anh/chị đăng nhập vào Portal sinh viên -> mục Lịch học nhé. Cần hỗ trợ gì thêm không ạ?";
  }

  if (lowerMessage.includes("điểm") || lowerMessage.includes("gpa")) {
    return "Dạ, để xem điểm anh/chị vào Portal -> mục Bảng điểm ạ. Cần em hỗ trợ gì không?";
  }

  if (lowerMessage.includes("chưa đạt") || lowerMessage.includes("môn rớt")) {
    return "Dạ, anh/chị vào Portal -> mục Môn học chưa đạt để xem chi tiết các môn cần học lại nhé. Cần hỗ trợ thêm không?";
  }

  if (lowerMessage.includes("ngành") || lowerMessage.includes("khối")) {
    return "Dạ, Space Up có các ngành: CNTT, Kế toán, Quản trị Kinh doanh, Ngôn ngữ Anh, Kỹ thuật Cơ khí, Kỹ thuật Điện. Anh/chị quan tâm ngành nào ạ?";
  }

  // Default fallback
  return "Dạ, cảm ơn anh/chị đã liên hệ! Em là Lê Thành Chung - tư vấn tuyển sinh Space Up. Anh/Chị cần hỗ trợ gì ạ?";
}