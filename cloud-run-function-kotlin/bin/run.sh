#!/usr/bin/env bash

set -e -u -x

current_directory="$(
  cd "$(dirname "$0")" >/dev/null 2>&1
  pwd -P
)/.."
cd "$current_directory"

./gradlew clean zipJar
terraform -chdir="terraform" apply --auto-approve
