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
      content = content.replace(/(from\s+['"]\.\/[^'"]+)/g, '$&.js')
      fs.writeFileSync(fullPath, content, 'utf-8')
    }
  })
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))

fixImports(path.resolve(__dirname, 'dist'))
