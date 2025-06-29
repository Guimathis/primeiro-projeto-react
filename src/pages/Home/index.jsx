import './style.css'
import { useEffect, useState, useRef } from 'react'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'


function App() {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount(count + 1)
  }

  return (
    <>
      <div className='reactTutorial'>
        <h1>Olá mundo</h1>
        <MyButton count={count} onClick={handleClick} />
        <MyButton count={count} onClick={handleClick} />
        <AboutPage />
        <Profile />
        <ShoppingList />
      </div>
      <Container />
    </>
  )
}

function Container() {

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  let [users, setUsers] = useState([])

  useEffect(() => {
    fetchUsers();
  }, [])

  async function fetchUsers() {
    try {
      const response = await getUsers();
      setUsers(response);
    } catch (error) {
      console.log('Ocorreu um erro ao buscar os usuários')
    }
  }

  async function createUsers() {
    await api.post('/users', {
      name: inputName.current.value,
      email: inputEmail.current.value,
      age: inputAge.current.value
    })

    inputName.current.value = '';
    inputEmail.current.value = '';
    inputAge.current.value = '';

    fetchUsers()
  }

  async function deleteUsers(id) {
    await api.delete(`/users/${id}`)
    fetchUsers()
  }


  return (
    < div className='container' >
      <form>
        <h1>Cadastro de usuários</h1>
        <input placeholder='Nome' type='text' name='name' ref={inputName} />
        <input placeholder='E-mail' type='email' name='email' ref={inputEmail} />
        <input placeholder='Idade' type='number' name='age' ref={inputAge} />
        <button type='button' onClick={createUsers} >Cadastrar</button>
      </form>
      <ListUsers users={users} onDelete={deleteUsers} />
    </div >
  )
}

function ListUsers({ users, onDelete }) {
  {
    return users.map(user => (
      <div className='usersList' key={user.id} >
        <div>
          <p>Nome: <span>{user.name}</span></p>
          <p>E-mail: <span>{user.email}</span></p>
          <p>Idade: <span>{user.age}</span></p>
        </div>
        <button onClick={() => onDelete(user.id)}>
          <img src={Trash}  />
        </button>
      </div>
    ))
  }
}

async function getUsers() {
  const allUsers = await api.get('/users')
  return allUsers.data
}


// Contéudo do tutorial básico de React

function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick} >Clicado {count} vezes</button>
  )
}

function AboutPage() {
  return (
    <>
      <h1>Sobre</h1>
      <p>Olá.<br />Como vai?</p>
    </>
  );
}


const user = {
  name: 'Monkey D. Luffy',
  imageUrl: 'https://i.imgur.com/8620BoX.jpeg',
};


function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Foto de ' + user.name}
        style={{
          width: 90,
          height: 110
        }}
      />
    </>
  );
}

const products = [
  { title: 'Repolho', isFruit: false, id: 1 },
  { title: 'Alho', isFruit: false, id: 2 },
  { title: 'Maçã', isFruit: true, id: 3 },
];

function ShoppingList() {
  const listItems = products.map(product =>
    <li
      key={product.id}
      style={{
        color: product.isFruit ? 'magenta' : 'darkgreen'
      }}
    >
      {product.title}
    </li>
  );

  return (
    <ul>{listItems}</ul>
  );
}

export default App
