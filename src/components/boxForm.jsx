import React, { useState } from 'react';
import { useBox } from '../context/useBox';
import { hexToRgb } from '../utils/functionUtils';
import ArrowDown from '../assets/svg/arrow-down-icon';
import SpinnerIcon from '../assets/svg/spinner-icon';

/**
 * Converts a hex color string to an RGB string.
 * @param {string} hex - The hex color code.
 * @returns {string} The RGB color string.
 */

const multipliers = {
    Sweden: import.meta.env.VITE_SWEDEN,
    China: import.meta.env.VITE_CHINA,
    Brazil: import.meta.env.VITE_BRAZIL,
    Australia: import.meta.env.VITE_AUSTRALIA,
};

export default function BoxForm() {
    const { addBox } = useBox();
    const [form, setForm] = useState({
        name: "",
        weight: "",
        color: "#000000",
        country: "",
    });

    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Dynamic Tailwind classes for inputs
    const inputClass = "w-full border-gray-300 border-2 p-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500";
    const buttonClass = "w-full py-3 px-4 rounded-xl text-lg font-semibold text-white transition-all duration-300 ease-in-out shadow-lg transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setError(""); // Clear error on change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const trimmedName = form.name.trim();
        const weightValue = parseFloat(form.weight);

        // 1. Required fields check
        if (!trimmedName || !form.weight || !form.country) {
            setError("All fields (Receiver Name, Weight, and Destination) are required.");
            setIsSubmitting(false);
            return;
        }

        // 2. Negative weight check
        if (weightValue < 0) {
            setForm((prev) => ({ ...prev, weight: '0' })); // reset weight
            setError("Negative weight values are not permitted. The field has been reset to 0.");
            setTimeout(() => setError(''), 3000); // optional: auto-clear error
            setIsSubmitting(false);
            return;
        }

        // 3. Zero or invalid weight check
        if (isNaN(weightValue) || weightValue === 0) {
            setError("Weight must be a positive number greater than 0.");
            setIsSubmitting(false);
            return;
        }

        try {
            const rgb = hexToRgb(form.color);

            addBox({
                name: trimmedName,
                weight: weightValue,
                color: rgb,
                country: form.country,
                multiplier: multipliers[form.country],
            });

            await new Promise(resolve => setTimeout(resolve, 500));

            setForm({ name: "", weight: "", color: "#000000", country: "" });
            setError("");
        } catch (err) {
            console.error("Submission failed:", err);
            setError("An unexpected error occurred during submission.");
        } finally {
            setIsSubmitting(false);
        }
    };



    return (
        <div className="min-h-screen bg-gray-50 flex items-baseline justify-center p-4 sm:p-6">
            <div className="w-full max-w-lg">

                <form
                    className="w-full bg-white p-6 sm:p-8 rounded-2xl shadow-2xl space-y-6 border border-gray-100"
                    onSubmit={handleSubmit}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                >
                    <h2 className="text-3xl font-extrabold text-gray-800 border-b pb-4 mb-4">
                        Shipment Details
                    </h2>

                    {/* Error Message Display */}
                    {error && (
                        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-lg z-50">
                            <p className="font-medium">{error}</p>
                        </div>
                    )}

                    {/* Receiver Name Input */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Receiver Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="E.g., John Doe"
                            value={form.name}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>

                    {/* Weight Input */}
                    <div>
                        <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                        <input
                            id="weight"
                            type="number"
                            name="weight"
                            placeholder="Enter weight in kilograms (e.g., 5.5)"
                            value={form.weight}
                            onChange={handleChange}
                            className={inputClass}
                            step="0.1"
                        />
                    </div>

                    {/* Destination Select */}
                    <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Destination Country</label>
                        <div className="relative">
                            <select
                                id="country"
                                name="country"
                                value={form.country}
                                onChange={handleChange}
                                className={`${inputClass} appearance-none pr-10`}
                                required
                            >
                                <option value="" disabled>--- Select Destination ---</option>
                                {Object.keys(multipliers).map((c) => (
                                    <option key={c} value={c}>
                                        {c} (x{multipliers[c]})
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-700">
                                <ArrowDown />
                            </div>
                        </div>
                    </div>

                    {/* Color Picker */}
                    <div className="flex items-center justify-between p-3 border-2 border-gray-300 rounded-lg">
                        <label htmlFor="color" className="text-sm font-medium text-gray-700">
                            Box Color Indicator:
                        </label>
                        <div className="flex items-center space-x-3">
                            <input
                                id="color"
                                type="color"
                                name="color"
                                value={form.color}
                                onChange={handleChange}
                                className="h-10 w-10 border-none rounded-full overflow-hidden cursor-pointer p-0"
                                title="Choose Box Color"
                            />
                            <span className="text-gray-600 font-mono text-sm uppercase">{form.color}</span>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`
                    ${buttonClass}
                    bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700
                    shadow-blue-500/50 hover:shadow-lg hover:shadow-blue-500/70
                `}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center space-x-2">
                                <SpinnerIcon />
                                <span>Saving...</span>
                            </div>
                        ) : (
                            'Save Shipment'
                        )}
                    </button>
                </form>
            </div>
        </div>

    );
};

