import { observer } from 'mobx-react-lite';
import { useStore } from '../hooks/useStore';
import { ExpenseStore, SortingColumn } from '../store/store';
import { getSortingIcon } from '../helpers';

export const ExpensesList = observer(() => {
  const store = useStore();

  const { sortingColumn, sortingOrder } = store.expensesStore;

  const handleDelete = (expense: ExpenseStore) => () => {
    store.expensesStore.removeExpense(expense);
  };

  const handleChangeSorting = (sortingColumn: SortingColumn) => () => {
    store.expensesStore.changeSorting(sortingColumn);
  };

  return (
    <div className="py-6 px-4">
      <table className="table-auto w-full border border-black border-collapse">
        <thead>
          <tr className="text-left bg-neutral-300">
            <th className="p-2 border border-black">
              <button onClick={handleChangeSorting('title')}>
                {getSortingIcon(sortingColumn === 'title', sortingOrder)}
              </button>{' '}
              <span>Title</span>
            </th>
            <th className="p-2 border border-black">
              <button onClick={handleChangeSorting('amount')}>
                {getSortingIcon(sortingColumn === 'amount', sortingOrder)}
              </button>{' '}
              <span>Amount (PLN)</span>
            </th>
            <th className="p-2 border border-black">
              <button onClick={handleChangeSorting('amount')}>
                {getSortingIcon(sortingColumn === 'amount', sortingOrder)}
              </button>{' '}
              <span>Amount (EUR)</span>
            </th>
            <th className="p-2 border border-black">Options</th>
          </tr>
        </thead>
        <tbody>
          {store.expensesStore.sortedList.map((expense) => (
            <tr key={expense.id} className="even:bg-neutral-200 odd:bg-white">
              <td className="p-2 border border-black">{expense.title}</td>
              <td className="p-2 border border-black">{expense.priceInPln}</td>
              <td className="p-2 border border-black">{expense.priceInEur}</td>
              <td className="p-2 border border-black">
                <button onClick={handleDelete(expense)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
