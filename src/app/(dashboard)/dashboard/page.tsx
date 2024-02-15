import Nav from "@/components/admin/Nav";
import React from "react";
import PieChart from "@/components/common/PieChart";
import BarChartComponent from "@/components/common/BarChartComponent";
import { api } from "@/trpc/server";

export default async function Page() {
  const parentTags = await api.tag.findParentTags.query();
  return <main>
    {parentTags.map((t) => {
      return <div key={t.id}>{t.name}</div>;
    })}
  </main>
};

function ChartsDemo() {
  const data = {
    name: "Example",
    values: {
      Japanese: 30,
      French: 40,
      German: 20,
      Korean: 10,
    },
  };
  const dati = {
    name: "Sample",
    values: {
      CSE: 30,
      IT: 40,
      MECH: 20,
      CIVIL: 10,
    },
  };

  return (
    <div>
      <p className="text-center">Dashboard</p>
      <br />
      <br />
      <br />
      <div className="flex flex-row justify-between gap-11">
        <div className="ml-40 flex flex-col">
          <label className="font-black-400 flex justify-center">
            Count of students enrolled in foreign language
          </label>

          <PieChart data={data} />
        </div>

        <div className="mr-52 flex flex-col">
          <label className="font-black-400 flex justify-center">
            Count of students in each Department
          </label>
          <BarChartComponent data={dati} />
        </div>
      </div>
    </div>
  );
}

