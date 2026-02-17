#!/bin/bash

echo "🧹 Limpieza completa del proyecto..."

# Eliminar archivos de build y caché
rm -rf .next
rm -rf node_modules
rm -rf .turbo

# Eliminar archivos de lock antiguos
rm -f package-lock.json
rm -f yarn.lock
rm -f pnpm-lock.yaml

echo "✅ Archivos de caché eliminados"
echo ""

echo "📦 Reinstalando dependencias..."
npm install

echo ""
echo "✅ Dependencias instaladas"
echo ""

echo "🔧 Verificando configuración..."
if [ -f "next.config.ts" ]; then
    echo "✅ next.config.ts encontrado"
else
    echo "❌ next.config.ts NO encontrado - cópialo"
fi

if [ -f "tsconfig.json" ]; then
    echo "✅ tsconfig.json encontrado"
else
    echo "❌ tsconfig.json NO encontrado - cópialo"
fi

if [ -f ".env.local" ]; then
    echo "✅ .env.local encontrado"
else
    echo "⚠️  .env.local NO encontrado - créalo"
fi

echo ""
echo "🚀 Listo! Ahora ejecuta: npm run dev"
