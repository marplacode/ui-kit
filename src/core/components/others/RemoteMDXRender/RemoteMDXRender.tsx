import { useEffect } from "react"
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
// import * as components from '../'
import { BackgroundLoader } from "../BackgroundLoader"

const components = { BackgroundLoader }

export const RemoteMDXRender = ({ source }) => {
  return <div className="wrapper">
  <MDXRemote {...source} components={components} />
</div>
}
export async function getStaticProps() {
  // MDX text - can be from a local file, database, anywhere
  const source = 'Some **mdx** text, with a component <Test />'
  const mdxSource = await serialize(source)
  return { props: { source: mdxSource } }
}