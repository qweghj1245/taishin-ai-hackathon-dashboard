import {
  BoxAndWiskers,
  BoxPlotController,
} from "@sgratzl/chartjs-chart-boxplot";
import { Chart, registerables } from "chart.js/auto";
import React, { useEffect, useRef, useState } from "react";
import "react-modern-drawer/dist/index.css";
import DrawerContent from "./DrawerContent/DrawerContent";
import "./index.css";

Chart.register(...registerables, BoxPlotController, BoxAndWiskers);

const NON_ALERT = 24569;
const ALERT = 400;

const TP = 359;
const FP = 5;
const TN = 24564;
const FN = 41;

const FRAUD_STATS = {
  min: 0.0023,
  q1: 0.878475,
  median: 0.9775,
  q3: 0.994325,
  max: 0.9991,
  mean: 0.868968,
};
const NORMAL_STATS = {
  min: 0.0002,
  q1: 0.0024,
  median: 0.0054,
  q3: 0.0138,
  max: 0.906,
  mean: 0.015095,
};

const ACTUAL_COUNT = 400;
const PREDICTED_COUNT = 364;

export default function Dashboard() {
  const [auc, setAuc] = useState(0);
  const [precision, setPrecision] = useState(0);
  const [recall, setRecall] = useState(0);
  const [f1, setF1] = useState(0);
  const [isOpen, setIsOpen] = React.useState(false);

  const distRef = useRef(null);
  const cmRef = useRef(null);
  const distChartRef = useRef(null);
  const cmChartRef = useRef(null);
  const boxplotRef = useRef(null);
  const fraudRef = useRef(null);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const convertNumberToPercent = (n) => {
    return `${Number(n.toFixed(2))}`;
  };

  useEffect(() => {
    const ctx = fraudRef.current.getContext("2d");
    const barChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["實際詐騙帳號", "預測為詐騙帳號"],
        datasets: [
          {
            label: "帳號數量",
            data: [ACTUAL_COUNT, PREDICTED_COUNT],
            backgroundColor: ["rgba(255,99,132,0.6)", "rgba(54,162,235,0.6)"],
            borderColor: ["rgba(255,99,132,1)", "rgba(54,162,235,1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: "實際 vs 預測 詐騙帳號數量",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: "數量" },
          },
        },
      },
    });

    return () => barChart.destroy();
  }, []);

  useEffect(() => {
    const ctx = boxplotRef.current.getContext("2d");
    const boxplot = new Chart(ctx, {
      type: "boxplot",
      data: {
        labels: ["詐騙帳號", "正常帳號"],
        datasets: [
          {
            label: "預測機率分布",
            data: [FRAUD_STATS, NORMAL_STATS],
            backgroundColor: ["rgba(255,99,132,0.5)", "rgba(54,162,235,0.5)"],
            borderColor: ["rgba(255,99,132,1)", "rgba(54,162,235,1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: "詐騙 vs 正常 帳號 預測機率箱線圖" },
        },
        scales: {
          y: {
            title: { display: true, text: "機率 (0 ~ 1)" },
            beginAtZero: true,
            max: 1,
          },
        },
      },
    });

    return () => {
      boxplot.destroy();
    };
  }, []);

  useEffect(() => {
    if (!distChartRef.current) {
      distChartRef.current = new Chart(distRef.current, {
        type: "pie",
        data: {
          labels: ["非警示戶", "警示戶"],
          datasets: [{ data: [NON_ALERT, ALERT] }],
        },
      });
    }
    if (!cmChartRef.current) {
      cmChartRef.current = new Chart(cmRef.current, {
        type: "bar",
        data: {
          labels: ["TP", "FP", "TN", "FN"],
          datasets: [{ label: "數量", data: [] }],
        },
        options: { scales: { y: { beginAtZero: true } } },
      });
    }
  }, []);

  useEffect(() => {
    const prec = TP / (TP + FP);
    const rec = TP / (TP + FN);
    const f1Score = (2 * prec * rec) / (prec + rec);
    const TPR = TP / (TP + FN);
    const FPR = FP / (FP + TN);
    setAuc(TPR);
    setPrecision(prec);
    setRecall(rec);
    setF1(f1Score);
    cmChartRef.current.data.datasets[0].data = [TP, FP, TN, FN];
    cmChartRef.current.update();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold text-center">警示戶預測儀表板</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded right-top"
        onClick={toggleDrawer}
      >
        AI 優化分析
      </button>
      <DrawerContent isOpen={isOpen} toggleDrawer={toggleDrawer} />
      <div className="grid grid-cols-4 gap-4">
        <div className="p-8 bg-white rounded shadow text-center">
          <div className="text-sm text-gray-500">F1 Score</div>
          <div className="text-xl font-bold">{convertNumberToPercent(f1)}</div>
        </div>
        <div className="p-8 bg-white rounded shadow text-center">
          <div className="text-sm text-gray-500">Precision</div>
          <div className="text-xl font-bold">
            {convertNumberToPercent(precision)}
          </div>
        </div>
        <div className="p-8 bg-white rounded shadow text-center">
          <div className="text-sm text-gray-500">Recall</div>
          <div className="text-xl font-bold">
            {convertNumberToPercent(recall)}
          </div>
        </div>
        <div className="p-8 bg-white rounded shadow text-center">
          <div className="text-sm text-gray-500">AUC</div>
          <div className="text-xl font-bold">{convertNumberToPercent(auc)}</div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-2 gap-8 mr-16">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg mb-2">混淆矩陣</h3>
            <canvas ref={cmRef} className="w-full h-48"></canvas>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg mb-2">預測機率分布箱線圖</h2>
            <canvas ref={boxplotRef} className="w-full h-80"></canvas>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg mb-2">詐騙預測結果比較</h2>
            <canvas ref={fraudRef} className="w-full h-80"></canvas>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg mb-2">樣本類別分布</h3>
          <canvas ref={distRef} className="w-full h-64"></canvas>
        </div>
      </div>
    </div>
  );
}
