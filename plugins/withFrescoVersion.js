const { withAppBuildGradle } = require('expo/config-plugins');

// @reactvision/react-viro 3.0.3 est compilé pour React Native 0.86 (Fresco 3.6.0), alors que RN 0.88
// embarque Fresco 3.7.0 : son ImageDownloader plante (NoSuchMethodError sur DefaultExecutorSupplier)
// dès qu'une cible de tracking d'image est créée. On force donc Fresco 3.6.0.
// À retirer dès que Viro supporte RN 0.88.
const FRESCO_VERSION = '3.6.0';
const MARKER = '// withFrescoVersion';

const withFrescoVersion = (config) =>
  withAppBuildGradle(config, (mod) => {
    if (!mod.modResults.contents.includes(MARKER)) {
      mod.modResults.contents += `
      ${MARKER}
      configurations.all {
          resolutionStrategy.eachDependency { details ->
              if (details.requested.group == 'com.facebook.fresco') {
                  details.useVersion '${FRESCO_VERSION}'
              }
          }
      }
      `;
    }
    return mod;
  });

module.exports = withFrescoVersion;
