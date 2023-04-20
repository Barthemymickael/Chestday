import React, { useState } from 'react';
import './dashboard.css';

export function Dashboard() {
    const [friends, setFriends] = useState([
        { id: 1, name: 'Dave' },
        { id: 2, name: 'Flo' },
        { id: 3, name: 'David' },
    ]);

    const [parties, setParties] = useState([
        {
            id: 1,
            name: 'Partie 1',
            id_creator: 1,
            id_player: null,
            nb_player: 2,
            amount: 0,
            type: 'public',
            finish: false,
        },
        {
            id: 2,
            name: 'Partie 2',
            id_creator: 2,
            id_player: 3,
            nb_player: 2,
            amount: 10,
            type: 'private',
            finish: false,
        },
        {
            id: 3,
            name: 'Partie 3',
            id_creator: 4,
            id_player: null,
            nb_player: 2,
            amount: 0,
            type: 'public',
            finish: true,
        }
    ]);

    const [newFriendName, setNewFriendName] = useState<string>('');
    const [filter, setFilter] = useState<string>('Toutes');
    const [showPopup, setShowPopup] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleAddFriend = () => {
        if (newFriendName !== '') {
            const newFriend = { id: friends.length + 1, name: newFriendName };
            setFriends([...friends, newFriend]);
            setNewFriendName('');
            setIsSuccess(true);
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 5000);
        }
    };

    const handleNewFriendNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setNewFriendName(event.target.value);
    };

    // fonction pour filtrer la liste des parties en fonction du filtre
    const filterParties = (parties: any[], filter: string) => {
        switch (filter) {
            case 'Payantes':
                return parties.filter(party => party.amount !== 0);
            case 'Gratuites':
                return parties.filter(party => party.amount === 0);
            default:
                return parties;
        }
    };

    const displayParties = () => {
        const filteredParties = filterParties(parties, filter);
        return filteredParties.map(party => (
            <tr key={party.id}>
                {' '}
                <td className='party-name'>{party.name}</td>
                <td className='creator-name'>{party.id_creator}</td>
                <td className='nb-players'>{party.nb_player} joueurs</td>
                <td>
                    <button
                        className='coins-btn'
                        disabled={true}
                        style={{ marginLeft: '10px', marginRight: '10px' }}
                    >
                        {party.amount ? `${party.amount} coins` : 'Gratuite'}
                    </button>
                </td>
                <td>
                    <button
                        className={
                            party.type === 'public' ? 'challenge-btn' : 'delete-friend-btn'
                        }
                        disabled={true}
                        style={{ marginLeft: '10px', marginRight: '10px' }}
                    >
                        {party.type === 'public' ? 'Public' : 'Privé'}
                    </button>
                </td>
                <td>
                    <button
                        className='join-party-btn'
                        style={{ marginLeft: '10px', marginRight: '10px' }}
                    >
                        Rejoindre
                    </button>
                </td>
            </tr>
        ));
    };

    const [sortOrder, setSortOrder] = useState('asc');

    const sortPartiesByAmount = () => {
        const sortedParties = [...parties].sort((a, b) => {
            if (a.amount < b.amount) {
                return sortOrder === 'asc' ? -1 : 1;
            }

            if (a.amount > b.amount) {
                return sortOrder === 'asc' ? 1 : -1;
            }

            return 0;
        });

        setParties(sortedParties);
    };

    const toggleSortOrder = () => {
        if (sortOrder === 'desc') {
            setSortOrder('asc');
        }
        if (sortOrder === 'asc') {
            setSortOrder('desc');
        }
    };

    const handleAmountHeaderClick = () => {
        toggleSortOrder();
        sortPartiesByAmount();
    };

    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const [isPayant, setIsPayant] = useState(false);

    const handlePayantChange = (e: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setIsPayant(e.target.checked);
    };

    const user = {
        pseudo: 'JohnDoe',
        coins: 100,
    }

    return (
        <div>
            <div className='left'>
                <div className='account-bloc mt-5'>
                    <img src='https://play-lh.googleusercontent.com/tjRBt8RHH-S1x_gRDWcWFrd9ybMyoNu0ixyXhO4QRrg32v1af2eMRG0Xi6aZurY_xW8' alt='Photo de profil' />
                    <div className='username'>{user.pseudo}</div>
                    <div className='coins-btn'>{user.coins} coins</div>
                </div>
                <div className='party-block mt-5 centered'>
                    <h2 style={{ textAlign: 'center' }}>Partie d'échec</h2>
                    <button className='buttonCP' onClick={toggleForm}>
                        Créer une nouvelle partie
                    </button>
                    {showForm && (
                        <div className={`left ${showForm ? 'centered' : ''}`}>
                            <form>
                                <input
                                    type='text'
                                    id='name'
                                    name='name'
                                    placeholder='Nom de votre partie'
                                />
                                <label>
                                    Payant :
                                    <input
                                        type='checkbox'
                                        name='payant'
                                        checked={isPayant}
                                        onChange={handlePayantChange}
                                    />
                                </label>

                                {isPayant && (
                                    <div className='form-control'>
                                        <label htmlFor='amount'>Montant :</label>

                                        <input
                                            type='number'
                                            name='amount'
                                            min='1'
                                            placeholder='1'
                                            required
                                        />
                                    </div>
                                )}

                                <button type='submit'>Créer la partie</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
            <div className='right'>
                <div className='current-party mt-5' style={{ flex: 2 }}>
                    <div style={{ flex: 1 }} className='m10'>
                        <h2>Parties d'échecs disponibles</h2>
                        <select
                            style={{ marginRight: '10px' }}
                            value={filter}
                            onChange={e => setFilter(e.target.value)}
                        >
                            <option value='Toutes'>Toutes</option>
                            <option value='Payantes'>Payantes</option>
                            <option value='Gratuites'>Gratuites</option>
                        </select>
                        <button
                            className={`sort-btn ${sortOrder !== 'asc' && 'active'} ${
                                sortOrder === 'asc' ? 'before' : ''
                            }`}
                            onClick={handleAmountHeaderClick}
                        >
                            Prix
                        </button>
                        <div className='scrollable-table-container'>
                            <table className='custom-table'>
                                <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Créateur</th>
                                    <th>Joueurs</th>
                                    <th>Prix</th>
                                    <th>Statut</th>
                                    <th>Rejoindre</th>
                                </tr>
                                </thead>
                                <tbody>{displayParties()}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='friends mt-5' style={{ flex: 2 }}>
                    <h2>Mes amis</h2>
                    <ul
                        className='friend-list'
                        style={{ height: '200px', overflowY: 'scroll' }}
                    >
                        {friends.map(friend => (
                            <li key={friend.id}>
                                <span>{friend.name}</span>
                                <div style={{ display: 'flex' }}>
                                    <button className='challenge-btn'>Défier</button>
                                    <button className='delete-friend-btn'>Supprimer</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <input
                        type='text'
                        placeholder='Entrez le nom de votre ami'
                        value={newFriendName}
                        onChange={handleNewFriendNameChange}
                        className='custom-input'
                    />
                    <button onClick={handleAddFriend} className='add-btn'>
                        ADD
                    </button>
                    {showPopup && (
                        <div className={isSuccess ? 'popup success' : 'popup error'}>
                            {isSuccess ? 'Ami ajouté avec succès' : 'Erreur lors de l\'ajout de l\'ami'}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
