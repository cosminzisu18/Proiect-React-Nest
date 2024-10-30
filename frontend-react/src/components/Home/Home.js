import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="container mt-5 mb-5">
      <div className="row align-items-center flex-column-reverse flex-lg-row">
        <div className="col-lg-6">
          <h1 className="display-4 fw-bold animate-left">Explorează Arta Expresiei Digitale</h1>
          <p className="lead animate-right delay-1">
            Bun venit în portofoliul meu digital, unde creativitatea se îmbină perfect cu tehnologia în
            un amestec de artă și design. Sunt pasionat de transformarea ideilor în vizuale captivante
            care rezonează, inspiră și implică.
          </p>
          <p className="animate-left delay-2">
            Având un background în ilustrație digitală, artă conceptuală și povestire vizuală, lucrările mele
            acoperă diverse stiluri și medii. De la ilustrații detaliate și designuri conceptuale la experiențe
            digitale imersive, fiecare piesă reflectă dedicația mea de a aduce poveștile la viață.
          </p>
          <p className="animate-right delay-3">
            <strong>Aspecte Importante din Portofoliu:</strong> Portofoliul meu include o colecție diversă
            de proiecte care variază de la designul de personaje și arta de mediu până la designul interfeței
            utilizatorului pentru platforme de gaming și multimedia. Te invit să explorezi fiecare secțiune
            și să fii martor la călătoria creativității care îmi ghidează viziunea artistică.
          </p>
          <p className="animate-left delay-4">
            <strong>Colaborează cu Mine:</strong> Sunt întotdeauna dornic să mă conectez cu creatori, branduri
            și inovatori care gândesc la fel. Dacă ai o idee care are nevoie de o atingere vizuală, nu ezita
            să mă contactezi. Să creăm împreună ceva extraordinar!
          </p>
          <a href="mailto:cosminzisu18@gmail.com" className="btn btn-primary btn-lg mt-3 slide-up delay-5">
              Contactează-mă
          </a>
        </div>
        <div className="col-lg-6 d-flex justify-content-center mb-4 mb-lg-0">
          <img
            src="https://images.aiscribbles.com/3a8905eda76a423294f854fabe43cefc.png?v=983343"
            alt="Prezentare Artă Digitală"
            className="img-fluid rounded shadow-lg fade-in"
            style={{ maxHeight: '450px', objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
