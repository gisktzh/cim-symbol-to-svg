import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import cimSymbolToSVG from '@/index'

describe('Functional Tests for SVG Generation', () => {
  function readJson(fileName: string) {
    const filePath = path.join(__dirname, '..', 'data', fileName)
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  }

  function readSvg(fileName: string) {
    const filePath = path.join(__dirname, '..', 'data', fileName)
    return fs.readFileSync(filePath, 'utf-8')
  }

  function testSVGGeneration(jsonFile: string, svgFile: string) {
    it(`should generate correct SVG for ${jsonFile}`, () => {
      const jsonData = readJson(jsonFile)
      const expectedSvg = readSvg(svgFile)

      const generatedSvg = cimSymbolToSVG(jsonData)

      expect(generatedSvg).toBeTruthy()

      // Normalize the SVG for comparison (i.e. remove dynamic IDs)
      const normalizedGeneratedSvg = generatedSvg!.outerHTML.replace(
        /id=".*?"/g,
        'id="test-id"'
      )

      expect(normalizedGeneratedSvg).toBe(expectedSvg)
    })
  }

  // Run the tests for each symbol set
  testSVGGeneration('a11y.json', 'a11y.svg')
  testSVGGeneration('aed.json', 'aed.svg')
  testSVGGeneration('gorilla.json', 'gorilla.svg')
  testSVGGeneration('chevron.json', 'chevron.svg')
  testSVGGeneration('casino.json', 'casino.svg')
})
