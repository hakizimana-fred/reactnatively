const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Monorepo support — watch all workspace packages
const workspaceRoot = path.resolve(__dirname, '../..');
const projectRoot   = __dirname;

config.watchFolders = [workspaceRoot];

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// Ensure Metro resolves symlinked workspace packages
config.resolver.disableHierarchicalLookup = false;

module.exports = config;
