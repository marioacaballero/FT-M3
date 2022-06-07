const fs = require("fs");
const request = require('request');

module.exports = {
  date: (args, done) => {
    done(Date())
  },
  pwd: (args, done) => {
    done(process.cwd())
  },
  ls: (args, done) => {
    fs.readdir('.', function (err, files) {
      let output = "";

      if (err) throw err;
      files.forEach(function (file, index) {
        output += (index === 0 ? "" : "\n") + file.toString()
      })
      done(output)
    });
  },
  echo: (args, done) => {
    done(args.join(" "))
  },
  cat: (args, done) => {
    fs.readFile(args[0], "utf-8", (err, data) => {
      if (err) throw err
      done(data)
    })
  },
  head: (args, done) => {
    fs.readFile(args[0], "utf-8", (err, data) => {
      if (err) throw err
      const lines = data.split("\n")
      done(lines.slice(0, (args[1] ? parseInt(args[1]) : 10)).join("\n"))
    })
  },
  tail: (args, done) => {
    fs.readFile(args[0], "utf-8", (err, data) => {
      if (err) throw err
      const lines = data.split("\n")
      done(lines.slice((args[1] ? parseInt(args[1]) : 10) * -1).join("\n"))
    })
  },
  clear: (args, done) => {
    done("\033c")
  },
  curl: (args, done) => {
    request(args[0], function (error, response, body) {
      if(error) throw error
      done(body)
    });
  }
}
