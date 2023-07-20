import { AddExpense, ExpensesList, Footer, Header } from './components';

export const App = () => {
  return (
    <div className="max-w-screen-sm mx-auto">
      <Header />
      <AddExpense />
      <ExpensesList />
      <Footer />
    </div>
  );
};
