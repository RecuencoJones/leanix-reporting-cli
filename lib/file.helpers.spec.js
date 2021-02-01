"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path_1 = require("path");
var file_helpers_1 = require("./file.helpers");
describe('File Helpers', function () {
    describe('loadCliConfig()', function () {
        it('loads default values', function () {
            var packageJson = {};
            expect(file_helpers_1.loadCliConfig(packageJson)).toEqual({
                distPath: './dist',
                buildCommand: './node_modules/.bin/webpack'
            });
        });
        it('loads override value for distPath', function () {
            var packageJson = {
                leanixReportingCli: {
                    distPath: '/tmp/build'
                }
            };
            expect(file_helpers_1.loadCliConfig(packageJson)).toMatchObject({
                distPath: '/tmp/build'
            });
        });
        it('loads override value for buildCommand', function () {
            var packageJson = {
                leanixReportingCli: {
                    buildCommand: 'make report'
                }
            };
            expect(file_helpers_1.loadCliConfig(packageJson)).toMatchObject({
                buildCommand: 'make report'
            });
        });
    });
    describe('loadLxrConfig()', function () {
        var rootDir = path_1.resolve(__dirname, '..');
        var cwdSpy, readFileSyncSpy;
        beforeEach(function () {
            cwdSpy = jest.spyOn(process, 'cwd');
            readFileSyncSpy = jest.spyOn(fs, 'readFileSync').mockImplementation();
            cwdSpy.mockReturnValue(rootDir);
            readFileSyncSpy.mockReturnValue(Buffer.from('{}'));
        });
        afterEach(function () {
            cwdSpy.mockRestore();
            readFileSyncSpy.mockRestore();
        });
        it('loads lxr.json from default location', function () {
            file_helpers_1.loadLxrConfig();
            expect(fs.readFileSync).toHaveBeenCalledWith(path_1.resolve(rootDir, 'lxr.json'));
        });
        it('loads lxr.json from given location', function () {
            file_helpers_1.loadLxrConfig('./config/lxr.json');
            expect(fs.readFileSync).toHaveBeenCalledWith(path_1.resolve(rootDir, './config/lxr.json'));
        });
    });
});
