require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `StoryHub`,
    author: `Monnisa`,
    about: `Breakfast procuring no end happiness allowance assurance frank. Met simplicity nor difficulty unreserved who. Entreaties mr conviction dissimilar me
    astonished estimating cultivated.`,
    description: `A Gatsby Blog`,
    siteUrl: `https://storyhub-personal-tarex.redq.now.sh`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        minify: false, // Breaks styles if not set to false
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              linkImagesToOriginal: true,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
              strict: `ignore`,
            },
          },
          {
            resolve: `gatsby-remark-mermaid`,
          },
          {
            resolve: `gatsby-remark-prismjs`,
          },

          {
            resolve: `gatsby-remark-copy-linked-files`,
          },
          {
            resolve: `gatsby-remark-smartypants`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-transformer-sharp`,
    },
    {
      resolve: `gatsby-plugin-sharp`,
    },
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   // options: {
    //   //   trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID || '', //`ADD YOUR TRACKING ID HERE`,
    //   // },
    // },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `StoryHub - Personal Blog`,
        short_name: `StoryHub`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/favicon.png`,
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: `https://gatsby.saeculumsolutions.com/graphql`,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
    },
    {
      resolve: `gatsby-plugin-react-helmet`,
    },
    {
      resolve: `gatsby-plugin-lodash`,
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: process.env.MAILCHIMP_ENDPOINT, // add your MC list endpoint here; see instructions below
      },
    },
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        google: {
          families: [
            'Poppins:300,400,500,600,700',
            'Fira Sans:100,300,400,500,600,700',
          ],
        },
      },
    },
  ],
};
