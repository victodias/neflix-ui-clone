import React, { useEffect, useState } from 'react'
import './App.css'
import Tmdb from './Tmdb'
import MovieRow from './components/MovieRow/index.js'
import FeaturedMovie from './components/FeaturedMovie/index.js'
import Header from './components/Header/index.js'

export const App = () => {
  const [movieList, setMovieList] = useState([])
  const [featureData, setFeaturedData] = useState([])
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(() => {
    const loadAll = async () => {
      //pegando lista TOTAL
      let list = await Tmdb.getHomeList()
      setMovieList(list)

      //pegando filme em DESTAQUE
      let originals = list.filter((i) => i.slug === 'originals')
      let randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      )
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeaturedData(chosenInfo)
    }
    loadAll()
  }, [])

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }
    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return (
    <div className="page">
      <Header black={blackHeader} />

      {featureData && <FeaturedMovie item={featureData} />}
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
      <footer>
        {' '}
        Feito com{' '}
        <span role="img" aria-label="coração">
          ♥ por Camila Zeron
        </span>
        <br />
        Direitos de imagem para Netflix
        <br />
        Dados utilizados por Themoviedb.org
      </footer>
    </div>
  )
}
