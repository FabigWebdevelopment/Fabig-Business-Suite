#!/usr/bin/env npx tsx

/**
 * Image Optimization Script
 *
 * Converts all images to WebP format with configurable quality.
 * Also generates thumbnails for mega menu usage.
 *
 * Usage:
 *   npm run optimize-images
 *   npx tsx scripts/optimize-images.ts
 *   npx tsx scripts/optimize-images.ts --quality=90
 *   npx tsx scripts/optimize-images.ts --thumbnails-only
 *
 * Features:
 * - Converts JPG/PNG to WebP at 95% quality (configurable)
 * - Generates small thumbnails (300px) for mega menu
 * - Generates medium thumbnails (600px) for cards
 * - Preserves original files as fallback
 * - Creates manifest of optimized images
 */

import * as fs from 'fs'
import * as path from 'path'
import sharp from 'sharp'

// ============================================================================
// Configuration
// ============================================================================

interface OptimizeConfig {
  inputDir: string
  quality: number
  generateThumbnails: boolean
  thumbnailSizes: {
    sm: number  // For mega menu
    md: number  // For cards
  }
  extensions: string[]
}

const defaultConfig: OptimizeConfig = {
  inputDir: './public/demo-electrician',
  quality: 95,
  generateThumbnails: true,
  thumbnailSizes: {
    sm: 300,   // Mega menu thumbnails
    md: 600,   // Card thumbnails
  },
  extensions: ['.jpg', '.jpeg', '.png'],
}

// ============================================================================
// Types
// ============================================================================

interface ImageManifest {
  generated: string
  config: OptimizeConfig
  images: ImageEntry[]
  stats: {
    totalOriginalSize: number
    totalOptimizedSize: number
    savingsPercent: number
  }
}

interface ImageEntry {
  original: string
  webp: string
  thumbnails?: {
    sm?: string
    md?: string
  }
  originalSize: number
  webpSize: number
  savedPercent: number
}

// ============================================================================
// Helper Functions
// ============================================================================

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function getFilesRecursively(dir: string, extensions: string[]): string[] {
  const files: string[] = []

  const items = fs.readdirSync(dir, { withFileTypes: true })

  for (const item of items) {
    const fullPath = path.join(dir, item.name)

    if (item.isDirectory()) {
      files.push(...getFilesRecursively(fullPath, extensions))
    } else if (item.isFile()) {
      const ext = path.extname(item.name).toLowerCase()
      if (extensions.includes(ext)) {
        files.push(fullPath)
      }
    }
  }

  return files
}

// ============================================================================
// Main Optimization Functions
// ============================================================================

async function convertToWebP(
  inputPath: string,
  outputPath: string,
  quality: number
): Promise<{ inputSize: number; outputSize: number }> {
  const inputSize = fs.statSync(inputPath).size

  await sharp(inputPath)
    .webp({ quality })
    .toFile(outputPath)

  const outputSize = fs.statSync(outputPath).size

  return { inputSize, outputSize }
}

async function createThumbnail(
  inputPath: string,
  outputPath: string,
  width: number,
  quality: number
): Promise<void> {
  await sharp(inputPath)
    .resize(width, null, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality })
    .toFile(outputPath)
}

async function optimizeImage(
  filePath: string,
  config: OptimizeConfig
): Promise<ImageEntry> {
  const dir = path.dirname(filePath)
  const basename = path.basename(filePath, path.extname(filePath))

  // Output paths
  const webpPath = path.join(dir, `${basename}.webp`)
  const smThumbPath = path.join(dir, `${basename}-thumb-sm.webp`)
  const mdThumbPath = path.join(dir, `${basename}-thumb-md.webp`)

  // Convert main image to WebP
  console.log(`  Converting: ${path.basename(filePath)}`)
  const { inputSize, outputSize } = await convertToWebP(filePath, webpPath, config.quality)

  const entry: ImageEntry = {
    original: filePath.replace(/\\/g, '/'),
    webp: webpPath.replace(/\\/g, '/'),
    originalSize: inputSize,
    webpSize: outputSize,
    savedPercent: Math.round((1 - outputSize / inputSize) * 100),
  }

  // Generate thumbnails if enabled
  if (config.generateThumbnails) {
    entry.thumbnails = {}

    // Small thumbnail for mega menu
    console.log(`    → Thumbnail (sm): ${config.thumbnailSizes.sm}px`)
    await createThumbnail(filePath, smThumbPath, config.thumbnailSizes.sm, config.quality)
    entry.thumbnails.sm = smThumbPath.replace(/\\/g, '/')

    // Medium thumbnail for cards
    console.log(`    → Thumbnail (md): ${config.thumbnailSizes.md}px`)
    await createThumbnail(filePath, mdThumbPath, config.thumbnailSizes.md, config.quality)
    entry.thumbnails.md = mdThumbPath.replace(/\\/g, '/')
  }

  return entry
}

// ============================================================================
// Main Script
// ============================================================================

async function main() {
  console.log('🖼️  Image Optimization Script\n')

  // Parse arguments
  const args = process.argv.slice(2)
  const config = { ...defaultConfig }

  for (const arg of args) {
    if (arg.startsWith('--quality=')) {
      config.quality = parseInt(arg.replace('--quality=', ''), 10)
    }
    if (arg === '--thumbnails-only') {
      config.generateThumbnails = true
    }
    if (arg.startsWith('--dir=')) {
      config.inputDir = arg.replace('--dir=', '')
    }
  }

  console.log(`📁 Input directory: ${config.inputDir}`)
  console.log(`🎯 Quality: ${config.quality}%`)
  console.log(`📐 Thumbnails: ${config.generateThumbnails ? 'Yes' : 'No'}`)
  if (config.generateThumbnails) {
    console.log(`   - Small: ${config.thumbnailSizes.sm}px (mega menu)`)
    console.log(`   - Medium: ${config.thumbnailSizes.md}px (cards)`)
  }
  console.log()

  // Check if directory exists
  if (!fs.existsSync(config.inputDir)) {
    console.error(`❌ Directory not found: ${config.inputDir}`)
    process.exit(1)
  }

  // Find all images
  const imageFiles = getFilesRecursively(config.inputDir, config.extensions)

  if (imageFiles.length === 0) {
    console.log('⚠️  No images found to optimize')
    process.exit(0)
  }

  console.log(`📷 Found ${imageFiles.length} images to optimize\n`)

  // Process each image
  const entries: ImageEntry[] = []
  let totalOriginalSize = 0
  let totalOptimizedSize = 0

  for (const filePath of imageFiles) {
    try {
      const entry = await optimizeImage(filePath, config)
      entries.push(entry)
      totalOriginalSize += entry.originalSize
      totalOptimizedSize += entry.webpSize

      console.log(`    ✅ Saved ${entry.savedPercent}% (${formatBytes(entry.originalSize)} → ${formatBytes(entry.webpSize)})`)
      console.log()
    } catch (error) {
      console.error(`    ❌ Failed to optimize: ${filePath}`)
      console.error(`       ${error}`)
      console.log()
    }
  }

  // Create manifest
  const manifest: ImageManifest = {
    generated: new Date().toISOString(),
    config,
    images: entries,
    stats: {
      totalOriginalSize,
      totalOptimizedSize,
      savingsPercent: Math.round((1 - totalOptimizedSize / totalOriginalSize) * 100),
    },
  }

  // Write manifest
  const manifestPath = path.join(config.inputDir, 'image-manifest.json')
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))

  // Summary
  console.log('═'.repeat(50))
  console.log('📊 Optimization Summary')
  console.log('═'.repeat(50))
  console.log(`   Images processed: ${entries.length}`)
  console.log(`   Original size:    ${formatBytes(totalOriginalSize)}`)
  console.log(`   Optimized size:   ${formatBytes(totalOptimizedSize)}`)
  console.log(`   Total saved:      ${formatBytes(totalOriginalSize - totalOptimizedSize)} (${manifest.stats.savingsPercent}%)`)
  console.log(`   Manifest:         ${manifestPath}`)
  console.log()
  console.log('✅ Optimization complete!')
  console.log()
  console.log('💡 Next steps:')
  console.log('   1. Update image references to use .webp extension')
  console.log('   2. Use -thumb-sm.webp for mega menu')
  console.log('   3. Use -thumb-md.webp for cards')
  console.log('   4. Keep originals as <source> fallback')
}

main().catch(console.error)
