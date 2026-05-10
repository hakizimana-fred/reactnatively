const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

const workspaceRoot = path.resolve(__dirname, '../..');
const projectRoot   = __dirname;

config.watchFolders = [workspaceRoot];

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// Force react and react-native to always resolve from the app's node_modules,
// regardless of which version a workspace package resolved as a peer.
// resolveRequest runs before hierarchical lookup and overrides it.
const singletons = {
  'react':                   path.resolve(projectRoot, 'node_modules/react'),
  'react-native':            path.resolve(projectRoot, 'node_modules/react-native'),
  'react-native-reanimated': path.resolve(projectRoot, 'node_modules/react-native-reanimated'),
  'reactnatively':           path.resolve(projectRoot, 'node_modules/reactnatively'),
};

config.resolver.resolveRequest = (context, moduleName, platform) => {
  const pinned = singletons[moduleName];
  if (pinned) {
    return context.resolveRequest(
      { ...context, originModulePath: path.join(pinned, '_') },
      moduleName,
      platform,
    );
  }
  return context.resolveRequest(context, moduleName, platform);
};

config.resolver.disableHierarchicalLookup = false;

config.cacheStores = [];
config.cacheVersion = '1';

module.exports = config;
