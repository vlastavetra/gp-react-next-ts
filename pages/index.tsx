import {NextPageContext} from 'next'
import {useState, useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/home.module.scss'
import Cardboard from '../components/Cardboard'

interface ProjectsPageProps {
  projects: [{id: string | number
    title: string
    body: string
  }]
  general: [{id: string | number
      title: string
      body: string
  }]
}

export default function Home({ projects: serverProjects, general }: ProjectsPageProps) {
  const [projects, setProjects] = useState(serverProjects)

  console.log(general);

  useEffect(() => {
    async function load() {
      const response = await fetch('http://localhost:4000/projects')
      const json = await response.json()
      setProjects(json)
    }

    if (!serverProjects) {
      load()
    }
  }, [])

  if (!projects) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>George Reznikov Portfolio</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <section className={styles.section}>
          </section>
          <Cardboard
            cards = {projects}
            className = {styles.section}
          />
        </div>
      </main>
    </>
  )
}

Home.getInitialProps = async ({req}: NextPageContext) => {
  if (!req) {return {projects: null}}

  const response = await fetch('http://localhost:4000/projects')
  const projects = await response.json()
  const response2 = await fetch('http://localhost:4000/general')
  const general = await response2.json()

  return {projects, general}
}