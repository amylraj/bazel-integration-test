load("@aspect_rules_js//js:defs.bzl", "js_binary", "js_library")
load("@aspect_rules_js//npm:defs.bzl", "npm_link_package")
load("@npm//:defs.bzl", "npm_link_all_packages")

npm_link_package(
    name = "node_modules/@endor-integration/game-logic",
    src = "//game-logic",
)

npm_link_all_packages(name = "node_modules")

js_binary(
    name = "game",
    data = [
        "//:game-server",
        "//:node_modules/@endor-integration/game-logic",
        "//:node_modules/lodash",
        "//:node_modules/moment",
    ],
    entry_point = "index.js",
)

js_library(
    name = "game-server",
    srcs = [
        "gameServer.js",
    ],
)
