#!/bin/sh
commands=$(ls -1 node_modules/moleculer-repl/src/commands/*.js | grep -vF index.js)

cat <<- EOF
"use strict";

$(for command in ${commands}; do echo "const { register: $(basename ${command} .js)Register } = require('./$(basename ${command})');"; done)

module.exports = function (program, broker) {
$(for command in ${commands}; do echo "  $(basename ${command} .js)Register(program, broker);"; done)
};
EOF
