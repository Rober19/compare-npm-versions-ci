import fs from 'fs'

import {
  findPackageJson,
  getNodeVersion,
  compareTheseVersions
} from '../src/getNodeVersion'

const fixturePath = './__tests__/fixture'
const fixture = `./__tests__/fixture/package.json`

describe('getNodeVersion', () => {
  describe('findPackageJson', () => {
    test('find package.json', () => {
      const result = findPackageJson(fixturePath)

      expect(result).toBe(fs.readFileSync(fixture).toString())
    })
  })

  describe('getNodeVersion', () => {
    test('get version text within package.json', () => {
      const result = getNodeVersion(fixturePath)

      expect(result).toBe('1.0.0')
    })
  })

  describe('getComparison', () => {
    test('check findPackageJson, getNodeVersion & latestVersion', async () => {
      const current_local_version: string = getNodeVersion(fixturePath)

      const SAMPLE = JSON.parse(fs.readFileSync(fixture).toString())

      const { npm_is_greater } = await compareTheseVersions(
        SAMPLE.name,
        current_local_version
      )

      const isBoolean = () => {
        return typeof npm_is_greater === 'boolean'
      }

      expect(isBoolean()).toBe(true)
    })
  })
})
