import { moneyFormatter } from ".";

interface ICard {
  icon: React.ReactNode;
  value: number;
  label: string;
  isMoney?: boolean;
}

export const DetailsCard = ({ icon, value, label, isMoney = true }: ICard) => {
  return (
    <div className="rounded-lg space-y-3 hover:shadow-md px-4 py-2 border border-slate-300  transition-all duration-500">
      <div className="flex  justify-end">
        <span>{icon}</span>
      </div>
      <p className="text-2xl font-bold">
        {isMoney ? moneyFormatter(value) : value}
      </p>
      <p className="sm text-slate-600">{label}</p>
    </div>
  );
};
