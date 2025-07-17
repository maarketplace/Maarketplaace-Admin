import { moneyFormatter } from ".";

interface ICard {
  icon: React.ReactNode;
  value: number;
  label: string;
}

export const DetailsCard = ({ icon, value, label }: ICard) => {
  return (
    <div className="rounded-lg space-y-3 hover:shadow-md px-4 py-2 border border-white hover:border-slate-300 transition-all duration-500">
      <span>{icon}</span>
      <p className="text-2xl font-bold">{moneyFormatter(value)}</p>
      <p className="sm text-slate-600">{label}</p>
    </div>
  );
};
