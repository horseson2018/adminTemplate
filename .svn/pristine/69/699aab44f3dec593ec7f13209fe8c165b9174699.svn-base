#! /bin/bash

deploy_dir="deploy/xhkx-vue"

# cleanup
rm -f ${deploy_dir}/*

cnpm install
cnpm run dev

if [ $? -eq 0 ]; then
    mv dist/*  ${deploy_dir}
fi
rm -rf dist
