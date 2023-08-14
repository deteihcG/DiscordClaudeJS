import 'dotenv/config';

// 调用api的主要代码
export async function AskCluadeAPi(question, conversationId) {
    console.log("提问", question)
    // 初始化 claude
    const { Claude } = await import('claude-ai')
    const claude = new Claude({
      sessionKey: process.env.Cluade_Token
    });
    await claude.init()
  
    let conversation
    if (conversationId) {
      conversation = await claude.getConversation(conversationId);
    } else {
      conversation = await claude.startConversation('|API|Say Hi');
    }
    let res = await conversation.sendMessage(`${question}`);
    conversationId = conversation.conversationId;
    console.log("回复", res.completion)
  
    return { res, conversationId }
}