/*
母婴-跳一跳
活动入口: 首页-母婴馆-跳一跳
没有添加助力环节，本期活动合计京豆50W;
新手写脚本，难免有bug，能用且用。

后续发布脚本均有加密
因为我介意别人把我脚本里的助力改了。
如果不愿意助力，可以直接下载脚本到本地，通过修改helpAhtor这个参数来关闭助力请求。
请不要修改我的助力。
脚本内置了一个给作者任务助力的网络请求，默认开启，如介意请自行关闭。
助力活动链接： https://h5.m.jd.com/babelDiy/Zeus/4ZK4ZpvoSreRB92RRo8bpJAQNoTq/index.html
参数 helpAuthor = false

已支持IOS双京东账号,Node.js支持N个京东账号
脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
============Quantumultx===============
[task_local]
#母婴-跳一跳
5 8,14,20 22-27 2 * https://raw.githubusercontent.com/i-chenzhe/qx/main/jd_jump-jump.js, tag=母婴-跳一跳, enabled=true
================Loon==============
[Script]
cron "5 8,14,20 22-27 2 *" script-path=https://raw.githubusercontent.com/i-chenzhe/qx/main/jd_jump-jump.js,tag=母婴-跳一跳
===============Surge=================
母婴-跳一跳 = type=cron,cronexp="5 8,14,20 22-27 2 *",wake-system=1,timeout=3600,script-path=https://raw.githubusercontent.com/i-chenzhe/qx/main/jd_jump-jump.js
============小火箭=========
母婴-跳一跳 = type=cron,script-path=https://raw.githubusercontent.com/i-chenzhe/qx/main/jd_jump-jump.js, cronexpr="5 8,14,20 22-27 2 *", timeout=3600, enable=true

*/
const $ = new Env('母婴 - 跳一跳');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
let cookiesArr = [], cookie = '', message = '';
let helpAuthor = true;//为作者助力的开关
const ACT_API = 'https://sendbeans.jd.com/jump/';
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
    let cookiesData = $.getdata('CookiesJD') || "[]";
    cookiesData = JSON.parse(cookiesData);
    cookiesArr = cookiesData.map(item => item.cookie);
    cookiesArr.reverse();
    cookiesArr.push(...[$.getdata('CookieJD2'), $.getdata('CookieJD')]);
    cookiesArr.reverse();
    cookiesArr = cookiesArr.filter(item => !!item);
}
   var _0xodN='jsjiami.com.v6',_0x4be3=[_0xodN,'w4zCtMKYwrbCqw==','wrJka2pO','wqdeSyrDow==','wpEHQ8KZOg==','wrHCq1RBEsObAC8Jcl/Duj8ufcOiDw==','woRaBsORw4o=','aRcmYRk=','wodxU8Oyw7AHQ8KLwrXDlSXChhnChMKmw4bCjGPCt8O3H8KOR8Ojwq02w5IDwonDtMOew4pjwpJ/JcOdwrrDtDY1wogrIDjCoMKaw4TDoAYhYsKgPmXCtMKjw6FKayfCmMOMw7zDicOgwpbCk8OXH8K3wpzCpD4AJRPCn8OUwojCqE/CicOGcMO5esOURcKpwrrCnDjDlcKOw4nDm8OCw4XCtsOyTMOmXFMwbMKew5sMZ8O8w45WQcOQw5MGw6rDscO0QjBbXVMhM8KAP8KWwrPDpmkYwp7CnMKFZypfw4rDgcKOwooLw6HDpcK/I1MXHhjChsOfw5LChQknQMKJwp3CpsOJKijDrSLDj8Ksw5HDoSEJRFwPw5rCqVrCscOpw74xw4V1NEDDlsKnw55GJcOHw58QwpbDocK0w7xHOsKZwoopasOuZsOxwpsIwoLCt8OBXHEgXxQAGMOVwozCnsKsw7zDr8Obw4hSO8OwEMKYwpddT8KIfcOCwpJvw58fKMOlccOMw7LCisOdw5TDl8KVw7gGMcOaQMKhw5PCnh3CsHnDqsKdw4zDg1LDjQNsw6xvPS3DjVDCribClcKfw7DClkXDnEvCiA==','wqpxbWlYwqDCgg3DpcKhEMK7c8KoFmMLw7fDtsOLPcKQGMKPACDDncKZw7TCvcOgw7p6wqJ0w7UbwoZ/wocoJHfDplbDtD7CuAMOw73DksOpw7PDijAwwqbCj8KybQB3WcOiXE7DkDduFMO3McK3L8Kxw5UTV8O8woc+F8OGcMOhw5/DtMK6w6YGXsK2VcKJLcOuInY2N8KyR8KSfHHChg==','Qj3DhcKKLA==','wpnCsGrDicOORsKIaMKUwrUKXMOJKT3CljnCk8KUX1jDhMOmAH9FwqLCksOMwpUqd11lwrjCm8ODMcKIM23CngPCiFFO','wrlLb8Kew6IHWsOVwofDnsOgw7wMworDkcOaTQXDocKATjDDh8Obw7wVw4BvKMOvw4xKwr91w706wr06OsO7','w64nbGpOw6jDvUvDrsK2BMO0f8K/VC4Ew7HDvsKKK8OMDcKCWULDl8KMwrLCgsOrw7tfw6gyw5w5w51Lw4pvZRTCugM=','dyXClSw=','w4w5bjM4','w7B2ecKrJA==','wrFxa3BFw73DhETDtA==','SktBwrM=','w4DCtTRGw7U=','YEdYbsKa','w6vCqcKICcK/','UVN5XA==','wrFjXEh5','wqrCjEpQcw==','w67DocOJw4Q=','wrzCrUVDZsKn','wrvCscKwCcOP','C8KsdFc=','OhPDu35T','wrhBeG1K','VDjDlMKH','wqjDt8KFFcOk','woRBZwI=','w40mwpY=','dgoTVz56','QlNkSQ==','w47Dr8O4','VzzDlMKkD8OBdTDDh8OnKUJKCQ==','wptmfHXDng==','w5s9aA==','w7DDmMOnw6lo','wq3CmsK2','5b+U5bup77yn','Qy3DksKPBMOHcgTDmw==','PsOxw63CpRk=','wpbDscKiGcOC','w6bDpcOTw4JpwrE=','5p+16L2i6LyJ6KK16I6r5by85Lqu5Lin5aW35Yqk7760YQ==','w7jClz5P','wofCjzU=','PRbCnit2','d3zCoDVa','w5/kuanosYLCoA==','w5grdio+','EWbDssON','w4vDjXI=','5by35biK77yX','cwzCkyFO','wq16THrDhg==','w48tfyM4wr/Dtw==','wp9PaQ==','5pC/5L+M5ouG5Yun','CMO8eMOGwpbDpA==','TkTCoBFZ','wrVZMsODw6/DhWdSw7bCiQ==','5ZC75ZKAwqLpgZ/liqjkuIXotIfpmqo=','5b625aS75ae955OE6LSl6Zms','5ZGE5ZK8wrPpgbLliK/kuY3ngrPlvZA=','5b6S5aeQ5omJ5b2Q','5bWj57u05Yi56L2W57qu54Ks776c6IGg5b6G56yz5b2j5raJ5YuS57qc5pyY55Gv5Yi+5Lu96LGn44Ks','wrnClsKlCsON','w7bCn8KAGcKKMMK0wp8=','wooNaMOXw5Q=','wrTCqMOY','w7UFK8Kqw5Q=','RjBRwpXCvg==','wod2RiDDsgXDlB0Lw5xRw6t4','w7QKw6XDtsOAJMOkwrzDgQ==','dQsBSw==','w7gsworDkWTCrcKzw6hj','NFrDow==','TUVbwrM=','w4dxw5gueg==','AXQL','FsKnaUDDkw==','wrTCosORQMKTJA==','SlFBwq8=','wp5WwojDmTLDs0do','YhEdRzhAalDDpw==','w7smwpbDgX7CisK8w7plC8OQ','wqtZNA==','CsKQMMK6wqw=','XDVQwqLCiw==','BmzDtQ==','w5zCsiLCqcKL','XDbDhw==','5byH5bmG772o','w6gTP8KCw78FQcO9wp8=','w6bClyFZw70=','Xkp0wr/CiA==','w4bDocOrVGw=','wot8XsO2w6VO','w6w3woTDgXI=','wp4jL1lrwos9aA==','L8Obw4vCoDzDn8OHFsKWwrwgKUo=','wrAvTMKpLcKs','czPClj0=','KxjCiy5aFCvCmhvDrQ==','DGzDpcOQw6/CosOEw7s=','wpNwSzDDlRs=','w5bDucOvUA==','w79+w6sAVMOvw5DCtw==','w702woPDk0PChcKuw6U=','NMKRBcKnwp3Cjg==','woFgVyE=','DcK4ZlA=','NRjCjQ93BA==','E1R9AMOGw6rCqcK2wrI=','Cn4Y','w5YQwq7DpHs=','RDHDksKJHcOkcgHDhw==','wpNNTA==','w7rDocOPw5Z4','wqQpVsOxw6/CqsOQwr1+','wpl2QA==','5pCa5YqE5Lis','w7cMw6nDt8OjAsOjwrTDmg==','54Cbworlv4zlibjmoKPmlrs=','PxHDu1Y=','wpXDosK/HMO4HMKqfQ==','w63DssOUw4FTwqzCug==','JlUNw78eaQrDiA==','w5A3ew==','wpfDosKkF8ODP8KpYSVYw5Ur','PsKXDsKWworCjg==','fxHCmncjEy7CkUU=','w7gmwpE=','wq4Ma8KPIw==','w7cKw57Ds8OABg==','5b+x5biY77yU','woXDksKrwop5','5omu6KCT5Lu85YmE','PsKXDg==','w6/DssOPw4pvwpTCsiRUw5rDtsK5','wq5qflxZw6g=','w4nCsDXCkMKtwrrCtAXDkMOHw4Q=','QmNlwoTCqA==','wqY+UA==','woo4V8Orw7Q=','IsK4eEbDqg==','5b6Q5bij776V','w7rCisOaOhggD2Z5','KxHDvURy','wokScMOnw4U=','w7huw6IZdsOlw4rCu8O8wqXDsMOhSMO5w44yw7FY','w7zCjcONIT8pAG8=','wpdSwpjDkQ==','wp7Dv8Kx','BHvDs8OWw77ChsOPw61FUMOBw5U=','wrHDk8OpXcOqw7E=','aC93wonCr8OTX8OlCl7DtsKcw44kw7ts','YgQbU2cpYFPDri5rw7bDiCXDn8KkQQ==','w5c9eTBwwq3DqDMRw5A=','w4c6GA==','wqpxbWlYwqDCgg3DvsOxUMKyP8KnEyMbwrbDscKAccKSFcKHQwDDncKTwq/DiMOxw657w6Jvw4Y+w5ZAwo9wI1DDuV/CiUPDrV87wpLCjcO/wqHCikpBw4fDscO7VRAsDcK8FhvCmCk2UMKqe8O7NcKwwppDR8ObwrxiEsObdMOv','bFBucsK5','w7pUw7wmTg==','KATDvV55Q8OLLsOr','KBXDoVN1QcODJsOhwrV5wqjCuhjCpAw=','w5XDqi4=','w6fCpsOcU8KOOsOAwrPDtR7DjMO6I8Kj','K24lNMKZ','wp9bcDLDiA==','wolIIxXDmg==','wpRaTVvDuQ==','w67ChMOBI1pnAmVmw7bChGtxVwkiwq4=','wp7CtXTDhsOTTMKGcsK0wr5ZEMOWLgLCinzChMKUZVXCvsOlCWwKwq7DkcKIw4Y4Jg==','XV5bwrfDk8Ogw5o2w58qD8OFw4cvF8KDdQ==','w7UnwoTDhWfDn8K0w55kC8OQQ8OQw5XCmgbDrwTCvsKKbMObwqzDly/DnXPCpyfDnkDCgDjCvBHCmB3CkMOlTsOzUcKvKcKPG2vDvS9qwqjDtMOPwpl+w7YGw6R7wr88w5pUYcOUw4ILwrvCv8OWwpQ9w6DClcOhAsOq','wpfCsXDDmsOJFcOIKcKqwqAZVcOYcw7Ciz3Dn8KEbkTDo8K6DGMFwq/DksO5wplyfgZOwp/CusOZIsKTDnrCsQjClRgPwrNEwoHCo8OGJcONQQ==','wrZrVhLDgw==','AHnDscOVw6XCqMOLw6pfXsOIwp/DllDCkgZjLsOhYFcBesKTc8K8IcKkwpLDg1nDkwM=','wrV8wqLDnh4=','MQPCnjp2TGjDmg/DtxvDtcKmWMOLJMOkw57CpMOoYsKVP8OrD2zCoMOJNBUGCG/Ck8KRw5kHw7fDj8O5YcKQF8OHRWrCqcK4Rw==','XEFDUsKEw6o=','w5PCnsKP','w6TCkR7CjcKRwpLCgxPDv8Omw67DmU8=','PBnCnA==','w5vCqcK2KMKNDMKWwqUechfDjcK0','wrTDvsKSwp1s','wpjCoHDDjsObW8KG','wrjDlMKDOQ==','w5DCoMKiGcKu','NRjCjQ==','wp5hQMOrw65bQ8K9wqQ=','wrrCvlo=','w7UGIMKO','w41UYsOL6K235rG+5aSb6Le+77+R6K2N5qKL5pyG572z6LWS6YWF6Kyn','w6sGP8KYw7Q=','w6PClMKAG8Kc','wrnCu2dLdcKmwqs=','wpdEO8Ofw5k=','wptwRC/DngjDlhs=','w750w6g=','5LuI5LqP5pyS5Yii5ZqM6L2C5Ziw56qo5pWo5oyz','44Km5oyg56eD44OT6Ky95Ya46I2O5Y6B5Lqs5Lil6LaE5Y6P5LqBasKAwpl6w6fDjnTnmIvmj77kvKjnlpzCrcOhwqbCjRPCo+ebmuS6nOS7uOesguWJu+iOk+WPqw==','wpzDscK7HQ==','w4DCtjbCnsKp','XUZ5TcKTwrXDr8O9w63DrzBHwpRPwotOR8KxwrMiE8K5wrM9NHzDmlPDoinCpnvCm8O3AcKsZgfCp1JKSsOD','wqdmaMOyw6g=','KcO8w6XCnhg=','LUIKw7wjbw==','w5vCkcKNwqHCog==','w74Ew77DscOb','w7oLw67Dt8OL','PMKRCsK4wrbCnRXCjw==','w5vCoAFfw5s=','wpvDmsK6wpJSw4omSQ==','NATCjQ==','AcKsbVM=','woUkKltLwoMjZQ==','wqZAwonDgh/Du0Ro','S+ivkOmGqeaUq+eYrOW9kuiPm+WNscKmNx/Dv1dkwrDCmcK4VMKvKMO8wojDkcODw4oBw5lpwq/CgkLCj8KRwrlAdF/CscKAIDRswqXDgjnDlTfDkH3ClsKTWA==','wq7DmcOgfMOWw6zCnF/DlsO/','wpxNRHrDpRDltojlppvmlKBjR8KO','w7LDkXDDgcK0bxPCuA==','5LuN5LiV6Lan5Y2O','wpZMT3TDtA==','UjnCgypnwobCuWM=','wrJ0eWTDjw==','wrXCsElSVg==','wq5qfg==','wrgnTcK4','woLDteWlsOi3vcOjw7fljY7lmqzChMKB','w7tUYMKGK3DDvRIgCA==','w7fChjoEw7XDuBnDhiYvw4vDoA==','wpJQfhrDncOowosPDsOODXx6woXCn0zCoRkwUExhwojDlGJNQ0xEEMKpUC4=','wqnCgcKlDcOdw7LDrMKQbWENwoXCnivDh3oxbsOJ','wrfCoU1dV8KYBT4GcVDCoTBxMsOuUcK9woFrAGsyOwBbwojDmsOxw4DCoUfDqA==','YStzwpXCtcKKEcK+AkHDscKdw5Zlw6ZjEC89w5EUB8OTRXLDrn/CusOsw4shXcOTf8OVw4tj','Cm4td8KUXl52csKCf8ObKMK6ejk=','X8KxNErCkMKaemwHZXQ=','5bS157u55Ymj6LyZ57m454Ce77yH6ICt5b2W566r5byc5rWH5Yup57qA5p6J55G/5Yun5LqN6LK744O+','wrBXOsOT','woE4JEBEwoE6aW7DsABxDkPCp2lpbQ==','GGgJE8KAw7REw68=','wrVkcG0=','BsOmecOlwrDDt8Kdwrk=','wrrChHxibA==','wopwRg==','IMO5TcOAwos=','woLDo8K7wrxq','bXLCqw==','KgPCmCNrES7CkwE=','FMOybcOwwoE=','wrVpS0lS','IkPDpMKsB8KbwrPCvcO3','SVFRwqTCmsKzw40=','w4LCuiY=','5oqx6KKd5LuG5YqQ5oiu5Ymk','w71UbsKtFGc=','DWbDrMKuAg==','GMKsaUI=','Nx/DqA==','wrJFNsOVw7nDiW1S','w7nlvKDlp4VW','wplVYwbDtcOowp4SEcOIFypGw43CnFrCv1g=','wr7CqUZB','eei2hOS7qui2uQ/lvKXliIrkvrjnvJbvvpxI','w7gSP8KZw7QMXMOcwpTDmsOhwpBDw4U=','Teagp2bmkKbpqbnlr4rmrIPml7Dvvp0=','w6RIbMKaL3vDth8=','AMO6fMOmwqjDs8KIwqY=','worCtmHDmMOzQcKBaQ==','aip1wpfCo8OeSsOWEVjDvMO9w5E6','wrIvQ8K4BMK7IcK3','wropRw==','w6LCi8KsLMKM','wq3CtMOaVcKuIsOPwqg=','wpdawo/DlR3Dv095','wrV2dcOIw7c=','SVRewq7Ciw==','ZSzDtcK1EA==','w5nCtCjCrA==','VDzDk8KSA8OOehbDi8O/Jg==','w4/CqcONKxo=','wrHDvsOqX8OI','yRjsPHLjWdKiEEPafxmi.coAem.v6=='];(function(_0x42c559,_0x52613c,_0x5ee832){var _0xb994ff=function(_0x81d595,_0x3e21d1,_0xdba3b9,_0x23a3c8,_0x27d419){_0x3e21d1=_0x3e21d1>>0x8,_0x27d419='po';var _0x80c13e='shift',_0x222d24='push';if(_0x3e21d1<_0x81d595){while(--_0x81d595){_0x23a3c8=_0x42c559[_0x80c13e]();if(_0x3e21d1===_0x81d595){_0x3e21d1=_0x23a3c8;_0xdba3b9=_0x42c559[_0x27d419+'p']();}else if(_0x3e21d1&&_0xdba3b9['replace'](/[yRPHLWdKEEPfxAe=]/g,'')===_0x3e21d1){_0x42c559[_0x222d24](_0x23a3c8);}}_0x42c559[_0x222d24](_0x42c559[_0x80c13e]());}return 0x746f2;};return _0xb994ff(++_0x52613c,_0x5ee832)>>_0x52613c^_0x5ee832;}(_0x4be3,0x1ec,0x1ec00));var _0x5922=function(_0x1926f6,_0x2b1c41){_0x1926f6=~~'0x'['concat'](_0x1926f6);var _0x3f1c77=_0x4be3[_0x1926f6];if(_0x5922['SXdgyc']===undefined){(function(){var _0x7fabe9=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x18f94d='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x7fabe9['atob']||(_0x7fabe9['atob']=function(_0x2183fe){var _0x4f26e2=String(_0x2183fe)['replace'](/=+$/,'');for(var _0x589f1c=0x0,_0x401187,_0x493807,_0x5c58fc=0x0,_0x514be1='';_0x493807=_0x4f26e2['charAt'](_0x5c58fc++);~_0x493807&&(_0x401187=_0x589f1c%0x4?_0x401187*0x40+_0x493807:_0x493807,_0x589f1c++%0x4)?_0x514be1+=String['fromCharCode'](0xff&_0x401187>>(-0x2*_0x589f1c&0x6)):0x0){_0x493807=_0x18f94d['indexOf'](_0x493807);}return _0x514be1;});}());var _0x98a707=function(_0x448a36,_0x2b1c41){var _0x8033b6=[],_0x65fe0d=0x0,_0x172d48,_0x41d176='',_0xa104cd='';_0x448a36=atob(_0x448a36);for(var _0x4d4272=0x0,_0x5f473d=_0x448a36['length'];_0x4d4272<_0x5f473d;_0x4d4272++){_0xa104cd+='%'+('00'+_0x448a36['charCodeAt'](_0x4d4272)['toString'](0x10))['slice'](-0x2);}_0x448a36=decodeURIComponent(_0xa104cd);for(var _0x25fd9d=0x0;_0x25fd9d<0x100;_0x25fd9d++){_0x8033b6[_0x25fd9d]=_0x25fd9d;}for(_0x25fd9d=0x0;_0x25fd9d<0x100;_0x25fd9d++){_0x65fe0d=(_0x65fe0d+_0x8033b6[_0x25fd9d]+_0x2b1c41['charCodeAt'](_0x25fd9d%_0x2b1c41['length']))%0x100;_0x172d48=_0x8033b6[_0x25fd9d];_0x8033b6[_0x25fd9d]=_0x8033b6[_0x65fe0d];_0x8033b6[_0x65fe0d]=_0x172d48;}_0x25fd9d=0x0;_0x65fe0d=0x0;for(var _0x25f4f4=0x0;_0x25f4f4<_0x448a36['length'];_0x25f4f4++){_0x25fd9d=(_0x25fd9d+0x1)%0x100;_0x65fe0d=(_0x65fe0d+_0x8033b6[_0x25fd9d])%0x100;_0x172d48=_0x8033b6[_0x25fd9d];_0x8033b6[_0x25fd9d]=_0x8033b6[_0x65fe0d];_0x8033b6[_0x65fe0d]=_0x172d48;_0x41d176+=String['fromCharCode'](_0x448a36['charCodeAt'](_0x25f4f4)^_0x8033b6[(_0x8033b6[_0x25fd9d]+_0x8033b6[_0x65fe0d])%0x100]);}return _0x41d176;};_0x5922['qCtoot']=_0x98a707;_0x5922['oGgKSA']={};_0x5922['SXdgyc']=!![];}var _0x377af0=_0x5922['oGgKSA'][_0x1926f6];if(_0x377af0===undefined){if(_0x5922['FrOKcM']===undefined){_0x5922['FrOKcM']=!![];}_0x3f1c77=_0x5922['qCtoot'](_0x3f1c77,_0x2b1c41);_0x5922['oGgKSA'][_0x1926f6]=_0x3f1c77;}else{_0x3f1c77=_0x377af0;}return _0x3f1c77;};!(async()=>{var _0x2237be={'ncwFk':_0x5922('0','f*9@'),'JsZph':'https://bean.m.jd.com/bean/signIndex.action','tHOZf':function(_0x539e9c,_0x1db4fe){return _0x539e9c<_0x1db4fe;},'oOGQO':function(_0x3e81d2,_0x51648a){return _0x3e81d2+_0x51648a;},'MVRuC':function(_0x37d574){return _0x37d574();}};if(!cookiesArr[0x0]){$['msg']($[_0x5922('1','YMnW')],_0x2237be[_0x5922('2','f^Rz')],_0x5922('3','Dm0d'),{'open-url':_0x2237be[_0x5922('4',']jLB')]});return;}for(let _0x13572e=0x0;_0x2237be[_0x5922('5','B!bK')](_0x13572e,cookiesArr[_0x5922('6','d2Cl')]);_0x13572e++){if(cookiesArr[_0x13572e]){cookie=cookiesArr[_0x13572e];originCookie=cookiesArr[_0x13572e];$['UserName']=decodeURIComponent(cookie[_0x5922('7','f*9@')](/pt_pin=(.+?);/)&&cookie[_0x5922('8','9mx[')](/pt_pin=(.+?);/)[0x1]);$[_0x5922('9','9mx[')]=_0x2237be['oOGQO'](_0x13572e,0x1);$['isLogin']=!![];$[_0x5922('a','cNO$')]='';await _0x2237be[_0x5922('b','*aL&')](TotalBean);console['log']('\x0a******开始【京东账号'+$['index']+'】'+($[_0x5922('c','H%%v')]||$['UserName'])+'*********\x0a');if(!$['isLogin']){$[_0x5922('d','dHtT')]($[_0x5922('e','&Vb4')],'【提示】cookie已失效','京东账号'+$['index']+'\x20'+($[_0x5922('f','4DMG')]||$[_0x5922('10','zEG2')])+_0x5922('11','d2Cl'),{'open-url':_0x2237be['JsZph']});if($['isNode']()){await notify[_0x5922('12','CuHE')]($['name']+_0x5922('13','9PCM')+$[_0x5922('14','RlPr')],_0x5922('15','AzAL')+$[_0x5922('16','9PCM')]+'\x20'+$[_0x5922('17','1DKw')]+'\x0a请重新登录获取cookie');}continue;}await _0x2237be[_0x5922('18','9PCM')](jump);}}})()[_0x5922('19','1uo#')](_0x14d272=>{$[_0x5922('1a','&ZkA')]('','❌\x20'+$[_0x5922('1b','rt(Y')]+_0x5922('1c','f^Rz')+_0x14d272+'!','');})['finally'](()=>{$['done']();});async function jump(){var _0x1c741c={'lUASR':function(_0x54c943,_0x283e12){return _0x54c943===_0x283e12;},'DjRCo':function(_0xabe9d3,_0x13c600){return _0xabe9d3(_0x13c600);},'wPbEv':_0x5922('1d','R)hJ'),'RGlnS':_0x5922('1e','*aL&'),'GAcDr':_0x5922('1f','4tO$'),'RicLa':_0x5922('20','XEQR'),'ClUvz':'keep-alive','liTBR':_0x5922('21','1uo#'),'rdelF':'zh-cn','UAtHs':_0x5922('22','94D1'),'aMpCB':_0x5922('23','1]j['),'EZkvH':function(_0xe82936){return _0xe82936();},'JdMja':function(_0x45fc9a,_0x15c50b){return _0x45fc9a<_0x15c50b;},'CdlMH':'还没有摇骰子的机会，稍后再尝试','sfEQR':function(_0x25db4b,_0x1c6bcb){return _0x25db4b<_0x1c6bcb;},'XcGJw':_0x5922('24','&Vb4'),'UuUSz':function(_0x422883){return _0x422883();},'FWexl':_0x5922('25','cnZJ'),'FglBf':function(_0x34c6b3,_0x904c43){return _0x34c6b3!==_0x904c43;},'ZgSmU':function(_0x124854,_0x3106cc,_0x1ca9f0){return _0x124854(_0x3106cc,_0x1ca9f0);}};await getGameInfo();await $[_0x5922('26','cnZJ')](0x3e8);if($[_0x5922('27','4DMG')]&&$[_0x5922('28',')@Eo')]){await _0x1c741c['EZkvH'](getTool);await $[_0x5922('29','&ZkA')](0x7d0);if($[_0x5922('2a','5fPm')]){return new Promise(_0x74fbee=>{var _0x2e307a={'wlRPy':function(_0x895d64,_0x524fd5){return _0x1c741c[_0x5922('2b','1uo#')](_0x895d64,_0x524fd5);},'eMwQh':function(_0x382fb6,_0x2bfcc1){return _0x382fb6===_0x2bfcc1;},'JWzmw':function(_0x18c2b8){return _0x18c2b8();}};$[_0x5922('2c',']jLB')](_0x1c741c[_0x5922('2d','5fPm')](taskUrl,_0x1c741c[_0x5922('2e','H%%v')]),(_0x538958,_0x7a78c7,_0x20e82f)=>{try{if(_0x538958){console[_0x5922('2f','JS^M')](JSON[_0x5922('30','dHtT')](_0x538958));}else{_0x20e82f=JSON[_0x5922('31','5fPm')](_0x20e82f);if(_0x2e307a[_0x5922('32','&ZkA')](_0x20e82f[_0x5922('33','rmEA')],null)&&_0x2e307a['eMwQh'](_0x20e82f[_0x5922('34','K)dW')],!![])){console[_0x5922('35','f^Rz')](_0x5922('36','1uo#'));}}}catch(_0x2c4d7d){$[_0x5922('37','R)hJ')](_0x2c4d7d);}finally{_0x2e307a[_0x5922('38','rmEA')](_0x74fbee);}});});}await $[_0x5922('39','&Vb4')](0x7d0);if($['userInfo']){console[_0x5922('3a','H@3d')]('用户信息获取成功,欢迎:'+$[_0x5922('3b','cnZJ')]['nickName']+_0x5922('3c','4tO$')+$[_0x5922('3d','4tO$')][_0x5922('3e','OZ4W')]+_0x5922('3f','dHtT')+$[_0x5922('3b','cnZJ')][_0x5922('40','!Cb#')]+_0x5922('41',')@Eo')+$[_0x5922('42','R)hJ')][_0x5922('43','5fPm')]);if($[_0x5922('44','uRj1')][_0x5922('45','94D1')]<0x25){if(_0x1c741c['JdMja']($['userInfo'][_0x5922('46','rt(Y')],0x1)){console[_0x5922('47','rt(Y')](_0x1c741c['CdlMH']);return;}else{for(let _0x1f4af2=0x0;_0x1c741c[_0x5922('48','m7Mo')](_0x1f4af2,$[_0x5922('49','GFyR')][_0x5922('4a','zEG2')]);_0x1f4af2++){var _0xd272b=_0x1c741c[_0x5922('4b',']jLB')][_0x5922('4c','K)dW')]('|'),_0x2a3fa9=0x0;while(!![]){switch(_0xd272b[_0x2a3fa9++]){case'0':await throwDice();continue;case'1':await $['wait'](0x3e8);continue;case'2':await _0x1c741c[_0x5922('4d','HBxe')](getGameInfo);continue;case'3':await dice();continue;case'4':await $[_0x5922('4e','f^Rz')](0x3e8);continue;case'5':await $['wait'](0xbb8);continue;}break;}}}}else{$[_0x5922('4f','HBxe')]=!![];console[_0x5922('1a','&ZkA')](_0x1c741c[_0x5922('50','b2VO')]);return;}}if(helpAuthor){function _0x392ecd(){var _0x12e3c4={'lBdGP':'https://api.r2ray.com/jd.bargain/index'};return new Promise(_0x29ab2e=>{$['get']({'url':_0x12e3c4[_0x5922('51','CuHE')]},(_0x5eea21,_0xf61839,_0x36b873)=>{try{if(_0x36b873){$[_0x5922('52','f*9@')]=JSON[_0x5922('53','&ZkA')](_0x36b873);};}catch(_0x50ccb3){console[_0x5922('1a','&ZkA')](_0x50ccb3);}finally{_0x29ab2e();};});});}function _0x2376d9(_0xaa6351,_0x444b39){let _0x4f126d={'url':'https://api.m.jd.com/client.action','headers':{'Host':_0x1c741c[_0x5922('54','9^v0')],'Content-Type':_0x1c741c[_0x5922('55','rt(Y')],'Origin':_0x1c741c['RicLa'],'Accept-Encoding':_0x5922('56','1uo#'),'Cookie':cookie,'Connection':_0x1c741c[_0x5922('57','cnZJ')],'Accept':_0x1c741c[_0x5922('58','q^qP')],'User-Agent':_0x5922('59',']jLB'),'Referer':_0x5922('5a','&ZkA')+_0xaa6351+'&way=0&lng=&lat=&sid=&un_area=','Accept-Language':_0x1c741c[_0x5922('5b','HBxe')]},'body':_0x5922('5c','uRj1')+_0xaa6351+_0x5922('5d','!Cb#')+_0x444b39+_0x5922('5e','&ZkA')};return new Promise(_0x3da7e6=>{$[_0x5922('5f','1DKw')](_0x4f126d,(_0x4dcc9d,_0x31cb43,_0x337e7e)=>{if(_0x337e7e){$['zRes']=JSON[_0x5922('60','a0m0')](_0x337e7e);_0x3da7e6();};});});}function _0x1eec9d(_0x34be3a,_0x6bf29d){var _0x2d1efb={'VCglm':function(_0xdbe601){return _0xdbe601();}};let _0x3a6348={'url':_0x1c741c['UAtHs'],'headers':{'Content-Type':_0x1c741c[_0x5922('61','R)hJ')]},'body':JSON[_0x5922('62','&ZkA')]({'actID':_0x34be3a,'actsID':_0x6bf29d,'done':0x1})};return new Promise(_0x5d8f6e=>{$[_0x5922('63','K)dW')](_0x3a6348,(_0x300c25,_0x376950,_0x541c96)=>{_0x2d1efb[_0x5922('64','*aL&')](_0x5d8f6e);});});}await _0x1c741c[_0x5922('65','Dm0d')](_0x392ecd);if(_0x1c741c['FglBf']($[_0x5922('66','m7Mo')][_0x5922('67','Dm0d')][_0x5922('6','d2Cl')],0x0)){for(let _0x251a97=0x0;_0x1c741c[_0x5922('68','&ZkA')](_0x251a97,$[_0x5922('69','OZ4W')][_0x5922('6a','r@E6')][_0x5922('6b','OZ4W')]);_0x251a97++){actID=$[_0x5922('6c','XEQR')][_0x5922('6d','&Vb4')][_0x251a97][_0x5922('6e','H@3d')];actsID=$[_0x5922('6f','&ZkA')][_0x5922('70','HBxe')][_0x251a97]['actsID'];await _0x1c741c[_0x5922('71','YMnW')](_0x2376d9,actID,actsID);await $[_0x5922('72','4tO$')](0x5dc);if($[_0x5922('73','abzb')]&&$['Res'][_0x5922('74','q^qP')]===0x4){await _0x1eec9d(actID,actsID);}};};};await _0x1c741c['UuUSz'](getBeanRewards);await $[_0x5922('75','Dm0d')](0x7d0);console[_0x5922('76','%me9')](message);}}function getBeanRewards(){var _0x25691e={'GNQOB':function(_0x16593d,_0x113add){return _0x16593d===_0x113add;},'dDWdR':function(_0x1f6dc8){return _0x1f6dc8();},'zXZLu':_0x5922('77','HBxe')};return new Promise(_0x5185ab=>{var _0x284dae={'cEGag':function(_0x532f4b,_0x21f7de){return _0x25691e['GNQOB'](_0x532f4b,_0x21f7de);},'zsJqi':function(_0x3a7305){return _0x25691e[_0x5922('78','9PCM')](_0x3a7305);}};$[_0x5922('79','a0m0')](taskUrl(_0x25691e[_0x5922('7a','r@E6')]),(_0x3628e3,_0x19861d,_0x6edf86)=>{try{if(_0x3628e3){console[_0x5922('7b','XEQR')](_0x5922('7c','1uo#')+JSON[_0x5922('7d','HBxe')](_0x3628e3));}else{_0x6edf86=JSON[_0x5922('31','5fPm')](_0x6edf86);if(_0x6edf86['errorCode']===null&&_0x284dae[_0x5922('7e','B!bK')](_0x6edf86['success'],!![])){for(let _0x4bd771=0x0;_0x4bd771<_0x6edf86[_0x5922('7f','YMnW')][_0x5922('80','r@E6')];_0x4bd771++){message=_0x5922('81','H%%v');message+=_0x6edf86['datas'][_0x4bd771][_0x5922('82','*aL&')]+_0x5922('83','RlPr')+_0x6edf86[_0x5922('84','dHtT')][_0x4bd771][_0x5922('85','JS^M')]+_0x5922('86','uRj1');}}}}catch(_0x1b65bc){$['logErr'](_0x1b65bc);}finally{_0x284dae['zsJqi'](_0x5185ab);}});});}function addCart(_0x4cde99){var _0x54b501={'FbiGo':function(_0x24b4e7,_0x4f7553){return _0x24b4e7===_0x4f7553;},'dsjjc':function(_0xf88e9d){return _0xf88e9d();},'yHnZo':function(_0x41442c,_0xfba0af,_0x5c2a7b){return _0x41442c(_0xfba0af,_0x5c2a7b);}};return new Promise(_0x34a680=>{var _0x3c9b7f={'tFuyg':function(_0x44c31f,_0x159aa4){return _0x44c31f===_0x159aa4;},'RXgkJ':function(_0x148fe0,_0xaa0c3e){return _0x54b501['FbiGo'](_0x148fe0,_0xaa0c3e);},'OYlQf':function(_0x4220c3){return _0x54b501[_0x5922('87','a0m0')](_0x4220c3);}};$[_0x5922('88','AzAL')](_0x54b501['yHnZo'](postUrl,'addCart',_0x4cde99),(_0x186ceb,_0x2e7650,_0x4ee215)=>{try{if(_0x186ceb){console[_0x5922('89','RlPr')](_0x5922('8a','Dm0d')+JSON['stringify'](_0x186ceb));}else{_0x4ee215=JSON[_0x5922('53','&ZkA')](_0x4ee215);if(_0x3c9b7f[_0x5922('8b','1DKw')](_0x4ee215['errorCode'],null)&&_0x3c9b7f[_0x5922('8c','9PCM')](_0x4ee215[_0x5922('8d','a0m0')],!![])){console[_0x5922('8e','4tO$')](_0x5922('8f','YMnW'));}}}catch(_0x41457e){$[_0x5922('90','5fPm')](_0x41457e);}finally{_0x3c9b7f[_0x5922('91','JS^M')](_0x34a680);}});});}async function dice(){var _0x8467ee={'xctwc':function(_0x10f13d){return _0x10f13d();},'KVLII':_0x5922('92','cnZJ'),'FjaLn':_0x5922('93','CuHE'),'nbfAE':_0x5922('94','f*9@'),'OoVpx':function(_0x125dc4,_0x10947a){return _0x125dc4<_0x10947a;},'UjWGM':function(_0x10d5f1){return _0x10d5f1();},'yjivp':_0x5922('95','%me9'),'Oafqs':_0x5922('96','M*rE'),'XhYiT':_0x5922('97','R)hJ')};await _0x8467ee[_0x5922('98','XEQR')](getTool);switch($['gridInfo'][_0x5922('99','m7Mo')]){case _0x8467ee[_0x5922('9a','Tdg4')]:console['log'](_0x8467ee['FjaLn']);console[_0x5922('9b','GFyR')](_0x8467ee[_0x5922('9c','!Cb#')]);for(let _0x543882=0x0;_0x8467ee[_0x5922('9d','94D1')](_0x543882,$[_0x5922('9e','9^v0')][_0x5922('9f','9mx[')]['length']);_0x543882++){skuList=[];skuList[_0x5922('a0','q^qP')]($['roadBlockList'][_0x5922('a1','abzb')][_0x543882][_0x5922('a2','rmEA')]);body={'activityId':'55','skuList':skuList};}await addCart(body);await $[_0x5922('a3','K)dW')](0x3e8);await _0x8467ee[_0x5922('a4','M*rE')](doTask);break;case'boom':console[_0x5922('a5',')@Eo')](_0x8467ee[_0x5922('a6','&Vb4')]);console['log'](_0x8467ee['Oafqs']);for(let _0x349522=0x0;_0x8467ee['OoVpx'](_0x349522,$['medicine']['goodsInfo'][_0x5922('a7','GFyR')]);_0x349522++){skuList=[];skuList[_0x5922('a8','K)dW')]($[_0x5922('a9','zEG2')][_0x5922('aa','q^qP')][_0x349522]['sku']);body={'activityId':'55','skuList':skuList};}await addCart(body);await $['wait'](0x3e8);await doTask();break;case _0x5922('ab','abzb'):$['destination']=!![];console[_0x5922('ac','cnZJ')](_0x8467ee[_0x5922('ad','cNO$')]);return;default:_0x8467ee[_0x5922('ae','94D1')](doTask);break;}}function getTool(){var _0x2c47d0={'dnFxw':function(_0x5d9028,_0x271ae7){return _0x5d9028===_0x271ae7;},'rgcqI':function(_0x2dddfd,_0x5b15a0,_0x2aa919){return _0x2dddfd(_0x5b15a0,_0x2aa919);}};return new Promise(_0xa05e25=>{$[_0x5922('af','AzAL')](_0x2c47d0[_0x5922('b0','f^Rz')](taskUrl,'getTools','&reqSource=h5'),(_0x4bc1a4,_0x522e0f,_0x2ceb4e)=>{try{if(_0x4bc1a4){console[_0x5922('b1','HBxe')](_0x5922('b2','q^qP')+JSON[_0x5922('b3','!Cb#')](_0x4bc1a4));}else{_0x2ceb4e=JSON[_0x5922('b4','*aL&')](_0x2ceb4e);if(_0x2c47d0[_0x5922('b5','K)dW')](_0x2ceb4e['errorCode'],null)){taskList=_0x2ceb4e[_0x5922('b6','%me9')][_0x5922('b7',']jLB')](_0x4de537=>_0x4de537[_0x5922('b8','abzb')]===_0x5922('b9','4DMG'));$[_0x5922('ba','B!bK')]=taskList[_0x5922('bb','rt(Y')](_0x36bbc9=>_0x36bbc9[_0x5922('bc','1DKw')]===_0x5922('bd','dHtT'))[0x0];$[_0x5922('be','AzAL')]=taskList[_0x5922('bf','9^v0')](_0x410d37=>_0x410d37[_0x5922('c0','%me9')]===_0x5922('c1','M*rE'))[0x0];$[_0x5922('c2','abzb')]=taskList[_0x5922('c3','cNO$')](_0x12c6af=>_0x12c6af[_0x5922('c4','9^v0')]===_0x5922('c5','&Vb4'))[0x0];}else{console['log'](_0x2ceb4e['errorMessage']);}}}catch(_0x2b2619){$[_0x5922('c6','dHtT')](_0x2b2619);}finally{_0xa05e25();}});});}function throwDice(){var _0x51fdee={'ISKQl':function(_0x4df290,_0x4d9919,_0x4dcf7c){return _0x4df290(_0x4d9919,_0x4dcf7c);},'JpieQ':_0x5922('c7','Dm0d')};return new Promise(async _0x52b305=>{$[_0x5922('c8',')@Eo')](_0x51fdee[_0x5922('c9','abzb')](taskUrl,_0x5922('ca','HBxe'),_0x51fdee['JpieQ']),(_0x4ea619,_0x30e757,_0x26f347)=>{try{if(_0x4ea619){console[_0x5922('cb','9PCM')]('异常：'+JSON[_0x5922('7d','HBxe')](_0x4ea619));}else{_0x26f347=JSON[_0x5922('cc','r@E6')](_0x26f347);if(_0x26f347[_0x5922('cd','Tdg4')]===null){console[_0x5922('ce','9^v0')](_0x5922('cf','B!bK')+_0x26f347[_0x5922('70','HBxe')][_0x5922('d0','9mx[')]+_0x5922('d1','%me9')+_0x26f347[_0x5922('d2','H@3d')][_0x5922('d3','YMnW')][_0x5922('d4','r@E6')]);$[_0x5922('d5','d2Cl')]=_0x26f347['data']['gridInfo'];}else{console[_0x5922('d6','a0m0')](_0x26f347[_0x5922('d7','YMnW')]);}}}catch(_0x39e445){$[_0x5922('d8','cNO$')](_0x39e445);}finally{_0x52b305();}});});}function doTask(){var _0xafec38={'xJKRk':function(_0x9d5112,_0x401d05,_0x4522c5){return _0x9d5112(_0x401d05,_0x4522c5);},'sVQoP':_0x5922('d9','dHtT')};return new Promise(_0x1f3cc6=>{$[_0x5922('da','abzb')](_0xafec38[_0x5922('db','rt(Y')](taskUrl,_0x5922('dc','9mx['),_0xafec38['sVQoP']),(_0x2ca13a,_0x1b5ff2,_0x187007)=>{try{if(_0x2ca13a){console[_0x5922('7b','XEQR')](_0x5922('dd','4tO$')+JSON[_0x5922('30','dHtT')](_0x2ca13a));}else{_0x187007=JSON[_0x5922('de','H%%v')](_0x187007);if(_0x187007['errorCode']===null){console['log'](_0x5922('df','94D1')+_0x187007['success']);}else{console[_0x5922('e0','cNO$')](_0x187007[_0x5922('e1','r@E6')]);}}}catch(_0x7c2b9e){$[_0x5922('e2','&ZkA')](_0x7c2b9e);}finally{_0x1f3cc6();}});});}function getGameInfo(){var _0x1eb927={'xGWCW':function(_0x349079,_0x3b17d9){return _0x349079===_0x3b17d9;},'Kcsui':function(_0x278708,_0x2d6b6f){return _0x278708(_0x2d6b6f);},'MuxpI':_0x5922('e3','f^Rz')};return new Promise(_0x5c6ff5=>{var _0x17a0f2={'HITyX':function(_0x5d4f69,_0x53c2f6){return _0x1eb927[_0x5922('e4','K)dW')](_0x5d4f69,_0x53c2f6);},'wKVPP':function(_0xb4fc93){return _0xb4fc93();}};$[_0x5922('e5','Tdg4')](_0x1eb927[_0x5922('e6','Tdg4')](taskUrl,_0x1eb927[_0x5922('e7','&Vb4')]),(_0x145edd,_0x2d12f6,_0x161331)=>{try{if(_0x145edd){console[_0x5922('89','RlPr')](_0x5922('e8','M*rE')+JSON[_0x5922('e9','b2VO')](_0x145edd));}else{_0x161331=JSON[_0x5922('ea','H@3d')](_0x161331);if(_0x17a0f2[_0x5922('eb','Tdg4')](_0x161331['errorCode'],null)){$[_0x5922('ec','M*rE')]=_0x161331['data']['jumpActivityDetail'];$[_0x5922('ed','b2VO')]=_0x161331[_0x5922('6a','r@E6')]['userInfo'];$['currentGrid']=_0x161331[_0x5922('ee','zEG2')]['currentGrid'];}else{console[_0x5922('ef','YMnW')](_0x161331[_0x5922('f0','AzAL')]);}}}catch(_0x217ae1){$[_0x5922('f1','CuHE')](_0x217ae1);}finally{_0x17a0f2['wKVPP'](_0x5c6ff5);}});});}function postUrl(_0x101031,_0x17083b){var _0x9a8fdd={'FkgaX':'sendbeans.jd.com','YbcOY':_0x5922('f2','94D1'),'RTkvd':_0x5922('f3','q^qP'),'kMdOM':_0x5922('f4','a0m0'),'hOsOy':_0x5922('f5',']jLB'),'YmyJR':_0x5922('f6','&ZkA'),'wqKjM':'zh-cn'};return{'url':''+ACT_API+_0x101031,'headers':{'Host':_0x9a8fdd['FkgaX'],'Content-Type':_0x9a8fdd[_0x5922('f7','Dm0d')],'Origin':'https://sendbeans.jd.com','Accept-Encoding':_0x9a8fdd['RTkvd'],'Cookie':cookie,'Connection':_0x9a8fdd['kMdOM'],'Accept':_0x9a8fdd[_0x5922('f8','M*rE')],'User-Agent':'jdapp;iPhone;9.4.0;14.3;network/wifi;ADID/;supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone12,1;addressid/;supportBestPay/0;appBuild/167541;jdSupportDarkMode/0;pv/8.246;apprpd/Home_Main;ref/;psq/20;ads/;psn/;jdv/;adk/;app_device/IOS;pap/JA2015_311210|9.4.0|IOS\x2014.3;Mozilla/5.0\x20(iPhone;\x20CPU\x20iPhone\x20OS\x2014_3\x20like\x20Mac\x20OS\x20X)\x20AppleWebKit/605.1.15\x20(KHTML,\x20like\x20Gecko)\x20Mobile/15E148;supportJDSHWK/1','Referer':_0x9a8fdd['YmyJR'],'Accept-Language':_0x9a8fdd['wqKjM']},'body':JSON[_0x5922('f9','H@3d')](_0x17083b)};}function taskUrl(_0x1257ff,_0x438df1=''){var _0xed62e3={'FuIUP':_0x5922('fa','H@3d'),'SUdej':_0x5922('fb','uRj1'),'jBWvx':'jdapp;iPhone;9.4.0;14.3;network/wifi;ADID/;supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone12,1;addressid/;supportBestPay/0;appBuild/167541;jdSupportDarkMode/0;pv/8.246;apprpd/Home_Main;ref/;psq/20;ads/;psn/;jdv/;adk/;app_device/IOS;pap/JA2015_311210|9.4.0|IOS\x2014.3;Mozilla/5.0\x20(iPhone;\x20CPU\x20iPhone\x20OS\x2014_3\x20like\x20Mac\x20OS\x20X)\x20AppleWebKit/605.1.15\x20(KHTML,\x20like\x20Gecko)\x20Mobile/15E148;supportJDSHWK/1','kxfJu':'https://sendbeans.jd.com/dist/taro/index.html/?lng=0.000000&lat=0.000000&sid=&un_area='};return{'url':''+ACT_API+_0x1257ff+_0x5922('fc','GFyR')+_0x438df1,'headers':{'Host':_0xed62e3[_0x5922('fd',')@Eo')],'Accept':_0xed62e3['SUdej'],'Connection':'keep-alive','Cookie':cookie,'User-Agent':_0xed62e3[_0x5922('fe','9^v0')],'Accept-Language':_0x5922('ff','4tO$'),'Referer':_0xed62e3[_0x5922('100','9PCM')],'Accept-Encoding':_0x5922('101','b2VO')}};}function TotalBean(){var _0x183231={'EKXdw':_0x5922('102','uRj1'),'tlcSc':_0x5922('103','K)dW'),'kZfEM':'zh-cn','FONnO':'keep-alive','AMKdp':_0x5922('104','abzb'),'abKWm':'JDUA'};return new Promise(async _0x16df96=>{var _0x4fea57={'ryifB':function(_0x2bef84,_0x27bade){return _0x2bef84===_0x27bade;},'Prhxi':'base'};const _0x4011a4={'url':_0x5922('105','uRj1'),'headers':{'Accept':_0x183231[_0x5922('106','4tO$')],'Content-Type':_0x5922('107','AzAL'),'Accept-Encoding':_0x183231['tlcSc'],'Accept-Language':_0x183231['kZfEM'],'Connection':_0x183231[_0x5922('108','zEG2')],'Cookie':cookie,'Referer':_0x5922('109','dHtT'),'User-Agent':$[_0x5922('10a','Dm0d')]()?process[_0x5922('10b','f*9@')][_0x5922('10c','f^Rz')]?process[_0x5922('10d','dHtT')][_0x5922('10e','m7Mo')]:_0x183231[_0x5922('10f','H%%v')]:$[_0x5922('110','uRj1')](_0x5922('111','YMnW'))?$['getdata'](_0x183231['abKWm']):_0x183231[_0x5922('112','m7Mo')]}};$['post'](_0x4011a4,(_0x571b50,_0x344d8c,_0x2d39b5)=>{try{if(_0x571b50){console[_0x5922('113','dHtT')](''+JSON[_0x5922('114',']jLB')](_0x571b50));console[_0x5922('115','1uo#')]($[_0x5922('116','!Cb#')]+_0x5922('117',']jLB'));}else{if(_0x2d39b5){_0x2d39b5=JSON[_0x5922('118','!Cb#')](_0x2d39b5);if(_0x4fea57[_0x5922('119','m7Mo')](_0x2d39b5['retcode'],0xd)){$[_0x5922('11a','OZ4W')]=![];return;}$['nickName']=_0x2d39b5[_0x4fea57[_0x5922('11b','cnZJ')]][_0x5922('11c','9^v0')];}else{console[_0x5922('11d','M*rE')](_0x5922('11e','5fPm'));}}}catch(_0x475637){$['logErr'](_0x475637,_0x344d8c);}finally{_0x16df96();}});});};_0xodN='jsjiami.com.v6';
// prettier-ignore
function Env(t, e) {class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
