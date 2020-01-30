#!/bin/bash

curl -i -X POST \
  --url http://localhost:9001/services/ \
  --data 'name=court' \
  --data 'url=http://court-esb:3000'

curl -i -X POST \
--url http://localhost:9001/services/court/routes \
--data 'paths[]=/court'

curl -i -X POST \
  --url http://localhost:9001/services/ \
  --data 'name=traffic' \
  --data 'url=http://traffic-esb:3000'

curl -i -X POST \
--url http://localhost:9001/services/traffic/routes \
--data 'paths[]=/traffic'

curl -i -X POST \
  --url http://localhost:9001/services/ \
  --data 'name=sdb' \
  --data 'url=http://sdb-esb:3000'

curl -i -X POST \
--url http://localhost:9001/services/sdb/routes \
--data 'paths[]=/sdb'