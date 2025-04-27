import Drawer from "react-modern-drawer";
import "./index.css";

export default function DrawerContent({ isOpen, toggleDrawer }) {
  return (
    <div className="wrapper">
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        size={700}
        className="overflow-y-auto"
      >
        <div className="p-8">
          <h1>金融詐騙檢測模型分析</h1>
          <h2>1. 整體表現分析</h2>
          <h3>優點</h3>
          <ul className="advantages">
            <li>
              極高的準確率 <strong>0.9863</strong>
              ，表示預測為詐騙的案例中，98.63%是真實詐騙
            </li>
            <li>
              極低的誤報率 <strong>FP = 5</strong>，幾乎不會誤判正常帳戶
            </li>
            <li>
              整體準確度 <strong>(359 + 24564) / 24969 = 0.9982</strong> 非常高
            </li>
          </ul>
          <h3>問題</h3>
          <ul className="issues">
            <li>
              召回率 <strong>0.8975</strong> 相對較低，意味著約 10%
              的詐騙案例未被發現
            </li>
            <li>
              <strong>41</strong> 個未被發現的詐騙帳號 (FN) 可能造成重大損失
            </li>
          </ul>
          <h2>2. 改進方向</h2>
          <div className="recommendation">
            <h3>召回率提升</h3>
            <ul>
              <li>調整模型閾值，適當降低判定為詐騙的門檻</li>
              <li>增加對少數類（詐騙案例）的採樣權重</li>
              <li>使用更多特徵來捕捉詐騙模式</li>
            </ul>

            <h3>準確率維持</h3>
            <ul>
              <li>優化特徵工程</li>
              <li>採用集成學習方法</li>
              <li>定期更新模型以適應新的詐騙手法</li>
            </ul>
          </div>
          <h2>3. 可能的錯誤原因</h2>
          <ul className="risk-list">
            <li>數據不平衡（詐騙案例只占 1.6%）</li>
            <li>新型詐騙手法未被模型學習</li>
            <li>特徵工程可能未完全捕捉詐騙特徵</li>
            <li>某些詐騙案例與正常交易極為相似</li>
          </ul>
          <h2>4. 實際應用價值與風險</h2>
          <h3>價值</h3>
          <ul>
            <li>可有效降低人工審核成本</li>
            <li>準確率高，減少客戶投訴</li>
            <li>可即時攔截大部分詐騙交易</li>
          </ul>
          <h3>風險</h3>
          <ul>
            <li>約 10% 的詐騙案例未被發現可能造成損失</li>
            <li>需要持續監控和更新以應對新型詐騙手法</li>
          </ul>
          <h2>5. 具體改進建議</h2>
          <ol>
            <li>
              <strong>數據層面：</strong>
              <ul>
                <li>採用 SMOTE 等技術處理數據不平衡</li>
                <li>收集更多詐騙案例樣本</li>
                <li>強化特徵工程，增加時序特徵</li>
              </ul>
            </li>
            <li>
              <strong>模型層面：</strong>
              <ul>
                <li>使用集成學習方法（如 XGBoost + LightGBM）</li>
                <li>實施分層模型策略，針對不同風險等級使用不同模型</li>
                <li>加入異常檢測算法作為輔助判斷</li>
              </ul>
            </li>
            <li>
              <strong>業務層面：</strong>
              <ul>
                <li>建立分級預警機制</li>
                <li>結合規則引擎與機器學習</li>
                <li>實施動態閾值調整策略</li>
              </ul>
            </li>
            <li>
              <strong>監控與更新：</strong>
              <ul>
                <li>建立模型效能監控機制</li>
                <li>定期重訓練模型</li>
                <li>建立快速響應機制處理誤判案例</li>
              </ul>
            </li>
          </ol>
        </div>
      </Drawer>
    </div>
  );
}
