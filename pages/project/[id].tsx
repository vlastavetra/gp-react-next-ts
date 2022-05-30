import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import {NextPageContext} from 'next'
import Head from 'next/head'
import Image from 'next/image'

interface PostPageProps {
  post: {
    id: string | number
    title: string
    body: string
  }
}

export default function Post({ post: serverPost }: PostPageProps) {
  const [post, setPosts] = useState(serverPost)
  const router = useRouter();

  useEffect(() => {
    console.log(post);
    async function load() {
      const response = await fetch(`http://localhost:4000/projects/${router.query.id}`)
      const json = await response.json()
      setPosts(json)
    }

    if (!serverPost) {
      load()
    }
  }, [])

  if (!post) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    )
  }

  return (
    <div>
      <h1>{post.title}</h1>
    </div>
  )
}

interface PostNextPageContext extends NextPageContext {
  query: {
    id: string
  }
}

Post.getInitialProps = async ({query , req}: PostNextPageContext) => {
  if(!req) {
    return {post: null}
  }

  const response = await fetch(`http://localhost:4000/projects/${query.id}`)
  const post = await response.json()

  return {post}
}