import React from 'react';
import { graphql, Link } from 'gatsby';
import _ from 'lodash';
import urljoin from 'url-join';
import { DiscussionEmbed } from 'disqus-react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import PostCard from '../components/post-card/post-card';
import PostDetails from '../components/post-details/post-details';
import Sidebar from '../containers/sidebar';
import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
  RedditShareButton,
} from 'react-share';
import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoPinterest,
  IoLogoReddit,
} from 'react-icons/io';
import {
  BlogPostDetailsWrapper,
  RelatedPostWrapper,
  RelatedPostItems,
  RelatedPostTitle,
  RelatedPostItem,
  BlogPostFooter,
  PostShare,
  PostTags,
  BlogPostComment,
  BlogDetailsContent,
} from './templates.style';
import { getImage } from 'gatsby-plugin-image';

const BlogPostTemplate = (props: any) => {
  const post = props.data.wpPost;
  // const { edges } = props.data.allMarkdownRemark;
  const title = post.title;
  const slug = post.slug;
  const siteUrl = props.data.site.siteMetadata.siteUrl;
  // const shareUrl = urljoin(siteUrl, slug);

  const featuredImage = getImage(post.featuredImage?.node?.localFile);
  // const disqusConfig = {
  //   shortname: process.env.GATSBY_DISQUS_NAME,
  //   config: { identifier: slug, title },
  // };

  return (
    <Layout>
      <SEO
        title={post.title}
        description={post.excerpt}
      />
      <BlogPostDetailsWrapper>
        <BlogDetailsContent>
          <PostDetails
            title={post.title}
            date={post.date}
            preview={featuredImage}
            description={post.content}
          />

          <BlogPostFooter>
            {post?.frontmatter?.tags == null ? null : (
              <PostTags className="post_tags">
                {post?.frontmatter?.tags.map((tag: string, index: number) => (
                  <Link key={index} to={`/tags/${_.kebabCase(tag)}/`}>
                    {`#${tag}`}
                  </Link>
                ))}
              </PostTags>
            )}
            {/* <PostShare>
              <span>Share This:</span>
              <FacebookShareButton url={shareUrl} quote={post.excerpt}>
                <IoLogoFacebook />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl} title={title}>
                <IoLogoTwitter />
              </TwitterShareButton>
              <PinterestShareButton
                url={shareUrl}
                media={urljoin(siteUrl, post?.publicURL)}
              >
                <IoLogoPinterest />
              </PinterestShareButton>
              <RedditShareButton
                url={shareUrl}
                title={`${post.title}`}
              >
                <IoLogoReddit />
              </RedditShareButton>
            </PostShare> */}
          </BlogPostFooter>

          {/* <BlogPostComment>
            <DiscussionEmbed {...disqusConfig} />
          </BlogPostComment> */}
        </BlogDetailsContent>
        <Sidebar />
      </BlogPostDetailsWrapper>
{/* 
      {edges.length !== 0 && (
        <RelatedPostWrapper>
          <RelatedPostTitle>Related Posts</RelatedPostTitle>
          <RelatedPostItems>
            {edges.map(({ node }: any) => {
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
                <RelatedPostItem key={node.fields.slug}>
                  <PostCard
                    title={node.frontmatter.title || node.fields.slug}
                    url={node.fields.slug}
                    image={
                      node.frontmatter.cover == null
                        ? null
                        : node.frontmatter.cover.childImageSharp.gatsbyImageData
                    }
                    tags={node.frontmatter.tags}
                    placeholderBG={setColor}
                  />
                </RelatedPostItem>
              );
            })}
          </RelatedPostItems>
        </RelatedPostWrapper>
      )} */}
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
 query ($id: String!) {
  site {
    siteMetadata {
      siteUrl
    }
  }
  wpPost(id: {eq: $id}) {
    id
    excerpt
    content
    title
    date(formatString: "DD MMM, YYYY")
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
  }
}
`;
