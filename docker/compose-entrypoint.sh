#!/bin/sh

set -e

if [ ! -f /r1connect/storage/.env ]; then
  >&2 echo "Saving environment variables"
  ENCRYPTION_KEY="${ENCRYPTION_KEY:-$(openssl rand -base64 36)}"
  WEBHOOK_SECRET_KEY="${WEBHOOK_SECRET_KEY:-$(openssl rand -base64 36)}"
  APP_SECRET_KEY="${APP_SECRET_KEY:-$(openssl rand -base64 36)}"
  echo "ENCRYPTION_KEY=$ENCRYPTION_KEY" >> /r1connect/storage/.env
  echo "WEBHOOK_SECRET_KEY=$WEBHOOK_SECRET_KEY" >> /r1connect/storage/.env
  echo "APP_SECRET_KEY=$APP_SECRET_KEY" >> /r1connect/storage/.env
fi

# initiate env. vars. from /r1connect/storage/.env file
export $(grep -v '^#' /r1connect/storage/.env | xargs)

# migration for webhook secret key, will be removed in the future.
if [[ -z "${WEBHOOK_SECRET_KEY}" ]]; then
  WEBHOOK_SECRET_KEY="$(openssl rand -base64 36)"
  echo "WEBHOOK_SECRET_KEY=$WEBHOOK_SECRET_KEY" >> /r1connect/storage/.env
fi

echo "Environment variables have been set!"

sh /entrypoint.sh
