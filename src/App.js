import { Children, useState } from 'react';

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [isOpenFormAddFriend, setIsOpenFormAddFriend] = useState(false);
  return (
    <div className="app">
      <div className="sidebar">
        <Friends friends={friends} />
        {isOpenFormAddFriend && <FormAddFriend />}
        <Button onClick={() => setIsOpenFormAddFriend(!isOpenFormAddFriend)}>
          {isOpenFormAddFriend ? 'Close' : 'Add friend'}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function Friends({ friends }) {
  return (
    <ul>
      {friends.map((friend) => {
        return <Friend friend={friend} />;
      })}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li className="selected">
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p class="red">
          You own {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p class="green">
          {friend.name} owns you ${friend.balance}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button>Select</Button>
    </li>
  );
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>👬 Friend's name</label>
      <input type="text" />
      <label>📷 Image URL</label>
      <input type="url" />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split the bill with ?</h2>
      <label>💰 Bill value</label>
      <input type="number" />
      <label>🧍‍♂️ Your expense</label>
      <input type="number" />
      <label>👭 ?'s expense</label>
      <input type="number" disabled />
      <label>👭 Who is paying the bill?</label>
      <select>
        <option>You</option>
        <option>?</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}

export default App;
