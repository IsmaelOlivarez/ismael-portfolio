#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🚀 Portfolio Content Generator')
console.log('===============================\n')

// Create directories if they don't exist
const dirs = [
  'content/projects',
  'content/blog',
  'public/images/projects',
  'public/images/blog'
]

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
    console.log(`✅ Created directory: ${dir}`)
  }
})

// Copy template files
const templates = [
  {
    src: 'content/projects/_TEMPLATE.mdxtmpl',
    dest: 'content/projects/_TEMPLATE.mdxtmpl'
  },
  {
    src: 'content/blog/_TEMPLATE.mdxtmpl',
    dest: 'content/blog/_TEMPLATE.mdxtmpl'
  }
]

templates.forEach(({ src, dest }) => {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest)
    console.log(`✅ Copied template: ${dest}`)
  }
})

console.log('\n🎉 Content generation complete!')
console.log('\nNext steps:')
console.log('1. Add your project images to public/images/projects/')
console.log('2. Add your blog images to public/images/blog/')
console.log('3. Replace placeholder resume.pdf with your actual resume')
console.log('4. Update site.config.ts with your headshot path if you have one')
console.log('5. Customize the content in content/projects/ and content/blog/')
