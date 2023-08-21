import React, { useEffect } from "react"
import './App.css';
import Board from './Components/Board/Board';
import edit from "./Images/edit.png";
import link from "./Images/link.png";
import invite from "./Images/square-color.png";
import groupInvite from "./Images/group-img.png";
import filter from "./Images/filter.png";
import calender from "./Images/calendar.png";
import arrowDown from "./Images/arrow-down.png";
import user from "./Images/user.png";
import menuView from "./Images/menu-new.png"
import menu from "./Images/menu.png"
import SearchBar from './Components/Search Bar/SearchBar';
import Sidebar from './Components/Sidebar/Sidebar';


function App() {

  const [boards, setBoards] = React.useState([
    {
      id: Date.now() + Math.random() * 2,
      title: "To Do",
      hr: "#5030E5",
      cards: [
        {
          id: Date.now() + Math.random(),
          title: "Brainstorm",
          tasks: [],
          labels: [
            {
              text: "Low",
              color: "#DFA874",
            }
          ],
          desc: "Brainstorming brings team members diverse experience into play.",
          date: "",
        },
        {
          id: Date.now() + Math.random(),
          title: "Research",
          tasks: [],
          labels: [
            {
              text: "High",
              color: "#D8727D",
            }
          ],
          desc: "User research helps you to create an optional product for users.",
          date: "",
        }
      ],
    },

    {
      id: Date.now() + Math.random() * 2,
      title: "On Progress",
      hr: "#FFA500",
      cards: [
        {
          id: Date.now() + Math.random(),
          title: "Wireframes",
          tasks: [],
          labels: [
            {
              text: "High",
              color: "#D8727D",
            }
          ],
          desc: "Low fidelity wireframes include the most basic content and visuals.",
          date: "",
        }
      ],
    },

    {
      id: Date.now() + Math.random() * 2,
      title: "Completed",
      hr: "#8BC48A",
      cards: [
        {
          id: Date.now() + Math.random(),
          title: "Design System",
          tasks: [],
          labels: [
            {
              text: "Completed",
              color: "#83C29D",
            }
          ],
          desc: "It just needs to adapt the UI from what you did before.",
          date: "",
        }
      ],
    },

    // JSON.parse(localStorage.getItem("kanban")) || []
  ]);

  const [target, setTarget] = React.useState({
    cid: " ",
    bid: " ",
  });

  const addCard = (title, bid) => {
    const card = {
      id: Date.now() + Math.random(),
      title,
      labels: [],
      tasks: [],
      date: "",
      desc: "",
    };
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards[index].cards.push(card);
    setBoards(tempBoards);
  }

  const removeCard = (cid, bid) => {
    const bIndex = boards.findIndex((item) => item.id === bid);
    if (bIndex < 0) return;

    const cIndex = boards[bIndex].cards.findIndex((item => item.id === cid));
    if (cIndex < 0) return;

    const tempBoards = [...boards]
    tempBoards[bIndex].cards.splice(cIndex, 1)
    setBoards(tempBoards)
  }

  const handleDragEnter = (cid, bid) => {
    setTarget({
      cid,
      bid,
    });
  };

  const handleDragEnd = (cid, bid) => {
    let s_bIndex, s_cIndex, t_bIndex, t_cIndex

    s_bIndex = boards.findIndex((item) => item.id === bid);
    if (s_bIndex < 0) return;

    s_cIndex = boards[s_bIndex].cards?.findIndex((item) => item.id === cid);
    if (s_cIndex < 0) return;

    t_bIndex = boards.findIndex((item) => item.id === target.bid);
    if (t_bIndex < 0) return;

    t_cIndex = boards[t_bIndex].cards?.findIndex((item) => item.id === target.cid);
    if (t_cIndex < 0) return;

    const tempBoards = [...boards];
    const tempCard = tempBoards[s_bIndex].cards[s_cIndex];

    tempBoards[s_bIndex].cards.splice(s_cIndex, 1);
    tempBoards[t_bIndex].cards.splice(t_cIndex, 0, tempCard)

    setBoards(tempBoards)
  }

  const updateCard = (cid, bid, card) => {
    const bIndex = boards.findIndex((item) => item.id === bid);
    if (bIndex < 0) return;

    const cIndex = boards[bIndex].cards.findIndex((item => item.id === cid));
    if (cIndex < 0) return;

    const tempBoards = [...boards];
    tempBoards[bIndex].cards[cIndex] = card;
    setBoards(tempBoards);
  };


  // useEffect(() => {
  //   localStorage.setItem("kanban", JSON.stringify(boards))
  // }, [boards])

  return (
    <div className='app'>

      <Sidebar />
      <SearchBar />

      <div className="app_navbar-main">
        <div className="app_navbar">
          <h1 className='app_navbar_title'>Mobile App</h1>
          <div className='app_navbar_title-icons'>
            <img className='edit-icon' src={edit} alt="edit" />
            <img className='link-icon' src={link} alt="link" />
          </div>
        </div>

        <div className="app_navbar-invite">
          <div className="invite">
            <img src={invite} alt="" />
            <p>Invite</p>
          </div>
          <img src={groupInvite} alt="" />
        </div>
      </div>

      <div className="app_navbar_sorting">

        <div className="navbar_filter-buttons">
          <button>
            <img src={filter} alt="" />
            <p>Filter</p>
            <img src={arrowDown} alt="" />
          </button>
          <button>
            <img src={calender} alt="" />
            <p>Today</p>
            <img src={arrowDown} alt="" />
          </button>
        </div>

        <div className="sorting-view">
          <button>
            <img src={user} alt="" />
            <p>Share</p>
          </button>
          <p>|</p>
          <img src={menuView} alt="" />
          <img src={menu} alt="" />
        </div>

      </div>

      <div className="app_outer">
        <div className="app_boards">
          {
            boards.map((item) =>
              <Board
                key={item.id}
                board={item}
                addCard={addCard}
                removeCard={removeCard}
                handleDragEnter={handleDragEnter}
                handleDragEnd={handleDragEnd}
                updateCard={updateCard}
                boa = {boards}
              />)
          }
        </div>
      </div>

    </div>
  );
}

export default App;
