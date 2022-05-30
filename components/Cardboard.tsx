import {NextPageContext} from 'next'
import {useState, useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/home.module.scss'
import Card from './Card'

interface CardboardProps {
    cards: [{id: string | number
      title: string
      body: string
    }]
    className: string
  }

export default function Cardboard({cards, className}: CardboardProps) {
    return (
      <>
        {cards.map((card) =>
          <section key={card.id} className={className}>
            <Card card = {card}/>
          </section>
        )}
      </>
    )
  }
