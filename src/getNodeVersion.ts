import fs from 'fs'
import { join, resolve } from 'path'

import compareVersions from 'compare-versions'
import latestVersion from 'latest-version'

/**
 * Find package.json with path.
 * 
 * @param path
 */
export function findPackageJson(path: string): string {

  let dir = path;
  dir = resolve(dir);

  const packagePath = join(dir, "package.json");
  const pkg = require(packagePath);

  return JSON.stringify(pkg);
}

/**
 * Get version field within package.json
 * @param path
 */
export function getNodeVersion(path: string): string {
  const packageJson = findPackageJson(path)

  return JSON.parse(packageJson)?.version
}

export async function compareTheseVersions(
  pkg_name: string,
  current_local_version: string
): Promise<{ pkg_npm_version: String, npm_is_greater: Boolean }> {
  // latest version on NPM registry
  const pkg_npm_version: string = await latestVersion(pkg_name)

  const npm_is_greater: boolean = compareVersions.compare(
    pkg_npm_version,
    current_local_version,
    '>'
  )

  return {
    pkg_npm_version,
    npm_is_greater
  }
}
