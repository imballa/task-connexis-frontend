const path = require("path")

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogTemplate = path.resolve("./src/templates/article.js")
  const authorTemplate = path.resolve("./src/templates/author.js")
  const article = await graphql(`
    query MyQuery {
      allStrapiArticle {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)

  const author = await graphql(`
    query AuthorQuery {
      allStrapiAuthor {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)

  console.log("article :", article.data.allStrapiArticle.edges)
  console.log("author :", author.data.allStrapiAuthor.edges)

  article.data.allStrapiArticle.edges.forEach(edge => {
    createPage({
      component: blogTemplate,
      path: `/blog/${edge.node.slug}`,
      context: {
        slug: edge.node.slug,
      },
    })
  })

  author.data.allStrapiAuthor.edges.forEach(edge => {
    createPage({
      component: authorTemplate,
      path: `/authors/${edge.node.slug}`,
      context: {
        slug: edge.node.slug,
      },
    })
  })
}
