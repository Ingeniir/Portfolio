import React from 'react';
import {TypeWriterComponent} from "@/app/components/animations/TypeWriter";

export default function AnalystTable() {
    return (
        <table className="border-collapse border border-zinc-300 dark:border-zinc-700 font-mono text-[9px] bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 select-none max-w-[120px] leading-none">
            <thead>
            {/* Ligne des colonnes Excel (A, B) */}
            <tr className="bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500 divide-x divide-zinc-200 dark:divide-zinc-800">
                <th className="w-4 h-3.5 bg-zinc-200/50 dark:bg-zinc-800/50"></th>
                <th className="px-1 font-normal text-left w-12">A</th>
                <th className="px-1 font-normal text-left w-10">B</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {/* Ligne 1 : Âge */}
            <tr className="divide-x divide-zinc-200 dark:divide-zinc-800">
                <td className="bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500 text-center w-4 h-3.5 font-normal">1</td>
                <td className="px-1 text-zinc-500 truncate">AGE</td>
                <td className="px-1 font-bold text-gray-500 dark:text-white truncate">
                    <TypeWriterComponent text={["21", "22", "23"]} delay={200} />
                </td>
            </tr>
            {/* Ligne 2 : Spécialité */}
            <tr className="divide-x divide-zinc-200 dark:divide-zinc-800">
                <td className="bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500 text-center h-3.5 font-normal">2</td>
                <td className="px-1 text-zinc-500 truncate">ROLE</td>
                <td className="px-1 truncate text-gray-500">
                    <TypeWriterComponent text={['ANALYST', 'SCIENTIST', 'ENGINEER']} delay={200} />
                </td>
            </tr>
            {/* Ligne 3 : Stack */}
            <tr className="divide-x divide-zinc-200 dark:divide-zinc-800">
                <td className="bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500 text-center h-3.5 font-normal">3</td>
                <td className="px-1 text-zinc-500 truncate">SPEC</td>
                <td className="px-1 text-emerald-600 dark:text-emerald-400 font-medium truncate">
                    <TypeWriterComponent text={["PYTHON", "SQL", "R"]} delay={200} />
                </td>
            </tr>
            </tbody>
        </table>
    );
}