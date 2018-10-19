#!/usr/bin/env bash
set -e
export DEPLOY_ROOT=$( cd "$( dirname "$0")" && pwd )
echo $DEPLOY_ROOT
IMAGE_NAME="xiaoyao:web"
echo $IMAGE_NAME

docker build -f rain_django.dockerfile -t ${IMAGE_NAME} ${PROJECT_ROOT}
cd ${DEPLOY_ROOT}
docker build -f Dockerfile -t ${IMAGE_NAME} ${DEPLOY_ROOT}