import { observer } from 'mobx-react-lite';
import { useStore } from '../hooks/useStore';

export const Header = observer(() => {
  const store = useStore();

  const { eurToPln, changePrice } = store.currencyPriceStore;

  const handleEditEurToPlnPrice = () => {
    const newValue = prompt('Please provide a new value:', eurToPln.toString());

    const newValueNumber = Number(newValue);

    if (isNaN(newValueNumber)) {
      alert(`Can't change price, value provided is not a correct number.`);
      return;
    }

    if (newValueNumber <= 0) {
      alert(`Can't change price, value needs to be bigger than 0.`);
      return;
    }

    changePrice('eurToPln', newValueNumber);
  };

  return (
    <div className="flex justify-between items-center py-6 px-4">
      <h1 className="text-2xl">List of expenses</h1>
      <span>
        1 EUR = {eurToPln} <button onClick={handleEditEurToPlnPrice}>✏️</button>{' '}
        PLN
      </span>
    </div>
  );
});
