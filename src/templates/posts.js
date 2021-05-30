import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import Catlist from "../components/catlist"

import * as style from "./single.module.css"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Pagination from "../components/pagination"

const ArticleIndex = ({ data, pageContext }) => {
  const posts = data.allWpPost.nodes
  return (
    <Layout>
      <Seo title="Articles" />
      <section className={style.articlelist}>
        <h1>Posts</h1>
        {posts.map((post, index) => (
          <article key={index} className={style.listitem}>
            {post.featuredImage && (
              <figure className={style.featimg}>
                <Link to={post.uri}>
                  <Img
                    fluid={
                      post.featuredImage.node.localFile.childImageSharp.fluid
                    }
                    alt={post.featuredImage.node.altText}
                  />
                </Link>
              </figure>
            )}
            <h2 className={style.article__title}>
              <Link to={`/posts${post.uri}`}>{post.title}</Link>
            </h2>
            <div className={style.article__meta}>
              by {post.author.node.name}. Published{" "}
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}{" "}
            </div>
            <div
              className={style.article__content}
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
            <Catlist postObject={post} />
          </article>
        ))}
      </section>
      <Pagination pageContext={pageContext} />
    </Layout>
  )
}

export default ArticleIndex

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    allWpPost(sort: { fields: date, order: DESC }, skip: $skip, limit: $limit) {
      nodes {
        date
        databaseId
        excerpt
        uri
        slug
        title
        author {
          node {
            name
          }
        }
        categories {
          nodes {
            name
            link
          }
        }
        tags {
          nodes {
            name
            link
          }
        }
        featuredImage {
          node {
            altText
            localFile {
              childImageSharp {
                fluid(maxWidth: 1360) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
