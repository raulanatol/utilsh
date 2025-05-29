#!/bin/bash

REQUIRED_NODE_VERSION="24.1.0"
CURRENT_NODE_VERSION=$(node -v | cut -d'v' -f2)

if [ "$(printf '%s\n' "$REQUIRED_NODE_VERSION" "$CURRENT_NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_NODE_VERSION" ]; then
  echo "Error: Node.js version $REQUIRED_NODE_VERSION or higher is required"
  echo "Current version: $CURRENT_NODE_VERSION"
  exit 1
fi 
