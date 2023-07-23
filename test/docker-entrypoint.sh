#!/bin/sh

set -eux

# Check if the web server is up and running using dockerize
dockerize -wait tcp://web:80 -timeout 30s

# Run the tests (tini as PID != 1)
tini -s -- "$@"