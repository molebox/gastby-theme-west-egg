// src/pages/index.js
import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { Container, Header, Text, Box, Grid, Hero, Button, Content, Footer } from 'gatsby-theme-west-egg-style';
import colors from 'gatsby-theme-west-egg-style/src/utils/colors';

const layout = `display: grid;
grid-template-columns: .2fr 2fr .2fr;
grid-template-rows: .5fr 1fr 1fr;

grid-template-areas:
". header ."
". hero .";

height: 100vh;
margin: 1rem;
grid-gap: 2rem;`

const isOdd = (number: number) => number % 2;

const BlogIndex = ({ data }: any) => {
  const { edges: posts } = data.allMdx

  const blogs = posts.map(({ node: post }: any, index: number) => (
    <Box color={isOdd(index) ? colors.primary : colors.light} key={post.id}>
      <Link style={{textDecoration: 'none'}} to={post.fields.slug}>
        <Text color={isOdd(index) ? 'white' : colors.primary}>{post.frontmatter.title}</Text>
      </Link>
      <div style={{marginTop: '2rem'}}>
      <Text color={isOdd(index) ? 'white' : colors.primary} fontSize="1rem">{post.frontmatter.author} - {post.frontmatter.date}</Text>
      </div>
    </Box>
  ));

  return (
    <Container customGrid={layout}>
      <Header>
        <Box color={colors.accent}>
          <Text>West Egg Blog</Text>
        </Box>
        <Link to="/">
					<Button text="take me 🏡" />
				</Link>
      </Header>
      <Hero>
      <Grid elements={blogs}/>
      </Hero>
    </Container>
  )
}
export const pageQuery = graphql`
  query blogIndex {
    allMdx {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            author
            date
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
export default BlogIndex