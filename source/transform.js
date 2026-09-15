'use strict';

/**
 * Рекурсивно применяет функцию преобразования ко всем значениям объекта.
 * Ключи сохраняются, меняются только значения. Если значение само является
 * объектом или массивом, оно обрабатывается рекурсивно на любую глубину.
 * Исходный объект не изменяется - возвращается новый
 *
 * @param {Object} obj - исходный объект (или массив)
 * @param {Function} transformFn - функция, применяемая к каждому конечному значению
 *
 * @throws {TypeError} Если obj не является объектом
 * @throws {TypeError} Если transformFn не является функцией
 *
 * @example
 * // returns { a: 2, b: 4 }
 * transform({ a: 1, b: 2 }, value => value * 2);
 *
 * @example
 * // returns { a: 2, b: { c: 3 }, d: [2, 3] }
 * transform({ a: 1, b: { c: 2 }, d: [1, 2] }, value => value + 1);
 *
 * @returns {Object}
 */
const transform = (obj, transformFn) => {
    if (typeof obj !== 'object' || obj === null) {
        throw new TypeError('Аргумент obj должен быть объектом');
    }

    if (typeof transformFn !== 'function') {
        throw new TypeError('Аргумент transformFn должен быть функцией');
    }

    // Массив копируем в массив, объект - в объект, чтобы не потерять исходный тип
    const result = Array.isArray(obj) ? [] : {};

    for (const key in obj) {
        const value = obj[key];

        // typeof null === 'object', поэтому null отсеиваем отдельной проверкой
        if (typeof value === 'object' && value !== null) {
            // Вложенный объект или массив разбираем тем же алгоритмом
            result[key] = transform(value, transformFn);
        } else {
            // Простое значение (число, строка, null, ...) - преобразуем
            result[key] = transformFn(value);
        }
    }

    return result;
};
