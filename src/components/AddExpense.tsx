import { observer } from 'mobx-react-lite';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useStore } from '../hooks/useStore';
import { validateDecimals } from '../helpers';

type ExpenseFormInputs = {
  title: string;
  priceInPln: string;
};

export const AddExpense = observer(() => {
  const store = useStore();

  const { addExpense } = store.expensesStore;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseFormInputs>();

  const handleFormSubmit: SubmitHandler<ExpenseFormInputs> = (data) => {
    // Validation was applied before, so price should be normalized already
    addExpense(data.title, Number(data.priceInPln));
  };

  return (
    <div className="py-6 px-4">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="flex w-full justify-between">
          <div className="w-full">
            <div className="flex items-center mb-6">
              <label className="w-2/6" htmlFor="title">
                Title of transaction
              </label>

              <div className="w-4/6">
                <input
                  className={!!errors.title ? 'border-red-600' : undefined}
                  id="title"
                  defaultValue=""
                  {...register('title', { required: true, minLength: 5 })}
                />
              </div>
            </div>

            <div className="flex items-center">
              <label className="w-2/6" htmlFor="priceInPln">
                Amount (in PLN)
              </label>

              <div className="w-4/6">
                <input
                  className={!!errors.priceInPln ? 'border-red-600' : undefined}
                  type="number"
                  id="priceInPln"
                  defaultValue=""
                  step=".01"
                  {...register('priceInPln', {
                    valueAsNumber: true,
                    required: true,
                    min: 0,
                    validate: validateDecimals,
                  })}
                />
              </div>
            </div>
          </div>

          <div className="self-end">
            <input
              className="cursor-pointer py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-non rounded-lg border border-black bg-neutral-300"
              type="submit"
              value="Add"
            />
          </div>
        </div>

        <div>
          {!!Object.keys(errors).length && (
            <div
              className="p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              There is a problem with data in the form, please fix it.
            </div>
          )}
        </div>
      </form>
    </div>
  );
});
