const Promise = require('bluebird');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const webpack = require('webpack');
const gitRevisionPlugin = new GitRevisionPlugin();

exports.createPages = ({ graphql, actions } /* themeOptions */) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const staticPage = require.resolve('./src/components/StaticPage/index.js');
    const blogPost = require.resolve('./src/components/BlogPost/index.js');

    resolve(
      graphql(
        `
          {
            allContentfulStaticContent {
              edges {
                node {
                  title
                  slug
                }
              }
            }
            allWordpressPost {
              edges {
                node {
                  path
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors); // eslint-disable-line no-console
          reject(result.errors);
        }

        const pages = result.data.allContentfulStaticContent.edges;
        pages.forEach(page => {
          const path = page.node.slug === '/' ? '/' : `/${page.node.slug}/`;
          createPage({
            path: path,
            component: staticPage,
            context: {
              slug: page.node.slug,
            },
          });
        });

        const blogPosts = result.data.allWordpressPost.edges;

        blogPosts.forEach(post => {
          createPage({
            path: post.node.path,
            component: blogPost,
            context: {
              slug: post.node.path,
            },
          });
        });
      })
    );
  });
};

const clientId = process.env.COGNITO_APP_CLIENT_ID;

exports.onCreateWebpackConfig = ({ stage, actions }, { isXbge }) => {
  actions.setWebpackConfig({
    plugins: [
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(isXbge ? gitRevisionPlugin.version() : ''),
        COMMITHASH: JSON.stringify(
          isXbge ? gitRevisionPlugin.commithash() : ''
        ),
        APP_CLIENT_ID: JSON.stringify(clientId),
        'process.env': {
          STATIC: stage === 'build-html',
        },
      }),
    ],
  });
};

/**
 * Allows routes for user profile pages, and serves the user profile pages to those routes
 */
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path.match(/^\/mensch/)) {
    page.matchPath = '/mensch/*';
    page.component = require.resolve('./src/pages/mensch/index.js');
    createPage(page);
  }
};
