import Link from 'next/link'
import styles from '../styles/card.module.scss'

interface CardProps {
    card: {id: string | number
      title: string
      body: string
    }
  }

export default function Card({card}: CardProps) {
    return (
      <div className={styles.root}>
        <div className={styles.left}>
          
        </div>
        <div className={styles.right}>
          <Link href={`/project/[id]`} as={`/project/${card.id}`}>
            <a>{card.title}</a>
          </Link>
        </div>
      </div>
    )
  }
