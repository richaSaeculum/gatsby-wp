const _ = require('lodash');
const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;

    const blogPost = path.resolve(`./src/templates/blog-post.tsx`);
    const blogList = path.resolve(`./src/templates/blog-list.tsx`);
    const tagTemplate = path.resolve(`./src/templates/tags.tsx`);

    return graphql(`
    query allWpPost {
        allWpPost {
            nodes {
                id
                slug
                title
                uri
            }
        }
    }
    `).then((result) => {
        if (result.errors) {
            throw result.errors;
        }

        // Create blog posts pages.
        const posts = result.data.allWpPost.nodes;

        posts.forEach((post, index) => {
            const previous =
                index === posts.length - 1 ? null : posts[index + 1];
            const next = index === 0 ? null : posts[index - 1];
            createPage({
                path: post.uri,
                component: blogPost,
                context: {
                    id: post.id,
                    slug: post.slug,
                    previous,
                    next,
                },
            });
        });

        // Create blog post list pages
        const postsPerPage = 4;
        const numPages = Math.ceil(posts.length / postsPerPage);

        Array.from({ length: numPages }).forEach((_, i) => {
            createPage({
                path: i === 0 ? `/page/1` : `/page/${i + 1}`,
                component: blogList,
                context: {
                    limit: postsPerPage,
                    skip: i * postsPerPage,
                    numPages,
                    currentPage: i + 1,
                },
            });
        });

        // Tag pages:
        let tags = [];
        // Iterate through each post, putting all found tags into `tags`
        _.each(posts, (edge) => {
            if (_.get(edge, 'node.frontmatter.tags')) {
                tags = tags.concat(edge.node.frontmatter.tags);
            }
        });
        // Eliminate duplicate tags
        tags = _.uniq(tags);

        // Make tag pages
        tags.forEach((tag) => {
            createPage({
                path: `/tags/${_.kebabCase(tag)}/`,
                component: tagTemplate,
                context: {
                    tag,
                },
            });
        });

        return null;
    });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;

    if (node.internal.type === `MarkdownRemark`) {
        const value = createFilePath({ node, getNode });
        if (typeof node.slug !== 'undefined') {
            createNodeField({
                node,
                name: 'slug',
                value: node.slug,
            });
        } else {
            const value = createFilePath({ node, getNode });
            createNodeField({
                node,
                name: 'slug',
                value,
            });
        }
    }
};

// for React-Hot-Loader: react-🔥-dom patch is not detected
exports.onCreateWebpackConfig = ({ getConfig, stage }) => {
    const config = getConfig();
    if (stage.startsWith('develop') && config.resolve) {
        config.resolve.alias = {
            ...config.resolve.alias,
            'react-dom': '@hot-loader/react-dom',
        };
    }
};

