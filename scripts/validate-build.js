#!/usr/bin/env node

/**
 * Build Validation Script
 * Проверяет корректность сборки перед деплоем
 */

import { existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const DIST_DIR = 'dist';
const MAX_FILE_SIZE_MB = 5;
const REQUIRED_FILES = ['index.html', 'assets'];

console.log('🔍 Проверка сборки...\n');

let errors = 0;
let warnings = 0;

// 1. Проверка существования директории dist
if (!existsSync(DIST_DIR)) {
  console.error('❌ Директория dist не найдена. Запустите: npm run build');
  process.exit(1);
}

console.log('✅ Директория dist существует');

// 2. Проверка обязательных файлов
REQUIRED_FILES.forEach(file => {
  const filePath = join(DIST_DIR, file);
  if (!existsSync(filePath)) {
    console.error(`❌ Обязательный файл/папка не найден: ${file}`);
    errors++;
  } else {
    console.log(`✅ Найден: ${file}`);
  }
});

// 3. Проверка размеров файлов
function checkFileSizes(dir, basePath = '') {
  const files = readdirSync(dir);

  files.forEach(file => {
    const filePath = join(dir, file);
    const relativePath = join(basePath, file);
    const stats = statSync(filePath);

    if (stats.isDirectory()) {
      checkFileSizes(filePath, relativePath);
    } else {
      const sizeMB = stats.size / (1024 * 1024);

      if (sizeMB > MAX_FILE_SIZE_MB) {
        console.warn(`⚠️  Большой файл (${sizeMB.toFixed(2)} MB): ${relativePath}`);
        warnings++;
      }

      // Проверка на несжатые файлы
      if (file.endsWith('.js') && !file.includes('.min.') && sizeMB > 0.5) {
        console.warn(`⚠️  JS файл может быть несжат: ${relativePath}`);
        warnings++;
      }
    }
  });
}

checkFileSizes(DIST_DIR);

// 4. Проверка index.html
const indexPath = join(DIST_DIR, 'index.html');
if (existsSync(indexPath)) {
  const { readFileSync } = await import('fs');
  const indexContent = readFileSync(indexPath, 'utf-8');

  // Проверка на наличие критических элементов
  const checks = [
    { pattern: /<title>/i, name: 'title tag' },
    { pattern: /<meta.*description/i, name: 'meta description' },
    { pattern: /<meta.*viewport/i, name: 'viewport meta' },
    { pattern: /type="module"/i, name: 'script type=module' },
  ];

  checks.forEach(({ pattern, name }) => {
    if (!pattern.test(indexContent)) {
      console.warn(`⚠️  Отсутствует: ${name}`);
      warnings++;
    }
  });

  console.log('✅ index.html проверен');
}

// 5. Проверка структуры assets
const assetsPath = join(DIST_DIR, 'assets');
if (existsSync(assetsPath)) {
  const assets = readdirSync(assetsPath);
  const jsFiles = assets.filter(f => f.endsWith('.js'));
  const cssFiles = assets.filter(f => f.endsWith('.css'));

  if (jsFiles.length === 0) {
    console.error('❌ Не найдены JS файлы в assets');
    errors++;
  } else {
    console.log(`✅ Найдено JS файлов: ${jsFiles.length}`);
  }

  if (cssFiles.length === 0) {
    console.error('❌ Не найдены CSS файлы в assets');
    errors++;
  } else {
    console.log(`✅ Найдено CSS файлов: ${cssFiles.length}`);
  }
}

// 6. Итоги
console.log('\n' + '='.repeat(50));
console.log('📊 Результаты проверки:');
console.log(`   Ошибки: ${errors}`);
console.log(`   Предупреждения: ${warnings}`);
console.log('='.repeat(50) + '\n');

if (errors > 0) {
  console.error('❌ Сборка содержит критические ошибки!');
  process.exit(1);
} else if (warnings > 0) {
  console.warn('⚠️  Сборка содержит предупреждения, но готова к деплою');
  process.exit(0);
} else {
  console.log('✅ Сборка готова к деплою!');
  process.exit(0);
}
