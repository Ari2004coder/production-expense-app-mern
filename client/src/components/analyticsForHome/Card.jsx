import React from 'react';
import { FaArrowUp, FaArrowDown, FaWallet } from 'react-icons/fa'; // Import icons

const Card = ({ title, value }) => {
  const Income = value.filter(item => item.type === 'Income').reduce((acc, item) => acc + item.amount, 0);
  const Expense = value.filter(item => item.type === 'Expense').reduce((acc, item) => acc + item.amount, 0);
  const Savings = Income - Expense;

  let IconComponent = null;
  let iconColorClass = '';
  let displayValue = 0;
  let cardBgClass = ''; // New variable for card background class

  if (title === 'Total Income') {
    IconComponent = FaArrowUp;
    iconColorClass = 'text-green-300';
    displayValue = Income;
    cardBgClass = 'bg-green-600';
  } else if (title === 'Total Expense') {
    IconComponent = FaArrowDown;
    iconColorClass = 'text-red-300';
    displayValue = Expense;
    cardBgClass = 'bg-rose-600';
  } else if (title === 'Net Amount') {
    IconComponent = FaWallet;
    iconColorClass = 'text-blue-300';
    displayValue = Savings;
    // Conditional background for Net Amount
    cardBgClass = Savings < 0 ? 'bg-red-600' : 'bg-blue-500'; // Change to red if overspending
  }

  return (
    <div className={`${cardBgClass} w-full sm:w-1/2 lg:w-1/3 flex flex-col justify-center items-center rounded-lg p-5 py-8 transition-all duration-300 ease-in-out`}>
      <div className={`text-5xl font-bold mb-2 ${iconColorClass}`}>
        {IconComponent && <IconComponent />} {/* Render the icon component */}
      </div>
      <h1 className='text-white font-bold text-center text-xl md:text-2xl mb-2'>
        {title === 'Net Amount' ? (Savings < 0 ? "Over Spending" : "Net Saving") : title}
      </h1>
      <div className='text-center'>
        <span className={`text-center text-white text-3xl font-bold`}>
          {displayValue < 0 ? (-1 * displayValue) : displayValue}
        </span>
      </div>
    </div>
  );
};

export default Card;
