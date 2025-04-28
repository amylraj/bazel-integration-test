load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

http_archive(
    name = "aspect_rules_js",
    sha256 = "05576ae674015b112b7c40c165735386eb9917affe8013e310d5602a093f2382",
    strip_prefix = "rules_js-2.3.3",
    url = "https://github.com/aspect-build/rules_js/releases/download/v2.3.3/rules_js-v2.3.3.tar.gz",
)

load("@aspect_rules_js//js:repositories.bzl", "rules_js_dependencies")

rules_js_dependencies()

load("@aspect_rules_js//js:toolchains.bzl", "DEFAULT_NODE_VERSION", "rules_js_register_toolchains")

rules_js_register_toolchains(node_version = DEFAULT_NODE_VERSION)

load("@aspect_rules_js//npm:repositories.bzl", "npm_translate_lock")

npm_translate_lock(
    name = "npm",
    pnpm_lock = "//src/nodejs:pnpm-lock.yaml",
    verify_node_modules_ignored = "//:.bazelignore",
    yarn_lock = "//src/nodejs:yarn.lock",
)

load("@npm//:repositories.bzl", "npm_repositories")

npm_repositories()
