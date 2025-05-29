#!/bin/bash

# Only run in development
if [ "$NODE_ENV" = "production" ]; then
  echo "Skipping husky setup in production environment"
  exit 0
fi

echo "Setting up husky..."
husky 