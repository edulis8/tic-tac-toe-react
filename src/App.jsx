import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(
      'FYI: useEffect double-invocation only happens in development mode, and not in production builds.',
    );
  }, []);

  function handleCount() {
    setCount((count) => count + 1);
  }

  return (
    <>
      <h1>Hello World 😎</h1>
      <main className="card">
        <button type="button" onClick={handleCount}>
          count is {count}
        </button>
        <section>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          sequi nulla quos illo, nemo ipsa, ratione iusto molestiae deleniti ea
          adipisci? Incidunt sint provident a quae. Non ad mollitia
          voluptatibus.
        </section>
      </main>
      <footer>Made with 🧡</footer>
    </>
  );
}

export default App;
