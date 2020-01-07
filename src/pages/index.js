import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hello Evan</h1>
    <p>React + Automata + GraphQL + Gatsby + Netlify = A good time</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/reddit-app/">Go to Reddit app</Link>
  </Layout>
)

export default IndexPage
