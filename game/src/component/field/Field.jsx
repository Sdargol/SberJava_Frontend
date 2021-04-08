import React, { Fragment, useState } from 'react';
import Button from '../button/Button';
import Cell from '../cell/Cell';
import './field-style.css';

let Field = () => {
    const [progress, setProgress] = useState({ arr: Array(9).fill(null), xIsNext: true });

    const valueStep = () => progress.xIsNext ? "X" : "O";

    const calculateWinner = (cells) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
                return cells[a];
            }
        }
        return null;
    }

    // Клик на ячейку ( устанавливаем Х или О )
    const handleClick = (index) => {
        if (calculateWinner(progress.arr) || progress.arr[index]) {
            return;
        }

        const p = progress.arr.slice();
        p[index] = valueStep();
        setProgress({ arr: p, xIsNext: !progress.xIsNext });
    }

    const generateHeader = () => {
        const win = calculateWinner(progress.arr);

        if (win) {
            return <h1>🎉 Победили: {win}</h1>;
        }

        return <h1>Сейчас ходят: {valueStep()} </h1>;
    }

    const handleRestart = () => {
        setProgress({ arr: Array(9).fill(null), xIsNext: true });
    }

    return (
        <Fragment>
            {generateHeader()}

            <div className="field">
                {progress.arr.map((val, i) => <Cell key={i}
                    value={val}
                    click={() => handleClick(i)}
                >
                </Cell>)}
            </div>

            <Button handleRestart = {handleRestart} content = "новая игра"/>

        </Fragment>
    )
}

export default Field;