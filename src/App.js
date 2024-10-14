import { useState } from 'react';

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
  const [formSplitBillId, setFormSplitBillId] = useState(null);
  const currentFriendName = friends.find(
    (friend) => friend.id === formSplitBillId
  )?.name;

  function handleToggleFormSplitBill(id) {
    setFormSplitBillId((currentId) => {
      if (currentId === id) return null;
      setIsOpenFormAddFriend(false);
      return id;
    });
  }

  function handleAddFriend(newFriend) {
    setFriends((currentFriends) => [...currentFriends, newFriend]);
    setIsOpenFormAddFriend(false);
  }

  function handleToggleFormAddFriend() {
    setIsOpenFormAddFriend((isOpen) => {
      if (!isOpen) {
        setFormSplitBillId(null);
      }
      return !isOpen;
    });
  }

  return (
    <div className="app">
      <div className="sidebar">
        <Friends
          friends={friends}
          formSplitBillId={formSplitBillId}
          onToggleFormSplitBill={handleToggleFormSplitBill}
        />
        {isOpenFormAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleToggleFormAddFriend}>
          {isOpenFormAddFriend ? 'Close' : 'Add friend'}
        </Button>
      </div>
      {formSplitBillId && (
        <FormSplitBill currentFriendName={currentFriendName} />
      )}
    </div>
  );
}

function Friends({ friends, formSplitBillId, onToggleFormSplitBill }) {
  return (
    <ul>
      {friends.map((friend) => {
        return (
          <Friend
            friend={friend}
            key={friend.id}
            formSplitBillId={formSplitBillId}
            onToggleFormSplitBill={onToggleFormSplitBill}
          />
        );
      })}
    </ul>
  );
}

function Friend({ friend, formSplitBillId, onToggleFormSplitBill }) {
  return (
    <li className={formSplitBillId === friend.id ? 'selected' : undefined}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You own {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owns you ${friend.balance}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button onClick={() => onToggleFormSplitBill(friend.id)}>
        {formSplitBillId === friend.id ? 'Close' : 'Select'}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [friendName, setFriendName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('https://i.pravatar.cc/48');
  function handleSubmit(e) {
    e.preventDefault();
    if (!friendName || !avatarUrl) return;
    const id = crypto.randomUUID();
    onAddFriend({
      id,
      name: friendName,
      image: `${avatarUrl}?u=${id}`,
      balance: 0,
    });
    setFriendName('');
    setAvatarUrl('https://i.pravatar.cc/48');
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👬 Friend's name</label>
      <input
        type="text"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
      />
      <label>📷 Image URL</label>
      <input
        type="url"
        value={avatarUrl}
        onChange={(e) => setAvatarUrl(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ currentFriendName }) {
  const [totalBill, setTotalBill] = useState('');
  const [yourExpense, setYourExpense] = useState('');
  const yourFriendExpense = totalBill && yourExpense && totalBill - yourExpense;
  return (
    <form className="form-split-bill">
      <h2>Split the bill with {currentFriendName}</h2>
      <label>💰 Total bill value</label>
      <input
        type="number"
        value={totalBill}
        onChange={(e) => setTotalBill(Number(e.target.value))}
      />
      <label>🧍‍♂️ Your expense</label>
      <input
        type="number"
        value={yourExpense}
        onChange={(e) => setYourExpense(Number(e.target.value))}
      />
      <label>👭 {currentFriendName}'s expense</label>
      <input type="number" disabled value={yourFriendExpense} />
      <label>🤑 Who is paying the bill?</label>
      <select>
        <option>You</option>
        <option>{currentFriendName}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}

export default App;
