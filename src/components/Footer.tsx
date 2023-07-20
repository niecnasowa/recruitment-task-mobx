import { observer } from 'mobx-react-lite';
import { useStore } from '../hooks/useStore';

export const Footer = observer(() => {
  const store = useStore();

  const { totalPriceInPln, totalPriceInEur } = store.expensesStore;

  return (
    <div className="py-6 px-4">
      <span>
        Sum: {totalPriceInPln} PLN ({totalPriceInEur} EUR)
      </span>
    </div>
  );
});
