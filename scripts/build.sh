#!/bin/bash

set -e

cd "$(dirname "$0")/.."

echo "🏗️  构建项目..."

npm run build
