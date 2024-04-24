#!/bin/bash
cd /ctfserver/bun
bun ./build &
cd /ctfserver/server
bun index.ts &

exec /bin/bash