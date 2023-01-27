const Lazy = require('lazy.ai');
let hexEncode = function(the) {
  var hex, i;

  var result = "";
  for (i = 0; i < the.length; i++) {
    hex = the.charCodeAt(i).toString(16);
    result += ("000" + hex).slice(-4);
  }

  return result
}
let hexDecode = function(the) {
  var j;
  var hexes = the.match(/.{1,4}/g) || [];
  var back = "";
  for (j = 0; j < hexes.length; j++) {
    back += String.fromCharCode(parseInt(hexes[j], 16));
  }

  return back;
}
let rev = (nst) => {
  return hexDecode(hexEncode(nst).split('').reverse().join(''))
}
let flip = (w) => w.split('').map(x => rev(x)).join('')
let firstSep = String.fromCharCode(61559);
let secondSep = String.fromCharCode(61905);
let zlib = require("zlib");
let compile = (code) => {
  return code.split("\n").map(x => {
    let args = x.split(" ").slice(2).join(" ").replaceAll("\"", "").split(", ");
    let header = x.split(" ")[0];
    let opcode;
    let cat = x.split(" ")[1];
    if (header == "CRCAT") {
      opcode = 1;
    }
    else if (header == "RESCAT") {
      opcode = 2;
    }
    return `${String.fromCharCode(opcode)}${cat}${firstSep}${args.join(secondSep)}`
  }).join("\n")
}
let decompile = (str) => {
  let s = str.split("\n");
  s = s.map(x => {
    return (x[0].charCodeAt() == 1 ? "CRCAT" : "RESCAT") + " " + (x.slice(1).split(firstSep)[0]) + " \"" + x.slice(1).split(firstSep)[1].split(secondSep).join("\", \"") + "\""
  })
  return s.join("\n");
}
async function execute(data, prompt) {
  data = decompile(data);
  const lazy = new Lazy();
  let code = data.split('\n');
  let responses = {};
  for (const x of code) {
    let argv = x.split(' ');
    let header = argv.shift();
    let rest = argv.slice(1).join(' ').replaceAll('"', '').split(", ");
    if (header == "CRCAT") {
      for (const i of rest) {
        await lazy.learn({ phrase: i, category: argv[0] });
      }
    } else if (header == "RESCAT") {
      await lazy.addResponse({ phrase: rest, response: argv[0] });
      responses[argv[0]] = rest;
    }
  };
  let q = await lazy.query({ phrase: prompt });
  return (responses[q.details[0].label][0])
}
module.exports = { compile, decompile, execute }