// aliyun.js
// 使用OpenAI SDK与阿里百炼平台的兼容模式API交互

import OpenAI from 'openai';
import { log } from '../../scripts/modules/utils.js';

/**
 * 为阿里百炼平台创建OpenAI客户端实例
 */
function createAliyunClient(apiKey, baseURL) {
  return new OpenAI({
    apiKey: apiKey,
    baseURL: baseURL || 'https://dashscope.aliyuncs.com/compatible-mode/v1', // 使用传入的baseURL或默认值
  });
}

/**
 * 生成文本响应
 */
export async function generateAliyunText({ apiKey, modelId, messages, maxTokens, temperature, baseURL, providerOptions }) {
  try {
    const client = createAliyunClient(apiKey, baseURL);
    
    // 构建请求参数
    const requestParams = {
      model: modelId, // 例如 'qwen-plus'
      messages: messages,
      max_tokens: maxTokens,
      temperature: temperature,
    };

    // 如果是research角色且启用了联网搜索
    if (providerOptions?.aliyun?.useWebSearch) {
      log('info', 'Enabling Aliyun web search for research role');
      requestParams.tools = [{
        "type": "web_search",
        "web_search": {
          "enable": true,
          "search_query": messages[messages.length - 1].content // 使用最后一条消息作为搜索查询
        }
      }];
    }

    const completion = await client.chat.completions.create(requestParams);

    return completion.choices[0].message.content;
  } catch (error) {
    log('error', `Aliyun text generation failed: ${error.message}`);
    throw error;
  }
}

/**
 * 流式生成文本响应
 */
export async function streamAliyunText({ apiKey, modelId, messages, maxTokens, temperature, baseURL, providerOptions }) {
  try {
    const client = createAliyunClient(apiKey, baseURL);
    
    // 构建请求参数
    const requestParams = {
      model: modelId,
      messages: messages,
      max_tokens: maxTokens,
      temperature: temperature,
      stream: true,
    };

    // 如果是research角色且启用了联网搜索
    if (providerOptions?.aliyun?.useWebSearch) {
      log('info', 'Enabling Aliyun web search for research role');
      requestParams.tools = [{
        "type": "web_search",
        "web_search": {
          "enable": true,
          "search_query": messages[messages.length - 1].content
        }
      }];
    }

    const stream = await client.chat.completions.create(requestParams);

    return stream;
  } catch (error) {
    log('error', `Aliyun stream text generation failed: ${error.message}`);
    throw error;
  }
}

/**
 * 生成结构化对象
 */
export async function generateAliyunObject({ apiKey, modelId, messages, maxTokens, temperature, schema, objectName, baseURL, providerOptions }) {
  try {
    const client = createAliyunClient(apiKey, baseURL);
    
    // 构建请求参数
    const requestParams = {
      model: modelId,
      messages: messages,
      max_tokens: maxTokens,
      temperature: temperature,
      functions: [{
        name: objectName,
        parameters: schema,
      }],
      function_call: { name: objectName },
    };

    // 如果是research角色且启用了联网搜索
    if (providerOptions?.aliyun?.useWebSearch) {
      log('info', 'Enabling Aliyun web search for research role');
      requestParams.tools = [{
        "type": "web_search",
        "web_search": {
          "enable": true,
          "search_query": messages[messages.length - 1].content
        }
      }];
    }

    const completion = await client.chat.completions.create(requestParams);

    const functionCall = completion.choices[0].message.function_call;
    return JSON.parse(functionCall.arguments);
  } catch (error) {
    log('error', `Aliyun object generation failed: ${error.message}`);
    throw error;
  }
}