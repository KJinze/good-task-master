import OpenAI from "openai";
// const client = new OpenAI({apiKey:"0b54c47f1077cd6cb9980257b6c2a740.6g1UKO78D1byIgC3",baseURL:"https://open.bigmodel.cn/api/paas/v4/"});
// const model_id = "glm-4-flash-250414";
const client = new OpenAI({apiKey:"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJHcm91cE5hbWUiOiJramluemUiLCJVc2VyTmFtZSI6ImtqaW56ZSIsIkFjY291bnQiOiIiLCJTdWJqZWN0SUQiOiIxOTE2NzY4ODMyNDI5NDk4OTI0IiwiUGhvbmUiOiIxODMxOTQ3OTQyMSIsIkdyb3VwSUQiOiIxOTE2NzY4ODMyNDIxMTEwMTc1IiwiUGFnZU5hbWUiOiIiLCJNYWlsIjoiIiwiQ3JlYXRlVGltZSI6IjIwMjUtMDQtMzAgMTA6NDg6NDAiLCJUb2tlblR5cGUiOjEsImlzcyI6Im1pbmltYXgifQ.O7DJowZT8xuxZ1VigHB9xZ_4Gm1IIWC6WzvAReEq3Ojt7qqyzt83fSi4jCy8eFxuDki1jTb_h1exRw--cK5WZN4fwIGM6uTMk9t6Tzh3Jyb2dEc7PKt5TDA-LoOfl4uDr05gf-sSrZrwkG25uPJ4BYVjKI-1wUSDBpowqoV5QVRw_hw6RUt-scddLVXmR4kEOZ2zu7jH4joWx4Zo4TZ1pGTTwaYLqmBOln0Cvs02k-Ribk6TwZuQty6Uk1yBqR0o9chNVxsK8145QwKVKiahqVEvjOvgoXY1EUQcN3x2K5_isvuOw7wy8igEuDKB2LM37QchCKEuTVk3Yo5mibTnUg",
    baseURL:"https://dashscope.aliyuncs.com/compatible-mode/v1"});
const model_id = "qwen-plus";
const completion = await client.chat.completions.create({
    model: model_id,
    messages: [
        {
            role: "user",
            content: "你好你是谁？",
        },
    ],
});

console.log(completion.choices[0].message.content);


