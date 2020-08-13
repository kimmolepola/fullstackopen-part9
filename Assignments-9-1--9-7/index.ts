import { calculateExercises } from './exerciseCalculator';
import { calculateBmi } from './bmiCalculator';
import express from 'express';
const app = express();

app.use(express.json());

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const hours: Array<number> = req.body.daily_exercises;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const target = Number(req.body.target);
    console.log(target);
    if (hours != undefined && target != undefined) {
        if (!isNaN(target) && Object.prototype.toString.call(hours) === '[object Array]' && hours.length > 0) {
            let hoursValid = true;
            for (const hour of hours) {
                if (isNaN(Number(hour))) {
                    console.log(hour);
                    res.status(400).send({ error: 'malformatted parameters' });
                    hoursValid = false;
                    break;
                }
            }
            if (hoursValid) {
                res.send(calculateExercises({ hours, target }));
            }
        } else {
            res.status(400).send({ error: 'malformatted parameters' });
        }
    } else {
        res.status(400).send({ error: 'parameters missing' });
    }
});

app.get('/bmi', (req, res) => {
    try {
        const height_m = Number(req.query.height) * 0.01;
        const mass_kg = Number(req.query.weight);
        if (height_m && mass_kg && !isNaN(height_m) && !isNaN(mass_kg)) {
            res.send(calculateBmi({ height_m, mass_kg }));
        } else {
            throw new Error;
        }
    } catch (err) {
        res.status(400).send({ error: 'malformatted parameters' });
    }
});

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});