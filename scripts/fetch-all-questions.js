#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');

const COOKIE = 'jrose=DBBF7D9EB497E78A779A716A3BD0CD55.mooc-p4-2406510209-3mwkn; k8s=1762514296.359.18707.465430; route=5052ecf6e7d4195bf80fb406c3095b7d; DSSTASH_LOG=C_0-UN_0-US_432778166-T_1762514279951; KI4SO_SERVER_EC=RERFSWdRQWdsckJiQXZ5ZmdkWW10bGRpSXNDMUM0SFZCR1NvZkhjOEZhWWhmSkRMLzg4YjBScCtm%0ARXRPZDc1Q0RtU2djWlRjU2NTVQp1NG13bWtscWxSdmhoaHlFWmsvOWFCRC9rL0V0U2w0N3dlclJt%0ARDFtdWE0OVd4bXBHSTZoYXFNdm1QcnBMbHJtTy9vcmVxUmxXMXNpCjh6SW50aFAzak5FTk5mcjY0%0AcFYybkZGYmNSQ0hwUlRUMkdjeFY0QU1HMjM2VW5lWUo0YkVyRGdybjU1SllYYWo3SndVT3NOTG04%0ASnMKWWREb1NyWlpZWEFUK1dXTkNYMHVBME13d0FhQkNHWjBIRzJGYjF5Um5tQ3cxN053ZU5tck0w%0AaUVETm5BWHpOQ0RuTnM5WU54TWRhNwpRVHdDRmExVWo2MEV2TTd6QWs2VzZLa1VvZTMzVnN5WUNU%0AVUxnd2tBckZPUmxpOVdSWWlVMFJ4NTZUWUNUcGJvcVJTaDdmb3Y0OFl1CjhhSVZjUkxlbmFLZHQ2%0Aaz0%2FYXBwSWQ9MSZrZXlJZD0x; UID=432778166; _d=1762514279949; _industry=0; _tid=384100739; _uid=432778166; chaoxinguser=1; cx_p_token=1e9dcd13af4dfca56da76746cace3345; fidsCount=1; latotvp=0; p_auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI0MzI3NzgxNjYiLCJsb2dpblRpbWUiOjE3NjI1MTQyNzk5NTEsImV4cCI6MTc2MzExOTA3OX0.ZCHj1DrcAK1Uz4nC3xZKll-YDitSm3KQ5lqWWww4yX8; sso_puid=432778166; sso_role=0; sso_t=1762514279949; sso_v=ef7866083ae3d214a8d1c41c19dff678; uf=f9866f9a46b70622811ad90a1302cffc56a348d7a12e2c197a4fb73fc637584904a83ed1e3efba801e2370552faf0326455a975eb6e68a815cf121817f5c2c62552726b105e1861b713028f1ec42bf71b1188854805578cc930ed5cd24cf652302a16d2c5e3283f68f2db9dc85d4fb9e358a883c6a06eab36a65dc0da7677ec44df7ff280fcb29d10d8a4c92b12beb4be6e6e583db0e77256ad68a016d3efa9c941095173d43e835e7fafd565af53bf2; uname=\"\"; vc3=D4Vv%2B8W7kMqTehIWnjPqYH465kPBSqn2A13iRfZcBDm91Lu6nMBLWdOEVD%2FvchQeRaTer%2FAwjjOPqpTwIkLxQ5AJCFxuU2JOcM%2FrDy7PK8D6iCHLagjn%2Fn27PUJEkd47lk4sP3X5kWTSQjcm3MDCnvJy3c0Sk9r%2Bwamzph7dqyU%3D12867aff6823a1a40830ba45d0e94bae; xxtenc=d76578815cb6c71d577e3fea12cb306e';

const USER_AGENT = 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 (schild:c3086199710b3f037c7a933a919432b9) (device:iPhone17,2) Language/zh-Hans com.ssreader.ChaoXingStudy/ChaoXingStudy_3_6.7.0_ios_phone_202510242235_310 (@Kalimdor)_5261913286692257814';

const BASE_URL = 'https://mooc1-api.chaoxing.com/mooc-ans/work/phone/doHomeWork';
const PARAMS = {
  courseId: '253005396',
  classId: '122331352',
  workId: '47765867',
  workAnswerId: '54536440',
  knowledgeid: '0',
  enc: '1566b35702fd79e88edd12969a235048',
  mooc: '1',
  source: '0',
  keyboardDisplayRequiresUserAction: '1'
};

/**
 * 判断是否为判断题
 */
function isTrueFalseQuestion(html) {
  return html.includes('class="pad30"') && html.includes('data="true"');
}

/**
 * 解析判断题
 */
function parseTrueFalseQuestion(html, index) {
  try {
    // 提取题干
    const questionMatch = html.match(/<div class="ans-cc timuStyle[^>]*>([\s\S]*?)<\/div>/);
    const question = questionMatch ? questionMatch[1].replace(/<[^>]*>/g, '').trim() : '';

    // 提取正确答案（data="true" 对应 A，data="false" 对应 B）
    let correctAnswer = '';
    const trueMatch = html.match(/<span\s+data="true"[\s\S]*?>(A|B)<\/span>/);
    if (trueMatch) {
      correctAnswer = trueMatch[1];
    }

    const options = {
      A: '对',
      B: '错'
    };

    if (question && correctAnswer) {
      return {
        id: index + 1,
        type: 'truefalse',
        question,
        options,
        correctAnswer
      };
    }
    return null;
  } catch (err) {
    return null;
  }
}

/**
 * 解析单选题
 */
function parseSingleChoiceQuestion(html, index) {
  try {
    // 提取题干
    const questionMatch = html.match(/<div class="ans-cc timuStyle[^>]*>[\s\S]*?<\/span>([\s\S]*?)<\/div>/);
    const question = questionMatch ? questionMatch[1].replace(/<[^>]*>/g, '').trim() : '';

    // 提取选项和答案
    const options = {};
    const optionRegex = /orichoice="([A-D])"[\s\S]*?<div[^>]*id="[A-D]"[^>]*class="centerSpan[^>]*>([\s\S]*?)<\/div>/g;
    let match;

    while ((match = optionRegex.exec(html)) !== null) {
      const choice = match[1];
      const text = match[2].replace(/<[^>]*>/g, '').trim();
      options[choice] = text;
    }

    // 提取正确答案
    const answerMatch = html.match(/<div class="answerRight[\s\S]*?<span>([A-D])<\/span>/);
    const correctAnswer = answerMatch ? answerMatch[1] : '';

    // 只有当有有效数据时才返回
    if (question && Object.keys(options).length === 4 && correctAnswer) {
      return {
        id: index + 1,
        type: 'single',
        question,
        options,
        correctAnswer
      };
    }
    return null;
  } catch (err) {
    return null;
  }
}

function parseQuestion(html, index) {
  try {
    // 判断题目类型并解析
    if (isTrueFalseQuestion(html)) {
      return parseTrueFalseQuestion(html, index);
    } else {
      return parseSingleChoiceQuestion(html, index);
    }
  } catch (err) {
    console.error(`解析第 ${index + 1} 题失败:`, err.message);
    return null;
  }
}

function fetchQuestion(index) {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams({
      ...PARAMS,
      index: index.toString()
    });

    const url = `${BASE_URL}?${params.toString()}`;

    const options = {
      hostname: 'mooc1-api.chaoxing.com',
      path: `/mooc-ans/work/phone/doHomeWork?${params.toString()}`,
      method: 'GET',
      headers: {
        'Host': 'mooc1-api.chaoxing.com',
        'Cookie': COOKIE,
        'User-Agent': USER_AGENT,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh-Hans;q=0.9'
      }
    };

    https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const question = parseQuestion(data, index);
          resolve(question);
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject).end();
  });
}

async function fetchAllQuestions(total = 130) {
  const allQuestions = [];
  const failed = [];

  console.log(`\n开始采集 ${total} 道题目...\n`);

  for (let i = 0; i < total; i++) {
    process.stdout.write(`采集进度: ${i + 1}/${total}\r`);
    
    try {
      const question = await fetchQuestion(i);
      if (question) {
        allQuestions.push(question);
      } else {
        failed.push(i);
      }
      // 延迟以避免速率限制
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (err) {
      console.error(`\n采集第 ${i} 题失败:`, err.message);
      failed.push(i);
    }
  }

  console.log(`\n\n✅ 采集完成！\n`);
  console.log(`成功: ${allQuestions.length} 题`);
  if (failed.length > 0) {
    console.log(`失败: ${failed.length} 题 (索引: ${failed.join(', ')})`);
  }

  return allQuestions;
}

function saveQuestions(questions) {
  const outputPath = path.join(__dirname, '../data/questions.json');
  fs.writeFileSync(outputPath, JSON.stringify(questions, null, 2), 'utf-8');
  console.log(`\n已保存 ${questions.length} 道题目到 ${outputPath}\n`);
}

async function main() {
  try {
    const questions = await fetchAllQuestions(130);
    if (questions.length > 0) {
      saveQuestions(questions);
      console.log('🎉 题目采集成功！');
      console.log(`\n可以运行: ./scripts/dev.sh 启动应用\n`);
    } else {
      console.log('❌ 未能采集任何题目，请检查 Cookie 是否过期');
    }
  } catch (err) {
    console.error('采集失败:', err);
    process.exit(1);
  }
}

main();
