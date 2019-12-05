module.exports = {
  pathPrefix: "/react-flexbox-slideshow",
  plugins: [
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `React Flexbox Slideshow`,
        short_name: `React Slideshow`,
        start_url: `/`,
        background_color: `#000`,
        theme_color: `#1a68a9`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: `src/assets/gatsby-icon.png`, // This path is relative to the root of the site.
        include_favicon: true, // Include favicon
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline'
  ],
}
