import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Img from "gatsby-image"

const UserTemplate = ({ data }) => (
  <Layout>
    {console.log("data", data)}
    <h1>{data.strapiAuthor.name}</h1>
    <div>
      {data.strapiAuthor.avatar.map(img => (
        <Img key={img} fixed={img.formats.thumbnail.childImageSharp.fixed} />
      ))}
    </div>
    <p>{data.strapiAuthor.bio}</p>

    <ul>
      {data.strapiAuthor.articles.map(article => (
        <li key={article.id}>
          <h2>
            <Link to={`/blog/${article.slug}`}>{article.title}</Link>
          </h2>
          <p>{article.content}</p>
        </li>
      ))}
    </ul>
  </Layout>
)

export default UserTemplate

export const query = graphql`
  query AuthorTemplate($slug: String!) {
    strapiAuthor(slug: { eq: $slug }) {
      strapiId
      slug
      name
      bio
      avatar {
        formats {
          thumbnail {
            childImageSharp {
              fixed(width: 300, height: 300) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
      articles {
        id
        slug
        title
        content
      }
    }
  }
`
