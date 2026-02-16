import { readFileSync, writeFileSync } from 'fs';
import { dirname, join, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function extractStrings(src) {
    // Replace string literals with placeholders to protect them
    const strings = [];
    const placeholder = src.replace(/(["'])(?:(?!\1|\\).|\\.)*\1/g, function (match) {
        strings.push(match);
        return '___STR' + (strings.length - 1) + '___';
    });
    return { placeholder, strings };
}

function restoreStrings(src, strings) {
    return src.replace(/___STR(\d+)___/g, function (_, i) {
        return strings[parseInt(i)];
    });
}

function minifyJS(src) {
    const { placeholder, strings } = extractStrings(src);
    let out = placeholder
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\/\/.*$/gm, '');
    out = out
        .replace(/\n\s*\n/g, '\n')
        .replace(/^\s+/gm, '')
        .replace(/\s+$/gm, '')
        .replace(/\s*([{}();,=+\-<>!&|?:])\s*/g, '$1')
        .replace(/\n/g, '');
    return restoreStrings(out, strings);
}

function minifyCSS(src) {
    let out = src
        .replace(/\/\*[\s\S]*?\*\//g, '');

    // Protect content inside CSS functions (clamp, calc, etc.)
    const funcs = [];
    out = out.replace(/\b(clamp|calc|min|max|env)\(([^)]*)\)/g, function (match) {
        funcs.push(match);
        return '___FN' + (funcs.length - 1) + '___';
    });

    out = out
        .replace(/\n\s*\n/g, '\n')
        .replace(/^\s+/gm, '')
        .replace(/\s+$/gm, '')
        .replace(/\s*([{}:;,>~+])\s*/g, '$1')
        .replace(/;}/g, '}')
        .replace(/\n/g, '');

    // Restore CSS functions
    out = out.replace(/___FN(\d+)___/g, function (_, i) {
        return funcs[parseInt(i)];
    });

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
