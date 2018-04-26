#!/bin/bash
mkdir -p bundle
rm -rf ./bundle/*
mkdir -p bundle/web

# Copy extension bundle
echo 'Setting up static files'
cp -r ./dist ./bundle/web/dist/
rm -rf ./bundle/web/dist/*.js.map
cp -r ./fonts ./bundle/web/fonts
cp -r ./img ./bundle/web/img
cp -r ./css ./bundle/web/css
./syncImages.sh

cp ./index.html ./privacy.html ./tos.html ./bundle/web
echo 'Done'
