import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h1>All articles</h1>
    <ul>
      {data.allStrapiArticle.edges.map(document => (
        <li key={document.node.strapiId}>
          <h2>
            <Link to={`/blog/${document.node.slug}`}>
              {document.node.title}
            </Link>
          </h2>
          <Img fixed={document.node.images.childImageSharp.fixed} />
          <p>{document.node.content}</p>
        </li>
      ))}
    </ul>
  </Layout>
)

export default IndexPage

export const data = graphql`
  query MyQuery {
    allStrapiArticle {
      edges {
        node {
          slug
          strapiId
          title
          content
          images {
            childImageSharp {
              fixed(width: 200, height: 125) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`
