#!/bin/sh

BASE_PATH=/svelte-transition-classes pnpm run build
git clone git@github.com:rmarscher/svelte-transition-classes.git --branch gh-pages --single-branch build-tmp
mv build-tmp/.git build/
rm -rf build-tmp
touch build/.nojekyll
cd build
git add .
git commit -m "Latest gh-pages"
git push origin gh-pages
