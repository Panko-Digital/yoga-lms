import { readFileSync, writeFileSync } from 'fs';
import { dirname, join, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function minifyJS(src) {
    let out = src
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\/\/.*$/gm, '');
    out = out
        .replace(/\n\s*\n/g, '\n')
        .replace(/^\s+/gm, '')
        .replace(/\s+$/gm, '')
        .replace(/\s*([{}();,=+\-<>!&|?:])\s*/g, '$1')
        .replace(/\n/g, '');
    return out;
}

function minifyCSS(src) {
    let out = src
        .replace(/\/\*[\s\S]*?\*\//g, '');
    out = out
        .replace(/\n\s*\n/g, '\n')
        .replace(/^\s+/gm, '')
        .replace(/\s+$/gm, '')
        .replace(/\s*([{}:;,>~+])\s*/g, '$1')
        .replace(/;}/g, '}')
        .replace(/\n/g, '');
    return out;
}

function compress(filename) {
    const input = join(__dirname, filename);
    const ext = extname(filename);
    const name = basename(filename, ext);
    const output = join(__dirname, name + '.min' + ext);

    const src = readFileSync(input, 'utf8');
    const out = ext === '.css' ? minifyCSS(src) : minifyJS(src);

    writeFileSync(output, out, 'utf8');
    const pct = ((1 - out.length / src.length) * 100).toFixed(1);
    console.log(`${filename} → ${name}.min${ext}  (${src.length} → ${out.length} bytes, ${pct}% smaller)`);
}

compress('module-components.js');
compress('module-components.css');
