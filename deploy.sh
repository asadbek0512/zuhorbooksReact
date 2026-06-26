#!/bin/bash
set -e
git fetch origin main
git reset --hard origin/main
npm ci
npm run build
rm -rf ../frontend/*
cp -r build/* ../frontend/
