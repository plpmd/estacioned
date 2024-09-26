module.exports = {
  expo: {
    name: "Estacioned",
    slug: "estacioned",
    scheme: "estacioned",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    android: {
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
      adaptiveIcon: {
        foregroundImage: "./assets/icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.plpmd.estacioned"
    },
    extra: {
      eas: {
        projectId: "f327a3a9-5a33-4cd2-a6a5-a4b6afc8eb33"
      }
    },
    plugins: [
      "expo-router"
    ],
    owner: "plpmd"
  }
};
