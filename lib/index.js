const { Command } = require('commander');
const vyst = require('./util/vyst');
const readFile = require('./util/read_file');
const fs = require('fs');
const zlib = require('zlib');
const program = new Command();

program
  .name('Vyst')
  .description('A file format to make Natural Language Processing easier.')
  .version('1.8.0');

program.command('compile')
  .description('Compile a Vyst Text file to a Vyst Format file')
  .argument('<file>', 'file to compile')
  .argument('<output>', 'output')
  .action(async (file, output, options) => {
    let _f = await readFile(file)
    _f = _f.toString();
    fs.writeFileSync(output, zlib.deflateSync(vyst.compile(_f)));
  });

program.command('decompile')
  .description('Deompile a Vyst Format file to a Vyst Text file')
  .argument('<file>', 'file to compile')
  .argument('<output>', 'output')
  .action(async (file, output, options) => {
    let read = await readFile(str);
    console.log(read);
    fs.writeFileSync(output, zlib.inflateSync(vyst.decompile(read.toString())));
  });
program.command('execute')
  .description('Execute a Vyst Format file')
  .argument('<file>', 'file to execute')
  .argument('<str>', 'string to test AI')
  .action(async (file, str, options) => {
    let read = await readFile(file);
    vyst.execute(zlib.inflateSync(read).toString(), str).then(x => console.log(x));
  });

program.parse();

module.exports = vyst;
