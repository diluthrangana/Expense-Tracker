import React, { useRef, useEffect } from "react";

type BarChartProps = {
  expenses: number;
  budget: number;
};

type drawBarArgs = {
  context: CanvasRenderingContext2D;
  data: { type: string; amount: number; color: string }[];
};

function drawBar({ context, data }: drawBarArgs) {
  let totalAmount = data.reduce((sum, { amount }) => sum + amount, 0);

  let barWidth = 100;
  let barSpacing = 20;
  let startX = 50;
  let startY = 300;

  context.clearRect(0, 0, 400, 400);
  data.forEach((entry, index) => {
    context.fillStyle = entry.color;
    context.fillRect(startX + index * (barWidth + barSpacing), startY, barWidth, -(entry.amount / totalAmount) * 200);

    // add the labels
    context.font = "17px sans-serif";
    context.textAlign = "center";
    context.fillStyle = entry.color;
    context.fillText(entry.type, startX + index * (barWidth + barSpacing) + barWidth / 2, startY + 20);
  });
}

const BarChart: React.FC<BarChartProps> = ({ expenses, budget }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const data = [
    {
      type: "Budget",
      amount: budget,
      color: "#4BDB6B",
    },
    { type: "Expenses", amount: expenses, color: "#FF6C6C" },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    drawBar({ context, data });
  }, [budget, expenses]);

  return (
    // use HTML canvas API to draw a bar chart
    <canvas
      style={{ margin: "auto" }}
      ref={canvasRef}
      width={500}
      height={400}
    />
  );
};

export default BarChart;
