import React from "react";
import { PieChart, Pie, Cell } from "recharts";

type TaskStatusProps = {
  progress: number | null; // value between 0–100
  size?: number; // chart diameter
  strokeWidth?: number;
};

const TaskStatusChart: React.FC<TaskStatusProps> = ({
  progress,
  size = 200,
  strokeWidth = 20,
}) => {
  if (!progress) {
    progress = 0
  }
  const data = [
    { name: "Progress", value: progress },
    { name: "Remaining", value: 100 - progress },
  ];

  const COLORS = ["#2a58e7", "#E6EBF1"];
  

  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        outline: "0",
      }}
    >
      <PieChart className="outline-0 border-0" width={size} height={size}>
        <Pie
          data={data}
          innerRadius={size / 2 - strokeWidth}
          outerRadius={size / 2}
          startAngle={90}
          endAngle={-270}
          paddingAngle={0}
          dataKey="value"
          className="outline-0"
          isAnimationActive={true}
          animationDuration={500}
          animationBegin={2}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={COLORS[index]}
              stroke="none"
              className="outline-0"
            />
          ))}
        </Pie>
      </PieChart>
      <div
        style={{
          position: "absolute",
          fontSize: size * 0.15,
          color: "#2a58e7",
          fontWeight: 500,
          transition: "all 300ms ease-in-out",
        }}
      >
        {progress}%
      </div>
    </div>
  );
};

export default TaskStatusChart;
