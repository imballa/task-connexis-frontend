import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"

const ArticleTemplate = ({ data }) => (
  <Layout>
    <h1>{data.strapiArticle.title}</h1>
    <p>
      by{" "}
      <Link to={`/authors/${data.strapiArticle.author.slug}`}>
        {data.strapiArticle.author.name}
      </Link>
    </p>
    <Img fluid={data.strapiArticle.images.childImageSharp.fluid} />
    <p>{data.strapiArticle.content}</p>
  </Layout>
)

export default ArticleTemplate

export const query = graphql`
  query ArticleTemplate($slug: String) {
    __typename
    strapiArticle(slug: { eq: $slug }) {
      title
      content
      images {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      author {
        id
        name
        slug
      }
    }
  }
`
