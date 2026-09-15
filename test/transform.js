/* eslint-disable require-jsdoc */

'use strict';

QUnit.module('Тестируем функцию transform', () => {
    QUnit.test('Работает правильно с простыми объектами', (assert) => {
        const originalObject = { a: 1, b: 2, c: 3 };
        const transformFunction = (value) => value * 2;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: 2, b: 4, c: 6 }, 'Значения должны быть умножены на 2');
    });

    QUnit.test('Работает правильно с вложенными объектами', (assert) => {
        const originalObject = { a: 1, b: { c: 2, d: 3 }, e: 4 };
        const transformFunction = (value) => value + 1;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: 2, b: { c: 3, d: 4 }, e: 5 }, 'Значения должны быть увеличены на 1');
    });

    QUnit.test('Работает правильно с массивами', (assert) => {
        const originalObject = { a: [1, 2, 3], b: 4 };
        const transformFunction = (value) => value * 3;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: [3, 6, 9], b: 12 }, 'Элементы массива должны быть умножены на 3');
    });

    QUnit.test('Работает правильно со строками', (assert) => {
        const originalObject = { name: 'аня', city: 'москва' };
        const transformFunction = (value) => value.toUpperCase();
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { name: 'АНЯ', city: 'МОСКВА' }, 'Строки должны быть в верхнем регистре');
    });

    QUnit.test('Работает правильно с null', (assert) => {
        const originalObject = { a: null, b: 1 };
        const transformFunction = (value) => String(value);
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: 'null', b: '1' }, 'null должен попасть в функцию преобразования');
    });

    QUnit.test('Не изменяет исходный объект', (assert) => {
        const originalObject = { a: 1, b: { c: 2 } };
        const transformFunction = (value) => value * 2;
        transform(originalObject, transformFunction);

        assert.deepEqual(originalObject, { a: 1, b: { c: 2 } }, 'Исходный объект и вложенный объект не должны измениться');
    });
});
