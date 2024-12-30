import React from "react";

const Analytics = () => {
  return (
    <section className="flex flex-col w-full">
      <h1 className="text-xl font-semibold mb-4">Rapport mensuel</h1>
      <div className="flex flex-row items-center w-full gap-4">
        <div className="flex flex-col gap-2 py-2 px-4 w-full bg-secondary border border-primary/15">
          <h3 className="text-lg font-semibold">Commandes confirmee</h3>
          <h2>20</h2>
        </div>
        <div className="flex flex-col gap-2 py-2 px-4 w-full bg-secondary border border-primary/15">
          <h3 className="text-lg font-semibold">Nouveaux clients</h3>
          <h2>5</h2>
        </div>
        <div className="flex flex-col gap-2 py-2 px-4 w-full bg-secondary border border-primary/15">
          <h3 className="text-lg font-semibold">Total visteurs</h3>
          <h2>+1200</h2>
        </div>
        <div className="flex flex-col gap-2 py-2 px-4 w-full bg-secondary border border-primary/15">
          <h3 className="text-lg font-semibold">Meilleur client</h3>
          <h2>Mohamed said</h2>
        </div>
      </div>
    </section>
  );
};

export default Analytics;
