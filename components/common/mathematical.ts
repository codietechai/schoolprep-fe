export interface DataPoint {
  marks: number;
  tests: number;
}

export function calculateMedianContinuous(data: DataPoint[]): number | null {
  if (data.length === 0) return null;

  // Sort data by marks in ascending order
  data.sort((a, b) => a.marks - b.marks);

  const totalStudents = data.reduce((sum, point) => sum + point.tests, 0);
  const medianPosition = totalStudents / 2;

  let cumulativeFrequency = 0;
  let medianClassIndex = -1;

  for (let i = 0; i < data.length; i++) {
    cumulativeFrequency += data[i].tests;
    if (cumulativeFrequency >= medianPosition) {
      medianClassIndex = i;
      break;
    }
  }

  if (medianClassIndex === -1) return null;

  const L = data[medianClassIndex].marks;
  const f = data[medianClassIndex].tests;
  const cf = cumulativeFrequency - f;
  const h =
    medianClassIndex > 0
      ? data[medianClassIndex].marks - data[medianClassIndex - 1].marks
      : 1;

  const median = L + ((medianPosition - cf) / f) * h;
  return median;
}

export const createArray = (number: number) => {
  let arr = [];
  for (let i = 1; i <= number; i++) {
    arr.push(i);
  }
  for (let i = number; i >= 1; i--) {
    arr.push(i);
  }
  return arr;
};
