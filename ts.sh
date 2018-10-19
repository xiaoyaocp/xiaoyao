#!/usr/bin/env bash
set -e
export DEPLOY_ROOT=$( cd "$( dirname "$0")" && pwd )
echo $DEPLOY_ROOT
docker build -f rain_django.dockerfile -t ${IMAGE_NAME} ${PROJECT_ROOT}
