import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import SkillsChart from "../components/SkillsChart"

const IndexPage = () => (
  <Layout>
    <SkillsChart />
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
