module.exports = {
  plugins: [
    {
      resolve: "gatsby-theme",
      options: {
        message: "Hello Theme",
        siteUrl: "https://expedition-grundeinkommen.de",
        matomoUrl: "https://expeditiongrundeinkommen.matomo.cloud",
        basePath: "/",
        assetPath: "assets",
      },
    },
  ],
};
