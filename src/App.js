import Axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css"
import  ReactLoading from "react-loading";

const App = () => {
  const [Images, setImages] = useState([]);
  const [pages, setPages] = useState(1);
  const [loading,setLoading]=useState(true);

  const getImages = async (pageno) => {
    const url = `https://api.unsplash.com/photos/random?client_id=Qe2QR0oQ4bmVEHKWdBjhY3RcCQus3ear2jvSUnnoe1U&count=9&page=${pageno}`;
    await Axios.get(url).then((res) => {
      setImages((prev) => [...prev, ...res.data]);
      setLoading(false);
    },400);
  };

  const handleScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setPages((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImages(pages);
  }, [pages]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div>
        <h3 className="heading">Lazy Loading Website</h3>
        <div className="Container">
          {Images.map((image) => {
            return <img src={image.urls.regular} key={image.id} />;
          })}
        </div>
          <div className="Product-Loading">
          {loading && <ReactLoading
            type="spinningBubbles"
            color="#764abc"
            height={300}
            width={120}
          />}
        </div>
        
      </div>
    </>
  );
};

export default App;
