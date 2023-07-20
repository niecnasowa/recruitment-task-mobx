import { action, computed, makeAutoObservable, observable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import { getRoundPrice } from '../helpers';

// I have decided to put all Stores in one files to prevent with Circular dependency problems
export class RootStore {
  expensesStore: ExpensesStore;
  currencyPriceStore: CurrencyPriceStore;

  constructor() {
    this.expensesStore = new ExpensesStore(this);
    this.currencyPriceStore = new CurrencyPriceStore(this);
  }
}

// Minimal version now, would be easy to extend to modify value or add more currencies
export class CurrencyPriceStore {
  rootStore: RootStore;

  @observable eurToPln: number = 4.382;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  @action
  changePrice = (valueName: 'eurToPln', value: number) => {
    this[valueName] = value;
  };
}

interface NewExpense {
  title: string;
  priceInPln: number;
}

export class ExpenseStore {
  rootStore: RootStore;

  id = uuidv4();

  @observable title: string;
  @observable priceInPln: number;

  constructor(rootStore: RootStore, newExpense: NewExpense) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;

    this.title = newExpense.title;
    this.priceInPln = newExpense.priceInPln;
  }

  @computed
  get priceInEur(): number {
    return getRoundPrice(
      this.priceInPln / this.rootStore.currencyPriceStore.eurToPln
    );
  }
}

export type SortingColumn = 'none' | 'title' | 'amount';
export type SortingOrder = 'desc' | 'asc';

export class ExpensesStore {
  rootStore: RootStore;

  @observable.shallow list: ExpenseStore[] = [];

  @observable sortingColumn: SortingColumn = 'none';
  @observable sortingOrder: SortingOrder = 'desc';

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;

    // Add default state
    this.addExpense('New book about Rust', 100);
    this.addExpense('Snacks for a football match', 20);
    this.addExpense('Bus ticket', 2.55);
  }

  @action
  addExpense = (title: string, priceInPln: number) => {
    this.list.push(new ExpenseStore(this.rootStore, { title, priceInPln }));
  };

  @action
  removeExpense = (expense: ExpenseStore) => {
    this.list.splice(this.list.indexOf(expense), 1);
  };

  @action
  changeSorting = (newSortingColumn: SortingColumn) => {
    const curSortingColumn = this.sortingColumn;

    if (newSortingColumn === curSortingColumn) {
      const newSortingOrder = ['desc', 'asc'].find(
        (element) => element !== this.sortingOrder
      ) as SortingOrder;

      this.sortingOrder = newSortingOrder;
    } else {
      this.sortingColumn = newSortingColumn;
      this.sortingOrder = 'desc';
    }
  };

  @computed get sortedList(): ExpenseStore[] {
    if (this.sortingColumn !== 'none') {
      // price in PLN and EUR when sorted produce the same result, so don't need to differentiate
      const columnName: 'title' | 'priceInPln' =
        this.sortingColumn === 'amount' ? 'priceInPln' : 'title';

      // this function sort in asc order
      const sorted = [...this.list].sort((a, b) => {
        const valueA = a[columnName];
        const valueB = b[columnName];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return valueA.localeCompare(valueB);
        }

        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return valueA - valueB;
        }

        // Shouldn't go here, values should be a string or a number
        throw Error('wrong data');
      });

      if (this.sortingOrder === 'asc') {
        return sorted;
      }

      // so if sort order is desc, revert it
      return sorted.reverse();
    }

    return this.list;
  }

  @computed
  get totalPriceInPln(): number {
    return this.list.reduce((acc, cur) => acc + cur.priceInPln, 0);
  }

  @computed
  get totalPriceInEur(): number {
    return getRoundPrice(
      this.totalPriceInPln / this.rootStore.currencyPriceStore.eurToPln
    );
  }
}

export const store = new RootStore();
