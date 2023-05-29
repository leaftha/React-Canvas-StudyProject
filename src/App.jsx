import React, { useState } from "react";
import Arrow from "./assets/arrow.svg";
import Nudake from "./containers/Nudake";

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <section className="section-1">
          <header>
            <h1>Portfolio</h1>
            <ul>
              <li>instagram</li>
              <li>twitter</li>
              <li>codepen</li>
            </ul>
          </header>
          <main>
            <div>
              <Nudake />
            </div>
          </main>
        </section>
        <section className="section-2">What is Lorem?</section>
        <section className="section-3">
          <aside>
            <div className="top">Lorem, ipsum dolor sit amet</div>
            <div className="bottom">
              <img src={Arrow} alt="" />
              <img src={Arrow} alt="" />
            </div>
          </aside>
          <article>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio
            accusamus illum recusandae amet perspiciatis esse placeat quis
            accusantium explicabo! Illum blanditiis laudantium fuga hic
            consequatur nemo, explicabo voluptatem aspernatur illo!
          </article>
        </section>
        <section className="section-4">
          <canvas></canvas>
          <aside>
            <h1>Javascirpt</h1>
            <h2>*****</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem iure dolor laborum omnis architecto, itaque dolores
              iste quod excepturi, in modi explicabo amet tempore obcaecati
              consectetur doloribus praesentium, quaerat enim?
            </p>
          </aside>
        </section>
      </div>
      <footer>
        <div className="email">vltpcks@gmail.com</div>
      </footer>
    </React.Fragment>
  );
}

export default App;
