import React from "react";
import { useBox } from "../context/useBox";
import { calculateCost } from "../utils/functionUtils";

const BoxTable = () => {
    const { boxes = [] } = useBox();

    if (boxes.length === 0) {
        return (
            <div className="mt-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
                <p className="text-xl font-semibold text-gray-500">
                    No boxes added yet!
                </p>
                <p className="text-gray-400 mt-1">
                    Use the 'Add Box' tab to start tracking your shipments.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-8 shadow-xl rounded-xl overflow-hidden bg-white">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-600 text-white shadow-md">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                Receiver
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider">
                                Weight (kg)
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider">
                                Box Color
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                Country
                            </th>
                            <th className="px-6 py-3 text-right text-sm font-bold uppercase tracking-wider">
                                Cost (₹)
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {boxes.map((box, index) => (
                            <tr
                                key={index}
                                className={index % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-50 hover:bg-gray-100"}
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {box.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">
                                    {box.weight.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex justify-center">
                                        <div
                                            className="w-8 h-8 rounded-full border border-gray-300 shadow-sm"
                                            style={{ backgroundColor: box.color }}
                                            title={box.color}
                                        ></div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {box.country}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-lg text-right font-extrabold text-green-600">
                                    ₹ {calculateCost(box.weight, box.country, box.multiplier).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BoxTable;