#!/usr/bin/env bash

set -eu

source "$RAUTILS_PATH/src/shell/cout"
source "$RAUTILS_PATH/src/shell/assert"
source "$RAUTILS_PATH/src/development/semversion"
source "$RAUTILS_PATH/src/git/git"

assert::total_arguments $# 1 "Please specify the version increase: minor | major | patch"
assert::git::not::has_changes
assert::git::on_master

BRANCH=$(git::current_branch)
CURRENT_VERSION=$(cat version)
NEW_VERSION=$(semversion::increase "$CURRENT_VERSION" "$1")

change_version() {
  echo "$NEW_VERSION" >version
}

create_tag() {
  git commit -am "Close version $NEW_VERSION"
  git tag "v$NEW_VERSION" -a "$NEW_VERSION"
  git push origin --tags
}

verify_master_branch
change_version "$1"
create_tag
