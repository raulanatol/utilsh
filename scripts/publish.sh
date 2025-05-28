#!/bin/bash

check_git_status() {
    if [[ -n $(git status --porcelain) ]]; then
        echo "❌ There are uncommitted changes. Please commit your changes before publishing."
        exit 1
    fi
}

check_npm_auth() {
    if ! npm whoami &>/dev/null; then
        echo "❌ You are not authenticated with npm. Please run 'npm login' first."
        exit 1
    fi
}

update_version() {
    local version_type=$1
    
    case $version_type in
        "major")
            npm version major
            ;;
        "minor")
            npm version minor
            ;;
        "patch")
            npm version patch
            ;;
        *)
            echo "❌ Invalid version type. Use 'major', 'minor', or 'patch'"
            exit 1
            ;;
    esac
}

publish_package() {
    echo "📦 Publishing package..."
    if ! npm publish --access public; then
        echo "❌ Error publishing the package"
        exit 1
    fi
    echo "✅ Package published successfully"
}

show_usage() {
    echo "Usage: $0 [major|minor|patch]"
    echo "  major: Increment major version (1.0.0 -> 2.0.0)"
    echo "  minor: Increment minor version (1.0.0 -> 1.1.0)"
    echo "  patch: Increment patch version (1.0.0 -> 1.0.1)"
    exit 1
}

main() {
    if [ $# -ne 1 ]; then
        show_usage
    fi

    echo "🚀 Starting publish process..."

    check_git_status
    check_npm_auth

    echo "🔨 Building package..."
    npm run build

    echo "📝 Updating version..."
    update_version "$1"

    publish_package

    echo "🎉 Publish process completed!"
}

main "$@"
