import classes from './App.module.scss';
import PatternDesktop from './assets/pattern-divider-desktop.svg';
import PatternMobile from './assets/pattern-divider-mobile.svg';
import Dice from './assets/icon-dice.svg';
import { useState, useEffect } from 'react';
import axios from 'axios';


interface Advice {
  id: number | string
  advice: string
}

async function fetchData() : Promise<Advice> {
  const url = `https://api.adviceslip.com/advice?timestamp=${new Date().getTime()}`;
  const response = await axios.get(url);
  const advice: Advice = {
    id: response.data.slip.id,
    advice: response.data.slip.advice
  };
  return advice;
}

function App() {

  const [ advice, setAdvice ] = useState<Advice>({id: '', advice: ''});
 
  useEffect(() => {
    setTimeout(getNewAdvice, 500);
  }, []);

  function getNewAdvice(){
    fetchData()
    .then( response => setAdvice(response))
    .catch( err => console.log(err.message));
  }

  const cardStyle = advice.advice === '' ? 
    `${classes.adviceCard}  ${classes.loading}` : classes.adviceCard;

  const appStyle = advice.advice === '' ?
    `${classes.app} ${classes.loading}` : classes.app;


  return ( 
    <main className={appStyle}>
      <article className={cardStyle}>      
          <h1 className={classes.adviceTitle}>ADVICE #{advice.id}</h1>
          <p className={classes.advice}>"{advice.advice}"</p>
          <picture className={classes.sep}>
            <source srcSet={PatternMobile} media="(max-width: 600px)"/>
            <img src={PatternDesktop} alt=""/>
          </picture>
          <button className={classes.button} onClick={getNewAdvice} aria-label='next advice'>
            <img src={Dice} alt=""/>
          </button>        
      </article>
    </main>    
  );
}

export default App;
