#!/bin/sh

if [ ! -f .initialized ]; then
    echo "Initializing container"

    pwd
    ls

    make

    touch .initialized
fi

exec "$@"