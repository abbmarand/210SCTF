#!/bin/bash
cd /ctfserver/web
bun ./build &
cd /ctfserver/server
bun index.ts &

tail -f /dev/null