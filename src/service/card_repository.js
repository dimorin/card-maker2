import { getDatabase, ref, set, remove, onValue, off} from "firebase/database";

class CardRepository{
    constructor(firebaseApp){
        this.database = getDatabase(firebaseApp);
    }
    saveCard(userId, card) {
        set(ref(this.database, `${userId}/cards/${card.id}`), card);
    }
    readCards(userId, onUpdate){
        const query = ref(this.database, `${userId}/cards`);
        onValue(query, (snapshot) => {
            const data = snapshot.val();
            data && onUpdate(data);
        });
        return () => off(query);
    }
    removeCard(userId, card){
        remove(ref(this.database, `${userId}/cards/${card.id}`));
    }
}

export default CardRepository;