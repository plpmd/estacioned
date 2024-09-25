module.exports = ({ config }) => { 
  return {
    ...config,
    expo: {
      extra: {
        eas: {
          projectId: "f327a3a9-5a33-4cd2-a6a5-a4b6afc8eb33"
        }
      },
      android: {
        googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
        adaptiveIcon: {
          foregroundImage: "./assets/adaptive-icon.png",
          backgroundColor: "#ffffff"
        },
        package: "com.plpmd.estacioned"
      }
    }
  };
};
