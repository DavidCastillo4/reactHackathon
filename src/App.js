
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

let App = () => {

  let [search, setSearch] = useState('');

  useEffect(() => {
    let el = document.getElementById("123");
    el.focus();
  });

  let [news, setNews] = useState({});
  let [dateArray, setDateArray] = useState([]);
  let [dateFilter, setDateFilter] = useState('All');


  async function loadData(e) {
    e.preventDefault();
    let res = await axios.get("http://hn.algolia.com/api/v1/search_by_date?query=" + search);
    let d = await res.data.hits;
    let obj = {};

    for (let i = 0; i < d.length; i++) {
      let createDate = Object.values(d[i])[0];
      let author = Object.values(d[i])[3];
      obj[i] = { createDate: createDate, author: author, className: "show" };
    };

    let dates = [];

    for (let value in obj) {
      dates.push(obj[value].createDate)
    };

    let distinctDates = [...new Set([...dates])];
    distinctDates.sort();
    distinctDates.unshift('All')

    setNews(obj);
    setDateArray(distinctDates);
    let uxSelect = document.getElementById('uxSelect');
    setDateFilter = "All"
    uxSelect.value = "All";
  };

  let setClassName = (dt) => {
    let news2 = { ...news };
    for (let prop in news2) {
      let newClass = news2[prop].createDate == dt ? 'show' : 'hide';
      if (dt == "All") newClass = "show";
      news2[prop].className = newClass;
    };
    setNews(news2);
    setDateFilter(dt);
  };

  /****************JSX objects***********************/
  /****************JSX objects***********************/

  let UxInput = () => {
    return (<input id="123" type="text" value={search} onChange={e => setSearch(e.target.value)} />)
  }

  let UxSearchBtn = () => {
    return (
      <button onClick={loadData}>Search News</button>
    )
  };

  let UxSelect = () => {
    return (
      <select id="uxSelect" value={dateFilter} onChange={(e) => setClassName(e.target.value)}>
        {dateArray.map((dt, i) =>
          <option value={dt} key={i}>{dt}</option>
        )}
      </select>
    )
  };

  let UxNews = () => {
    return (
      <ul>
        {Object.keys(news).map((k, index) => (
          <li key={k} className={news[k].className}>
            *created={news[k].createDate}*index={index}*key={k}*Author={news[k].author}
          </li>
        ))}
      </ul>)
  };
  
  /****************JSX objects***********************/
  /****************JSX objects***********************/
  return (
    <div>
      <UxInput />
      <UxSearchBtn />
      <br />
      <label>Filter by Date: </label>
      <UxSelect />
      <UxNews />
    </div>
  );
}

export default App;

