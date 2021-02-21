/*
此文件为Node.js专用。其他用户请忽略
 */
//此处填写京东账号cookie。
//注：github action用户cookie填写到Settings-Secrets里面，新增JD_COOKIE，多个账号的cookie使用`&`隔开或者换行
let CookieJDs = [
  'pt_key=AAJf6bjUADARzFoXDfy-44_rOPCDvEETugIZIk5nErEqL_dxodyuzdPUiuwzgLGvV54hzBp0wNQ;pt_pin=wdzYutOZYKvbfc;',//账号一ck,例:pt_key=XXX;pt_pin=XXX;
  'pt_key=AAJf9Sl2ADCCg12h-wV5iFoA1G2B3Kvehv4OWmB28pcKv5mfELWWY7DH2Z2HaSfwegHQSIHYcAE;pt_pin=t826764569;',//账号二ck,例:pt_key=XXX;pt_pin=XXX;如有更多,依次类推
  'pt_key=AAJf78-ZADDvCLpqMkRmIlTJUV6fBBygArDlUt8PmR6rLJVy4gyCa8In4rKl5x-8yFsi1e6sYoA;pt_pin=84259885-479878;',//账号三ck,例:pt_key=XXX;pt_pin=XXX;如有更多,依次类推
  'pt_key=AAJf9UssADDkRdshScXToakkRUsc6Wiwqs3txbuD9itnJhjn5H_IlzmgoMYiAaTaZ8Au_9FDgSI;pt_pin=jd_4aea340026bc1;',//账号四ck,例:pt_key=XXX;pt_pin=XXX;如有更多,依次类推
  'pt_key=AAJf-YcdADAhC3_n98Hx2slCFSgbm4DdmMPxqJvZYTZWO8lkeNdeNo5AFyYnhY4iMMPQnuE6sjc;pt_pin=4101852-469698;',//账号五ck,例:pt_key=XXX;pt_pin=XXX;如有更多,依次类推
  'pt_key=AAJf-EYjADCHFHTQ105RZVrV0pSjEl1bd8lR8c_EZaNlcdD5p5KKpWteKKCzjudkOFovR77kjvg;pt_pin=219868611-543289;',//账号六ck,例:pt_key=XXX;pt_pin=XXX;如有更多,依次类推
]
// 判断github action里面是否有京东ck
if (process.env.JD_COOKIE) {
  if (process.env.JD_COOKIE.indexOf('&') > -1) {
    console.log(`您的cookie选择的是用&隔开\n`)
    CookieJDs = process.env.JD_COOKIE.split('&');
  } else if (process.env.JD_COOKIE.indexOf('\n') > -1) {
    console.log(`您的cookie选择的是用换行隔开\n`)
    CookieJDs = process.env.JD_COOKIE.split('\n');
  } else {
    CookieJDs = [process.env.JD_COOKIE];
  }
}
CookieJDs = [...new Set(CookieJDs.filter(item => item !== "" && item !== null && item !== undefined))]
console.log(`\n====================共有${CookieJDs.length}个京东账号Cookie=========\n`);
console.log(`==================脚本执行- 北京时间(UTC+8)：${new Date(new Date().getTime() + new Date().getTimezoneOffset()*60*1000 + 8*60*60*1000).toLocaleString()}=====================\n`)
for (let i = 0; i < CookieJDs.length; i++) {
  const index = (i + 1 === 1) ? '' : (i + 1);
  exports['CookieJD' + index] = CookieJDs[i].trim();
}
