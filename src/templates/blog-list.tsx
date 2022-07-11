import * as React from 'react';
import { graphql } from 'gatsby';
import PostCardModern from '../components/post-card-modern/post-card-modern';
import Pagination from '../components/pagination/pagination';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { BlogPostsWrapper, PostRow, PostGrid } from './templates.style';
import { getImage } from 'gatsby-plugin-image';

const BlogList = (props: any) => {
  const { data } = props;
  const Posts = data.allWpPost.edges;
  const { currentPage, numPages } = props.pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage =
    currentPage - 1 === 1 ? '/page/1' : `/page/${(currentPage - 1).toString()}`;
  const nextPage = `/page/${(currentPage + 1).toString()}`;
  const PrevLink = !isFirst && prevPage;
  const NextLink = !isLast && nextPage;


  return (
    <Layout>
      <SEO title={`Page ${currentPage}`} />

      <BlogPostsWrapper>
        <PostRow>
          {Posts.map(({node}: any) => {
            //get Blog image
            const featuredImage = getImage(node.featuredImage?.node?.localFile);
            // Random Placeholder Color
            const placeholderColors = [
              '#55efc4',
              '#81ecec',
              '#74b9ff',
              '#a29bfe',
              '#ffeaa7',
              '#fab1a0',
              '#e17055',
              '#0984e3',
              '#badc58',
              '#c7ecee',
            ];
            const setColor =
              placeholderColors[
              Math.floor(Math.random() * placeholderColors.length)
              ];
            return (
              <PostGrid>
                <PostCardModern
                  key={node.slug}
                  title={node.title || node.slug}
                  image={featuredImage}
                  url={node.uri}
                  description={node.excerpt}
                  date={node.date}
                  tags={node.tags}
                  placeholderBG={setColor}
                />
              </PostGrid>
            );
          })}
        </PostRow>
        <Pagination
          prevLink={PrevLink}
          nextLink={NextLink}
          currentPage={`${currentPage}`}
          totalPage={`${numPages}`}
        />
      </BlogPostsWrapper>
    </Layout>
  );
};

export default BlogList;

export const pageQuery = graphql`
query ($skip: Int!, $limit: Int!) {
  site {
    siteMetadata {
      title
    }
  }
  sitePage {
    path
  }
  allWpPost(limit: $limit, skip: $skip) {
    edges {
      node {
        id
        slug
        uri
        date(formatString: "DD [<span>] MMM [</span>]")
        title
        content
        excerpt
        featuredImage {
          node {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
        tags {
          nodes {
            name
          }
        }
      }
    }
  }
}

`;
