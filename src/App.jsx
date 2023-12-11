import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/general/navbar/Navbar';
import axios from 'axios';
import Card from './components/specific/Home/Card';
import ReactPaginate from 'react-paginate';

function App() {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleRequest = async () => {
    setIsLoading(true);
    try {
      const { data: { results, info: { pages } } } = await axios.get(`https://rickandmortyapi.com/api/character?page=${currentPage}`);
      setCharacters(results);
      setTotalPages(pages);
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleRequest();
  }, [currentPage]);

  const createCard = () => characters.map((character) => <Card key={character.id} character={character} />);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage + 1);
  };

  return (
    <>
      <Navbar />
      <div className='container'>
        <div className="row gap-3 justify-content-center mt-5">
          {
            isLoading
              ?
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
              :
              createCard()
          }
        </div>
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          onPageChange={(data) => handlePageClick(data.selected)}
          containerClassName="pagination justify-content-center mt-5"
          activeClassName="active"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          nextClassName="page-item"
          previousLinkClassName="page-link"
          nextLinkClassName="page-link"
          breakClassName="page-item disabled"
          breakLinkClassName="page-link"
        />
      </div>
    </>
  )
}

export default App
