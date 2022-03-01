import classes from './App.module.scss';
import PatternDesktop from './assets/pattern-divider-desktop.svg';
import PatternMobile from './assets/pattern-divider-mobile.svg';
import Dice from './assets/icon-dice.svg';
import { useState, useEffect } from 'react';
import axios from 'axios';


const DEFAULT_ADVICE = {
  id: 117,
  advice: "\"It is easy to sit up and take notice, what's difficult is getting up and taking action.\""
}
type Advice = typeof DEFAULT_ADVICE;

function App() {

  const [ advice, setAdvice ] = useState<Advice>(DEFAULT_ADVICE);
  const [ update, setUpdate ] = useState<number>(0);

  useEffect(()=> {
    if(update !== 0){
      axios.get(`https://api.adviceslip.com/advice?timestamp=${new Date().getTime()}`)
        .then( response => {
          const newAdvice: Advice = {
            id: response.data.slip.id,
            advice: response.data.slip.advice
          };        
          setAdvice(newAdvice);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [update]);


  return (
    <main className={classes.app}>
      <article className={classes.adviceCard}>      
          <h1 className={classes.adviceTitle}>ADVICE #{advice.id}</h1>
          <p className={classes.advice}>{advice.advice}</p>
          <picture className={classes.sep}>
            <source srcSet={PatternMobile} media="(max-width: 600px)"/>
            <img src={PatternDesktop} alt=""/>
          </picture>
          <button className={classes.button} onClick={() => setUpdate(update + 1)} aria-label='next advice'>
            <img src={Dice} alt=""/>
          </button>        
      </article>
    </main>
  );
}

export default App;
