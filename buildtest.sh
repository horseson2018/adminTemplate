#! /bin/bash

deploy_dir="deploy/xhkx-vue"

# cleanup
rm -f ${deploy_dir}/*

npm install
npm run pub

if [ $? -eq 0 ]; then
    mv dist/*  ${deploy_dir}
fi
rm -rf dist
