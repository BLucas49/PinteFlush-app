const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Modèles 3D chargés par Viro (require('...glb')).
config.resolver.assetExts.push('glb', 'gltf', 'obj', 'mtl', 'vrx', 'hdr');

module.exports = config;
