const fs = require('fs');
const path = require('path');

function processFiles(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fp = path.join(dir, file);
        if (fs.statSync(fp).isDirectory()) {
            if (file !== '.git' && file !== 'node_modules' && file !== '.next') {
                processFiles(fp);
            }
        } else if (['.html', '.js', '.json', '.txt', '.tsx', '.ts', '.css', '.md'].some(ext => fp.endsWith(ext))) {
            let content = fs.readFileSync(fp, 'utf8');
            let original = content;

            // Rebrand Solana -> Robinhood Chain
            content = content.replace(/\bSolana\b/g, 'Robinhood Chain');
            content = content.replace(/\bsolana\b/g, 'robinhood chain');
            content = content.replace(/\bSOLANA\b/g, 'ROBINHOOD CHAIN');

            // Rebrand pump.fun -> Pons Family
            content = content.replace(/pump\.fun/gi, 'Pons Family');

            // Twitter -> x.com
            content = content.replace(/twitter\.com/gi, 'x.com');

            if (content !== original) {
                fs.writeFileSync(fp, content);
                console.log('Updated:', fp);
            }
        }
    }
}

processFiles('.');
console.log('Done.');
