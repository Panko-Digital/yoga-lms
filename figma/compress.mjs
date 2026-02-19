import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

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

function compressJS(filename) {
    const input = join(__dirname, filename);
    const output = join(__dirname, 'module-components.min.js');

    let src = readFileSync(input, 'utf8');

    // Blank out imageBaseLocal for deployed build (LMS serves relative paths)
    src = src.replace(/(var\s+imageBaseLocal\s*=\s*)(["'])(?:(?!\2|\\).|\\.)*\2/, "$1''");

    const out = minifyJS(src);
    writeFileSync(output, out, 'utf8');
    const pct = ((1 - out.length / src.length) * 100).toFixed(1);
    console.log(`${filename} → module-components.min.js  (${src.length} → ${out.length} bytes, ${pct}% smaller)`);
}

function stripUserContentScope(css) {
    // Convert root .user_content selector to body, then remove descendant scoping.
    // Examples:
    // .user_content{...} -> body{...}
    // .user_content p,.user_content li -> p,li
    var out = css;

    out = out.replace(/(^|[,{])\s*\.user_content(?=\s*[{,])/g, function (_, prefix) {
        return prefix + 'body';
    });

    out = out.replace(/\.user_content\s+(?=[.#\[:a-zA-Z*])/g, '');
    out = out.replace(/\.user_content\s*([>+~])/g, '$1');

    return out;
}

compressJS('module-components.js');

// Compile SCSS → compressed CSS (web + mobile)
const scssInput = join(__dirname, 'module-components.scss');
const webCssOutput = join(__dirname, 'module-components.desktop.min.css');
const mobileCssOutput = join(__dirname, 'module-components.mobile.min.css');

const webCss = execSync(`npx sass "${scssInput}" --style=compressed --no-source-map`, { encoding: 'utf8' });
writeFileSync(webCssOutput, webCss, 'utf8');

const mobileCss = stripUserContentScope(webCss);
writeFileSync(mobileCssOutput, mobileCss, 'utf8');

const scssSize = readFileSync(scssInput, 'utf8').length;
const webCssSize = readFileSync(webCssOutput, 'utf8').length;
const webCssPct = ((1 - webCssSize / scssSize) * 100).toFixed(1);
console.log(`module-components.scss → module-components.desktop.min.css  (${scssSize} → ${webCssSize} bytes, ${webCssPct}% smaller)`);

const mobileCssSize = readFileSync(mobileCssOutput, 'utf8').length;
const mobileCssPct = ((1 - mobileCssSize / scssSize) * 100).toFixed(1);
console.log(`module-components.scss → module-components.mobile.min.css  (${scssSize} → ${mobileCssSize} bytes, ${mobileCssPct}% smaller)`);
