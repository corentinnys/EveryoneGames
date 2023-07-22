import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Options from './Components/Options';
import CardItem from './Components/CardItem';
import Navigation from './Components/Navigation';

import PageSingle from './Components/PageSingle';
import PageSingleDev from './Components/PageSingleDev'
import Creators from './Components/Creators';
import CreatorSingle from './Components/CreatorSingle';

function App() {
  const [plateformes, SetPlateformes] = useState([]);
  const [genres, SetGenres] = useState([]);
  const [filtreGenre, SetFiltreGenre] = useState();
  const [filterPlateform, setFilterPlateform] = useState();
  const [search, setSearch] = useState();
  const [tagsList, setTagsList] = useState([]);
  const [tag, setTag] = useState([]);
  const [creators,setCreators]= useState([])
  const [filtreCreators,setFilreCreators]= useState([])

  useEffect(() => {
    axios.get('https://api.rawg.io/api/genres?token&key=fd4fe01def1f461ab24d08167b2b29f5')
      .then(res => {
        SetGenres(res.data.results)
      })

    axios.get('https://api.rawg.io/api/platforms?token&key=fd4fe01def1f461ab24d08167b2b29f5')
      .then(res => {
        SetPlateformes(res.data.results)
      })
    axios.get('https://api.rawg.io/api/tags?token&key=fd4fe01def1f461ab24d08167b2b29f5')
      .then(res => {
        setTagsList(res.data.results)
      })

      axios
      .get(`https://api.rawg.io/api/creators?key=fd4fe01def1f461ab24d08167b2b29f5`)
      .then(res => {
        setCreators(res.data.results); // Update this line
      })
      .catch(error => {
        console.log(error);
      })


  }, [])

  function handleChangeSelect(e) {
    let value = e.currentTarget.value;
    SetFiltreGenre(value)
  }

  function handleChangeSelectPlateforms(e) {
    let value = e.currentTarget.value;
    setFilterPlateform(value)
  }

  function handleChangeSearch(e) {
    let value = e.currentTarget.value;
    setSearch(value)
  }

  function handleChangeTags(e) {
    let name = e.currentTarget.getAttribute('data-id')
    setTag(name)
  }
  function handleChangeCreators(e)
  {
    let value = e.currentTarget.getAttribute('data-id')
    setFilreCreators(value)
  }
  return (
    <Router>
      <Container>
        <Navigation />
        <Routes>
          <Route path="/" element={
            <Row>
              <Col sm={8}>
                <CardItem tag={tag} search={search} filtre={filtreGenre} plateform={filterPlateform} creators={filtreCreators} />
              </Col>
              <Col sm={4}>
                <h1>Filtres</h1>
                <div class="input-group mb-3">
                  <label class="input-group-text" for="inputGroupSelect01">Plateforms</label>
                  <select class="form-select" id="inputGroupSelect01" onChange={handleChangeSelectPlateforms}>
                    <option selected>Choose...</option>
                    {plateformes.map((plateform, index) => (
                      <Options key={index} name={plateform.name} dataId={plateform.id} />
                    ))}
                  </select>
                </div>
                <div class="input-group mb-3">
                  <label class="input-group-text" for="inputGroupSelect02">Genres</label>
                  <select class="form-select" id="inputGroupSelect02" onChange={handleChangeSelect}>
                    <option selected>Choose...</option>
                    {genres.map((genre, index) => (
                      <Options key={index} name={genre.name} dataId={genre.id} />
                    ))}
                  </select>
                </div>
                <input type="search" id="search" onChange={handleChangeSearch} />
                {tagsList.map((element, index) => (
                  <div>
                    <input type="checkbox" data-id={element.id} name={element.name} data onChange={handleChangeTags} />
                    <label key={index}>{element.name}</label>
                  </div>
                ))}

                <h2>les createurs</h2>

                {creators.map((element,index)=>
                (
                  <div>
                    <input type="checkbox" data-id={element.id} name={element.name}  onChange={handleChangeCreators}/>
                    <label key={index}>{element.name}</label>
                  </div>
                ))}
              </Col>
            </Row>
          } />
          <Route path="/game/:id" element={<PageSingle />} />
          <Route path="/game/devloppers/:id" element={<PageSingleDev />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/creator/:id" element={<CreatorSingle />} />
        </Routes>
      </Container>
    </Router>
  )
}

export default App;