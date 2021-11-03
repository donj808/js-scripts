import React from "react";
import "./styles.css";
import List from "./List.js";

const list = [
  { fullname: "Spider Man", firstName: "Spider", lastName: "Man" },
  { fullname: "Bruce Banner", firstName: "Bruce", lastName: "Banner" },
  { fullname: "Iron Man", firstName: "Iron", lastName: "Man" },
  { fullname: "Incredible Hulk", firstName: "Incredible", lastName: "Hulk" },
  { fullname: "Ant Man", firstName: "Ant", lastName: "Man" },
  { fullname: "Minnie Mouse", firstName: "Minnie", lastName: "Mouse" },
  { fullname: "Dark Angel", firstName: "Dark", lastName: "Angel" },
  { fullname: "Jean Grey", firstName: "Jean", lastName: "Grey" },
  { fullname: "Professor X", firstName: "Professor", lastName: "X" },
  { fullname: "James Howlett", firstName: "James", lastName: "Howlett" },
  { fullname: "Bruce Wayne", firstName: "Bruce", lastName: "Wayne" },
  { fullname: "Oliver Green", firstName: "Oliver", lastName: "Green" },
  { fullname: "Harry Potter", firstName: "Harry", lastName: "Potter" },
  { fullname: "Hermione Granger", firstName: "Hermione", lastName: "Granger" },
  { fullname: "Ron Weasley", firstName: "Ron", lastName: "Weasley" },
  { fullname: "Lois Lane", firstName: "Lois", lastName: "Lane" },
  { fullname: "Baby Yoda", firstName: "Baby", lastName: "Yoda" },
  { fullname: "Luke Skywalker", firstName: "Luke", lastName: "Skywalker" },
  { fullname: "Han Solo", firstName: "Han", lastName: "Solo" },
  { fullname: "Princess Leia", firstName: "Princess", lastName: "Leia" },
  { fullname: "Clark Kent", firstName: "Clark", lastName: "Kent" },
  { fullname: "Lex Luther", firstName: "Lex", lastName: "Luther" },
  { fullname: "Green Goblin", firstName: "Green", lastName: "Goblin" },
  { fullname: "The Joker", firstName: "The", lastName: "Joker" },
  { fullname: "Anakin Skywalker", firstName: "Anakin", lastName: "Skywalker" },
  { fullname: "Black Widow", firstName: "Black", lastName: "Widow" },
  { fullname: "Gon Freecs", firstName: "Gon", lastName: "Freecs" },
  { fullname: "Killua Zoldyck", firstName: "Killua", lastName: "Zoldyck" }
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      skip: 0,
      lastIndex: 0,
      limit: 5,
      max: 28
    };

    this.refs = {};
  }

  componentDidMount() {
    if (!this.state.users.length) {
      this.getList();
    }
  }

  render() {
    return (
      <div className="App">
        {this.renderList()}
        {this.state.users.length < this.state.max ? (
          <button type="button" onClick={() => this.handleClick()}>
            Load Users
          </button>
        ) : (
          false
        )}
      </div>
    );
  }

  renderList() {
    return this.state.users.map((item, idx) => (
      <List key={idx} item={item} ref={(el) => (this.refs[idx] = el)} />
    ));
  }

  handleClick = () => {
    this.getList().then(() => {
      // console.log(this.state.lastIndex);
      this.scrollToIndex(this.state.lastIndex);
    });
  };

  getList = async () => {
    let { users, limit, skip } = this.state;
    let lastIndex = users.length;
    users = users.concat(this.getUsers(skip, skip + limit));

    this.setState({
      users: users,
      skip: users.length,
      lastIndex: lastIndex
    });

    this.refs = this.state.users.reduce((acc, val, id) => {
      acc[id] = React.createRef();
      return acc;
    }, {});
  };

  getUsers = (s, e) => {
    return list.slice(s, e);
  };

  scrollToIndex(index) {
    // console.log(this.refs);
    if (index > 0) {
      console.log(this.refs[index]);
      this.refs[index].scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    // console.log(this.refs[index]);
  }
}

export default App;
