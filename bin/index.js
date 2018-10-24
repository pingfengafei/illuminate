#!/usr/bin/env node

const path = require('path')
const spawn = require('cross-spawn')


let argv = process.argv
let commands = new Set(['start, dev'])
let cmd = argv[2]
let args = argv.slice(3)

// ignore --inspect in first version

let scriptPath = path.join(__dirname, `./${cmd}.js`)

const startProcess = () => {
  const proc = spawn('node', [scriptPath, ...args], { stdio: 'inherit', customFds: [0, 1, 2] })
  proc.on('close', (code, signal) => {
    if (code !== null) {
      process.exit(code)
    }
    if (signal) {
      if (signal === 'SIGKILL') {
        process.exit(137)
      }
      console.log(`got signal ${signal}, exiting`)
      process.exit(signal === 'SIGINT' ? 0 : 1)
    }
    process.exit(0)
  })
  proc.on('error', (err) => {
    console.error(err)
    process.exit(1)
  })
  return proc
}

let proc = startProcess()

const wrapper = () => {
  if (proc) {
    proc.kill()
  }
}
process.on('SIGINT', wrapper)
process.on('SIGTERM', wrapper)
process.on('exit', wrapper)

if (cmd === 'dev') {
  const {watchFile} = require('fs')
  watchFile(`${process.cwd()}/${CONFIG_FILE}`, (cur, prev) => {
    if (cur.size > 0 || prev.size > 0) {
      console.log(`\n> Found a change in ${CONFIG_FILE}, restarting the server...`)
      // Don't listen to 'close' now since otherwise parent gets killed by listener
      proc.removeAllListeners('close')
      proc.kill()
      proc = startProcess()
    }
  })
}