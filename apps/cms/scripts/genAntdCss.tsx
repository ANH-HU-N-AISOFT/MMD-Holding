import { extractStyle } from '@ant-design/static-style-extract';
import fs from 'fs';

const outputPath = './app/css/antd.min.css';

const css = extractStyle();

fs.writeFileSync(outputPath, css);

console.log(`🎉 Antd CSS generated at ${outputPath}`);
