import classes from './App.module.scss';
import PatternDesktop from './assets/pattern-divider-desktop.svg';
import PatternMobile from './assets/pattern-divider-mobile.svg';
import Dice from './assets/icon-dice.svg';

function App() {
  return (
    <main className={classes.app}>
      <article className={classes.adviceCard}>
        <div className={classes.cardContainer}>
          <h1 className={classes.adviceTitle}>ADVICE #<span>117</span></h1>
          <p className={classes.advice}>“It is easy to sit up and take notice, what's difficult is getting up and taking action.”</p>
          <picture>
            <source srcSet={PatternMobile} media="(max-width: 600px)"/>
            <img src={PatternDesktop} alt=""/>
          </picture>
          <button className={classes.button} aria-label='next advice'>
            <img src={Dice} alt=""/>
          </button>
        </div>
      </article>
    </main>
  );
}

export default App;
