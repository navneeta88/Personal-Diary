import { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {

  const user = JSON.parse(

    localStorage.getItem('user')

  );

  const [entries, setEntries] = useState([]);

  useEffect(() => {

    fetchEntries();

  }, []);

  const fetchEntries = async () => {

    const response = await axios.get(

      `http://localhost:5000/diary/${user.id}`

    );

    setEntries(response.data);

  };

  const logout = () => {

    localStorage.removeItem('user');

    window.location = '/';

  };

  return (

    <div>

      <h1>

        Welcome {user.username}

      </h1>

      <button onClick={logout}>

        Logout

      </button>

      <h2>

        Your Diaries

      </h2>

      {

        entries.map((entry) => (

          <div key={entry.id}>

            <h3>

              {entry.title}

            </h3>

            <p>

              {entry.content}

            </p>

            <hr />

          </div>

        ))

      }

    </div>

  );

}

export default Dashboard;