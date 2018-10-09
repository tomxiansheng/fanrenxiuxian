/// 阅读 api.d.ts 查看文档
///<reference path="api.d.ts"/>

import * as path from 'path';
import { UglifyPlugin, CompilePlugin, ManifestPlugin, ExmlPlugin, EmitResConfigFilePlugin, TextureMergerPlugin, CleanPlugin } from 'built-in';
import { WxgamePlugin } from './wxgame/wxgame';
import { SubPackagePlugin } from './wxgame/SubPackage';
import { CustomPlugin } from './myplugin';
import * as defaultConfig from './config';

const config: ResourceManagerConfig = {

    buildConfig: (params) => {

        const { target, command, projectName, version } = params;
        const outputDir = `../${projectName}_wxgame`;
        if (command == 'build') {
            return {
                outputDir,
                commands: [
                    new CleanPlugin({ matchers: ["js", "resource","subpackage"] }),
                    new CompilePlugin({ libraryType: "debug", defines: { DEBUG: true, RELEASE: false } }),
                    new ExmlPlugin('commonjs'), // 非 EUI 项目关闭此设置
                    new WxgamePlugin(),
                    new UglifyPlugin([
                    {
                        sources: [
                            "libs/modules/egret/egret.js",
                            "libs/modules/game/game.js",
                            "libs/modules/eui/eui.js",
                            "libs/modules/assetsmanager/assetsmanager.js",
                            "libs/modules/tween/tween.js",
                            "libs/modules/socket/socket.js",
                            "resource/default.thm.js",
                        ],
                        target: "lib.min.js"
                    },
                    {
                        sources: ["main.js"],
                        target: "main.min.js"
                    }
                    ]),
                    // new ManifestPlugin({ output: 'manifest.js' })
                    new SubPackagePlugin({
                        output: 'manifest.js',
                        subPackages: [
                            {
                                root: "subpackage",
                                includes: [
                                    "main.min.js",
                                ]
                            }
                        ]
                    }),
                    new CustomPlugin(),
                ]
            }
        }
        else if (command == 'publish') {
            return {
                outputDir,
                commands: [
                    new CleanPlugin({ matchers: ["js", "resource","subpackage"] }),
                    new CompilePlugin({ libraryType: "release", defines: { DEBUG: false, RELEASE: true } }),
                    new ExmlPlugin('commonjs'), // 非 EUI 项目关闭此设置
                    new WxgamePlugin(),
                    new UglifyPlugin([
                    {
                        sources: [
                            "libs/modules/egret/egret.js",
                            "libs/modules/game/game.js",
                            "libs/modules/eui/eui.js",
                            "libs/modules/assetsmanager/assetsmanager.js",
                            "libs/modules/tween/tween.js",
                            "libs/modules/socket/socket.js",
                        ],
                        target: "lib.min.js"
                    },
                    {
                        sources: ["main.js"],
                        target: "main.min.js"
                    }
                    ]),
                    // new ManifestPlugin({ output: 'manifest.js' })
                    new SubPackagePlugin({
                        output: 'manifest.js',
                        subPackages: [
                            {
                                root: "subpackage",
                                includes: [
                                    "main.min.js",
                                ]
                            }
                        ]
                    }),
                    new CustomPlugin(),
                ]
            }
        }
        else {
            throw `unknown command : ${params.command}`;
        }
    },

    mergeSelector: defaultConfig.mergeSelector,

    typeSelector: defaultConfig.typeSelector
}



export = config;
