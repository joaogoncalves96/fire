import firebase from './firebaseConnection'
import { useState, useEffect } from 'react'
import './style.css'

function App() {
/*   const [idPost, setIdPost] = useState('');
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [posts, setPosts] = useState([]); */
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [user, setUser] = useState(false);
  const [userLogged, setUserLogged] = useState({})
  const [cargo, setCargo] = useState('')
  const [nome, setNome] = useState('')



/*   useEffect(() => {
    async function loadPosts() {
      await firebase.firestore().collection('posts')
      .onSnapshot((doc) => {
        let meusPosts = [];

        doc.forEach((item) => {
          meusPosts.push({
            id: item.id,
            titulo: item.data().titulo,
            autor: item.data().autor,
          })
        })
        setPosts(meusPosts)
      })

    }
    loadPosts();

  }, [])

  useEffect(() => {

    async function checkLogin() {
      await firebase.auth().onAuthStateChanged((user) => {
        if(user) {
          setUser(true);
          setUserLogged({
            uid: user.uid,
            email: user.email,
            display: user.displayName
          })
        } else {
          setUser(false);
          setUserLogged({})
        }
      })
    }
    checkLogin();
  }, [])
 */
  /* async function handleAdd() {  
    await firebase.firestore().collection('posts')
    .add({
      titulo: titulo,
      autor: autor,
    })
    .then(() => {
        console.log('registado')
        setTitulo('');
        setAutor('');
    })
    .catch((error) => {
      console.log('ups, houve algum erro' + error)
    })
  }

  async function buscarPosts() {
  await firebase.firestore().collection('posts')
    .doc('123')
    .get()
    .then((snapshot) => {
      setTitulo(snapshot.data().titulo);
      setAutor(snapshot.data().autor);
    })
    .catch (() => {
      console.log('erro')
    }) 
    await firebase.firestore().collection('posts')
    .get()
    .then((snapshot) =>{
      let lista = [];
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor
        })
      })
      setPosts(lista);
    })
    .catch(() => {
      console.log('algo não está certo')
    })

  }
  
 const editarPost  = async () => {
  await firebase.firestore().collection('posts')
  .doc(idPost)
  .update({
    titulo: titulo,
    autor: autor,
  })
  .then(() => {
    console.log('Dados atualizados')
    setIdPost('');
    setTitulo('');
    setAutor('');
  })
  .catch(() => {
    console.log('erro')
  })
  }

  async function excluirPost(id) {
    await firebase.firestore().collection('posts')
    .doc(id)
    .delete()
    .then(() => {
      alert('post excluido')
    }
    )
  } */

  async function novoUser() {
    await firebase.auth().createUserWithEmailAndPassword(email, senha)
    .then( async(value) => {
      await firebase.firestore().collection('users')
      .doc(value.user.uid)
      .set({
        nome: nome,
        cargo: cargo,
        status: true,
        senha: senha
      })
      .then(() => {
        setNome('');
        setCargo('');
        setEmail('');
        setSenha('');
      })
    })
    .catch((error) => {
      console.log('error' + error)
    })
  }

  async function logout() {
    await firebase.auth().signOut();
    setUser({})
    setEmail('');
    setSenha('');
  }

  async function fazerLogin() {
    await firebase.auth().signInWithEmailAndPassword(email, senha)
    .then( async (value) => {
     await firebase.firestore().collection('users')
     .doc(value.user.uid)
     .get()
     .then((snapshot) => {
        setUser({
          nome: snapshot.data().nome,
          cargo: snapshot.data().cargo,
          status: snapshot.data().status,
          email: value.user.email,
        })
     })
    })
    .catch((error) => {
      console.log('Erro ao fazer login' + error)
    })
  }
  return (
    <div className="App">
     <h1>firebase</h1> <br/>
     
    {/*  {user && (
      <div>
        <strong>Bem vindo!</strong> <br/>
        <span>{userLogged.uid} - {userLogged.email} {userLogged.display}</span>
        <br/> <br/>
        </div>
     )} */}
     <div className='container'>
      <label>Email</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/> <br/>
      <label>Senha</label>
      <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)}/> <br/>
      <label>Cargo</label>
      <input type="text" value={cargo} onChange={(e) => setCargo(e.target.value)}/> <br/>
      <label>Nome</label>
      <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}/> <br/>

      <button onClick={fazerLogin}>Login</button>
    
      <button onClick={novoUser}>Registo</button>
      <button onClick={logout}>Sair</button>
     </div>
      <hr/> <br/>
  
      { Object.keys(user).length > 0 && (
        <div>
          <strong>Olá </strong> {user.nome} <br/>
          <strong>Cargo: </strong> {user.cargo} <br/>
          <strong>Email: </strong> {user.email} <br/>
          <strong>Status: </strong> {String(user.status ? 'ativo' : 'desativado')} <br/>

          </div>
      )}
      
      {/* <div className='container'>
      <h2>Banco de dados:</h2>
    <label>ID: </label>
    <input type="text" value={idPost} onChange={(e) => setIdPost(e.target.value)} />

     <label>Titulo</label>
     <textarea type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />

     <label>Autor</label>
     <input type="text" value={autor} onChange={(e) => setAutor(e.target.value)} />
     <button onClick={handleAdd}>Cadastro</button>
     <button onClick={buscarPosts}>Posts</button> 
     <button onClick={editarPost}>Editar</button> 

     <ul>
      {posts.map((post) => {
        return (
          <li key={post.id}>
            <span>id: {post.id}</span> <br/>
            <span>titulo: {post.titulo}</span> <br/>
            <span>autor: {post.autor}</span> <br/>
            <button onClick={() => excluirPost(post.id)}>Delete</button> <br/> <br/>
          </li>
        )
      })}
     </ul>
     </div> */}
    </div>
  );
}

export default App;
