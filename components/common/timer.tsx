'use client';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useDispatch } from 'react-redux';

dayjs.extend(duration);

export const hoursToMinutes = (hours: number): number => {
  const wholeHours = Math.floor(hours); // Get the whole part (1 hour)
  const minutes = (hours - wholeHours) * 60; // Get the decimal part in minutes
  return wholeHours * 60 + minutes; // Convert to seconds
};

export const convertToHoursAndMinutes = (
  fractionalHours: number,
  shortForm?: boolean,
): string => {
  const totalMinutes = Math.round(fractionalHours * 60); // Convert fractional hours to minutes
  const durationObj = dayjs.duration(totalMinutes, 'minutes');

  const hours = durationObj.hours(); // Extract hours
  const minutes = durationObj.minutes(); // Extract minutes

  const hourText = hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : '';
  const minuteText = minutes > 0 ? `${minutes} min` : '';
  if (shortForm) {
    const hourText = hours > 0 ? `${hours} hr` : '';
    const minuteText = minutes > 0 ? `${minutes} min` : '';
    return [hourText, minuteText].filter(Boolean).join(' ');
  }
  return [hourText, minuteText].filter(Boolean).join(' ');
};

export function formatSeconds(seconds: number, shortFormat?: boolean): string {
  const inMilliseconds = seconds * 1000;
  if (inMilliseconds < 1000 * 60) {
    const seconds = Math.floor(inMilliseconds / 1000);
    return shortFormat ? `${seconds} sec` : `${seconds} seconds`;
  } else if (inMilliseconds <= 1000 * 60 * 60) {
    const minutes = Math.floor(inMilliseconds / (1000 * 60));
    return shortFormat ? `${minutes} min` : `${minutes} minutes`;
  } else {
    const diffInMinutes = Math.floor(inMilliseconds / (1000 * 60));
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;
    return shortFormat
      ? `${hours} hr ${minutes} min`
      : `${hours} hours ${minutes} minutes`;
  }
}

export const convertTimeToDecimal = (time: string): number => {
  const [hours, minutes, seconds] = time.split(':').map(Number);

  const decimalHours = hours + minutes / 60 + seconds / 3600;
  return parseFloat(decimalHours.toFixed(2)); // Round to 2 decimal places
};
export const reverseTimer = (
  durationInHours: string,
  isActive: boolean,
  fn: any,
) => {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const dispatch = useDispatch();
  const [remainingTime, setRemainingTime] = useState<number>(
    Number(durationInHours) * 60 * 60 * 1000,
  );

  useEffect(() => {
    setRemainingTime(Number(durationInHours) * 60 * 60 * 1000);
  }, [durationInHours]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      const startTime = Date.now();
      interval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const updatedRemainingTime = remainingTime - elapsedTime;

        if (updatedRemainingTime <= 0) {
          setRemainingTime(0);
          setTimeLeft('00:00:00');
          clearInterval(interval!);
          fn();
          return;
        }
        setRemainingTime(updatedRemainingTime);
        const hours = Math.floor(updatedRemainingTime / (1000 * 60 * 60));
        const minutes = Math.floor((updatedRemainingTime / (1000 * 60)) % 60);
        const seconds = Math.floor((updatedRemainingTime / 1000) % 60);
        setTimeLeft(
          `${String(hours).padStart(1, '0')}:${String(minutes).padStart(
            2,
            '0',
          )}:${String(seconds).padStart(2, '0')}`,
        );
      }, 1000);
    }

    return () => clearInterval(interval!);
  }, [remainingTime]);

  return timeLeft;
};

export function getPreviousDates(
  dateString: string,
): { date: string; day: string }[] {
  const result: { date: string; day: string }[] = [];
  const inputDate = dayjs(dateString);

  for (let i = 0; i < 7; i++) {
    const currentDate = inputDate.subtract(i, 'day');
    result.unshift({
      date: currentDate.format('YYYY-MM-DD'),
      day: currentDate.format('ddd'),
    });
  }

  return result;
}

export function formatSecondsToHHMM(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (seconds < 3600) {
    return String(minutes).padStart(2, '0');
  }
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0',
  )}`;
}

export function getTimeDifferenceInSeconds(
  startTime: string,
  endTime?: string,
): number {
  const start = dayjs(startTime);
  const end = endTime ? dayjs(endTime) : dayjs();
  return Number((end.diff(start, 'second') / 3600).toFixed(5));
}
