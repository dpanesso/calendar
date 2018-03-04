#!/bin/bash

git clone https://github.com/johnnyconroy/cryptowatch.git

cd cryptowatch

docker-compose up -d

docker-compose logs -f -t
