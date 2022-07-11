import * as React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import Button from '../../../components/button/button';
import PostCardModern from '../../../components/post-card-modern/post-card-modern';
import BlogPostsWrapper, { PostRow, PostGrid, SeeMore } from './style';
import { getImage } from 'gatsby-plugin-image';

type PostsProps = {};

const Posts: React.FunctionComponent<PostsProps> = () => {

  const Data = useStaticQuery(graphql`
    query {
        site {
          siteMetadata {
            title
          }
        } 
        allWpPost{
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
    `
  );


  const Posts = Data.allWpPost.edges;

  return (
    <BlogPostsWrapper>
      <PostRow>
        {Posts.map(({node} : any) => {
          const title = node.title || node.slug;
          //get featured image
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
            <PostGrid key={node.slug}>
              <PostCardModern
                key={node.slug}
                title={title}
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
      <SeeMore>
        <Link to="page/1">
          <Button title="See more" type="submit" />
        </Link>
      </SeeMore>
    </BlogPostsWrapper>
  );
};

export default Posts;



