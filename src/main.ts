import * as core from '@actions/core'
import { getNodeVersion, compareTheseVersions } from './getNodeVersion'

async function run(): Promise<void> {
  try {
    const path : any = core.getInput('path') || process.env.GITHUB_WORKSPACE;
    const npm_package_name = core.getInput('npm_package_name')

    core.info(`Load package.json at ${path}`)

    const local_version = getNodeVersion(path)

    core.info(`set output: local version: ${local_version}`)
    core.setOutput('version', local_version)

    const { npm_is_greater, pkg_npm_version } = await compareTheseVersions(npm_package_name, local_version)

    core.info(`set output: npm version: ${pkg_npm_version}`)
    core.setOutput('pkg_npm_version', `${pkg_npm_version}`)

    core.info(`set output: Is npm version greater than local?: ${npm_is_greater}`)
    core.setOutput('npm_is_greater', `${npm_is_greater}`)


  } catch (error) {
    //
    // console.log(error)
    core.setFailed(error)
  }
}

run()
