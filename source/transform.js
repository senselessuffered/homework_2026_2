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

    /**
     * Преобразует одно значение: вложенный объект или массив обрабатывает
     * рекурсивно, простое значение передаёт в transformFn
     * @param {*} value - значение из объекта или элемент массива
     * @returns {*}
     */
    const transformValue = (value) => {
        // typeof null === 'object', поэтому null отсеиваем отдельной проверкой
        if (typeof value === 'object' && value !== null) {
            // Вложенный объект или массив разбираем тем же алгоритмом
            return transform(value, transformFn);
        }

        // Простое значение (число, строка, null, ...) - преобразуем
        return transformFn(value);
    };

    // map возвращает новый массив той же длины
    if (Array.isArray(obj)) {
        return obj.map(transformValue);
    }

    // Разбираем объект на пары [ключ, значение], преобразуем значения и собираем обратно
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, transformValue(value)])
    );
};
