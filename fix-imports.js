import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

function fixImports(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file)
    if (fs.lstatSync(fullPath).isDirectory()) {
      fixImports(fullPath)
    } else if (path.extname(fullPath) === '.js') {
      let content = fs.readFileSync(fullPath, 'utf-8')
      // Only add .js if it doesn't already end with .js
      content = content.replace(/(from\s+['"](\.{1,2}\/[^'"]+))(?<!\.js)(['"])/g, '$1.js$3')
      content = content.replace(/(import\s+[^'"]+\s+from\s+['"](\.{1,2}\/[^'"]+))(?<!\.js)(['"])/g, '$1.js$3')
      fs.writeFileSync(fullPath, content, 'utf-8')
    }
  })
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))

fixImports(path.resolve(__dirname, 'dist'))
