#!/usr/bin/env bash

dot::list_contexts() {
  utilsh_contexts=$(ls "$UTILSH_PATH/src")

  echo "$utilsh_contexts" | grep -v core | sort -u
}

dot::list_context_scripts() {
  context="$1"

  utilsh_scripts=$(ls -p "$UTILSH_PATH/src/$context" 2>/dev/null | grep -v '/')

  echo "$utilsh_scripts" | sort -u
}

dot::list_scripts_path() {
  utilsh_contexts=$(find "$UTILSH_PATH/src" -maxdepth 2 -perm +111 -type f)

  printf "%s\n%s" "$utilsh_contexts" | sort -u
}
