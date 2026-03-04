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

function stripDesktopOnlyCode(src) {
    // Remove code between [DESKTOP-ONLY-START] and [DESKTOP-ONLY-END] markers
    return src.replace(/\/\/\s*\[DESKTOP-ONLY-START\][\s\S]*?\/\/\s*\[DESKTOP-ONLY-END\]/g, '');
}

function compressJS(filename) {
    const input = join(__dirname, filename);
    const desktopOutput = join(__dirname, 'module-components.desktop.min.js');
    const mobileOutput = join(__dirname, 'module-components.mobile.min.js');

    let src = readFileSync(input, 'utf8');

    // Blank out imageBaseLocal for deployed build (LMS serves relative paths)
    src = src.replace(/(var\s+imageBaseLocal\s*=\s*)(["'])(?:(?!\2|\\).|\\.)*\2/, "$1''");

    // Create desktop version (full code)
    const desktopOut = minifyJS(src);
    writeFileSync(desktopOutput, desktopOut, 'utf8');
    const desktopPct = ((1 - desktopOut.length / src.length) * 100).toFixed(1);
    console.log(`${filename} → module-components.desktop.min.js  (${src.length} → ${desktopOut.length} bytes, ${desktopPct}% smaller)`);

    // Create mobile version (strip desktop-only code)
    const mobileSrc = stripDesktopOnlyCode(src);
    const mobileOut = minifyJS(mobileSrc);
    writeFileSync(mobileOutput, mobileOut, 'utf8');
    const mobilePct = ((1 - mobileOut.length / src.length) * 100).toFixed(1);
    console.log(`${filename} → module-components.mobile.min.js  (${src.length} → ${mobileOut.length} bytes, ${mobilePct}% smaller)`);

    // Also create legacy module-components.min.js pointing to desktop version for backwards compatibility
    writeFileSync(join(__dirname, 'module-components.min.js'), desktopOut, 'utf8');
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

function stripDesktopOnlyCSS(css) {
    // Remove CSS between [DESKTOP-ONLY-START] and [DESKTOP-ONLY-END] markers
    // Note: Comments are stripped by sass --style=compressed, so we need to look for the pattern in source
    return css;
}

function stripDesktopOnlySCSS(scss) {
    // Remove SCSS between [DESKTOP-ONLY-START] and [DESKTOP-ONLY-END] markers
    return scss.replace(/\/\/\s*\[DESKTOP-ONLY-START\][\s\S]*?\/\/\s*\[DESKTOP-ONLY-END\]/g, '');
}

compressJS('module-components.js');

// Compile SCSS → compressed CSS (web + mobile)
const scssInput = join(__dirname, 'module-components.scss');
const webCssOutput = join(__dirname, 'module-components.desktop.min.css');
const mobileCssOutput = join(__dirname, 'module-components.mobile.min.css');

const scssSource = readFileSync(scssInput, 'utf8');

// Desktop version - full SCSS
const webCss = execSync(`npx sass "${scssInput}" --style=compressed --no-source-map`, { encoding: 'utf8' });
writeFileSync(webCssOutput, webCss, 'utf8');

// Mobile version - strip desktop-only code first, then compile
const mobileScssInput = join(__dirname, 'module-components.mobile.temp.scss');
const mobileScssSource = stripDesktopOnlySCSS(scssSource);
writeFileSync(mobileScssInput, mobileScssSource, 'utf8');

const mobileCssCompiled = execSync(`npx sass "${mobileScssInput}" --style=compressed --no-source-map`, { encoding: 'utf8' });
const mobileCss = stripUserContentScope(mobileCssCompiled);
writeFileSync(mobileCssOutput, mobileCss, 'utf8');

// Clean up temp file
execSync(`rm "${mobileScssInput}"`);

const scssSize = scssSource.length;
const webCssSize = readFileSync(webCssOutput, 'utf8').length;
const webCssPct = ((1 - webCssSize / scssSize) * 100).toFixed(1);
console.log(`module-components.scss → module-components.desktop.min.css  (${scssSize} → ${webCssSize} bytes, ${webCssPct}% smaller)`);

const mobileCssSize = readFileSync(mobileCssOutput, 'utf8').length;
const mobileCssPct = ((1 - mobileCssSize / scssSize) * 100).toFixed(1);
console.log(`module-components.scss → module-components.mobile.min.css  (${scssSize} → ${mobileCssSize} bytes, ${mobileCssPct}% smaller)`);
