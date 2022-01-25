"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
exports.localFs = {
    readdir: name => fs.readdirSync(name),
    readlink: name => fs.readlinkSync(name),
    lstat: name => fs.lstatSync(name),
    stat: name => fs.statSync(name),
};
//# sourceMappingURL=fs.js.map