/* eslint-disable no-undef */

import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { csvParse } from "d3-dsv";
import { useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import Loading from "../../component/Loading/Loading";

export default function FraudTable() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFraud, setIsFraud] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const pageSize = 50;
  const totalCount = data.length;

  const filteredItems = () => {
    if (isFraud) {
      return data.filter((item) => item.Y === "Y");
    }
    return data;
  };

  const pagedItems = () => {
    const start = (currentPage - 1) * pageSize;
    return filteredItems().slice(start, start + pageSize);
  };

  useEffect(() => {
    const client = new S3Client({
      region: import.meta.env.VITE_AWS_DEFAULT_REGION,
      credentials: {
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
      },
    });

    async function fetchObject(bucketName, fileName) {
      setIsLoading(true);

      try {
        const cmd = new GetObjectCommand({
          Bucket: bucketName,
          Key: fileName,
        });
        const res = await client.send(cmd);
        const csvText = await new Response(res.Body).text();
        const parsed = csvParse(csvText);

        setData(parsed);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }

    const BUCKET_NAME = "my-hackathon-bucket-2025";
    const FILE_NAME = "predictions/(Test)ANS_參賽者_202501_risk.csv";
    fetchObject(BUCKET_NAME, FILE_NAME);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [isFraud]);

  return (
    <div className="p-8">
      {isLoading && <Loading />}
      <div className="flex justify-between items-center">
        <div className="mb-8 text-2xl font-bold">警示戶預測表</div>
        <div className="flex flex-col justify-end items-end">
          <div className="flex items-center">
            <input
              id="checked-checkbox"
              type="checkbox"
              className="w-4 h-4 border-gray-300 rounded-sm"
              checked={isFraud}
              onChange={(e) => setIsFraud(e.target.checked)}
            />
            <label
              htmlFor="checked-checkbox"
              className="ms-2 text-sm font-medium"
            >
              顯示警示戶
            </label>
          </div>
          <div className="mt-2">{`共${
            isFraud ? filteredItems().length : totalCount
          }筆`}</div>
        </div>
      </div>
      <table className="w-full table-auto border-collapse text-sm">
        <thead>
          <tr>
            <th className="border-b border-gray-200 p-4 font-medium text-left text-xl">
              ACCT_NBR
            </th>
            <th className="border-b border-gray-200 p-4 font-medium text-left text-xl">
              Fraud Score
            </th>
            <th className="border-b border-gray-200 p-4 font-medium text-left text-xl">
              Y
            </th>
          </tr>
        </thead>
        <tbody>
          {pagedItems().map((item) => (
            <tr key={item.ACCT_NBR}>
              <td className="border-b border-gray-200 p-4 font-medium">
                {item.ACCT_NBR}
              </td>
              <td className="border-b border-gray-200 p-4 font-medium">
                {item.fraud_prob}
              </td>
              <td className="border-b border-gray-200 p-4 font-medium">
                {item.Y}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-8">
        <ResponsivePagination
          maxWidth={500}
          current={currentPage}
          total={Math.ceil(filteredItems().length / pageSize)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
